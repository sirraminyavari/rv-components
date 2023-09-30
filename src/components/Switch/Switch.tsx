import clsx from 'clsx';
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  PropsWithoutRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import styles from './Switch.module.scss';

export interface RVSwitch
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>,
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
      checked,
      id = `${Date.now()}`,
      onChange,
      readOnly,
      ...props
    },
    ref
  ) => {
    const [isToggled, setIsToggled] = useState<boolean>();

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        if (readOnly) return;
        setIsToggled(e.target.checked);
        if (onChange) onChange(e);
      },
      [isToggled, checked, readOnly]
    );
    useEffect(() => {
      setIsToggled(checked);
    }, [checked]);
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
            className={styles.input}
            disabled={disabled}
            onChange={onChangeHandler}
            checked={isToggled}
            readOnly={readOnly}
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
