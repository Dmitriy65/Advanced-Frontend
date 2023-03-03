import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';

export const getProfileError = (state: StateScheme) => state?.profile?.error;
