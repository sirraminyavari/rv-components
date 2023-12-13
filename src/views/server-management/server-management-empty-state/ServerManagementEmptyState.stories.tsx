import React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ServerManagementEmptyState as ServerManagementEmptyStateComponent,
  RVServerManagementEmptyState,
} from '.';

export default {
  title: 'views/Server Management/EmptyState',
  component: ServerManagementEmptyStateComponent,
  argTypes: {
    children: { control: 'text' },
  } as RVServerManagementEmptyState,
} as ComponentMeta<typeof ServerManagementEmptyStateComponent>;

export const EmptyState = ({ children, ...args }) => {
  return (
    <div style={{ height: '90vh' }}>
      <ServerManagementEmptyStateComponent {...args}>
        {children}
      </ServerManagementEmptyStateComponent>
    </div>
  );
};
