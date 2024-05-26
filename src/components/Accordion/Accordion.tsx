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
import { Typography } from '../Typography';

export interface RVAccordion
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  /**  */
  id?: string;
  /** set the component color palette (default:RVColorProp.gray) */
  color?: RVColorProp;
  /** set the label component color palette (default:RVColorProp.inherit) */
  labelColor?: RVColorProp;
  /** set the Accordion toggle button label (accepts JSX/text) */
  mutedLabel?: boolean;
  /** set the Accordion label to be muted (default:False) */
  label?: ReactNode;
  /** forces the Accordion toggle to be always open or closed */
  open?: boolean;
  /** the state of Accordion component at initial render */
  defaultOpen?: boolean;
  /** the state of Accordion's label button */
  activeLabel?: boolean;
  /** when the Accordion component and it's label button rendered, passed function will be called */
  onTriggerButtonLoad?: (element: HTMLButtonElement) => void;
  /** when the Accordion label button clicked, passed function will be called */
  onLabelClick?: MouseEventHandler<HTMLButtonElement | HTMLHeadingElement>;
  /** when the Accordion toggle state changes, passed function will be called */
  onAccordionStatusChange?: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    status: 'open' | 'closed'
  ) => void;
  /** the Accordion label button classes */
  labelClassName?: string;
  /** the Accordion content container classes */
  contentClassName?: string;
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
      contentClassName,
      activeLabel,
      mutedLabel,
      labelColor = RVColorProp.inherit,
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
      <div
        ref={ref}
        className={clsx(styles.accordionPanel, color, className)}
        data-open={isOpen}
        {...props}
      >
        <button
          ref={accordionTriggerButtonRef}
          className={clsx(styles.triggerButton, labelClassName)}
          onClick={triggerAccordion}
          aria-label="accordion-trigger"
          data-id={id}
        >
          <CaretSvg direction={'right'} />
          <Typography
            type="span"
            muted={mutedLabel}
            color={labelColor}
            className={clsx(
              styles.triggerButtonLabel,
              activeLabel && styles.triggerButtonLabelActive
            )}
            onClick={onLabelClick}
          >
            {label}
          </Typography>
        </button>
        <AnimateHeight duration={300} easing="ease" height={isOpen ? 'auto' : 0}>
          <div className={clsx(styles.content, contentClassName)}>{children}</div>
        </AnimateHeight>
      </div>
    );
  }
);

export default Accordion;
