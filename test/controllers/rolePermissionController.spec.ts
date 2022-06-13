import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import IRolePermission from '../../src/models/IRolePermission';
import IResponse from '../../src/models/IResponse';
import RolePermissionService from '../../src/services/rolePermissionService';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('RoleController', () => {
    const mockRolePermission: IRolePermission = {
        "role_id": 1,
        "module_id": 2,
        "role_action": 4
    };
    const mockRolesPermissionList = {
        status: 200,
        data: {
            rows: [
                {
                    "role_id": 1,
                    "role": "admin",
                    "module_id": 2,
                    "module": "admin",
                    "role_action": 2,
                    "action": "create"
                },
            ], total: 1
        }
    };

    afterEach(() => {
        sinon.restore();
    });

    it('should request post role permission', (done) => {
        sinon.stub(RolePermissionService, 'createNewPermissionFromRole').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'permission to role created.' })
        });
        chai.request(app)
            .post('/V1/permissions')
            .send(mockRolePermission)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request post role permission', (done) => {
        sinon.stub(RolePermissionService, 'createNewPermissionFromRole').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .post('/V1/permissions')
            .send(mockRolePermission)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get permissions from roles', (done) => {
        sinon.stub(RolePermissionService, 'getPermissionsFromRoles').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockRolesPermissionList })
        });
        chai.request(app)
            .get('/V1/permissions')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get permissions from roles', (done) => {
        sinon.stub(RolePermissionService, 'getPermissionsFromRoles').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/permissions')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get permissions from role by id', (done) => {
        sinon.stub(RolePermissionService, 'getPermissionsFromRoleId').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockRolesPermissionList })
        });
        chai.request(app)
            .get('/V1/permissions/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get permissions from role by id', (done) => {
        sinon.stub(RolePermissionService, 'getPermissionsFromRoleId').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/permissions/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request delete permission from role', (done) => {
        sinon.stub(RolePermissionService, 'deletePermissionFromRole').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'Role deleted.' })
        });
        chai.request(app)
            .delete('/V1/permissions/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request delete permission from role', (done) => {
        sinon.stub(RolePermissionService, 'deletePermissionFromRole').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .delete('/V1/permissions/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });
});
