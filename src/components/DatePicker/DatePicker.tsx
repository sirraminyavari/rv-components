import clsx from 'clsx';
import { forwardRef, useCallback, useState } from 'react';
import { CalendarSvg } from '../../icons';
import { RVTextInput, TextInput } from '../TextInput';
import DatePickerPanel, {
  DatePickerProps,
  DayValue,
  Calendar,
} from 'ramin-modern-calendar-datepicker';

import styles from './DatePicker.module.scss';
import { Optional, RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import { faDateConvertor } from '../../utils';
export interface RVDatePicker
  extends Omit<Optional<DatePickerProps<DayValue>, 'value'>, 'locale' | 'renderInput'> {
  /** set between the various designs of the component (default:RVVariantProp.outline) */
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.medium) */
  size?: RVSizeProp;
  /** set the component to fill the available width of the parent element */
  fullWidth?: boolean;
  /** set the Textarea icon position if exists (default:trailing) */
  IconPosition?: 'leading' | 'trailing';
  /** set the component to be disabled and not be interactive */
  disabled?: boolean;
  /** set the DatePicker to render the panel as standalone component without an input  */
  inlinePanel?: boolean;
  /** set the component to be disabled and not be interactive */
  locale?: 'en' | 'fa';
  className?: string;
}

const DatePicker = forwardRef<HTMLInputElement, RVDatePicker>(
  (
    {
      className,
      disabled,
      onChange,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.outline,
      inputPlaceholder,
      value,
      size = RVSizeProp.medium,
      fullWidth,
      IconPosition = 'trailing',
      locale = 'en',
      inlinePanel,
      ...props
    },
    ref
  ) => {
    // const inputRef = useRef<HTMLInputElement>(null);
    // const combinedRefs = useCombinedRefs(ref, inputRef);

    const [selectedDay, setSelectedDay] = useState<DayValue>();

    const formatInputValue = useCallback(() => {
      if (!selectedDay) return '';
      if (locale === 'fa')
        return new Date(faDateConvertor(selectedDay, {})).toLocaleString(locale, {
          // minute: false,
          dateStyle: 'full',
        });
      const inputDate = new Date();
      inputDate.setMonth(selectedDay.month);
      inputDate.setDate(selectedDay.day);
      inputDate.setFullYear(selectedDay.year);
      inputDate.setHours(0);
      inputDate.setMinutes(0);
      inputDate.setSeconds(0);
      console.log(selectedDay);

      return `${inputDate.toLocaleDateString(locale, {
        // minute: false,
        dateStyle: 'full',
      })}`;
    }, [selectedDay]);

    const onDatePickerChange = useCallback(
      (dateObject: DayValue) => {
        if (onChange) onChange(dateObject);
        setSelectedDay(dateObject);
      },
      [selectedDay, formatInputValue]
    );
    const CustomDatePickerInput = useCallback(
      ({ ...dateInputProps }: Omit<RVTextInput, 'size' | 'fullWidth' | 'IconPosition'>) => {
        return (
          <>
            <TextInput
              className={clsx(styles.datePicker)}
              Icon={CalendarSvg}
              defaultValue={formatInputValue()}
              disabled={disabled}
              color={color}
              variant={variant}
              size={size}
              fullWidth={fullWidth}
              IconPosition={IconPosition}
              ref={ref}
              label={inputPlaceholder}
              value={formatInputValue()}
              {...dateInputProps}
            />
          </>
        );
      },
      [
        props,
        color,
        variant,
        disabled,
        inputPlaceholder,
        fullWidth,
        size,
        IconPosition,
        formatInputValue,
        ref,
      ]
    );

    return (
      <>
        {inlinePanel ? (
          <Calendar
            value={selectedDay}
            onChange={onDatePickerChange}
            colorPrimary="hsl(var(--base))"
            colorPrimaryLight="hsl(var(--light))"
            calendarClassName={clsx(
              styles.datePicker,
              fullWidth && styles.fullWidth,
              color,
              className
            )}
            locale={locale}
          />
        ) : (
          <DatePickerPanel
            value={selectedDay}
            onChange={onDatePickerChange}
            formatInputText={formatInputValue}
            renderInput={CustomDatePickerInput}
            colorPrimary="hsl(var(--base))"
            colorPrimaryLight="hsl(var(--light))"
            wrapperClassName={clsx(
              styles.datePicker,
              fullWidth && styles.fullWidth,
              color,
              className
            )}
            calendarPopperPosition="auto"
            locale={locale}
            {...props}
          />
        )}
      </>
    );
  }
);

export default DatePicker;
