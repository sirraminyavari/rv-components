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
import { ChevronSvg, PeopleCircleSvg } from '../../../icons';
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
  open?: boolean;
  CloseTrigger?: Dispatch<SetStateAction<boolean>>;
  links: {
    Icon?: FunctionComponent<RVSvgProps>;
    title?: string;
    badge?: string | number;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    onChange?: (event?: MouseEvent<HTMLButtonElement>) => void;
    input?: boolean;
    color?: RVColorProp;
    childItems?: {
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
      open = true,
      CloseTrigger,
      ...props
    },
    ref
  ) => {
    const activeIndicatorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const activeTile = useRef<HTMLButtonElement | HTMLSpanElement | null>(null);

    const onActiveClick = useCallback(
      (event: MouseEvent<HTMLButtonElement | HTMLSpanElement>) => {
        if (!activeIndicatorRef.current || !containerRef.current) return;
        const tile = event.currentTarget;
        const containerScrolledWidth = containerRef.current.scrollTop;

        const tileBoundingRect = tile.getBoundingClientRect();
        const tileDirection = isRTL(tile);
        activeIndicatorRef.current.style.top = String(
          `${tileBoundingRect.y + containerScrolledWidth}px`
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
      (links: RVSidebarSubMenu['links']) => {
        return links.map((link) => {
          if (link.input)
            return (
              <TextInput
                key={JSON.stringify(link)}
                label={link.title}
                color={link.color || color}
                Icon={link.Icon}
                IconPosition="leading"
                className={styles.menuInput}
              />
            );
          if (link.childItems && link.childItems.length)
            return (
              <Accordion
                key={JSON.stringify(link)}
                label={link.title}
                color={color}
                onLabelClick={(e) => {
                  onActiveClick(e);
                  link.onClick && link.onClick(e);
                }}
              >
                {linkButtonGenerator(link.childItems)}
              </Accordion>
            );
          else
            return (
              <button
                key={JSON.stringify(link)}
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
        {...props}
      >
        <div className={styles.sidebarContainer}>
          <SidebarSubMenuIndicator ref={activeIndicatorRef} color={color} />
          <div className={styles.titleBlock}>
            <PeopleCircleSvg className={styles.titleIcon} outline />
            <div ref={containerRef}>
              <Typography
                color={RVColorProp.inherit}
                type="sub"
                className={styles.titleTypography}
              >
                Amir's workspace
              </Typography>
              <Typography
                color={RVColorProp.inherit}
                type="H3"
                className={styles.titleTypography}
              >
                Researchers team
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
