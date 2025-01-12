"use client";

import * as React from "react";
import { Check, ChevronsUpDown, ListFilter, Trash2 } from "lucide-react";
import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type FilterType = "text" | "number" | "select" | "date" | "boolean";

interface FilterField {
  id: string;
  label: string;
  type: FilterType;
  options?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

interface Filter {
  id: string;
  value: string | string[];
  operator: string;
  type: FilterType;
}

interface AdvancedFilterProps<TData> {
  table: Table<TData>;
  filterFields: FilterField[];
}

export function AdvancedFilter<TData>({
  table,
  filterFields,
}: AdvancedFilterProps<TData>) {
  const [filters, setFilters] = React.useState<Filter[]>([]);
  const [open, setOpen] = React.useState(false);

  const addFilter = () => {
    const filterField = filterFields[0];
    if (!filterField) return;

    setFilters([
      ...filters,
      {
        id: filterField.id,
        value: "",
        type: filterField.type,
        operator: "equals",
      },
    ]);
  };

  const updateFilter = (index: number, field: Partial<Filter>) => {
    const updatedFilters = filters.map((filter, i) => {
      if (i === index) {
        return { ...filter, ...field };
      }
      return filter;
    });
    setFilters(updatedFilters);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const resetFilters = () => {
    setFilters([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2">
          <ListFilter className="h-4 w-4" />
          Advanced Filter
          {filters.length > 0 && (
            <Badge variant="secondary" className="rounded-sm px-1 font-normal">
              {filters.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[520px] p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-medium leading-none">Filters</h4>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
          <div className="space-y-4">
            {filters.map((filter, index) => {
              const filterField = filterFields.find((f) => f.id === filter.id);
              return (
                <div key={index} className="flex items-center gap-2">
                  <Select
                    value={filter.id}
                    onValueChange={(value) => {
                      const field = filterFields.find((f) => f.id === value);
                      if (field) {
                        updateFilter(index, {
                          id: value,
                          type: field.type,
                          value: "",
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue>
                        {filterField?.label || "Select field"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {filterFields.map((field) => (
                        <SelectItem key={field.id} value={field.id}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filter.operator}
                    onValueChange={(value) =>
                      updateFilter(index, { operator: value })
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue>{filter.operator}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="startsWith">Starts with</SelectItem>
                      <SelectItem value="endsWith">Ends with</SelectItem>
                    </SelectContent>
                  </Select>

                  {filter.type === "select" && filterField?.options ? (
                    <Select
                      value={filter.value as string}
                      onValueChange={(value) => updateFilter(index, { value })}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue>
                          {filterField.options.find(
                            (opt) => opt.value === filter.value
                          )?.label || "Select value"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {filterField.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      placeholder="Enter value..."
                      className="flex-1"
                      value={filter.value as string}
                      onChange={(e) =>
                        updateFilter(index, { value: e.target.value })
                      }
                    />
                  )}

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFilter(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={addFilter}
          >
            Add Filter
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
