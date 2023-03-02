import {
    Action,
    AnyAction,
    configureStore,
    Dispatch,
    isAnyOf,
    isFulfilled,
    MiddlewareArray,
} from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userActions, userReducer } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/localStorage';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername';
import { createReducerManager } from 'app/providers/StoreProvider/config/reducerManager';
import { ReducersScheme, StateScheme } from './StateScheme';

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

export function createReduxStore(initialState: StateScheme, asyncReducers: ReducersScheme) {
    const rootReducers: ReducersScheme = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
