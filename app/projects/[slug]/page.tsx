import { getProjectBySlug } from "@/lib/actions/project-actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, Globe } from "lucide-react";
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
  const project = await getProjectBySlug(resolvedParams.slug);
  if (!project) return { title: "Not Found" };

  const pageUrl = `${SITE_URL}/projects/${resolvedParams.slug}`;
  const imageUrl = project.image?.startsWith("http")
    ? project.image
    : project.image
      ? `${SITE_URL}${project.image}`
      : `${SITE_URL}/og-image.png`;

  return {
    title: `${project.title} | Sayem Molla`,
    description: project.shortDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      title: project.title,
      description: project.shortDescription,
      url: pageUrl,
      siteName: "Sayem Molla",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
      images: [imageUrl],
      creator: "@sayemmolla",
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <article className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          <header className="mb-12">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-medium"
                >
                  <Github size={16} /> View Source Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-medium"
                >
                  <Globe size={16} /> Visit Live Site
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="bg-secondary/50 border border-border/50 px-3 py-1 rounded-full text-sm text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.image && (
              <div className="mt-8 rounded-3xl overflow-hidden border border-border/50 bg-muted/20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </header>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-3xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.description}
            </ReactMarkdown>
          </div>
        </article>
      </main>

      <FooterSection />
    </div>
  );
}
