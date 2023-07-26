import clsx from 'clsx';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import {
  DetailedHTMLProps,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  PropsWithoutRef,
  UIEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { RVColorProp, RVSizeProp, RVSvgProps } from '../../../types';
import { SidebarMainNavLink } from './NavLink';
import styles from './SidebarMain.module.scss';
import { Scrollbar } from '../../Scrollbar';

export interface RVSidebarMain
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  color?: RVColorProp;
  primaryLinks: {
    Icon?: FunctionComponent<RVSvgProps>;
    title?: string;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    noIndicator?: boolean;
    menuTrigger?: boolean;
    path: string;
  }[];
  secondaryLinks: {
    Icon?: FunctionComponent<RVSvgProps>;
    title?: string;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    noIndicator?: boolean;
    menuTrigger?: boolean;
    path: string;
  }[];
  currentPath: string;
}

const SidebarMain = forwardRef<HTMLDivElement, RVSidebarMain>(
  (
    {
      children,
      primaryLinks = [],
      secondaryLinks = [],
      color = RVColorProp.oxford,
      className,
      currentPath = '',
      ...props
    },
    ref
  ) => {
    const activePrimaryIndicatorRef = useRef<HTMLDivElement>(null);
    const activeSecondaryIndicatorRef = useRef<HTMLDivElement>(null);
    const primaryContainerRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<{
      [key: string]: {
        element: HTMLButtonElement;
        type: 'primary' | 'secondary';
      };
    }>({});
    const activeTile = useRef<HTMLButtonElement | null>(null);
    const [isPrimary, setIsPrimary] = useState<boolean>(false);

    const onActiveClick = useCallback(
      (event?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        if (!activePrimaryIndicatorRef.current || !primaryContainerRef.current) return;
        if (!activeTile.current) {
          activePrimaryIndicatorRef.current.style.top = String(`${0}px`);
          activePrimaryIndicatorRef.current.style.height = String(`${0}px`);
          return;
        }
        const tile = event?.currentTarget || activeTile.current!;

        const tileBoundingRect = tile.getBoundingClientRect();

        activePrimaryIndicatorRef.current.style.top = String(`${tileBoundingRect.y - 5}px`);
        activePrimaryIndicatorRef.current.style.height = `${tileBoundingRect.height - 15}px`;
        if (event?.currentTarget) activeTile.current = event.currentTarget;

        setIsPrimary(true);
        if (!activeSecondaryIndicatorRef.current) return;
        activeSecondaryIndicatorRef.current.style.top = '110vh';
        activeSecondaryIndicatorRef.current.style.height = '';
      },
      [activeTile]
    );

    const onSecondaryActiveClick = useCallback(
      (event?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        if (!activePrimaryIndicatorRef.current || !activeSecondaryIndicatorRef.current) return;
        if (!activeTile.current) {
          activeSecondaryIndicatorRef.current.style.top = String(`${0}px`);
          activeSecondaryIndicatorRef.current.style.height = String(`${0}px`);
          return;
        }
        const tile = event?.currentTarget || activeTile.current!;
        const tileBoundingRect = tile.getBoundingClientRect();
        console.table(tileBoundingRect);

        activeSecondaryIndicatorRef.current.style.top = String(`${tileBoundingRect.y + 7.5}px`);
        activeSecondaryIndicatorRef.current.style.height = `${tileBoundingRect.height - 15}px`;
        setIsPrimary(false);
        activePrimaryIndicatorRef.current.style.top = '110vh';
        activePrimaryIndicatorRef.current.style.height = '';
        if (event?.currentTarget) activeTile.current = event.currentTarget;
      },
      [activeTile]
    );
    const onPrimarySectionScroll: UIEventHandler<HTMLDivElement> = useCallback(
      (event) => {
        if (!activeTile.current || !primaryContainerRef.current || !isPrimary) return;
        const tileBoundingRect = activeTile.current.getBoundingClientRect();
        const primaryContainerScrolledWidth = primaryContainerRef.current.scrollTop;
        if (!activePrimaryIndicatorRef.current || !activeSecondaryIndicatorRef.current) return;
        activePrimaryIndicatorRef.current.style.top = String(
          `${
            tileBoundingRect.y -
            5 +
            primaryContainerScrolledWidth -
            (event.target as HTMLDivElement).scrollTop
          }px`
        );
        activePrimaryIndicatorRef.current.style.height = `${tileBoundingRect.height - 15}px`;

        activeSecondaryIndicatorRef.current.style.top = '';
        activeSecondaryIndicatorRef.current.style.height = '';
      },
      [activeTile, activePrimaryIndicatorRef, isPrimary]
    );

    useEffect(() => {
      if (Object.values(linkRefs.current).length === 0) return;
      const menuLinks = linkRefs.current;
      for (const path in menuLinks) {
        if (currentPath.startsWith(path)) {
          const menuItem = menuLinks[path];
          activeTile.current = menuItem.element;
          if (menuItem.type === 'secondary') onSecondaryActiveClick();
          if (menuItem.type === 'primary') onActiveClick();

          return;
        }
        activeTile.current = null;
        onSecondaryActiveClick();
        onActiveClick();
      }
    }, [currentPath, onActiveClick, onSecondaryActiveClick]);

    return (
      <div ref={ref} className={clsx(styles.baseSidebarMain, color, className)} {...props}>
        <Scrollbar
          className={clsx(styles.menuPrimaryList)}
          onScroll={throttle(
            debounce(onPrimarySectionScroll, 100, {
              trailing: true,
              maxWait: 10,
            }),
            50,
            {
              leading: true,
              trailing: true,
            }
          )}
          size={RVSizeProp.small}
          color={RVColorProp.crayola}
          ref={primaryContainerRef}
        >
          <div
            ref={activePrimaryIndicatorRef}
            className={clsx(styles.menuActiveIndicator, RVColorProp.crayola)}
          />
          {primaryLinks.map(({ onClick, noIndicator, menuTrigger, Icon, title, path }, idx) => (
            <SidebarMainNavLink
              ref={(elementRef) => {
                if (elementRef)
                  linkRefs.current[path] = {
                    type: 'primary',
                    element: elementRef,
                  };
              }}
              key={`sidebarMenu-primary-${idx}`}
              onClick={(e) => {
                if (!noIndicator) onActiveClick(e);
                if (onClick) onClick(e);
              }}
              color={color}
              className={clsx(
                noIndicator && styles.cmLogo,
                color,
                currentPath.startsWith(path) && 'active'
              )}
            >
              {Icon && (
                <Icon
                  className={clsx(styles.menuTileIcon, menuTrigger && styles.menuTrigger)}
                  outline={!noIndicator || !menuTrigger}
                />
              )}
              {title}
            </SidebarMainNavLink>
          ))}
        </Scrollbar>
        {Boolean(secondaryLinks.length) && (
          <div className={styles.menuSecondaryList}>
            <div
              ref={activeSecondaryIndicatorRef}
              className={clsx(styles.menuActiveIndicator, RVColorProp.crayola)}
            />
            {secondaryLinks.map(({ onClick, noIndicator, menuTrigger, Icon, title, path }, idx) => (
              <SidebarMainNavLink
                ref={(elementRef) => {
                  if (elementRef)
                    linkRefs.current[path] = {
                      type: 'secondary',
                      element: elementRef,
                    };
                }}
                key={`sidebarMenu-primary-${idx}`}
                onClick={(e) => {
                  if (!noIndicator) onSecondaryActiveClick(e);
                  if (onClick) onClick(e);
                }}
                color={color}
                className={clsx(
                  noIndicator && styles.cmLogo,
                  currentPath.startsWith(path) && 'active'
                )}
              >
                {Icon && (
                  <Icon
                    className={clsx(styles.menuTileIcon, menuTrigger && styles.menuTrigger)}
                    outline={!noIndicator || !menuTrigger}
                  />
                )}
                {title}
              </SidebarMainNavLink>
            ))}
          </div>
        )}

        {children}
      </div>
    );
  }
);

export default SidebarMain;
