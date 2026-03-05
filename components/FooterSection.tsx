"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  Facebook,
} from "lucide-react";

const XIcon = ({ size = 14 }: { size?: number }) => (
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
import { subscribeToNewsletter } from "@/lib/actions/newsletter-actions";

const FooterSection = () => {
  const ref = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const formData = new FormData();
      formData.append("email", email);

      const result = await subscribeToNewsletter(formData);

      if (result.success) {
        setStatus("success");
        setMessage("Thank you! You've been subscribed.");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setMessage(result.error || "Something went wrong");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (err) {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <footer
      id="contact"
      className="border-t border-border relative overflow-hidden"
      ref={ref}
    >
      {/* Parallax glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full bg-primary/5 blur-[130px]" />
      </motion.div>

      <div className="pt-10 container mx-auto px-6 relative">
        <div className="grid md:grid-cols-4 gap-12 mb-10">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">
              <span className="text-gradient">Sayem</span> Molla
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full Stack Engineer specializing in building scalable digital
              products and modern web experiences. Bridging the gap between
              engineering excellence and business value.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-primary" /> +880 1704878051
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-primary" />{" "}
                developersayem012@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-primary" /> Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Links</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a
                href="#about"
                className="block hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                className="block hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="block hover:text-primary transition-colors"
              >
                Skills
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with our latest projects and insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex rounded-full border border-border overflow-hidden focus-within:border-primary transition-colors">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none text-foreground placeholder:text-muted-foreground"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center min-w-[100px]"
                >
                  {status === "loading" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {status === "success" && (
                <p className="text-xs text-emerald-500 flex items-center gap-1 mt-2">
                  <CheckCircle2 size={12} /> {message}
                </p>
              )}
              {status === "error" && (
                <p className="text-xs text-destructive flex items-center gap-1 mt-2">
                  <AlertCircle size={12} /> {message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <span className="text-primary">Sayem Molla</span>. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-4">
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
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Large Bottom Marquee */}
      <div className="mt-0 border-t border-border/50 overflow-hidden relative group -bottom-10">
        <div
          className="animate-marquee flex flex-nowrap w-max will-change-transform"
          style={{ animationDuration: "50s" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center flex-shrink-0 gap-10 mx-10"
            >
              <span className="font-display text-[8vw] font-black text-foreground/[0.04] group-hover:text-primary/20 transition-colors duration-700 select-none uppercase tracking-tighter whitespace-nowrap">
                SAYEM MOLLA - FULL STACK DEVELOPER
              </span>
              <svg
                width="40"
                height="40"
                viewBox="0 0 32 32"
                className="text-primary/20 group-hover:text-primary transition-colors duration-700 flex-shrink-0"
                fill="currentColor"
              >
                <path d="M16 0L18.5 13.5L32 16L18.5 18.5L16 32L13.5 18.5L0 16L13.5 13.5Z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
