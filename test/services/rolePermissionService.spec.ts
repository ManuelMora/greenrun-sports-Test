import { expect } from 'chai';
import sinon from 'sinon';
import IRolePermission from '../../src/models/IRolePermission';
import RolePermissionService from '../../src/services/rolePermissionService';
import { databaseClient } from '../../src/services/databaseService';

describe('RolePermissionService', () => {
    const mockRolePermission: IRolePermission = {
        role_id: 1,
        module_id: 2,
        role_action: 4,
    };
    const mockRolesPermissionList = [
        {
            role_id: 1,
            role: 'admin',
            module_id: 2,
            module: 'admin',
            role_action: 2,
            action: 'create',
        },
    ];
    // Mocks
    const whereStub = sinon.stub().returnsThis();
    const joinStub = sinon.stub().returnsThis();
    const selectStub = sinon.stub().returnsThis();
    const orderbyStub = sinon.stub().resolves(mockRolesPermissionList);

    afterEach(() => {
        sinon.restore();
    });

    it('should create permission to role', async () => {
        const insertStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                insert: insertStub,
            };
        });
        const createRoleTest =
            await RolePermissionService.createNewPermissionFromRole(
                mockRolePermission
            );
        expect(createRoleTest.data).equal('permission to role created.');
    });

    it('should failed create permission to role', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await RolePermissionService.createNewPermissionFromRole(
                mockRolePermission
            );
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get permissions from roles', async () => {
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                join: joinStub,
                select: selectStub,
                orderBy: orderbyStub,
            };
        });
        const getRolesTest = await RolePermissionService.getPermissionsFromRoles();
        expect(getRolesTest.data.total).equal(1);
    });

    it('should failed get permissions from roles', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await RolePermissionService.getPermissionsFromRoles();
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get permissions from role id', async () => {
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                join: joinStub,
                select: selectStub,
                orderBy: orderbyStub,
            };
        });
        const getRolePermissionByRoleIdTest =
            await RolePermissionService.getPermissionsFromRoleId(1);
        expect(getRolePermissionByRoleIdTest.data.total).equal(1);
    });

    it('should failed get permissions from role id', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await RolePermissionService.getPermissionsFromRoleId(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should delete permission from role', async () => {
        const deleteStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                del: deleteStub,
            };
        });
        const deletePermissionRoleTest =
            await RolePermissionService.deletePermissionFromRole(1);
        expect(deletePermissionRoleTest.data).equal(
            'permission from role deleted.'
        );
    });

    it('should failed delete permission from role', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await RolePermissionService.deletePermissionFromRole(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
