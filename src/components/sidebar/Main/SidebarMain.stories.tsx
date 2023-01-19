import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SidebarMain as SidebarMainComponent, RVSidebarMain } from '.';
import { CMLogoSvg, HomeSvg, PeopleSvg } from '../../../icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Sidebar/Main',
  component: SidebarMainComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'jsx' },
  } as RVSidebarMain,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SidebarMainComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SidebarMainComponent> = ({
  children,
  ...args
}) => (
  <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
    <SidebarMainComponent {...args}>{children}</SidebarMainComponent>
  </div>
);
const TemplateRTL: ComponentStory<typeof SidebarMainComponent> = ({
  children,
  ...args
}) => (
  <div
    style={{ display: 'flex', minHeight: '100vh', width: '100%' }}
    className="direction-rtl"
  >
    <SidebarMainComponent {...args}>{children}</SidebarMainComponent>
  </div>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const Main = Template.bind({});
Main.args = {
  primaryLinks: [
    {
      Icon: CMLogoSvg,
      title: '',
      onClick: () => {},
      noIndicator: true,
    },
    {
      Icon: HomeSvg,
      title: 'خونه',
      onClick: () => {},
      noIndicator: false,
    },
    {
      Icon: PeopleSvg,
      title: '',
      onClick: () => {},
      noIndicator: false,
    },
    {
      Icon: PeopleSvg,
      title: '',
      onClick: () => {},
      noIndicator: false,
    },
    {
      Icon: PeopleSvg,
      title: '',
      onClick: () => {},
      noIndicator: false,
    },
  ],
};

export const MainRTL = TemplateRTL.bind({});
MainRTL.args = {
  primaryLinks: [
    {
      Icon: CMLogoSvg,
      title: '',
      onClick: () => {},
      noIndicator: true,
    },
    {
      Icon: HomeSvg,
      title: 'Home',
      onClick: () => {},
      noIndicator: false,
    },
    {
      Icon: PeopleSvg,
      title: '',
      onClick: () => {},
      noIndicator: false,
    },
    {
      Icon: PeopleSvg,
      title: '',
      onClick: () => {},
      noIndicator: false,
    },
    {
      Icon: PeopleSvg,
      title: '',
      onClick: () => {},
      noIndicator: false,
    },
  ],
};
