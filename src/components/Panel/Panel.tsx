import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes, PropsWithoutRef } from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types/global';
import styles from './Panel.module.scss';
import { Button } from '../Button';
import CloseSvg from '../../icons/close.svg';
import { Typography } from '../Typography';

export interface RVPanel
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  /** set between the various designs of the component (default:RVVariantProp.primary)*/
  variant?: RVVariantProp;
  /** set the component color palette (default:RVColorProp.cgBlue)*/
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.large)*/
  size?: RVSizeProp;
  /** set the title of the panel */
  title?: string;
  /** callback to run when panel's close button gets clicked */
  onClose?: () => void;
}

const Panel = ({
  children,
  className,
  color = RVColorProp.cgBlue,
  variant = RVVariantProp.primary,
  size = RVSizeProp.large,
  title = '',
  onClose,
  ...props
}: RVPanel) => {
  return (
    <div
      className={clsx(
        styles.panelContainer,
        color,
        styles[RVSizeProp[size]],

        className
      )}
      {...props}
    >
      <div className={clsx(RVColorProp.grayLight, styles.panelHeadContainer)}>
        <span />
        <Typography type="H3" color={RVColorProp.cgBlue} className={styles.panelHeadTitle}>
          {title}
        </Typography>
        <Button
          fullCircle
          color={RVColorProp.crayola}
          size={RVSizeProp.small}
          variant={RVVariantProp.white}
          rounded="half"
          onClick={() => onClose && onClose()}
        >
          <CloseSvg className={styles.closeIcon} />
        </Button>
      </div>
      <div className={styles.panelContentContainer}>{children}</div>
    </div>
  );
};

export default Panel;
