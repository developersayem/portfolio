import { getProjectById, updateProject } from "@/lib/actions/project-actions";
import { ProjectFormClient } from "@/components/admin/ProjectFormClient";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const updateAction = updateProject.bind(null, project._id);

  return (
    <div className="w-full h-full pb-4">
      <ProjectFormClient
        initialData={project}
        action={updateAction}
        formTitle="Edit Project"
        submitText="Save Changes"
      />
    </div>
  );
}
