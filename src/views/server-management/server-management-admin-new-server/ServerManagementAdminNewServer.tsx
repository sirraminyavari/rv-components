import PlusCircleSvg from '../../../icons/plusCircle.svg';
import styles from './ServerManagementAdminNewServer.module.scss';
import clsx from 'clsx';
import {
  Button,
  ButtonGroup,
  RVTextInput,
  Scrollbar,
  TextInput,
  Typography,
} from '../../../components';
import { RVColorProp, RVVariantProp } from '../../../types';
import { FormEventHandler, useCallback, useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import { PenSvg } from '../../../icons';
import { t } from 'i18next';

interface ServerEntity {
  title: string;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
}

export interface RVServerManagementAdminNewServer {
  modalView?: boolean;
  onSubmitCallback: (newServer: ServerEntity) => Promise<string>;
  onCancelCallback?: () => void;
  connectionTestCallback?: (serverDetails: ServerEntity) => Promise<boolean>;
  initialData?: Partial<ServerEntity>;
}

const ServerManagementAdminNewServer = ({
  modalView,
  onSubmitCallback,
  onCancelCallback,
  connectionTestCallback,
  initialData,
}: RVServerManagementAdminNewServer) => {
  const [newServerData, setNewServerData] = useState<ServerEntity>({
    password: '',
    username: '',
    title: '',
    host: '',
    port: '',
    database: '',
  });
  const [isConnectionTestLoading, setIsConnectionTestLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | void>();
  const [connectionTestResult, setConnectionTestResult] = useState<
    void | 'successful' | 'failure'
  >();
  const onInputChange: RVTextInput['onChange'] = (e) => {
    setNewServerData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onFormSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmitError();
      setConnectionTestResult();
      try {
        const resultMessage = await onSubmitCallback(newServerData);
        setSubmitError(resultMessage);
      } catch (error) {
        setSubmitError((error as Error).message);
      }
    },
    [onSubmitCallback, newServerData]
  );
  const onTestConnectionSubmit = useCallback(async () => {
    if (!connectionTestCallback) return;
    setConnectionTestResult();
    setSubmitError();
    setIsConnectionTestLoading(true);
    try {
      const testResult = await connectionTestCallback(newServerData);
      setConnectionTestResult(testResult ? 'successful' : 'failure');
    } catch (error) {
      setConnectionTestResult('failure');
    }

    setIsConnectionTestLoading(false);
  }, [connectionTestCallback, newServerData]);

  const connectionResultText = useMemo(() => {
    switch (connectionTestResult) {
      case 'failure':
        return t('server_connection_test_failure', {
          defaultValue: 'Can not establish connection to the provided server!',
          ns: 'server-management',
        });
      case 'successful':
        return t('server_connection_test_successful', {
          defaultValue: 'Server is ready to be created',
          ns: 'server-management',
        });
      default:
        return '';
    }
  }, [connectionTestResult]);
  return (
    <Scrollbar
      className={styles.scrollbarContainer}
      contentContainerClassName={clsx(styles.container)}
      asPanel={modalView}
    >
      {initialData ? (
        <PenSvg outline className={clsx(RVColorProp.gray, styles.icon)} />
      ) : (
        <PlusCircleSvg outline className={clsx(RVColorProp.gray, styles.icon)} />
      )}

      <Typography type="H1" color={RVColorProp.gray}>
        <Trans
          ns="server-management"
          i18nKey={initialData ? 'edit_server_title' : 'new_server_title'}
        >
          {initialData ? 'Edit server' : 'New server'}
        </Trans>
      </Typography>
      <form onSubmit={onFormSubmit}>
        <div className={styles.titleInputBlock}>
          <TextInput
            defaultValue={initialData?.title}
            fullWidth
            color={RVColorProp.cgBlue}
            variant={RVVariantProp.outline}
            name="title"
            label={t('server_title_placeholder', {
              defaultValue: 'Title',
              ns: 'server-management',
            })}
            onChange={onInputChange}
          />
        </div>
        <div className={styles.inputBlock}>
          <TextInput
            defaultValue={initialData?.host}
            fullWidth
            color={RVColorProp.cgBlue}
            variant={RVVariantProp.outline}
            name="host"
            label={
              '* ' +
              t('server_host_placeholder', {
                defaultValue: 'Host',
                ns: 'server-management',
              })
            }
            type="text"
            onChange={onInputChange}
            required
          />

          <TextInput
            defaultValue={initialData?.database}
            fullWidth
            color={RVColorProp.cgBlue}
            variant={RVVariantProp.outline}
            name="database"
            label={
              '* ' +
              t('server_database_placeholder', {
                defaultValue: 'Database',
                ns: 'server-management',
              })
            }
            type="text"
            onChange={onInputChange}
            required
          />
          <TextInput
            defaultValue={initialData?.port}
            fullWidth
            color={RVColorProp.cgBlue}
            variant={RVVariantProp.outline}
            name="port"
            label={t('server_port_placeholder', {
              defaultValue: 'Port',
              ns: 'server-management',
            })}
            type="number"
            min={0}
            max={999999}
            step={1}
            onChange={onInputChange}
          />
        </div>
        <div className={styles.inputBlock}>
          <TextInput
            defaultValue={initialData?.username}
            fullWidth
            color={RVColorProp.cgBlue}
            variant={RVVariantProp.outline}
            onChange={onInputChange}
            autoComplete="off"
            name="username"
            label={t('server_username_placeholder', {
              defaultValue: 'Username',
              ns: 'server-management',
            })}
          />
          <TextInput
            defaultValue={initialData?.password}
            fullWidth
            color={RVColorProp.cgBlue}
            variant={RVVariantProp.outline}
            onChange={onInputChange}
            autoComplete="off"
            name="password"
            label={t('server_password_placeholder', {
              defaultValue: 'Password',
              ns: 'server-management',
            })}
            type="password"
          />
        </div>
        <div className={styles.actionContainer}>
          <Typography type="p" muted className={styles.actionResultText}>
            <span>{submitError}</span>
            <span>
              {isConnectionTestLoading ? (
                <Trans ns="server-management" i18nKey={'server_connection_test_loading'}>
                  Testing connection ...
                </Trans>
              ) : (
                connectionResultText
              )}
            </span>
          </Typography>
          <ButtonGroup fullWidth rounded="half">
            <Button type="submit" fullWidth disabled={isConnectionTestLoading}>
              <Trans
                ns="server-management"
                i18nKey={initialData ? 'edit_server_button' : 'add_new_server_button'}
              >
                {initialData ? 'Save' : 'Create server'}
              </Trans>
            </Button>

            {connectionTestCallback && (
              <Button
                type="button"
                variant={RVVariantProp.outline}
                fullWidth
                onClick={onTestConnectionSubmit}
                disabled={isConnectionTestLoading}
              >
                <Trans ns="server-management" i18nKey={'server_connection_test'}>
                  Test Connection
                </Trans>
              </Button>
            )}
          </ButtonGroup>
          <ButtonGroup fullWidth>
            {onCancelCallback && (
              <Button
                type="button"
                variant={RVVariantProp.outline}
                color={RVColorProp.crayola}
                fullWidth
                onClick={onCancelCallback}
              >
                <Trans ns="common" i18nKey={'cancel'}>
                  Cancel
                </Trans>
              </Button>
            )}
          </ButtonGroup>
        </div>
      </form>
    </Scrollbar>
  );
};

export default ServerManagementAdminNewServer;
