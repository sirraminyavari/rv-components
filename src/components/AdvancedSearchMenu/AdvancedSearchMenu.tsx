import clsx from 'clsx';
import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithoutRef } from 'react';
import { RVColorProp, RVVariantProp } from '../../types';
import styles from './AdvancedSearchMenu.module.scss';
import { Scrollbar } from '../Scrollbar';
import { Button } from '../Button';
import { CloseSvg, ReloadSvg } from '../../icons';
import { Typography } from '../Typography';

export interface RVAdvancedSearchMenu
extends Omit<
  PropsWithoutRef<
    DetailedHTMLProps<
      HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >,
  'color'
> {
variant?: RVVariantProp;
color?: RVColorProp;
}
const AdvancedSearchMenu = forwardRef<HTMLDivElement, RVAdvancedSearchMenu>(
  (
    {
      className,
      onChange,
      color = RVColorProp.distant,
      variant = RVVariantProp.outline,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div ref={ref} className={clsx(color, styles.advancedSearchMenuBoxContainer)} {...props}>
          <div className={styles.advancedSearchMenuBoxTitleContainer}>
            <Typography type="H3" className={styles.advancedSearchMenuBoxTitle}>Advanced filters</Typography>
            <button className={clsx(color,styles.advancedSearchMenuBoxCloseButton)}>
              <CloseSvg />
            </button>
          </div>
          <Scrollbar
            color={RVColorProp.distant}
            className={''}
          >
            asdasd
          </Scrollbar>
          <div className={styles.advancedSearchMenuBoxActionsContainer}>
            <Button
              color={RVColorProp.crayola}
              variant={RVVariantProp.white}
              fullCircle
            >
              <ReloadSvg />
            </Button>
            <Button color={RVColorProp.cgBlue} fullWidth>
              Filter items
            </Button>
          </div>
        </div>
      </>
    );
  }
);

export default AdvancedSearchMenu;
