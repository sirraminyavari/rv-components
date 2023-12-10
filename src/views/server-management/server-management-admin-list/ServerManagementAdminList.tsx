import { useEffect, useState } from 'react';
import TrashSvg from '../../../icons/trash.svg';
import { Button, Scrollbar, Skeleton, Typography } from '../../../components';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../../types';
import styles from './ServerManagementAdminList.module.scss';
import { RowItem } from '../../../layouts';
import { ServerManagementEmptyState } from '../server-management-empty-state';
import clsx from 'clsx';
import { Trans } from 'react-i18next';

export interface RVServerManagementAdminList {
  serversListCallback: () => Promise<{ id: string; label: string }[]>;
  editCallback: (serverID: string) => Promise<boolean>;
  removeCallback: (serverID: string) => Promise<boolean>;
}

const ServerManagementAdminList = ({
  serversListCallback,
  editCallback,
  removeCallback,
}: RVServerManagementAdminList) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serversList, setServersList] = useState<{ label: string; id: string }[]>();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const servers = await serversListCallback();
      setServersList(servers);
      setIsLoading(false);
    })();
  }, [serversListCallback]);

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
          serversList.map(({ id, label }) => (
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
                    onClick={() => removeCallback(id)}
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
              <div>
                <Typography type="H4" className={styles.resultTitle}>
                  {label}
                </Typography>
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
