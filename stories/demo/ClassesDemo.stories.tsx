import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  SidebarMain as SidebarMainComponent,
} from '../../src/components/Sidebar/Main';
import {
  SidebarSubMenu as SidebarSubMenuComponent,
} from '../../src/components/Sidebar/SubMenu';
import { CMLogoSvg, HomeSvg, PeopleSvg } from '../../src/icons';
import { RVColorProp } from '../../src';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Demo/Classes',
  argTypes: {
    subMenuColor: {
      control: {
        type: 'radio',
        labels:(RVColorProp),
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SidebarSubMenuComponent>;

const primaryLinks = [
  {
    Icon: CMLogoSvg,
    title: '',
    onClick: () => {},
    noIndicator: true,
  },
  {
    Icon: HomeSvg,
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
];
export const Classes: ComponentStory<typeof SidebarSubMenuComponent> = ({
  children,
  ...args
}) => (
  <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
    <SidebarMainComponent primaryLinks={primaryLinks} {...args}>
      {children}
    </SidebarMainComponent>
    <SidebarSubMenuComponent {...args}>{children}</SidebarSubMenuComponent>
  </div>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
