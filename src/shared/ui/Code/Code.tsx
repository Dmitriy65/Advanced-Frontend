import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import CopyIcon from 'shared/assets/icons/copy-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;
    const [isCopied, setIsCopied] = useState(false);

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
        });
    }, [text]);

    const btnClassNames = classNames(cls.copyBtn, { [cls.copied]: isCopied }, []);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button onClick={onCopy} className={btnClassNames} theme={ButtonTheme.CLEAR}>
                <Icon className={cls.copyIcon} Svg={CopyIcon} fill={false} />
            </Button>
            <code>{text}</code>
        </pre>
    );
});
