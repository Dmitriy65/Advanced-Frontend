import { Profile } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { validateProfileForm } from 'entities/Profile/model/services/validateProfileForm/validateProfileForm';
import { ValidationProfileError } from 'entities/Profile/model/types/profile';

describe('validateProfileForm.test', () => {
    let profile: Profile;

    beforeEach(() => {
        profile = {
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

    test('success validation', () => {
        const result = validateProfileForm(profile);
        expect(result).toEqual([]);
    });

    test('failure validation', () => {
        const result = validateProfileForm({ ...profile, first: undefined, age: undefined });
        expect(result).toEqual([
            ValidationProfileError.INCORRECT_FIRST_NAME,
            ValidationProfileError.INCORRECT_AGE,
        ]);
    });

    test('failure validation [no profile]', () => {
        const result = validateProfileForm(undefined);
        expect(result).toEqual([
            ValidationProfileError.NO_DATA,
        ]);
    });
});
