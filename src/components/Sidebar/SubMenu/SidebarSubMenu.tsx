import clsx from 'clsx';
import {
  DetailedHTMLProps,
  Dispatch,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  PropsWithoutRef,
  SetStateAction,
  useCallback,
  useRef,
} from 'react';
import { ChevronSvg } from '../../../icons';
import { RVColorProp, RVSvgProps, RVVariantProp } from '../../../types';
import { isRTL } from '../../../utils/isRtl';
import { Accordion } from '../../Accordion';
import { Button } from '../../Button';
import { TextInput } from '../../TextInput';
import { Typography } from '../../Typography';
import SidebarSubMenuIndicator from './SidebarIndicator';
import styles from './SidebarSubMenu.module.scss';

export interface RVSidebarSubMenu
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >,
    'color'
  > {
  color?: RVColorProp;
  activeLink?: string;
  open?: boolean;
  CloseTrigger?: Dispatch<SetStateAction<boolean>>;
  menuTitle?: string;
  menuSubTitle?: string;
  MenuIcon?: FunctionComponent<RVSvgProps>;
  links: {
    id?: string;
    Icon?: FunctionComponent<RVSvgProps>;
    title?: string;
    badge?: string | number;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    onChange?: (event?: MouseEvent<HTMLButtonElement>) => void;
    input?: boolean;
    color?: RVColorProp;
    childItems?: {
      id?: string;
      Icon?: FunctionComponent<RVSvgProps>;
      title?: string;
      badge?: string | number;
      onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
      childItems?: [];
    }[];
  }[];
}

const SidebarSubMenu = forwardRef<HTMLDivElement, RVSidebarSubMenu>(
  (
    {
      children,
      color = RVColorProp.grayLight,
      className,
      links,
      activeLink,
      open = true,
      CloseTrigger,
      menuTitle,
      menuSubTitle,
      MenuIcon,
      ...props
    },
    ref
  ) => {
    const activeIndicatorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const activeTile = useRef<HTMLButtonElement | HTMLSpanElement | null>(null);

    const onActiveClick = useCallback(
      (event?: MouseEvent<HTMLButtonElement | HTMLSpanElement>) => {
        if (!activeIndicatorRef.current || !containerRef.current) return;
        if (!event && !activeTile.current) return;
        const tile = event ? event.currentTarget : activeTile.current;
        if (!tile) return;

        const containerScrolledWidth = containerRef.current.scrollTop;

        const tileBoundingRect = tile.getBoundingClientRect();
        const tileDirection = isRTL(tile);
        activeIndicatorRef.current.style.top = String(
          `${Math.abs(tileBoundingRect.top) + containerScrolledWidth}px`
        );
        activeIndicatorRef.current.style.height = `${tileBoundingRect.height}px`;
        const elementWidthOffset =
          tile.ariaLabel === 'accordion-trigger' ? -52 : 0;
        activeIndicatorRef.current.style.width = `${
          tileBoundingRect.width + elementWidthOffset
        }px`;
        if (tileDirection === 'rtl')
          activeIndicatorRef.current.style.left = `-0.1px`;
        else if (tileDirection === 'ltr')
          activeIndicatorRef.current.style.right = `-0.1px`;
        if (activeTile.current) activeTile.current.classList.remove('active');
        tile.classList.add('active');
        if (event) activeTile.current = event.currentTarget;
      },
      [activeTile]
    );

    const linkButtonGenerator = useCallback(
      (sidebarLinks: RVSidebarSubMenu['links']) => {
        return sidebarLinks.map((link) => {
          if (link.input)
            return (
              <TextInput
                key={link.id || JSON.stringify(link)}
                label={link.title}
                color={link.color || color}
                Icon={link.Icon}
                IconPosition="leading"
                className={styles.menuInput}
              />
            );
          if (link.childItems && link.childItems.length) {
            return (
              <Accordion
                key={link.id || JSON.stringify(link)}
                id={link.id || JSON.stringify(link)}
                label={link.title}
                color={color}
                onLabelClick={(e) => {
                  onActiveClick(e);
                  link.onClick && link.onClick(e);
                }}
                onTriggerButtonLoad={(buttonElement) => {
                  console.log();
                  if (buttonElement.dataset.id === activeLink) {
                    activeTile.current = buttonElement;
                    onActiveClick();
                  }
                }}
                activeLabel={[link.id, JSON.stringify(link)].includes(
                  activeLink
                )}
                // defaultOpen={}
                onAccordionStatusChange={(event, status) => {
                  if (activeTile.current?.isEqualNode(event.currentTarget))
                    status === 'closed' && onActiveClick(event);
                }}
              >
                {linkButtonGenerator(link.childItems)}
              </Accordion>
            );
          } else
            return (
              <button
                key={link.id || JSON.stringify(link)}
                className={styles.menuTile}
                onClick={(e) => {
                  onActiveClick(e);
                  link.onClick && link.onClick(e);
                }}
              >
                {link.Icon && (
                  <link.Icon className={styles.menuTileIcon} outline />
                )}
                <Typography
                  className={styles.menuTileTitle}
                  color={RVColorProp.inherit}
                  type="H4"
                >
                  {link.title && (
                    <span className={styles.menuTileTitleContent}>
                      {link.title}
                    </span>
                  )}
                  {link.badge && (
                    <span className={styles.menuTileTitleBadge}>
                      {link.badge}
                    </span>
                  )}
                </Typography>
              </button>
            );
        });
      },
      [links]
    );

    return (
      <div
        ref={ref}
        className={clsx(
          styles.baseSidebarMain,
          color,
          !open && styles.sidebarClose,
          className
        )}
        onScroll={() => onActiveClick()}
        {...props}
      >
        <div className={styles.sidebarContainer} ref={containerRef}>
          <SidebarSubMenuIndicator ref={activeIndicatorRef} color={color} />
          <div className={styles.titleBlock}>
            {MenuIcon && <MenuIcon className={styles.titleIcon} outline />}
            <div>
              <Typography
                color={RVColorProp.inherit}
                type="caption"
                className={styles.titleTypography}
              >
                {menuTitle}
              </Typography>
              <Typography
                color={RVColorProp.inherit}
                type="H3"
                className={styles.titleTypography}
              >
                {menuSubTitle}
              </Typography>
            </div>
            {CloseTrigger && (
              <Button
                className={styles.triggerCollapse}
                variant={RVVariantProp.outline}
                color={RVColorProp.inherit}
                rounded="half"
                fullCircle
                onClick={() => {
                  CloseTrigger((prev) => {
                    console.log(prev);
                    return !prev;
                  });
                }}
              >
                <ChevronSvg direction={isRTL() === 'ltr' ? 'left' : 'right'} />
              </Button>
            )}
          </div>

          {links && linkButtonGenerator(links)}

          {children}
        </div>
      </div>
    );
  }
);

export default SidebarSubMenu;
