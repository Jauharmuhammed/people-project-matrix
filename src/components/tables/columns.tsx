"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IProject, ProjectStatus } from "@/lib/types"
import { ArrowUp, ArrowDown, EyeOff } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

type ColumnMetaType = {
  className?: string;
}

function SortButton({ column }: { column: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
  )
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
      <div className={`${!row.getIsSelected() && 'opacity-0 group-hover:opacity-100'} transition-opacity w-[32px]`}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    meta: {
      className: "sticky left-0"
    } as ColumnMetaType,
  },
  {
    accessorKey: "id",
    header: () => <span className="text-xs">ID</span>,
    enableHiding: false,
    maxSize: 76,
    cell: ({ row }) => (
      <div className="w-[60px] truncate">
        {row.getValue("id")}
      </div>
    ),
    meta: {
      className: "sticky left-[40px]"
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
      className: "sticky left-[116px] bg-background"
    } as ColumnMetaType,
  },
  {
    accessorKey: "client",
    header: () => <span className="text-xs">Client</span>,
    cell: ({ row }) => (
      <div className="w-[200px] truncate">
        {row.getValue("client")}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: () => <span className="text-xs">Location</span>,
    cell: ({ row }) => (
      <div className="w-[120px] truncate">
        {row.getValue("location")}
      </div>
    ),
  },
  {
    accessorKey: "cost",
    header: ({ column }) => (
      <div className="flex items-center space-x-2">
        <span className="text-xs">Budget</span>
        <SortButton column={column} />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="w-[150px] font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: () => <span className="text-xs">Status</span>,
    cell: ({ row }) => {
      const status = row.getValue("status") as ProjectStatus
      return (
        <div className="w-[120px]">
          <Badge variant={
            status === ProjectStatus.COMPLETED ? "default" :
            status === ProjectStatus.IN_PROGRESS ? "secondary" :
            status === ProjectStatus.CANCELLED ? "destructive" : 
            "outline"
          }>
            {status}
          </Badge>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original
      return (
        <div className="w-[80px]">
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
      )
    },
  },
] 