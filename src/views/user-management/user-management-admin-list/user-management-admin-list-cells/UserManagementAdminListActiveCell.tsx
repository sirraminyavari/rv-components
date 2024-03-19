import clsx from 'clsx';
import type { CellContext } from '@tanstack/react-table';
import { useState, type ReactNode, useCallback } from 'react';
import { LoadingSvg } from '../../../../icons';
import { RVToast, Switch } from '../../../../components';
import { RVUserManagementAdminListUserEntity } from '../UserManagementAdminList';
import styles from '../UserManagementAdminList.module.scss';

interface RVUserManagementAdminListActiveCell {
  updateUserApprovalCallback: (data: { UserID: string; IsApproved: boolean }) => Promise<boolean>;
  cell: CellContext<Record<string, ReactNode>, unknown>;
}
// ;
const UserManagementAdminListActiveCell =
  ({ cell, updateUserApprovalCallback }: RVUserManagementAdminListActiveCell) =>
  () => {
    //eslint-disable-next-line  react-hooks/rules-of-hooks
    const [IsLoading, setIsLoading] = useState(false);
    //eslint-disable-next-line  react-hooks/rules-of-hooks
    const onApprovalChange = useCallback(
      async (statusToChange: boolean) => {
        if (!updateUserApprovalCallback) return;
        setIsLoading(true);
        try {
          await updateUserApprovalCallback({ UserID: row.UserID, IsApproved: statusToChange });
          onApprovalChange(statusToChange);
        } catch (error) {
          RVToast.error('error in updating ...');
        }
        setIsLoading(false);
      },
      [updateUserApprovalCallback]
    );
    const row = cell.getValue() as RVUserManagementAdminListUserEntity;
    return (
      <>
        <form className={styles.clickableInputContainer}>
          <Switch
            id={`${String(row.UserID)}-allowance-switch`}
            name={`active__${row.UserID}`}
            checked={Boolean(row.IsApproved)}
            readOnly
            onChange={(e) => {
              onApprovalChange(e.target.checked);
            }}
          />
        </form>
        <div className={clsx(styles.loadingIcon)}>{IsLoading && <LoadingSvg />}</div>
      </>
    );
  };

export default UserManagementAdminListActiveCell;
