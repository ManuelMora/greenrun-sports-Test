import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import IRole from '../../src/models/IRole';
import IResponse from '../../src/models/IResponse';
import RoleService from '../../src/services/roleService';
import MiddlewareApi from '../../src/middlewares/middlewareApi';
import JwtService from '../../src/services/auth/jwtService';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('RoleController', () => {
    const mockRole: IRole = {
        name: "admin",
        description: "Role to manage admins"
    };
    const mockRoleById = {
        status: 200,
        data:
        {
            "id": 1,
            "name": "admin",
            "description": "admin role",
            "status": 1
        },
    };
    const mockRolesList = {
        status: 200,
        data: {
            rows: [
                {
                    "id": 1,
                    "name": "admin",
                    "description": "admin role",
                    "status": 1
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

    it('should request post role', (done) => {
        sinon.stub(RoleService, 'createRole').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'Role created.' })
        });
        chai.request(app)
            .post('/V1/roles')
            .set('Authorization', 'Bearer 123')
            .send(mockRole)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request post role', (done) => {
        sinon.stub(RoleService, 'createRole').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .post('/V1/roles')
            .set('Authorization', 'Bearer 123')
            .send(mockRole)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request put role', (done) => {
        sinon.stub(RoleService, 'updateRole').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'Role updated.' })
        });
        chai.request(app)
            .put('/V1/roles/1')
            .set('Authorization', 'Bearer 123')
            .send(mockRole)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request put role', (done) => {
        sinon.stub(RoleService, 'updateRole').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .put('/V1/roles/1')
            .set('Authorization', 'Bearer 123')
            .send(mockRole)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get roles', (done) => {
        sinon.stub(RoleService, 'getRoles').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockRolesList })
        });
        chai.request(app)
            .get('/V1/roles')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get roles', (done) => {
        sinon.stub(RoleService, 'getRoles').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/roles')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get role by id', (done) => {
        sinon.stub(RoleService, 'getRoleById').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockRoleById })
        });
        chai.request(app)
            .get('/V1/roles/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get role by id', (done) => {
        sinon.stub(RoleService, 'getRoleById').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/roles/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request delete role by id', (done) => {
        sinon.stub(RoleService, 'deleteRole').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'Role deleted.' })
        });
        chai.request(app)
            .delete('/V1/roles/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request delete role by id', (done) => {
        sinon.stub(RoleService, 'deleteRole').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .delete('/V1/roles/1')
            .set('Authorization', 'Bearer 123')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });
});
