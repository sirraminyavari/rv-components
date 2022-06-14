import { BiEditAlt } from 'react-icons/bi';
import type { SVGProps } from 'react';

export type IEditIcon = SVGProps<SVGSVGElement>;
function EditIcon(props: IEditIcon) {
  return <BiEditAlt {...props} />;
}

export default EditIcon;
