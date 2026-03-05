"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { StarDecor, DotGrid, RingDecor } from "./ParallaxLayer";

interface Project {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Parallax elements */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[500px] rounded-full bg-primary/6 blur-[150px]" />
        <RingDecor size={400} className="absolute -left-20 top-20 opacity-20" />
        <RingDecor
          size={600}
          className="absolute -right-40 top-1/2 -translate-y-1/2 opacity-15"
        />
        <StarDecor
          size={50}
          className="absolute right-10 top-40 opacity-20 text-primary"
        />
        <DotGrid
          cols={8}
          rows={4}
          className="absolute left-10 bottom-20 opacity-20"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">
              Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
          >
            View All{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-up-right"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:glow-green"
            >
              <Link
                href={`/projects/${p.slug}`}
                className="block block-content"
              >
                {p.image && (
                  <div className="w-full h-56 overflow-hidden bg-muted/20 border-b border-border/50">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  {p.shortDescription && (
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                      {p.shortDescription}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.techStack.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 justify-end">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors z-10 relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                    )}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors z-10 relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
