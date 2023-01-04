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
import { CMLogoSvg, HomeSvg } from '../../../assets/svg';
import { colorProp } from '../../../types';
import styles from './SidebarMain.module.scss';

export interface ISidebarMain
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >,
    'color'
  > {
  color?: colorProp;
}

const SidebarMain = forwardRef<HTMLDivElement, ISidebarMain>(
  ({ children, color = colorProp.oxford, ...props }, ref) => {
    const activeIndicatorRef = useRef<HTMLDivElement>(null);
    const activeTile = useRef<HTMLButtonElement | null>(null);

    const onActiveClick: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        const tile = event.currentTarget;
        const tileBoundingRect = tile.getBoundingClientRect();
        console.log({ tileBoundingRect });
        if (!activeIndicatorRef.current) return;
        activeIndicatorRef.current.style.top = String(
          `${tileBoundingRect.top - 7.5}px`
        );
        activeIndicatorRef.current.style.height = `${
          tileBoundingRect.height - 15
        }px`;
        if (activeTile.current)
          activeTile.current.classList.remove(styles.active);
        tile.classList.add(styles.active);
        activeTile.current = event.currentTarget;
      },
      [activeTile]
    );

    return (
      <div ref={ref} className={clsx(styles.baseSidebarMain, color)} {...props}>
        <div
          ref={activeIndicatorRef}
          className={clsx(styles.menuActiveIndicator, colorProp.crayola)}
        />
        <button className={clsx(styles.menuTile, styles.cmLogo)}>
          <CMLogoSvg className={clsx(styles.menuTileIcon)} />
        </button>
        <button className={styles.menuTile} onClick={onActiveClick}>
          <HomeSvg className={styles.menuTileIcon} outline />
        </button>
        <button className={styles.menuTile} onClick={onActiveClick}>
          <HomeSvg className={styles.menuTileIcon} />
        </button>
        <button className={styles.menuTile} onClick={onActiveClick}>
          <HomeSvg className={styles.menuTileIcon} />
        </button>
        {children}
      </div>
    );
  }
);

export default SidebarMain;
