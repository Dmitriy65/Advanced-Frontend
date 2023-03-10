import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';

describe('getProfileData.test', () => {
    test('should return profile', () => {
        const data = {
            first: 'Dzmitry',
            lastname: 'Razmyslovich',
            age: 24,
            currency: Currency.USD,
            country: Country.Belarus,
            city: 'Minsk',
            username: 'admin',
            avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
        };

        const state: DeepPartial<StateScheme> = {
            profile: {
                data: {
                    first: 'Dzmitry',
                    lastname: 'Razmyslovich',
                    age: 24,
                    currency: Currency.USD,
                    country: Country.Belarus,
                    city: 'Minsk',
                    username: 'admin',
                    avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
                },
            },
        };

        expect(getProfileData(state as StateScheme)).toEqual(data);
    });

    test('should return undefined', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getProfileData(state as StateScheme)).toEqual(undefined);
    });
});
