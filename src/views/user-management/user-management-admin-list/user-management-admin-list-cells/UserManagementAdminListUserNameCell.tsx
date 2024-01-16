import type { CellContext } from '@tanstack/react-table';
import type { FormEvent, ReactNode } from 'react';
import type {
  RVUserManagementAdminList,
  RVUserManagementAdminListUserEntity,
} from '../UserManagementAdminList';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../../../types';
import { LoadingSvg } from '../../../../icons';
import { TextInput } from '../../../../components';
import { t } from 'i18next';
import styles from '../UserManagementAdminList.module.scss';

interface RVUserManagementAdminListUserNameCell {
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
}
// ;
const UserManagementAdminListUserNameCell =
  ({
    cell,
    setEditableItem,
    tempUserEditedFields,
    updateEditedData,
  }: RVUserManagementAdminListUserNameCell) =>
  () => {
    const row = cell.getValue() as
      | Awaited<ReturnType<RVUserManagementAdminList['loadAllUsersDataCallback']>>['Users'][0];
    return (
      <>
        <>
          {typeof tempUserEditedFields[row.UserID]?.UserName === 'undefined' && (
            <span
              onDoubleClick={() => {
                setEditableItem(row, 'UserName');
              }}
            >
              {row?.UserName}
            </span>
          )}
          {tempUserEditedFields[row.UserID]?.UserName && (
            <form
              id={`username-${row.UserID}`}
              className={styles.clickableInputContainer}
              onSubmit={updateEditedData(row, ['UserName'])}
            >
              <TextInput
                label={t('user_name', {
                  defaultValue: 'Username',
                  ns: 'common',
                })}
                name="UserName"
                defaultValue={String(row?.UserName) || ''}
                className={styles.clickableInput}
                variant={RVVariantProp.primary}
                color={RVColorProp.grayDark}
                size={RVSizeProp.small}
                disabled={tempUserEditedFields[row.UserID].UserName?.saveStatus as boolean}
                Icon={
                  (tempUserEditedFields[row.UserID].UserName?.saveStatus as boolean)
                    ? LoadingSvg
                    : undefined
                }
              />
            </form>
          )}
        </>
      </>
    );
  };

export default UserManagementAdminListUserNameCell;
