import clsx from 'clsx';
import { HTMLAttributes, DetailedHTMLProps, forwardRef, PropsWithoutRef } from 'react';
import { RVColorProp, RVSizeProp, RVSudoActionProp, RVVariantProp } from '../../types/global';
import styles from './Avatar.module.scss';

export interface RVAvatar
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement>>,
    'color'
  > {
  /** set between the various designs of the component (default:RVVariantProp.primary) */
  variant?: RVVariantProp;
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.large) */
  size?: RVSizeProp;
  /** set to `True` to component be a isometric circle button (default:undefined) */
  fullCircle?: boolean;
  /** set to stack multiple avatar components together. Stacked Avatar components needed to be wrapped with `AvatarGroup` component (default:false) */
  stacked?: boolean;
  /** set to change the roundness of the button corners (default:"small") */
  rounded?: 'full' | 'half';
  /** set the Avatar component to have a small indicator (default:false) */
  withIndicator?: boolean;
  /** set the Avatar indicator color (default: RVColorProp.cgBlue) */
  indicatorColor?: RVColorProp;
  /** set the component image source URL (required) */
  src: string;
  /** set the image accessibility label */
  alt?: string;
  /** set to programmatically change the css actions (hover,focus,active) (default:undefined)*/
  sudoAction?: RVSudoActionProp;
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
      indicatorColor = RVColorProp.crayola,
      withIndicator,
      alt = '',
      sudoAction,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          styles.avatarContainer,
          styles[RVSizeProp[size]],
          stacked && styles.stacked,
          styles[RVVariantProp[variant]],
          fullCircle && styles.fullCircle
        )}
      >
        <img
          ref={ref}
          className={clsx(
            styles.baseAvatar,
            color,

            rounded === 'full' && styles.roundedFull,
            rounded === 'half' && styles.roundedHalf,

            className
          )}
          alt={alt}
          data-sudo={sudoAction}
          {...props}
        />
        {withIndicator && (
          <>
            <span className={clsx(indicatorColor, styles.indicator)} />
            <span className={clsx(color, styles.indicatorRing)} />
          </>
        )}
        {children}
      </div>
    );
  }
);

export default Avatar;
