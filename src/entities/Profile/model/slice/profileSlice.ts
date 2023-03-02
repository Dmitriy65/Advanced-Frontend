import { createSlice } from '@reduxjs/toolkit';
import { ProfileScheme } from 'entities/Profile';

const initialState = {
    data: null,
    isLoading: false,
    error: null,
    readonly: true,
} as ProfileScheme;

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
