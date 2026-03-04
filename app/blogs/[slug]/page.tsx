import { getBlogBySlug } from "@/lib/actions/blog-actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);
  if (!blog) return { title: "Not Found" };
  return {
    title: `${blog.title} | Sayem Molla`,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <article className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} /> Back to Blogs
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold tracking-wide uppercase">
                {blog.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                <Calendar size={16} /> {blog.date}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {blog.excerpt}
              </p>
            )}
            {blog.image && (
              <div className="mt-8 rounded-3xl overflow-hidden border border-border/50">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </header>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-3xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>

      <FooterSection />
    </div>
  );
}
