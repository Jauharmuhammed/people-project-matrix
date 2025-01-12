import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  CalendarIcon,
  Building2,
  MapPin,
  CalendarDays,
  DollarSign,
  Activity,
  CalendarRange,
  Upload,
  FileIcon,
  X,
  FileText,
  FileUp,
} from "lucide-react";
import {
  IProject,
  IProjectDetails,
  MemberRole,
  ProjectStatus,
} from "@/lib/types";
import { EditableMemberCellWithMode } from "./columns/editable-member-cell";
import { cn, randomId } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECT_DETAILS_ITEMS } from "@/lib/constants";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ProjectDialogProps {
  project?: IProject;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ProjectDialog({
  project,
  open,
  onOpenChange,
}: ProjectDialogProps) {
  const isEditing = Boolean(project);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="h-8 text-xs">
          <Plus className="!size-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-8">
          {/* Section 1: ID and Title */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <Input
                  defaultValue={project?.id ?? randomId()}
                  placeholder="Project ID"
                  className="w-32 border-0 p-0 h-8 text-xs placeholder:text-xs focus-visible:ring-0 text-muted-foreground"
                />
              </div>
              <div className="flex items-center justify-between">
                <Input
                  defaultValue={project?.title}
                  placeholder="Enter project title"
                  className="border-0 p-0 h-8 !text-3xl placeholder:text-3xl font-semibold focus-visible:ring-0"
                />
                {!project && <Button size="sm">Save</Button>}
              </div>
            </div>
          </div>

          {/* Section 2: Primary Details */}
          <div>
            <h3 className="text-xs font-medium mb-4 uppercase text-muted-foreground">
              Primary Details
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-44">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm text-muted-foreground">
                      Client
                    </Label>
                  </div>
                  <Input
                    defaultValue={project?.client || ""}
                    placeholder="Enter client name"
                    className="border-0 p-0 h-8 focus-visible:ring-0 text-sm"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-44">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm text-muted-foreground">
                      Location
                    </Label>
                  </div>
                  <Input
                    defaultValue={project?.location || ""}
                    placeholder="Enter project location"
                    className="border-0 p-0 h-8 focus-visible:ring-0 text-sm"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-44">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm text-muted-foreground">
                      Design Date
                    </Label>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          "w-full justify-start text-left font-normal h-8 px-0 py-0 border-0 outline-none focus-visible:ring-0 text-sm",
                          !project?.designCompletionDate &&
                            "text-muted-foreground"
                        )}
                      >
                        {project?.designCompletionDate ? (
                          format(new Date(project.designCompletionDate), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          project?.designCompletionDate
                            ? new Date(project.designCompletionDate)
                            : undefined
                        }
                        onSelect={() => {}}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-44">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm text-muted-foreground">
                      Cost
                    </Label>
                  </div>
                  <Input
                    type="number"
                    defaultValue={project?.cost || ""}
                    placeholder="Enter project cost"
                    className="border-0 p-0 h-8 focus-visible:ring-0 text-sm"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-44">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm text-muted-foreground">
                      Status
                    </Label>
                  </div>
                  <Input
                    defaultValue={project?.status || ""}
                    placeholder="Select project status"
                    className="border-0 p-0 h-8 focus-visible:ring-0 text-sm"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-44">
                    <CalendarRange className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm text-muted-foreground">
                      Construction
                    </Label>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          "w-full justify-start text-left font-normal h-8 px-0 py-0 border-0 outline-none focus-visible:ring-0 text-sm",
                          !project?.constructionCompletionDate &&
                            "text-muted-foreground"
                        )}
                      >
                        {project?.constructionCompletionDate ? (
                          format(
                            new Date(project.constructionCompletionDate),
                            "PPP"
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          project?.constructionCompletionDate
                            ? new Date(project.constructionCompletionDate)
                            : undefined
                        }
                        onSelect={() => {}}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Description and Attachments */}
          <div>
            {/* <h3 className="text-xs font-medium mb-4 uppercase text-muted-foreground">Description & Attachments</h3> */}
            <div className="flex flex-col">
              {!project?.description && !showDescription ? (
                <Button
                  variant="link"
                  className="w-fit p-0"
                  onClick={() => setShowDescription(true)}
                >
                  <FileText className="h-4 w-4" />
                  Add Description
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">
                      Project Description
                    </Label>
                    {!project?.description && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={() => setShowDescription(false)}
                      >
                        <X className="size-4" />
                      </Button>
                    )}
                  </div>
                  <Textarea
                    placeholder="Enter project description or other details..."
                    className="min-h-[120px] resize-none"
                    defaultValue={project?.description || ""}
                  />
                </div>
              )}

              {!project?.attachments?.length && !showAttachments ? (
                <Button
                  variant="link"
                  className="w-fit p-0"
                  onClick={() => setShowAttachments(true)}
                >
                  <FileUp className="h-4 w-4" />
                  Add Files
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">
                      Attachments
                    </Label>
                    {!project?.attachments?.length && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={() => setShowAttachments(false)}
                      >
                        <X className="size-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      className="cursor-pointer file:cursor-pointer"
                      multiple
                    />
                    <Button variant="secondary" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  {project?.attachments && project.attachments.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {project.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 rounded-md border text-sm"
                        >
                          <FileIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="flex-1 truncate">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-6"
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Tabbed Content */}
          <Tabs defaultValue="secondary" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="secondary">Secondary Details</TabsTrigger>
              <TabsTrigger value="roles">Role Details</TabsTrigger>
            </TabsList>
            <TabsContent value="secondary" className="space-y-4">
              <div className="space-y-6 py-4">
                {(project?.projectDetails?.length
                  ? project.projectDetails
                  : PROJECT_DETAILS_ITEMS
                ).map((detail: IProjectDetails, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Label className="w-60 flex-shrink-0 capitalize">
                      {detail.key.replace(/_/g, " ")}
                    </Label>
                    {/* <Input
                        value={String(detail.value)}
                        placeholder={`Enter ${detail.key
                          .toLowerCase()
                          .replace(/_/g, " ")}`}
                        className="border-0 p-0 h-8 focus-visible:ring-0"
                      /> */}
                    <Checkbox
                      defaultChecked={detail.value === true}
                      onCheckedChange={() => {}}
                    />
                  </div>
                ))}
              </div>
              <Button variant="secondary" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Field
              </Button>
            </TabsContent>
            <TabsContent value="roles" className="">
              <div className="flex items-center justify-end gap-2 py-2">
                <Label>Advanced Mode</Label>
                <Switch
                  checked={advancedMode}
                  onCheckedChange={setAdvancedMode}
                />
              </div>
              <div className={cn("divide-y", advancedMode ? "" : "divide-y-0")}>
                {Object.values(MemberRole).map((role) => (
                  <div
                    key={role}
                    className={cn(
                      "flex items-start gap-4 ",
                      advancedMode ? "py-4" : "py-2"
                    )}
                  >
                    <Label className="w-48 flex-shrink-0 capitalize">
                      {role.toLowerCase().replace(/_/g, " ")}
                    </Label>
                    <div className="flex-1">
                      <EditableMemberCellWithMode
                        role={role}
                        value={
                          project?.members?.filter((m) => m.role === role) || []
                        }
                        onChange={() => {}}
                        defaultMode={advancedMode ? "advanced" : "basic"}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="secondary" className="w-full my-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Role
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
