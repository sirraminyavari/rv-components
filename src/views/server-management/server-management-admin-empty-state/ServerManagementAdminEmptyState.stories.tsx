import React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ServerManagementAdminEmptyState as ServerManagementAdminEmptyStateComponent,
  RVServerManagementAdminEmptyState,
} from '.';

export default {
  title: 'views/Server Management/Admin/EmptyState',
  component: ServerManagementAdminEmptyStateComponent,
  argTypes: {
    children: { control: 'text' },
  } as RVServerManagementAdminEmptyState,
} as ComponentMeta<typeof ServerManagementAdminEmptyStateComponent>;

export const EmptyState = ({ children, ...args }) => {
  return (
    <div style={{ height: '90vh' }}>
      <ServerManagementAdminEmptyStateComponent {...args}>
        {children}
      </ServerManagementAdminEmptyStateComponent>
    </div>
  );
};
