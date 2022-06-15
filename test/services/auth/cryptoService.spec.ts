import { expect } from 'chai';
import bcrypt from 'bcrypt';
import sinon from 'sinon';
import BcryptService from '../../../src/services/auth/cryptoService';

describe('BcryptService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should generate Hash', async () => {
        sinon.stub(bcrypt, 'genSalt').callsFake(() => {
            return Promise.resolve('123');
        });
        sinon.stub(bcrypt, 'hash').callsFake(() => {
            return Promise.resolve(
                '$2b$10$iCsPQwlWWMuju0Sq5hPYxuDpqDJxjgFTv5wjFqq5xbOIWBTcErqQG'
            );
        });
        const hashTest = await BcryptService.generateHash('123');
        expect(hashTest).equal(
            '$2b$10$iCsPQwlWWMuju0Sq5hPYxuDpqDJxjgFTv5wjFqq5xbOIWBTcErqQG'
        );
    });

    it('should failed generate Hash', async () => {
        sinon.stub(bcrypt, 'genSalt').callsFake(() => {
            throw new Error('error');
        });
        try {
            await BcryptService.generateHash('123');
        } catch (error: any) {
            expect(error.message).to.equal('Error: error');
        }
    });

    it('should check Hash', async () => {
        sinon.stub(bcrypt, 'compare').callsFake(() => {
            return Promise.resolve(true);
        });
        const hashTest = await BcryptService.checkHash('123', '123');
        expect(hashTest).equal(true);
    });

    it('should failed check Hash', async () => {
        sinon.stub(bcrypt, 'compare').callsFake(() => {
            throw new Error('error');
        });
        try {
            await BcryptService.checkHash('123', '123');
        } catch (error: any) {
            expect(error.message).to.equal('Error: error');
        }
    });
});
