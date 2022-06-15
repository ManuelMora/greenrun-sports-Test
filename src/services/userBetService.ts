import debugLib from 'debug';
import IResponse from '../models/IResponse';
import IUserBet from '../models/IUserBet';
import { databaseClient } from './databaseService';

const debug = debugLib('greenrun-sports:UserBetService');

export default class UserBetService {
    public static createUserBet(userBet: IUserBet): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('user_bets').insert(userBet);
                resolve({ status: 200, data: 'user bet created.' });
            } catch (error: any) {
                debug('error when try created user bet: %s', error);
                reject(error);
            }
        });
    }

    public static updateUserBet(userBet: IUserBet): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('user_bets')
                    .where({ id: userBet.id })
                    .update(userBet);
                resolve({ status: 200, data: 'user bet updated.' });
            } catch (error: any) {
                debug('error when try updated user bet: %s', error);
                reject(error);
            }
        });
    }

    public static getUserBets(): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const userBetsList = await databaseClient
                    .from('user_bets')
                    .join('users', 'user_bets.user_id', '=', 'users.id')
                    .join('bets', 'user_bets.bet_id', '=', 'bets.id')
                    .select(
                        'user_bets.id',
                        'user_bets.user_id',
                        'users.first_name',
                        'users.username',
                        'user_bets.bet_id',
                        'bets.name as bet',
                        'user_bets.odd',
                        'user_bets.amount',
                        'user_bets.state',
                        'user_bets.created_at',
                        'user_bets.updated_at',
                        'user_bets.deleted',
                        'user_bets.deleted_at'
                    );
                resolve({
                    status: 200,
                    data: { rows: userBetsList, total: userBetsList.length },
                });
            } catch (error: any) {
                debug('error when try get user bets list: %s', error);
                reject(error);
            }
        });
    }

    public static getUserBetsByUserId(userId: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const userBetsByUserMatch = await databaseClient
                    .from('user_bets')
                    .join('users', 'user_bets.user_id', '=', 'users.id')
                    .join('bets', 'user_bets.bet_id', '=', 'bets.id')
                    .where({ user_id: userId })
                    .select(
                        'user_bets.id',
                        'user_bets.user_id',
                        'users.first_name',
                        'users.username',
                        'user_bets.bet_id',
                        'bets.name as bet',
                        'user_bets.odd',
                        'user_bets.amount',
                        'user_bets.state',
                        'user_bets.created_at',
                        'user_bets.updated_at',
                        'user_bets.deleted',
                        'user_bets.deleted_at'
                    );
                resolve({
                    status: 200,
                    data: {
                        rows: userBetsByUserMatch,
                        total: userBetsByUserMatch.length,
                    },
                });
            } catch (error: any) {
                debug('error when try get user bet: %s', error);
                reject(error);
            }
        });
    }

    public static getUserBetById(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const userBetMatch = await databaseClient
                    .from('user_bets')
                    .join('users', 'user_bets.user_id', '=', 'users.id')
                    .join('bets', 'user_bets.bet_id', '=', 'bets.id')
                    .where({ id })
                    .select(
                        'user_bets.id',
                        'user_bets.user_id',
                        'users.first_name',
                        'users.username',
                        'user_bets.bet_id',
                        'bets.name as bet',
                        'user_bets.odd',
                        'user_bets.amount',
                        'user_bets.state',
                        'user_bets.created_at',
                        'user_bets.updated_at',
                        'user_bets.deleted',
                        'user_bets.deleted_at'
                    )
                    .limit(1);
                resolve({ status: 200, data: userBetMatch[0] });
            } catch (error: any) {
                debug('error when try get user bet: %s', error);
                reject(error);
            }
        });
    }

    public static deleteUserBet(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('user_bets')
                    .where({ id })
                    .update({ deleted: true, deleted_at: new Date() });
                resolve({ status: 200, data: 'user bet deleted.' });
            } catch (error: any) {
                debug('error when try deleted user bet: %s', error);
                reject(error);
            }
        });
    }
}
