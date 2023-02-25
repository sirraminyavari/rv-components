import clsx from 'clsx';
import {
  HTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  PropsWithoutRef,
} from 'react';
import styles from './ButtonGroup.module.scss';

export interface RVButtonGroup
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >,
    'color'
  > {
  fullWidth?: boolean;
}

const ButtonGroup = forwardRef<HTMLDivElement, RVButtonGroup>(
  ({ children, className, fullWidth, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.buttonGroup,
          fullWidth && 'fullWidth',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default ButtonGroup;
