import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import TechStackSection from "@/components/TechStackSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialSection from "@/components/TestimonialSection";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import { getBlogs } from "@/lib/actions/blog-actions";
import { getProjects } from "@/lib/actions/project-actions";

export default async function HomePage() {
  const [blogs, projects] = await Promise.all([getBlogs(), getProjects()]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />

      <AboutSection />
      <ServicesSection />
      <SkillsMarquee />
      <TechStackSection />
      <ExperienceSection />
      <ProjectsSection projects={projects} />
      <TestimonialSection />
      <BlogSection posts={blogs} />
      <CTASection />
      <FooterSection />
    </div>
  );
}
