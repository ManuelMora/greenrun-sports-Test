import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import IUserBet from '../models/IUserBet';
import UserBetService from '../services/userBetService';
import OpenApiValidatorProvider from '../utils/OpenApiValidator';
import { EBetResult } from '../models/IBet';

const userBetController = Router();
const validator = OpenApiValidatorProvider.getValidator();
const debug = debugLib('greenrun-sports:userBetController');

userBetController.post(
    '/',
    [validator.validate('post', '/user/bets')],
    async (request: Request, response: Response) => {
        try {
            const userBet: IUserBet = request.body;
            userBet.state = EBetResult[userBet.state_id as keyof typeof EBetResult];
            delete userBet.state_id;
            debug('created uset bet on bet number: %j', userBet);
            const userBetServiceResult = await UserBetService.createUserBet(userBet);
            response.status(userBetServiceResult.status).send(userBetServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

userBetController.put(
    '/:id',
    [validator.validate('put', '/user/bets/{id}')],
    async (request: Request, response: Response) => {
        try {
            const userBet: IUserBet = request.body;
            userBet.id = Number(request.params.id);
            userBet.state = EBetResult[userBet.state_id as keyof typeof EBetResult];
            delete userBet.state_id;
            debug('updated event with id: %s', userBet.id);
            const userBetServiceResult = await UserBetService.updateUserBet(userBet);
            response.status(userBetServiceResult.status).send(userBetServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

userBetController.get(
    '/',
    [validator.validate('get', '/user/bets')],
    async (request: Request, response: Response) => {
        try {
            const userBetServiceResult = await UserBetService.getUserBets();
            response.status(userBetServiceResult.status).send(userBetServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

userBetController.get(
    '/filter/:id',
    [validator.validate('get', '/user/bets/filter/{id}')],
    async (request: Request, response: Response) => {
        try {
            const userId = Number(request.params.id);
            const userBetServiceResult = await UserBetService.getUserBetsByUserId(
                userId
            );
            response.status(userBetServiceResult.status).send(userBetServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

userBetController.get(
    '/:id',
    [validator.validate('get', '/user/bets/{id}')],
    async (request: Request, response: Response) => {
        try {
            const userBetId = Number(request.params.id);
            const userBetServiceResult = await UserBetService.getUserBetById(
                userBetId
            );
            response.status(userBetServiceResult.status).send(userBetServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

userBetController.delete(
    '/:id',
    [validator.validate('delete', '/user/bets/{id}')],
    async (request: Request, response: Response) => {
        try {
            const eventId = Number(request.params.id);
            debug('deleted event with id: %s', eventId);
            const userBetServiceResult = await UserBetService.deleteUserBet(eventId);
            response.status(userBetServiceResult.status).send(userBetServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

export default userBetController;
