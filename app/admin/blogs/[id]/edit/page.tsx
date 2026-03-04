import { getBlogById, updateBlog } from "@/lib/actions/blog-actions";
import { BlogFormClient } from "@/components/admin/BlogFormClient";
import { notFound } from "next/navigation";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const blog = await getBlogById(resolvedParams.id);

  if (!blog) {
    notFound();
  }

  // Bind the id to the updateBlog action
  const updateBlogWithId = updateBlog.bind(null, resolvedParams.id);

  return (
    <div className="w-full h-[calc(100vh-theme(spacing.24))] pb-4">
      <BlogFormClient
        action={updateBlogWithId}
        formTitle="Edit Blog Post"
        submitText="Save Changes"
        initialData={{
          title: blog.title,
          category: blog.category,
          image: blog.image,
          excerpt: blog.excerpt,
          content: blog.content,
        }}
      />
    </div>
  );
}
