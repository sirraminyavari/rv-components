/**
 * Renders a confirm modal.
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import type { IModal } from './Modal';
import Modal from './Modal';
import Button from '../Button/Button';
import * as GlobalUtilities from '../../utilities/global';
import { useThemeContext } from '../../contexts/themeContext';

export type IModalConfirm = IModal & {
  show?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

function ModalConfirm({
  onConfirm,
  onCancel,
  onClose,
  confirmText,
  cancelText,
  show,
  title,
  children,
  ...props
}: IModalConfirm) {
  const [showState, setShowState] = useState(show !== false);
  const { RVDic } = useThemeContext();

  //! Fires when user confirm the message.
  const handleOnConfirm = () => {
    if (onConfirm && GlobalUtilities.get_type(onConfirm) === 'function')
      onConfirm();
    setShowState(false);
  };

  //! Fires when user change its mind and do not confirm the message.
  const handleOnCancel = () => {
    if (onCancel && GlobalUtilities.get_type(onConfirm) === 'function')
      onCancel();
    setShowState(false);
  };

  //! Fires when user close the confirm modal with red cross icon.
  const handleOnClose = () => {
    if (onClose && GlobalUtilities.get_type(onConfirm) === 'function')
      onClose();
  };

  return (
    <Modal
      title={title}
      contentClass="small-8 medium-6 large-4"
      middle
      titleClass="RedColor"
      show={showState}
      onClose={handleOnClose}
      {...props}
    >
      <Message>{children}</Message>
      <ButtonsContainer>
        <Button
          type="negative"
          style={{
            flex: '0 0 auto',
            width: '6rem',
            marginInlineEnd: '1rem',
          }}
          onClick={handleOnConfirm}
        >
          {confirmText ?? RVDic.Confirm}
        </Button>
        <Button
          type="primary-o"
          style={{
            flex: '0 0 auto',
            width: '6rem',
          }}
          onClick={handleOnCancel}
        >
          {cancelText ?? RVDic.Cancel}
        </Button>
      </ButtonsContainer>
    </Modal>
  );
}

export default ModalConfirm;

const Message = styled.div`
  text-align: center;
  color: rgb(80, 80, 80);
  padding: 1.5rem 0 2rem 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;
