"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { StarDecor, DotGrid, RingDecor } from "./ParallaxLayer";
import Link from "next/link";
import Image from "next/image";

interface Post {
  _id: string;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image?: string;
}

const BlogSection = ({ posts }: { posts: Post[] }) => {
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
      {/* Parallax elements */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[140px]" />
        <RingDecor size={450} className="absolute -right-20 top-0 opacity-15" />
        <StarDecor
          size={35}
          className="absolute left-10 top-1/2 -translate-y-1/2 opacity-20 text-primary"
        />
        <DotGrid
          cols={6}
          rows={4}
          className="absolute right-10 bottom-10 opacity-20"
        />
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
          <Link
            href="/blogs"
            className="hidden md:inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
          >
            View All <ArrowUpRight size={16} />
          </Link>
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
              <Link href={`/blogs/${post.slug}`} className="block">
                <div className="h-56 bg-secondary/30 relative overflow-hidden border-b border-border/50">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl font-display font-extrabold text-foreground/5 group-hover:text-primary/10 transition-colors duration-500">
                        0{i + 1}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-primary/20 text-primary backdrop-blur-md border border-primary/20">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
                    <Calendar size={12} className="text-primary/60" />{" "}
                    {post.date}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
