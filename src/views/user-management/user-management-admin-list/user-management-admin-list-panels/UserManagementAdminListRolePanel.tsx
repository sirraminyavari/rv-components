import {
  useState,
  useCallback,
  FunctionComponent,
  FormEvent,
  FormEventHandler,
  useEffect,
} from 'react';
import { Button, RVSelectOptionItem, RVToast, Select } from '../../../../components';
import { RVUserManagementAdminListUserEntity } from '../UserManagementAdminList';
import styles from '../UserManagementAdminList.module.scss';
import { RVSizeProp } from '../../../../types';
import { t } from 'i18next';
import { Panel } from '../../../../layouts';
import { Trans } from 'react-i18next';

interface RVUserManagementAdminListRolePanel {
  updateEditedData: (
    user: RVUserManagementAdminListUserEntity,
    userEntityKeys: (keyof RVUserManagementAdminListUserEntity)[]
  ) => (e: FormEvent<HTMLFormElement>) => Promise<void>;
  setEditableItem: (
    user: RVUserManagementAdminListUserEntity,
    userEntityKey: keyof RVUserManagementAdminListUserEntity,
    saveStatus?: boolean,
    clear?: boolean
  ) => void;
  closeModalCallback: () => void;
  loadDataCallback: (reset?: boolean | undefined) => void;

  user: RVUserManagementAdminListUserEntity;
}
// ;
const UserManagementAdminListRolePanel: FunctionComponent<RVUserManagementAdminListRolePanel> = ({
  user,
  setEditableItem,
  updateEditedData,
  closeModalCallback,
  loadDataCallback,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSystemAdmin, setIsSystemAdmin] = useState<boolean>(user.IsSystemAdmin || false);
  const selectOptions = [
    {
      label: t('admin', {
        defaultValue: 'Admin',
        ns: 'common',
      }),
      value: 'admin',
    },
    {
      label: t('user', {
        defaultValue: 'User',
        ns: 'common',
      }),
      value: 'user',
    },
  ];
  useEffect(() => {
    setEditableItem(user, 'IsSystemAdmin');

    return () => {
      setEditableItem(user, 'IsSystemAdmin', undefined, true);
    };
  }, []);

  const setAdminStatusCallback: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      if (!updateEditedData) return;
      setIsLoading(true);
      try {
        await updateEditedData(user, ['IsSystemAdmin'])(e);
      } catch (error) {
        RVToast.error('error in updating ...');
      }
      setIsLoading(false);
      closeModalCallback();
    },
    [updateEditedData, loadDataCallback, isSystemAdmin, user]
  );

  return (
    <>
      <Panel
        title={t('change_user_role', {
          defaultValue: 'Change User Role',
          ns: 'user-management',
        })}
        size={RVSizeProp.small}
        onClose={closeModalCallback}
        className={styles.modalPanel}
      >
        <form onSubmit={setAdminStatusCallback} className={styles.formContainer}>
          <div className={styles.modalInputContainer}>
            <Select
              placeholder={t('role', {
                defaultValue: 'Role',
                ns: 'common',
              })}
              options={selectOptions}
              className={styles.modalSelectInput}
              pageSize={320}
              fullWidth
              name="IsSystemAdmin"
              // value={isSystemAdmin ? 'admin' : 'user'}
              selectedOptions={selectOptions.find(
                (item) => Boolean(item.value === 'admin') === isSystemAdmin
              )}
              onChange={(selected) => {
                setIsSystemAdmin((selected as unknown as RVSelectOptionItem).value === 'admin');
              }}
            />
          </div>
          <Button className={styles.conformButton} type="submit" fullWidth disabled={isLoading}>
            <Trans ns="common" i18nKey="confirm">
              Confirm
            </Trans>
          </Button>
        </form>
      </Panel>
    </>
  );
};

export default UserManagementAdminListRolePanel;
