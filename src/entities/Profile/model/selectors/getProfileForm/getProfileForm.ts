import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';

export const getProfileForm = (state: StateScheme) => state?.profile?.form;
