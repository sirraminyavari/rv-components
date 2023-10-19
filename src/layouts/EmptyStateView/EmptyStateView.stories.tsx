import { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useState } from 'react';
import { EmptyStateView, RVEmptyStateView } from '.';
import { Modal } from '../../components/Modal';
import { RVSizeProp } from '../../types';
import { Button } from '../../components/Button';
import { CMLogoSvg } from '../../icons';

export default {
  title: 'Layout/TemplateSelection',
  component: EmptyStateView,
  argTypes: {} as RVEmptyStateView,
} as ComponentMeta<typeof EmptyStateView>;

export const ShowCase: ComponentStory<typeof EmptyStateView> = ({
  IconComponent = CMLogoSvg,
  children,
  color,
  description = "the content you'r locking for, is currently unavailable.",
  title = 'Someone stepped on a wire some where !',
}) => {
  return (
    <div style={{ height: '90vh' }}>
      <EmptyStateView
        IconComponent={IconComponent}
        color={color}
        description={description}
        title={title}
      >
        {children}
      </EmptyStateView>
    </div>
  );
};
export const ModalView: ComponentStory<typeof EmptyStateView> = ({
  IconComponent = CMLogoSvg,
  children,
  color,
  description = "the content you'r locking for, is currently unavailable.",
  title = 'Someone stepped on a wire some where !',
}) => {
  const [modalStatus, setModalStatus] = useState(false);
  return (
    <>
      <Button onClick={() => setModalStatus((prev) => !prev)}>open menu</Button>

      <Modal
        isOpen={modalStatus}
        size={RVSizeProp.large}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        color={color}
        onRequestClose={() => setModalStatus(false)}
      >
        <div style={{ height: '60vh' }}>
          <EmptyStateView
            IconComponent={IconComponent}
            color={color}
            description={description}
            title={title}
          >
            {children}

            <Button
              style={{ maxWidth: '24rem', marginInline: 'auto' }}
              onClick={() => setModalStatus((prev) => !prev)}
              fullWidth
            >
              Go back
            </Button>
          </EmptyStateView>
        </div>
      </Modal>
    </>
  );
};
