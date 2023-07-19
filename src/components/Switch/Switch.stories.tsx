import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Switch as SwitchComponent, RVSwitch } from '.';
import { ShapesSvg } from '../../icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Switch',
  component: SwitchComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVSwitch,
} as ComponentMeta<typeof SwitchComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SwitchComponent> = ({ label = 'label', ...args }) => (
  <SwitchComponent label={label} {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Switch = Template.bind({});

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };

export const disabled = Template.bind({});
disabled.args = { disabled: true };
