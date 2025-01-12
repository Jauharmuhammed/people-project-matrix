"use client";

import * as React from "react";
import { Check, PlusCircle, X } from "lucide-react";
import type { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    (column?.getFilterValue() as string[]) || []
  );
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const filterValue = column?.getFilterValue() as string[];
    setSelectedValues(filterValue || []);
  }, [column?.getFilterValue()]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelectedValues);
    column?.setFilterValue(
      newSelectedValues.length ? newSelectedValues : undefined
    );
  };

  const clearFilters = () => {
    setSelectedValues([]);
    column?.setFilterValue(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal size-5 flex items-center justify-center"
              >
                {selectedValues.length}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2" align="start">
        <div className="space-y-2">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8"
          />
          <div className="space-y-1">
            {filteredOptions.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <div
                  key={option.value}
                  className={cn(
                    "relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                    isSelected ? "bg-accent" : "transparent"
                  )}
                  onClick={() => toggleOption(option.value)}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                  {option.icon && (
                    <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  )}
                  {option.label}
                </div>
              );
            })}
            {filteredOptions.length === 0 && (
              <div className="py-6 text-center text-sm">No results found.</div>
            )}
          </div>
          {selectedValues.length > 0 && (
            <Button
              variant="ghost"
              className="w-full justify-center"
              onClick={clearFilters}
            >
              Clear filters
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function DataTableResetFilter({
  filterCount,
  onReset,
}: {
  filterCount: number;
  onReset: () => void;
}) {
  if (filterCount === 0) return null;

  return (
    <Button variant="ghost" onClick={onReset} className="h-8 px-2 lg:px-3">
      Reset
      <X className="h-4 w-4" />
    </Button>
  );
}
