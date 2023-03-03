import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemeKey } from 'app/providers/StoreProvider/config/StateScheme';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
    [name in StateSchemeKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { children, reducers, removeAfterUnmount = false } = props;

    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager;
    useEffect(() => {
        const reducerEntries = Object.entries(reducers);

        reducerEntries.forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemeKey, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            if (removeAfterUnmount) {
                reducerEntries.forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemeKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };

        // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    );
};
