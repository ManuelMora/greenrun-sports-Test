import { expect } from 'chai';
import sinon from 'sinon';
import IRole from '../../src/models/IRole';
import RoleService from '../../src/services/roleService';
import { databaseClient } from '../../src/services/databaseService';

describe('RoleService', () => {
    const mockRole: IRole = {
        name: 'admin',
        description: 'Role to manage admins',
    };
    const mockRolesList = [
        {
            id: 1,
            name: 'admin',
            description: 'admin role',
            status: 1,
        },
    ];

    afterEach(() => {
        sinon.restore();
    });

    it('should create role', async () => {
        const insertStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                insert: insertStub,
            };
        });
        const createRoleTest = await RoleService.createRole(mockRole);
        expect(createRoleTest.data).equal('role created.');
    });

    it('should failed create role', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await RoleService.createRole(mockRole);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should update role', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updateRoleTest = await RoleService.updateRole(mockRole);
        expect(updateRoleTest.data).equal('role updated.');
    });

    it('should failed update role', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await RoleService.updateRole(mockRole);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get roles', async () => {
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().resolves(mockRolesList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
            };
        });
        const getRolesTest = await RoleService.getRoles();
        expect(getRolesTest.data.total).equal(1);
    });

    it('should failed get roles', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await RoleService.getRoles();
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get role by Id', async () => {
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().returnsThis();
        const limitStub = sinon.stub().resolves(mockRolesList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
                limit: limitStub,
            };
        });
        const getRoleByIdTest = await RoleService.getRoleById(1);
        expect(getRoleByIdTest.data).equal(mockRolesList[0]);
    });

    it('should failed get role by Id', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await RoleService.getRoleById(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should delete role', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const deleteRoleTest = await RoleService.deleteRole(1);
        expect(deleteRoleTest.data).equal('role deleted.');
    });

    it('should failed delete role', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await RoleService.deleteRole(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
