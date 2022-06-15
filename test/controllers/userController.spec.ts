import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import IUser from '../../src/models/IUser';
import IResponse from '../../src/models/IResponse';
import UserService from '../../src/services/userService';
import MiddlewareApi from '../../src/middlewares/middlewareApi';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('UserController', () => {
    const mockUser: IUser = {
        "role": 1,
        "first_name": "Daniel",
        "last_name": "Millan",
        "phone": "3023724560",
        "email": "dani.millan07@gmail.com",
        "username": "dani.millan07",
        "address": "Colombia",
        "gender": "Masculino",
        "birth_date": "1998/10/23",
        "city": 1,
        "category": "1",
        "document_id": "1015477787",
        "user_state": "actived"
    };
    const mockUserById = {
        status: 200,
        data: {
            "id": 1,
            "role": 1,
            "first_name": "Daniel",
            "last_name": "Millan",
            "phone": "3023724560",
            "email": "dani.millan07@gmail.com",
            "username": "dani.millan07",
            "address": "Colombia",
            "gender": "Masculino",
            "birth_date": "1998/10/23",
            "city": 1,
            "category": "1",
            "document_id": "1015477787",
            "user_state": "actived",
            "created_at": "2022-06-11T03:59:51.000Z",
            "updated_at": "2022-06-11T03:59:51.000Z",
            "deleted": 0,
            "deleted_at": "2022-06-11T03:59:51.000Z"
        }
    };
    const mockUsersList = {
        status: 200,
        data: {
            rows: [
                {
                    "id": 1,
                    "role": 1,
                    "first_name": "Daniel",
                    "last_name": "Millan",
                    "phone": "3023724560",
                    "email": "dani.millan07@gmail.com",
                    "username": "dani.millan07",
                    "address": "Colombia",
                    "gender": "Masculino",
                    "birth_date": "1998/10/23",
                    "city": 1,
                    "category": "1",
                    "document_id": "1015477787",
                    "user_state": "actived",
                    "created_at": "2022-06-11T03:59:51.000Z",
                    "updated_at": "2022-06-11T03:59:51.000Z",
                    "deleted": 0,
                    "deleted_at": "2022-06-11T03:59:51.000Z"
                }
            ],
            total: 1
        }
    };

    afterEach(() => {
        sinon.restore();
    });

    it('should request post users', (done) => {
        sinon.stub(MiddlewareApi, 'validateSession').callsFake(() => {
            return Promise<void>.resolve();
        })
        sinon.stub(UserService, 'createUser').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'user created.' })
        });
        chai.request(app)
            .post('/V1/users')
            .set('Authorization', 'Bearer 123')
            .send(mockUser)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });


    it('should failed request post users', (done) => {
        sinon.stub(UserService, 'createUser').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .post('/V1/users')
            .send(mockUser)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request put users', (done) => {
        sinon.stub(UserService, 'updateUser').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'user updated.' })
        });
        chai.request(app)
            .put('/V1/users/1')
            .send(mockUser)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request put users', (done) => {
        sinon.stub(UserService, 'updateUser').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .put('/V1/users/1')
            .send(mockUser)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get users', (done) => {
        sinon.stub(UserService, 'getUsers').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockUsersList })
        });
        chai.request(app)
            .get('/V1/users')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get users', (done) => {
        sinon.stub(UserService, 'getUsers').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/users')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get User by id', (done) => {
        sinon.stub(UserService, 'getUserById').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockUserById })
        });
        chai.request(app)
            .get('/V1/users/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get User by id', (done) => {
        sinon.stub(UserService, 'getUserById').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/users/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request delete User by id', (done) => {
        sinon.stub(UserService, 'deleteUser').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'user deleted.' })
        });
        chai.request(app)
            .delete('/V1/users/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request delete User by id', (done) => {
        sinon.stub(UserService, 'deleteUser').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .delete('/V1/users/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });
});
