import debugLib from 'debug';
import IResponse from '../models/IResponse';
import IRolePermission from '../models/IRolePermission';
import { databaseClient } from './databaseService';

const debug = debugLib('greenrun-sports:RolePermissionService');

export default class RolePermissionService {
    public static createNewPermissionFromRole(
        rolePermission: IRolePermission
    ): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('role_permissions').insert(rolePermission);
                resolve({ status: 200, data: 'permission to role created.' });
            } catch (error: any) {
                debug('error when try created permission to role: %s', error);
                reject(error);
            }
        });
    }

    public static getPermissionsFromRoles(): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const rolePermissionsList = await databaseClient
                    .from('role_permissions')
                    .join('roles', 'role_permissions.role_id', '=', 'roles.id')
                    .join('modules', 'role_permissions.module_id', '=', 'modules.id')
                    .join(
                        'role_actions',
                        'role_permissions.role_action',
                        '=',
                        'role_actions.id'
                    )
                    .select(
                        'role_permissions.role_id',
                        'roles.name as role',
                        'role_permissions.module_id',
                        'modules.name as module',
                        'role_permissions.role_action',
                        'role_actions.name as action'
                    )
                    .orderBy([
                        { column: 'roles.name', order: 'asc' },
                        { column: 'modules.name', order: 'asc' },
                        { column: 'role_actions.name', order: 'asc' },
                    ]);
                resolve({
                    status: 200,
                    data: {
                        rows: rolePermissionsList,
                        total: rolePermissionsList.length,
                    },
                });
            } catch (error: any) {
                debug('error when try get permissions roles list: %s', error);
                reject(error);
            }
        });
    }

    public static getPermissionsFromRoleId(roleId: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const roleMatch = await databaseClient
                    .from('role_permissions')
                    .join('roles', 'role_permissions.role_id', '=', 'roles.id')
                    .join('modules', 'role_permissions.module_id', '=', 'modules.id')
                    .join(
                        'role_actions',
                        'role_permissions.role_action',
                        '=',
                        'role_actions.id'
                    )
                    .where({ role_id: roleId })
                    .select(
                        'role_permissions.role_id',
                        'roles.name as role',
                        'role_permissions.module_id',
                        'modules.name as module',
                        'role_permissions.role_action',
                        'role_actions.name as action'
                    )
                    .orderBy([
                        { column: 'roles.name', order: 'asc' },
                        { column: 'modules.name', order: 'asc' },
                        { column: 'role_actions.name', order: 'asc' },
                    ]);
                resolve({
                    status: 200,
                    data: { rows: roleMatch, total: roleMatch.length },
                });
            } catch (error: any) {
                debug('error when try get permissions from a role: %s', error);
                reject(error);
            }
        });
    }

    public static deletePermissionFromRole(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('role_permissions')
                    .where({
                        id,
                    })
                    .del();
                resolve({ status: 200, data: 'permission from role deleted.' });
            } catch (error: any) {
                debug('error when try deleted role: %s', error);
                reject(error);
            }
        });
    }
}
