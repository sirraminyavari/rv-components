import React, { useCallback, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  ServerManagementSearchPanel as ServerManagementSearchPanel,
  RVServerManagementSearchPanel,
} from '.';
import { getRandomInt } from '../../../utils';
import { ServerManagementRowDetails } from '../server-management-row-details';

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
    serverJsonResult: getRandomInt(0, 3) % 2 ? undefined : { some: { code: { error: true } } },
    title: 'the hands on guide:' + serverID + getRandomInt(12, 60),
  });
};
export const SearchPanel: ComponentStory<typeof ServerManagementSearchPanel> = ({ ...args }) => {
  const [DetailsPanelState, setDetailsPanelState] = useState(false);
  const [detailsPanelData, setDetailsPanelData] = useState<Record<string, any>>();
  const setItemData = useCallback(async () => {
    setDetailsPanelData(undefined);
    setDetailsPanelState(true);
    setDetailsPanelData({
      'my details data 3': 435,
      'my details data 4': 'author',
      'my details data 2': null,
      'my details data 5': 'Wisely',
      'my details data 6': 'Cocoa',
      'my details data 1': null,
      serverJsonResult: JSON.stringify({
        'my details data 3': 435,
        'my details data 4': 'author',
        'my details data 2': null,
        'my details data 5': 'Wisely',
        'my details data 6': 'Cocoa',
        'my details data 1': null,
        'my details data 7': '43534588-xcvxvxcv',
      }),
    });

    return true;
  }, []);

  return (
    <>
      <ServerManagementSearchPanel
        serversListCallback={serverListCallback}
        serverSearchCallback={searchCallback}
        detailsCallback={setItemData}
        addCallback={async (id) => {
          alert(id);
          return true;
        }}
        // {...args}
      />
      <ServerManagementRowDetails
        title={'Result details'}
        isOpen={DetailsPanelState}
        onClose={() => setDetailsPanelState(false)}
        details={detailsPanelData}
      />
    </>
  );
};
