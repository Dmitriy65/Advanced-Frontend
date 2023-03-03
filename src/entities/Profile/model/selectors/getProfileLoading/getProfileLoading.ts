import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';

export const getProfileLoading = (state: StateScheme) => state?.profile?.isLoading;
