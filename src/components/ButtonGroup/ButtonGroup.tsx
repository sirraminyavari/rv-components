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
  > {}

const ButtonGroup = forwardRef<HTMLDivElement, RVButtonGroup>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.buttonGroup, className)} {...props}>
        {children}
      </div>
    );
  }
);

export default ButtonGroup;
