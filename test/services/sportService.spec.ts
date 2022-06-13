import { expect } from 'chai';
import sinon from 'sinon';
import ISport from '../../src/models/ISport';
import SportService from '../../src/services/sportService';
import { databaseClient } from '../../src/services/databaseService';

describe('SportService', () => {
    const mockSport: ISport = {
        name: 'soccer',
        description: 'soccer sport',
    };
    const mockSportsList = [
        {
            id: 1,
            name: 'soccer',
            description: 'soccer sport',
            allowDraw: 1,
            status: 1,
        },
    ];

    afterEach(() => {
        sinon.restore();
    });

    it('should create sport', async () => {
        const insertStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                insert: insertStub,
            };
        });
        const createSportTest = await SportService.createSport(mockSport);
        expect(createSportTest.data).equal('sport created.');
    });

    it('should failed create sport', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await SportService.createSport(mockSport);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should update sport', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updateSportTest = await SportService.updateSport(mockSport);
        expect(updateSportTest.data).equal('sport updated.');
    });

    it('should failed update sport', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await SportService.updateSport(mockSport);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get sports', async () => {
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().resolves(mockSportsList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
            };
        });
        const getSportsTest = await SportService.getSports();
        expect(getSportsTest.data.total).equal(1);
    });

    it('should failed get sports', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await SportService.getSports();
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get sport by Id', async () => {
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().returnsThis();
        const limitStub = sinon.stub().resolves(mockSportsList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
                limit: limitStub,
            };
        });
        const getSportByIdTest = await SportService.getSportById(1);
        expect(getSportByIdTest.data).equal(mockSportsList[0]);
    });

    it('should failed get sport by Id', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await SportService.getSportById(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should delete sport', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const deleteSportTest = await SportService.deleteSport(1);
        expect(deleteSportTest.data).equal('sport deleted.');
    });

    it('should failed delete sport', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await SportService.deleteSport(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
