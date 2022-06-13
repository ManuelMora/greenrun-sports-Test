import { expect } from 'chai';
import sinon from 'sinon';
import IModule from '../../src/models/IModule';
import ModuleService from '../../src/services/moduleService';
import { databaseClient } from '../../src/services/databaseService';

describe('ModuleService', () => {
    const mockModule: IModule = {
        name: 'admin',
        description: 'module to manage admins',
    };
    const mockModulesList = [
        {
            id: 1,
            name: 'users',
            description: 'module to manage users',
            status: 1,
        },
    ];

    afterEach(() => {
        sinon.restore();
    });

    it('should create module', async () => {
        const insertStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                insert: insertStub,
            };
        });
        const createModuleTest = await ModuleService.createModule(mockModule);
        expect(createModuleTest.data).equal('module created.');
    });

    it('should failed create module', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await ModuleService.createModule(mockModule);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should update module', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updateModuleTest = await ModuleService.updateModule(mockModule);
        expect(updateModuleTest.data).equal('module updated.');
    });

    it('should failed update module', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await ModuleService.updateModule(mockModule);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get modules', async () => {
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().resolves(mockModulesList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
            };
        });
        const getmodulesTest = await ModuleService.getModules();
        expect(getmodulesTest.data.total).equal(1);
    });

    it('should failed get modules', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await ModuleService.getModules();
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get module by Id', async () => {
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().returnsThis();
        const limitStub = sinon.stub().resolves(mockModulesList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
                limit: limitStub,
            };
        });
        const getmoduleByIdTest = await ModuleService.getModuleById(1);
        expect(getmoduleByIdTest.data).equal(mockModulesList[0]);
    });

    it('should failed get module by Id', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await ModuleService.getModuleById(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should delete module', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updatemoduleTest = await ModuleService.deleteModule(1);
        expect(updatemoduleTest.data).equal('module deleted.');
    });

    it('should failed delete module', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await ModuleService.deleteModule(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
