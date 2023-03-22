import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateScheme';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article/model/selectors/getArticleDetails';
import { fetchCommentsByArticleId } from 'features/ArticleComments/model/services/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'addCommentForm/addCommentForArticle',
    async (commentText, thunkAPI) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkAPI;

        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !commentText || !article) {
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text: commentText,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(fetchCommentsByArticleId(article.id));

            return response.data;
        } catch (e) {
            return rejectWithValue('Add comment for article error');
        }
    },
);
