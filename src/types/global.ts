import type { SVGProps } from 'react';

export type variantProp = 'primary' | 'white' | 'outline' | 'disabled';
export enum colorProp {
  cgBlue = 'color-cgBlue',
  oxford = 'color-oxford',
  orange = 'color-orange',
  grayDark = 'color-grayDark',
  gray = 'color-gray',
  grayLight = 'color-grayLight',
  distant = 'color-distant',
  crayola = 'color-crayola',
  platinum = 'color-platinum',
  inherit = 'color-inherit',
}
export type sizeProp = 'large' | 'small';

export interface ISvgProps extends SVGProps<SVGSVGElement> {
  size?: string;
  outline?: boolean;
}
