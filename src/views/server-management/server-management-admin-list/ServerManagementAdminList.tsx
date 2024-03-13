import { useCallback, useEffect, useState } from 'react';
import TrashSvg from '../../../icons/trash.svg';
import { Button, Scrollbar, Skeleton, Typography } from '../../../components';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../../types';
import styles from './ServerManagementAdminList.module.scss';
import { RowItem } from '../../../layouts';
import { ServerManagementEmptyState } from '../server-management-empty-state';
import clsx from 'clsx';
import { Trans } from 'react-i18next';

export interface RVServerManagementAdminList {
  serversListCallback: () => Promise<{ id: string; label: string; details?: string }[]>;
  editCallback: (serverID: string) => Promise<boolean>;
  removeCallback: (serverID: string) => Promise<boolean>;
}

const ServerManagementAdminList = ({
  serversListCallback,
  editCallback,
  removeCallback,
}: RVServerManagementAdminList) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serversList, setServersList] =
    useState<{ label: string; id: string; details?: string }[]>();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setServersList([]);
      const servers = await serversListCallback();
      setServersList(servers);
      setIsLoading(false);
    })();
  }, [serversListCallback]);

  const onServerRemove = useCallback(async (id: string) => {
    try {
      await removeCallback(id);
      const servers = await serversListCallback();
      setServersList(servers);
    } catch (error) {}
  }, []);

  return (
    <>
      <Scrollbar
        asPanel
        className={styles.mainContainer}
        contentContainerClassName={clsx(
          styles.resultsPanel,
          (serversList === undefined || serversList.length === 0) && !isLoading && styles.emptyState
        )}
      >
        {isLoading && <LoadingState />}
        {(serversList === undefined || serversList.length === 0) && !isLoading && (
          <ServerManagementEmptyState />
        )}
        {serversList && serversList.length !== 0 && (
          <Typography type="caption" color={RVColorProp.gray} className={styles.resultCountCaption}>
            <Trans ns="common" i18nKey="result_found" count={serversList.length}>
              {{ count: serversList.length }} results found
            </Trans>
          </Typography>
        )}
        {serversList &&
          serversList.length !== 0 &&
          serversList.map(({ id, label, details }) => (
            <RowItem
              key={`row-result-${id}`}
              size={RVSizeProp.medium}
              ActionsComponent={
                <div className={styles.rowActionsContainer}>
                  <Button
                    variant={RVVariantProp.white}
                    color={RVColorProp.crayola}
                    className={styles.actionIconButton}
                    fullCircle
                    rounded="half"
                    onClick={() => onServerRemove(id)}
                  >
                    <TrashSvg />
                  </Button>
                  <Button
                    variant={RVVariantProp.outline}
                    className={styles.actionButton}
                    onClick={() => editCallback(id)}
                  >
                    <Trans ns="common" i18nKey="edit">
                      Edit
                    </Trans>
                  </Button>
                </div>
              }
            >
              <div className={styles.resultTitleContainer}>
                <Typography type="H4" className={styles.resultTitle}>
                  {label}
                </Typography>
                {details && <span className={styles.resultTitleInfo}>{details}</span>}
              </div>
            </RowItem>
          ))}
      </Scrollbar>
    </>
  );
};

export default ServerManagementAdminList;

const LoadingState = () => {
  return (
    <div className={styles.LoadingPreviewContainer}>
      {new Array(4).fill(0).map((_, idx) => {
        return (
          <Skeleton
            key={`preview-items-loading-state-${idx}`}
            inline
            wrapper={({ children }) => (
              <>
                <Typography type="H4" className={styles.loadingStateLabel} color={RVColorProp.gray}>
                  <Skeleton className={styles.loadingStateIcon} />
                  {children}
                </Typography>
              </>
            )}
          />
        );
      })}
    </div>
  );
};
