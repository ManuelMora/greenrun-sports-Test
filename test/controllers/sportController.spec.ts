import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import ISport from '../../src/models/ISport';
import IResponse from '../../src/models/IResponse';
import SportService from '../../src/services/sportService';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('SportController', () => {
    const mockSport: ISport = {
        name: "soccer",
        description: "soccer sport"
    };
    const mockSportById = {
        status: 200,
        data:
        {
            "id": 1,
            "name": "soccer",
            "description": "soccer sport",
            "allowDraw": 1,
            "status": 1
        },
    };
    const mockSportsList = {
        status: 200,
        data: {
            rows: [
                {
                    "id": 1,
                    "name": "soccer",
                    "description": "soccer sport",
                    "allowDraw": 1,
                    "status": 1
                },
            ], total: 1
        }
    };

    afterEach(() => {
        sinon.restore();
    });

    it('should request post sport', (done) => {
        sinon.stub(SportService, 'createSport').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'sport created.' })
        });
        chai.request(app)
            .post('/V1/sports')
            .send(mockSport)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request post sport', (done) => {
        sinon.stub(SportService, 'createSport').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .post('/V1/sports')
            .send(mockSport)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request put sport', (done) => {
        sinon.stub(SportService, 'updateSport').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'sport updated.' })
        });
        chai.request(app)
            .put('/V1/sports/1')
            .send(mockSport)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request put sport', (done) => {
        sinon.stub(SportService, 'updateSport').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .put('/V1/sports/1')
            .send(mockSport)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get sports', (done) => {
        sinon.stub(SportService, 'getSports').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockSportsList })
        });
        chai.request(app)
            .get('/V1/sports')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get sports', (done) => {
        sinon.stub(SportService, 'getSports').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/sports')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get sport by id', (done) => {
        sinon.stub(SportService, 'getSportById').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockSportById })
        });
        chai.request(app)
            .get('/V1/sports/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get sport by id', (done) => {
        sinon.stub(SportService, 'getSportById').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/sports/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request delete sport by id', (done) => {
        sinon.stub(SportService, 'deleteSport').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'sport deleted.' })
        });
        chai.request(app)
            .delete('/V1/sports/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request delete sport by id', (done) => {
        sinon.stub(SportService, 'deleteSport').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .delete('/V1/sports/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });
});
