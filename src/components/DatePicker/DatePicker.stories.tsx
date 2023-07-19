import React, { useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DatePicker as DatePickerComponent, RVDatePicker } from '.';
import { ShapesSvg } from '../../icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DatePicker',
  component: DatePickerComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVDatePicker,
} as ComponentMeta<typeof DatePickerComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DatePickerComponent> = ({ label = 'label', ...args }) => {
  const first = useRef<HTMLInputElement>(null);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <DatePickerComponent
        ref={first}
        label={label}
        {...args}
        onClick={() => {
          console.log(first);
        }}
      />
    </div>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const DatePicker = Template.bind({});

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };

export const disabled = Template.bind({});
disabled.args = { disabled: true };
