import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

export enum ValidationProfileError {
    INCORRECT_FIRST_NAME = 'INCORRECT_FIRST_NAME',
    INCORRECT_LAST_NAME = 'INCORRECT_LAST_NAME',
    INCORRECT_AGE = 'INCORRECT_AGE',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR'
}

export interface Profile {
    id?: string;
    first?: string;
    lastname?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
}

export interface ProfileScheme {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean
    validationErrors?: ValidationProfileError[];
}
