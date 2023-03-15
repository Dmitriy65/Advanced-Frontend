import { classNames } from 'shared/lib/classNames/classNames';
import { IArticleImageBlock } from 'entities/Article/model/types/article';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import cls from './ArticleImageBlock.module.scss';

interface ArticleImageBlockProps {
    className?: string;
    block: IArticleImageBlock;
}

export const ArticleImageBlock = (props: ArticleImageBlockProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.ArticleImageBlock, {}, [className])}>
            <img src={block.src} alt={block.title} className={cls.img} />
            {block.title && <Text title={block.title} align={TextAlign.CENTER} /> }
        </div>
    );
};
