import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from 'entities/Currency/model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const currencyOptions = Object.values(Currency).map((values) => ({
    value: values,
    content: values,
}));

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className, value, readonly, onChange,
    } = props;
    const { t } = useTranslation();

    const onSelectChange = useCallback(
        (value: string) => {
            if (onChange) {
                onChange(value as Currency);
            }
        },
        [onChange],
    );

    return (
        <Select
            label={t('Укажите валюту')}
            className={className}
            readonly={readonly}
            value={value}
            options={currencyOptions}
            onChange={onSelectChange}
        />
    );
});
