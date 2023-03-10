import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import avatar from 'shared/assets/tests/avatar.webp';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'features/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;
export const Primary = Template.bind({});
Primary.args = {
    data: {
        first: 'Dzmitry',
        lastname: 'Razmyslovich',
        age: 24,
        currency: Currency.USD,
        country: Country.Belarus,
        city: 'Minsk',
        username: 'admin',
        avatar,
    },
};

export const WithError = Template.bind({});
WithError.args = {
    error: '500 response error',
};

export const WithLoading = Template.bind({});
WithLoading.args = {
    isLoading: true,
};
