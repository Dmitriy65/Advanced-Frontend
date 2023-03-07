import { useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { profileActions } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ValidationProfileError } from 'entities/Profile/model/types/profile';
import { useTranslation } from 'react-i18next';
import {
    getProfileValidationErrors,
} from '../../model/selectors/getProfileValidationErrors/getProfileValidationErrors';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileLoading } from '../../model/selectors/getProfileLoading/getProfileLoading';
import { getProfileError } from '../../model/selectors/getProfileError/gerProfileError';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { ProfileCard } from '../ProfileCard/ProfileCard';

export const EditableProfileCard = () => {
    const dispatch = useAppDispatch();
    const data = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileLoading);
    const error = useSelector(getProfileError);
    const isReadonly = useSelector(getProfileReadonly);
    const validationErrors = useSelector(getProfileValidationErrors);
    const { t } = useTranslation('profile');

    const onChangeFirstname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ first: value || '' }));
        },
        [dispatch],
    );

    const onChangeLastname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ lastname: value || '' }));
        },
        [dispatch],
    );

    const onChangeCity = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ city: value || '' }));
        },
        [dispatch],
    );

    const onChangeAge = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
        },
        [dispatch],
    );

    const onChangeUsername = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ username: value || '' }));
        },
        [dispatch],
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ avatar: value || '' }));
        },
        [dispatch],
    );

    const onChangeCurrency = useCallback(
        (currency: Currency) => {
            dispatch(profileActions.updateProfile({ currency }));
        },
        [dispatch],
    );

    const onChangeCountry = useCallback(
        (country: Country) => {
            dispatch(profileActions.updateProfile({ country }));
        },
        [dispatch],
    );

    const validationErrorsTranslation = useMemo(() => ({
        [ValidationProfileError.INCORRECT_FIRST_NAME]: t('Имя обязательно'),
        [ValidationProfileError.INCORRECT_LAST_NAME]: t('Фамилия обязательна'),
        [ValidationProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
        [ValidationProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidationProfileError.SERVER_ERROR]: t('Ошибка сервера при сохранении'),
    }), [t]);

    return (
        <>
            {validationErrors?.length && validationErrors.map((error) => (
                <Text
                    theme={TextTheme.ERROR}
                    text={validationErrorsTranslation[error]}
                    key={error}
                />
            ))}
            <ProfileCard
                data={data}
                error={error}
                isLoading={isLoading}
                readonly={isReadonly}
                onChangeLastname={onChangeLastname}
                onChangeFirstname={onChangeFirstname}
                onChangeCity={onChangeCity}
                onChangeAge={onChangeAge}
                onChangeUsername={onChangeUsername}
                onChangeAvatar={onChangeAvatar}
                onChangeCountry={onChangeCountry}
                onChangeCurrency={onChangeCurrency}
            />
        </>

    );
};
