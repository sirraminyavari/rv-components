import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  UserManagementAdminList as UserManagementAdminListComponent,
  RVUserManagementAdminList,
} from '.';
import { makeData } from './makeData.faker';
import { ToastContainer } from '../../../components';

export default {
  title: 'views/User Management/Admin/List',
  component: UserManagementAdminListComponent,
  argTypes: {} as RVUserManagementAdminList,
  decorators: [
    (Story) => (
      <>
        <Story />
        <ToastContainer />
      </>
    ),
  ],
} as ComponentMeta<typeof UserManagementAdminListComponent>;

const loadAllUsersData: RVUserManagementAdminList['loadAllUsersDataCallback'] = async ({
  Count,
  LowerBoundary,
}) => {
  const usersData = makeData(LowerBoundary < 50 ? Count : 5).map((person, idx) => ({
    ...person,
    UserName: person.UserName,
  }));
  console.log('fetch requested ...', { Count, LowerBoundary });

  return new Promise((res) =>
    setTimeout(() => {
      res({
        TotalCount: 55,
        AppID: '',
        SystemAdminsEditable: true,
        ConfidentialitiesEditable: true,
        Users: usersData,
      });
    }, 1500)
  );
};
const saveUserData: RVUserManagementAdminList['updateUserDataCallback'] = async (user) => {
  const usersData = makeData(1);
  console.log('update requested ...', { user });

  return new Promise((res) =>
    setTimeout(() => {
      res(usersData[0].IsApproved);
    }, 1000)
  );
};
const loadConfidentialityLevels: RVUserManagementAdminList['loadConfidentialityLevelsCallback'] =
  async () => {
    return new Promise((res) =>
      setTimeout(() => {
        res({
          Levels: [
            { LevelID: '3', ConfidentialityID: 'conf-1', Title: 'General', ID: 'conf-3' },
            { LevelID: '2', ConfidentialityID: 'conf-2', Title: 'Sargent', ID: 'conf-2' },
            { LevelID: '1', ConfidentialityID: 'conf-3', Title: 'Soldier', ID: 'conf-1' },
          ],
        });
      }, 1000)
    );
  };
export const List: ComponentStory<typeof UserManagementAdminListComponent> = ({
  loadAllUsersDataCallback,
  ...args
}) => {
  return (
    <div style={{ height: '100dvh' }}>
      <UserManagementAdminListComponent
        {...args}
        loadAllUsersDataCallback={loadAllUsersData}
        updateUserDataCallback={saveUserData}
        loadConfidentialityLevelsCallback={loadConfidentialityLevels}
      />
    </div>
  );
};
