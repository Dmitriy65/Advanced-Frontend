import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { ReducersScheme, StateScheme } from 'app/providers/StoreProvider/config/StateScheme';
import { useNavigate } from 'react-router-dom';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: StateScheme;
    asyncReducers?: DeepPartial<ReducersScheme>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props;

    const navigate = useNavigate();

    const store = createReduxStore(initialState as StateScheme, asyncReducers as ReducersScheme, navigate);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
