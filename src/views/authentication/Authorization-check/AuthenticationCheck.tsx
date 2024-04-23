import { FunctionComponent, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import styles from './AuthenticationCheck.module.scss';
import { RVColorProp } from '../../../types';
import clsx from 'clsx';
import AuthenticationCheckForm, { RVAuthenticationCheckForm } from './AuthenticationCheckForm';

export interface RVAuthenticationCheck extends RVAuthenticationCheckForm {
  /** set the component to be a fixed blocking view (default:true)*/
  noFullscreen?: boolean;
}
const AuthenticationCheck: FunctionComponent<PropsWithChildren<RVAuthenticationCheck>> = ({
  authorizationRequired,
  userData,
  authorizationCheckCallback,
  setIsAuthorizedCallback = () => {},
  cancelCallback,
  color = RVColorProp.cgBlue,
  noFullscreen,
  children,
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>();

  const setAuthorizationStatus: RVAuthenticationCheck['setIsAuthorizedCallback'] = useCallback(
    (status) => {
      setIsAuthorized(status);
      if (setIsAuthorizedCallback) setIsAuthorizedCallback(status);
    },
    []
  );

  useEffect(() => {
    if (typeof authorizationRequired === 'boolean') setAuthorizationStatus(!authorizationRequired);
  }, [authorizationRequired]);

  if (isAuthorized === undefined) return <></>;
  return (
    <>
      {!isAuthorized ? (
        <div className={clsx(color, styles.container, !noFullscreen && styles.fullscreen)}>
          <AuthenticationCheckForm
            authorizationCheckCallback={authorizationCheckCallback}
            authorizationRequired={authorizationRequired}
            cancelCallback={cancelCallback}
            setIsAuthorizedCallback={setAuthorizationStatus}
            userData={userData}
            color={color}
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default AuthenticationCheck;
