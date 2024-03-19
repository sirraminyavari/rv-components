import { useState, useCallback, FunctionComponent } from 'react';
import { Avatar, Button, CopyToClipboard, RVToast, Typography } from '../../../../components';
import { RVUserManagementAdminListUserEntity } from '../UserManagementAdminList';
import styles from '../UserManagementAdminList.module.scss';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../../../types';
import { t } from 'i18next';
import { Panel } from '../../../../layouts';
import { Trans } from 'react-i18next';
import { LockOpenedSvg } from '../../../../icons';
import clsx from 'clsx';

interface RVUserManagementAdminListResetPasswordPanel {
  setUserRandomPasswordCallback: (data: { UserID: string }) => Promise<{ Password: string }>;
  closeModalCallback: () => void;
  user: RVUserManagementAdminListUserEntity;
}
// ;
const UserManagementAdminListResetPasswordPanel: FunctionComponent<
  RVUserManagementAdminListResetPasswordPanel
> = ({ user, setUserRandomPasswordCallback, closeModalCallback }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string | void>();

  const setAdminStatusCallback = useCallback(async () => {
    if (!setUserRandomPasswordCallback) return;
    setIsLoading(true);
    try {
      const { Password } = await setUserRandomPasswordCallback({
        UserID: user.UserID,
      });
      setPassword(Password);
    } catch (error) {
      RVToast.error('error in updating ...');
    }
    setIsLoading(false);
  }, [setUserRandomPasswordCallback, user]);

  return (
    <>
      <Panel
        title={t('reset_user_password', {
          defaultValue: 'Reset User Password',
          ns: 'user-management',
        })}
        size={RVSizeProp.small}
        onClose={closeModalCallback}
        className={styles.modalPanel}
      >
        <div className={styles.formContainer}>
          <div className={styles.userSummeryContainer}>
            <Avatar
              src={String(user?.ProfileImageURL)}
              size={RVSizeProp.medium}
              variant={RVVariantProp.outline}
            >
              {user.IsLockedOut && (
                <LockOpenedSvg className={clsx(styles.lockIcon, RVColorProp.crayola)} />
              )}
            </Avatar>

            <Typography type="H3">
              {user?.FirstName} {user?.LastName}
            </Typography>
          </div>
          {password ? (
            <div className={styles.newPasswordBlock}>
              <Typography
                className={styles.newPasswordTitle}
                type="H5"
                color={RVColorProp.grayDark}
              >
                <Trans ns="common" i18nKey="new_password">
                  new password
                </Trans>
                :
              </Typography>
              <div className={styles.passwordContainer}>
                <CopyToClipboard clipboardContext={password} variant={RVVariantProp.white}>
                  <code>{password}</code>
                </CopyToClipboard>
              </div>
            </div>
          ) : (
            <Button
              className={styles.conformButton}
              type="submit"
              fullWidth
              disabled={isLoading}
              onClick={setAdminStatusCallback}
            >
              <Trans ns="common" i18nKey="confirm">
                Confirm
              </Trans>
            </Button>
          )}
        </div>
      </Panel>
    </>
  );
};

export default UserManagementAdminListResetPasswordPanel;
