import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SidebarMain as SidebarMainComponent, ISidebarMain } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Sidebar/Main',
  component: SidebarMainComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'jsx' },
  } as ISidebarMain,
} as ComponentMeta<typeof SidebarMainComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SidebarMainComponent> = ({
  children,
  ...args
}) => (
  <div style={{display:"flex",minHeight:"100vh",width:"100vw"}}>
    <SidebarMainComponent {...args}>{children}</SidebarMainComponent>
  </div>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const Main = Template.bind({});
Main.args = {};
