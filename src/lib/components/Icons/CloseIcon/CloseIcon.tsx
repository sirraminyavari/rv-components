import type { SVGProps } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';

export type ICloseIcon = SVGProps<SVGSVGElement> & {
  size?: number;
  outline?: boolean;
};
function CloseIcon({ outline = false, ...props }: ICloseIcon) {
  return outline ? <IoCloseOutline {...props} /> : <FaTimes {...props} />;
}

export default CloseIcon;
