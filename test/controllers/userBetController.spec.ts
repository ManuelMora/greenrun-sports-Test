import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import IUserBet from '../../src/models/IUserBet';
import IResponse from '../../src/models/IResponse';
import UserBetService from '../../src/services/userBetService';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('betController', () => {
    const mockUserBet: IUserBet = {
        "user_id": 1,
        "bet_id": 2,
        "state_id": "OPEN",
        "odd": 1,
        "amount": 10
    };
    const mockUserBetById = {
        status: 200,
        data:
        {
            "id": 3,
            "user_id": 1,
            "first_name": "Daniel",
            "username": "dani.millan07",
            "bet_id": 2,
            "bet": "Borussia Dortmund",
            "odd": 1,
            "amount": 10,
            "state": 3,
            "created_at": "2022-06-15T17:28:25.000Z",
            "updated_at": "2022-06-15T17:28:25.000Z",
            "deleted": 0,
            "deleted_at": null
        },
    };
    const mockUserBetsList = {
        status: 200,
        data: {
            rows: [
                {
                    "id": 3,
                    "user_id": 1,
                    "first_name": "Daniel",
                    "username": "dani.millan07",
                    "bet_id": 2,
                    "bet": "Borussia Dortmund",
                    "odd": 1,
                    "amount": 10,
                    "state": 3,
                    "created_at": "2022-06-15T17:28:25.000Z",
                    "updated_at": "2022-06-15T17:28:25.000Z",
                    "deleted": 0,
                    "deleted_at": null
                },
            ], total: 1
        }
    };

    afterEach(() => {
        sinon.restore();
    });

    it('should request post user bet', (done) => {
        sinon.stub(UserBetService, 'createUserBet').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'bet created.' })
        });
        chai.request(app)
            .post('/V1/user/bets')
            .send(mockUserBet)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request post user bet', (done) => {
        sinon.stub(UserBetService, 'createUserBet').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .post('/V1/user/bets')
            .send(mockUserBet)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request put user bet', (done) => {
        sinon.stub(UserBetService, 'updateUserBet').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'bet updated.' })
        });
        chai.request(app)
            .put('/V1/user/bets/1')
            .send(mockUserBet)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request put user bet', (done) => {
        sinon.stub(UserBetService, 'updateUserBet').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .put('/V1/user/bets/1')
            .send(mockUserBet)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get user bets', (done) => {
        sinon.stub(UserBetService, 'getUserBets').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockUserBetsList })
        });
        chai.request(app)
            .get('/V1/user/bets')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get user bets', (done) => {
        sinon.stub(UserBetService, 'getUserBets').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/user/bets')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get user bet by id', (done) => {
        sinon.stub(UserBetService, 'getUserBetById').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockUserBetById })
        });
        chai.request(app)
            .get('/V1/user/bets/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get user bet by id', (done) => {
        sinon.stub(UserBetService, 'getUserBetById').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/user/bets/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get user bet by user', (done) => {
        sinon.stub(UserBetService, 'getUserBetsByUserId').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockUserBetsList })
        });
        chai.request(app)
            .get('/V1/user/bets/filter/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get user bet by user', (done) => {
        sinon.stub(UserBetService, 'getUserBetsByUserId').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/user/bets/filter/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request delete user bet by id', (done) => {
        sinon.stub(UserBetService, 'deleteUserBet').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'bet deleted.' })
        });
        chai.request(app)
            .delete('/V1/user/bets/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request delete user bet by id', (done) => {
        sinon.stub(UserBetService, 'deleteUserBet').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .delete('/V1/user/bets/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });
});
