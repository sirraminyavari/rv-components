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
  useEffect,
  useRef,
  useState,
} from 'react';
import AnimateHeight from 'react-animate-height';
import CaretSvg from '../../icons/caret.svg';
import { RVColorProp } from '../../types/global';
import styles from './Accordion.module.scss';

export interface RVAccordion
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  id?: string;
  color?: RVColorProp;
  label?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  activeLabel?: boolean;
  onTriggerButtonLoad?: (element: HTMLButtonElement) => void;
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
      id,
      children,
      className,
      color = RVColorProp.gray,
      label,
      open,
      dir,
      defaultOpen = false,
      onLabelClick,
      onTriggerButtonLoad,
      onAccordionStatusChange,
      labelClassName,
      activeLabel,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(open || defaultOpen);
    const accordionTriggerButtonRef = useRef<HTMLButtonElement>(null);
    const triggerAccordion: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        setIsOpen((prevState) => {
          onAccordionStatusChange && onAccordionStatusChange(event, prevState ? 'closed' : 'open');
          return open !== undefined ? open : !prevState;
        });
      },
      [open, onAccordionStatusChange]
    );
    useEffect(() => {
      if (!onTriggerButtonLoad || !accordionTriggerButtonRef.current) return;
      onTriggerButtonLoad(accordionTriggerButtonRef.current);
    }, [onTriggerButtonLoad, accordionTriggerButtonRef]);

    return (
      <div ref={ref} className={clsx(styles.accordionPanel, color)} data-open={isOpen} {...props}>
        <button
          ref={accordionTriggerButtonRef}
          className={clsx(styles.triggerButton, labelClassName)}
          onClick={triggerAccordion}
          aria-label="accordion-trigger"
          data-id={id}
        >
          <CaretSvg direction={'right'} />
          <span
            className={clsx(
              styles.triggerButtonLabel,
              activeLabel && styles.triggerButtonLabelActive
            )}
            onClick={onLabelClick}
          >
            {' '}
            {label}
          </span>
        </button>
        <AnimateHeight duration={300} easing="ease" height={isOpen ? 'auto' : 0}>
          <div className={styles.content}>{children}</div>
        </AnimateHeight>
      </div>
    );
  }
);

export default Accordion;
