import clsx from 'clsx';
import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithoutRef } from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types/global';
import styles from './ChatBubble.module.scss';

export interface RVChatBubble
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  variant?: RVVariantProp;
  color?: RVColorProp;
  size?: RVSizeProp;
  additionalInfo?: string;
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
