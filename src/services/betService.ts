import debugLib from 'debug';
import IResponse from '../models/IResponse';
import IBet from '../models/IBet';
import { databaseClient } from './databaseService';

const debug = debugLib('greenrun-sports:BetService');

export default class BetService {
    public static createBet(bet: IBet): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('bets').insert(bet);
                resolve({ status: 200, data: 'bet created.' });
            } catch (error: any) {
                debug('error when try created bet: %s', error);
                reject(error);
            }
        });
    }

    public static updateBet(bet: IBet): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('bets').where({ id: bet.id }).update(bet);
                resolve({ status: 200, data: 'bet updated.' });
            } catch (error: any) {
                debug('error when try updated bet: %s', error);
                reject(error);
            }
        });
    }

    public static getBets(): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const betsList = await databaseClient
                    .from('bets')
                    .join('sports', 'bets.sport', '=', 'sports.id')
                    .join('events', 'bets.event_id', '=', 'events.id')
                    .join('bet_status', 'bets.status', '=', 'bet_status.id')
                    .join('bet_result', 'bets.result', '=', 'bet_result.id')
                    .select(
                        'bets.id',
                        'bets.bet_option',
                        'bets.sport as sport_id',
                        'sports.name as sport',
                        'bets.status as status_id',
                        'bet_status.name as status',
                        'bets.name',
                        'bets.event_id',
                        'events.name as event',
                        'bets.odd',
                        'bets.result as result_id',
                        'bet_result.name as result',
                        'bets.created_at',
                        'bets.updated_at',
                        'bets.deleted',
                        'bets.deleted_at'
                    );
                resolve({
                    status: 200,
                    data: { rows: betsList, total: betsList.length },
                });
            } catch (error: any) {
                debug('error when try get bets list: %s', error);
                reject(error);
            }
        });
    }

    public static getBetById(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const betMatch = await databaseClient
                    .from('bets')
                    .join('sports', 'bets.sport', '=', 'sports.id')
                    .join('events', 'bets.event_id', '=', 'events.id')
                    .join('bet_status', 'bets.status', '=', 'bet_status.id')
                    .join('bet_result', 'bets.result', '=', 'bet_result.id')
                    .where({ 'bets.id': id })
                    .select(
                        'bets.id',
                        'bets.bet_option',
                        'bets.sport as sport_id',
                        'sports.name as sport',
                        'bets.status as status_id',
                        'bet_status.name as status',
                        'bets.name',
                        'bets.event_id',
                        'events.name as event',
                        'bets.odd',
                        'bets.result as result_id',
                        'bet_result.name as result',
                        'bets.created_at',
                        'bets.updated_at',
                        'bets.deleted',
                        'bets.deleted_at'
                    )
                    .limit(1);
                resolve({ status: 200, data: betMatch[0] });
            } catch (error: any) {
                debug('error when try get bet: %s', error);
                reject(error);
            }
        });
    }

    public static deleteBet(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('bets')
                    .where({ id })
                    .update({ deleted: true, deleted_at: new Date() });
                resolve({ status: 200, data: 'bet deleted.' });
            } catch (error: any) {
                debug('error when try deleted bet: %s', error);
                reject(error);
            }
        });
    }
}
