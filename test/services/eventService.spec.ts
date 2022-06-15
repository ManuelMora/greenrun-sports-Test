import { expect } from 'chai';
import sinon from 'sinon';
import IEvent from '../../src/models/IEvent';
import EventService from '../../src/services/eventService';
import { databaseClient } from '../../src/services/databaseService';

describe('EventService', () => {
    const mockEvent: IEvent = {
        name: 'Borussia Dortmund VS Barcelona',
    };
    const mockEventsList = [
        {
            id: 1,
            name: 'Borussia Dortmund VS Barcelona',
            status: 'ACTIVE',
        },
    ];
    // Mocks
    const whereStub = sinon.stub().returnsThis();

    afterEach(() => {
        sinon.restore();
    });

    it('should create event', async () => {
        const insertStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                insert: insertStub,
            };
        });
        const createEventTest = await EventService.createEvent(mockEvent);
        expect(createEventTest.data).equal('event created.');
    });

    it('should failed create event', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await EventService.createEvent(mockEvent);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should update event', async () => {
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updateEventTest = await EventService.updateEvent(mockEvent);
        expect(updateEventTest.data).equal('event updated.');
    });

    it('should failed update event', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await EventService.updateEvent(mockEvent);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get events', async () => {
        const selectStub = sinon.stub().resolves(mockEventsList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
            };
        });
        const getEventsTest = await EventService.getEvents();
        expect(getEventsTest.data.total).equal(1);
    });

    it('should failed get events', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await EventService.getEvents();
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get event by Id', async () => {
        const selectStub = sinon.stub().returnsThis();
        const limitStub = sinon.stub().resolves(mockEventsList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
                limit: limitStub,
            };
        });
        const getEventByIdTest = await EventService.getEventById(1);
        expect(getEventByIdTest.data).equal(mockEventsList[0]);
    });

    it('should failed get event by Id', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await EventService.getEventById(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should finished event', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const finishedEventTest = await EventService.finishEvent(1);
        expect(finishedEventTest.data).equal('event finished.');
    });

    it('should failed finished event', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await EventService.finishEvent(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should delete event', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const deleteEventTest = await EventService.deleteEvent(1);
        expect(deleteEventTest.data).equal('event deleted.');
    });

    it('should failed delete event', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await EventService.deleteEvent(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
