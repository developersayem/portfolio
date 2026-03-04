"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { StarDecor, DotGrid, RingDecor } from "./ParallaxLayer";
import { ExperienceBadge } from "./experienceBadge";
const portraitImg = "/sayem-portrait.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const slowY = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
  const fastY = useTransform(scrollYProgress, [0, 1], ["60px", "-180px"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Parallax layer 1 — large ring behind the image */}
      <motion.div
        style={{ y: slowY }}
        className="absolute -left-40 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <RingDecor size={500} />
      </motion.div>
      {/* Parallax layer 2 — star, fast */}
      <motion.div
        style={{ y: fastY }}
        className="absolute right-16 top-12 pointer-events-none text-primary opacity-20"
      >
        <StarDecor size={52} />
      </motion.div>
      {/* Parallax layer 3 — dot grid on the right */}
      <motion.div
        style={{ y: slowY }}
        className="absolute right-4 bottom-8 pointer-events-none opacity-30"
      >
        <DotGrid cols={7} rows={4} />
      </motion.div>

      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with own parallax speed */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden border border-border">
              <img
                src={portraitImg}
                alt="Sayem Molla"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-full p-4 glow-green flex flex-col items-center">
              <ExperienceBadge
                text="YEARS EXPERIENCE • FULL STACK DEVELOPER • "
                radius={80}
                duration={15}
                center={
                  <div className="w-24 h-24 rounded-full bg-black text-primary flex items-center justify-center text-6xl font-bold">
                    3+
                  </div>
                }
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">
              About Me
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Full Stack Engineer &<br />
              <span className="text-gradient">Digital Architect</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I’m a Full Stack Developer specializing in building scalable
              digital products and high-performance web applications using
              modern technologies. I design and develop complete systems — from
              robust backend architectures to responsive, conversion-focused
              frontends.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              With a deep focus on Next.js, React, Node.js, and the MERN stack,
              I prioritize writing clean, maintainable code and building systems
              that are optimized for real-world performance.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              As a Co-Founder at Softxet, I lead technical strategy and
              full-stack development for diverse client projects, transforming
              complex business needs into production-ready software solutions.
            </p>
            <p className="text-muted-foreground font-medium leading-relaxed mb-8">
              I don’t just write code — I build structured digital products
              engineered for growth and reliability.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
