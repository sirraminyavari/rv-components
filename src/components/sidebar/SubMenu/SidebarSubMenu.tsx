import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  PropsWithoutRef,
  useCallback,
  useRef,
} from 'react';
import { GridSvg, HomeSvg, PeopleSvg } from '../../../icons';
import { RVColorProp } from '../../../types';
import { isRTL } from '../../../utils/isRtl';
import { Accordion } from '../../Accordion';
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
  // links: {
  //   Icon?: FunctionComponent<RVSvgProps>;
  //   title?: string;
  //   onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  //   noIndicator?: boolean;
  // }[];
}

const SidebarSubMenu = forwardRef<HTMLDivElement, RVSidebarSubMenu>(
  ({ children, color = RVColorProp.grayLight, className, ...props }, ref) => {
    const activeIndicatorRef = useRef<HTMLDivElement>(null);
    const activeTile = useRef<HTMLButtonElement | HTMLSpanElement | null>(null);

    const onActiveClick = useCallback(
      (event: MouseEvent<HTMLButtonElement | HTMLSpanElement>) => {
        if (!activeIndicatorRef.current) return;
        const tile = event.currentTarget;

        const tileBoundingRect = tile.getBoundingClientRect();
        const tileDirection = isRTL(tile);
        activeIndicatorRef.current.style.top = String(
          `${tileBoundingRect.top}px`
        );
        activeIndicatorRef.current.style.height = `${tileBoundingRect.height}px`;
        const elementWidthOffset =
          tile.ariaLabel === 'accordion-trigger' ? -52 : 0;
        activeIndicatorRef.current.style.width = `${
          tileBoundingRect.width + elementWidthOffset
        }px`;
        if (tileDirection === 'rtl')
          activeIndicatorRef.current.style.left = `-0.5px`;
        else if (tileDirection === 'ltr')
          activeIndicatorRef.current.style.right = `-0.5px`;
        if (activeTile.current) activeTile.current.classList.remove('active');
        tile.classList.add('active');
        if (event) activeTile.current = event.currentTarget;
      },
      [activeTile]
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.baseSidebarMain, color, className)}
        {...props}
      >
        <SidebarSubMenuIndicator ref={activeIndicatorRef} color={color} />
        <div className={styles.titleBlock}>
          <PeopleSvg className={styles.titleIcon} outline />
          <div>
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
        </div>
        <button className={styles.menuTile} onClick={onActiveClick}>
          <GridSvg className={styles.menuTileIcon} outline />
          <Typography
            className={styles.menuTileTitle}
            color={RVColorProp.inherit}
            type="H4"
          >
            <span className={styles.menuTileTitleContent}>Everything</span>
            <span className={styles.menuTileTitleBadge}>1235</span>
          </Typography>
        </button>
        <button className={styles.menuTile} onClick={onActiveClick}>
          <PeopleSvg className={styles.menuTileIcon} outline />
          <Typography
            className={styles.menuTileTitle}
            color={RVColorProp.inherit}
            type="H4"
          >
            <span className={styles.menuTileTitleContent}>Bookmarked</span>
            <span className={styles.menuTileTitleBadge}>23</span>
          </Typography>
        </button>
        <button className={styles.menuTile} onClick={onActiveClick}>
          <HomeSvg className={styles.menuTileIcon} outline />
          <Typography
            className={styles.menuTileTitle}
            color={RVColorProp.inherit}
            type="H4"
          >
            <span className={styles.menuTileTitleContent}>Drafts</span>
            <span className={styles.menuTileTitleBadge}>23</span>
          </Typography>
        </button>
        <Accordion
          label="category 1"
          color={RVColorProp.inherit}
          onLabelClick={onActiveClick}
        >
          <button className={styles.menuTile} onClick={onActiveClick}>
            <PeopleSvg className={styles.menuTileIcon} outline />
            <Typography
              className={styles.menuTileTitle}
              color={RVColorProp.inherit}
              type="H4"
            >
              <span className={styles.menuTileTitleContent}>Drafts</span>
              <span className={styles.menuTileTitleBadge}>23</span>
            </Typography>
          </button>
          <button className={styles.menuTile} onClick={onActiveClick}>
            <PeopleSvg className={styles.menuTileIcon} outline />
            <Typography
              className={styles.menuTileTitle}
              color={RVColorProp.inherit}
              type="H4"
            >
              <span className={styles.menuTileTitleContent}>Everything</span>
              <span className={styles.menuTileTitleBadge}>1235</span>
            </Typography>
          </button>
        </Accordion>
        <Accordion
          label="category 1"
          color={RVColorProp.inherit}
          onLabelClick={onActiveClick}
        >
          <button className={styles.menuTile} onClick={onActiveClick}>
            <PeopleSvg className={styles.menuTileIcon} outline />
            <Typography
              className={styles.menuTileTitle}
              color={RVColorProp.inherit}
              type="H4"
            >
              <span className={styles.menuTileTitleContent}>Drafts</span>
              <span className={styles.menuTileTitleBadge}>23</span>
            </Typography>
          </button>
          <button className={styles.menuTile} onClick={onActiveClick}>
            <PeopleSvg className={styles.menuTileIcon} outline />
            <Typography
              className={styles.menuTileTitle}
              color={RVColorProp.inherit}
              type="H4"
            >
              <span className={styles.menuTileTitleContent}>Everything</span>
              <span className={styles.menuTileTitleBadge}>1235</span>
            </Typography>
          </button>
        </Accordion>
        {children}
      </div>
    );
  }
);

export default SidebarSubMenu;
