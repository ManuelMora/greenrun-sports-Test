import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import IUser from '../models/IUser';
import UserService from '../services/userService';
import BcryptService from '../services/auth/cryptoService';
import config from '../config';
import OpenApiValidatorProvider from '../utils/OpenApiValidator';
import MiddlewareApi from '../middlewares/middlewareApi';

const userController = Router();
const validator = OpenApiValidatorProvider.getValidator();
const debug = debugLib('greenrun-sports:userController');

userController.post(
    '/',
    [MiddlewareApi.validateSession, validator.validate('post', '/users')],
    async (request: Request, response: Response) => {
        try {
            const user: IUser = request.body;
            user.password = await BcryptService.generateHash(config.defaultPassword);
            debug('created user with email: %s', user.email);
            const userServiceResult = await UserService.createUser(user);
            response.status(userServiceResult.status).send(userServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

userController.put(
    '/:id',
    [MiddlewareApi.validateSession, validator.validate('put', '/users/{id}')],
    async (request: Request, response: Response) => {
        try {
            const user: IUser = request.body;
            user.id = Number(request.params.id);
            debug('updated user with id: %s', user.id);
            const userServiceResult = await UserService.updateUser(user);
            response.status(userServiceResult.status).send(userServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

userController.get(
    '/',
    [MiddlewareApi.validateSession, validator.validate('get', '/users')],
    async (request: Request, response: Response) => {
        try {
            const userServiceResult = await UserService.getUsers();
            response.status(userServiceResult.status).send(userServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

userController.get(
    '/:id',
    [MiddlewareApi.validateSession, validator.validate('get', '/users/{id}')],
    async (request: Request, response: Response) => {
        try {
            const userId = Number(request.params.id);
            const userServiceResult = await UserService.getUserById(userId);
            response.status(userServiceResult.status).send(userServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

userController.delete(
    '/:id',
    [MiddlewareApi.validateSession, validator.validate('delete', '/users/{id}')],
    async (request: Request, response: Response) => {
        try {
            const userId = Number(request.params.id);
            debug('deleted user with id: %s', userId);
            const userServiceResult = await UserService.deleteUser(userId);
            response.status(userServiceResult.status).send(userServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

export default userController;
