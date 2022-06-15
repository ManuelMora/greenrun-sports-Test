import debugLib from 'debug';
import IResponse from '../models/IResponse';
import ICountry from '../models/ICountry';
import { databaseClient } from './databaseService';

const debug = debugLib('greenrun-sports:CountryService');

export default class CountryService {
    public static createCountry(country: ICountry): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('countries').insert(country);
                resolve({ status: 200, data: 'country created.' });
            } catch (error: any) {
                debug('error when try created country: %s', error);
                reject(error);
            }
        });
    }

    public static updateCountry(country: ICountry): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('countries')
                    .where({ id: country.id })
                    .update(country);
                resolve({ status: 200, data: 'country updated.' });
            } catch (error: any) {
                debug('error when try updated country: %s', error);
                reject(error);
            }
        });
    }

    public static getCountries(): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const countriesList = await databaseClient
                    .from('countries')
                    .where({ country_status: true })
                    .select();
                resolve({
                    status: 200,
                    data: { rows: countriesList, total: countriesList.length },
                });
            } catch (error: any) {
                debug('error when try get countries list: %s', error);
                reject(error);
            }
        });
    }

    public static getCountryById(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const countryMatch = await databaseClient
                    .from('countries')
                    .where({ id })
                    .select()
                    .limit(1);
                resolve({ status: 200, data: countryMatch[0] });
            } catch (error: any) {
                debug('error when try get country: %s', error);
                reject(error);
            }
        });
    }

    public static deleteCountry(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('countries')
                    .where({ id })
                    .update({ country_status: false });
                resolve({ status: 200, data: 'country deleted.' });
            } catch (error: any) {
                debug('error when try deleted country: %s', error);
                reject(error);
            }
        });
    }
}
