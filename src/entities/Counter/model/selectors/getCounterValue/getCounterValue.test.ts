import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';
import { getCounterValue } from 'entities/Counter/model/selectors/getCounterValue/getCounterValue';

describe('getCounterValue', () => {
    test('should return counter value', () => {
        const state: DeepPartial<StateScheme> = {
            counter: {
                value: 10,
            },
        };

        expect(getCounterValue(state as StateScheme)).toEqual(10);
    });
});
