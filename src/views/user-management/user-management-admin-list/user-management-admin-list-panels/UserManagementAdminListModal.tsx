import { FunctionComponent } from 'react';
import { Modal } from '../../../../components';
import { RVSizeProp } from '../../../../types';

export interface RVUserManagementAdminListModal {
  closeCallback: () => void;
  modalStatus: boolean;
}

const UserManagementAdminListModal: FunctionComponent<RVUserManagementAdminListModal> = ({
  children,
  closeCallback,
  modalStatus,
}) => {
  return (
    <>
      <Modal
        isOpen={modalStatus}
        size={RVSizeProp.small}
        shouldCloseOnEsc
        onRequestClose={closeCallback}
        style={{ content: { maxHeight: '80vh', overflow: 'unset' } }}
      >
        {children as JSX.Element}
      </Modal>
    </>
  );
};

export default UserManagementAdminListModal;
