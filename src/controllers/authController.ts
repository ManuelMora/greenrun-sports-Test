import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import IAuth from '../models/IAuth';
import AuthService from '../services/auth/authService';

const authController = Router();
const debug = debugLib('greenrun-sports:authController');

authController.post('/', async (request: Request, response: Response) => {
    try {
        const credentials: IAuth = request.body;
        debug('start new auth flow');
        const authServiceResult = await AuthService.authUser(credentials);
        response.status(authServiceResult.status).send(authServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

export default authController;
