import { getBlogs } from "@/lib/actions/blog-actions";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sayemmolla.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();

  const blogEntries: MetadataRoute.Sitemap = blogs.map(
    (blog: { slug: string; updatedAt?: string; createdAt?: string }) => ({
      url: `${SITE_URL}/blogs/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || blog.createdAt || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogEntries,
  ];
}
