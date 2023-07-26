import clsx from 'clsx';
import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithoutRef } from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types/global';
import styles from './Separator.module.scss';

export interface RVSeparator
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  variant?: RVVariantProp;
  color?: RVColorProp;
  size?: RVSizeProp;
  nowrap?: boolean;
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
        <span className={styles.content}>{children}</span>
        <hr className={styles.horizontalLine} />
      </div>
    );
  }
);

export default Separator;
