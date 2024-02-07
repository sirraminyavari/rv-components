import { useState, useCallback, FunctionComponent, useEffect } from 'react';
import { Button, RVSelectOptionItem, RVToast, Select } from '../../../../components';
import {
  RVUserManagementAdminList,
  RVUserManagementAdminListUserEntity,
} from '../UserManagementAdminList';
import styles from '../UserManagementAdminList.module.scss';
import { RVSizeProp } from '../../../../types';
import { t } from 'i18next';
import { Panel } from '../../../../layouts';
import { Trans } from 'react-i18next';

interface RVUserManagementAdminListConfidentialityPanel {
  updateUserDataCallback: RVUserManagementAdminList['updateUserDataCallback'];
  confidentialityLevels?: RVSelectOptionItem[];
  closeModalCallback: () => void;
  user: RVUserManagementAdminListUserEntity;
}
// ;
const UserManagementAdminListConfidentialityPanel: FunctionComponent<
  RVUserManagementAdminListConfidentialityPanel
> = ({ user, confidentialityLevels, updateUserDataCallback, closeModalCallback }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedConfidentialityID, setSelectedConfidentialityID] = useState<string>();
  const setUserConfidentialityCallback = useCallback(async () => {
    if (!updateUserDataCallback) return;
    setIsLoading(true);
    try {
      await updateUserDataCallback({
        UserID: user.UserID,
        Confidentiality: selectedConfidentialityID,
      });
    } catch (error) {
      RVToast.error('error in updating ...');
    }
    setIsLoading(false);
    closeModalCallback();
  }, [updateUserDataCallback, user]);
  useEffect(() => {
    setSelectedConfidentialityID(user.Confidentiality?.ID);
  }, [user]);

  return (
    <>
      <Panel
        title={t('chnage_user_confidentiality', {
          defaultValue: 'Change User Confidentiality',
          ns: 'user-management',
        })}
        size={RVSizeProp.small}
        onClose={closeModalCallback}
        className={styles.modalPanel}
      >
        <div className={styles.formContainer}>
          <div className={styles.modalInputContainer}>
            <Select
              placeholder={t('user_confidentiality_placeholder', {
                defaultValue: 'User Confidentiality ...',
                ns: 'user-management',
              })}
              options={confidentialityLevels}
              className={styles.modalSelectInput}
              pageSize={320}
              fullWidth
              selectedOptions={confidentialityLevels?.find(
                (item) => item.value === selectedConfidentialityID
              )}
              onChange={(selected) => {
                setSelectedConfidentialityID(
                  (selected as unknown as RVSelectOptionItem).value as string
                );
              }}
            />
          </div>
          <Button
            className={styles.conformButton}
            type="submit"
            fullWidth
            disabled={isLoading}
            onClick={setUserConfidentialityCallback}
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

export default UserManagementAdminListConfidentialityPanel;
