import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateScheme';
import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<Comment[], string, ThunkConfig<string>>(
    'articleDetailsComments/fetchCommentsByArticleId',
    async (id, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Comment[]>('/comments', {
                params: {
                    articleId: id,
                    _expand: 'user',
                },
            });
            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue(`Fetch article comments by ${id} id Error`);
        }
    },
);
