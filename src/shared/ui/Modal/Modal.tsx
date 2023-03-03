import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { ReactNode, useEffect, useCallback } from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
    } = props;

    const mods: Mods = {
        [cls.opened]: isOpen,
    };

    const closeHandler = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const contentClickHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const onKeyDownHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', onKeyDownHandler);
        } else {
            document.removeEventListener('keydown', onKeyDownHandler);
        }
    }, [isOpen, onKeyDownHandler]);

    return (
        <Portal>
            <div className={classNames(cls.modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={contentClickHandler}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
