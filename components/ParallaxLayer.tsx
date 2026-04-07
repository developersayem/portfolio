"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // 0 = no movement, 1 = full scroll movement
  className?: string;
}

/** A single layer that moves at `speed` × scroll distance (in px) */
export function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 120}px`, `${-speed * 120}px`],
  );

  return (
    <div
      ref={ref}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <motion.div style={{ y }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  );
}

/** Star / sparkle SVG used as a floating decorative element */
export function StarDecor({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
    >
      <path d="M16 0L18.5 13.5L32 16L18.5 18.5L16 32L13.5 18.5L0 16L13.5 13.5Z" />
    </svg>
  );
}

/** Dot-grid decorative block */
export function DotGrid({
  cols = 6,
  rows = 4,
  className = "",
}: {
  cols?: number;
  rows?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid gap-3 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-primary/30" />
      ))}
    </div>
  );
}

/** Circle outline ring */
export function RingDecor({
  size = 300,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full border border-primary/15 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
