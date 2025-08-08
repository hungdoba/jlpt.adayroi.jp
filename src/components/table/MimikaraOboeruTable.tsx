'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { Input } from '../ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { MimikaraOboeru } from '@/types/mimikara';

interface Props {
  data: MimikaraOboeru[];
}

export const columns: ColumnDef<MimikaraOboeru>[] = [
  {
    accessorKey: 'id',
    header: 'No.',
    cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'kanji',
    header: 'Kanji',
    cell: ({ row }) => <div className="capitalize">{row.getValue('kanji')}</div>,
  },
  {
    accessorKey: 'kanvi',
    header: 'Hán Việt',
    cell: ({ row }) => <div>{row.getValue('kanvi')}</div>,
  },
  {
    accessorKey: 'kana',
    header: 'Cách đọc',
    cell: ({ row }) => <div>{row.getValue('kana')}</div>,
  },
  {
    accessorKey: 'meaning',
    header: 'Nghĩa',
    cell: ({ row }) => <div>{row.getValue('meaning')}</div>,
  },
  {
    accessorKey: 'unit',
    header: 'Unit',
    cell: ({ row }) => <div>{row.getValue('unit')}</div>,
  },
];

export function MimikaraOboeruTable({ data }: Props) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [filterValue, setFilterValue] = React.useState<string>('');
  const [debouncedValue, setDebouncedValue] = React.useState<string>('');

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageSize: 100,
      },
    },
    state: {
      columnFilters,
      columnVisibility,
    },
  });

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(filterValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filterValue]);

  React.useEffect(() => {
    if (debouncedValue) {
      let columnToFilter = 'meaning';

      if (/[一-龯]/.test(debouncedValue)) {
        columnToFilter = 'kanji';
      } else if (/[ぁ-んァ-ン]/.test(debouncedValue)) {
        columnToFilter = 'kana';
      } else if (!isNaN(Number(debouncedValue))) {
        columnToFilter = 'unit';
      } else if (debouncedValue === debouncedValue.toUpperCase()) {
        columnToFilter = 'kanvi';
      }
      table.getColumn(columnToFilter)?.setFilterValue(debouncedValue);
    } else {
      table.getColumn('kanji')?.setFilterValue(undefined);
      table.getColumn('kana')?.setFilterValue(undefined);
      table.getColumn('meaning')?.setFilterValue(undefined);
      table.getColumn('kanvi')?.setFilterValue(undefined);
      table.getColumn('unit')?.setFilterValue(undefined);
    }
  }, [debouncedValue, table]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Nhập để tìm kiếm..."
          onChange={(event) => setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Cột <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Tổng cộng: {table.getFilteredRowModel().rows.length} từ vựng.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
