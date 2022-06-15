import debugLib from 'debug';
import IResponse from '../models/IResponse';
import IUser from '../models/IUser';
import { databaseClient } from './databaseService';

const debug = debugLib('greenrun-sports:UserService');

export default class UserService {
    public static createUser(user: IUser): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('users').insert(user);
                resolve({ status: 200, data: 'user created.' });
            } catch (error: any) {
                debug('error when try created user: %s', error);
                reject(error);
            }
        });
    }

    public static updateUser(user: IUser): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('users').where({ id: user.id }).update(user);
                resolve({ status: 200, data: 'user updated.' });
            } catch (error: any) {
                debug('error when try updated user: %s', error);
                reject(error);
            }
        });
    }

    public static getUsers(): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const usersList = await databaseClient
                    .from('users')
                    .where({ deleted: false })
                    .select(
                        'id',
                        'role',
                        'first_name',
                        'last_name',
                        'phone',
                        'email',
                        'username',
                        'address',
                        'gender',
                        'birth_date',
                        'city',
                        'category',
                        'document_id',
                        'user_state',
                        'created_at',
                        'updated_at',
                        'deleted',
                        'deleted_at'
                    );
                resolve({
                    status: 200,
                    data: { rows: usersList, total: usersList.length },
                });
            } catch (error: any) {
                debug('error when try get users list: %s', error);
                reject(error);
            }
        });
    }

    public static getUserById(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const userMatch = await databaseClient
                    .from('users')
                    .where({ id })
                    .select(
                        'id',
                        'role',
                        'first_name',
                        'last_name',
                        'phone',
                        'email',
                        'username',
                        'address',
                        'gender',
                        'birth_date',
                        'city',
                        'category',
                        'document_id',
                        'user_state',
                        'created_at',
                        'updated_at',
                        'deleted',
                        'deleted_at'
                    )
                    .limit(1);
                resolve({ status: 200, data: userMatch[0] });
            } catch (error: any) {
                debug('error when try get user: %s', error);
                reject(error);
            }
        });
    }

    public static deleteUser(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('users')
                    .where({ id })
                    .update({ deleted: true, deleted_at: new Date() });
                resolve({ status: 200, data: 'user deleted.' });
            } catch (error: any) {
                debug('error when try deleted user: %s', error);
                reject(error);
            }
        });
    }
}
