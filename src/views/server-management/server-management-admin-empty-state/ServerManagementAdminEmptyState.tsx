import { FunctionComponent } from 'react';
import AlertSvg from '../../../icons/alert.svg';
import { Typography } from '../../../components';
import { RVColorProp } from '../../../types';
import { EmptyState } from '../../../layouts/EmptyState';
import styles from './ServerManagementAdminEmptyState.module.scss';
import clsx from 'clsx';
import { Trans } from 'react-i18next';

export interface RVServerManagementAdminEmptyState {}

const ServerManagementAdminEmptyState: FunctionComponent = () => {
  return (
    <EmptyState
      title={
        <>
          <AlertSvg className={clsx(RVColorProp.gray, styles.defaultIcon)} />
          <Typography type="H1" color={RVColorProp.gray} className={styles.title}>
            <Trans ns="server-management" i18nKey="no_servers_available">
              No servers added
            </Trans>
          </Typography>
        </>
      }
      description={
        <Typography type="p" color={RVColorProp.gray} className={styles.description}>
          <Trans ns="server-management" i18nKey="add_new_server_description">
            Add Z-servers with the 'New Server' button.
          </Trans>
        </Typography>
      }
    />
  );
};

export default ServerManagementAdminEmptyState;
