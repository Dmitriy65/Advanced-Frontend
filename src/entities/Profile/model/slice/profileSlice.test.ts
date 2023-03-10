import {
    Profile,
    profileActions, profileReducer, ProfileScheme, updateProfileData,
} from 'entities/Profile';
import { ValidationProfileError } from 'entities/Profile/model/types/profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

describe('profileSlice.test', () => {
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

    test('test set readonly', () => {
        const state: DeepPartial<ProfileScheme> = {
            readonly: false,
        };

        expect(
            profileReducer(
                state as ProfileScheme,
                profileActions.setReadonly(true),
            ),
        ).toEqual({ readonly: true });
    });

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileScheme> = {
            readonly: false,
        };

        expect(
            profileReducer(
                state as ProfileScheme,
                profileActions.cancelEdit(),
            ),
        ).toEqual({
            readonly: true,
        });
    });

    test('test update profile', () => {
        const state: DeepPartial<ProfileScheme> = {
            form: {
                username: 'V1 name',
            },
        };

        expect(
            profileReducer(
                state as ProfileScheme,
                profileActions.updateProfile({
                    username: 'V2 name',
                }),
            ),
        ).toEqual({
            form: {
                username: 'V2 name',
            },
        });
    });

    test('test profile extra reducer pending ', () => {
        const state: DeepPartial<ProfileScheme> = {
            isLoading: false,
            validationErrors: [
                ValidationProfileError.NO_DATA,
            ],
        };

        expect(
            profileReducer(
                state as ProfileScheme,
                updateProfileData.pending,
            ),
        ).toEqual({
            isLoading: true,
            validationErrors: [
                ValidationProfileError.NO_DATA,
            ],
        });
    });

    test('test profile extra reducer fulfilled', () => {
        const state: DeepPartial<ProfileScheme> = {
            isLoading: true,
        };

        expect(
            profileReducer(
                state as ProfileScheme,
                updateProfileData.fulfilled(profileForm, ''),
            ),
        ).toEqual({
            isLoading: false,
            form: profileForm,
            data: profileForm,
            readonly: true,
            validationErrors: undefined,
        });
    });
});
