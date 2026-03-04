"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, Search } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CustomCursor from "@/components/CustomCursor";

const posts = [
  {
    id: 1,
    date: "Feb 15, 2026",
    category: "Engineering",
    title: "Building Scalable Microservices with Node.js and Docker",
    desc: "A deep dive into designing microservice architectures that scale horizontally, with practical patterns for service discovery and load balancing.",
  },
  {
    id: 2,
    date: "Jan 28, 2026",
    category: "Frontend",
    title: "Advanced React Patterns Every Developer Should Know",
    desc: "Exploring compound components, render props, and custom hooks to create flexible and reusable UI components.",
  },
  {
    id: 3,
    date: "Jan 10, 2026",
    category: "Startup",
    title: "Lessons Learned Co-Founding a Tech Startup",
    desc: "From ideation to first paying customers — the real challenges of building a tech company and how we overcame them.",
  },
  {
    id: 4,
    date: "Dec 15, 2025",
    category: "Design",
    title: "The Psychology of Color in UI/UX Design",
    desc: "How different colors influence user behavior and perception, and how to create a harmonious color palette for your next project.",
  },
  {
    id: 5,
    date: "Nov 22, 2025",
    category: "Backend",
    title: "Optimizing PostgreSQL Queries for Performance",
    desc: "Practical tips and techniques for identifying slow queries, using indexes effectively, and optimizing your database schema for speed.",
  },
  {
    id: 6,
    date: "Oct 05, 2025",
    category: "DevOps",
    title: "Setting Up a CI/CD Pipeline with GitHub Actions",
    desc: "A step-by-step guide to automating your development workflow, from testing and linting to deployment and monitoring.",
  },
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CustomCursor />
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
            <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
              {[
                "All",
                "Engineering",
                "Frontend",
                "Backend",
                "Design",
                "Startup",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSearchQuery(cat === "All" ? "" : cat)}
                  className={`px-6 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all ${
                    searchQuery === cat || (cat === "All" && searchQuery === "")
                      ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-card/40 border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="container mx-auto px-6">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-card/30 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden hover:border-primary/40 hover:shadow-2xl transition-all duration-500 flex flex-col"
                >
                  <div className="h-48 bg-secondary/20 flex items-center justify-center relative overflow-hidden">
                    <span className="text-7xl font-display font-extrabold text-foreground/[0.03] group-hover:text-primary/[0.05] transition-colors duration-500 select-none">
                      {String(post.id).padStart(2, "0")}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
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
                      {post.desc}
                    </p>
                    <div className="mt-auto">
                      <Link
                        href={`/blogs/${post.id}`}
                        className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all"
                      >
                        Read Article <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
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

export default BlogPage;
