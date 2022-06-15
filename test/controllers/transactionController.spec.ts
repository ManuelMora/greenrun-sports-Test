import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import ITransaction from '../../src/models/ITransaction';
import IResponse from '../../src/models/IResponse';
import TransactionService from '../../src/services/transactionService';
import JwtService from '../../src/services/auth/jwtService';
import MiddlewareApi from '../../src/middlewares/middlewareApi';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('TransactionController', () => {
    const mockTransaction: ITransaction = {
        user_id: 1,
        amount: 200,
        category_id: 'DEPOSIT',
    };
    const mockTransactionById = {
        status: 200,
        data:
        {
            "id": 1,
            "user_id": 1,
            "amount": 10,
            "category_id": 1,
            "category": "DEPOSIT",
            "status": 1,
            "created_at": "2022-06-14T19:09:52.000Z",
            "updated_at": "2022-06-14T19:09:52.000Z",
            "deleted": 0,
            "deleted_at": null,
            "user_bet_id": null
        },
    };
    const mockTransactionByUser = {
        status: 200,
        data:
        {
            rows: [
                {
                    "id": 1,
                    "user_id": 1,
                    "amount": 10,
                    "category_id": 1,
                    "category": "DEPOSIT",
                    "status": 1,
                    "created_at": "2022-06-14T19:09:52.000Z",
                    "updated_at": "2022-06-14T19:09:52.000Z",
                    "deleted": 0,
                    "deleted_at": null,
                    "user_bet_id": null
                },
            ],
            total: 1
        },
    };
    const mockTransactionsList = {
        status: 200,
        data: {
            rows: [
                {
                    "id": 1,
                    "user_id": 1,
                    "username": 'dani.millan07',
                    "first_name": 'Daniel',
                    "last_name": 'Millan',
                    "amount": 10,
                    "category_id": 1,
                    "category": 'DEPOSIT',
                    "status": 1,
                    "created_at": '2022-06-14T19:09:52.000Z',
                    "updated_at": '2022-06-14T19:09:52.000Z',
                    "deleted": 0,
                    "deleted_at": null,
                    "user_bet_id": null,
                },
            ], total: 1
        }
    };

    afterEach(() => {
        sinon.restore();
    });

    beforeEach(() => {
        sinon.stub(JwtService, 'validateToken').callsFake(() => {
            return Promise<void>.resolve({ id: 1 });
        });
        sinon.stub(MiddlewareApi, 'validateSession').callsFake(() => {
            return Promise<void>.resolve();
        });
    });

    it('should request post transaction', (done) => {
        sinon.stub(TransactionService, 'createTransaction').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'transaction created.' })
        });
        chai.request(app)
            .post('/V1/transactions')
            .set('Authorization', 'Bearer 123')
            .send(mockTransaction)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request post transaction', (done) => {
        sinon.stub(TransactionService, 'createTransaction').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .post('/V1/transactions')
            .set('Authorization', 'Bearer 123')
            .send(mockTransaction)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request put transaction', (done) => {
        sinon.stub(TransactionService, 'updateTransaction').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'transaction updated.' })
        });
        chai.request(app)
            .put('/V1/transactions/1')
            .set('Authorization', 'Bearer 123')
            .send(mockTransaction)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request put transaction', (done) => {
        sinon.stub(TransactionService, 'updateTransaction').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .put('/V1/transactions/1')
            .set('Authorization', 'Bearer 123')
            .send(mockTransaction)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get transactions', (done) => {
        sinon.stub(TransactionService, 'getTransactions').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockTransactionsList })
        });
        chai.request(app)
            .get('/V1/transactions')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get transactions', (done) => {
        sinon.stub(TransactionService, 'getTransactions').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/transactions')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get transaction by id', (done) => {
        sinon.stub(TransactionService, 'getTransactionById').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockTransactionById })
        });
        chai.request(app)
            .get('/V1/transactions/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get transaction by id', (done) => {
        sinon.stub(TransactionService, 'getTransactionById').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/transactions/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get transaction by user', (done) => {
        sinon.stub(TransactionService, 'getTransactionsByUser').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockTransactionByUser })
        });
        chai.request(app)
            .get('/V1/transactions/user/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get transaction by user', (done) => {
        sinon.stub(TransactionService, 'getTransactionsByUser').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/transactions/user/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request delete transaction by id', (done) => {
        sinon.stub(TransactionService, 'deleteTransaction').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'transaction deleted.' })
        });
        chai.request(app)
            .delete('/V1/transactions/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request delete transaction by id', (done) => {
        sinon.stub(TransactionService, 'deleteTransaction').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .delete('/V1/transactions/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });
});
