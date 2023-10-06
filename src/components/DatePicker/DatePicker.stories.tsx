import React, { useEffect, useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DatePicker as DatePickerComponent, RVDatePicker } from '.';
import { RVVariantProp } from '../../types';
import { ThemeBlock } from '../../storybookComponents';
export default {
  title: 'Components/DatePicker',
  component: DatePickerComponent,
  argTypes: {} as RVDatePicker,
  parameters: {
    docs: {
      description: {
        component: `DatePicker component extends ramin-modern-calendar-datepicker package type interface and functionality`,
      },
    },
  },
} as ComponentMeta<typeof DatePickerComponent>;

const Template: ComponentStory<typeof DatePickerComponent> = ({
  inputPlaceholder = 'picker label',
  color,
  variant,
  ...args
}) => {
  const [colorClass, setColorClass] = useState(color);
  useEffect(() => {
    setColorClass(color);
  }, [color]);

  return (
    <ThemeBlock onColorChange={setColorClass}>
      <div
        style={{
          minHeight: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <div>
          <DatePickerComponent
            inputPlaceholder={inputPlaceholder}
            variant={variant || RVVariantProp.primary}
            color={colorClass}
            {...args}
          />
        </div>
        <div>
          <DatePickerComponent
            inputPlaceholder={inputPlaceholder}
            variant={variant || RVVariantProp.outline}
            color={colorClass}
            {...args}
          />
        </div>
        <div>
          <DatePickerComponent
            inputPlaceholder={inputPlaceholder}
            variant={variant || RVVariantProp.white}
            color={colorClass}
            {...args}
          />
        </div>
      </div>
    </ThemeBlock>
  );
};

export const DatePicker = Template.bind({});

export const inlinePanel = Template.bind({});
inlinePanel.args = { fullWidth: true };

export const PersianLocale = Template.bind({});
PersianLocale.args = { locale: 'fa' };

export const shouldHighlightWeekends = Template.bind({});
shouldHighlightWeekends.args = { shouldHighlightWeekends: true };

export const minimumSelectableDate = Template.bind({});
minimumSelectableDate.args = { minimumDate: { day: 8, month: 5, year: 2023 } };

export const maximumSelectableDate = Template.bind({});
maximumSelectableDate.args = { maximumDate: { day: 8, month: 5, year: 2025 } };

export const disabledSelectableDates = Template.bind({});
disabledSelectableDates.args = {
  disabledDays: [
    { day: 28, month: 10, year: 2023 },
    { day: 28, month: 9, year: 2023 },
    { day: 25, month: 9, year: 2023 },
    { day: 21, month: 9, year: 2023 },
    { day: 28, month: 8, year: 2023 },
    { day: 28, month: 7, year: 2023 },
    { day: 28, month: 6, year: 2023 },
    { day: 28, month: 5, year: 2023 },
    { day: 28, month: 4, year: 2023 },
  ],
};

export const disabled = Template.bind({});
disabled.args = { disabled: true };
