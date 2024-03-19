import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { ManagementMenu as ManagementMenuComponent, RVManagementMenu } from '.';
import { ToastContainer } from '../../components';
import { FileTrayFullSvg, PeopleCircleSvg, SettingsSvg, ShieldSvg, peopleSvg } from '../../icons';
import { getRandomInt } from '../../utils';

export default {
  title: 'views/Management Menu/Tile Menu',
  component: ManagementMenuComponent,
  argTypes: {} as RVManagementMenu,
  decorators: [
    (Story) => (
      <>
        <Story />
        <ToastContainer />
      </>
    ),
  ],
} as ComponentMeta<typeof ManagementMenuComponent>;

const loadAllMenuItems: RVManagementMenu['menuItemsListCallback'] = async () => {
  const response = [
    { title: 'Users', Icon: peopleSvg, path: '#!' },
    { title: 'Groups', Icon: PeopleCircleSvg, path: '#!' },
    { title: 'PrivacyPolicy', Icon: ShieldSvg, path: '#!' },
    { title: 'Import', Icon: FileTrayFullSvg, path: '#!' },
    { title: 'Settings', Icon: SettingsSvg, path: '#!' },
  ];

  return new Promise((res) =>
    setTimeout(() => {
      res(response);
    }, getRandomInt(500, 1500))
  );
};
export const TileMenu = ({ children, ...args }) => {
  return (
    <div style={{ height: '90dvh' }}>
      <ManagementMenuComponent menuItemsListCallback={loadAllMenuItems} />
    </div>
  );
};
