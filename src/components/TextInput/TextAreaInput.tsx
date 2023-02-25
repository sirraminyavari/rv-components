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

export interface RVTextAreaInput
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<
        InputHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
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
  rows?: number;
  cols?: number;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, RVTextAreaInput>(
  (
    {
      className,
      color = RVColorProp.gray,
      variant = RVVariantProp.primary,
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
        <textarea
          ref={ref}
          placeholder={placeholder}
          className={styles.baseTextInput}
          {...props}
        />
        {label && (
          <label
            className={clsx(
              styles.label,
              styles.TextAreaLabel,
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

export default TextAreaInput;
