"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiPostgresql,
  SiDocker,
  SiTypescript,
  SiGit,
  SiGithub,
  SiJsonwebtokens,
  SiZod,
  SiFirebase,
  SiDrizzle,
  SiReactquery,
  SiShadcnui,
  SiFigma,
} from "react-icons/si";
import { GiBearHead } from "react-icons/gi";
import { TbDeviceMobile, TbApi } from "react-icons/tb";
import { LuLayers, LuLayoutGrid, LuServer } from "react-icons/lu";
import { StarDecor, DotGrid, RingDecor } from "./ParallaxLayer";

const skillsData = [
  {
    category: "Front-end",
    icon: LuLayoutGrid,
    skills: [
      { name: "Javascript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "Vite.js", icon: SiVite, color: "#646CFF" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Responsive Design", icon: TbDeviceMobile, color: "#10B981" },
      { name: "Shadcn", icon: SiShadcnui, color: "#ffffff" },
      { name: "Framer motion", icon: SiFramer, color: "#0055FF" },
    ],
  },
  {
    category: "Back-end",
    icon: LuServer,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#ffffff" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Mongoose", icon: SiMongoose, color: "#880000" },
      { name: "RESTful API", icon: TbApi, color: "#FF6C37" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Drizzle", icon: SiDrizzle, color: "#C5F11C" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
    ],
  },
  {
    category: "Other",
    icon: LuLayers,
    skills: [
      { name: "Typescript", icon: SiTypescript, color: "#3178C6" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Github", icon: SiGithub, color: "#ffffff" },
      { name: "JWT", icon: SiJsonwebtokens, color: "#000000" },
      { name: "Zod", icon: SiZod, color: "#3E67B1" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Figma", icon: SiFigma, color: "#FF6C37" },
      { name: "Zustand", icon: GiBearHead, color: "#ffffff" },
    ],
  },
];

const TechStackSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const slowY = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"]);
  const fastY = useTransform(scrollYProgress, [0, 1], ["40px", "-120px"]);

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden bg-background"
      ref={ref}
    >
      {/* Background Decor */}
      <motion.div
        style={{ y: slowY }}
        className="absolute -left-20 top-20 opacity-20 pointer-events-none"
      >
        <RingDecor size={300} />
      </motion.div>
      <motion.div
        style={{ y: fastY }}
        className="absolute right-10 bottom-20 opacity-10 pointer-events-none text-primary"
      >
        <StarDecor size={60} />
      </motion.div>
      <motion.div
        style={{ y: slowY }}
        className="absolute -right-40 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none"
      >
        <RingDecor size={600} />
      </motion.div>
      <motion.div
        style={{ y: fastY }}
        className="absolute left-1/4 top-40 opacity-20 pointer-events-none text-primary"
      >
        <StarDecor size={32} />
      </motion.div>
      <motion.div
        style={{ y: slowY }}
        className="absolute left-1/2 -translate-x-1/2 top-10 opacity-10 pointer-events-none"
      >
        <DotGrid cols={10} rows={3} />
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">
            Expertise
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive set of tools and technologies I use to build robust,
            scalable, and modern digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-card/40 backdrop-blur-sm border border-border rounded-3xl p-8 hover:border-primary/40 transition-all duration-500 hover:glow-green"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  <category.icon size={24} />
                </div>
                <h3 className="font-display text-xl font-bold">
                  {category.category}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, sIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: 0.3 + idx * 0.1 + sIdx * 0.05,
                    }}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/30 border border-transparent hover:border-primary/20 hover:bg-secondary transition-all duration-300 group/item"
                  >
                    <div
                      className="flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                      style={{ color: skill.color }}
                    >
                      <skill.icon size={20} />
                    </div>
                    <span className="text-xs font-medium text-foreground/80 group-hover/item:text-foreground transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
