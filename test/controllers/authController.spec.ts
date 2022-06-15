import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import IAuth from '../../src/models/IAuth';
import IResponse from '../../src/models/IResponse';
import AuthService from '../../src/services/auth/authService';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('authController', () => {
    const mockAuth: IAuth = {
        "email": "dani.millan07@gmail.com",
        "password": "Colombia2022*"
    };

    afterEach(() => {
        sinon.restore();
    });

    it('should request auth user', (done) => {
        sinon.stub(AuthService, 'authUser').callsFake(() => {
            return Promise<IResponse>.resolve({
                status: 200,
                data: {
                    "token": "123",
                    "id": 1,
                    "email": "dani.millan07@gmail.com",
                    "username": "dani.millan07",
                    "role": 1
                }
            })
        });
        chai.request(app)
            .post('/V1/auth')
            .send(mockAuth)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request auth user', (done) => {
        sinon.stub(AuthService, 'authUser').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .post('/V1/auth')
            .send(mockAuth)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });
});
