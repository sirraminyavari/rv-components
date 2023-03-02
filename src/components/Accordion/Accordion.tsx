import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  MouseEvent,
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
  onAccordionStatusChange?: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    status: 'open' | 'closed'
  ) => void;
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
      onAccordionStatusChange,
      labelClassName,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(open || defaultOpen);
    const triggerAccordion: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        setIsOpen((prevState) => {
          onAccordionStatusChange &&
            onAccordionStatusChange(event, prevState ? 'closed' : 'open');
          return open !== undefined ? open : !prevState;
        });
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
          <span className={styles.triggerButtonLabel} onClick={onLabelClick}>
            {' '}
            {label}
          </span>
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
