import clsx from 'clsx';
import { HTMLAttributes, DetailedHTMLProps, forwardRef, PropsWithoutRef, ReactNode } from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types/global';
import styles from './RowItem.module.scss';

export interface RVRowItem
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  /** set between the various designs of the component (default:RVVariantProp.outline) */
  variant?: RVVariantProp;
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.medium) */
  size?: RVSizeProp;
  /** set to change the roundness of the RowItem corners (default:"half")*/
  rounded?: 'full' | 'half';
  /** set the appropriate styles to RowItem to be clickable (default:false)*/
  clickable?: boolean;
  /** passed ReactNodes will be placed at the end of the RowItem as actions */
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
      rounded = 'half',
      ActionsComponent,
      clickable,
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
          clickable && styles.clickable,
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
