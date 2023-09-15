import clsx from 'clsx';
import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithoutRef } from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types/global';
import styles from './Separator.module.scss';

export interface RVSeparator
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  /** set between the various designs of the component (default:RVVariantProp.primary) */
  variant?: RVVariantProp;
  /** set the component color palette (default:RVColorProp.platinum) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.medium) */
  size?: RVSizeProp;
  /** set the separator label to not get wrapped */
  nowrap?: boolean;
  /** set the separator label to have ellipsis when `nowrap` is toggled */
  ellipsis?: boolean;
}

const Separator = forwardRef<HTMLDivElement, RVSeparator>(
  (
    {
      children,
      className,
      color = RVColorProp.platinum,
      variant = RVVariantProp.primary,
      size = RVSizeProp.medium,
      nowrap,
      ellipsis,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.separatorContainer,
          color,
          styles[RVVariantProp[variant]],
          styles[RVSizeProp[size]],
          nowrap && styles.nowrap,
          ellipsis && styles.ellipsis,
          className
        )}
        {...props}
      >
        <hr className={styles.horizontalLine} />
        {Boolean(children) && <span className={styles.content}>{children}</span>}
        <hr className={styles.horizontalLine} />
      </div>
    );
  }
);

export default Separator;
