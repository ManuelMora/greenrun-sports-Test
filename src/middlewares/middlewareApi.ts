import debugLib from 'debug';
import { NextFunction, Request, Response } from 'express';
import JwtService from '../services/auth/jwtService';

const debug = debugLib('carwash:MiddlewareApi');

export default class MiddlewareApi {
    public static async validateSession(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        debug('validate a new session!');
        const authHeader = req.headers.authorization;
        if (authHeader) {
            try {
                const token = authHeader.split(' ')[1];
                const user = await JwtService.validateToken(token);
                res.locals.user = user;
                next();
            } catch (error) {
                res.status(403).send({ status: 403, data: error });
            }
        } else {
            res.status(403).send({
                status: 403,
                data: 'unauthorized user!',
            });
        }
    }
}
