import { classNames } from 'shared/lib/classNames/classNames';
import { IArticleCodeBlock } from 'entities/Article/model/types/article';
import { memo } from 'react';
import { Code } from 'shared/ui/Code/Code';
import cls from './ArticleCodeBlock.module.scss';

interface ArticleCodeBlockProps {
    className?: string;
    block: IArticleCodeBlock;
}

export const ArticleCodeBlock = memo((props: ArticleCodeBlockProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.ArticleCodeBlock, {}, [className])}>
            <Code text={block.code} />
        </div>
    );
});
