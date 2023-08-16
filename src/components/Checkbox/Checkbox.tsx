import clsx from 'clsx';
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  PropsWithoutRef,
  useState,
} from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import styles from './Checkbox.module.scss';

export interface RVCheckbox
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>,
    'color' | 'size'
  > {
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  color?: RVColorProp;
  size?: RVSizeProp;
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, RVCheckbox>(
  (
    {
      className,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.primary,
      type = 'checkbox',
      size = RVSizeProp.small,
      disabled,
      label,
      id = `${Date.now()}`,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isToggled, setIsToggled] = useState<boolean>(false);

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
      setIsToggled(e.target.checked);
      if (onChange) onChange(e);
    };
    return (
      <>
        <label
          htmlFor={id}
          className={clsx(
            color,
            styles[size],
            styles[variant],
            disabled && styles.disabled,
            styles.label,
            isToggled && styles.toggled,
            className
          )}
        >
          <input
            id={id}
            type="checkbox"
            ref={ref}
            {...props}
            className={styles.input}
            disabled={disabled}
            onChange={onChangeHandler}
          />
          <span className={styles.checkboxIndicator}></span>
          {label}
        </label>
      </>
    );
  }
);

export default Checkbox;
