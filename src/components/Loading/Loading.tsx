import { DetailedHTMLProps, HTMLAttributes, PropsWithoutRef, forwardRef } from 'react';
import { RVColorProp } from '../../types';
import clsx from 'clsx';
import styles from './Loading.module.scss';

export interface RVLoading
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the component to act as an inline component (default:false) */
  inline?: boolean;
}

const Loading = forwardRef<HTMLDivElement, RVLoading>(
  ({ className, color = RVColorProp.cgBlue, inline, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(color, styles.loadingContainer, inline && styles.inline, className)}
        {...props}
      >
        <svg
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          id="svgCircularLoading"
          viewBox=" 0 0 150 150"
          className={styles.loadingSvg}
        >
          <circle
            r="70"
            cx="75"
            cy="75"
            strokeWidth="8"
            strokeDasharray="0 999"
            fill="transparent"
            strokeLinecap="round"
          />
          <circle
            r="55"
            cx="75"
            cy="75"
            strokeWidth="8"
            strokeDasharray="0 999"
            fill="transparent"
            strokeLinecap="round"
          />
          <circle
            r="40"
            cx="75"
            cy="75"
            strokeWidth="8"
            strokeDasharray="0 999"
            fill="transparent"
            strokeLinecap="round"
          />
          <circle
            r="25"
            cx="75"
            cy="75"
            strokeWidth="8"
            strokeDasharray="0 999"
            fill="transparent"
            strokeLinecap="round"
          />
          Sorry, your browser does not support inline SVG.
        </svg>
      </div>
    );
  }
);

export default Loading;
