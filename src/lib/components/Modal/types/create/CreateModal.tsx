import * as Styled from '../ModalTypes.styles';
import Modal, { IModal } from '../../Modal';
import { Button } from '../../../Button';
import { TC_DEFAULT, C_GRAY } from '../../../../constant/Colors';
import AnimatedInput from '../../../Inputs/AnimatedInput';
import { useThemeContext } from '../../../../contexts/themeContext';

export type ICreateModal = {
  isOpen: IModal['show'];
  onCancelCreate: () => void;
  onInputChange: () => void;
  inputValue: string;
  onCreate: () => void;
  modalTitle: IModal['title'];
  modalWidth?: string;
  placeholder?: string;
};

function CreateModal({
  isOpen,
  onCancelCreate,
  onInputChange,
  inputValue,
  onCreate,
  modalTitle,
  modalWidth,
  placeholder,
}: ICreateModal) {
  const { RVDic } = useThemeContext();

  return (
    <Styled.ModalContainer>
      <Modal
        titleClass={TC_DEFAULT}
        contentWidth={modalWidth}
        contentClass="create-modal-container"
        titleContainerClass="create-modal-header"
        title={modalTitle}
        show={isOpen}
        onClose={onCancelCreate}
      >
        <Styled.ModalContentWrapper>
          <AnimatedInput
            value={inputValue}
            placeholderClass={C_GRAY}
            onChange={onInputChange}
            placeholder={placeholder}
            style={{ width: '100%', margin: '2rem 0' }}
          />
          <Styled.ModalButtonsWrapper>
            <Button
              style={{ width: '7rem', margin: '0 2rem' }}
              disable={!inputValue}
              onClick={onCreate}
            >
              <Styled.ModalButtonText>{RVDic.Save}</Styled.ModalButtonText>
            </Button>
            <Button
              type="negative-o"
              style={{ width: '7rem', margin: '0 2rem' }}
              onClick={onCancelCreate}
            >
              <Styled.ModalButtonText>{RVDic.Return}</Styled.ModalButtonText>
            </Button>
          </Styled.ModalButtonsWrapper>
        </Styled.ModalContentWrapper>
      </Modal>
    </Styled.ModalContainer>
  );
}

export default CreateModal;
