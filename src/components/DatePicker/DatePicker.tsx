import clsx from 'clsx';
import { forwardRef, useCallback, useState } from 'react';
import { CalendarSvg } from '../../icons';
import { RVTextInput, TextInput } from '../TextInput';
import DatePickerPanel, { DayValue } from 'ramin-modern-calendar-datepicker';
import 'ramin-modern-calendar-datepicker/lib/DatePicker.css';

import styles from './DatePicker.module.scss';
import { RVColorProp, RVSvgProps } from '../../types';
export interface RVDatePicker extends RVTextInput {
  disabled?: boolean;
}

const DatePicker = forwardRef<HTMLInputElement, RVDatePicker>(
  (
    { className, disabled, onChange, color = RVColorProp.cgBlue, ...props },
    ref
  ) => {
    // const inputRef = useRef<HTMLInputElement>(null);
    // const combinedRefs = useCombinedRefs(ref, inputRef);

    const [selectedDay, setSelectedDay] = useState<DayValue>();

    const formatInputValue = () => {
      if (!selectedDay) return '';
      return `${selectedDay.year}-${selectedDay.month.toLocaleString(
        undefined,
        {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }
      )}-${selectedDay.day.toLocaleString(undefined, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`;
    };
    const CustomDatePickerInput = useCallback(
      ({ ...dateProps }: RVTextInput) => {
        return (
          <TextInput
            className={clsx(styles.datePicker)}
            Icon={CalendarSvg}
            defaultValue={formatInputValue()}
            disabled={disabled}
            color={color}
            {...props}
            {...dateProps}
          />
        );
      },
      [props, color, ref]
    );

    return (
      <>
        <DatePickerPanel
          value={selectedDay}
          onChange={setSelectedDay}
          formatInputText={formatInputValue}
          renderInput={CustomDatePickerInput}
          colorPrimary="hsl(var(--base))"
          colorPrimaryLight="hsl(var(--light))"
          calendarClassName={color}
        />
      </>
    );
  }
);

export default DatePicker;
