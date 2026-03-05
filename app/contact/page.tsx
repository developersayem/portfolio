"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Facebook } from "lucide-react";

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.403z" />
  </svg>
);
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactForm from "@/components/ContactForm";
import { StarDecor, RingDecor, DotGrid } from "@/components/ParallaxLayer";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-24 relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"
          />

          <div className="absolute top-40 right-10 opacity-20">
            <RingDecor size={400} />
          </div>
          <div className="absolute bottom-20 left-10 opacity-15">
            <StarDecor size={60} className="text-primary" />
          </div>
          <div className="absolute top-60 left-20 opacity-10">
            <DotGrid cols={8} rows={4} />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Heading & Contact Info */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
                    Get in Touch
                  </span>
                  <h1 className="font-display text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                    Let's Build Your
                    <br />
                    <span className="text-gradient">Vision</span> Together
                  </h1>
                  <p className="text-muted-foreground text-lg mb-12 leading-relaxed max-w-md">
                    Whether you have a specific project in mind or just want to
                    explore the possibilities, I'm here to help you navigate the
                    digital landscape.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-1">
                        Email Me
                      </h3>
                      <p className="text-muted-foreground">
                        developersayem012@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-1">
                        Call Me
                      </h3>
                      <p className="text-muted-foreground">+880 1704878051</p>
                    </div>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-16 flex gap-4"
                >
                  {[
                    {
                      icon: Facebook,
                      href: "https://www.facebook.com/sayemmolla.dev/",
                    },
                    { icon: Github, href: "https://github.com/developersayem" },
                    {
                      icon: Linkedin,
                      href: "https://www.linkedin.com/in/sayem-molla/",
                    },
                    { icon: XIcon, href: "https://x.com/developersayem" },
                  ].map(({ icon: Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="relative">
                <ContactForm />

                {/* Decorative dots behind form */}
                <div className="absolute -z-10 -bottom-8 -right-8 opacity-20">
                  <DotGrid cols={5} rows={5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default ContactPage;
