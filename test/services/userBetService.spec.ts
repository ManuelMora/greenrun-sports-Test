import { expect } from 'chai';
import sinon from 'sinon';
import IUserBet from '../../src/models/IUserBet';
import UserBetService from '../../src/services/userBetService';
import { databaseClient } from '../../src/services/databaseService';

describe('UserBetService', () => {
    const mockUserBet: IUserBet = {
        user_id: 1,
        bet_id: 2,
        state_id: 'OPEN',
        odd: 1,
        amount: 10,
    };
    const mockUserBetsList = [
        {
            id: 3,
            user_id: 1,
            first_name: 'Daniel',
            username: 'dani.millan07',
            bet_id: 2,
            bet: 'Borussia Dortmund',
            odd: 1,
            amount: 10,
            state: 3,
            created_at: '2022-06-15T17:28:25.000Z',
            updated_at: '2022-06-15T17:28:25.000Z',
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

    it('should create user bet', async () => {
        const insertStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                insert: insertStub,
            };
        });
        const createUserBetTest = await UserBetService.createUserBet(mockUserBet);
        expect(createUserBetTest.data).equal('user bet created.');
    });

    it('should failed create user bet', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await UserBetService.createUserBet(mockUserBet);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should update user bet', async () => {
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updateUserBetTest = await UserBetService.updateUserBet(mockUserBet);
        expect(updateUserBetTest.data).equal('user bet updated.');
    });

    it('should failed update user bet', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await UserBetService.updateUserBet(mockUserBet);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get user bets', async () => {
        const selectStub = sinon.stub().resolves(mockUserBetsList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                join: joinStub,
                select: selectStub,
            };
        });
        const getUserBetsTest = await UserBetService.getUserBets();
        expect(getUserBetsTest.data.total).equal(1);
    });

    it('should failed get user bets', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await UserBetService.getUserBets();
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get user bet by user', async () => {
        const selectStub = sinon.stub().resolves(mockUserBetsList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                join: joinStub,
                where: whereStub,
                select: selectStub,
            };
        });
        const getUserBetByUserIdTest = await UserBetService.getUserBetsByUserId(1);
        expect(getUserBetByUserIdTest.data.total).equal(1);
    });

    it('should failed get user bet by user', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await UserBetService.getUserBetsByUserId(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get user bet by Id', async () => {
        const selectStub = sinon.stub().returnsThis();
        const limitStub = sinon.stub().resolves(mockUserBetsList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                join: joinStub,
                where: whereStub,
                select: selectStub,
                limit: limitStub,
            };
        });
        const getUserBetByIdTest = await UserBetService.getUserBetById(1);
        expect(getUserBetByIdTest.data).equal(mockUserBetsList[0]);
    });

    it('should failed get user bet by Id', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await UserBetService.getUserBetById(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should delete user bet', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const deleteUserBetTest = await UserBetService.deleteUserBet(1);
        expect(deleteUserBetTest.data).equal('user bet deleted.');
    });

    it('should failed delete user bet', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await UserBetService.deleteUserBet(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
