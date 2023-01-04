import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SidebarSubMenu as SidebarSubMenuComponent, ISidebarSubMenu } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Sidebar/SubMenu',
  component: SidebarSubMenuComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'jsx' },
  } as ISidebarSubMenu,
} as ComponentMeta<typeof SidebarSubMenuComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SidebarSubMenuComponent> = ({
  children,
  ...args
}) => (
  <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
    <SidebarSubMenuComponent {...args}>{children}</SidebarSubMenuComponent>
  </div>
);
const TemplateRTL: ComponentStory<typeof SidebarSubMenuComponent> = ({
  children,
  ...args
}) => (
  <div
    style={{ display: 'flex', minHeight: '100vh', width: '100%' }}
    className="direction-rtl"
  >
    <SidebarSubMenuComponent {...args}>{children}</SidebarSubMenuComponent>
  </div>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const SubMenu = Template.bind({});
SubMenu.args = {};
export const SubMenuRTL = TemplateRTL.bind({});
SubMenu.args = {};
