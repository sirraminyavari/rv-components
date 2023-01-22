import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  FunctionComponent,
  InputHTMLAttributes,
  PropsWithoutRef,
} from 'react';
import {
  RVColorProp,
  RVSizeProp,
  RVSvgProps,
  RVVariantProp,
} from '../../types';
import styles from './TextInput.module.scss';

export interface RVTextInput
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    >,
    'color' | 'size'
  > {
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  color?: RVColorProp;
  size?: RVSizeProp;
  label?: string;
  fullWidth?: boolean;
  Icon?: FunctionComponent<RVSvgProps>;
}

const TextInput = forwardRef<HTMLInputElement, RVTextInput>(
  (
    {
      className,
      color = RVColorProp.gray,
      variant = RVVariantProp.primary,
      type = 'text',
      size = RVSizeProp.large,
      disabled,
      label,
      placeholder = ' ',
      fullWidth,
      Icon,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          styles.textInputContainer,
          color,
          size,
          styles[variant],
          fullWidth && 'fullWidth',
          className
        )}
      >
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={styles.baseTextInput}
          {...props}
        />
        {label && <label className={styles.label}>{label}</label>}
        {Icon && <Icon className={styles.trailingIcon} />}
      </div>
    );
  }
);

export default TextInput;
