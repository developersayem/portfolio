"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Monitor,
  ShoppingBag,
  Database,
  Rocket,
  Zap,
  Settings,
} from "lucide-react";
import { StarDecor, DotGrid, RingDecor } from "./ParallaxLayer";

const services = [
  {
    icon: Monitor,
    title: "Web Application Development",
    desc: "Custom web applications built with React, Next.js, and modern frameworks. Responsive, fast, and SEO-optimized.",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce Solutions",
    desc: "Building high-conversion online stores with secure payment integrations and seamless user experiences.",
  },
  {
    icon: Database,
    title: "Backend & Database Engineering",
    desc: "Robust server-side solutions with optimized databases, ensuring high availability and scalability.",
  },
  {
    icon: Rocket,
    title: "DevOps & Deployment",
    desc: "Automated CI/CD pipelines and cloud infrastructure management for seamless and reliable deployments.",
  },
  {
    icon: Zap,
    title: "Performance & Optimization",
    desc: "Technical audits and optimizations to ensure lightning-fast load times and peak application performance.",
  },
  {
    icon: Settings,
    title: "Maintenance & Long-Term Support",
    desc: "Continuous monitoring, security updates, and feature enhancements to keep your application running smoothly.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const slowY = useTransform(scrollYProgress, [0, 1], ["120px", "-120px"]);
  const fastY = useTransform(scrollYProgress, [0, 1], ["60px", "-200px"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["80px", "-140px"]);

  return (
    <section id="services" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Parallax layer 1 — large ring, slow */}
      <motion.div
        style={{ y: slowY }}
        className="absolute -right-32 top-0 pointer-events-none"
      >
        <RingDecor size={420} />
      </motion.div>
      {/* Parallax layer 2 — spinning star, fast */}
      <motion.div
        style={{ y: fastY }}
        className="absolute left-12 bottom-20 pointer-events-none text-primary opacity-25"
      >
        <StarDecor size={56} />
      </motion.div>
      {/* Parallax layer 3 — dot grid, mid speed */}
      <motion.div
        style={{ y: midY }}
        className="absolute left-4 top-12 pointer-events-none opacity-30"
      >
        <DotGrid cols={6} rows={5} />
      </motion.div>
      {/* Parallax layer 4 — small star top-right */}
      <motion.div
        style={{ y: fastY }}
        className="absolute right-24 bottom-8 pointer-events-none text-primary/30"
      >
        <StarDecor size={28} />
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">
            What I Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Services & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            End-to-end digital solutions from concept to deployment, backed by
            years of hands-on experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-all duration-500 hover:glow-green relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <s.icon size={24} />
                </div>
                <h3 className="font-display text-lg font-bold mb-3">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
