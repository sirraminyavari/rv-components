import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, PropsWithoutRef } from 'react';
import { RVColorProp, RVSizeProp, RVSudoActionProp, RVVariantProp } from '../../types/global';
import styles from './Button.module.scss';

export interface RVButton
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>,
    'color'
  > {
  /** set between the various designs of the component (default:RVVariantProp.primary)*/
  variant?: RVVariantProp;
  /** set the component color palette (default:RVColorProp.cgBlue)*/
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.large)*/
  size?: RVSizeProp;
  /** set to `True` to component be a isometric circle button (default:undefined)*/
  fullCircle?: boolean;
  /** set them component shape to be a isometric circle (default:undefined)*/
  fullWidth?: boolean;
  /** set the component default style (default:undefined)*/
  badge?: boolean;
  /** set to change the roundness of the button corners (default:"small")*/
  rounded?: 'full' | 'half';
  /** set to be active (default:undefined)*/
  active?: boolean;
  /** set to True to prevent the component to  (default:undefined)*/
  noWrap?: boolean;
  /** set to programmatically change the css actions (hover,focus,active) (default:undefined)*/
  sudoAction?: RVSudoActionProp;
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
      fullWidth,
      badge,
      noWrap,
      sudoAction,
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
          fullWidth && styles.fullWidth,
          badge && styles.badge,
          noWrap && styles.noWrap,
          active && styles.active,
          className
        )}
        disabled={disabled}
        data-sudo={sudoAction}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
