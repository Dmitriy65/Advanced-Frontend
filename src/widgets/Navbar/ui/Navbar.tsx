import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import React, { useState, useCallback } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();

    const [authModalOpened, setAuthModalOpened] = useState(false);

    const onToggleModal = useCallback(
        () => {
            setAuthModalOpened((prev) => !prev);
        },
        [],
    );

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onToggleModal}
            >
                {t('Войти')}
            </Button>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Modal isOpen={authModalOpened} onClose={onToggleModal}>
                hen an unknown printer took a galley of type and it to make a type specimen book.
                It has survived not only five centuries,
                but also the into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s
            </Modal>
        </div>
    );
};
