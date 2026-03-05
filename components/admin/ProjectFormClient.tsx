"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AdminBlogEditor } from "@/components/AdminBlogEditor";
import { useToast } from "@/components/ui/use-toast";

interface ProjectFormClientProps {
  initialData?: {
    title: string;
    shortDescription: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
  };
  formTitle: string;
  submitText: string;
  action: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

export function ProjectFormClient({
  initialData,
  formTitle,
  submitText,
  action,
}: ProjectFormClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await action(formData);

      if (result.success) {
        toast({
          title: "Success",
          description: `Project successfully ${initialData ? "updated" : "created"}!`,
        });
        router.push("/admin/projects");
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to save project.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="min-h-[calc(100vh-theme(spacing.24))] flex flex-col border-0 shadow-none sm:border sm:shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col">
        {initialData && (
          <input
            type="hidden"
            name="currentImage"
            value={initialData.image || ""}
          />
        )}

        <CardHeader className="pb-4 shrink-0 flex flex-row items-center justify-between space-y-0">
          <CardTitle>{formTitle}</CardTitle>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/admin/projects")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitText}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Project name"
                  defaultValue={initialData?.title}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                <Input
                  id="techStack"
                  name="techStack"
                  placeholder="React, Next.js, tailwind, etc."
                  defaultValue={initialData?.techStack?.join(", ")}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    placeholder="https://github.com/..."
                    defaultValue={initialData?.githubUrl}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="liveUrl">Live URL</Label>
                  <Input
                    id="liveUrl"
                    name="liveUrl"
                    placeholder="https://..."
                    defaultValue={initialData?.liveUrl}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">
                  Project Image {initialData && "(Optional)"}
                </Label>
                {initialData && (
                  <div className="text-xs text-muted-foreground mb-1">
                    Upload a new image to replace the current one, or leave
                    empty to keep it.
                  </div>
                )}
                {initialData?.image && (
                  <div className="mb-2 rounded overflow-hidden border border-border w-24 h-16 relative">
                    <img
                      src={initialData.image}
                      alt="Current image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="cursor-pointer file:cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDescription">
                Short Description (Excerpt)
              </Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                className="h-full min-h-[108px] resize-none"
                placeholder="Short description for the project card"
                defaultValue={initialData?.shortDescription}
                required
              />
            </div>
          </div>

          <div className="space-y-2 flex flex-col pb-2">
            <Label>Full Description</Label>
            <p className="text-xs text-muted-foreground">
              You can use Markdown here to add formatting, multiple links, or
              images.
            </p>
            <div className="border rounded-md">
              <AdminBlogEditor
                name="description"
                initialValue={initialData?.description || ""}
              />
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
