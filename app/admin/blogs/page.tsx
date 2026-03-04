import { getBlogs, deleteBlog } from "@/lib/actions/blog-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteBlogButton } from "@/components/admin/DeleteBlogButton";

export default async function AdminBlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <Button asChild>
          <Link href="/admin/blogs/new">
            <Plus className="mr-2 h-4 w-4" /> Add Blog
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {blogs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">
                No blogs found. Create your first post!
              </p>
            </CardContent>
          </Card>
        ) : (
          blogs.map((blog: any) => (
            <Card key={blog._id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">
                  {blog.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/admin/blogs/${blog._id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteBlogButton id={blog._id.toString()} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                    {blog.category}
                  </span>
                  <span>{blog.date}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
