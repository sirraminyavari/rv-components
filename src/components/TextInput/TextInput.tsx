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
      DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
        HTMLInputElement | HTMLTextAreaElement
      >
    >,
    'color' | 'size'
  > {
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  color?: RVColorProp;
  size?: RVSizeProp;
  label?: string;
  fullWidth?: boolean;
  Icon?: FunctionComponent<RVSvgProps>;
  IconPosition?: 'leading' | 'trailing';
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
      IconPosition = 'trailing',
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
        {Icon && IconPosition === 'leading' && (
          <Icon className={styles.trailingIcon} />
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={styles.baseTextInput}
          {...props}
        />
        {label && (
          <label
            className={clsx(
              styles.label,
              IconPosition === 'leading' && styles.labelWithLeadingIcon
            )}
          >
            {label}
          </label>
        )}
        {Icon && IconPosition === 'trailing' && (
          <Icon className={styles.trailingIcon} />
        )}
      </div>
    );
  }
);

export default TextInput;
