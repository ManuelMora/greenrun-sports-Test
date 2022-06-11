import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import ICity from '../../src/models/ICity';
import IResponse from '../../src/models/IResponse';
import CityService from '../../src/services/cityService';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('CityController', () => {
    const mockCity: ICity = {
        name: "Colombia",
        country_id: 1
    };
    const mockCityById = {
        status: 200,
        data: {
            "id": 1,
            "name": "Bogota",
            "country_id": 1,
            "country": "Colombia",
            "city_status": 1
        }
    };
    const mockCitiesList = {
        status: 200,
        data: {
            rows: [
                {
                    "id": 1,
                    "name": "Bogota",
                    "country_id": 1,
                    "country": "Colombia",
                    "city_status": 1
                }
            ],
            total: 1
        }
    };

    afterEach(() => {
        sinon.restore();
    });

    it('should request post cities', (done) => {
        sinon.stub(CityService, 'createCity').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'city created.' })
        });
        chai.request(app)
            .post('/V1/cities')
            .send(mockCity)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request post cities', (done) => {
        sinon.stub(CityService, 'createCity').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .post('/V1/cities')
            .send(mockCity)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request put cities', (done) => {
        sinon.stub(CityService, 'updateCity').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'city updated.' })
        });
        chai.request(app)
            .put('/V1/cities/1')
            .send(mockCity)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request put cities', (done) => {
        sinon.stub(CityService, 'updateCity').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .put('/V1/cities/1')
            .send(mockCity)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get cities', (done) => {
        sinon.stub(CityService, 'getCities').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockCitiesList })
        });
        chai.request(app)
            .get('/V1/cities')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get cities', (done) => {
        sinon.stub(CityService, 'getCities').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/cities')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get City by id', (done) => {
        sinon.stub(CityService, 'getCityById').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockCityById })
        });
        chai.request(app)
            .get('/V1/cities/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get City by id', (done) => {
        sinon.stub(CityService, 'getCityById').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/cities/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request delete City by id', (done) => {
        sinon.stub(CityService, 'deleteCity').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'city deleted.' })
        });
        chai.request(app)
            .delete('/V1/cities/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request delete City by id', (done) => {
        sinon.stub(CityService, 'deleteCity').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .delete('/V1/cities/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });
});
