import clsx from 'clsx';
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  PropsWithoutRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { RVColorProp, RVSizeProp, RVSudoActionProp, RVVariantProp } from '../../types';
import styles from './Switch.module.scss';

export interface RVSwitch
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>,
    'color' | 'size'
  > {
  /** set between the various designs of the component (default:RVVariantProp.primary) */
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.medium) */
  size?: RVSizeProp;
  /** set the identifying label text for checkbox */
  label?: string;
  /** set to programmatically change the css actions (hover,focus) (default:undefined)*/
  sudoAction?: Exclude<RVSudoActionProp, RVSudoActionProp.active>;
}

const Switch = forwardRef<HTMLInputElement, RVSwitch>(
  (
    {
      className,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.primary,
      type = 'checkbox',
      size = RVSizeProp.small,
      disabled,
      label,
      checked,
      id = `${Date.now()}`,
      onChange,
      readOnly,
      sudoAction,
      ...props
    },
    ref
  ) => {
    const [isToggled, setIsToggled] = useState<boolean | undefined>(checked);

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        if (readOnly) return;
        setIsToggled(e.target.checked);
        if (onChange) onChange(e);
      },
      [isToggled, checked, readOnly]
    );
    useEffect(() => {
      setIsToggled(checked);
    }, [checked]);
    return (
      <>
        <label
          htmlFor={id}
          className={clsx(
            color,
            styles[size],
            styles[variant],
            disabled && styles.disabled,
            styles.label,
            !isToggled && styles.toggled,
            className
          )}
          data-sudo={sudoAction}
        >
          <input
            id={id}
            type="checkbox"
            ref={ref}
            className={styles.input}
            disabled={disabled}
            onChange={onChangeHandler}
            checked={isToggled}
            readOnly={readOnly}
            {...props}
          />
          <span className={styles.SwitchIndicator}></span>
          {label}
        </label>
      </>
    );
  }
);

export default Switch;
