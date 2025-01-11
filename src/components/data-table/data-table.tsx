"use client";

import React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DataTableExport } from "@/components/data-table/export";
import { DataTableViewOptions } from "./view";
import { FieldType, PROJECT_ROLE_ITEMS } from "@/lib/constants";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends unknown, TValue> {
    className?: string;
  }
}

export function DataTable<TData, TValue>({
  columns: initialColumns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columns, setColumns] =
    React.useState<ColumnDef<TData, TValue>[]>(initialColumns);

  const handleAddColumn = React.useCallback(
    ({ key, type }: { key: string; type: FieldType }) => {
      const newColumn: ColumnDef<TData, TValue> = {
        accessorKey: key,
        header: () => (
          <span className="text-xs capitalize">{key.replace(/_/g, " ")}</span>
        ),
        cell: ({ row }) => {
          const value = row.getValue(key);
          switch (type) {
            case FieldType.BOOLEAN:
              return (
                <div className="w-[100px]">{String(value ? "Yes" : "No")}</div>
              );
            case FieldType.DATE:
              return value ? (
                <div className="w-[100px]">
                  {new Date(value.toString()).toLocaleDateString()}
                </div>
              ) : null;
            case FieldType.NUMBER:
              return (
                <div className="w-[100px]">{Number(value).toString()}</div>
              );
            default:
              return <div className="w-[150px] truncate">{String(value)}</div>;
          }
        },
      };

      setColumns((prev) => {
        const actionsColumnIndex = prev.findIndex(
          (col) => col.id === "actions"
        );
        const firstRoleColumnIndex = prev.findIndex((col) =>
          PROJECT_ROLE_ITEMS.some((role) => role.key === col.id)
        );

        const insertIndex =
          type === FieldType.ROLE
            ? actionsColumnIndex
            : firstRoleColumnIndex === -1
            ? actionsColumnIndex
            : firstRoleColumnIndex;

        if (insertIndex === -1) return [...prev, newColumn];

        const newColumns = [...prev];
        newColumns.splice(insertIndex, 0, newColumn);
        return newColumns;
      });
    },
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      onAddColumn: handleAddColumn,
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <DataTableExport table={table} />
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="relative rounded-md">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.column.columnDef.meta?.className,
                        "bg-background py-1",
                        "group-hover:bg-zinc-50 group-hover:dark:bg-zinc-900"
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          cell.column.columnDef.meta?.className,
                          "bg-background py-1",
                          cell.row.getIsSelected()
                            ? "bg-muted"
                            : "group-hover:bg-zinc-50 group-hover:dark:bg-zinc-900"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
