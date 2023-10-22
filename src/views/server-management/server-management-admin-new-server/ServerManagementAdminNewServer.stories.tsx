import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  ServerManagementAdminNewServer as ServerManagementAdminNewServerComponent,
  RVServerManagementAdminNewServer,
} from '.';
import { Button, Modal } from '../../../components';
import { RVColorProp, RVSizeProp } from '../../../types';

export default {
  title: 'views/Server Management/Admin/NewServer',
  component: ServerManagementAdminNewServerComponent,
  argTypes: {} as RVServerManagementAdminNewServer,
} as ComponentMeta<typeof ServerManagementAdminNewServerComponent>;

export const panel = ({ ...args }) => {
  const onSubmitCallback: RVServerManagementAdminNewServer['onSubmitCallback'] = async (
    newServer
  ) => {
    console.log(newServer);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ServerManagementAdminNewServerComponent onSubmitCallback={onSubmitCallback} {...args} />
    </div>
  );
};

export const ModalView: ComponentStory<typeof ServerManagementAdminNewServerComponent> = ({
  modalView = true,
  ...args
}) => {
  const [modalStatus, setModalStatus] = useState(false);
  return (
    <>
      <Button onClick={() => setModalStatus((prev) => !prev)}>open menu</Button>

      <Modal
        isOpen={modalStatus}
        size={RVSizeProp.medium}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        color={RVColorProp.gray}
        onRequestClose={() => setModalStatus(false)}
        style={{ content: { height: '70vh' } }}
      >
        <ServerManagementAdminNewServerComponent modalView={modalView} {...args} />
      </Modal>
    </>
  );
};
