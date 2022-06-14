import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import * as Styled from './CustomTable.styles';
import CheckIcon from '../Icons/CheckIcons/Check';
import CloseIcon from '../Icons/CloseIcon/CloseIcon';
import { CV_RED, TCV_WARM } from '../../constant/CssVariables';

export type IEditMenuButtons = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'ref'
> & {
  onAccept?: () => void;
  onCancel?: () => void;
  containerClass?: string;
  iconSize?: number;
};

/**
 * @typedef PropType
 * @type {Object}
 * @property {Function} onAccept - A callback function that fires on accept icon click.
 * @property {Function} onCancel - A callback function that fires on cancel icon click.
 * @property {String} containerClass - The classes for container.
 * @property {Number} iconSize - The size of the icons.
 */

/**
 *  @description Renders an edit menu component.
 * @component
 * @param {PropType} props -Props that pass to edit menu.
 */
function EditMenuButtons({
  onAccept,
  onCancel,
  containerClass,
  iconSize = 30,
  ...rest
}: IEditMenuButtons) {
  return (
    <Styled.EditActionContainer className={containerClass} {...rest}>
      <div>
        <CheckIcon
          className="table-edit-check-icon"
          size={iconSize}
          color={TCV_WARM}
          onClick={onAccept}
        />
        <CloseIcon
          className="table-edit-cancel-icon"
          size={iconSize}
          color={CV_RED}
          onClick={onCancel}
        />
      </div>
    </Styled.EditActionContainer>
  );
}

export default EditMenuButtons;
