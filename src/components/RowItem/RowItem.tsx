import clsx from 'clsx';
import { HTMLAttributes, DetailedHTMLProps, forwardRef, PropsWithoutRef, ReactNode } from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types/global';
import styles from './RowItem.module.scss';

export interface RVRowItem
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  variant?: RVVariantProp;
  color?: RVColorProp;
  size?: RVSizeProp;
  fullCircle?: boolean;
  rounded?: 'full' | 'half';
  ActionsComponent?: ReactNode;
}

const RowItem = forwardRef<HTMLDivElement, RVRowItem>(
  (
    {
      children,
      className,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.outline,
      size = RVSizeProp.medium,
      fullCircle,
      rounded = 'half',
      ActionsComponent,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.baseRowItem,
          color,
          styles[RVVariantProp[variant]],
          styles[RVSizeProp[size]],
          rounded === 'full' && styles.roundedFull,
          rounded === 'half' && styles.roundedHalf,
          fullCircle && styles.fullCircle,
          className
        )}
        {...props}
      >
        <div className={styles.titleArea}>{children}</div>
        <div className={styles.actionsArea}>{ActionsComponent}</div>
      </div>
    );
  }
);

export default RowItem;
