import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Checkbox as CheckboxComponent, RVCheckbox } from '.';
import { ShapesSvg } from '../../icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVCheckbox,
} as ComponentMeta<typeof CheckboxComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CheckboxComponent> = ({ label = 'label', ...args }) => (
  <CheckboxComponent label={label} {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Checkbox = Template.bind({});

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };

export const disabled = Template.bind({});
disabled.args = { disabled: true };
