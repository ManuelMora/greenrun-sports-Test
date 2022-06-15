import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import ICity from '../models/ICity';
import CityService from '../services/cityService';
import OpenApiValidatorProvider from '../utils/OpenApiValidator';
import MiddlewareApi from '../middlewares/middlewareApi';

const cityController = Router();
const validator = OpenApiValidatorProvider.getValidator();
const debug = debugLib('greenrun-sports:cityController');

cityController.post(
    '/',
    [MiddlewareApi.validateSession, validator.validate('post', '/cities')],
    async (request: Request, response: Response) => {
        try {
            const city: ICity = request.body;
            debug('created city: %s', city.name);
            const cityServiceResult = await CityService.createCity(city);
            response.status(cityServiceResult.status).send(cityServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

cityController.put(
    '/:id',
    [MiddlewareApi.validateSession, validator.validate('put', '/cities/{id}')],
    async (request: Request, response: Response) => {
        try {
            const city: ICity = request.body;
            city.id = Number(request.params.id);
            debug('updated city with id: %s', city.id);
            const cityServiceResult = await CityService.updateCity(city);
            response.status(cityServiceResult.status).send(cityServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

cityController.get(
    '/',
    [MiddlewareApi.validateSession, validator.validate('get', '/cities')],
    async (request: Request, response: Response) => {
        try {
            const cityServiceResult = await CityService.getCities();
            response.status(cityServiceResult.status).send(cityServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

cityController.get(
    '/:id',
    [MiddlewareApi.validateSession, validator.validate('get', '/cities/{id}')],
    async (request: Request, response: Response) => {
        try {
            const cityId = Number(request.params.id);
            const cityServiceResult = await CityService.getCityById(cityId);
            response.status(cityServiceResult.status).send(cityServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

cityController.delete(
    '/:id',
    [MiddlewareApi.validateSession, validator.validate('delete', '/cities/{id}')],
    async (request: Request, response: Response) => {
        try {
            const cityId = Number(request.params.id);
            debug('deleted city with id: %s', cityId);
            const cityServiceResult = await CityService.deleteCity(cityId);
            response.status(cityServiceResult.status).send(cityServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

export default cityController;
