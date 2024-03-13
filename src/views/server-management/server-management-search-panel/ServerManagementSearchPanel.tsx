import { FormEventHandler, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import * as Queue from 'p-queue';
import CMServerSearch from '../../../icons/cm-server-search.svg';
import SearchSvg from '../../../icons/search.svg';
import {
  Button,
  RVSelectOptionItem,
  Scrollbar,
  Select,
  SideMenu,
  Skeleton,
  TextInput,
  Typography,
} from '../../../components';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../../types';
import { EmptyState } from '../../../layouts/EmptyState';
import styles from './ServerManagementSearchPanel.module.scss';
import { RowItem } from '../../../layouts';
import ListItemSvg from '../../../icons/listItem.svg';
import { ServerManagementEmptyState } from '../server-management-empty-state';
import { Trans } from 'react-i18next';
import { t } from 'i18next';

interface ServerResultEntity {
  id: string;
  title: string;
  authors: string[];
  server: { title: string };
  details?: Record<string, string | number | null>;
}

export interface RVServerManagementSearchPanel {
  serversListCallback: () => Promise<RVSelectOptionItem[]>;
  addCallback: (selectedItemID: string) => Promise<boolean>;
  detailsCallback: (serverItem: ServerResultEntity) => Promise<boolean>;
  serverSearchCallback: (arg: { serverID: string; query: string }) => Promise<ServerResultEntity[]>;
}

const ServerManagementSearchPanel = ({
  serversListCallback,
  addCallback,
  detailsCallback,
  serverSearchCallback,
}: RVServerManagementSearchPanel) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingServerList, setIsLoadingServerList] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<ServerResultEntity[]>();
  const [serversList, setServersList] = useState<RVSelectOptionItem[]>();
  const [selectedServers, setSelectedServers] = useState<Exclude<typeof serversList, undefined>>(
    []
  );
  useEffect(() => {
    (async () => {
      setIsLoadingServerList(true);
      const servers = await serversListCallback();
      setServersList(servers);
      setIsLoadingServerList(false);
    })();
  }, [serversListCallback]);

  const selectInputServersList = useCallback(
    (selectedServersList: typeof selectedServers) => {
      let isAllSelected: boolean = false;
      selectedServersList.forEach(({ value }) => {
        if (value === 'all-servers') isAllSelected = true;
      });

      if (isAllSelected) {
        return [
          {
            label: t('search_panel_all_servers_option', {
              defaultValue: 'Search all servers',
              ns: 'server-management',
              count: serversList?.length,
            }),
            value: 'all-servers',
          },
        ];
      } else if (selectedServersList.length === 0) {
        return [
          {
            label: t('search_panel_all_servers_option', {
              defaultValue: 'Search all servers',
              ns: 'server-management',
              count: serversList?.length,
            }),
            value: 'all-servers',
          },
          ...(serversList || []),
        ];
      } else return [...(serversList || [])];
    },
    [serversList]
  );

  const onSearchSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      setOpenSidebar(true);
      setIsLoading(true);

      try {
        if (!serversList) throw new Error('no selected servers!');
        setResults([]);
        const queue = new Queue.default({ concurrency: 1, timeout: 15000 });
        const allServersSelected =
          selectedServers.length === 1 && selectedServers[0]?.value === 'all-servers';
        const searchCallbacks = (allServersSelected ? serversList : selectedServers).map(
          ({ value }) => {
            return async () => {
              const serverResult = await serverSearchCallback({
                serverID: String(value),
                query: searchQuery,
              });
              setResults((prev = []) => [...prev, ...serverResult]);
            };
          }
        );

        await queue.addAll(searchCallbacks);
      } catch (error) {
        console.log('err', { error });
      }
      setIsLoading(false);
    },
    [selectedServers, searchQuery, serversListCallback, JSON.stringify(serversList)]
  );

  return (
    <div className={styles.mainContainer}>
      <EmptyState
        className={styles.resultsLayoutContainer}
        title={
          <>
            <CMServerSearch className={styles.defaultIcon} />
            <Typography type="p" color={RVColorProp.gray} className={styles.detailsBlock}>
              <Trans ns="server-management" i18nKey="search_panel_title">
                To search in library resources, choose a Z-Server and enter either the title,
                creator(s), or publisher.
              </Trans>
            </Typography>
          </>
        }
      >
        <form className={styles.inputsBlock} onSubmit={onSearchSubmit}>
          <div className={styles.selectInput}>
            <Select
              placeholder={
                isLoadingServerList
                  ? ''
                  : t('search_panel_server_select_placeholder', {
                      defaultValue: 'choose server(s) ...',
                      ns: 'server-management',
                      count: serversList?.length,
                    })
              }
              fullWidth
              options={selectInputServersList(selectedServers)}
              isMulti
              onChange={(selected) => {
                setSelectedServers(selected);
              }}
              isLoading={isLoadingServerList}
              loadingMessage={isLoadingServerList ? () => <Skeleton count={5} /> : undefined}
            />
          </div>
          <TextInput
            label={t('search_panel_server_query_placeholder', {
              defaultValue: 'Search title, creator(s) or publisher',
              ns: 'server-management',
              count: serversList?.length,
            })}
            className={styles.searchInput}
            variant={RVVariantProp.outline}
            color={RVColorProp.cgBlue}
            value={searchQuery}
            required
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
          <div className={styles.actionContainer}>
            <Button className={styles.actionButton} type="submit">
              <SearchSvg />
              <Trans ns="common" i18nKey="search">
                Search
              </Trans>
            </Button>
          </div>
        </form>
      </EmptyState>
      <SideMenu
        open={openSidebar}
        className={clsx(styles.sidebar)}
        color={RVColorProp.inherit}
        width="65vw"
      >
        <Scrollbar
          asPanel
          contentContainerClassName={clsx(
            styles.resultsPanel,
            (results === undefined || results.length === 0) && !isLoading && styles.emptyState
          )}
        >
          {(results === undefined || results.length === 0) && !isLoading && (
            <ServerManagementEmptyState />
          )}
          {results && results.length !== 0 && (
            <Typography
              type="caption"
              color={RVColorProp.gray}
              className={styles.resultCountCaption}
            >
              <Trans ns="common" i18nKey="result_found" count={results.length}>
                {{ count: results.length }} results found
              </Trans>
            </Typography>
          )}
          {results &&
            results.length !== 0 &&
            results.map(({ server, authors, title, id, details }) => (
              <RowItem
                key={`row-result-${id}`}
                size={RVSizeProp.medium}
                ActionsComponent={
                  <div className={styles.rowActionsContainer}>
                    <Typography type="caption">{server?.title}</Typography>
                    <Button
                      onClick={() => detailsCallback({ server, authors, title, id, details })}
                      variant={RVVariantProp.white}
                      color={RVColorProp.crayola}
                      fullCircle
                      rounded="half"
                    >
                      <ListItemSvg />
                    </Button>
                    <Button
                      variant={RVVariantProp.outline}
                      className={styles.actionButton}
                      onClick={() => addCallback(id)}
                    >
                      <Trans ns="common" i18nKey="add">
                        Add
                      </Trans>
                    </Button>
                  </div>
                }
              >
                <div className={styles.resultTitleContainer}>
                  <Typography type="H4" className={styles.resultTitle}>
                    {title}
                  </Typography>
                  <ul className={styles.resultAuthors}>
                    {authors.map((author) => (
                      <li key={`row-result-author-${author}`}>
                        <Typography
                          type="p"
                          color={RVColorProp.gray}
                          className={styles.resultTitle}
                        >
                          {author}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              </RowItem>
            ))}

          {isLoading && <LoadingState />}
        </Scrollbar>
      </SideMenu>
    </div>
  );
};

export default ServerManagementSearchPanel;

const LoadingState = () => {
  return (
    <div className={styles.LoadingPreviewContainer}>
      {new Array(4).fill(0).map((_, idx) => {
        return (
          <Skeleton
            key={`preview-items-loading-state-${idx}`}
            inline
            className={styles.loadingStateIcon}
            wrapper={({ children }) => (
              <Typography type="H4" className={styles.loadingStateLabel} color={RVColorProp.gray}>
                {children}
              </Typography>
            )}
          />
        );
      })}
    </div>
  );
};
