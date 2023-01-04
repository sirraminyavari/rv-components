import clsx from 'clsx';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  PropsWithoutRef,
} from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types/global';
import styles from './Button.module.scss';

export interface RVButton
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >
    >,
    'color'
  > {
  variant?: RVVariantProp;
  color?: RVColorProp;
  size?: RVSizeProp;
  fullCircle?: boolean;
  rounded?: boolean;
  active?: boolean;
}

const Button = forwardRef<HTMLButtonElement, RVButton>(
  (
    {
      children,
      className,
      color = RVColorProp.cgBlue,
      variant = 'primary',
      type = 'button',
      size = 'large',
      disabled,
      active,
      fullCircle,
      rounded,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          styles.baseButton,
          color,
          styles[disabled ? 'disabled' : variant],
          styles[size],
          rounded && styles.rounded,
          fullCircle && styles.fullCircle,
          active && styles.active,
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
