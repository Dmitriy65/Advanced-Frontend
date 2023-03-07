import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const countryOptions = Object.values(Country).map((values) => ({
    value: values,
    content: values,
}));

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className, value, readonly, onChange,
    } = props;
    const { t } = useTranslation();

    const onSelectChange = useCallback(
        (value: string) => {
            if (onChange) {
                onChange(value as Country);
            }
        },
        [onChange],
    );

    return (
        <Select
            label={t('Укажите страну')}
            className={className}
            readonly={readonly}
            value={value}
            options={countryOptions}
            onChange={onSelectChange}
        />
    );
});
