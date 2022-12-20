import clsx from 'clsx';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  PropsWithoutRef,
} from 'react';
import styles from './Button.module.scss';

export interface IButton
  extends PropsWithoutRef<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  > {}

const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ children, className, type = 'button', ...props }: IButton, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(styles.button, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
