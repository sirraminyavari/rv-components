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

export const newServerPanel = ({ ...args }) => {
  const onSubmitCallback: RVServerManagementAdminNewServer['onSubmitCallback'] = async (
    newServer
  ) => {
    return 'created !';
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ServerManagementAdminNewServerComponent onSubmitCallback={onSubmitCallback} {...args} />
    </div>
  );
};
export const modifyServerPanel = ({ ...args }) => {
  const onSubmitCallback: RVServerManagementAdminNewServer['onSubmitCallback'] = async (server) => {
    console.log({ server });

    return 'modified !';
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ServerManagementAdminNewServerComponent
        onSubmitCallback={onSubmitCallback}
        initialData={{ database: '345', host: '4.2.2.1', port: '320' }}
        {...args}
      />
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
