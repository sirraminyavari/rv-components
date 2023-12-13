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
  /** set the copy icon component to be outlined or solid (default:false) */
  copyIconOutline?: boolean;
  /** set the copy icon animation duration in milliseconds (default:1000) */
  iconAnimationTimeout?: number;
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
  copyIconOutline,
  iconAnimationTimeout = 1000,
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
        }, iconAnimationTimeout);
      } catch (error) {
        console.error('copy to clipboard failed!');
      }

      return () => {
        if (triggerIconTimeout.current) clearTimeout(triggerIconTimeout.current);
      };
    },
    [onCopyToClipboard, clipboardContext, disabled, iconAnimationTimeout]
  );
  return (
    <div className={clsx(color, styles[size], styles.copyToClipboard, className)} {...props}>
      <div className={styles.label}>{children}</div>
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
          <CopySvg
            outline={copyIconOutline}
            className={clsx(!isCopyTriggered && styles.activeButtonIcon)}
          />
          <CheckedSvg
            outline={copyIconOutline}
            className={clsx(isCopyTriggered && styles.activeButtonIcon)}
          />
        </Button>
      </span>
    </div>
  );
};

export default CopyToClipboard;
