import { expect } from 'chai';
import sinon from 'sinon';
import IUser from '../../src/models/IUser';
import UserService from '../../src/services/userService';
import { databaseClient } from '../../src/services/databaseService';

describe('UserService', () => {
    const mockUser: IUser = {
        role: 1,
        first_name: 'Daniel',
        last_name: 'Millan',
        phone: '3023724560',
        email: 'dani.millan07@gmail.com',
        username: 'dani.millan07',
        address: 'Colombia',
        gender: 'Masculino',
        birth_date: '1998/10/23',
        city: 1,
        category: '1',
        document_id: '1015477787',
        user_state: 'actived',
    };
    const mockUsersList = [
        {
            id: 1,
            role: 1,
            first_name: 'Daniel',
            last_name: 'Millan',
            phone: '3023724560',
            email: 'dani.millan07@gmail.com',
            username: 'dani.millan07',
            address: 'Colombia',
            gender: 'Masculino',
            birth_date: '1998/10/23',
            city: 1,
            category: '1',
            document_id: '1015477787',
            user_state: 'actived',
            created_at: '2022-06-11T03:59:51.000Z',
            updated_at: '2022-06-11T03:59:51.000Z',
            deleted: 0,
        },
    ];

    afterEach(() => {
        sinon.restore();
    });

    it('should create user', async () => {
        const insertStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                insert: insertStub,
            };
        });
        const createCityTest = await UserService.createUser(mockUser);
        expect(createCityTest.data).equal('user created.');
    });

    it('should failed create user', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await UserService.createUser(mockUser);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should update user', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updateCityTest = await UserService.updateUser(mockUser);
        expect(updateCityTest.data).equal('user updated.');
    });

    it('should failed update user', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await UserService.updateUser(mockUser);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get users', async () => {
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().resolves(mockUsersList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
            };
        });
        const getUsersTest = await UserService.getUsers();
        expect(getUsersTest.data.total).equal(1);
    });

    it('should failed get users', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await UserService.getUsers();
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should get user by Id', async () => {
        const whereStub = sinon.stub().returnsThis();
        const selectStub = sinon.stub().returnsThis();
        const limitStub = sinon.stub().resolves(mockUsersList);
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                select: selectStub,
                limit: limitStub,
            };
        });
        const getUserByIdTest = await UserService.getUserById(1);
        expect(getUserByIdTest.data).equal(mockUsersList[0]);
    });

    it('should failed get user by Id', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await UserService.getUserById(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });

    it('should delete user', async () => {
        const whereStub = sinon.stub().returnsThis();
        const updateStub = sinon.stub().returnsThis();
        sinon.stub(databaseClient, 'from').callsFake((): any => {
            return {
                where: whereStub,
                update: updateStub,
            };
        });
        const updateCityTest = await UserService.deleteUser(1);
        expect(updateCityTest.data).equal('user deleted.');
    });

    it('should failed delete user', async () => {
        sinon.stub(databaseClient, 'from').callsFake(() => {
            throw new Error('error');
        });
        try {
            await UserService.deleteUser(1);
        } catch (error: any) {
            expect(error.message).to.equal('error');
        }
    });
});
