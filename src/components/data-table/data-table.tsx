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
  FilterFn,
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
import { TextCell, NumberCell, BooleanCell } from "./columns/cells";
import { EditableMemberCell } from "./columns/editable-member-cell";
import { IMembers, MemberRole, ProjectStatus } from "@/lib/types";
import { ProjectDialog } from "./project-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DataTableFacetedFilter, DataTableResetFilter } from "./filters";
import {
  CircleDot,
  XCircle,
  CheckCircle,
  Timer,
  PauseCircle,
  FileIcon,
} from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends unknown, TValue> {
    className?: string;
  }

  interface FilterFns {
    status: FilterFn<unknown>;
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
  const [selectedProject, setSelectedProject] = React.useState<
    TData | undefined
  >();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleRowClick = React.useCallback((row: TData) => {
    setSelectedProject(row);
    setDialogOpen(true);
  }, []);

  const handleAddColumn = React.useCallback(
    ({ key, type }: { key: string; type: FieldType }) => {
      const newColumn: ColumnDef<TData, TValue> = {
        accessorKey: key,
        header: () => (
          <span className="text-xs capitalize">{key.replace(/_/g, " ")}</span>
        ),
        cell: ({ row }) => {
          const value = row.getValue(key) || "";
          switch (type) {
            case FieldType.BOOLEAN:
              return <BooleanCell value={Boolean(value)} />;
            case FieldType.NUMBER:
              return <NumberCell value={Number(value)} width="w-[180px]" />;
            case FieldType.TEXT:
              return <TextCell value={String(value)} width="w-[180px]" />;
            case FieldType.ROLE:
              const members = (row.original as any).members.filter(
                (m: IMembers) => m.role === key
              );
              return (
                <div className="w-[120px]">
                  <EditableMemberCell
                    role={key as MemberRole}
                    value={members}
                    onChange={(newMembers) => {
                      // Handle member updates
                    }}
                  />
                </div>
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

  const statusOptions = React.useMemo(
    () =>
      Object.values(ProjectStatus).map((status) => {
        const icon = {
          [ProjectStatus.TO_BE_STARTED]: CircleDot,
          [ProjectStatus.IN_PROGRESS]: Timer,
          [ProjectStatus.COMPLETED]: CheckCircle,
          [ProjectStatus.CANCELLED]: XCircle,
          [ProjectStatus.PLANNING]: FileIcon,
          [ProjectStatus.ON_HOLD]: PauseCircle,
        }[status];

        return {
          label: status.toLowerCase().replace(/_/g, " "),
          value: status,
          icon,
        };
      }),
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
    filterFns: {
      status: (row, columnId, filterValues: string[]) => {
        if (!filterValues?.length) return true;
        const status = row.getValue(columnId) as string;
        return filterValues.includes(status);
      },
    },
    meta: {
      onAddColumn: handleAddColumn,
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  const resetFilters = React.useCallback(() => {
    table.getColumn("title")?.setFilterValue("");
    table.getColumn("status")?.setFilterValue(undefined);
  }, [table]);

  const activeFiltersCount = [
    table.getColumn("title")?.getFilterValue(),
    table.getColumn("status")?.getFilterValue(),
  ].filter(Boolean).length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div></div>
        <div>
          <ProjectDialog
            project={selectedProject as any}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          />
        </div>
      </div>
      <div className="flex items-center py-8 justify-between">
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder="Filter by title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-xs h-8"
          />
          <Button variant="outline" size="sm" className="h-8">
            <ChevronDown className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statusOptions}
          />
          <DataTableResetFilter
            filterCount={activeFiltersCount}
            onReset={resetFilters}
          />
        </div>
        <div className="flex items-center gap-2">
          <DataTableExport table={table} />
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="relative rounded-md">
        <div className="overflow-x-auto border-b">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
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
                    className="group cursor-pointer"
                    onClick={() => handleRowClick(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
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
