import { FunctionComponent } from 'react';
import AlertSvg from '../../../icons/alert.svg';
import { Typography } from '../../../components';
import { RVColorProp } from '../../../types';
import { EmptyState } from '../../../layouts/EmptyState';
import styles from './ServerManagementEmptyState.module.scss';
import clsx from 'clsx';
import { Trans } from 'react-i18next';

export interface RVServerManagementEmptyState {}

const ServerManagementEmptyState: FunctionComponent = () => {
  return (
    <EmptyState
      title={
        <>
          <AlertSvg className={clsx(RVColorProp.crayola, styles.defaultIcon)} />
          <Typography type="H1" color={RVColorProp.crayola} className={styles.title}>
            <Trans ns="server-management" i18nKey="empty_state_title">
              No matching resources.
            </Trans>
          </Typography>
        </>
      }
      description={
        <Typography type="p" color={RVColorProp.gray} className={styles.description}>
          <Trans ns="server-management" i18nKey="empty_state_description">
            Check your spelling or try different attributes.
          </Trans>
        </Typography>
      }
    />
  );
};

export default ServerManagementEmptyState;
