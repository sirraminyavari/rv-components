import React, { useEffect, useMemo, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Table as TableComponent, RVTable } from '.';
import { ThemeBlock } from '../../storybookComponents';
import { RVSizeProp, RVVariantProp } from '../../types';
import { ColumnDef } from '@tanstack/react-table';
import { Person, makeData } from './makeData.faker';

export default {
  title: 'Components/Table',
  component: TableComponent,
  argTypes: {} as RVTable,
} as ComponentMeta<typeof TableComponent>;

const fakeDataLoaderCallback: RVTable['loadTableDataCallback'] = async (currentPage) => {
  const response = {
    data: makeData(currentPage, 25) as Record<string, string | number | Date>[],
    totalPages: 5,
  };
  console.log(currentPage, response);

  return new Promise((res) =>
    setTimeout(() => {
      res(response);
    }, 1500)
  );
};
const Template: ComponentStory<typeof TableComponent> = ({
  columns: columnsInput,
  rowsData: rowsDataInput,
  color,
  variant,
  ...args
}) => {
  const [colorClass, setColorClass] = useState(color);
  useEffect(() => {
    setColorClass(color);
  }, [color]);
  const columns = useMemo<ColumnDef<Record<string, string | number | Date>>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        // size: 60,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'Last Name',
        cell: (info) => info.getValue(),
        header: 'Last Name',
        enableResizing: true,
      },
      {
        enableResizing: false,
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'visits',
        header: 'Visits',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => info.getValue<Date>().toLocaleString(),
      },
    ],
    []
  );
  return (
    <ThemeBlock onColorChange={setColorClass}>
      <div>
        <TableComponent
          rowsData={rowsDataInput || makeData(0, 10)}
          columns={columnsInput || columns}
          tableHight={'200px'}
          color={colorClass}
          variant={variant || RVVariantProp.primary}
          {...args}
        />
      </div>
      <div>
        <TableComponent
          rowsData={rowsDataInput || makeData(0, 10)}
          columns={columnsInput || columns}
          tableHight={'200px'}
          color={colorClass}
          variant={variant || RVVariantProp.outline}
          {...args}
        />
      </div>
      <div>
        <TableComponent
          rowsData={rowsDataInput || makeData(0, 10)}
          columns={columnsInput || columns}
          tableHight={'200px'}
          color={colorClass}
          variant={variant || RVVariantProp.white}
          {...args}
        />
      </div>
    </ThemeBlock>
  );
};
export const ShowCase: ComponentStory<typeof TableComponent> = ({ color, variant, ...args }) => {
  return (
    <>
      <TableComponent rowsData={makeData(0, 10)} variant={variant} color={color} {...args} />
    </>
  );
};
export const CustomColumns: ComponentStory<typeof TableComponent> = ({
  color,
  variant,
  ...args
}) => {
  const columns = useMemo<ColumnDef<Record<string, string | number | Date>>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        minSize: 70,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'Last Name',
        cell: (info) => info.getValue(),
        header: 'Last Name',
        enableResizing: true,
      },
      {
        enableResizing: false,
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'visits',
        header: 'Visits',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => info.getValue<Date>().toLocaleString(),
      },
    ],
    []
  );
  return (
    <div>
      <TableComponent
        rowsData={makeData(0, 15)}
        columns={columns}
        variant={variant}
        color={color}
        {...args}
      />
    </div>
  );
};

export const InfiniteScroll: ComponentStory<typeof TableComponent> = ({
  color,
  variant,
  rowsData,
  columns: inputColumns,
  ...args
}) => {
  return (
    <>
      <TableComponent
        loadTableDataCallback={fakeDataLoaderCallback}
        variant={variant}
        color={color}
        {...args}
      />
    </>
  );
};

export const InfiniteScrollWithCustomColumns: ComponentStory<typeof TableComponent> = ({
  color,
  variant,
  rowsData,
  columns: inputColumns,
  ...args
}) => {
  const columns = useMemo<ColumnDef<Record<string, string | number | Date>>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        minSize: 70,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'Last Name',
        cell: (info) => info.getValue(),
        header: 'Last Name',
        enableResizing: true,
      },
      {
        enableResizing: false,
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'visits',
        header: 'Visits',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => info.getValue<Date>().toLocaleString(),
      },
    ],
    []
  );
  return (
    <>
      <TableComponent
        columns={columns}
        loadTableDataCallback={fakeDataLoaderCallback}
        variant={variant}
        color={color}
        {...args}
      />
    </>
  );
};

export const ResizableColumns = ShowCase.bind({});
ResizableColumns.args = { resizable: true };

export const OverScan = ShowCase.bind({});
OverScan.args = { overScan: 20 };

export const RTL = Template.bind({});
RTL.args = { dir: 'rtl' };

export const SmallSized = Template.bind({});
SmallSized.args = { size: RVSizeProp.small };

export const MediumSized = Template.bind({});
MediumSized.args = { size: RVSizeProp.medium };

export const LargeSized = Template.bind({});
LargeSized.args = { size: RVSizeProp.large };
