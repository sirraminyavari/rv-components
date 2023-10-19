import clsx from 'clsx';
import {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  PropsWithoutRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import CopySvg from '../../icons/copy.svg';
import CheckedSvg from '../../icons/checked.svg';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import { Button } from '../Button';
import styles from './CopyToClipboard.module.scss';

export interface RVCopyToClipboard
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  /** set between the various designs of the component (default:RVVariantProp.white) */
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.medium) */
  size?: RVSizeProp;
  /** set to disable the trigger button  */
  disabled?: boolean;
  /** the string to be copied to the clipboard */
  clipboardContext?: string;
  /** callback to run after a successful trigger */
  onCopyToClipboard?: (
    ev: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> & { clipboardContext?: string }
  ) => void;
}

const CopyToClipboard: FunctionComponent<RVCopyToClipboard> = ({
  variant = RVVariantProp.white,
  color = RVColorProp.cgBlue,
  size = RVSizeProp.medium,
  children,
  className,
  clipboardContext = '',
  disabled,
  onCopyToClipboard,
  ...props
}) => {
  const [isCopyTriggered, setIsCopyTriggered] = useState<boolean>(false);
  const triggerIconTimeout = useRef<NodeJS.Timeout>();
  const copyToClipboard = useCallback(
    async (ev: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      if (disabled) return;
      try {
        console.log('init:', triggerIconTimeout.current);
        await navigator.clipboard.writeText(clipboardContext);
        if (onCopyToClipboard) onCopyToClipboard({ ...ev, clipboardContext });
        setIsCopyTriggered(true);
        if (triggerIconTimeout.current !== undefined) clearTimeout(triggerIconTimeout.current);
        triggerIconTimeout.current = setTimeout(() => {
          setIsCopyTriggered(false);
        }, 3000);
      } catch (error) {
        console.error('copy to clipboard failed!');
      }

      return () => {
        if (triggerIconTimeout.current) clearTimeout(triggerIconTimeout.current);
      };
    },
    [onCopyToClipboard, clipboardContext, disabled]
  );
  return (
    <div className={clsx(color, styles[size], styles.copyToClipboard, className)} {...props}>
      <span className={styles.label}>{children}</span>
      <span>
        <Button
          className={clsx(styles.copyButton)}
          onClick={copyToClipboard}
          color={color}
          variant={variant}
          size={RVSizeProp.small}
          disabled={disabled}
        >
          <span className={styles.copyButtonLabel}>copy to clipboard</span>
          <CopySvg className={clsx(!isCopyTriggered && styles.activeButtonIcon)} />
          <CheckedSvg className={clsx(isCopyTriggered && styles.activeButtonIcon)} />
        </Button>
      </span>
    </div>
  );
};

export default CopyToClipboard;
