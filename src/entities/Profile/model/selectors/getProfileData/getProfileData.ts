import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';

export const getProfileData = (state: StateScheme) => state?.profile?.data;
