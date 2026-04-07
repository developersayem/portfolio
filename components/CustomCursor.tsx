"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const over = () => setHovered(true);
    const out = () => setHovered(false);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);

    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, textarea",
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", over);
        el.removeEventListener("mouseleave", out);
      });
    };
  }, []);

  if (pathname.startsWith("/admin")) return null;
  if (!visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary"
        animate={{
          x: pos.x - 6,
          y: pos.y - 6,
          scale: hovered ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ width: 12, height: 12 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border-2 border-primary"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: hovered ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
        style={{ width: 40, height: 40 }}
      />
    </>
  );
};

export default CustomCursor;
