import { useState, useCallback, FunctionComponent } from 'react';
import { Button, RVSelectOptionItem, RVToast, Select } from '../../../../components';
import { RVUserManagementAdminListUserEntity } from '../UserManagementAdminList';
import styles from '../UserManagementAdminList.module.scss';
import { RVSizeProp } from '../../../../types';
import { t } from 'i18next';
import { Panel } from '../../../../layouts';
import { Trans } from 'react-i18next';

interface RVUserManagementAdminListRolePanel {
  updateUserAdminStatusCallback: (data: {
    UserID: string;
    IsSetToBeAdmin: boolean;
  }) => Promise<boolean>;
  closeModalCallback: () => void;
  user: RVUserManagementAdminListUserEntity;
}
// ;
const UserManagementAdminListRolePanel: FunctionComponent<RVUserManagementAdminListRolePanel> = ({
  user,
  updateUserAdminStatusCallback,
  closeModalCallback,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSystemAdmin, setIsSystemAdmin] = useState<boolean>(false);
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
  const setAdminStatusCallback = useCallback(async () => {
    if (!updateUserAdminStatusCallback) return;
    setIsLoading(true);
    try {
      await updateUserAdminStatusCallback({
        UserID: user.UserID,
        IsSetToBeAdmin: isSystemAdmin,
      });
    } catch (error) {
      RVToast.error('error in updating ...');
    }
    setIsLoading(false);
    closeModalCallback();
  }, [updateUserAdminStatusCallback, user]);

  return (
    <>
      <Panel
        title={t('chnage_user_role', {
          defaultValue: 'Change User Role',
          ns: 'user-management',
        })}
        size={RVSizeProp.small}
        onClose={closeModalCallback}
        className={styles.modalPanel}
      >
        <div className={styles.formContainer}>
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
              selectedOptions={selectOptions.find(
                (item) => Boolean(item.value === 'admin') === isSystemAdmin
              )}
              onChange={(selected) => {
                console.log(selected);

                setIsSystemAdmin((selected as unknown as RVSelectOptionItem).value === 'admin');
              }}
            />
          </div>
          <Button
            className={styles.conformButton}
            type="submit"
            fullWidth
            disabled={isLoading}
            onClick={setAdminStatusCallback}
          >
            <Trans ns="confirm" i18nKey="common">
              Confirm
            </Trans>
          </Button>
        </div>
      </Panel>
    </>
  );
};

export default UserManagementAdminListRolePanel;
