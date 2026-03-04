"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "E-Commerce Platform",
    desc: "Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
  },
  {
    title: "SaaS Analytics Dashboard",
    desc: "Real-time analytics dashboard with interactive charts, user segmentation, and automated reporting.",
    tags: ["Next.js", "TypeScript", "D3.js", "AWS"],
  },
  {
    title: "AI Content Generator",
    desc: "AI-powered content creation tool with natural language processing and multi-language support.",
    tags: ["Python", "React", "OpenAI", "Docker"],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Parallax glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[500px] rounded-full bg-primary/6 blur-[150px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-all duration-500 hover:glow-green"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
