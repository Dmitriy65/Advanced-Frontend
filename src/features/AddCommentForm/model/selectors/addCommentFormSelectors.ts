import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';

export const getAddCommentFormText = (state: StateScheme) => state.addCommentForm?.text;
export const getAddCommentFormError = (state: StateScheme) => state.addCommentForm?.error;
