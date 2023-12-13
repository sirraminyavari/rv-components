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
            No results found
          </Typography>
        </>
      }
      description={
        <Typography type="p" color={RVColorProp.gray} className={styles.description}>
          درصورتی که از صحیح بودن نوشتار مشخصه موردنظر خود اطمینان دارید، لطفا با استفاده از کادر
          جستجوی کنار، مشخصه‌های دیگر کتاب را وارد و نتایج آن را مشاهده کنید.
        </Typography>
      }
    />
  );
};

export default ServerManagementEmptyState;
