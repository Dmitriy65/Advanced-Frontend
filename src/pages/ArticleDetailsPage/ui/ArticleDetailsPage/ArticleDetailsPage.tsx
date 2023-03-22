import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynaminModuleLoader/DynamicModuleLoader';
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from 'features/ArticleComments/model/slice/articleDetailsCommentsSlice';
import { useSelector } from 'react-redux';
import { getArticleDetailsCommentsLoading } from 'features/ArticleComments/model/selectors/getArticleDetailsComments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from 'features/ArticleComments/model/services/fetchCommentsByArticleId';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import AddCommentForm from 'features/AddCommentForm/ui/AddCommentForm';
import { addCommentForArticle } from 'pages/ArticleDetailsPage/model/services/addCommentForArticle';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from 'entities/Article/model/selectors/getArticleDetails';
import cls from './ArticleDetailsPage.module.scss';

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
    articleDetailsComments: articleDetailsCommentsReducer,
};

interface ArticleDetailsPageProps {}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentIsLoading = useSelector(getArticleDetailsCommentsLoading);

    const articleIsLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const articleError = useSelector(getArticleDetailsError);

    const onSendComment = useCallback(
        async (text: string) => {
            await dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchArticleById(id));
            dispatch(fetchCommentsByArticleId(id));
        }
    });

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticleDetailsPage, {}, [])}>
                <ArticleDetails
                    article={article}
                    isLoading={articleIsLoading}
                    error={articleError}
                />
                {article && (
                    <>
                        <Text className={cls.commentTitle} title={t('Комментарии')} />
                        <AddCommentForm onSendComment={onSendComment} />
                        <CommentList comments={comments} isLoading={commentIsLoading} />
                    </>
                )}
            </div>
        </DynamicModuleLoader>
    );
};

export default ArticleDetailsPage;
