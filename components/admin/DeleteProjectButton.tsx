"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteProject } from "@/lib/actions/project-actions";
import { useToast } from "@/components/ui/use-toast";

export function DeleteProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this project?")) {
      startTransition(async () => {
        const result = await deleteProject(id);
        if (result.success) {
          toast({
            title: "Project deleted",
            description: "The project has been successfully removed.",
          });
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to delete project.",
            variant: "destructive",
          });
        }
      });
    }
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      className="rounded-full"
      onClick={handleDelete}
      disabled={isPending}
      title="Delete Project"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
