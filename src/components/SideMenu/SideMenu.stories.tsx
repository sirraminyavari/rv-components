import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SideMenu as SideMenuComponent, RVSideMenu } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SubMenu',
  component: SideMenuComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVSideMenu,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SideMenuComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SideMenuComponent> = ({
  children = (
    <div style={{height:50,overflow:'hidden'}}>
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum et
      repellendus corrupti eaque odit quidem voluptates voluptate dignissimos
      facere illo corporis facilis pariatur dolore reiciendis repudiandae ipsa,
      quam sequi aliquid.'
    </div>
  ),
  open = true,
  ...args
}) => (
  <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
    <SideMenuComponent open={open} {...args}>
      {children}
    </SideMenuComponent>
  </div>
);
const TemplateRTL: ComponentStory<typeof SideMenuComponent> = ({
  children,
  open = true,
  ...args
}) => (
  <div
    style={{ display: 'flex', minHeight: '100vh', width: '100%' }}
    className="direction-rtl"
  >
    <SideMenuComponent open={open} {...args}>
      {children}
    </SideMenuComponent>
  </div>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const SubMenu = Template.bind({});
SubMenu.args = {};
export const SubMenuRTL = TemplateRTL.bind({});
SubMenu.args = {};
