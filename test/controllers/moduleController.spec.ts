import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import IModule from '../../src/models/IModule';
import IResponse from '../../src/models/IResponse';
import ModuleService from '../../src/services/moduleService';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('ModuleController', () => {
    const mockModule: IModule = {
        name: "admin",
        description: "module to manage admins"
    };
    const mockModuleById = {
        status: 200,
        data:
        {
            "id": 1,
            "name": "users",
            "description": "module to manage users",
            "status": 1
        }
    };
    const mockModulesList = {
        status: 200,
        data: {
            rows: [
                {
                    "id": 1,
                    "name": "users",
                    "description": "module to manage users",
                    "status": 1
                }
            ], total: 1
        }
    };

    afterEach(() => {
        sinon.restore();
    });

    it('should request post module', (done) => {
        sinon.stub(ModuleService, 'createModule').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'Module created.' })
        });
        chai.request(app)
            .post('/V1/modules')
            .send(mockModule)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request post module', (done) => {
        sinon.stub(ModuleService, 'createModule').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .post('/V1/modules')
            .send(mockModule)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request put modules', (done) => {
        sinon.stub(ModuleService, 'updateModule').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'Module updated.' })
        });
        chai.request(app)
            .put('/V1/modules/1')
            .send(mockModule)
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request put modules', (done) => {
        sinon.stub(ModuleService, 'updateModule').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .put('/V1/modules/1')
            .send(mockModule)
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get modules', (done) => {
        sinon.stub(ModuleService, 'getModules').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockModulesList })
        });
        chai.request(app)
            .get('/V1/modules')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get modules', (done) => {
        sinon.stub(ModuleService, 'getModules').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/modules')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request get module by id', (done) => {
        sinon.stub(ModuleService, 'getModuleById').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: mockModuleById })
        });
        chai.request(app)
            .get('/V1/modules/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request get module by id', (done) => {
        sinon.stub(ModuleService, 'getModuleById').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .get('/V1/modules/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });

    it('should request delete module by id', (done) => {
        sinon.stub(ModuleService, 'deleteModule').callsFake(() => {
            return Promise<IResponse>.resolve({ status: 200, data: 'Module deleted.' })
        });
        chai.request(app)
            .delete('/V1/modules/1')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should failed request delete module by id', (done) => {
        sinon.stub(ModuleService, 'deleteModule').callsFake(() => {
            return Promise.reject('error')
        });
        chai.request(app)
            .delete('/V1/modules/1')
            .end((_err, response) => {
                expect(response.status).to.equals(500);
                done();
            });
    });
});
