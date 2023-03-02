import { DeepPartial } from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';
import { getLoginState } from './getLoginState';

describe('getLoginState.test', () => {
    test('should return login error', () => {
        const state: DeepPartial<StateScheme> = {
            loginForm: {
                username: '',
                password: '',
                isLoading: false,
                error: 'error',
            },
        };

        expect(getLoginState(state as StateScheme)).toEqual({
            username: '',
            password: '',
            isLoading: false,
            error: 'error',
        });
    });

    test('should work with empty store state', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getLoginState(state as StateScheme)).toEqual({
            username: '',
            password: '',
            isLoading: false,
            error: null,
        });
    });

    test('success login', () => {
        const state: DeepPartial<StateScheme> = {
            loginForm: {
                username: 'admin',
                password: '123',
                isLoading: false,
                error: null,
            },
        };

        expect(getLoginState(state as StateScheme)).toEqual({
            username: 'admin',
            password: '123',
            isLoading: false,
            error: null,
        });
    });
});
