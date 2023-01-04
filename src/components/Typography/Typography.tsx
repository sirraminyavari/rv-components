import clsx from 'clsx';
import {
  createElement,
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  PropsWithoutRef,
} from 'react';
import { colorProp } from '../../types/global';
import styles from './Typography.module.scss';

export interface ITypography
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    >,
    'color'
  > {
  color?: colorProp;
  type?: 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'p' | 'sub';
  muted?: boolean;
}

const TypographyTag = forwardRef<HTMLHeadingElement, ITypography>(
  ({ type = 'H6', children, ...props }, ref) => {
    return createElement(type, { ref, ...props }, children);
  }
);

const Typography = forwardRef<HTMLHeadingElement, ITypography>(
  (
    {
      children,
      className,
      color = colorProp.grayDark,
      type = 'H6',
      muted,
      ...props
    },
    ref
  ) => {
    return (
      <TypographyTag
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
      </TypographyTag>
    );
  }
);

export default Typography;
