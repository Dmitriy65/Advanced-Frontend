import {
    Action, configureStore, Dispatch, isAnyOf, isFulfilled, ReducersMapObject,
} from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userActions, userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/localStorage';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername';
import { StateScheme } from './StateScheme';

interface Store {
    dispatch: Dispatch;
    getState: () => StateScheme;
}

const isLoggedIn = isFulfilled(loginByUsername);
const isLoggedOut = isAnyOf(userActions.logout);

const authMiddleware = (store: Store) => (next: (action: Action) => void) => (action: Action): void => {
    if (isLoggedIn(action)) {
        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(action.payload));
    }

    if (isLoggedOut(action)) {
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    }

    next(action);
};

export function createReduxStore(initialState: StateScheme) {
    const rootReducers: ReducersMapObject<StateScheme> = {
        counter: counterReducer,
        user: userReducer,
        loginForm: loginReducer,
    };

    return configureStore({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
    });
}
