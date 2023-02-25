import { createSlice } from '@reduxjs/toolkit';
import { CounterScheme } from 'entities/Counter/model/types/counterScheme';

const initialState = { value: 0 } as CounterScheme;

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.value += 1;
        },
        decrement(state) {
            state.value -= 1;
        },
    },
});

export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducer } = counterSlice;
