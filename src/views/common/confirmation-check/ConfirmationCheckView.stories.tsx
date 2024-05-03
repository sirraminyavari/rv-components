import React, { FunctionComponent, useState } from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ConfirmationCheckView as ConfirmationCheckViewComponent,
  RVConfirmationCheckView,
} from '.';
import { Button, Modal } from '../../../components';
import { RVSizeProp } from '../../../types';

export default {
  title: 'views/common/confirmation panel',
  component: ConfirmationCheckViewComponent,
  argTypes: {} as RVConfirmationCheckView,
  decorators: [
    (Story) => (
      <>
        <Story />
      </>
    ),
  ],
} as ComponentMeta<typeof ConfirmationCheckViewComponent>;
export const inlineConfirmation: FunctionComponent<RVConfirmationCheckView> = ({
  confirmationLabel = 'Do you accept the conditions described in the terms of use?',
  cancelLabel,
  ...args
}) => {
  return (
    <ConfirmationCheckViewComponent
      cancelLabel={cancelLabel}
      confirmationLabel={confirmationLabel}
      {...args}
      cancelCallback={() => {}}
      onConfirmCallback={() => {}}
    />
  );
};
export const modalConfirmation = ({
  confirmationLabel = 'Do you accept the conditions described in the terms of use?',
  ...args
}) => {
  const [modalStatus, setmodalStatus] = useState(false);
  return (
    <>
      <Button onClick={() => setmodalStatus(true)}>confirmation request</Button>
      <Modal
        isOpen={modalStatus}
        size={RVSizeProp.small}
        shouldCloseOnEsc
        onRequestClose={() => {
          setmodalStatus(false);
        }}
        style={{ content: { maxHeight: '80vh', overflow: 'unset' } }}
      >
        <ConfirmationCheckViewComponent
          confirmationLabel={confirmationLabel}
          {...args}
          cancelCallback={() => {
            setmodalStatus(false);
          }}
          onConfirmCallback={async () => {
            await new Promise((res) => setTimeout(res, 2000));
            setmodalStatus(false);
          }}
        />
      </Modal>
    </>
  );
};
