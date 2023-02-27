import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';

export const getUserAuthData = (state: StateScheme) => state.user.authData;
