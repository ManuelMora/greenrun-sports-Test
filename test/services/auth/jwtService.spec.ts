import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import JwtService from '../../../src/services/auth/jwtService';

describe('JwtService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should signed Token', async () => {
        sinon.stub(jwt, 'sign').callsFake(() => {
            return Promise.resolve('eyj123');
        });
        const jwtTest = await JwtService.signedToken(
            { id: 1, username: 'daniel' },
            '30m'
        );
        expect(jwtTest).equal('eyj123');
    });

    it('should failed signed Token', async () => {
        sinon.stub(jwt, 'sign').callsFake(() => {
            throw new Error('error');
        });
        try {
            await JwtService.signedToken({ id: 1, username: 'daniel' }, '30m');
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should validate Token', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => {
            return Promise.resolve({ id: 1, username: 'daniel' });
        });
        const jwtTest = await JwtService.validateToken('eyj123');
        expect(jwtTest.id).equal(1);
    });

    it('should failed validate Token', async () => {
        sinon.stub(jwt, 'verify').callsFake(() => {
            throw new Error('error');
        });
        try {
            await JwtService.validateToken('eyj123');
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
