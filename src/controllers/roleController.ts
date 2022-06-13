import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import IRole from '../models/IRole';
import RoleService from '../services/roleService';

const roleController = Router();
const debug = debugLib('greenrun-sports:roleController');

roleController.post('/', async (request: Request, response: Response) => {
    try {
        const role: IRole = request.body;
        debug('created role: %s', role.name);
        const roleServiceResult = await RoleService.createRole(role);
        response.status(roleServiceResult.status).send(roleServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

roleController.put('/:id', async (request: Request, response: Response) => {
    try {
        const role: IRole = request.body;
        role.id = Number(request.params.id);
        debug('updated role with id: %s', role.id);
        const roleServiceResult = await RoleService.updateRole(role);
        response.status(roleServiceResult.status).send(roleServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

roleController.get('/', async (request: Request, response: Response) => {
    try {
        const roleServiceResult = await RoleService.getRoles();
        response.status(roleServiceResult.status).send(roleServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

roleController.get('/:id', async (request: Request, response: Response) => {
    try {
        const roleId = Number(request.params.id);
        const roleServiceResult = await RoleService.getRoleById(roleId);
        response.status(roleServiceResult.status).send(roleServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

roleController.delete('/:id', async (request: Request, response: Response) => {
    try {
        const roleId = Number(request.params.id);
        debug('deleted role with id: %s', roleId);
        const roleServiceResult = await RoleService.deleteRole(roleId);
        response.status(roleServiceResult.status).send(roleServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

export default roleController;
