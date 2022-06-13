import debugLib from 'debug';
import IResponse from '../models/IResponse';
import ISport from '../models/ISport';
import { databaseClient } from './databaseService';

const debug = debugLib('greenrun-sports:SportService');

export default class SportService {
    public static createSport(sport: ISport): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('sports').insert(sport);
                resolve({ status: 200, data: 'sport created.' });
            } catch (error: any) {
                debug('error when try created sport: %s', error);
                reject(error);
            }
        });
    }

    public static updateSport(sport: ISport): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('sports')
                    .where({ id: sport.id })
                    .update(sport);
                resolve({ status: 200, data: 'sport updated.' });
            } catch (error: any) {
                debug('error when try updated sport: %s', error);
                reject(error);
            }
        });
    }

    public static getSports(): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const sportsList = await databaseClient
                    .from('sports')
                    .where({ status: true })
                    .select();
                resolve({
                    status: 200,
                    data: { rows: sportsList, total: sportsList.length },
                });
            } catch (error: any) {
                debug('error when try get sports list: %s', error);
                reject(error);
            }
        });
    }

    public static getSportById(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const sportMatch = await databaseClient
                    .from('sports')
                    .where({ id })
                    .select()
                    .limit(1);
                resolve({ status: 200, data: sportMatch[0] });
            } catch (error: any) {
                debug('error when try get sport: %s', error);
                reject(error);
            }
        });
    }

    public static deleteSport(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('sports')
                    .where({ id })
                    .update({ status: false });
                resolve({ status: 200, data: 'sport deleted.' });
            } catch (error: any) {
                debug('error when try deleted sport: %s', error);
                reject(error);
            }
        });
    }
}
