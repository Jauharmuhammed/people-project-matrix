"use client";

import { useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EditableCellProps<T> {
  value: T;
  onChange?: (value: T) => void;
  className?: string;
  width?: string;
}

export function TextCell({
  value,
  onChange,
  className,
  width,
}: EditableCellProps<string>) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        // Move cursor to end of text
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className={cn("group/cell relative", width)}>
      <Input
        ref={inputRef}
        defaultValue={value}
        disabled={!isEditing}
        className={cn(
          "h-8 border-none p-0 shadow-none focus-visible:ring-0 disabled:text-foreground disabled:cursor-default disabled:opacity-100",
          !isEditing && "bg-transparent",
          width,
          className
        )}
        onBlur={() => setIsEditing(false)}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {!isEditing && (
        <Button
          onClick={handleEdit}
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 size-6 group-hover/cell:opacity-100"
          variant="outline"
          size="icon"
        >
          <PencilIcon className="!size-3 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}

export function NumberCell({
  value,
  onChange,
  className,
  width,
}: EditableCellProps<number>) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        // Move cursor to end of text
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className={cn("group/cell relative", width)}>
      <Input
        ref={inputRef}
        type="number"
        defaultValue={value}
        disabled={!isEditing}
        className={cn(
          "h-8 border-none p-0 shadow-none focus-visible:ring-0 disabled:text-foreground disabled:cursor-default disabled:opacity-100",
          !isEditing && "bg-transparent",
          width,
          className
        )}
        onBlur={() => setIsEditing(false)}
        onChange={(e) => onChange?.(Number(e.target.value))}
        onKeyDown={handleKeyDown}
      />
      {!isEditing && (
        <Button
          onClick={handleEdit}
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 size-6 group-hover/cell:opacity-100"
          variant="outline"
          size="icon"
        >
          <PencilIcon className="!size-3 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}

export function BooleanCell({ value, onChange }: EditableCellProps<boolean>) {
  return (
    <div className="flex w-[100px]">
      <Checkbox defaultChecked={value}/>
    </div>
  );
}

interface DateCellProps extends EditableCellProps<string> {
  width?: string;
}

export function DateCell({
  value,
  onChange,
  width = "w-[180px]",
}: DateCellProps) {
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  return (
    <div className={cn("group/cell relative", width)}>
      <Popover>
        <PopoverTrigger asChild>
          <button className={cn("p-0 w-full flex justify-start text-sm cursor-pointer outline-none border-none focus-visible:ring-0 text-start", !date && "text-muted-foreground")}>
            {date ? format(date, "MMMM yyyy") : <span>Pick a date</span>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              onChange?.(newDate?.toISOString() || "");
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
