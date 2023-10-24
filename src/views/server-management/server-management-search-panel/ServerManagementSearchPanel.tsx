import { FormEventHandler, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import PQueue from 'p-queue';
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

interface ServerResultEntity {
  id: string;
  title: string;
  authors: string[];
  server: { title: string };
}

export interface RVServerManagementSearchPanel {
  serversListCallback: () => Promise<RVSelectOptionItem[]>;
  addCallback: (serverID: string) => Promise<boolean>;
  serverSearchCallback: (arg: { serverID: string; query: string }) => Promise<ServerResultEntity[]>;
}

const ServerManagementSearchPanel = ({
  serversListCallback,
  addCallback,
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
        return [{ label: 'Search within all servers', value: 'all-servers' }];
      } else if (selectedServersList.length === 0) {
        return [
          { label: 'Search within all servers', value: 'all-servers' },
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
        const queue = new PQueue({ concurrency: 1, timeout: 15000 });
        const allServersSelected =
          selectedServers.length === 1 && selectedServers[0]?.value === 'all-servers';
        const callbacksList = (allServersSelected ? serversList : selectedServers).map(
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
        await queue.addAll(callbacksList, {});
      } catch (error) {
        console.log('err', { error });
      }
      setIsLoading(false);
    },
    [selectedServers, searchQuery, serversListCallback, serversList]
  );

  return (
    <div className={styles.mainContainer}>
      <EmptyState
        className={styles.resultsLayoutContainer}
        title={
          <>
            <CMServerSearch className={styles.defaultIcon} />
            <Typography type="p" color={RVColorProp.gray} className={styles.detailsBlock}>
              برای جستجو در منابع کتابخانه‌ای، ابتدا زد-سرور(های) موردنظر خود را انتخاب کنید و در
              کادر دوم یکی از سه مقدار کتاب که نتیجه دقیق‌تری به شما می‌دهد را وارد کنید.
            </Typography>
          </>
        }
      >
        <form className={styles.inputsBlock} onSubmit={onSearchSubmit}>
          <div className={styles.selectInput}>
            <Select
              placeholder={isLoadingServerList ? '' : 'choose server(s) ...'}
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
            label="Search title, creator(s) or publisher"
            variant={RVVariantProp.outline}
            color={RVColorProp.cgBlue}
            value={searchQuery}
            required
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
          <div className={styles.actionContainer}>
            <Button className={styles.actionButton} type="submit">
              <SearchSvg />
              Search
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
              {results.length} results found
            </Typography>
          )}
          {results &&
            results.length !== 0 &&
            results.map(({ server, authors, title, id }) => (
              <RowItem
                key={`row-result-${id}`}
                size={RVSizeProp.medium}
                ActionsComponent={
                  <div className={styles.rowActionsContainer}>
                    <Typography type="caption">{server?.title}</Typography>
                    <Button
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
                      Add
                    </Button>
                  </div>
                }
              >
                <div>
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
          <LoadingState />
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
