import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  PropsWithoutRef,
} from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import ReactSelect from 'react-select';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import styles from './Select.module.scss';
import type SelectType from 'react-select/dist/declarations/src/Select';

interface RVSelectOptions
  extends OptionsOrGroups<string | number, GroupBase<string | number>> {}

export interface RVSelect
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >,
    'color' | 'size'
  > {
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  color?: RVColorProp;
  size?: RVSizeProp;
  label?: string;
  disabled?: boolean;
  isMulti?: boolean;
  isClearable?: boolean;
  options: { label: string | number; value: string | number }[];
}

const Select = forwardRef<
  SelectType<string | number, boolean, GroupBase<string | number>>,
  RVSelect
>(
  (
    {
      className,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.primary,
      size = RVSizeProp.small,
      disabled,
      onChange,
      options,
      isMulti,
      ...props
    },
    ref
  ) => {
    // const [isToggled, setIsToggled] = useState<boolean>(true);
    return (
      <>
        <ReactSelect
          isMulti={isMulti}
          ref={ref}
          isDisabled={disabled}
          className={clsx(
            styles.selectContainer,
            isMulti && styles.selectMulti,
            disabled && styles.disabled,
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
