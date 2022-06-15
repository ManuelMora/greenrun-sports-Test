import debugLib from 'debug';
import IResponse from '../models/IResponse';
import IEvent, { EEventStatus } from '../models/IEvent';
import { databaseClient } from './databaseService';

const debug = debugLib('greenrun-sports:EventService');

export default class EventService {
    public static createEvent(event: IEvent): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('events').insert(event);
                resolve({ status: 200, data: 'event created.' });
            } catch (error: any) {
                debug('error when try created event: %s', error);
                reject(error);
            }
        });
    }

    public static updateEvent(event: IEvent): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('events')
                    .where({ id: event.id })
                    .update(event);
                resolve({ status: 200, data: 'event updated.' });
            } catch (error: any) {
                debug('error when try updated event: %s', error);
                reject(error);
            }
        });
    }

    public static getEvents(): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const eventsList = await databaseClient
                    .from('events')
                    .where({ status: true })
                    .select();
                resolve({
                    status: 200,
                    data: { rows: eventsList, total: eventsList.length },
                });
            } catch (error: any) {
                debug('error when try get events list: %s', error);
                reject(error);
            }
        });
    }

    public static getEventById(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const eventMatch = await databaseClient
                    .from('events')
                    .where({ id })
                    .select()
                    .limit(1);
                resolve({ status: 200, data: eventMatch[0] });
            } catch (error: any) {
                debug('error when try get event: %s', error);
                reject(error);
            }
        });
    }

    public static finishEvent(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('events')
                    .where({ id })
                    .update({ status: EEventStatus.FINISHED });
                resolve({ status: 200, data: 'event finished.' });
            } catch (error: any) {
                debug('error when try finished event: %s', error);
                reject(error);
            }
        });
    }

    public static deleteEvent(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('events')
                    .where({ id })
                    .update({ deleted: true, deleted_at: new Date() });
                resolve({ status: 200, data: 'event deleted.' });
            } catch (error: any) {
                debug('error when try deleted event: %s', error);
                reject(error);
            }
        });
    }
}
