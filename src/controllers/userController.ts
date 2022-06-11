import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import IUser from '../models/IUser';
import UserService from '../services/userService';

const userController = Router();
const debug = debugLib('greenrun-sports:userController');

userController.post('/', async (request: Request, response: Response) => {
    try {
        const user: IUser = request.body;
        debug('created user with email: %s', user.email);
        const userServiceResult = await UserService.createUser(user);
        response.status(userServiceResult.status).send(userServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

userController.put('/:id', async (request: Request, response: Response) => {
    try {
        const user: IUser = request.body;
        user.id = Number(request.params.id);
        debug('updated user with id: %s', user.id);
        const userServiceResult = await UserService.updateUser(user);
        response.status(userServiceResult.status).send(userServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

userController.get('/', async (request: Request, response: Response) => {
    try {
        const userServiceResult = await UserService.getUsers();
        response.status(userServiceResult.status).send(userServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

userController.get('/:id', async (request: Request, response: Response) => {
    try {
        const userId = Number(request.params.id);
        const userServiceResult = await UserService.getUserById(userId);
        response.status(userServiceResult.status).send(userServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

userController.delete('/:id', async (request: Request, response: Response) => {
    try {
        const userId = Number(request.params.id);
        debug('deleted user with id: %s', userId);
        const userServiceResult = await UserService.deleteUser(userId);
        response.status(userServiceResult.status).send(userServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

export default userController;
