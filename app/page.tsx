import CustomCursor from "@/components/CustomCursor";
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <HeroSection />

      <AboutSection />
      <ServicesSection />
      <SkillsMarquee />
      <TechStackSection />
      <ExperienceSection />
      <ProjectsSection />
      <TestimonialSection />
      <BlogSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
