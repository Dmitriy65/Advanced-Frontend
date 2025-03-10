import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';

export const getArticleDetailsData = (state: StateScheme) => state.articleDetails?.data;
export const getArticleDetailsIsLoading = (state: StateScheme) => state.articleDetails?.isLoading || false;
export const getArticleDetailsError = (state: StateScheme) => state.articleDetails?.error;
