"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { StarDecor, DotGrid, RingDecor } from "./ParallaxLayer";

const experiences = [
  {
    year: "Sep 2024 – Present",
    role: "Co-Founder & Lead Developer",
    company: "Softxet",
    desc: "Directing technical architecture and product strategy for scalable MERN stack applications. Leading full-cycle development from initial concept to production deployment, focusing on high-performance APIs, robust database design, and conversion-optimized user experiences.",
  },
  {
    year: "Jan 2025 – Present",
    role: "Lead MERN Stack Developer",
    company: "Softsheba.com · Part-time",
    desc: "Leading MERN stack development for high-performance and scalable solutions in a remote setting.",
  },
  {
    year: "Apr 2025 – Sep 2025",
    role: "MERN Stack Developer",
    company: "Cyberloom IT Technologies · Part-time",
    desc: "Developed modern web applications focusing on frontend excellence and seamless user experiences.",
  },
  {
    year: "Sep 2024 – Apr 2025",
    role: "MERN Stack Developer",
    company: "CraftFunnel (Voice AI Center) · Full-time",
    desc: "Worked on complex API integrations and core React.js features for the CraftFunnel platform.",
  },
  {
    year: "Aug 2024 – Sep 2024",
    role: "MERN Stack Developer (Intern)",
    company: "CraftFunnel (Voice AI Center) · Full-time",
    desc: "Gained hands-on experience in MERN stack development and professional engineering workflows.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const slowY = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"]);
  const fastY = useTransform(scrollYProgress, [0, 1], ["40px", "-150px"]);
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="py-24 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Decor */}
      <motion.div
        style={{ y: slowY }}
        className="absolute -right-20 top-40 opacity-40 pointer-events-none"
      >
        <RingDecor size={350} />
      </motion.div>
      <motion.div
        style={{ y: slowY }}
        className="absolute left-1/2 -translate-x-1/2 top-4 opacity-10 pointer-events-none"
      >
        <DotGrid cols={12} rows={3} />
      </motion.div>
      <motion.div
        style={{ y: fastY }}
        className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none"
      >
        <RingDecor size={500} />
      </motion.div>
      <motion.div
        style={{ y: fastY }}
        className="absolute left-10 bottom-20 opacity-15 pointer-events-none text-primary"
      >
        <StarDecor size={45} />
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">
            Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border/50">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-primary origin-top"
            />
          </div>

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`relative flex items-start mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-row`}
            >
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10 mt-2" />

              {/* Content */}
              <div
                className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 text-left"}`}
              >
                <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                  {exp.year}
                </span>
                <h3 className="font-display text-xl font-bold mt-1">
                  {exp.role}
                </h3>
                <p className="text-foreground/80 text-sm font-medium mb-2">
                  {exp.company}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
