import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import ISport from '../models/ISport';
import SportService from '../services/sportService';
import OpenApiValidatorProvider from '../utils/OpenApiValidator';

const sportController = Router();
const validator = OpenApiValidatorProvider.getValidator();
const debug = debugLib('greenrun-sports:sportController');

sportController.post(
    '/',
    [validator.validate('post', '/sports')],
    async (request: Request, response: Response) => {
        try {
            const sport: ISport = request.body;
            debug('created sport: %s', sport.name);
            const sportServiceResult = await SportService.createSport(sport);
            response.status(sportServiceResult.status).send(sportServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

sportController.put(
    '/:id',
    [validator.validate('put', '/sports/{id}')],
    async (request: Request, response: Response) => {
        try {
            const sport: ISport = request.body;
            sport.id = Number(request.params.id);
            debug('updated sport with id: %s', sport.id);
            const sportServiceResult = await SportService.updateSport(sport);
            response.status(sportServiceResult.status).send(sportServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

sportController.get(
    '/',
    [validator.validate('get', '/sports')],
    async (request: Request, response: Response) => {
        try {
            const sportServiceResult = await SportService.getSports();
            response.status(sportServiceResult.status).send(sportServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

sportController.get(
    '/:id',
    [validator.validate('get', '/sports/{id}')],
    async (request: Request, response: Response) => {
        try {
            const sportId = Number(request.params.id);
            const sportServiceResult = await SportService.getSportById(sportId);
            response.status(sportServiceResult.status).send(sportServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

sportController.delete(
    '/:id',
    [validator.validate('delete', '/sports/{id}')],
    async (request: Request, response: Response) => {
        try {
            const sportId = Number(request.params.id);
            debug('deleted sport with id: %s', sportId);
            const sportServiceResult = await SportService.deleteSport(sportId);
            response.status(sportServiceResult.status).send(sportServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

export default sportController;
