import React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ServerManagementSearchPanel as ServerManagementSearchPanel,
  RVServerManagementSearchPanel,
} from '.';
import { getRandomInt } from '../../../utils';

export default {
  title: 'views/Server Management/SearchPanel',
  component: ServerManagementSearchPanel,
  argTypes: {} as RVServerManagementSearchPanel,
} as ComponentMeta<typeof ServerManagementSearchPanel>;

const serverListCallback: RVServerManagementSearchPanel['serversListCallback'] = async () => {
  await new Promise((res) => setTimeout(res, 1000));

  return [
    { label: 'server ABC', value: 'abc' },
    { label: 'server HBO', value: 'hbo' },
    { label: 'server BBC', value: 'bbc' },
    { label: 'server MTV', value: 'mtv' },
  ];
};
const searchCallback: RVServerManagementSearchPanel['serverSearchCallback'] = async ({
  serverID,
  query,
}) => {
  console.log('init', serverID);

  await new Promise((res) => setTimeout(res, getRandomInt(1000, 2000)));
  const count = getRandomInt(1, 5);
  console.log('end', serverID);
  return new Array(count).fill({
    authors: ['Professor X', 'Edward Beck', 'J.J Nolan'],
    id: 'server-id-' + serverID + getRandomInt(100, 500),
    server: { title: serverID.toUpperCase() },
    title: 'the hands on guide:' + serverID + getRandomInt(12, 60),
  });
};
export const SearchPanel = ({ ...args }) => {
  return (
    <>
      <ServerManagementSearchPanel
        serversListCallback={serverListCallback}
        serverSearchCallback={searchCallback}
        addCallback={async (id) => {
          alert(id);
          return true;
        }}
        {...args}
      />
    </>
  );
};
