import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';
import { ValidationProfileError } from 'entities/Profile/model/types/profile';
import { getProfileValidationErrors } from 'entities/Profile/model/selectors/getProfileValidationErrors/getProfileValidationErrors';

describe('getProfileValidationErrors.test', () => {
    test('should return validation errors', () => {
        const state: DeepPartial<StateScheme> = {
            profile: {
                validationErrors: [
                    ValidationProfileError.SERVER_ERROR,
                    ValidationProfileError.NO_DATA,
                ],
            },
        };

        expect(getProfileValidationErrors(state as StateScheme)).toEqual([
            ValidationProfileError.SERVER_ERROR,
            ValidationProfileError.NO_DATA,
        ]);
    });

    test('should return undefined if state is empty', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getProfileValidationErrors(state as StateScheme)).toEqual(undefined);
    });
});
