import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import ICountry from '../models/ICountry';
import CountryService from '../services/countryService';

const countryController = Router();
const debug = debugLib('greenrun-sports:countryController');

countryController.post('/', async (request: Request, response: Response) => {
    try {
        const country: ICountry = request.body;
        debug('created country: %s', country.name);
        const countryServiceResult = await CountryService.createCountry(country);
        response.status(countryServiceResult.status).send(countryServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

countryController.put('/:id', async (request: Request, response: Response) => {
    try {
        const country: ICountry = request.body;
        country.id = Number(request.params.id);
        debug('updated country with id: %s', country.id);
        const countryServiceResult = await CountryService.updateCountry(country);
        response.status(countryServiceResult.status).send(countryServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

countryController.get('/', async (request: Request, response: Response) => {
    try {
        const countryServiceResult = await CountryService.getCountries();
        response.status(countryServiceResult.status).send(countryServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

countryController.get('/:id', async (request: Request, response: Response) => {
    try {
        const countryId = Number(request.params.id);
        const countryServiceResult = await CountryService.getCountryById(countryId);
        response.status(countryServiceResult.status).send(countryServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

countryController.delete('/:id', async (request: Request, response: Response) => {
    try {
        const countryId = Number(request.params.id);
        debug('deleted country with id: %s', countryId);
        const countryServiceResult = await CountryService.deleteCountry(countryId);
        response.status(countryServiceResult.status).send(countryServiceResult);
    } catch (error: any) {
        response.status(error.status || 500).send(error.message || error);
    }
});

export default countryController;
