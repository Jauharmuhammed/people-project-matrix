import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import projectsData from "@/data/projects.json";
import { IProject, ProjectStatus } from "@/lib/types";

// Transform the data to match IProject interface
const transformedData: IProject[] = projectsData.projects.map((project) => ({
  id: project.id,
  title: project.name,
  client: project.client,
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
    <div className="h-full flex-1 flex-col space-y-8 px-8 pb-4 md:flex">
      <DataTable columns={columns} data={transformedData} />
    </div>
  );
}
