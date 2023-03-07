import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';

export const getProfileReadonly = (state: StateScheme) => state?.profile?.readonly;
