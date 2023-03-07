import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateProfileData } from 'entities/Profile/model/services/updateProfileData/updateProfileData';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { Profile, ProfileScheme, ValidationProfileError } from '../types/profile';

const initialState: ProfileScheme = {
    data: undefined,
    isLoading: false,
    error: undefined,
    readonly: true,
    validationErrors: undefined,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly(state, action: PayloadAction<boolean>) {
            state.readonly = action.payload;
        },
        updateProfile(state, action: PayloadAction<Profile>) {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
        cancelEdit(state) {
            state.form = state.data;
            state.validationErrors = undefined;
            state.readonly = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(
                fetchProfileData.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            )
            .addCase(updateProfileData.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly = true;
                state.validationErrors = undefined;
            })
            .addCase(
                updateProfileData.rejected,
                (state, action: PayloadAction<ValidationProfileError[] | undefined>) => {
                    state.isLoading = false;
                    state.validationErrors = action.payload;
                },
            );
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
