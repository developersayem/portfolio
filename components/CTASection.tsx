"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { StarDecor, DotGrid, RingDecor } from "./ParallaxLayer";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Parallax elements */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
        <RingDecor size={600} className="absolute -left-40 top-0 opacity-10" />
        <RingDecor
          size={400}
          className="absolute -right-20 bottom-0 opacity-10"
        />
        <StarDecor
          size={50}
          className="absolute left-16 top-20 opacity-20 text-primary"
        />
        <StarDecor
          size={30}
          className="absolute right-20 bottom-32 opacity-20 text-primary"
        />
        <DotGrid
          cols={15}
          rows={3}
          className="absolute left-1/2 -translate-x-1/2 top-10 opacity-15"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Let's Build Something
            <br />
            <span className="text-gradient">Extraordinary</span> Together
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your vision
            to life with cutting-edge technology and thoughtful design.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold glow-primary hover:scale-105 transition-transform duration-300"
            >
              Start a Project
              <ArrowUpRight size={18} />
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border text-foreground font-bold hover:border-primary/50 transition-colors duration-300"
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
