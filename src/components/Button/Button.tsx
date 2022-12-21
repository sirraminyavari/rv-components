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
  > {
  variant?: 'primary' | 'white' | 'outline' | 'disabled';
  color?:
    | 'red'
    | 'default'
    | 'distant'
    | 'gray'
    | 'grayDark'
    | 'veryWarm'
  | 'warm';
  size?: "large" | "small";
  circle?: boolean;
  active?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    {
      children,
      className,
      color = 'default',
      variant = 'primary',
      type = 'button',
      size="large",
      disabled,
      active,
      circle,
      ...props
    }: IButton,
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          styles.baseButton,
          color,
          styles[disabled ? 'disabled' : variant],
          styles[size],
          circle&&styles.circle,
          active&&styles.active,
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
