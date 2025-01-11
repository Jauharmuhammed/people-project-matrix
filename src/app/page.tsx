import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import projectsData from "@/data/projects.json";
import { IProject, ProjectStatus, FieldType, MemberRole } from "@/lib/types";

// Transform the data to match IProject interface
const transformedData: IProject[] = projectsData.projects.map((project) => ({
  id: project.id,
  title: project.title,
  client: project.client,
  location: project.location,
  designCompletionDate: project.designCompletionDate,
  constructionCompletionDate: project.constructionCompletionDate,
  cost: project.cost,
  status: project.status as ProjectStatus,
  projectDetails: project.projectDetails.map(detail => ({
    ...detail,
    type: detail.type as FieldType
  })),
  members: project.members.map(id => ({
    id,
    name: id,
    email: `${id}@example.com`,
    profilePicture: "",
    role: "QC MANAGER" as MemberRole
  })),
}));

export default function ProjectsPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable columns={columns} data={transformedData} />
    </div>
  );
}
