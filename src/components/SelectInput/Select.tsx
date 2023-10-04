import clsx from 'clsx';
import { ComponentProps, forwardRef, PropsWithoutRef, ComponentRef } from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import ReactSelect, { ActionMeta } from 'react-select';
import type StateManagedSelect from 'react-select/dist/declarations/src/stateManager';
import styles from './Select.module.scss';

export interface RVSelectOptionItem {
  readonly value?: string | number | boolean | Date;
  readonly label: string | number;
}
export interface RVSelect
  extends Omit<PropsWithoutRef<ComponentProps<StateManagedSelect>>, 'color' | 'size' | 'onChange'> {
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  color?: RVColorProp;
  size?: RVSizeProp;
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  isMulti?: boolean;
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
      size = RVSizeProp.small,
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
