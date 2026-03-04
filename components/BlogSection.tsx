"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";

const posts = [
  {
    date: "Feb 15, 2026",
    category: "Engineering",
    title: "Building Scalable Microservices with Node.js and Docker",
    desc: "A deep dive into designing microservice architectures that scale horizontally, with practical patterns for service discovery and load balancing.",
  },
  {
    date: "Jan 28, 2026",
    category: "Frontend",
    title: "Advanced React Patterns Every Developer Should Know",
    desc: "Exploring compound components, render props, and custom hooks to create flexible and reusable UI components.",
  },
  {
    date: "Jan 10, 2026",
    category: "Startup",
    title: "Lessons Learned Co-Founding a Tech Startup",
    desc: "From ideation to first paying customers — the real challenges of building a tech company and how we overcame them.",
  },
];

const BlogSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

  return (
    <section
      className="py-24 border-t border-border relative overflow-hidden"
      ref={ref}
    >
      {/* Parallax glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[140px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">
              Blog
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Latest <span className="text-gradient">Articles</span>
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
          >
            View All <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500"
            >
              <div className="h-48 bg-secondary/50 flex items-center justify-center">
                <span className="text-6xl font-display font-extrabold text-foreground/5 group-hover:text-primary/10 transition-colors duration-500">
                  0{i + 1}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} /> {post.date}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {post.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
