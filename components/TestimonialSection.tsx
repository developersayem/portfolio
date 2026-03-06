"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { StarDecor, DotGrid, RingDecor } from "./ParallaxLayer";

const testimonials = [
  {
    text: "Working with Sayem was an incredible experience. He delivered a world-class platform that exceeded our expectations in both design and functionality.",
    name: "Sarah Mitchell",
    role: "CEO, TechVentures Inc.",
    rating: 5,
  },
  {
    text: "The attention to detail and technical expertise was outstanding. Our e-commerce platform saw a 200% increase in conversions after the redesign.",
    name: "James Rodriguez",
    role: "CTO, ShopFlow",
    rating: 5,
  },
  {
    text: "They don't just write code — they understand business problems. The analytics dashboard they built completely transformed how we make decisions.",
    name: "Emily Chen",
    role: "VP Product, DataSync",
    rating: 5,
  },
];

const TestimonialSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      className="py-24 border-t border-border relative overflow-hidden"
      ref={ref}
    >
      {/* Parallax elements */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[130px] -translate-y-1/2 translate-x-1/4" />
        <RingDecor
          size={500}
          className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-10"
        />
        <StarDecor
          size={40}
          className="absolute left-1/4 top-20 opacity-15 text-primary"
        />
        <DotGrid
          cols={10}
          rows={2}
          className="absolute left-10 top-4 opacity-20"
        />
        <DotGrid
          cols={10}
          rows={2}
          className="absolute right-10 bottom-4 opacity-20"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            What Clients <span className="text-gradient">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card border border-border rounded-2xl p-8 relative"
            >
              <span className="absolute top-6 right-8 text-5xl font-display font-bold text-primary/10">
                &quot;
              </span>
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {t.text}
              </p>
              <div>
                <p className="font-display font-bold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
