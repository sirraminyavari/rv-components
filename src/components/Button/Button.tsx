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
  badge?: boolean;
  rounded?: 'full' | 'half';
  active?: boolean;
  noWrap?: boolean;
}

const Button = forwardRef<HTMLButtonElement, RVButton>(
  (
    {
      children,
      className,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.primary,
      type = 'button',
      size = RVSizeProp.large,
      disabled,
      active,
      fullCircle,
      rounded,
      badge,noWrap,
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
          styles[disabled ? 'disabled' : RVVariantProp[variant]],
          styles[RVSizeProp[size]],
          rounded === 'full' && styles.roundedFull,
          rounded === 'half' && styles.roundedHalf,
          fullCircle && styles.fullCircle,
          badge && styles.badge,
          noWrap && styles.noWrap,
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
