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

interface BlogFormClientProps {
  initialData?: {
    title: string;
    category: string;
    image: string;
    excerpt: string;
    content: string;
  };
  formTitle: string;
  submitText: string;
  action: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

export function BlogFormClient({
  initialData,
  formTitle,
  submitText,
  action,
}: BlogFormClientProps) {
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
          description: `Blog post successfully ${initialData ? "updated" : "created"}!`,
        });
        router.push("/admin/blogs");
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to save blog post.",
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
    <Card className="h-full flex flex-col border-0 shadow-none sm:border sm:shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
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
              onClick={() => router.push("/admin/blogs")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitText}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden flex flex-col space-y-4">
          <div className="grid md:grid-cols-2 gap-4 shrink-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Blog post title"
                  defaultValue={initialData?.title}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="e.g. Engineering, Frontend"
                  defaultValue={initialData?.category}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">
                  Blog Cover Image {initialData && "(Optional)"}
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
                      alt="Current cover"
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
                  required={!initialData}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                className="h-full min-h-[108px] resize-none"
                placeholder="Short description for the listing"
                defaultValue={initialData?.excerpt}
                required
              />
            </div>
          </div>

          <div className="space-y-2 flex flex-col flex-1 overflow-hidden pb-2">
            <Label>Content</Label>
            <div className="flex-1 overflow-hidden border rounded-md">
              <AdminBlogEditor
                name="content"
                initialValue={initialData?.content || ""}
              />
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
