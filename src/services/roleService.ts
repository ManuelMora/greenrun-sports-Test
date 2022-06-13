import debugLib from 'debug';
import IResponse from '../models/IResponse';
import IRole from '../models/IRole';
import { databaseClient } from './databaseService';

const debug = debugLib('greenrun-sports:RoleService');

export default class RoleService {
    public static createRole(role: IRole): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('roles').insert(role);
                resolve({ status: 200, data: 'role created.' });
            } catch (error: any) {
                debug('error when try created role: %s', error);
                reject(error);
            }
        });
    }

    public static updateRole(role: IRole): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('roles').where({ id: role.id }).update(role);
                resolve({ status: 200, data: 'role updated.' });
            } catch (error: any) {
                debug('error when try updated role: %s', error);
                reject(error);
            }
        });
    }

    public static getRoles(): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const rolesList = await databaseClient
                    .from('roles')
                    .where({ status: true })
                    .select();
                resolve({
                    status: 200,
                    data: { rows: rolesList, total: rolesList.length },
                });
            } catch (error: any) {
                debug('error when try get roles list: %s', error);
                reject(error);
            }
        });
    }

    public static getRoleById(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const roleMatch = await databaseClient
                    .from('roles')
                    .where({ id })
                    .select()
                    .limit(1);
                resolve({ status: 200, data: roleMatch[0] });
            } catch (error: any) {
                debug('error when try get role: %s', error);
                reject(error);
            }
        });
    }

    public static deleteRole(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('roles')
                    .where({ id })
                    .update({ status: false });
                resolve({ status: 200, data: 'role deleted.' });
            } catch (error: any) {
                debug('error when try deleted role: %s', error);
                reject(error);
            }
        });
    }
}
