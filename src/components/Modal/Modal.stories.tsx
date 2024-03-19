import React, { CSSProperties, useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal as ModalComponent, RVModal } from '.';
import { Button } from '..';
import { ThemeBlock } from '../../storybookComponents';
import { RVSizeProp, RVVariantProp } from '../../types';

export default {
  title: 'Components/Modal',
  component: ModalComponent,
  argTypes: {} as RVModal,
} as unknown as ComponentMeta<typeof ModalComponent>;

const defaultModalStyles: CSSProperties = {
  padding: '10px 15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
};

const loremIpsum = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi eum voluptatem
              accusantium sapiente nisi dignissimos ea cum laudantium veritatis, aliquam itaque
              adipisci voluptate nobis voluptatibus reiciendis nam explicabo totam qui. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Sequi eum voluptatem accusantium sapiente
              nisi dignissimos ea cum laudantium veritatis, aliquam itaque adipisci voluptate nobis
              voluptatibus reiciendis nam explicabo totam qui. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sequi eum voluptatem accusantium sapiente nisi
              dignissimos ea cum laudantium veritatis, aliquam itaque adipisci voluptate nobis
              voluptatibus reiciendis nam explicabo totam qui.`;

const Template: ComponentStory<typeof ModalComponent> = ({
  children = loremIpsum,
  color,
  isOpen,
  onRequestClose,
  parentSelector,
  ...args
}) => {
  const [colorClass, setColorClass] = useState(color);
  const [modalStatus, setModalStatus] = useState(isOpen);
  useEffect(() => {
    setColorClass(color);
  }, [color]);

  return (
    <ThemeBlock onColorChange={setColorClass}>
      <div>
        <Button
          size={RVSizeProp.small}
          color={colorClass}
          onClick={() => setModalStatus(!modalStatus)}
        >
          Open Modal
        </Button>
        <ModalComponent
          isOpen={modalStatus}
          color={colorClass}
          onRequestClose={() => {
            setModalStatus(false);
          }}
          {...args}
        >
          <div style={defaultModalStyles}>
            <p>{children}</p>
            <Button
              color={colorClass}
              variant={RVVariantProp.white}
              size={RVSizeProp.small}
              onClick={() => setModalStatus(!modalStatus)}
            >
              Close Modal
            </Button>
          </div>
        </ModalComponent>
      </div>
    </ThemeBlock>
  );
};

export const ShowCase = ({
  children = 'some content',
  isOpen = false,
  onRequestClose,
  ...args
}) => {
  const [modalStatus, setModalStatus] = useState(isOpen);
  return (
    <>
      <Button size={RVSizeProp.small} onClick={() => setModalStatus(!modalStatus)}>
        Open Modal
      </Button>
      <ModalComponent
        isOpen={modalStatus}
        onRequestClose={() => {
          setModalStatus(false);
        }}
        {...args}
      >
        <div style={defaultModalStyles}>
          {children}
          <Button size={RVSizeProp.small} onClick={() => setModalStatus(!modalStatus)}>
            Close Modal
          </Button>
        </div>
      </ModalComponent>
    </>
  );
};

export const PreventScroll = Template.bind({});
PreventScroll.args = { preventScroll: true };
export const ReturnFocusAfterClose = Template.bind({});
ReturnFocusAfterClose.args = { shouldReturnFocusAfterClose: true };

export const CloseOnEscape = Template.bind({});
CloseOnEscape.args = { shouldCloseOnEsc: true };

export const CloseOnOverlayClick = Template.bind({});
CloseOnOverlayClick.args = { shouldCloseOnOverlayClick: true };

export const CustomTimeout = Template.bind({});
CustomTimeout.args = { closeTimeoutMS: 1000 };

export const SmallSized = Template.bind({});
SmallSized.args = { size: RVSizeProp.small };

export const MediumSized = Template.bind({});
MediumSized.args = { size: RVSizeProp.medium };

export const LargeSized = Template.bind({});
LargeSized.args = { size: RVSizeProp.large };
