import { FormEvent, FunctionComponent, useCallback, useState } from 'react';
import { Button, RVSelectOptionItem, RVToast, Select, TextInput } from '../../../../components';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../../../types';

import { Trans } from 'react-i18next';
import { Panel } from '../../../../layouts';
import { t } from 'i18next';
import styles from '../UserManagementAdminList.module.scss';

export interface RVUserManagementAdminListCreateUser {
  confidentialityLevels?: RVSelectOptionItem[];
  createNewUserCallback?: (data: {
    UserName?: string;
    FirstName?: string;
    LastName?: string;
    IsSystemAdmin?: boolean;
    confidentialityLevelID?: string;
  }) => Promise<{ status: boolean; message?: string }>;
  closeModalCallback: () => void;
}

const UserManagementAdminListCreateUser: FunctionComponent<RVUserManagementAdminListCreateUser> = ({
  confidentialityLevels,
  createNewUserCallback,
  closeModalCallback,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confidentialityLevel, setConfidentialityLevel] = useState<string>();
  const [isSystemAdmin, setIsSystemAdmin] = useState<boolean>(false);

  const onFormSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!createNewUserCallback) return closeModalCallback();
      setIsLoading(true);
      const formData = new FormData(e.currentTarget || (e.target as HTMLFormElement));

      setIsLoading(false);
      try {
        const status = await createNewUserCallback({
          FirstName: formData.get('FirstName') as string | undefined,
          LastName: formData.get('LastName') as string | undefined,
          UserName: formData.get('UserName') as string | undefined,
          IsSystemAdmin: isSystemAdmin,
          confidentialityLevelID: confidentialityLevel,
        });

        if (status.status) {
          RVToast.success(status.message);
        } else {
          RVToast.error(status.message);
        }
      } catch (error) {
        RVToast.error((error as Error).message);
      }
      setIsLoading(false);
      closeModalCallback();
    },
    [confidentialityLevel, isSystemAdmin]
  );

  return (
    <>
      <Panel
        title={t('create_new_user', {
          defaultValue: 'Create New User',
          ns: 'user-management',
        })}
        size={RVSizeProp.small}
        onClose={closeModalCallback}
        className={styles.modalPanel}
      >
        <form className={styles.formContainer} onSubmit={onFormSubmit}>
          <div className={styles.modalInputContainer}>
            <TextInput
              id="first-name-input"
              label={t('first_name', {
                defaultValue: 'First name',
                ns: 'common',
              })}
              name="FirstName"
              size={RVSizeProp.small}
              variant={RVVariantProp.outline}
              color={RVColorProp.cgBlue}
              className={styles.modalTextInput}
            />
          </div>
          <div className={styles.modalInputContainer}>
            <TextInput
              id="last-name-input"
              label={t('last_name', {
                defaultValue: 'Last name',
                ns: 'common',
              })}
              name="LastName"
              size={RVSizeProp.small}
              variant={RVVariantProp.outline}
              color={RVColorProp.cgBlue}
              className={styles.modalTextInput}
            />
          </div>
          <div className={styles.modalInputContainer}>
            <TextInput
              id="user-name-input"
              label={t('user_name', {
                defaultValue: 'Username',
                ns: 'common',
              })}
              name="UserName"
              size={RVSizeProp.small}
              variant={RVVariantProp.outline}
              color={RVColorProp.cgBlue}
              className={styles.modalTextInput}
            />
          </div>
          <div className={styles.modalInputContainer}>
            <Select
              placeholder={t('access_level', {
                defaultValue: 'Access level',
                ns: 'common',
              })}
              options={confidentialityLevels}
              className={styles.modalSelectInput}
              pageSize={320}
              fullWidth
              onChange={(selected) => {
                setConfidentialityLevel(
                  (selected as unknown as RVSelectOptionItem).value as string
                );
              }}
            />
          </div>
          <div className={styles.modalInputContainer}>
            <Select
              placeholder={t('role', {
                defaultValue: 'Role',
                ns: 'common',
              })}
              options={[
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
              ]}
              className={styles.modalSelectInput}
              pageSize={320}
              fullWidth
              onChange={(selected) => {
                setIsSystemAdmin((selected as unknown as RVSelectOptionItem).value === 'admin');
              }}
            />
          </div>
          <Button className={styles.conformButton} type="submit" fullWidth disabled={isLoading}>
            {isLoading ? (
              <Trans ns="creating_new_user" i18nKey="common">
                creating new user ...
              </Trans>
            ) : (
              <Trans ns="confirm" i18nKey="common">
                Confirm
              </Trans>
            )}
          </Button>
        </form>
      </Panel>
    </>
  );
};

export default UserManagementAdminListCreateUser;
