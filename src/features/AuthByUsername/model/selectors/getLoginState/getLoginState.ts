import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';
import { LoginScheme } from 'features/AuthByUsername';

const defaultLoginState: LoginScheme = {
    username: '',
    password: '',
    isLoading: false,
    error: undefined,
};

export const getLoginState = (state: StateScheme) => state?.loginForm || defaultLoginState;
