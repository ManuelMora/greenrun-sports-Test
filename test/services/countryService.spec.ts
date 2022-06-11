import { expect } from 'chai';
import sinon from 'sinon';
import ICountry from '../../src/models/ICountry';
import CountryService from '../../src/services/countryService';
import { databaseClient } from '../../src/services/databaseService';

describe('CountryService', () => {
    const mockCountry: ICountry = {
        name: 'Colombia',
    };
    const mockCountriesList = [
        {
            id: 1,
            name: 'Colombia',
            country_status: 1,
        },
    ];

    afterEach(() => {
        sinon.restore();
    });

    it('should create country', async () => {
        const insertStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                insert: insertStub,
            };
        });
        const createCityTest = await CountryService.createCountry(mockCountry);
        expect(createCityTest.data).equal('country created.');
    });

    it('should failed create country', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await CountryService.createCountry(mockCountry);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should update country', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updateCityTest = await CountryService.updateCountry(mockCountry);
        expect(updateCityTest.data).equal('country updated.');
    });

    it('should failed update country', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await CountryService.updateCountry(mockCountry);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get countries', async () => {
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().resolves(mockCountriesList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
            };
        });
        const getCountriesTest = await CountryService.getCountries();
        expect(getCountriesTest.data.total).equal(1);
    });

    it('should failed get countries', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await CountryService.getCountries();
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get country by Id', async () => {
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().returnsThis();
        const limitStub = sinon.stub().resolves(mockCountriesList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
                limit: limitStub,
            };
        });
        const getCountryByIdTest = await CountryService.getCountryById(1);
        expect(getCountryByIdTest.data).equal(mockCountriesList[0]);
    });

    it('should failed get country by Id', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await CountryService.getCountryById(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should delete country', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updateCityTest = await CountryService.deleteCountry(1);
        expect(updateCityTest.data).equal('country deleted.');
    });

    it('should failed delete country', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await CountryService.deleteCountry(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
