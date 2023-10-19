import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  FunctionComponent,
  InputHTMLAttributes,
  PropsWithoutRef,
} from 'react';
import { RVColorProp, RVSizeProp, RVSvgProps, RVVariantProp } from '../../types';
import styles from './TextInput.module.scss';

export interface RVTextAreaInput
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
    >,
    'color' | 'size'
  > {
  /** set between the various designs of the component (default:RVVariantProp.primary) */
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.medium) */
  size?: RVSizeProp;
  /** set the identifying label text for checkbox */
  label?: string;
  /** set them component shape to be a isometric circle (default:undefined)*/
  fullWidth?: boolean;
  /** Textarea icon component (default: undefined) */
  Icon?: FunctionComponent<RVSvgProps>;
  /** set the Textarea icon position if exists (default:trailing) */
  IconPosition?: 'leading' | 'trailing';
  /** number of text rows to show before overflowing */
  rows?: number;
  /** number of text columns to show before overflowing */
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
        {Icon && IconPosition === 'leading' && <Icon className={styles.trailingIcon} />}
        <textarea ref={ref} placeholder={placeholder} className={styles.baseTextInput} {...props} />
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
        {Icon && IconPosition === 'trailing' && <Icon className={styles.trailingIcon} />}
      </div>
    );
  }
);

export default TextAreaInput;
