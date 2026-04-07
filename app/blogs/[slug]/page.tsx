import { getBlogBySlug } from "@/lib/actions/blog-actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sayemmolla.dev";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);
  if (!blog) return { title: "Not Found" };

  const pageUrl = `${SITE_URL}/blogs/${resolvedParams.slug}`;
  const imageUrl = blog.image?.startsWith("http")
    ? blog.image
    : blog.image
      ? `${SITE_URL}${blog.image}`
      : `${SITE_URL}/og-image.png`;

  return {
    title: `${blog.title} | Sayem Molla`,
    description: blog.excerpt,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.excerpt,
      url: pageUrl,
      siteName: "Sayem Molla",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: blog.title }],
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      tags: blog.category ? [blog.category] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [imageUrl],
      creator: "@sayemmolla",
    },
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

  const pageUrl = `${SITE_URL}/blogs/${resolvedParams.slug}`;
  const imageUrl = blog.image?.startsWith("http")
    ? blog.image
    : blog.image
      ? `${SITE_URL}${blog.image}`
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    url: pageUrl,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    author: {
      "@type": "Person",
      name: "Sayem Molla",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Sayem Molla",
      url: SITE_URL,
    },
    ...(imageUrl ? { image: imageUrl } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={1200}
                  height={675}
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
