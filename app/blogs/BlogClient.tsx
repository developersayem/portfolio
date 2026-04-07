"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface BlogPost {
  _id: string; // From Mongo
  id?: number; // legacy
  slug: string;
  date: string;
  category: string;
  title: string;
  image?: string;
  desc?: string;
  excerpt?: string;
  content: string;
}

const BlogClient = ({ posts }: { posts: BlogPost[] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((post) => post.category))),
  ];

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-8 hover:gap-3 transition-all"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              My <span className="text-gradient">Blogs</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explorations, tutorials, and insights into the world of software
              engineering, design, and product development.
            </p>
          </motion.div>
        </section>

        {/* Search and Filters */}
        <section className="container mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                size={18}
              />
              <Input
                placeholder="Search articles..."
                className="pl-12 h-12 rounded-full bg-card/40 backdrop-blur-xl border-border/50 focus:border-primary/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto max-w-full overflow-hidden">
              <Carousel
                opts={{ align: "start", dragFree: true }}
                className="w-full"
              >
                <CarouselContent className="ml-0 md:-ml-2">
                  {categories.map((cat) => (
                    <CarouselItem key={cat} className="pl-0 md:pl-2 basis-auto">
                      <button
                        onClick={() => setSearchQuery(cat === "All" ? "" : cat)}
                        className={`px-6 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all ${
                          searchQuery === cat ||
                          (cat === "All" && searchQuery === "")
                            ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 cursor-default"
                            : "bg-card/40 border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground cursor-pointer"
                        }`}
                      >
                        {cat}
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="container mx-auto px-6">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post._id || post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group"
                >
                  <Link
                    href={`/blogs/${post.slug || post.id}`}
                    className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden hover:border-primary/40 hover:shadow-2xl transition-all duration-500 flex flex-col h-full cursor-pointer relative"
                  >
                    {post.image ? (
                      <div className="h-48 relative overflow-hidden bg-muted">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    ) : (
                      <div className="h-48 bg-secondary/20 flex items-center justify-center relative overflow-hidden">
                        <span className="text-7xl font-display font-extrabold text-foreground/[0.03] group-hover:text-primary/[0.05] transition-colors duration-500 select-none">
                          {String(post._id || post.id).slice(-2)}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    )}
                    <div className="p-8 flex-grow flex flex-col relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold tracking-wide uppercase">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                          <Calendar size={14} /> {post.date}
                        </span>
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt || post.desc}
                      </p>
                      <div className="mt-auto flex items-center gap-2 text-primary text-sm font-bold group-hover:gap-3 transition-all relative z-20">
                        Read Article <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default BlogClient;
