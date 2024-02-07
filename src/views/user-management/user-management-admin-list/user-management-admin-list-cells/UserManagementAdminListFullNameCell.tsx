import type { CellContext } from '@tanstack/react-table';
import type { FormEvent, ReactNode } from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../../../types';
import { LoadingSvg, LockOpened } from '../../../../icons';
import { Avatar, TextInput } from '../../../../components';
import { t } from 'i18next';
import styles from '../UserManagementAdminList.module.scss';
import { RVUserManagementAdminListUserEntity } from '../UserManagementAdminList';
import clsx from 'clsx';

interface RVUserManagementAdminListFullNameCell {
  updateEditedData: (
    user: RVUserManagementAdminListUserEntity,
    userEntityKeys: (keyof RVUserManagementAdminListUserEntity)[]
  ) => (e: FormEvent<HTMLFormElement>) => Promise<void>;
  tempUserEditedFields: Record<
    string,
    Partial<
      Record<
        keyof RVUserManagementAdminListUserEntity,
        Record<'saveStatus' | 'value', string | number | boolean>
      >
    >
  >;
  setEditableItem: (
    user: RVUserManagementAdminListUserEntity,
    userEntityKey: keyof RVUserManagementAdminListUserEntity,
    saveStatus?: boolean
  ) => void;
  cell: CellContext<Record<string, ReactNode>, unknown>;
  unblockUserCallback: (data: { UserID: string }) => Promise<boolean>;
}
// ;
const UserManagementAdminListFullNameCell =
  ({
    cell,
    setEditableItem,
    tempUserEditedFields,
    updateEditedData,
    unblockUserCallback,
  }: RVUserManagementAdminListFullNameCell) =>
  () => {
    const row = cell.getValue() as RVUserManagementAdminListUserEntity;

    return (
      <>
        <div className={styles.clickableInputContainer}>
          <Avatar
            src={String(row?.ProfileImageURL)}
            size={RVSizeProp.medium}
            variant={RVVariantProp.outline}
            fullCircle
          >
            {row.IsLockedOut && (
              <LockOpened
                className={clsx(styles.lockIcon, RVColorProp.crayola)}
                onClick={() => unblockUserCallback && unblockUserCallback({ UserID: row.UserID })}
              />
            )}
          </Avatar>

          {typeof tempUserEditedFields[row.UserID]?.FirstName === 'undefined' && (
            <div
              className={styles.clickableInputContainer}
              onDoubleClick={() => {
                setEditableItem(row, 'FirstName');
                setEditableItem(row, 'LastName');
              }}
            >
              <span>{row?.FirstName}</span>
              <span>{row?.LastName}</span>
            </div>
          )}
          {tempUserEditedFields[row.UserID]?.FirstName && (
            <form
              id={`first-or-last-name-${row.UserID}`}
              className={styles.clickableInputContainer}
              onSubmit={updateEditedData(row, ['FirstName', 'LastName'])}
            >
              <TextInput
                label={t('first_name', {
                  defaultValue: 'First Name',
                  ns: 'common',
                })}
                name="FirstName"
                defaultValue={String(row?.FirstName) || ''}
                className={styles.clickableInput}
                variant={RVVariantProp.primary}
                color={RVColorProp.grayDark}
                size={RVSizeProp.small}
                disabled={
                  (tempUserEditedFields[row.UserID].FirstName?.saveStatus as boolean) ||
                  (tempUserEditedFields[row.UserID].LastName?.saveStatus as boolean)
                }
                Icon={
                  (tempUserEditedFields[row.UserID].FirstName?.saveStatus as boolean) ||
                  (tempUserEditedFields[row.UserID].LastName?.saveStatus as boolean)
                    ? LoadingSvg
                    : undefined
                }
              />
              <TextInput
                label={t('last_name', {
                  defaultValue: 'Last Name',
                  ns: 'common',
                })}
                name="LastName"
                defaultValue={String(row?.LastName) || ''}
                className={styles.clickableInput}
                variant={RVVariantProp.primary}
                color={RVColorProp.grayDark}
                size={RVSizeProp.small}
                disabled={
                  (tempUserEditedFields[row.UserID].FirstName?.saveStatus as boolean) ||
                  (tempUserEditedFields[row.UserID].LastName?.saveStatus as boolean)
                }
                Icon={
                  (tempUserEditedFields[row.UserID].FirstName?.saveStatus as boolean) ||
                  (tempUserEditedFields[row.UserID].LastName?.saveStatus as boolean)
                    ? LoadingSvg
                    : undefined
                }
              />
              <input hidden readOnly type="submit" />
            </form>
          )}
        </div>
      </>
    );
  };

export default UserManagementAdminListFullNameCell;
