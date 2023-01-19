import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithoutRef,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import AnimateHeight from 'react-animate-height';
import CaretSvg from '../../icons/caret.svg';
import { RVColorProp } from '../../types/global';
import styles from './Accordion.module.scss';

export interface RVAccordion
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >,
    'color'
  > {
  color?: RVColorProp;
  label?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onLabelClick?: MouseEventHandler<HTMLButtonElement>;
  labelClassName?: string;
}

const Accordion = forwardRef<HTMLDivElement, RVAccordion>(
  (
    {
      children,
      className,
      color = RVColorProp.gray,
      label,
      open,
      dir,
      defaultOpen = false,
      onLabelClick,
      labelClassName,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(open || defaultOpen);
    const triggerAccordion: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        setIsOpen((prevState) => (open !== undefined ? open : !prevState));
        if (onLabelClick) onLabelClick(event);
      },
      [open, onLabelClick]
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.accordionPanel, color)}
        data-open={isOpen}
        {...props}
      >
        <button
          className={clsx(styles.triggerButton, labelClassName)}
          onClick={triggerAccordion}
          aria-label="accordion-trigger"
        >
          <CaretSvg direction={'right'} />
          <span className={styles.triggerButtonLabel}> {label}</span>
        </button>
        <AnimateHeight
          duration={300}
          easing="ease"
          height={isOpen ? 'auto' : 0}
        >
          <div className={styles.content}>{children}</div>
        </AnimateHeight>
      </div>
    );
  }
);

export default Accordion;
