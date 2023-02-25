import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ChatBubble as ChatBubbleComponent, RVChatBubble } from '.';

export default {
  title: 'Components/ChatBubble',
  component: ChatBubbleComponent,
  argTypes: {
    children: { control: 'text' },
  } as RVChatBubble,
} as ComponentMeta<typeof ChatBubbleComponent>;

const Template: ComponentStory<typeof ChatBubbleComponent> = ({
  children = 'ChatBubble',
  additionalInfo = '12:43',

  ...args
}) => (
  <ChatBubbleComponent additionalInfo={additionalInfo} {...args}>
    {children}
  </ChatBubbleComponent>
);

export const ChatBubble = Template.bind({});
ChatBubble.args = { variant: 'primary' };

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };
