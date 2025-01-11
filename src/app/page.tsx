import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable columns={columns} data={projects} />
    </div>
  );
}
