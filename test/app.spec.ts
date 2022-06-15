import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/app';
import JwtService from '../src/services/auth/jwtService';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('app', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should load swagger', (done) => {
        chai
            .request(app)
            .get('/api-docs')
            .end((_err, response) => {
                expect(response.status).to.equals(200);
                done();
            });
    });

    it('should 403 unauthorized', (done) => {
        chai
            .request(app)
            .get('/V1/roles')
            .end((_err, response) => {
                expect(response.status).to.equals(403);
                done();
            });
    });

    it('should 403 unauthorized', (done) => {
        sinon.stub(JwtService, 'validateToken').callsFake(() => {
            throw new Error('error');
        });
        chai
            .request(app)
            .get('/V1/roles')
            .end((_err, response) => {
                expect(response.status).to.equals(403);
                done();
            });
    });
});
