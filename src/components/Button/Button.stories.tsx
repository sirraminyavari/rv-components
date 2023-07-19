import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button as ButtonComponent, RVButton } from '.';
import HomeSvg from '../../icons/home.svg';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: ButtonComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
  } as RVButton,
} as ComponentMeta<typeof ButtonComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonComponent> = ({ children = 'Button', ...args }) => (
  <ButtonComponent {...args}>{children}</ButtonComponent>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Button = Template.bind({});

export const fullCircle = Template.bind({});
fullCircle.args = {
  fullCircle: true,
  children: <HomeSvg />,
};
export const withIcon = Template.bind({});
withIcon.args = {
  children: (
    <>
      <HomeSvg />
      custom icon
    </>
  ),
};

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };

export const disabled = Template.bind({});
disabled.args = { variant: 'disabled', disabled: true };
