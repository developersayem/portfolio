"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { StarDecor, DotGrid } from "./ParallaxLayer";

const skills = [
  "JavaScript",
  "React.js",
  "Next.js",
  "Vite.js",
  "Zustand",
  "Tailwind CSS",
  "Shadcn",
  "Framer Motion",
  "React Query",
  "Figma",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Mongoose",
  "RESTful API",
  "PostgreSQL",
  "Drizzle",
  "Docker",
  "TypeScript",
  "Git",
  "GitHub",
  "JWT",
  "Zod",
  "Firebase",
  "GHL",
];

interface SkillsMarqueeProps {
  speed?: number; // seconds for one full loop
}

const SkillsMarquee: React.FC<SkillsMarqueeProps> = ({ speed = 20 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );

  // Measure width of marquee content
  useEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth / 2); // half because we duplicate array
    }
  }, []);

  return (
    <section
      id="skills"
      ref={scrollRef}
      className="py-16 border-y border-border overflow-hidden relative"
    >
      {/* Parallax background glow and dots */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] rounded-full bg-primary/8 blur-[100px]" />
        <DotGrid
          cols={12}
          rows={2}
          className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-20"
        />
        <DotGrid
          cols={12}
          rows={2}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-20"
        />
      </motion.div>

      {/* Floating Stars */}
      <motion.div
        style={{ y: bgY }}
        className="absolute left-10 top-4 opacity-20 pointer-events-none text-primary"
      >
        <StarDecor size={24} />
      </motion.div>
      <motion.div
        style={{ y: bgY }}
        className="absolute right-10 bottom-4 opacity-20 pointer-events-none text-primary"
      >
        <StarDecor size={24} />
      </motion.div>

      {/* Scroll-parallax wrapper */}
      <motion.div style={{ opacity }}>
        {/* Marquee row */}
        <motion.div
          ref={containerRef}
          className="flex whitespace-nowrap relative"
          animate={{ x: [-0, -contentWidth] }}
          transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        >
          {[...skills, ...skills].map((skill, i) => (
            <span key={i} className="flex items-center gap-6 mx-6">
              <span className="font-display text-4xl md:text-6xl font-extrabold text-foreground/10 hover:text-primary transition-colors duration-500">
                {skill}
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                className="text-primary opacity-40"
                fill="currentColor"
              >
                <path d="M16 0L18.5 13.5L32 16L18.5 18.5L16 32L13.5 18.5L0 16L13.5 13.5Z" />
              </svg>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsMarquee;
