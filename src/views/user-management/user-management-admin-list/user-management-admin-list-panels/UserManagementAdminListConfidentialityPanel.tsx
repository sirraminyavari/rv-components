import {
  useState,
  useCallback,
  FunctionComponent,
  useEffect,
  FormEvent,
  FormEventHandler,
} from 'react';
import { Button, RVSelectOptionItem, RVToast, Select } from '../../../../components';
import { RVUserManagementAdminListUserEntity } from '../UserManagementAdminList';
import styles from '../UserManagementAdminList.module.scss';
import { RVSizeProp } from '../../../../types';
import { t } from 'i18next';
import { Panel } from '../../../../layouts';
import { Trans } from 'react-i18next';

interface RVUserManagementAdminListConfidentialityPanel {
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
  confidentialityLevels?: RVSelectOptionItem[];
  closeModalCallback: () => void;
  loadDataCallback: (reset?: boolean | undefined) => void;

  user: RVUserManagementAdminListUserEntity;
}
// ;
const UserManagementAdminListConfidentialityPanel: FunctionComponent<
  RVUserManagementAdminListConfidentialityPanel
> = ({
  user,
  confidentialityLevels,
  setEditableItem,
  updateEditedData,
  loadDataCallback,
  closeModalCallback,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedConfidentialityID, setSelectedConfidentialityID] = useState<string>();
  const setUserConfidentialityCallback: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      if (!updateEditedData) return;
      setIsLoading(true);
      try {
        await updateEditedData(user, ['Confidentiality'])(e);
      } catch (error) {
        RVToast.error('error in updating ...');
      }
      setIsLoading(false);
      closeModalCallback();
    },
    [updateEditedData, loadDataCallback, user, selectedConfidentialityID]
  );

  useEffect(() => {
    setSelectedConfidentialityID(user.Confidentiality?.ID);
  }, [user]);

  useEffect(() => {
    setEditableItem(user, 'Confidentiality');

    return () => {
      setEditableItem(user, 'Confidentiality', undefined, true);
    };
  }, []);

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
        <form onSubmit={setUserConfidentialityCallback} className={styles.formContainer}>
          <div className={styles.modalInputContainer}>
            <Select
              placeholder={t('user_confidentiality_placeholder', {
                defaultValue: 'User Confidentiality ...',
                ns: 'user-management',
              })}
              options={confidentialityLevels}
              className={styles.modalSelectInput}
              pageSize={320}
              name="Confidentiality"
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

export default UserManagementAdminListConfidentialityPanel;
