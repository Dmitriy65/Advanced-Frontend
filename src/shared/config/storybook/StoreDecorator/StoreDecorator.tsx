import { Story } from '@storybook/react';
import { StoreProvider } from 'app/providers/StoreProvider';
import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from 'entities/Profile';
import { ReducersList } from 'shared/lib/components/DynaminModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateScheme>,
    asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
    <StoreProvider
        initialState={state as StateScheme}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
);
