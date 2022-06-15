import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import MiddlewareApi from '../../src/middlewares/middlewareApi';
import IBet from '../../src/models/IBet';
import IResponse from '../../src/models/IResponse';
import JwtService from '../../src/services/auth/jwtService';
import BetService from '../../src/services/betService';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('betController', () => {
    const mockbet: IBet = {
        "bet_option": 1,
        "status_id": "ACTIVE",
        "sport": 1,
        "name": "Borussia Dortmund",
        "event_id": 1,
        "odd": 1
    };
    const mockBetById = {
        status: 200,
        data:
        {
            "id": 2,
            "bet_option": 1,
            "sport_id": 1,
            "sport": "soccer",
            "status_id": 1,
            "status": "ACTIVE",
            "name": "Borussia Dortmund",
            "event_id": 1,
            "event": "Borussia Dortmund vs BAyern Munich",
            "odd": "1",
            "result_id": 3,
            "result": "OPEN",
            "created_at": "2022-06-15T16:07:55.000Z",
            "updated_at": "2022-06-15T16:07:55.000Z",
            "deleted": 0,
            "deleted_at": null
        },
    };
    const mockBetsList = {
        status: 200,
        data: {
            rows: [
                {
                    "id": 2,
                    "bet_option": 1,
                    "sport_id": 1,
                    "sport": "soccer",
                    "status_id": 1,
                    "status": "ACTIVE",
                    "name": "Borussia Dortmund",
                    "event_id": 1,
                    "event": "Borussia Dortmund vs BAyern Munich",
                    "odd": "1",
                    "result_id": 3,
                    "result": "OPEN",
                    "created_at": "2022-06-15T16:07:55.000Z",
                    "updated_at": "2022-06-15T16:07:55.000Z",
                    "deleted": 0,
                    "deleted_at": null
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

    it('should request post bet', (done) => {
        sinon.stub(BetService, 'createBet').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'bet created.' })
        });
        chai.request(app)
            .post('/V1/bets')
            .set('Authorization', 'Bearer 123')
            .send(mockbet)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request post bet', (done) => {
        sinon.stub(BetService, 'createBet').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .post('/V1/bets')
            .set('Authorization', 'Bearer 123')
            .send(mockbet)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request put bet', (done) => {
        sinon.stub(BetService, 'updateBet').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'bet updated.' })
        });
        chai.request(app)
            .put('/V1/bets/1')
            .set('Authorization', 'Bearer 123')
            .send(mockbet)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request put bet', (done) => {
        sinon.stub(BetService, 'updateBet').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .put('/V1/bets/1')
            .set('Authorization', 'Bearer 123')
            .send(mockbet)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get bets', (done) => {
        sinon.stub(BetService, 'getBets').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockBetsList })
        });
        chai.request(app)
            .get('/V1/bets')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get bets', (done) => {
        sinon.stub(BetService, 'getBets').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/bets')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get bet by id', (done) => {
        sinon.stub(BetService, 'getBetById').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockBetById })
        });
        chai.request(app)
            .get('/V1/bets/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get bet by id', (done) => {
        sinon.stub(BetService, 'getBetById').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/bets/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request delete bet by id', (done) => {
        sinon.stub(BetService, 'deleteBet').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'bet deleted.' })
        });
        chai.request(app)
            .delete('/V1/bets/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request delete bet by id', (done) => {
        sinon.stub(BetService, 'deleteBet').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .delete('/V1/bets/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });
});
