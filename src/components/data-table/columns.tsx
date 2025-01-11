"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronsUpDown,
  MoreHorizontal,
  CircleDot,
  XCircle,
  CheckCircle,
  Timer,
  PauseCircle,
  FileIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IProject, ProjectStatus, IMembers } from "@/lib/types";
import { ArrowUp, ArrowDown, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { AddColumnDrawer } from "./add-column-drawer";
import { FieldType, PROJECT_DETAILS_ITEMS, PROJECT_ROLE_ITEMS } from "@/lib/constants";
import { MemberAvatarGroup } from "./columns/member";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends unknown> {
    onAddColumn: (column: { key: string; type: FieldType }) => void;
  }
}

type ColumnMetaType = {
  className?: string;
};

function SortButton({ column }: { column: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="size-6 p-0">
          {column.getIsSorted() ? (
            column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )
          ) : (
            <ChevronsUpDown className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ArrowUp className="mr-2 h-4 w-4" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ArrowDown className="mr-2 h-4 w-4" />
          Desc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
          <EyeOff className="mr-2 h-4 w-4" />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<IProject>[] = [
  {
    id: "select",
    enableHiding: false,
    enableSorting: false,
    maxSize: 40,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <div
        className={`${
          !row.getIsSelected() && "opacity-0 group-hover:opacity-100"
        } transition-opacity w-[32px]`}
      >
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    meta: {
      className: "sticky left-0 z-[100]",
    } as ColumnMetaType,
  },
  {
    accessorKey: "id",
    header: () => <span className="text-xs">ID</span>,
    enableHiding: false,
    maxSize: 76,
    cell: ({ row }) => (
      <div className="w-[60px] truncate">{row.getValue("id")}</div>
    ),
    meta: {
      className: "sticky left-[40px] z-[100]",
    } as ColumnMetaType,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <div className="flex items-center space-x-2">
        <span className="text-xs">Title</span>
        <SortButton column={column} />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-[300px] truncate font-medium">
        {row.getValue("title")}
      </div>
    ),
    meta: {
      className: "sticky left-[116px] z-[100] bg-background",
    } as ColumnMetaType,
  },
  {
    accessorKey: "client",
    header: () => <span className="text-xs">Client</span>,
    cell: ({ row }) => (
      <div className="w-[200px] truncate">{row.getValue("client")}</div>
    ),
  },
  {
    accessorKey: "location",
    header: () => <span className="text-xs">Location</span>,
    cell: ({ row }) => (
      <div className="w-[120px] truncate">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "cost",
    header: ({ column }) => (
      <div className="flex items-center space-x-2">
        <span className="text-xs">Cost</span>
        <SortButton column={column} />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="w-[150px] font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <span className="text-xs">Status</span>,
    cell: ({ row }) => {
      const status = row.getValue("status") as ProjectStatus;
      return (
        <div className="w-[120px] flex items-center gap-2">
          <div className="flex-shrink-0">
            {status === ProjectStatus.TO_BE_STARTED && (
              <CircleDot className="h-4 w-4 text-muted-foreground" />
            )}
            {status === ProjectStatus.IN_PROGRESS && (
              <Timer className="h-4 w-4 text-muted-foreground" />
            )}
            {status === ProjectStatus.COMPLETED && (
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            )}
            {status === ProjectStatus.CANCELLED && (
              <XCircle className="h-4 w-4 text-muted-foreground" />
            )}
            {status === ProjectStatus.PLANNING && (
              <FileIcon className="h-4 w-4 text-muted-foreground" />
            )}
            {status === ProjectStatus.ON_HOLD && (
              <PauseCircle className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <p className="text-xs capitalize">
            {status.toLowerCase().replace("_", " ")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "designCompletionDate",
    header: () => <span className="text-xs">Design Completion Date</span>,
    cell: ({ row }) => (
      <div className="w-[180px] truncate">
        {row.getValue("designCompletionDate")}
      </div>
    ),
  },
  {
    accessorKey: "constructionCompletionDate",
    header: () => <span className="text-xs">Construction Completion Date</span>,
    cell: ({ row }) => (
      <div className="w-[180px] truncate">
        {row.getValue("constructionCompletionDate")}
      </div>
    ),
  },
  ...PROJECT_DETAILS_ITEMS.map((detail) => ({
    accessorFn: (row: IProject) => row.projectDetails.find((d) => d.key === detail.key)?.value,
    id: detail.key,
    header: () => <span className="text-xs">{detail.key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>,
    cell: ({ row }: { row: any }) => (
      <div className="flex w-[140px]">
        <Checkbox defaultChecked={row.getValue(detail.key)} />
      </div>
    ),
  })
  ),
  ...PROJECT_ROLE_ITEMS.map((role) => ({
    id: role.key,
    header: () => <span className="text-xs">{role.key.replace(/_/g, ' ')}</span>,
    cell: ({ row }: { row: any }) => {
      const members = row.original.members.filter((m: IMembers) => m.role === role.key);
      return (
        <div className="w-[120px]">
          <MemberAvatarGroup members={members} />
        </div>
      );
    },
  })
  ),
  {
    id: "actions",
    enableHiding: false,
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <AddColumnDrawer onAddColumn={table.options.meta?.onAddColumn} />
      </div>
    ),
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div className="w-[40px] flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(project.id)}
              >
                Copy project ID
              </DropdownMenuItem>
              <DropdownMenuItem>View project details</DropdownMenuItem>
              <DropdownMenuItem>View team members</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    meta: {
      className: "sticky right-0 z-[100]",
    } as ColumnMetaType,
  },
];

