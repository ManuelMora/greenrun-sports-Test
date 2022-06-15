import { expect } from 'chai';
import sinon from 'sinon';
import IBet from '../../src/models/IBet';
import BetService from '../../src/services/betService';
import { databaseClient } from '../../src/services/databaseService';

describe('BetService', () => {
    const mockBet: IBet = {
        bet_option: 1,
        status_id: 'ACTIVE',
        sport: 1,
        name: 'Borussia Dortmund',
        event_id: 1,
        odd: 1,
    };
    const mockBetsList = [
        {
            id: 2,
            bet_option: 1,
            sport_id: 1,
            sport: 'soccer',
            status_id: 1,
            status: 'ACTIVE',
            name: 'Borussia Dortmund',
            event_id: 1,
            event: 'Borussia Dortmund vs BAyern Munich',
            odd: '1',
            result_id: 3,
            result: 'OPEN',
            created_at: '2022-06-15T16:07:55.000Z',
            updated_at: '2022-06-15T16:07:55.000Z',
            deleted: 0,
            deleted_at: null,
        },
    ];
    // Mocks
    const whereStub = sinon.stub().returnsThis();
    const joinStub = sinon.stub().returnsThis();

    afterEach(() => {
        sinon.restore();
    });

    it('should create bet', async () => {
        const insertStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                insert: insertStub,
            };
        });
        const createBetTest = await BetService.createBet(mockBet);
        expect(createBetTest.data).equal('bet created.');
    });

    it('should failed create bet', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await BetService.createBet(mockBet);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should update bet', async () => {
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updatebetTest = await BetService.updateBet(mockBet);
        expect(updatebetTest.data).equal('bet updated.');
    });

    it('should failed update bet', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await BetService.updateBet(mockBet);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get bets', async () => {
        const selectStub = sinon.stub().resolves(mockBetsList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                join: joinStub,
                select: selectStub,
            };
        });
        const getbetsTest = await BetService.getBets();
        expect(getbetsTest.data.total).equal(1);
    });

    it('should failed get bets', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await BetService.getBets();
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get bet by Id', async () => {
        const selectStub = sinon.stub().returnsThis();
        const limitStub = sinon.stub().resolves(mockBetsList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                join: joinStub,
                where: whereStub,
                select: selectStub,
                limit: limitStub,
            };
        });
        const getbetByIdTest = await BetService.getBetById(1);
        expect(getbetByIdTest.data).equal(mockBetsList[0]);
    });

    it('should failed get bet by Id', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await BetService.getBetById(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should delete bet', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const deletebetTest = await BetService.deleteBet(1);
        expect(deletebetTest.data).equal('bet deleted.');
    });

    it('should failed delete bet', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await BetService.deleteBet(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
