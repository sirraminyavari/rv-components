import clsx from 'clsx';
import { ComponentProps, forwardRef, PropsWithoutRef, ComponentRef } from 'react';
import { RVColorProp, RVVariantProp } from '../../types';
import ReactSelect, { ActionMeta } from 'react-select';
import type StateManagedSelect from 'react-select/dist/declarations/src/stateManager';
import styles from './Select.module.scss';

export interface RVSelectOptionItem {
  readonly value?: string | number | boolean | Date;
  readonly label: string | number;
}
export interface RVSelect
  extends Omit<PropsWithoutRef<ComponentProps<StateManagedSelect>>, 'color' | 'size' | 'onChange'> {
  /** set between the various designs of the component (default:RVVariantProp.outline) */
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
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
  selectedOptions?: RVSelectOptionItem | RVSelectOptionItem[];
  options?: RVSelectOptionItem[];
  onChange?: (newValue: RVSelectOptionItem[], actionMeta: ActionMeta<RVSelectOptionItem[]>) => void;
}

const Select = forwardRef<ComponentRef<StateManagedSelect>, RVSelect>(
  (
    {
      className,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.primary,
      // size = RVSizeProp.small,
      disabled,
      options,
      fullWidth,
      isMulti,
      selectedOptions,
      onChange,
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
            variant,
            color
          )}
          options={options}
          value={selectedOptions}
          onChange={onChange as (newValue: unknown, actionMeta: ActionMeta<unknown>) => void}
          {...props}
        />
      </>
    );
  }
);

export default Select;
