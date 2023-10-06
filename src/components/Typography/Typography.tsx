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
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>>,
    'color'
  > {
  /** set the component color palette (default:RVColorProp.grayDark) */
  color?: RVColorProp;
  /** set the Typography to be rendered as the selected option html tag (default: H6) */
  type?: 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'p' | 'caption';
  /** whether text to have the full or half color opacity (default: false) */
  muted?: boolean;
}

const TypographyTag = forwardRef<HTMLHeadingElement, RVTypography>(
  ({ type = 'H6', children, ...props }, ref) => {
    return createElement(type.toLowerCase(), { ref, ...props }, children);
  }
);

const Typography = forwardRef<HTMLHeadingElement, RVTypography>(
  ({ children, className, color = RVColorProp.grayDark, type = 'H6', muted, ...props }, ref) => {
    return (
      <TypographyTag
        ref={ref}
        className={clsx(color, styles.baseHeading, styles[type], muted && styles.muted, className)}
        {...{ type, ...props }}
      >
        {children}
      </TypographyTag>
    );
  }
);

export default Typography;
