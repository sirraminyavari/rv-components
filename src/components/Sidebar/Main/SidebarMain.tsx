import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  PropsWithoutRef,
  useCallback,
  useRef,
} from 'react';
import { RVColorProp, RVSvgProps } from '../../../types';
import { SidebarMainNavLink } from './NavLink';
import styles from './SidebarMain.module.scss';

export interface RVSidebarMain
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >,
    'color'
  > {
  color?: RVColorProp;
  primaryLinks: {
    Icon?: FunctionComponent<RVSvgProps>;
    title?: string;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    noIndicator?: boolean;
    menuTrigger?: boolean;
  }[];
}

const SidebarMain = forwardRef<HTMLDivElement, RVSidebarMain>(
  (
    {
      children,
      primaryLinks = [],
      color = RVColorProp.oxford,
      className,
      ...props
    },
    ref
  ) => {
    const activeIndicatorRef = useRef<HTMLDivElement>(null);
    const activeTile = useRef<HTMLButtonElement | null>(null);

    const onActiveClick: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        const tile = event.currentTarget;
        const tileBoundingRect = tile.getBoundingClientRect();
        console.log({ tileBoundingRect });
        if (!activeIndicatorRef.current) return;
        activeIndicatorRef.current.style.top = String(
          `${tileBoundingRect.top + 7.5}px`
        );
        activeIndicatorRef.current.style.height = `${
          tileBoundingRect.height - 15
        }px`;
        if (activeTile.current) activeTile.current.classList.remove('active');
        tile.classList.add('active');
        activeTile.current = event.currentTarget;
      },
      [activeTile]
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.baseSidebarMain, color, className)}
        {...props}
      >
        <div
          ref={activeIndicatorRef}
          className={clsx(styles.menuActiveIndicator, RVColorProp.crayola)}
        />
        {primaryLinks.map(
          ({ onClick, noIndicator, menuTrigger, Icon, title }, idx) => (
            <SidebarMainNavLink
              key={`sidebarMenu-primary-${idx}`}
              onClick={(e) => {
                if (!noIndicator) onActiveClick(e);
                if (onClick) onClick(e);
              }}
              color={color}
              className={clsx(noIndicator && styles.cmLogo)}
            >
              {Icon && (
                <Icon
                  className={clsx(
                    styles.menuTileIcon,
                    menuTrigger && styles.menuTrigger
                  )}
                  outline={!noIndicator || !menuTrigger}
                />
              )}
              {title}
            </SidebarMainNavLink>
          )
        )}

        {children}
      </div>
    );
  }
);

export default SidebarMain;
