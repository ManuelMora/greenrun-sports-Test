import debugLib from 'debug';
import IResponse from '../models/IResponse';
import IModule from '../models/IModule';
import { databaseClient } from './databaseService';

const debug = debugLib('greenrun-sports:ModuleService');

export default class ModuleService {
    public static createModule(module: IModule): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('modules').insert(module);
                resolve({ status: 200, data: 'module created.' });
            } catch (error: any) {
                debug('error when try created module: %s', error);
                reject(error);
            }
        });
    }

    public static updateModule(module: IModule): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('modules')
                    .where({ id: module.id })
                    .update(module);
                resolve({ status: 200, data: 'module updated.' });
            } catch (error: any) {
                debug('error when try updated module: %s', error);
                reject(error);
            }
        });
    }

    public static getModules(): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const modulesList = await databaseClient
                    .from('modules')
                    .where({ status: true })
                    .select();
                resolve({
                    status: 200,
                    data: { rows: modulesList, total: modulesList.length },
                });
            } catch (error: any) {
                debug('error when try get modules list: %s', error);
                reject(error);
            }
        });
    }

    public static getModuleById(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const moduleMatch = await databaseClient
                    .from('modules')
                    .where({ id })
                    .select()
                    .limit(1);
                resolve({ status: 200, data: moduleMatch[0] });
            } catch (error: any) {
                debug('error when try get module: %s', error);
                reject(error);
            }
        });
    }

    public static deleteModule(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('modules')
                    .where({ id })
                    .update({ status: false });
                resolve({ status: 200, data: 'module deleted.' });
            } catch (error: any) {
                debug('error when try deleted module: %s', error);
                reject(error);
            }
        });
    }
}
