import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import ICountry from '../models/ICountry';
import CountryService from '../services/countryService';
import OpenApiValidatorProvider from '../utils/OpenApiValidator';

const countryController = Router();
const validator = OpenApiValidatorProvider.getValidator();
const debug = debugLib('greenrun-sports:countryController');

countryController.post(
    '/',
    [validator.validate('post', '/countries')],
    async (request: Request, response: Response) => {
        try {
            const country: ICountry = request.body;
            debug('created country: %s', country.name);
            const countryServiceResult = await CountryService.createCountry(country);
            response.status(countryServiceResult.status).send(countryServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

countryController.put(
    '/:id',
    [validator.validate('put', '/countries/{id}')],
    async (request: Request, response: Response) => {
        try {
            const country: ICountry = request.body;
            country.id = Number(request.params.id);
            debug('updated country with id: %s', country.id);
            const countryServiceResult = await CountryService.updateCountry(country);
            response.status(countryServiceResult.status).send(countryServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

countryController.get(
    '/',
    [validator.validate('get', '/countries')],
    async (request: Request, response: Response) => {
        try {
            const countryServiceResult = await CountryService.getCountries();
            response.status(countryServiceResult.status).send(countryServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

countryController.get(
    '/:id',
    [validator.validate('get', '/countries/{id}')],
    async (request: Request, response: Response) => {
        try {
            const countryId = Number(request.params.id);
            const countryServiceResult = await CountryService.getCountryById(
                countryId
            );
            response.status(countryServiceResult.status).send(countryServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

countryController.delete(
    '/:id',
    [validator.validate('delete', '/countries/{id}')],
    async (request: Request, response: Response) => {
        try {
            const countryId = Number(request.params.id);
            debug('deleted country with id: %s', countryId);
            const countryServiceResult = await CountryService.deleteCountry(
                countryId
            );
            response.status(countryServiceResult.status).send(countryServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

export default countryController;
