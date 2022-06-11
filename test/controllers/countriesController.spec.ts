import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import ICountry from '../../src/models/ICountry';
import IResponse from '../../src/models/IResponse';
import CountryService from '../../src/services/countryService';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('CountryController', () => {
    const mockCountry: ICountry = {
        name: "Colombia"
    };
    const mockCountryById = {
        status: 200,
        data:
        {
            "id": 1,
            "name": "Colombia",
            "country_status": 1
        }
    };
    const mockCountriesList = {
        status: 200,
        data: {
            rows: [
                {
                    "id": 1,
                    "name": "Colombia",
                    "country_status": 1
                }
            ], total: 1
        }
    };

    afterEach(() => {
        sinon.restore();
    });

    it('should request post countries', (done) => {
        sinon.stub(CountryService, 'createCountry').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'country created.' })
        });
        chai.request(app)
            .post('/V1/countries')
            .send(mockCountry)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request post countries', (done) => {
        sinon.stub(CountryService, 'createCountry').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .post('/V1/countries')
            .send(mockCountry)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request put countries', (done) => {
        sinon.stub(CountryService, 'updateCountry').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'country updated.' })
        });
        chai.request(app)
            .put('/V1/countries/1')
            .send(mockCountry)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request put countries', (done) => {
        sinon.stub(CountryService, 'updateCountry').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .put('/V1/countries/1')
            .send(mockCountry)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get countries', (done) => {
        sinon.stub(CountryService, 'getCountries').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockCountriesList })
        });
        chai.request(app)
            .get('/V1/countries')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get countries', (done) => {
        sinon.stub(CountryService, 'getCountries').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/countries')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get country by id', (done) => {
        sinon.stub(CountryService, 'getCountryById').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockCountryById })
        });
        chai.request(app)
            .get('/V1/countries/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get country by id', (done) => {
        sinon.stub(CountryService, 'getCountryById').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/countries/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request delete country by id', (done) => {
        sinon.stub(CountryService, 'deleteCountry').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'country deleted.' })
        });
        chai.request(app)
            .delete('/V1/countries/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request delete country by id', (done) => {
        sinon.stub(CountryService, 'deleteCountry').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .delete('/V1/countries/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });
});
