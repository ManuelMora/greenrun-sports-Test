import debugLib from 'debug';
import IResponse from '../models/IResponse';
import ICity from '../models/ICity';
import { databaseClient } from './databaseService';

const debug = debugLib('greenrun-sports:CityService');

export default class CityService {
    public static createCity(city: ICity): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('cities').insert(city);
                resolve({ status: 200, data: 'city created.' });
            } catch (error: any) {
                debug('error when try created city: %s', error);
                reject(error);
            }
        });
    }

    public static updateCity(city: ICity): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('cities')
                    .where({ id: city.id })
                    .update(city);
                resolve({ status: 200, data: 'city updated.' });
            } catch (error: any) {
                debug('error when try updated city: %s', error);
                reject(error);
            }
        });
    }

    public static getCities(): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const citiesList = await databaseClient.from('cities')
                    .join('countries', 'cities.country_id', '=', 'countries.id')
                    .where({ city_status: true })
                    .select(
                        'cities.id',
                        'cities.name',
                        'countries.id as country_id',
                        'countries.name as country',
                        'cities.city_status'
                    );
                resolve({
                    status: 200,
                    data: { rows: citiesList, total: citiesList.length },
                });
            } catch (error: any) {
                debug('error when try get cities list: %s', error);
                reject(error);
            }
        });
    }

    public static getCityById(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const cityMatch = await databaseClient.from('cities')
                    .join('countries', 'cities.country_id', '=', 'countries.id')
                    .where('cities.id', id)
                    .select(
                        'cities.id',
                        'cities.name',
                        'countries.id as country_id',
                        'countries.name as country',
                        'cities.city_status'
                    )
                    .limit(1);
                resolve({ status: 200, data: cityMatch[0] });
            } catch (error: any) {
                debug('error when try get city: %s', error);
                reject(error);
            }
        });
    }

    public static deleteCity(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('cities')
                    .where({ id })
                    .update({ city_status: false });
                resolve({ status: 200, data: 'city deleted.' });
            } catch (error: any) {
                debug('error when try deleted city: %s', error);
                reject(error);
            }
        });
    }
}
