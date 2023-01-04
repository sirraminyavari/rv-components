import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  PropsWithoutRef,
} from 'react';
import { colorProp, ISvgProps } from '../../../types';
import styles from './SidebarSubMenu.module.scss';

export interface ISidebarSubMenuIndicator
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >,
    'color'
  > {
  color?: colorProp;
}

const SidebarSubMenuIndicator = forwardRef<
  HTMLDivElement,
  ISidebarSubMenuIndicator
>(({ className, color, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(styles.menuActiveIndicator, color, className)}
      {...props}
    >
      <SidebarSubMenuIndicatorCurvedCornerSvg className={clsx(styles.svgCurved,styles.start)} />
      <SidebarSubMenuIndicatorCurvedCornerSvg className={clsx(styles.svgCurved,styles.end)} />
    </div>
  );
});

export default SidebarSubMenuIndicator;

const SidebarSubMenuIndicatorCurvedCornerSvg = (
  props: Omit<ISvgProps, 'outline'>
) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.0078125 16H15.9999V0.00793457C15.9956 8.83823 8.83811 15.9958 0.0078125 16Z"
      />
    </svg>
  );
};
