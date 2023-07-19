import clsx from 'clsx';
import {
  CSSProperties,
  DetailedHTMLProps,
  Dispatch,
  forwardRef,
  HTMLAttributes,
  PropsWithoutRef,
  SetStateAction,
} from 'react';
import { RVColorProp } from '../../types';
import styles from './SideMenu.module.scss';

export interface RVSideMenu
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  color?: RVColorProp;
  open?: boolean;
  CloseTrigger?: Dispatch<SetStateAction<boolean>>;
  width?: string;
  height?: string;
}

const SideMenu = forwardRef<HTMLDivElement, RVSideMenu>(
  (
    {
      children,
      color = RVColorProp.grayLight,
      className,
      open = true,
      CloseTrigger,
      width,
      height,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.baseSideMenu, color, !open && styles.sideMenuClose, className)}
        style={
          {
            '--sideMenu-width': width,
            '--sideMenu-height': height,
            ...style,
          } as unknown as CSSProperties
        }
        {...props}
      >
        <div className={styles.sideMenuContainer}>{children}</div>
      </div>
    );
  }
);

export default SideMenu;
