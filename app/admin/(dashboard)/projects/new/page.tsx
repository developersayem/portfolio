import { createProject } from "@/lib/actions/project-actions";
import { ProjectFormClient } from "@/components/admin/ProjectFormClient";

export default function NewProjectPage() {
  return (
    <div className="w-full h-full pb-4">
      <ProjectFormClient
        action={createProject}
        formTitle="Add New Project"
        submitText="Add Project"
      />
    </div>
  );
}
