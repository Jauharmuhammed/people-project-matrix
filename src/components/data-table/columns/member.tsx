import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IMembers } from "@/lib/types";

// Array of tailwind background colors for avatars
const bgColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-cyan-500",
];

// Get a random color based on member id for consistency
const getRandomColor = (id: string) => {
  const index = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return bgColors[index % bgColors.length];
};

interface MemberAvatarGroupProps {
  members: IMembers[];
}

export function MemberAvatarGroup({ members }: MemberAvatarGroupProps) {
  const displayMembers = members.slice(0, 5); // Show max 5 members
  const remainingCount = members.length - 5;

  return (
    <div className="flex -space-x-2 items-center">
      {displayMembers.map((member) => (
        <HoverCard key={member.id}>
          <HoverCardTrigger asChild>
            <Avatar className="h-8 w-8 border-2 border-background cursor-pointer">
              <AvatarImage src={member?.profilePicture} alt={member.name} />
              <AvatarFallback className={`text-[10px] text-white ${getRandomColor(member.id)}`}>
                {member.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="w-80" side="top">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={member.profilePicture} />
                <AvatarFallback className={`text-white ${getRandomColor(member.id)}`}>
                  {member.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="">
                <h4 className="text-sm font-semibold">{member.name}</h4>
                <p className="text-sm text-muted-foreground capitalize">{member.role.toLowerCase().replace(/_/g, " ")}</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
      {remainingCount > 0 && (
        <Avatar className="h-8 w-8 border-2 border-background bg-muted">
          <AvatarFallback className="text-[10px] bg-muted">
            +{remainingCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
} 