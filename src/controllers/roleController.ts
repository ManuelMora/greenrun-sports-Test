import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import IRole from '../models/IRole';
import RoleService from '../services/roleService';
import OpenApiValidatorProvider from '../utils/OpenApiValidator';

const roleController = Router();
const validator = OpenApiValidatorProvider.getValidator();
const debug = debugLib('greenrun-sports:roleController');

roleController.post(
    '/',
    [validator.validate('post', '/roles')],
    async (request: Request, response: Response) => {
        try {
            const role: IRole = request.body;
            debug('created role: %s', role.name);
            const roleServiceResult = await RoleService.createRole(role);
            response.status(roleServiceResult.status).send(roleServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

roleController.put(
    '/:id',
    [validator.validate('put', '/roles/{id}')],
    async (request: Request, response: Response) => {
        try {
            const role: IRole = request.body;
            role.id = Number(request.params.id);
            debug('updated role with id: %s', role.id);
            const roleServiceResult = await RoleService.updateRole(role);
            response.status(roleServiceResult.status).send(roleServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

roleController.get(
    '/',
    [validator.validate('get', '/roles')],
    async (request: Request, response: Response) => {
        try {
            const roleServiceResult = await RoleService.getRoles();
            response.status(roleServiceResult.status).send(roleServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

roleController.get(
    '/:id',
    [validator.validate('get', '/roles/{id}')],
    async (request: Request, response: Response) => {
        try {
            const roleId = Number(request.params.id);
            const roleServiceResult = await RoleService.getRoleById(roleId);
            response.status(roleServiceResult.status).send(roleServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

roleController.delete(
    '/:id',
    [validator.validate('delete', '/roles/{id}')],
    async (request: Request, response: Response) => {
        try {
            const roleId = Number(request.params.id);
            debug('deleted role with id: %s', roleId);
            const roleServiceResult = await RoleService.deleteRole(roleId);
            response.status(roleServiceResult.status).send(roleServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

export default roleController;
