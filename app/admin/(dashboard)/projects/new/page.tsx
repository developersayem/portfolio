import { createProject } from "@/lib/actions/project-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

export default function NewProjectPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const result = await createProject(formData);
    if (result.success) {
      redirect("/admin/projects");
    }
  }

  return (
    <div className="w-full pb-4">
      <Card className="border-0 shadow-none sm:border sm:shadow-sm">
        <form action={handleSubmit}>
          <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle>Add New Project</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" type="button" asChild>
                <a href="/admin/projects">Cancel</a>
              </Button>
              <Button type="submit">Add Project</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Project name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="techStack">
                    Tech Stack (comma separated)
                  </Label>
                  <Input
                    id="techStack"
                    name="techStack"
                    placeholder="React, Next.js, tailwind, etc."
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="h-[108px] resize-none"
                  placeholder="Short description of the project"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="liveUrl">Live URL</Label>
                <Input id="liveUrl" name="liveUrl" placeholder="https://..." />
              </div>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
