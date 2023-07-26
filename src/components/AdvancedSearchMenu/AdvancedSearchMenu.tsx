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
import { RVColorProp, RVSvgProps, RVVariantProp } from '../../types';
import { Scrollbar } from '../Scrollbar';
import { Button } from '../Button';
import {
  CheckboxSvg,
  CheckedCircleSvg,
  ChevronCircleSvg,
  CloseSvg,
  PenSvg,
  RadioButtonSvg,
  ReloadSvg,
} from '../../icons';
import { Typography } from '../Typography';
import { Accordion } from '../Accordion';
import styles from './AdvancedSearchMenu.module.scss';
import { TextInput } from '../TextInput';

export interface RVAdvancedSearchMenu
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
const AdvancedSearchMenu = forwardRef<HTMLDivElement, RVAdvancedSearchMenu>(
  (
    {
      className,
      onChange,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.outline,
      onReset,
      onClose,
      onFilterSubmit,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div ref={ref} className={clsx(color, styles.advancedSearchMenuBoxContainer)} {...props}>
          <div className={styles.advancedSearchMenuBoxTitleContainer}>
            <Typography type="H3" className={styles.advancedSearchMenuBoxTitle}>
              Advanced filters
            </Typography>
            <button
              className={clsx(color, styles.advancedSearchMenuBoxCloseButton)}
              onClick={onClose}
            >
              <CloseSvg />
            </button>
          </div>
          <Scrollbar color={RVColorProp.distant} className={styles.advancedSearchMenuItemContainer}>
            <SingleSearchItemMenu Icon={PenSvg} label="Short text field" isActive>
              <TextInput
                label="search query ...."
                variant={RVVariantProp.outline}
                color={RVColorProp.distant}
              />
              <TextInput
                label="search query ...."
                variant={RVVariantProp.outline}
                color={RVColorProp.distant}
              />
              <TextInput
                label="search query ...."
                variant={RVVariantProp.outline}
                color={RVColorProp.distant}
              />
            </SingleSearchItemMenu>
            <SingleSearchItemMenu Icon={RadioButtonSvg} label="Single choice field" />
            <SingleSearchItemMenu Icon={CheckboxSvg} label="Multiple choice field" isActive />
            <SingleSearchItemMenu Icon={RadioButtonSvg} label="single choice field" />
          </Scrollbar>
          <div className={styles.advancedSearchMenuBoxActionsContainer}>
            <Button
              color={RVColorProp.crayola}
              variant={RVVariantProp.white}
              fullCircle
              onClick={onReset}
            >
              <ReloadSvg />
            </Button>
            <Button color={color} fullWidth onClick={onFilterSubmit}>
              Filter items
            </Button>
          </div>
        </div>
      </>
    );
  }
);

export default AdvancedSearchMenu;

export interface RVAdvancedSearchMenuItem {
  label: string;
  Icon?: FunctionComponent<RVSvgProps>;
  isActive?: boolean;
}

const SingleSearchItemMenu = ({
  children,
  label,
  Icon,
  isActive,
}: PropsWithChildren<RVAdvancedSearchMenuItem>) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <Accordion
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
};
