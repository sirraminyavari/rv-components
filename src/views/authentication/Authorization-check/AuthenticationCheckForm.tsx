import { FormEventHandler, FunctionComponent, useCallback, useState } from 'react';
import { Avatar, Button, TextInput, RVToast, Typography, ButtonGroup } from '../../../components';
import styles from './AuthenticationCheck.module.scss';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../../types';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
import { LoadingSvg } from '../../../icons';
import clsx from 'clsx';

export interface RVAuthenticationCheckForm {
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the layout to protect the passed child components or not */
  authorizationRequired?: boolean;
  /** panel's user info (default:undefined) */
  userData: {
    AvatarImage?: string;
    FirstName?: string;
    LastName?: string;
    UserName?: string;
  };
  /** re-authentication api call to verify user password */
  authorizationCheckCallback: (data: { Password: string }) => Promise<boolean>;
  cancelCallback?: () => void;
  setIsAuthorizedCallback: (isAuthorized: boolean) => void;
}
const AuthenticationCheckForm: FunctionComponent<RVAuthenticationCheckForm> = ({
  userData,
  authorizationCheckCallback,
  cancelCallback,
  setIsAuthorizedCallback,
  color = RVColorProp.cgBlue,
}) => {
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (!authorizationCheckCallback) return;
        setIsLoading(true);
        const result = await authorizationCheckCallback({ Password: passwordInput });
        if (result) setIsAuthorizedCallback(true);
        else throw new Error('');
      } catch (error) {
        RVToast.error(
          t('password_invalid', {
            defaultValue: 'Entered password is invalid!',
            ns: 'common',
          })
        );
      }
      setIsLoading(false);
    },
    [passwordInput]
  );
  return (
    <>
      <form className={clsx(color, styles.form)} onSubmit={onSubmit}>
        {userData?.AvatarImage && <Avatar src={userData.AvatarImage} />}

        {(userData?.FirstName || userData?.LastName) && (
          <Typography className={styles.fullNameLabel} type="H4">
            {userData?.FirstName} {userData?.LastName}
          </Typography>
        )}
        {userData?.UserName && (
          <Typography className={styles.usernameLabel} type="H4" dir="ltr">
            @{userData.UserName}
          </Typography>
        )}
        <Typography className={styles.formDescription} type="H5">
          <Trans ns="common" i18nKey="confirm">
            The requested page is password protected. please confirm your account password to
            continue.
          </Trans>
        </Typography>

        <TextInput
          size={RVSizeProp.small}
          variant={RVVariantProp.outline}
          color={color}
          name="password"
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          fullWidth
          label={t('password', {
            defaultValue: 'Password',
            ns: 'common',
          })}
        />
        <ButtonGroup fullWidth>
          {cancelCallback && (
            <Button
              fullWidth
              color={RVColorProp.crayola}
              variant={RVVariantProp.white}
              size={RVSizeProp.medium}
              type="button"
              onClick={cancelCallback}
            >
              <Trans ns="common" i18nKey="cancel">
                Cancel
              </Trans>
            </Button>
          )}
          <Button
            fullWidth
            color={color}
            variant={RVVariantProp.white}
            size={RVSizeProp.medium}
            type="submit"
            disabled={isLoading}
          >
            <Trans ns="common" i18nKey="confirm">
              Confirm
            </Trans>
            {isLoading && <LoadingSvg />}
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export default AuthenticationCheckForm;
