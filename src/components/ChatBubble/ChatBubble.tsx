import clsx from 'clsx';
import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithoutRef } from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types/global';
import styles from './ChatBubble.module.scss';

export interface RVChatBubble
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  /** set between the various designs of the component (default:RVVariantProp.primary) */
  variant?: RVVariantProp;
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.medium) */
  size?: RVSizeProp;
  /** can be some minimal info or just a clock (default:undefined) */
  additionalInfo?: string;
  /** set the direction of the bubble according to the type of it (default:undefined) */
  bubbleType?: 'sender' | 'receiver';
}

const ChatBubble = forwardRef<HTMLDivElement, RVChatBubble>(
  (
    {
      children,
      className,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.primary,
      size = RVSizeProp.medium,
      additionalInfo,
      bubbleType,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.chatBubble,
          bubbleType && styles[bubbleType],
          color,
          styles[RVVariantProp[variant]],
          styles[RVSizeProp[size]],
          className
        )}
        {...props}
      >
        <p className={styles.content}>{children}</p>
        <span className={styles.timestamp}>{additionalInfo}</span>
      </div>
    );
  }
);

export default ChatBubble;
