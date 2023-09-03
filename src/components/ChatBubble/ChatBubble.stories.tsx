import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ChatBubble as ChatBubbleComponent, RVChatBubble } from '.';
import { ThemeBlock } from '../../storybookComponents';
import { RVVariantProp } from '../../types';

export default {
  title: 'Components/ChatBubble',
  component: ChatBubbleComponent,
  argTypes: {
    children: { control: 'text' },
  } as RVChatBubble,
} as ComponentMeta<typeof ChatBubbleComponent>;

const Template: ComponentStory<typeof ChatBubbleComponent> = ({
  children = 'Hi there, how are you?',
  additionalInfo = '12:43',
  color,
  variant,
  ...args
}) => {
  const [colorClass, setColorClass] = useState(color);
  useEffect(() => {
    setColorClass(color);
  }, [color]);

  return (
    <ThemeBlock onColorChange={setColorClass}>
      <ChatBubbleComponent
        variant={variant || RVVariantProp.primary}
        color={colorClass}
        additionalInfo={additionalInfo}
        {...args}
      >
        {children}
      </ChatBubbleComponent>
    </ThemeBlock>
  );
};

export const ShowCase = ({ children = 'Hi there, how are you?', ...args }) => {
  return (
    <>
      <ChatBubbleComponent {...args}>{children}</ChatBubbleComponent>
    </>
  );
};

export const Sender = Template.bind({});
Sender.args = { bubbleType: 'sender' };

export const Receiver = Template.bind({});
Receiver.args = { bubbleType: 'receiver' };
