import type { SVGProps } from 'react';

export enum RVVariantProp {
  primary = 'primary',
  white = 'white',
  outline = 'outline',
  disabled = 'disabled',
}

export enum RVSudoActionProp {
  hover = 'hover',
  active = 'active',
  focus = 'focus',
}
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
export enum RVSizeProp {
  large = 'large',
  medium = 'medium',
  small = 'small',
}

export interface RVSvgProps extends SVGProps<SVGSVGElement> {
  size?: string;
  outline?: boolean;
}
