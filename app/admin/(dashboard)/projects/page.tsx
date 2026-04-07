import { getProjects } from "@/lib/actions/project-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

interface ProjectType {
  _id: string;
  title: string;
  techStack: string[];
}

export default async function AdminProjectsPage() {
  const projects = (await getProjects()) as ProjectType[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Button asChild className="rounded-full [&_svg]:size-5">
          <Link href="/admin/projects/new">
            <Plus />
            <span className="font-extrabold">Add Project</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">
                No projects found. Add your best work!
              </p>
            </CardContent>
          </Card>
        ) : (
          projects.map((project: ProjectType) => (
            <div
              key={project._id}
              className="p-5 flex items-center justify-between bg-card rounded-lg"
            >
              <div className="flex flex-col items-start space-y-2">
                <CardTitle className="text-lg font-bold">
                  {project.title}
                </CardTitle>
                <div>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {project.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="bg-secondary px-2 py-0.5 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 relative z-10">
                <Button
                  variant="outline"
                  className="rounded-full"
                  size="icon"
                  asChild
                >
                  <Link href={`/admin/projects/${project._id}/edit`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteProjectButton id={project._id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
