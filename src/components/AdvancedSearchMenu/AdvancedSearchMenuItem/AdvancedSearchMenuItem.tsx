import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  PropsWithChildren,
  PropsWithoutRef,
  useState,
} from 'react';
import { RVColorProp, RVSvgProps, RVVariantProp } from '../../../types';
import { CheckedCircleSvg, ChevronCircleSvg } from '../../../icons';
import { Typography } from '../../Typography';
import { Accordion } from '../../Accordion';
import styles from './AdvancedSearchMenuItem.module.scss';

export interface RVAdvancedSearchMenuItem
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  variant?: RVVariantProp;
  color?: RVColorProp;
  onReset?: () => void;
  onClose?: () => void;
  onFilterSubmit?: () => void;
}

export interface RVAdvancedSearchMenuItem {
  label: string;
  Icon?: FunctionComponent<RVSvgProps>;
  isActive?: boolean;
}

const AdvancedSearchMenuItem = forwardRef<
  HTMLDivElement,
  PropsWithChildren<RVAdvancedSearchMenuItem>
>(({ children, label, Icon, isActive }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <Accordion
        ref={ref}
        color={RVColorProp.cgBlue}
        className={clsx(
          styles.advancedSearchMenuItem,
          isMenuOpen && styles.advancedSearchMenuItemOpen
        )}
        onAccordionStatusChange={(_, status) => {
          setIsMenuOpen(status === 'closed' ? false : true);
        }}
        label={
          <div className={clsx(!isActive && RVColorProp.gray, styles.advancedSearchMenuItemLabel)}>
            <Typography
              type={isActive ? 'H4' : 'p'}
              color={isActive ? RVColorProp.cgBlue : RVColorProp.gray}
              className={styles.advancedSearchMenuItemLabelTitle}
            >
              {Icon && <Icon />}
              {label}
            </Typography>
            <span className={styles.advancedSearchMenuItemLabelIndicators}>
              {isActive && (
                <CheckedCircleSvg
                  className={clsx(RVColorProp.orange, styles.advancedSearchMenuItemLabelActiveIcon)}
                />
              )}
              <ChevronCircleSvg
                className={clsx(
                  !isMenuOpen && RVColorProp.gray,
                  styles.advancedSearchMenuItemLabelChevron
                )}
                direction={'down'}
              />
            </span>
          </div>
        }
        labelClassName={styles.advancedSearchMenuItemLabelButton}
        contentClassName={styles.advancedSearchMenuItemContent}
      >
        {children}
      </Accordion>
    </>
  );
});

export default AdvancedSearchMenuItem;
