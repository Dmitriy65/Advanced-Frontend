import {
    AnyAction, combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ReducerManager, StateScheme, StateSchemeKey } from './StateScheme';

export function createReducerManager(initialReducers: ReducersMapObject<StateScheme>): ReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);
    let keysToRemove: StateSchemeKey[] = [];

    return {
        getReducerMap: () => reducers,
        reduce: (state: StateScheme, action: AnyAction) => {
            let newState = state;
            if (keysToRemove.length > 0) {
                newState = { ...state };

                keysToRemove.forEach((key) => {
                    delete newState[key];
                });

                keysToRemove = [];
            }

            return combinedReducer(newState, action);
        },
        add: (key: StateSchemeKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;
            combinedReducer = combineReducers(reducers);
        },
        remove: (key: StateSchemeKey) => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];

            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}
