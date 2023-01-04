import clsx from 'clsx';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  PropsWithoutRef,
} from 'react';
import { RVColorProp } from '../../../../types';
import styles from './SidebarMainNavLink.module.scss';

export interface RVSidebarMainNavLink
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >
    >,
    'color'
  > {
  color?: RVColorProp;
}
const SidebarMainNavLink = forwardRef<HTMLButtonElement, RVSidebarMainNavLink>(
  ({ children, className, color = RVColorProp.cgBlue, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(styles.mainNavLink, color, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default SidebarMainNavLink;
