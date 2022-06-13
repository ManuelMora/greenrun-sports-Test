import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import IRolePermission from '../models/IRolePermission';
import RolePermissionService from '../services/rolePermissionService';
import OpenApiValidatorProvider from '../utils/OpenApiValidator';

const rolePermissionController = Router();
const validator = OpenApiValidatorProvider.getValidator();

rolePermissionController.post(
    '/',
    [validator.validate('post', '/permissions')],
    async (request: Request, response: Response) => {
        try {
            const rolePermission: IRolePermission = request.body;
            const rolePermissionServiceResult =
                await RolePermissionService.createNewPermissionFromRole(rolePermission);
            response
                .status(rolePermissionServiceResult.status)
                .send(rolePermissionServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

rolePermissionController.get(
    '/',
    [validator.validate('get', '/permissions')],
    async (request: Request, response: Response) => {
        try {
            const rolePermissionServiceResult =
                await RolePermissionService.getPermissionsFromRoles();
            response
                .status(rolePermissionServiceResult.status)
                .send(rolePermissionServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

rolePermissionController.get(
    '/:role_id',
    [validator.validate('get', '/permissions/{role_id}')],
    async (request: Request, response: Response) => {
        try {
            const roleId = Number(request.params.role_id);
            const rolePermissionServiceResult =
                await RolePermissionService.getPermissionsFromRoleId(roleId);
            response
                .status(rolePermissionServiceResult.status)
                .send(rolePermissionServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

rolePermissionController.delete(
    '/:id',
    [validator.validate('delete', '/permissions/{id}')],
    async (request: Request, response: Response) => {
        try {
            const rolePermissionId = Number(request.params.role_id);
            const rolePermissionServiceResult =
                await RolePermissionService.deletePermissionFromRole(rolePermissionId);
            response
                .status(rolePermissionServiceResult.status)
                .send(rolePermissionServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

export default rolePermissionController;
