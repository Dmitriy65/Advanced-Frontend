import { Profile, ValidationProfileError } from '../../types/profile';

export function validateProfileForm(profile?: Profile) {
    const validationErrors: ValidationProfileError[] = [];

    if (!profile) {
        return [ValidationProfileError.NO_DATA];
    }

    if (!profile.first) {
        validationErrors.push(ValidationProfileError.INCORRECT_FIRST_NAME);
    }

    if (!profile.lastname) {
        validationErrors.push(ValidationProfileError.INCORRECT_LAST_NAME);
    }

    if (!profile.age) {
        validationErrors.push(ValidationProfileError.INCORRECT_AGE);
    }

    return validationErrors;
}
