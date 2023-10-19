import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Panel as PanelComponent, RVPanel } from '.';
import { RVSizeProp } from '../../types';
import { Modal } from '../Modal';
import { Button } from '../Button';

export default {
  title: 'Components/Panel',
  component: PanelComponent,
  argTypes: {
    children: { control: 'text' },
  } as RVPanel,
} as ComponentMeta<typeof PanelComponent>;

const demoContent = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde qui non perferendis repudiandae illo at vel itaque voluptates id omnis, dignissimos assumenda iure cupiditate tempora nostrum cumque in vitae ipsam!`;

const Template: ComponentStory<typeof PanelComponent> = ({
  children = demoContent,
  color,
  variant,
  ...args
}) => {
  return (
    <>
      <PanelComponent variant={variant} color={color} {...args}>
        {children}
      </PanelComponent>
    </>
  );
};

export const ShowCase = ({ children = demoContent, ...args }) => {
  return (
    <>
      <PanelComponent {...args}>{children}</PanelComponent>
    </>
  );
};

export const ModalShowCase = ({ children = demoContent, onClose, ...args }) => {
  const [modalStatus, setModalStatus] = useState(false);
  return (
    <>
      <Button onClick={() => setModalStatus((prev) => !prev)}>open panel</Button>
      <Modal isOpen={modalStatus} size={RVSizeProp.small} shouldCloseOnEsc>
        <PanelComponent
          onClose={() => {
            onClose();
            setModalStatus(false);
          }}
          {...args}
        >
          {children}
        </PanelComponent>
      </Modal>
    </>
  );
};

export const withoutLabel = Template.bind({});
withoutLabel.args = { children: '' };

export const SmallSized = Template.bind({});
SmallSized.args = { size: RVSizeProp.small };

export const MediumSized = Template.bind({});
MediumSized.args = { size: RVSizeProp.medium };

export const LargeSized = Template.bind({});
LargeSized.args = { size: RVSizeProp.large };
