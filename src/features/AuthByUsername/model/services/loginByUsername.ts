import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginScheme } from 'features/AuthByUsername';
import { User, userActions, userReducer } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/localStorage';

type AuthDataProps = Pick<LoginScheme, 'username' | 'password'>;

export const loginByUsername = createAsyncThunk<User, AuthDataProps, { rejectValue: string }>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post<User>('http://localhost:8000/login', authData);
            if (!response.data) {
                throw new Error();
            }

            thunkAPI.dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Auth Error');
        }
    },
);
