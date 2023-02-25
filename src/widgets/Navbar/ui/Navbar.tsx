import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import React, { useState, useCallback } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginModal } from 'features/AuthByUsername';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();

    const [authModalOpened, setAuthModalOpened] = useState(false);

    const onCloseModal = () => {
        setAuthModalOpened(false);
    };

    const onOpenModal = () => {
        setAuthModalOpened(true);
    };

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onOpenModal}
            >
                {t('Войти')}
            </Button>
            <LoginModal isOpen={authModalOpened} onClose={onCloseModal} />
        </div>
    );
};
