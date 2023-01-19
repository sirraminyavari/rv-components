import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RowItem as RowItemComponent, RVRowItem } from '.';
import HomeSvg from '../../icons/home.svg';
import AvatarGroup from '../../components/AvatarGroup/AvatarGroup';
import Avatar from '../../components/Avatar/Avatar';
import { RVSizeProp } from '../../types';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/RowItem',
  component: RowItemComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVRowItem,
} as ComponentMeta<typeof RowItemComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RowItemComponent> = (args) => (
  <RowItemComponent ActionsComponent={<></>} {...args}>
    <HomeSvg /> Find faculty mentor
  </RowItemComponent>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const RowItem = Template.bind({});

// export const fullCircle = Template.bind({});
// fullCircle.args = {
//   fullCircle: true,
// };
// export const withIcon = Template.bind({});
// withIcon.args = {};

// export const primary = Template.bind({});
// primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

// export const white = Template.bind({});
// white.args = { variant: 'white' };

// export const disabled = Template.bind({});
// disabled.args = { variant: 'disabled' };
