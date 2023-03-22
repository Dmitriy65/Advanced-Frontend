import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';

export const getArticleDetailsCommentsData = (state: StateScheme) => state.articleDetailsComments?.data;
export const getArticleDetailsCommentsLoading = (state: StateScheme) => state.articleDetailsComments?.isLoading;
export const getArticleDetailsCommentsError = (state: StateScheme) => state.articleDetailsComments?.error;
