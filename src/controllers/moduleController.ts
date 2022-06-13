import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import IModule from '../models/IModule';
import ModuleService from '../services/moduleService';
import OpenApiValidatorProvider from '../utils/OpenApiValidator';

const moduleController = Router();
const validator = OpenApiValidatorProvider.getValidator();
const debug = debugLib('greenrun-sports:moduleController');

moduleController.post(
    '/',
    [validator.validate('post', '/modules')],
    async (request: Request, response: Response) => {
        try {
            const module: IModule = request.body;
            debug('created module: %s', module.name);
            const moduleServiceResult = await ModuleService.createModule(module);
            response.status(moduleServiceResult.status).send(moduleServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

moduleController.put(
    '/:id',
    [validator.validate('put', '/modules/{id}')],
    async (request: Request, response: Response) => {
        try {
            const module: IModule = request.body;
            module.id = Number(request.params.id);
            debug('updated module with id: %s', module.id);
            const moduleServiceResult = await ModuleService.updateModule(module);
            response.status(moduleServiceResult.status).send(moduleServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

moduleController.get(
    '/',
    [validator.validate('get', '/modules')],
    async (request: Request, response: Response) => {
        try {
            const moduleServiceResult = await ModuleService.getModules();
            response.status(moduleServiceResult.status).send(moduleServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

moduleController.get(
    '/:id',
    [validator.validate('get', '/modules/{id}')],
    async (request: Request, response: Response) => {
        try {
            const moduleId = Number(request.params.id);
            const moduleServiceResult = await ModuleService.getModuleById(moduleId);
            response.status(moduleServiceResult.status).send(moduleServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

moduleController.delete(
    '/:id',
    [validator.validate('delete', '/modules/{id}')],
    async (request: Request, response: Response) => {
        try {
            const moduleId = Number(request.params.id);
            debug('deleted module with id: %s', moduleId);
            const moduleServiceResult = await ModuleService.deleteModule(moduleId);
            response.status(moduleServiceResult.status).send(moduleServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

export default moduleController;
