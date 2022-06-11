import { expect } from 'chai';
import sinon from 'sinon';
import ICity from '../../src/models/ICity';
import CityService from '../../src/services/cityService';
import { databaseClient } from '../../src/services/databaseService';

describe('CityService', () => {
    const mockCity: ICity = {
        name: 'Colombia',
        country_id: 1,
    };
    const mockCitiesList = [
        {
            id: 1,
            name: 'Bogota',
            country_id: 1,
            country: 'Colombia',
            city_status: 1,
        },
    ];

    afterEach(() => {
        sinon.restore();
    });

    it('should create city', async () => {
        const insertStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                insert: insertStub,
            };
        });
        const createCityTest = await CityService.createCity(mockCity);
        expect(createCityTest.data).equal('city created.');
    });

    it('should failed create city', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await CityService.createCity(mockCity);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should update city', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updateCityTest = await CityService.updateCity(mockCity);
        expect(updateCityTest.data).equal('city updated.');
    });

    it('should failed update city', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await CityService.updateCity(mockCity);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get cities', async () => {
        const joinStub = sinon.stub().returnsThis();
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().resolves(mockCitiesList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                join: joinStub,
                where: whereStub,
                select: selectStub,
            };
        });
        const getCitiesTest = await CityService.getCities();
        expect(getCitiesTest.data.total).equal(1);
    });

    it('should failed get cities', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await CityService.getCities();
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get city by Id', async () => {
        const joinStub = sinon.stub().returnsThis();
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().returnsThis();
        const limitStub = sinon.stub().resolves(mockCitiesList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                join: joinStub,
                where: whereStub,
                select: selectStub,
                limit: limitStub,
            };
        });
        const getCityByIdTest = await CityService.getCityById(1);
        expect(getCityByIdTest.data).equal(mockCitiesList[0]);
    });

    it('should failed get city by Id', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await CityService.getCityById(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should delete city', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updateCityTest = await CityService.deleteCity(1);
        expect(updateCityTest.data).equal('city deleted.');
    });

    it('should failed delete city', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await CityService.deleteCity(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
