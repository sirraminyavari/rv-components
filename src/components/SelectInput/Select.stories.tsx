import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select as SelectComponent, RVSelect } from '.';
import { ShapesSvg } from '../../icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Select',
  component: SelectComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVSelect,
} as ComponentMeta<typeof SelectComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SelectComponent> = ({
  label = 'label',
  options,
  ...args
}) => (
  <div style={{ minHeight: '100vh' }}>
    <SelectComponent
      label={label}
      options={[
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ]}
      {...args}
    />
  </div>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Select = Template.bind({});

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };

export const disabled = Template.bind({});
disabled.args = { disabled: true };
