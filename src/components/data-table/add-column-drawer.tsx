"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Type,
  ToggleLeft,
  Hash,
  Calendar,
  UserRoundPlus,
} from "lucide-react";
import { useState } from "react";
import { FieldType } from "@/lib/constants";

interface AddColumnDrawerProps {
  onAddColumn?: (column: { key: string; type: FieldType }) => void;
}

const fieldTypeIcons = {
  [FieldType.TEXT]: <Type className="h-4 w-4" />,
  [FieldType.BOOLEAN]: <ToggleLeft className="h-4 w-4" />,
  [FieldType.NUMBER]: <Hash className="h-4 w-4" />,
  [FieldType.DATE]: <Calendar className="h-4 w-4" />,
  [FieldType.ROLE]: <UserRoundPlus className="h-4 w-4" />,
};

export function AddColumnDrawer({ onAddColumn }: AddColumnDrawerProps) {
  const [columnKey, setColumnKey] = useState("");
  const [columnType, setColumnType] = useState<FieldType>(FieldType.TEXT);
  const [open, setOpen] = useState(false);

  const handleAddColumn = () => {
    if (columnKey && onAddColumn) {
      onAddColumn({ key: columnKey, type: columnType });
      setColumnKey("");
      setColumnType(FieldType.TEXT);
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-7">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Add New Column</SheetTitle>
          <SheetDescription>
            Add a new project detail column to the table.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="key">Column Name</Label>
            <Input
              id="key"
              placeholder="e.g. New Construction"
              value={columnKey}
              onChange={(e) => setColumnKey(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Column Type</Label>
            <Select
              value={columnType}
              onValueChange={(v) => setColumnType(v as FieldType)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select column type">
                  <div className="flex items-center gap-2">
                    {fieldTypeIcons[columnType]}
                    <span className="capitalize">
                      {columnType.toLowerCase()}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(fieldTypeIcons).map(([type, icon]) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center gap-2">
                      {icon}
                      <span className="capitalize">{type.toLowerCase()}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <Button onClick={handleAddColumn}>Add Column</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
