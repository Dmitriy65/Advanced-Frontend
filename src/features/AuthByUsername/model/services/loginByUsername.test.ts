import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

describe('loginByUsername.test', () => {
    // let dispatch: Dispatch;
    // let getState: () => StateScheme;
    //
    // beforeEach(() => {
    //     dispatch = jest.fn();
    //     getState = jest.fn();
    // });
    //
    // test('success login', async () => {
    //     const userToLogin = { username: 'admin', id: '1' };
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userToLogin }));
    //     const action = loginByUsername({ username: '123', password: '123' });
    //     const result = await action(dispatch, getState, undefined);
    //
    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userToLogin));
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(dispatch).toHaveBeenCalledTimes(3);
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //     expect(result.payload).toEqual(userToLogin);
    // });
    //
    // test('failure login', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    //     const action = loginByUsername({ username: '123', password: '123' });
    //     const result = await action(dispatch, getState, undefined);
    //
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(dispatch).toHaveBeenCalledTimes(2);
    //     expect(result.payload).toBe('Auth Error');
    // });

    test('[TestAsyncThunk] success login', async () => {
        const userToLogin = { username: 'admin', id: '1' };
        const thunk = new TestAsyncThunk(loginByUsername);

        thunk.api.post.mockReturnValue(Promise.resolve({ data: userToLogin }));
        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(thunk.api.post).toHaveBeenCalled();

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userToLogin));
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);

        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userToLogin);
    });

    test('[TestAsyncThunk] failure login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.payload).toBe('Auth Error');
    });
});
