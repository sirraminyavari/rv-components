import React from 'react';
import type { IModalConfirm } from './ModalConfirm';
import DeleteConfirmMessage from './Messages/ModalDeleteConfirmMessage';
import ConfirmModal from './ModalConfirm';

export type IModalDeleteConfirm = IModalConfirm & {
  messageTitle?: string;
  messageIcon?: () => JSX.Element;
  messageQuestion?: string;
  messageWarning?: string;
};

/**
 *
 * @component
 * @description - Delete Confirm Modal component
 *
 * @param {object} props - DeleteConfirmModal component props
 * @param {string} [props.title=""] - Modal title text
 * @param {boolean} [props.show=false] - Modal show/hide state
 * @param {function():void} [props.onCancel] - Fires when modal cancel button is clicked
 * @param {function():void} [props.onClose] - Fires when modal close button is clicked
 * @param {function():void} [props.onConfirm] - Fires when modal confirm button is clicked
 * @param {string} [props.confirmText=""] - Modal confirm button text
 * @param {string} [props.cancelText=""] - Modal cancel button text
 * @param {string} [props.messageTitle=""] - Message title text
 * @param {JSX.Element} [props.messageIcon] - Message title icon component
 * @param {string} [props.messageQuestion=""] - Message question text
 * @param {string} [props.messageWarning=""] - Message warning text
 *
 * @return {JSX.Element} The delete confirmation modal component.
 */
function ModalConfirmDelete({
  title = '',
  show = false,
  onCancel = () => {},
  onClose = () => {},
  onConfirm = () => {},
  confirmText = '',
  cancelText = '',
  messageTitle = '',
  messageIcon,
  messageQuestion = '',
  messageWarning = '',
  ...props
}: IModalDeleteConfirm): JSX.Element {
  return (
    <ConfirmModal
      title={title}
      show={show}
      onCancel={onCancel}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText={confirmText}
      cancelText={cancelText}
      {...props}
    >
      <DeleteConfirmMessage
        title={messageTitle}
        Icon={messageIcon}
        question={messageQuestion}
        warning={messageWarning}
      />
    </ConfirmModal>
  );
}

export default ModalConfirmDelete;
