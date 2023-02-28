import { CounterScheme } from 'entities/Counter';
import { UserScheme } from 'entities/User';
import { LoginScheme } from 'features/AuthByUsername';
import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';

export interface StateScheme {
    counter: CounterScheme;
    user: UserScheme;

    // Async reducers
    loginForm?: LoginScheme;
}

export type StateSchemeKey = keyof StateScheme;
export type ReducersScheme = ReducersMapObject<StateScheme>;

export interface ReducerManager {
    getReducerMap: () => ReducersScheme;
    reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>;
    add: (key: StateSchemeKey, reducer: Reducer) => void;
    remove: (key: StateSchemeKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
    reducerManager: ReducerManager;
}
