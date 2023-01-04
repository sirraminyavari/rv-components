import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithoutRef,
  useCallback,
  useRef,
} from 'react';
import { GridSvg, HomeSvg, PeopleSvg } from '../../../assets/svg';
import { colorProp } from '../../../types';
import { Typography } from '../../Typography';
import SidebarSubMenuIndicator from './SidebarIndicator';
import styles from './SidebarSubMenu.module.scss';

export interface ISidebarSubMenu
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >,
    'color'
  > {
  color?: colorProp;
}

const SidebarSubMenu = forwardRef<HTMLDivElement, ISidebarSubMenu>(
  ({ children, color = colorProp.grayLight, ...props }, ref) => {
    const activeIndicatorRef = useRef<HTMLDivElement>(null);
    const activeTile = useRef<HTMLButtonElement | null>(null);

    const onActiveClick: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        const tile = event.currentTarget;
        const tileBoundingRect = tile.getBoundingClientRect();
        console.log({ tileBoundingRect });
        if (!activeIndicatorRef.current) return;
        activeIndicatorRef.current.style.top = String(
          `${tileBoundingRect.top - 15}px`
        );
        activeIndicatorRef.current.style.height = `${tileBoundingRect.height}px`;
        if (activeTile.current)
          activeTile.current.classList.remove(styles.active);
        tile.classList.add(styles.active);
        activeTile.current = event.currentTarget;
      },
      [activeTile]
    );

    return (
      <div ref={ref} className={clsx(styles.baseSidebarMain, color)} {...props}>
        <SidebarSubMenuIndicator ref={activeIndicatorRef} color={color} />
        <div className={styles.titleBlock}>
          <PeopleSvg className={styles.titleIcon} outline />
          <div>
            <Typography
              color={colorProp.inherit}
              type="sub"
              className={styles.titleTypography}
            >
              Amir's workspace
            </Typography>
            <Typography
              color={colorProp.inherit}
              type="H3"
              className={styles.titleTypography}
            >
              Amir's workspace
            </Typography>
          </div>
        </div>
        <button className={styles.menuTile} onClick={onActiveClick}>
          <GridSvg className={styles.menuTileIcon} outline />
          <Typography color={colorProp.inherit} type="H4">
            Everything
          </Typography>
        </button>
        <button className={styles.menuTile} onClick={onActiveClick}>
          <PeopleSvg className={styles.menuTileIcon} outline />
          <Typography color={colorProp.inherit} type="H4">
            Everything
          </Typography>
        </button>
        <button className={styles.menuTile} onClick={onActiveClick}>
          <HomeSvg className={styles.menuTileIcon} outline />
          <Typography color={colorProp.inherit} type="H4">
            Everything
          </Typography>
        </button>
        {children}
      </div>
    );
  }
);

export default SidebarSubMenu;
