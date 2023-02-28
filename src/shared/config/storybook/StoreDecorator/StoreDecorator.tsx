import { Story } from '@storybook/react';
import { StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { ReducersScheme, StateScheme } from 'app/providers/StoreProvider/config/StateScheme';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

const defaultAsyncReducers: DeepPartial<ReducersScheme> = {
    loginForm: loginReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateScheme>,
    asyncReducers?: DeepPartial<ReducersScheme>,
) => (StoryComponent: Story) => (
    <StoreProvider
        initialState={state as StateScheme}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
);
