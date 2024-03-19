import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { avatar1 } from '../../../storybookComponents/useAvatarDemo/assets/images';

import {
  AuthenticationCheck as AuthenticationCheckComponent,
  RVAuthenticationCheck,
  AuthenticationCheckForm,
} from '.';
import { Button, Modal, ToastContainer } from '../../../components';
import { getRandomInt } from '../../../utils';
import { RVColorProp, RVSizeProp } from '../../../types';

export default {
  title: 'views/Authentication/AuthorizationCheck',
  component: AuthenticationCheckComponent,
  argTypes: {} as RVAuthenticationCheck,
  decorators: [
    (Story) => (
      <>
        <Story />
        <ToastContainer />
      </>
    ),
  ],
} as unknown as ComponentMeta<typeof AuthenticationCheckComponent>;

const authorizationCheckCallback: RVAuthenticationCheck['authorizationCheckCallback'] =
  async () => {
    return new Promise((res) =>
      setTimeout(() => {
        res(Boolean(getRandomInt(0, 2)));
      }, 1000)
    );
  };
const Template: ComponentStory<typeof AuthenticationCheckComponent> = ({
  children,
  authorizationRequired = true,
  ...args
}) => {
  return (
    <div style={{ height: '90dvh' }}>
      <AuthenticationCheckComponent
        authorizationRequired={authorizationRequired}
        {...args}
        authorizationCheckCallback={authorizationCheckCallback}
      >
        <div>PROTECTED CONTENT</div>
      </AuthenticationCheckComponent>
    </div>
  );
};

export const AuthorizationCheck = Template.bind({});
AuthorizationCheck.args = {
  authorizationRequired: true,
  userData: {
    FirstName: 'John',
    LastName: 'Wick',
    UserName: 'continental_Wick',
    AvatarImage: avatar1,
  },
};

export const fullscreen = Template.bind({});
fullscreen.args = {
  noFullscreen: true,
};

export const withCancelButton = Template.bind({});
withCancelButton.args = {
  authorizationRequired: true,
  cancelCallback: () => alert('cancel callback'),
};

export const withAvatar = Template.bind({});
withAvatar.args = {
  authorizationRequired: true,
  userData: {
    AvatarImage: avatar1,
  },
};

export const withUserName = Template.bind({});
withUserName.args = {
  authorizationRequired: true,
  userData: {
    FirstName: 'John',
    LastName: 'Wick',
    UserName: 'continental_Wick',
  },
};

export const ModalView: ComponentStory<typeof AuthenticationCheckComponent> = ({
  authorizationRequired,
  ...args
}) => {
  const [isAuthorized, setIsAuthorized] = useState(authorizationRequired);
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
        // style={{ content: { height: '70vh' } }}
      >
        <AuthenticationCheckForm
          authorizationRequired={isAuthorized}
          {...args}
          authorizationCheckCallback={authorizationCheckCallback}
          setIsAuthorizedCallback={(status) => {
            setIsAuthorized(!status);
            setModalStatus(false);
          }}
        />
      </Modal>
      {isAuthorized ? 're authentication required !' : <div>PROTECTED CONTENT</div>}
    </>
  );
};
