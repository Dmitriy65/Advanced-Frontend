import { fetchProfileData, profileReducer } from 'entities/Profile';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynaminModuleLoader/DynamicModuleLoader';
import { ProfilePageHeader } from 'pages/ProfilePage/ui/ProfilePageHeader/ProfilePageHeader';
import { EditableProfileCard } from 'entities/Profile/ui/EditableProfileCard/EditableProfileCard';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';

const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ProfilePageHeader />
            <EditableProfileCard />
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
