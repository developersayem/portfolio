import { createBlog } from "@/lib/actions/blog-actions";
import { BlogFormClient } from "@/components/admin/BlogFormClient";

export default function NewBlogPage() {
  return (
    <div className="w-full h-[calc(100vh-theme(spacing.24))] pb-4">
      <BlogFormClient
        action={createBlog}
        formTitle="Create New Blog Post"
        submitText="Publish Blog"
      />
    </div>
  );
}
