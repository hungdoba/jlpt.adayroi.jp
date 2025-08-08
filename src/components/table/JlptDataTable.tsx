'use client';

import React, { useState, useEffect } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import { JlptInfo } from '@/types/jlpt';

interface Props {
  jlptList: JlptInfo[];
}

const YEARS = Array.from({ length: 2024 - 2010 + 1 }, (_, i) => 2024 - i);

const getColumns = (): ColumnDef<JlptInfo>[] => [
  {
    accessorKey: 'level',
    header: () => <div className="ml-0 md:ml-4">Level</div>,
    cell: ({ row }) => (
      <div className="md:ml-4 uppercase text-gray-500">{row.getValue('level')}</div>
    ),
  },
  {
    accessorKey: 'year',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Năm
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    filterFn: (row, columnId, filterValue: string) =>
      !filterValue ||
      String(row.getValue(columnId)).toLowerCase().includes(filterValue.toLowerCase()),
    cell: ({ row }) => <div className="ml-3 text-gray-500">{row.getValue('year')}</div>,
  },
  {
    accessorKey: 'month',
    header: 'Tháng',
    cell: ({ row }) => <div className="text-gray-500">{row.getValue('month')}</div>,
  },
  {
    accessorKey: 'totalQuestions',
    header: 'Số câu hỏi',
    cell: ({ row }) => <div className="text-gray-500">{row.getValue('totalQuestions')}</div>,
  },
  {
    accessorKey: 'name',
    header: () => <div className="text-left">Tên</div>,
    cell: ({ row }) => (
      <div className="text-gray-500">{`${row.getValue('year')}-${row.getValue('month')}`}</div>
    ),
  },
  {
    accessorKey: 'url',
    header: 'Làm bài',
    cell: ({ row }) => {
      const year = row.getValue('year');
      const month = row.getValue('month');
      const level = String(row.getValue('level')).toLowerCase();
      const url = `/jlpt/${level}/${year}/${month}`;
      return (
        <Link href={url} className="hover:underline underline-offset-4">
          Thi thử ngay
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export default function JlptDataTable({ jlptList }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setColumnVisibility({
        level: true,
        year: !mobile,
        month: !mobile,
        name: mobile,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const table = useReactTable({
    data: jlptList,
    columns: getColumns(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 30,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Select
          defaultValue="all"
          onValueChange={(value) =>
            table.getColumn('level')?.setFilterValue(value === 'all' ? '' : value)
          }
        >
          <SelectTrigger className="md:ml-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Level</SelectLabel>
              <SelectItem value="N1">N1</SelectItem>
              <SelectItem value="N2">N2</SelectItem>
              <SelectItem value="N3">N3</SelectItem>
              <SelectItem value="all">Tất cả</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          defaultValue="all"
          onValueChange={(value) =>
            table.getColumn('year')?.setFilterValue(value === 'all' ? '' : value)
          }
        >
          <SelectTrigger className="ml-4">
            <SelectValue placeholder="Chọn năm" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
              {YEARS.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
              <SelectItem value="all">Tất cả</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto hidden md:flex">
              Ẩn hiện cột <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table className="overflow-x-hidden">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
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
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2 mr-2 md:mr-0">
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
