import { expect } from 'chai';
import sinon from 'sinon';
import IAuth from '../../../src/models/IAuth';
import AuthService from '../../../src/services/auth/authService';
import BcryptService from '../../../src/services/auth/cryptoService';
import JwtService from '../../../src/services/auth/jwtService';
import { databaseClient } from '../../../src/services/databaseService';

describe('AuthService', () => {
    const mockAuth: IAuth = {
        "email": "dani.millan07@gmail.com",
        "password": "Colombia2022*"
    };
    const mockAuthUser = [
        {
            "id": 1,
            "role": 1,
            "first_name": "Daniel",
            "last_name": "Millan",
            "phone": "3023724560",
            "email": "dani.millan07@gmail.com",
            "username": "dani.millan07",
            "address": "Colombia",
            "gender": "Masculino",
            "birth_date": "1998/10/23",
            "city": 1,
            "category": "1",
            "document_id": "1015477787",
            "user_state": "actived",
            "created_at": "2022-06-11T03:59:51.000Z",
            "updated_at": "2022-06-11T03:59:51.000Z",
            "deleted": 0,
            "deleted_at": null,
        },
    ];

    afterEach(() => {
        sinon.restore();
    });

    it('should auth user', async () => {
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().returnsThis();
        const limitStub = sinon.stub().resolves(mockAuthUser);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
                limit: limitStub
            };
        });
        sinon.stub(BcryptService, 'checkHash').callsFake(() => {
            return Promise<boolean>.resolve(true);
        });
        sinon.stub(JwtService, 'signedToken').callsFake(() => {
            return Promise.resolve('123');
        });
        const authUserTest = await AuthService.authUser(mockAuth);
        expect(authUserTest.status).equal(200);
    });

    it('should failed invalid credentials user', async () => {
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().returnsThis();
        const limitStub = sinon.stub().resolves(mockAuthUser);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
                limit: limitStub
            };
        });
        sinon.stub(BcryptService, 'checkHash').callsFake(() => {
            return Promise<boolean>.resolve(false);
        });
        const authUserTest = await AuthService.authUser(mockAuth);
        expect(authUserTest.status).equal(401);
    });

    it('should failed auth user', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await AuthService.authUser(mockAuth);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
