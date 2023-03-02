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
import styles from './Switch.module.scss';

export interface RVSwitch
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
        HTMLInputElement | HTMLTextAreaElement
      >
    >,
    'color' | 'size'
  > {
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  color?: RVColorProp;
  size?: RVSizeProp;
  label?: string;
}

const Switch = forwardRef<HTMLInputElement, RVSwitch>(
  (
    {
      className,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.primary,
      type = 'checkbox',
      size = RVSizeProp.small,
      disabled,
      label,
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
          htmlFor="two"
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
            id="two"
            type="checkbox"
            ref={ref}
            className={styles.input}
            disabled={disabled}
            onChange={onChangeHandler}
            {...props}
          />
          <span className={styles.SwitchIndicator}></span>
          {label}
        </label>
      </>
    );
  }
);

export default Switch;
