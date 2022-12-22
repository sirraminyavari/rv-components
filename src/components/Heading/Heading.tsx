import clsx from 'clsx';
import {
  createElement,
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  PropsWithoutRef,
} from 'react';
import { colorProp } from '../../types/global';
import styles from './Heading.module.scss';

export interface IHeading
  extends PropsWithoutRef<
    DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  > {
  color?: colorProp;
  type?: 'H1' | 'H2' | 'H4' | 'H4' | 'H5' | 'H6' | 'p' | 'sub';
  muted?: boolean;
}

const HeadingTag = forwardRef<HTMLHeadingElement, IHeading>(
  ({ type = 'H6', children, ...props }, ref) => {
    return createElement(type, { ref, ...props }, children);
  }
);

const Heading = forwardRef<HTMLHeadingElement, IHeading>(
  (
    { children, className, color = 'grayDark', type = 'H6', muted, ...props },
    ref
  ) => {
    return (
      <HeadingTag
        ref={ref}
        className={clsx(
          color,
          styles.baseHeading,
          styles[type],
          muted && styles.muted,
          className
        )}
        {...{ type, ...props }}
      >
        {children}
      </HeadingTag>
    );
  }
);

export default Heading;
