import debugLib from 'debug';
import IResponse from "../models/IResponse";
import IUser from "../models/IUser";
import { databaseClient } from "./databaseService";

const debug = debugLib('greenrun-sports:UserService');

export default class UserService {
    public static createUser(user: IUser): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient<IUser>('users').insert(user);
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
                await databaseClient<IUser>('users').where({ id: user.id }).update(user);
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
                const usersList = await databaseClient<IUser>('users').where({ deleted: false }).select();
                resolve({ status: 200, data: { rows: usersList, total: usersList.length } })
            } catch (error: any) {
                debug('error when try get users list: %s', error);
                reject(error);
            }
        });
    }

    public static getUserById(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const usersList = await databaseClient<IUser>('users').where({ id }).select().limit(1);
                resolve({ status: 200, data: usersList })
            } catch (error: any) {
                debug('error when try get user: %s', error);
                reject(error);
            }
        });
    }

    public static deleteUser(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient<IUser>('users').where({ id }).update({ deleted: true });
                resolve({ status: 200, data: 'user deleted.' });
            } catch (error: any) {
                debug('error when try deleted user: %s', error);
                reject(error);
            }
        });
    }
}
