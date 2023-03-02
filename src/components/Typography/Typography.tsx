import clsx from 'clsx';
import {
  createElement,
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  PropsWithoutRef,
} from 'react';
import { RVColorProp } from '../../types/global';
import styles from './Typography.module.scss';

export interface RVTypography
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    >,
    'color'
  > {
  color?: RVColorProp;
  type?: 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'p' | 'caption';
  muted?: boolean;
}

const TypographyTag = forwardRef<HTMLHeadingElement, RVTypography>(
  ({ type = 'H6', children, ...props }, ref) => {
    return createElement(type.toLowerCase(), { ref, ...props }, children);
  }
);

const Typography = forwardRef<HTMLHeadingElement, RVTypography>(
  (
    {
      children,
      className,
      color = RVColorProp.grayDark,
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
