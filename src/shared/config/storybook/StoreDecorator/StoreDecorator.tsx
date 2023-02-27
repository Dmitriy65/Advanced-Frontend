import { Story } from '@storybook/react';
import { StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';

export const StoreDecorator = (state: DeepPartial<StateScheme>) => (StoryComponent: Story) => (
    <StoreProvider initialState={state as StateScheme}>
        <StoryComponent />
    </StoreProvider>
);
