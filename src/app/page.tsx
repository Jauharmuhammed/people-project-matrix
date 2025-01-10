import { DataTable } from "@/components/tables/data-table";
import { columns } from "@/components/tables/columns";
import projectsData from "@/data/projects.json";
import { IProject, ProjectStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Transform the data to match IProject interface
const transformedData: IProject[] = projectsData.projects.map((project) => ({
  id: project.id,
  title: project.name,
  client: "Client Name",
  location: project.location,
  designCompletionDate: project.startDate,
  constructionCompletionDate: project.estimatedEndDate,
  cost: project.budget,
  status: project.status as unknown as ProjectStatus,
  projectDetails: [],
  members: [],
}));

export default function ProjectsPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable columns={columns} data={transformedData} />
    </div>
  );
}
