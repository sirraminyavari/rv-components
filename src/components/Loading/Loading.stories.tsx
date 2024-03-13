import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Loading as LoadingComponent, RVLoading } from '.';
export default {
  title: 'Components/Loading',
  component: LoadingComponent,
  argTypes: {} as RVLoading,
} as ComponentMeta<typeof LoadingComponent>;

const Template: ComponentStory<typeof LoadingComponent> = ({ ...args }) => (
  <div style={{ minHeight: '100vh', position: 'relative' }}>
    <LoadingComponent {...args} />
  </div>
);
export const ShowCase: ComponentStory<typeof LoadingComponent> = ({ ...args }) => (
  <LoadingComponent {...args} />
);

export const Loading = Template.bind({});

export const inline = Template.bind({});
inline.args = { inline: true };
