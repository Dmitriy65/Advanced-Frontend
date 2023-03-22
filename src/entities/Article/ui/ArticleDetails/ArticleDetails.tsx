import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById';
import { useSelector } from 'react-redux';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from 'entities/Article/model/selectors/getArticleDetails';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Article, ArticleBlock, ArticleBlockType } from 'entities/Article/model/types/article';
import { ArticleImageBlock } from 'entities/Article/ui/ArticleImageBlock/ArticleImageBlock';
import { ArticleCodeBlock } from 'entities/Article/ui/ArticleCodeBlock/ArticleCodeBlock';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleTextBlock } from 'entities/Article/ui/ArticleTextBlock/ArticleTextBlock';
import { memo } from 'react';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
    article?: Article;
    isLoading?: boolean;
    error?: string;
    className?: string;
}

export const ArticleDetails = memo(({
    className, article, isLoading, error,
}: ArticleDetailsProps) => {
    const { t } = useTranslation();

    const renderBlock = (block: ArticleBlock) => {
        if (block.type === ArticleBlockType.TEXT) {
            return (
                <ArticleTextBlock
                    key={block.id}
                    block={block}
                    className={cls.block}
                />
            );
        } if (block.type === ArticleBlockType.IMAGE) {
            return (
                <ArticleImageBlock
                    key={block.id}
                    block={block}
                    className={cls.block}
                />
            );
        } if (block.type === ArticleBlockType.CODE) {
            return (
                <ArticleCodeBlock
                    key={block.id}
                    block={block}
                    className={cls.block}
                />
            );
        }
        return null;
    };

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при загрузке статьи.')}
            />
        );
    } else if (article) {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar
                        size={200}
                        src={article?.img}
                        className={cls.avatar}
                    />
                </div>
                <Text
                    className={cls.title}
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <div className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={EyeIcon} />
                    <Text text={String(article?.views)} />
                </div>
                <div className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={CalendarIcon} />
                    <Text text={article?.createdAt} />
                </div>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
            {content}
        </div>
    );
});
