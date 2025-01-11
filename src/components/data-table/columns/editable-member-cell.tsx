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
import { Check, PlusCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IMembers, MemberRole } from "@/lib/types";
import { MemberAvatarGroup } from "./member";
import { members as allMembers } from "@/data/members";

interface EditableMemberCellProps {
  role: MemberRole;
  value: IMembers[];
  onChange: (members: IMembers[]) => void;
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
