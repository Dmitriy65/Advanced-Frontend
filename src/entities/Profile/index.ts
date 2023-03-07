import { profileReducer, profileActions } from 'entities/Profile/model/slice/profileSlice';
import { Profile, ProfileScheme } from 'entities/Profile/model/types/profile';
import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
import { updateProfileData } from './model/services/updateProfileData/updateProfileData';

export {
    Profile,
    ProfileScheme,
    profileReducer,
    profileActions,
    fetchProfileData,
    updateProfileData,
};
