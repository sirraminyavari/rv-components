import EditIcon from '../Icons/EditIcons/Edit';
import { TCV_DEFAULT } from '../../constant/CssVariables';
import * as Styled from './CustomTable.styles';
import EditMenuButtons from './EditMenuButtons';

export type ICellEdit = {
  setSelectedCell: any;
  cell: any;
  selectedCell: any;
  onEditStart: any;
  onEditCancel: any;
  onEdit: any;
};

function CellEdit({
  setSelectedCell,
  cell,
  selectedCell,
  onEditStart,
  onEditCancel,
  onEdit,
}: ICellEdit) {
  const rowId = cell?.row?.original?.id;
  const columnId = cell?.column?.id;
  const [_type, id] = columnId.split('_');

  const isEditMode =
    rowId === selectedCell?.row?.original?.id &&
    columnId === selectedCell?.column?.id;

  const handleStartEditCell = () => {
    if (setSelectedCell) setSelectedCell(cell);
    if (onEditStart) onEditStart();
  };

  const handleAcceptChange = () => {
    if (setSelectedCell) setSelectedCell(null);
    if (onEdit) onEdit(rowId, id);
  };

  const handleCancelChange = () => {
    if (setSelectedCell) setSelectedCell(null);
    if (onEditCancel) onEditCancel();
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isEditMode ? (
        <Styled.EditButtonsWrapper>
          <EditMenuButtons
            onAccept={handleAcceptChange}
            onCancel={handleCancelChange}
            containerClass="table-edit-buttons-container"
            iconSize={25}
          />
        </Styled.EditButtonsWrapper>
      ) : (
        <Styled.EditIconWrapper
          isShown={cell?.column?.editable}
          onClick={handleStartEditCell}
          data-edit-icon-wrapper=""
        >
          <EditIcon size={18} color={TCV_DEFAULT} />
        </Styled.EditIconWrapper>
      )}
    </>
  );
}

export default CellEdit;
