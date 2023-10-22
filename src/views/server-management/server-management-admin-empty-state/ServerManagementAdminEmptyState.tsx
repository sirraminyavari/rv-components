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
            No results found
          </Typography>
        </>
      }
      description={
        <Typography type="p" color={RVColorProp.gray} className={styles.description}>
          برای تعریف زد-سرور جدید از دکمه New server استفاده کنید.
        </Typography>
      }
    />
  );
};

export default ServerManagementAdminEmptyState;
