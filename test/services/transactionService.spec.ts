import { expect } from 'chai';
import sinon from 'sinon';
import ITransaction from '../../src/models/ITransaction';
import TransactionService from '../../src/services/transactionService';
import { databaseClient } from '../../src/services/databaseService';

describe('TransactionService', () => {
    const mockTransaction: ITransaction = {
        user_id: 1,
        amount: 200,
        category_id: 'DEPOSIT',
    };
    const mockTransactionsList = [
        {
            id: 1,
            user_id: 1,
            username: 'dani.millan07',
            first_name: 'Daniel',
            last_name: 'Millan',
            amount: 10,
            category_id: 1,
            category: 'DEPOSIT',
            status: 1,
            created_at: '2022-06-14T19:09:52.000Z',
            updated_at: '2022-06-14T19:09:52.000Z',
            deleted: 0,
            deleted_at: null,
            user_bet_id: null,
        },
    ];
    // Mocks
    const whereStub = sinon.stub().returnsThis();
    const joinStub = sinon.stub().returnsThis();
    const selectStub = sinon.stub().returnsThis();

    afterEach(() => {
        sinon.restore();
    });

    it('should create transaction', async () => {
        const insertStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                insert: insertStub,
            };
        });
        const createTransactionTest = await TransactionService.createTransaction(
            mockTransaction
        );
        expect(createTransactionTest.data).equal('transaction created.');
    });

    it('should failed create transaction', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await TransactionService.createTransaction(mockTransaction);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should update transaction', async () => {
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updateTransactionTest = await TransactionService.updateTransaction(
            mockTransaction
        );
        expect(updateTransactionTest.data).equal('transaction updated.');
    });

    it('should failed update transaction', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await TransactionService.updateTransaction(mockTransaction);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get transactions', async () => {
        const selectStub = sinon.stub().resolves(mockTransactionsList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                join: joinStub,
                where: whereStub,
                select: selectStub,
            };
        });
        const getTransactionsTest = await TransactionService.getTransactions();
        expect(getTransactionsTest.data.total).equal(1);
    });

    it('should failed get transactions', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await TransactionService.getTransactions();
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get transaction by Id', async () => {
        const limitStub = sinon.stub().resolves(mockTransactionsList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                join: joinStub,
                where: whereStub,
                select: selectStub,
                limit: limitStub,
            };
        });
        const getTransactionByIdTest = await TransactionService.getTransactionById(
            1
        );
        expect(getTransactionByIdTest.data).equal(mockTransactionsList[0]);
    });

    it('should failed get transaction by Id', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await TransactionService.getTransactionById(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get transaction by user', async () => {
        const selectStub = sinon.stub().resolves(mockTransactionsList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                join: joinStub,
                where: whereStub,
                select: selectStub,
            };
        });
        const getTransactionByUserTest =
            await TransactionService.getTransactionsByUser(1);
        expect(getTransactionByUserTest.data.total).equal(1);
    });

    it('should failed get transaction by user', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await TransactionService.getTransactionsByUser(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should delete transaction', async () => {
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const deleteTransactionTest = await TransactionService.deleteTransaction(1);
        expect(deleteTransactionTest.data).equal('transaction deleted.');
    });

    it('should failed delete transaction', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await TransactionService.deleteTransaction(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
