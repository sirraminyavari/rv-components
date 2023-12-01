import { FunctionComponent } from 'react';
import AlertSvg from '../../../icons/alert.svg';
import { Typography } from '../../../components';
import { RVColorProp } from '../../../types';
import { EmptyState } from '../../../layouts/EmptyState';
import styles from './ServerManagementAdminEmptyState.module.scss';
import clsx from 'clsx';

export interface RVServerManagementAdminEmptyState {}

const ServerManagementAdminEmptyState: FunctionComponent = () => {
  return (
    <EmptyState
      title={
        <>
          <AlertSvg className={clsx(RVColorProp.gray, styles.defaultIcon)} />
          <Typography type="H1" color={RVColorProp.gray} className={styles.title}>
            No servers added
          </Typography>
        </>
      }
      description={
        <Typography type="p" color={RVColorProp.gray} className={styles.description}>
          Add Z-servers with the 'New Server' button.
        </Typography>
      }
    />
  );
};

export default ServerManagementAdminEmptyState;
