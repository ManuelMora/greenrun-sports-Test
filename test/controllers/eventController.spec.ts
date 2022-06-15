import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import MiddlewareApi from '../../src/middlewares/middlewareApi';
import IEvent from '../../src/models/IEvent';
import IResponse from '../../src/models/IResponse';
import JwtService from '../../src/services/auth/jwtService';
import EventService from '../../src/services/eventService';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('eventController', () => {
    const mockevent: IEvent = {
        "name": "Borussia Dortmund VS Barcelona"
    };
    const mockeventById = {
        status: 200,
        data:
        {
            "id": 1,
            "name": "Borussia Dortmund VS Barcelona",
            "status": "ACTIVE"
        },
    };
    const mockeventsList = {
        status: 200,
        data: {
            rows: [
                {
                    "id": 1,
                    "name": "Borussia Dortmund VS Barcelona",
                    "status": "ACTIVE"
                },
            ], total: 1
        }
    };

    afterEach(() => {
        sinon.restore();
    });

    beforeEach(() => {
        sinon.stub(JwtService, 'validateToken').callsFake(() => {
            return Promise<void>.resolve({ id: 1 });
        });
        sinon.stub(MiddlewareApi, 'validateSession').callsFake(() => {
            return Promise<void>.resolve();
        });
    });

    it('should request post event', (done) => {
        sinon.stub(EventService, 'createEvent').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'event created.' })
        });
        chai.request(app)
            .post('/V1/events')
            .set('Authorization', 'Bearer 123')
            .send(mockevent)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request post event', (done) => {
        sinon.stub(EventService, 'createEvent').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .post('/V1/events')
            .set('Authorization', 'Bearer 123')
            .send(mockevent)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request put event', (done) => {
        sinon.stub(EventService, 'updateEvent').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'event updated.' })
        });
        chai.request(app)
            .put('/V1/events/1')
            .set('Authorization', 'Bearer 123')
            .send(mockevent)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request put event', (done) => {
        sinon.stub(EventService, 'updateEvent').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .put('/V1/events/1')
            .set('Authorization', 'Bearer 123')
            .send(mockevent)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get events', (done) => {
        sinon.stub(EventService, 'getEvents').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockeventsList })
        });
        chai.request(app)
            .get('/V1/events')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get events', (done) => {
        sinon.stub(EventService, 'getEvents').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/events')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get event by id', (done) => {
        sinon.stub(EventService, 'getEventById').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockeventById })
        });
        chai.request(app)
            .get('/V1/events/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get event by id', (done) => {
        sinon.stub(EventService, 'getEventById').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/events/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request finished event by id', (done) => {
        sinon.stub(EventService, 'finishEvent').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'event finished.' })
        });
        chai.request(app)
            .put('/V1/events/status/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request finished event by id', (done) => {
        sinon.stub(EventService, 'finishEvent').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .put('/V1/events/status/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request delete event by id', (done) => {
        sinon.stub(EventService, 'deleteEvent').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'event deleted.' })
        });
        chai.request(app)
            .delete('/V1/events/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request delete event by id', (done) => {
        sinon.stub(EventService, 'deleteEvent').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .delete('/V1/events/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });
});
