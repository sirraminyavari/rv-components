import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar, Button } from '../.';
import { ToastContainer as ToastContainerComponent, RVToastContainer, RVToast } from '.';
import { RVSizeProp, RVVariantProp } from '../../types';

export default {
  title: 'Components/Toast',
  component: ToastContainerComponent,
  argTypes: {} as RVToastContainer,
} as ComponentMeta<typeof ToastContainerComponent>;

const Template: ComponentStory<typeof ToastContainerComponent> = ({ color, variant, ...args }) => {
  const notify = () => RVToast.success('Wow so easy!');
  return (
    <>
      <Button onClick={notify} variant={RVVariantProp.white}>
        Notify!
      </Button>
      <ToastContainerComponent variant={variant || RVVariantProp.primary} color={color} {...args} />
    </>
  );
};

export const ShowCase = ({ onClick, ...args }) => {
  return (
    <>
      <Button onClick={() => RVToast('Wow so easy!')}>Notify!</Button>
      <ToastContainerComponent {...args}></ToastContainerComponent>
    </>
  );
};

export const SmallSized = Template.bind({});
SmallSized.args = { size: RVSizeProp.small };
export const MediumSized = Template.bind({});
MediumSized.args = { size: RVSizeProp.medium };
export const LargeSized = Template.bind({});
LargeSized.args = { size: RVSizeProp.large };

export const CustomCloseComponent = Template.bind({});
CustomCloseComponent.args = {
  closeButton: ({ closeToast }) => (
    <Button onClick={closeToast} variant={RVVariantProp.white} size={RVSizeProp.small}>
      close
    </Button>
  ),
};

export const JSXContent = ({ ...args }) => {
  return (
    <>
      <Button onClick={() => RVToast(<Avatar src="https://i.pravatar.cc/300?img=49" />)}>
        Notify!
      </Button>
      <ToastContainerComponent {...args}></ToastContainerComponent>
    </>
  );
};
