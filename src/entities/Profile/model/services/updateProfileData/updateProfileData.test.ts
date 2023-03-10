import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Profile } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { ValidationProfileError } from 'entities/Profile/model/types/profile';
import { updateProfileData } from './updateProfileData';

describe('updateProfileData.test', () => {
    let profileForm: Profile;

    beforeEach(() => {
        profileForm = {
            first: 'Dzmitry',
            lastname: 'Razmyslovich',
            age: 24,
            currency: Currency.USD,
            country: Country.Belarus,
            city: 'Minsk',
            username: 'admin',
            avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
        };
    });

    test('[Client] Update profile success', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: profileForm,
            },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ data: profileForm }));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(profileForm);
    });

    test('[Client] Update profile error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: {
                    ...profileForm,
                    age: undefined,
                },
            },
        });

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalledTimes(0);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidationProfileError.INCORRECT_AGE,
        ]);
    });

    test('[Server] Update profile error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: profileForm,
            },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ status: 500 }));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidationProfileError.SERVER_ERROR,
        ]);
    });
});
