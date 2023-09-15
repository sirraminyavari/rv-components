import clsx from 'clsx';
import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithoutRef } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import ReactSelect from 'react-select';
import { RVColorProp } from '../../types';
import styles from './Select.module.scss';
import type SelectType from 'react-select/dist/declarations/src/Select';

interface RVSelectOptions extends OptionsOrGroups<string | number, GroupBase<string | number>> {}

export interface RVSelect
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color' | 'size'
  > {
  /** set between the various designs of the component (default:RVVariantProp.primary) */
  // variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.medium) */
  // size?: RVSizeProp;
  /** set the identifying label text for selectInput */
  label?: string;
  /** set the component to be disabled and not be interactive */
  disabled?: boolean;
  /** set the component to fill the available width of the parent element */
  fullWidth?: boolean;
  /** set the Select component to accept multiple values */
  isMulti?: boolean;
  /** show a clear button at the end of the Select component  */
  isClearable?: boolean;
  /** set the Select component available choices */
  options: {
    label: string | number;
    value: string | number;
  }[];
}

const Select = forwardRef<
  SelectType<string | number, boolean, GroupBase<string | number>>,
  RVSelect
>(
  (
    {
      className,
      color = RVColorProp.cgBlue,
      // variant = RVVariantProp.primary,
      // size = RVSizeProp.small,
      disabled,
      onChange,
      options,
      fullWidth,
      isMulti,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <ReactSelect
          isMulti={isMulti}
          isSearchable
          ref={ref}
          isDisabled={disabled}
          closeMenuOnSelect={!isMulti}
          className={clsx(
            styles.selectContainer,
            isMulti && styles.selectMulti,
            disabled && styles.disabled,
            fullWidth && styles.fullWidth,
            color
            // styles[size],
            // styles[variant]
          )}
          options={options as unknown as RVSelectOptions}
          {...props}
        />
      </>
    );
  }
);

export default Select;
