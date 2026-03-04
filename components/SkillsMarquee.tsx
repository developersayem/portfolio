"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const skills = [
  "REACT",
  "NODE.JS",
  "TYPESCRIPT",
  "NEXT.JS",
  "PYTHON",
  "AWS",
  "DOCKER",
  "POSTGRESQL",
  "MONGODB",
  "GRAPHQL",
  "TAILWIND",
  "FIGMA",
];

const SkillsMarquee = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  // Shift the marquee row slightly on scroll for a subtle depth-skew feel
  const rowX = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      id="skills"
      className="py-16 border-y border-border overflow-hidden relative"
      ref={ref}
    >
      {/* Parallax ambient glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] rounded-full bg-primary/8 blur-[100px]" />
      </motion.div>

      {/* Marquee row with scroll-driven X drift */}
      <motion.div
        style={{ x: rowX, opacity }}
        className="animate-marquee flex whitespace-nowrap relative"
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
    </section>
  );
};

export default SkillsMarquee;
