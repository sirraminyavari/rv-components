import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  FunctionComponent,
  InputHTMLAttributes,
  PropsWithoutRef,
  useRef,
} from 'react';
import useCombinedRefs from '../../hooks/useCombinedRef';
import { RVColorProp, RVSizeProp, RVSvgProps, RVVariantProp } from '../../types';
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
  /** set between the various designs of the component (default:RVVariantProp.primary) */
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.medium) */
  size?: RVSizeProp;
  /** set the identifying label text */
  label?: string;
  /** set the component to fill the available width of the parent element */
  fullWidth?: boolean;
  /** Textarea icon component (default: undefined) */
  Icon?: FunctionComponent<RVSvgProps>;
  /** set the Textarea icon position if exists (default:trailing) */
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
      autoComplete = 'off',
      ...props
    },
    ref
  ) => {
    const inputRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, inputRef);
    return (
      <div
        className={clsx(
          styles.textInputContainer,
          color,
          size,
          styles[variant],
          disabled && styles.disabled,
          fullWidth && 'fullWidth',
          className
        )}
      >
        {Icon && IconPosition === 'leading' && (
          <Icon
            className={styles.trailingIcon}
            onClick={() => {
              combinedRef.current?.focus();
            }}
          />
        )}
        <input
          ref={combinedRef}
          type={type}
          placeholder={placeholder}
          className={styles.baseTextInput}
          disabled={disabled}
          autoComplete={autoComplete}
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
          <Icon
            className={styles.trailingIcon}
            onClick={() => {
              combinedRef.current?.focus();
            }}
          />
        )}
      </div>
    );
  }
);

export default TextInput;
