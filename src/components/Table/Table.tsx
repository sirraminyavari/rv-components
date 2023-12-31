import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type PropsWithoutRef,
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';

import { useVirtualizer } from '@tanstack/react-virtual';

import styles from './Table.module.scss';
import clsx from 'clsx';
import { CaretSvg } from '../../icons';
import Skeleton from 'react-loading-skeleton';

export interface RVTable
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color' | 'size'
  > {
  /** set between the various designs of the component (default:RVVariantProp.primary) */
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.medium) */
  size?: RVSizeProp;

  /** set Table component height (default:80dvh)*/
  tableHight?: string | number;
  /** set Table columns structure [guide](https://tanstack.com/table/v8/docs/guide/column-defs) */
  columns?: ColumnDef<Record<string, string | number | Date>>[];
  /** set Table rows data structure */
  rowsData?: Record<string, string | number | Date>[];
  /** The number of items to render above and below the visible area of Table component rows. Increasing this number will increase the amount of time it takes to render the virtualized items, but might decrease the likelihood of seeing slow-rendering blank items at the top and bottom of the virtualized items when scrolling (default: 5)*/
  overScan?: number;
  /** set Table component to have resizable columns (default: false) */
  resizable?: boolean;
  /** set Table component direction (mostly used with resizable columns enabled) */
  dir?: 'rtl' | 'ltr';
  /** set Table component to automatically detect columns and row data with infinite scroll loading pagination */
  loadTableDataCallback?: (currentPage?: number) => Promise<{
    data: Record<string, string | number | Date>[];
    totalPages: number;
  }>;
}
const Table = ({
  color = RVColorProp.cgBlue,
  variant = RVVariantProp.primary,
  size = RVSizeProp.medium,
  className,
  columns,
  tableHight = '80dvh',
  overScan = 5,
  dir = 'ltr',
  resizable = false,
  rowsData,
  loadTableDataCallback,
}: RVTable) => {
  const [tableRowsData, setTableRowsData] = useState<Record<string, string | number | Date>[]>(
    rowsData || []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(-1);
  const [totalPages, setTotalPages] = useState<number | undefined>();

  const tableColumns = useMemo<ColumnDef<Record<string, string | number | Date>>[]>(() => {
    if (columns) return columns;
    if (tableRowsData.length)
      return Object.keys(tableRowsData[0]).map((dataColumnKey) => ({
        accessorKey: dataColumnKey,
        header: dataColumnKey,
        enableResizing: resizable,
      }));
    return [];
  }, [tableRowsData, columns, currentPage, resizable]);

  const table = useReactTable({
    data: tableRowsData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: 'onChange',
    columnResizeDirection: dir,
  });

  const { rows } = table.getRowModel();

  //The virtualizer needs to know the scrollable container element
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33,
    getScrollElement: () => tableContainerRef.current,

    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: overScan,
  });

  const loadPaginatedData = useCallback(async () => {
    if (!loadTableDataCallback) return;
    if (isFetching) return;
    if (currentPage === totalPages) return;
    setIsFetching(true);
    setIsLoading(true);
    const nextPage = currentPage + 1;
    try {
      const { data, totalPages: apiTotalPages } = await loadTableDataCallback(nextPage);
      setTotalPages(apiTotalPages);
      setCurrentPage(nextPage);
      console.log({ nextPage, currentPage, totalPages });
      setTableRowsData((prev = []) => [...prev, ...data]);
    } catch (error) {}
    setIsFetching(false);
    setIsLoading(false);
  }, [isFetching, currentPage, totalPages]);

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
        if (
          scrollHeight - scrollTop - clientHeight < 300 &&
          !isFetching &&
          typeof currentPage === 'number' &&
          typeof totalPages === 'number' &&
          currentPage < totalPages
        ) {
          loadPaginatedData();
        }
      }
    },
    [loadPaginatedData, isFetching, currentPage, totalPages]
  );
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached, loadTableDataCallback]);
  useEffect(() => {
    if (loadPaginatedData && currentPage === -1) loadPaginatedData();
  }, []);

  return (
    <>
      <div
        dir={dir}
        className={clsx(styles.tableContainer, color, styles[size], styles[variant], className)}
        ref={tableContainerRef}
        onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        style={{ height: tableHight }}
      >
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      <div
                        {...{
                          className: clsx(styles.tableHeadLabel),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: (
                            <TableSortIndicator
                              sort="asc"
                              onClick={header.column.getToggleSortingHandler()}
                            />
                          ),
                          desc: (
                            <TableSortIndicator
                              sort="desc"
                              onClick={header.column.getToggleSortingHandler()}
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                          <TableSortIndicator onClick={header.column.getToggleSortingHandler()} />
                        )}
                        {header.column.getCanResize() && (
                          <div
                            className={clsx(
                              styles.tableResizeIndicator,
                              header.column.getIsResizing() && styles.tableResizeIndicatorActive
                            )}
                            onMouseDown={header.getResizeHandler()} //for desktop
                            onTouchStart={header.getResizeHandler()} //for mobile
                          />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody
            className={styles.tableBody}
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<Record<string, string | number | Date>>;
              return (
                <tr
                  data-index={virtualRow.index}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  key={row.id}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {isLoading && <LoadingState />}
      </div>
    </>
  );
};

export default Table;

const TableSortIndicator = ({
  sort,
  onClick,
}: {
  sort?: 'asc' | 'desc';
  onClick?: (event: unknown) => void;
}) => {
  return (
    <div className={styles.tableSortIndicator} onClick={onClick}>
      <CaretSvg direction="up" outline={sort !== 'asc'} className={styles.tableSortIndicatorTop} />
      <CaretSvg
        direction="down"
        outline={sort !== 'desc'}
        className={styles.tableSortIndicatorBottom}
      />
    </div>
  );
};

const LoadingState = () => {
  return (
    <div className={styles.LoadingTemplateContainer}>
      <Skeleton className={styles.loadingStateLabel} />
      <Skeleton className={styles.loadingStateLabel} />
      <Skeleton className={styles.loadingStateLabel} />
    </div>
  );
};
