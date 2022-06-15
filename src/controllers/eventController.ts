import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import IEvent, { EEventStatus } from '../models/IEvent';
import EventService from '../services/eventService';
import OpenApiValidatorProvider from '../utils/OpenApiValidator';

const eventController = Router();
const validator = OpenApiValidatorProvider.getValidator();
const debug = debugLib('greenrun-sports:eventController');

eventController.post(
    '/',
    [validator.validate('post', '/events')],
    async (request: Request, response: Response) => {
        try {
            const event: IEvent = request.body;
            debug('created event: %s', event.name);
            const eventServiceResult = await EventService.createEvent(event);
            response.status(eventServiceResult.status).send(eventServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

eventController.put(
    '/:id',
    [validator.validate('put', '/events/{id}')],
    async (request: Request, response: Response) => {
        try {
            const event: IEvent = request.body;
            event.id = Number(request.params.id);
            event.status = EEventStatus[event.status as keyof typeof EEventStatus];
            debug('updated event with id: %s', event.id);
            const eventServiceResult = await EventService.updateEvent(event);
            response.status(eventServiceResult.status).send(eventServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

eventController.get(
    '/',
    [validator.validate('get', '/events')],
    async (request: Request, response: Response) => {
        try {
            const eventServiceResult = await EventService.getEvents();
            response.status(eventServiceResult.status).send(eventServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

eventController.get(
    '/:id',
    [validator.validate('get', '/events/{id}')],
    async (request: Request, response: Response) => {
        try {
            const eventId = Number(request.params.id);
            const eventServiceResult = await EventService.getEventById(eventId);
            response.status(eventServiceResult.status).send(eventServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

eventController.put(
    '/status/:id',
    [validator.validate('put', '/events/status/{id}')],
    async (request: Request, response: Response) => {
        try {
            const eventId = Number(request.params.id);
            debug('finished event with id: %s', eventId);
            const eventServiceResult = await EventService.finishEvent(eventId);
            response.status(eventServiceResult.status).send(eventServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

eventController.delete(
    '/:id',
    [validator.validate('delete', '/events/{id}')],
    async (request: Request, response: Response) => {
        try {
            const eventId = Number(request.params.id);
            debug('deleted event with id: %s', eventId);
            const eventServiceResult = await EventService.deleteEvent(eventId);
            response.status(eventServiceResult.status).send(eventServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

export default eventController;
