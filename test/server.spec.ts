import chai from 'chai';
import sinon from 'sinon';
import server from '../src/server';

const expect = chai.expect;

describe('server.spec.ts', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('constructor method', () => {
        expect(server).to.be.a('object');
    });

    after(() => {
        server.close();
    });
});
