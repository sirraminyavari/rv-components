import clsx from 'clsx';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import {
  DetailedHTMLProps,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  PropsWithoutRef,
  UIEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import { RVColorProp, RVSizeProp, RVSvgProps } from '../../../types';
import { SidebarMainNavLink } from './NavLink';
import styles from './SidebarMain.module.scss';
import { Scrollbar } from '../../Scrollbar';

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
  secondaryLinks: {
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
      secondaryLinks = [],
      color = RVColorProp.oxford,
      className,
      ...props
    },
    ref
  ) => {
    const activePrimaryIndicatorRef = useRef<HTMLDivElement>(null);
    const activeSecondaryIndicatorRef = useRef<HTMLDivElement>(null);
    const primaryContainerRef = useRef<HTMLDivElement>(null);
    const activeTile = useRef<HTMLButtonElement | null>(null);
    const [isPrimary, setIsPrimary] = useState<boolean>(false);

    const onActiveClick: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        const tile = event.currentTarget;

        const tileBoundingRect = tile.getBoundingClientRect();
        if (!activePrimaryIndicatorRef.current || !primaryContainerRef.current)
          return;
        activePrimaryIndicatorRef.current.style.top = String(
          `${tileBoundingRect.y - 5}px`
        );
        activePrimaryIndicatorRef.current.style.height = `${
          tileBoundingRect.height - 15
        }px`;
        if (activeTile.current) activeTile.current.classList.remove('active');
        tile.classList.add('active');
        activeTile.current = event.currentTarget;

        setIsPrimary(true);
        if (!activeSecondaryIndicatorRef.current) return;
        activeSecondaryIndicatorRef.current.style.top = '110vh';
        activeSecondaryIndicatorRef.current.style.height = '';
      },
      [activeTile]
    );

    const onSecondaryActiveClick: MouseEventHandler<HTMLButtonElement> =
      useCallback(
        (event) => {
          const tile = event.currentTarget;
          const tileBoundingRect = tile.getBoundingClientRect();
          console.table(tileBoundingRect);
          if (
            !activePrimaryIndicatorRef.current ||
            !activeSecondaryIndicatorRef.current
          )
            return;

          activeSecondaryIndicatorRef.current.style.top = String(
            `${tileBoundingRect.y + 7.5}px`
          );
          activeSecondaryIndicatorRef.current.style.height = `${
            tileBoundingRect.height - 15
          }px`;
          if (activeTile.current) activeTile.current.classList.remove('active');
          tile.classList.add('active');
          setIsPrimary(false);
          activePrimaryIndicatorRef.current.style.top = '110vh';
          activePrimaryIndicatorRef.current.style.height = '';
          activeTile.current = event.currentTarget;
        },
        [activeTile]
      );
    const onPrimarySectionScroll: UIEventHandler<HTMLDivElement> = useCallback(
      (event) => {
        if (!activeTile.current || !primaryContainerRef.current || !isPrimary)
          return;
        const tileBoundingRect = activeTile.current.getBoundingClientRect();
        const primaryContainerScrolledWidth =
          primaryContainerRef.current.scrollTop;
        if (
          !activePrimaryIndicatorRef.current ||
          !activeSecondaryIndicatorRef.current
        )
          return;
        activePrimaryIndicatorRef.current.style.top = String(
          `${
            tileBoundingRect.y -
            5 +
            primaryContainerScrolledWidth -
            (event.target as HTMLDivElement).scrollTop
          }px`
        );
        activePrimaryIndicatorRef.current.style.height = `${
          tileBoundingRect.height - 15
        }px`;

        activeSecondaryIndicatorRef.current.style.top = '';
        activeSecondaryIndicatorRef.current.style.height = '';
      },
      [activeTile, activePrimaryIndicatorRef, isPrimary]
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.baseSidebarMain, color, className)}
        {...props}
      >
        <Scrollbar
          className={clsx(RVColorProp.crayola, styles.menuPrimaryList)}
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
          {primaryLinks.map(
            ({ onClick, noIndicator, menuTrigger, Icon, title }, idx) => (
              <SidebarMainNavLink
                key={`sidebarMenu-primary-${idx}`}
                onClick={(e) => {
                  if (!noIndicator) onActiveClick(e);
                  if (onClick) onClick(e);
                }}
                color={color}
                className={clsx(noIndicator && styles.cmLogo, color)}
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
        </Scrollbar>
        {Boolean(secondaryLinks.length) && (
          <div className={styles.menuSecondaryList}>
            <div
              ref={activeSecondaryIndicatorRef}
              className={clsx(styles.menuActiveIndicator, RVColorProp.crayola)}
            />
            {secondaryLinks.map(
              ({ onClick, noIndicator, menuTrigger, Icon, title }, idx) => (
                <SidebarMainNavLink
                  key={`sidebarMenu-primary-${idx}`}
                  onClick={(e) => {
                    if (!noIndicator) onSecondaryActiveClick(e);
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
          </div>
        )}

        {children}
      </div>
    );
  }
);

export default SidebarMain;
