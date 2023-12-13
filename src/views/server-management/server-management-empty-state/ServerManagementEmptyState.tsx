import { FunctionComponent } from 'react';
import AlertSvg from '../../../icons/alert.svg';
import { Typography } from '../../../components';
import { RVColorProp } from '../../../types';
import { EmptyState } from '../../../layouts/EmptyState';
import styles from './ServerManagementEmptyState.module.scss';
import clsx from 'clsx';

export interface RVServerManagementEmptyState {}

const ServerManagementEmptyState: FunctionComponent = () => {
  return (
    <EmptyState
      title={
        <>
          <AlertSvg className={clsx(RVColorProp.crayola, styles.defaultIcon)} />
          <Typography type="H1" color={RVColorProp.crayola} className={styles.title}>
            No matching resources.
          </Typography>
        </>
      }
      description={
        <Typography type="p" color={RVColorProp.gray} className={styles.description}>
          Check your spelling or try different attributes.
        </Typography>
      }
    />
  );
};

export default ServerManagementEmptyState;
