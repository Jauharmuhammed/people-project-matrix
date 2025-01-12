"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, PlusCircleIcon, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IMembers, MemberRole } from "@/lib/types";
import { MemberAvatarGroup } from "./member";
import { members as allMembers } from "@/data/members";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";

interface IMemberWithDuration extends IMembers {
  startDate?: Date;
  endDate?: Date;
}

interface EditableMemberCellProps {
  role: MemberRole;
  value: IMembers[];
  onChange: (members: IMembers[]) => void;
}

interface AdvancedEditableMemberCellProps {
  role: MemberRole;
  value: IMemberWithDuration[];
  onChange: (members: IMemberWithDuration[]) => void;
}

export function EditableMemberCell({
  role,
  value,
  onChange,
}: EditableMemberCellProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedMembers, setSelectedMembers] =
    React.useState<IMembers[]>(value);
  const roleMembers = allMembers.filter((m) => m.role === role);
  const selectedIds = new Set(selectedMembers.map((m) => m.id));

  React.useEffect(() => {
    setSelectedMembers(value);
  }, [value]);

  const toggleMember = (member: IMembers) => {
    const newMembers = selectedIds.has(member.id)
      ? selectedMembers.filter((m) => m.id !== member.id)
      : [...selectedMembers, member];

    setSelectedMembers(newMembers);
    onChange(newMembers);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {selectedMembers.length > 0 ? (
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full p-0 h-auto hover:bg-transparent"
          >
            <MemberAvatarGroup members={selectedMembers} />
          </Button>
        ) : (
          <Button variant="ghost" className="size-7" aria-expanded={open} size="icon">
            <PlusCircleIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder={`Search ${role.toLowerCase()} members...`}
          />
          <CommandEmpty>No members found.</CommandEmpty>
          <CommandGroup>
            {roleMembers.map((member) => (
              <CommandItem
                key={member.id}
                value={member.id}
                onSelect={() => toggleMember(member)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedIds.has(member.id) ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0">
                    <MemberAvatarGroup members={[member]} />
                  </div>
                  <div className="flex flex-col">
                    <span>{member.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {member.email}
                    </span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function AdvancedEditableMemberCell({
  role,
  value,
  onChange,
}: AdvancedEditableMemberCellProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedMembers, setSelectedMembers] = React.useState<IMemberWithDuration[]>(value);
  const roleMembers = allMembers.filter((m) => m.role === role);

  React.useEffect(() => {
    setSelectedMembers(value);
  }, [value]);

  const updateMemberDuration = (memberId: string, startDate?: Date, endDate?: Date) => {
    const newMembers = selectedMembers.map((member) =>
      member.id === memberId
        ? { ...member, startDate, endDate }
        : member
    );
    setSelectedMembers(newMembers);
    onChange(newMembers);
  };

  const addMember = (member: IMembers) => {
    const newMember: IMemberWithDuration = { ...member };
    setSelectedMembers([...selectedMembers, newMember]);
    onChange([...selectedMembers, newMember]);
  };

  const removeMember = (memberId: string) => {
    const newMembers = selectedMembers.filter((m) => m.id !== memberId);
    setSelectedMembers(newMembers);
    onChange(newMembers);
  };

  return (
    <div className="space-y-2">
      {selectedMembers.map((member) => (
        <div key={member.id} className="flex items-center gap-2 p-2 rounded-md border">
          <div className="flex-shrink-0">
            <MemberAvatarGroup members={[member]} />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-medium truncate">{member.name}</span>
            <span className="text-xs text-muted-foreground truncate">
              {member.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {member.startDate && member.endDate ? (
                    <>
                      {format(member.startDate, "LLL dd, y")} -{" "}
                      {format(member.endDate, "LLL dd, y")}
                    </>
                  ) : (
                    <span>Pick duration</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={member.startDate}
                  selected={{
                    from: member.startDate,
                    to: member.endDate,
                  }}
                  onSelect={(range) => {
                    updateMemberDuration(
                      member.id,
                      range?.from,
                      range?.to
                    );
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => removeMember(member.id)}
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      ))}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder={`Search ${role.toLowerCase()} members...`} />
            <CommandEmpty>No members found.</CommandEmpty>
            <CommandGroup>
              {roleMembers
                .filter((m: IMembers) => !selectedMembers.some((sm) => sm.id === m.id))
                .map((member) => (
                  <CommandItem
                    key={member.id}
                    value={member.id}
                    onSelect={() => {
                      addMember(member);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0">
                        <MemberAvatarGroup members={[member]} />
                      </div>
                      <div className="flex flex-col">
                        <span>{member.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface EditableMemberCellWithModeProps extends EditableMemberCellProps {
  defaultMode?: "basic" | "advanced";
}

export function EditableMemberCellWithMode({
  role,
  value,
  onChange,
  defaultMode = "basic",
}: EditableMemberCellWithModeProps) {
  return defaultMode === "basic" ? (
    <EditableMemberCell role={role} value={value} onChange={onChange} />
  ) : (
    <AdvancedEditableMemberCell
      role={role}
      value={value.map((m) => ({ ...m }))}
      onChange={onChange}
    />
  );
}

