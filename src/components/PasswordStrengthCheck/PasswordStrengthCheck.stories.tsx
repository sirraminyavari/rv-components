import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  PasswordStrengthCheck as PasswordStrengthCheckComponent,
  RVPasswordStrengthCheck,
} from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/PasswordStrengthCheck',
  component: PasswordStrengthCheckComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVPasswordStrengthCheck,
} as ComponentMeta<typeof PasswordStrengthCheckComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PasswordStrengthCheckComponent> = ({ ...args }) => (
  <div>
    <PasswordStrengthCheckComponent {...args} />
  </div>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const PasswordStrengthCheck = Template.bind({});

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };

export const disabled = Template.bind({});
disabled.args = { disabled: true };
