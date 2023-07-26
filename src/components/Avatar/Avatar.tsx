import clsx from 'clsx';
import { HTMLAttributes, DetailedHTMLProps, forwardRef, PropsWithoutRef } from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types/global';
import styles from './Avatar.module.scss';

export interface RVAvatar
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement>>,
    'color'
  > {
  variant?: RVVariantProp;
  color?: RVColorProp;
  size?: RVSizeProp;
  fullCircle?: boolean;
  stacked?: boolean;
  rounded?: 'full' | 'half';
  src: string;
  alt?: string;
}

const Avatar = forwardRef<HTMLImageElement, RVAvatar>(
  (
    {
      className,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.primary,
      size = RVSizeProp.large,
      fullCircle,
      rounded,
      stacked,
      alt = '',
      ...props
    },
    ref
  ) => {
    return (
      <img
        ref={ref}
        className={clsx(
          styles.baseAvatar,
          color,
          styles[RVVariantProp[variant]],
          styles[RVSizeProp[size]],
          rounded === 'full' && styles.roundedFull,
          rounded === 'half' && styles.roundedHalf,
          fullCircle && styles.fullCircle,
          stacked && styles.stacked,
          className
        )}
        alt={alt}
        {...props}
      />
    );
  }
);

export default Avatar;
