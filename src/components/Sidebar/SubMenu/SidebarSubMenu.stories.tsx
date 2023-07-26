import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SidebarSubMenu as SidebarSubMenuComponent, RVSidebarSubMenu } from '.';
import {
  BookmarkSvg,
  FileTrayFullSvg,
  GridSvg,
  HomeSvg,
  NotificationSvg,
  PeopleCircleSvg,
  ShapesSvg,
} from '../../../icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Sidebar/SubMenu',
  component: SidebarSubMenuComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'jsx' },
  } as RVSidebarSubMenu,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SidebarSubMenuComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SidebarSubMenuComponent> = ({
  children,
  links,
  open = true,
  ...args
}) => (
  <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
    <SidebarSubMenuComponent
      open={open}
      activeLink="testid"
      links={
        links || [
          { badge: 1265, id: 'testid', title: 'Everything', Icon: GridSvg },
          { badge: 23, title: 'Bookmarked', Icon: BookmarkSvg },
          { badge: 11, title: 'Drafts', Icon: FileTrayFullSvg },
          {
            title: 'Documents',
            Icon: HomeSvg,
            badge: 22,
            id: 'docs',
            childItems: [
              { badge: 123, title: 'Diagrams', Icon: NotificationSvg },
              { badge: 123, title: 'Diagrams', Icon: PeopleCircleSvg },
              { title: 'Reports1', Icon: ShapesSvg },
              { badge: 123, title: 'Diagrams2' },
            ],
          },
          {
            title: 'Files',
            Icon: HomeSvg,
            badge: 22,
            id: 'files',
            childItems: [
              { badge: 123, title: 'Diagrams', Icon: NotificationSvg },
              { badge: 123, title: 'Diagrams', Icon: PeopleCircleSvg },
              { title: 'Reports1', Icon: ShapesSvg },
              { badge: 123, title: 'Diagrams2' },
            ],
          },
          {
            title: 'Files2',
            Icon: HomeSvg,
            badge: 22,
            id: 'files2',
            childItems: [
              { badge: 123, title: 'Diagrams', Icon: NotificationSvg },
              { badge: 123, title: 'Diagrams', Icon: PeopleCircleSvg },
              { title: 'Reports1', Icon: ShapesSvg },
              { badge: 123, title: 'Diagrams2' },
            ],
          },
          {
            title: 'Files',
            Icon: HomeSvg,
            badge: 22,
            childItems: [
              { badge: 123, title: 'Diagrams', Icon: NotificationSvg },
              { badge: 123, title: 'Diagrams', Icon: PeopleCircleSvg },
              { title: 'Reports1', Icon: ShapesSvg },
              { badge: 123, title: 'Diagrams2' },
            ],
          },
          {
            title: 'Files',
            Icon: HomeSvg,
            badge: 22,
            childItems: [
              { badge: 123, title: 'Diagrams', Icon: NotificationSvg },
              { badge: 123, title: 'Diagrams', Icon: PeopleCircleSvg },
              { title: 'Reports1', Icon: ShapesSvg },
              { badge: 123, title: 'Diagrams2' },
            ],
          },
        ]
      }
      {...args}
    >
      {children}
    </SidebarSubMenuComponent>
  </div>
);
const TemplateRTL: ComponentStory<typeof SidebarSubMenuComponent> = ({
  children,
  links,
  open = true,
  ...args
}) => (
  <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }} className="direction-rtl">
    <SidebarSubMenuComponent
      open={open}
      links={
        links || [
          { badge: 1265, title: 'Everything', Icon: GridSvg },
          { badge: 23, title: 'Bookmarked', Icon: BookmarkSvg },
          { badge: 11, title: 'Drafts', Icon: FileTrayFullSvg },
          {
            title: 'Documents',
            Icon: HomeSvg,
            badge: 22,
            childItems: [
              { badge: 123, title: 'Diagrams', Icon: NotificationSvg },
              { badge: 123, title: 'Diagrams', Icon: PeopleCircleSvg },
              { title: 'Reports1', Icon: ShapesSvg },
              { badge: 123, title: 'Diagrams2' },
            ],
          },
          {
            title: 'Files',
            Icon: HomeSvg,
            badge: 22,
            childItems: [
              { badge: 123, title: 'Diagrams', Icon: NotificationSvg },
              { badge: 123, title: 'Diagrams', Icon: PeopleCircleSvg },
              { title: 'Reports1', Icon: ShapesSvg },
              { badge: 123, title: 'Diagrams2' },
            ],
          },
        ]
      }
      {...args}
    >
      {children}
    </SidebarSubMenuComponent>
  </div>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const SubMenu = Template.bind({});
SubMenu.args = {};
export const SubMenuRTL = TemplateRTL.bind({});
SubMenu.args = {};
