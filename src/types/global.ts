import type { SVGProps } from 'react';

export type RVVariantProp = 'primary' | 'white' | 'outline' | 'disabled';
export enum RVColorProp {
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

export enum RVDirectionProp {
  rtl = 'direction-rtl',
  ltr = 'direction-ltr',
}
export type RVSizeProp = 'large' | 'small';

export interface RVSvgProps extends SVGProps<SVGSVGElement> {
  size?: string;
  outline?: boolean;
}
