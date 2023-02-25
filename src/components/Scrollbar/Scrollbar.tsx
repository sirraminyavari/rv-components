import {
  forwardRef,
  PropsWithoutRef,
  DetailedHTMLProps,
  HTMLAttributes,
  FunctionComponent,
} from 'react';
import PerfectScrollbar, { ScrollBarProps } from 'react-perfect-scrollbar';
// import 'react-perfect-scrollbar/dist/css/styles.css';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import './Scrollbar.scss';

export interface RVScrollbar
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >,
    'color' | 'size'
  > {
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  color?: RVColorProp;
  size?: RVSizeProp;
  label?: string;
  disabled?: boolean;
}

const Scrollbar = forwardRef<HTMLDivElement, RVScrollbar>(
  ({ children, className, ...restProps }, ref) => {
    const PSbar =
      PerfectScrollbar as unknown as FunctionComponent<ScrollBarProps>;
    return (
      <PSbar
        itemRef={ref as unknown as string}
        className="color-orange"
        {...restProps}
      >
        {children}
      </PSbar>
    );
  }
);

export default Scrollbar;
