import { BiCheck } from 'react-icons/bi';
import React from 'react';
import type { SVGProps } from 'react';

export type ICheckIcon = SVGProps<SVGSVGElement> & {
  size?: number;
};

function CheckIcon(props: ICheckIcon) {
  return <BiCheck {...props} />;
}

export default CheckIcon;
