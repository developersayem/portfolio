"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Search, Github, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { StarDecor, DotGrid, RingDecor } from "@/components/ParallaxLayer";

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

const ProjectClient = ({ projects }: { projects: Project[] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const allTechStacks = useMemo(() => {
    const stacks = new Set<string>();
    projects.forEach((p) => {
      p.techStack.forEach((stack) => stacks.add(stack));
    });
    return ["All", ...Array.from(stacks).sort()];
  }, [projects]);

  const filteredProjects = projects.filter((p) => {
    return (
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    );
  });

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] -left-20 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[40%] -right-20 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
        <RingDecor size={300} className="absolute left-10 top-1/4 opacity-10" />
        <RingDecor
          size={500}
          className="absolute right-10 top-3/4 opacity-10"
        />
        <StarDecor
          size={40}
          className="absolute left-1/4 top-[15%] text-primary opacity-20"
        />
        <StarDecor
          size={60}
          className="absolute right-[15%] top-1/2 text-primary opacity-20"
        />
        <DotGrid
          cols={6}
          rows={6}
          className="absolute left-[5%] bottom-[10%] opacity-15"
        />
      </div>

      <main className="flex-grow pt-32 pb-24 relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-8 hover:gap-3 transition-all"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              My <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A collection of digital experiences, products, and applications
              I&apos;ve built with modern technologies.
            </p>
          </motion.div>
        </section>

        {/* Search and Filters */}
        <section className="container mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                size={18}
              />
              <Input
                placeholder="Search projects or tools..."
                className="pl-12 h-12 rounded-full bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto max-w-full overflow-hidden">
              <Carousel
                opts={{ align: "start", dragFree: true }}
                className="w-full"
              >
                <CarouselContent className="ml-0 md:-ml-2">
                  {allTechStacks.map((stack) => (
                    <CarouselItem
                      key={stack}
                      className="pl-0 md:pl-2 basis-auto"
                    >
                      <button
                        onClick={() =>
                          setSearchQuery(stack === "All" ? "" : stack)
                        }
                        className={`px-6 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all ${
                          searchQuery === stack ||
                          (stack === "All" && searchQuery === "")
                            ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 cursor-default"
                            : "bg-card/40 border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground cursor-pointer"
                        }`}
                      >
                        {stack}
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="container mx-auto px-6">
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative h-full"
                >
                  <div className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden hover:border-primary/40 hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative">
                    {/* Main Card Action (Overlay Link) */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="absolute inset-0 z-10"
                      aria-label={`View ${project.title}`}
                    />

                    {/* Image Container */}
                    {project.image ? (
                      <div className="h-64 relative overflow-hidden bg-muted/20">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                          <span className="text-primary text-sm font-bold flex items-center gap-2">
                            View Case Study <ArrowUpRight size={16} />
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 bg-secondary/20 flex items-center justify-center relative overflow-hidden">
                        <span className="text-4xl font-display font-bold text-muted-foreground/20">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Content Container */}
                    <div className="p-8 flex-grow flex flex-col relative z-20 pointer-events-none">
                      <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                        {project.shortDescription}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Footer Actions (Interactive Layer) */}
                      <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between relative z-30 pointer-events-auto">
                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                          Explore <ArrowUpRight size={14} />
                        </span>

                        <div className="flex items-center gap-4">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors p-1"
                              aria-label="GitHub Repository"
                            >
                              <Github size={18} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors p-1"
                              aria-label="Live Demo"
                            >
                              <Globe size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-card/20 backdrop-blur-xl border border-dashed border-border/50 rounded-[3rem]">
              <p className="text-muted-foreground text-xl mb-4">
                No projects found matching your selection.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                }}
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                Reset all filters
              </button>
            </div>
          )}
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default ProjectClient;
