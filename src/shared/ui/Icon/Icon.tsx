import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    fill?: boolean;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo((props: IconProps) => {
    const { className, fill = true, Svg } = props;

    return (
        <Svg className={classNames('', { [cls['fill-icon']]: fill }, [className])} />
    );
});
