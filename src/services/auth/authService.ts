import debugLib from 'debug';
import IResponse from '../../models/IResponse';
import IAuth from '../../models/IAuth';
import { databaseClient } from '../databaseService';
import BcryptService from './cryptoService';
import JwtService from './jwtService';

const debug = debugLib('greenrun-sports:AuthService');

export default class AuthService {
    public static authUser(credentials: IAuth): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const userMatch = (
                    await databaseClient
                        .from('users')
                        .where('email', credentials.email)
                        .select()
                        .limit(1)
                )[0];
                if (
                    userMatch &&
                    (await BcryptService.checkHash(
                        userMatch.password,
                        credentials.password
                    ))
                ) {
                    delete userMatch.password;
                    const userPayload = {
                        id: userMatch.id,
                        role: userMatch.role,
                        first_name: userMatch.first_name,
                        last_name: userMatch.last_name,
                        phone: userMatch.phone,
                        email: userMatch.email,
                        username: userMatch.username,
                        address: userMatch.address,
                        gender: userMatch.gender,
                        birth_date: userMatch.birth_date,
                        city: userMatch.city,
                        category: userMatch.category,
                        document_id: userMatch.document_id,
                        user_state: userMatch.user_state,
                    };
                    const token = await JwtService.signedToken(userPayload, '30m');
                    const authData = {
                        token,
                        id: userPayload.id,
                        email: userPayload.email,
                        username: userPayload.username,
                        role: userPayload.role
                    };
                    resolve({ status: 200, data: authData });
                } else {
                    resolve({ status: 401, data: 'invalid credentials.' });
                }
            } catch (error: any) {
                debug('error when try auth User: %s', error);
                reject(error);
            }
        });
    }
}
