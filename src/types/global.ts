import type { SVGProps } from 'react';

export type variantProp = 'primary' | 'white' | 'outline' | 'disabled';
export type colorProp =
  | 'red'
  | 'default'
  | 'distant'
  | 'gray'
  | 'grayDark'
  | 'veryWarm'
  | 'warm';
export type sizeProp = 'large' | 'small';

export interface ISvgProps extends SVGProps<SVGSVGElement> {
  size?: string;
  outline?: boolean;
}
