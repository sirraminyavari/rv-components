import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, IButton } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
  } as IButton,
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = ({
  children = 'Button',
  ...args
}) => <Button {...args}>{children}</Button>;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const primary = Template.bind({});

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };

export const disabled = Template.bind({});
disabled.args = { variant: 'disabled', disabled: true };
