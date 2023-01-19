import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avatar as AvatarComponent, RVAvatar } from '.';
import HomeSvg from '../../icons/home.svg';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Avatar',
  component: AvatarComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {} as RVAvatar,
} as ComponentMeta<typeof AvatarComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AvatarComponent> = ({
  src = 'https://i.pravatar.cc/300',
  ...args
}) => <AvatarComponent src={src} {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Avatar = Template.bind({});

export const fullCircle = Template.bind({});
fullCircle.args = {
  fullCircle: true,
};
export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };

export const disabled = Template.bind({});
disabled.args = { variant: 'disabled' };
