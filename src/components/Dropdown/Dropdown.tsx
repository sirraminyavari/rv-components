import clsx from 'clsx';
import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithoutRef, useState } from 'react';
import { CaretSvg } from '../../icons';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import { Button } from '../Button';
import styles from './Dropdown.module.scss';

export interface RVDropdown
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color' | 'size'
  > {
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  /** set the size of the component (default:RVSizeProp.small) */
  size?: RVSizeProp;
  label?: string;
  disabled?: boolean;
}

const Dropdown = forwardRef<HTMLDivElement, RVDropdown>(
  (
    {
      className,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.outline,
      size = RVSizeProp.small,
      disabled,
      label,
      onChange,
      children,
      ...props
    },
    ref
  ) => {
    const [isToggled, setIsToggled] = useState<boolean>(true);
    const toggleDropdown = () => {
      setIsToggled((prev) => !prev);
    };
    return (
      <div
        className={clsx(styles.dropdownContainer, isToggled && styles.toggled, color, className)}
        ref={ref}
        {...props}
      >
        <>
          <Button
            variant={variant}
            color={color}
            size={size}
            className={styles.label}
            onClick={toggleDropdown}
            badge
            noWrap
          >
            {label}
            <CaretSvg direction="down" className={styles.chevron} />
          </Button>
        </>
        <div className={clsx('fullWidth', styles.dropdownMenu)}>{children}</div>
      </div>
    );
  }
);

export default Dropdown;
