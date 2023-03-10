import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateScheme';
import { validateProfileForm } from 'entities/Profile/model/services/validateProfileForm/validateProfileForm';
import { Profile, ValidationProfileError } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidationProfileError[]>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        const formData = getProfileForm(getState());
        const formErrors = validateProfileForm(formData);

        if (formErrors.length) {
            return rejectWithValue(formErrors);
        }

        try {
            const response = await extra.api.put<Profile>('/profile', formData);
            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue([ValidationProfileError.SERVER_ERROR]);
        }
    },
);
