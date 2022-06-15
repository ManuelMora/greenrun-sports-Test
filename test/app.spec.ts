import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/app';

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
});
