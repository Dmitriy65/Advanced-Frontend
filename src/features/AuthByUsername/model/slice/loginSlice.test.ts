import { loginActions, loginReducer } from './loginSlice';
import { LoginScheme } from '../types/loginScheme';

describe('loginSlice.test', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginScheme> = { username: '123' };
        expect(loginReducer(
            state as LoginScheme,
            loginActions.setUsername('123123'),
        )).toEqual({ username: '123123' });
    });

    test('test set password', () => {
        const state: DeepPartial<LoginScheme> = { password: '123' };
        expect(loginReducer(
            state as LoginScheme,
            loginActions.setPassword('123123'),
        )).toEqual({ password: '123123' });
    });
});
