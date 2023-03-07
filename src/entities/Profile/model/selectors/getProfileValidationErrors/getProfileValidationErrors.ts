import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';

export const getProfileValidationErrors = (state: StateScheme) => state?.profile?.validationErrors;
