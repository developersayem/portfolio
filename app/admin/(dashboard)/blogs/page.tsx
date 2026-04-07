import { getBlogs } from "@/lib/actions/blog-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteBlogButton } from "@/components/admin/DeleteBlogButton";

interface BlogType {
  _id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
}

export default async function AdminBlogsPage() {
  const blogs = (await getBlogs()) as BlogType[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <Button asChild className="rounded-full [&_svg]:size-5">
          <Link href="/admin/blogs/new">
            <Plus />
            <span className="font-extrabold">Add Blog</span>
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
          blogs.map((blog: BlogType) => (
            <div
              key={blog._id}
              className="p-5 flex items-center justify-between bg-card rounded-lg"
            >
              <div>
                <div className="flex flex-row items-center justify-between space-y-0 p-0">
                  <CardTitle className="text-lg font-bold">
                    {blog.title}
                  </CardTitle>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                      {blog.category}
                    </span>
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="rounded-full"
                  size="icon"
                  asChild
                >
                  <Link href={`/admin/blogs/${blog._id}/edit`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteBlogButton id={blog._id.toString()} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
