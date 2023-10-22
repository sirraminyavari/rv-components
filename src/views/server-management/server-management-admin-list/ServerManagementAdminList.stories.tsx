import React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ServerManagementAdminList as ServerManagementAdminList,
  RVServerManagementAdminList,
} from '.';
import { getRandomInt } from '../../../utils';

export default {
  title: 'views/Server Management/Admin/list',
  component: ServerManagementAdminList,
  argTypes: {} as RVServerManagementAdminList,
} as ComponentMeta<typeof ServerManagementAdminList>;

const serverListCallback: RVServerManagementAdminList['serversListCallback'] = async () => {
  await new Promise((res) => setTimeout(res, 1000));
  const count = getRandomInt(25, 100);
  const demoData = [
    { label: 'server ABC', id: 'abc' },
    { label: 'server NBC', id: 'nbc' },
    { label: 'server BBC', id: 'bbc' },
    { label: 'server MTV', id: 'mtv' },
  ];
  return new Array(count).fill(demoData[getRandomInt(0, 4)]);
};
export const list = ({ ...args }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '60vh' }}>
      <ServerManagementAdminList
        serversListCallback={serverListCallback}
        editCallback={async (id) => {
          alert(id);
          return true;
        }}
        removeCallback={async (id) => {
          alert(id);
          return true;
        }}
        {...args}
      />
    </div>
  );
};
