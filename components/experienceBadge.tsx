"use client";

import React, { type ComponentPropsWithoutRef } from "react";
import { motion, Transition, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExperienceBadgeProps extends ComponentPropsWithoutRef<"div"> {
  text: string;
  center?: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  radius?: number; // radius in pixels
  transition?: Transition;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
}

const BASE_TRANSITION: Transition = {
  repeat: Infinity,
  ease: "linear",
};

const BASE_CONTAINER_VARIANTS: Variants = {
  hidden: { rotate: 0 },
  visible: { rotate: 360 },
};

const BASE_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export function ExperienceBadge({
  text,
  center,
  duration = 12,
  reverse = false,
  radius = 80,
  transition,
  variants,
  className,
  style,
  ...props
}: ExperienceBadgeProps) {
  if (typeof text !== "string") {
    throw new Error("text must be a string");
  }

  const letters = text.split("");

  const finalTransition: Transition = {
    ...BASE_TRANSITION,
    ...transition,
    duration: transition?.duration ?? duration,
  };

  const containerVariants: Variants = {
    ...BASE_CONTAINER_VARIANTS,
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container,
  };

  const itemVariants: Variants = {
    ...BASE_ITEM_VARIANTS,
    ...variants?.item,
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
      style={{
        width: radius * 2,
        height: radius * 2,
        ...style,
      }}
      {...props}
    >
      {/* Center Content */}
      {center && (
        <div className="absolute flex items-center justify-center">
          {center}
        </div>
      )}

      {/* Rotating Text */}
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={finalTransition}
      >
        {letters.map((letter, index) => {
          const angle = (360 / letters.length) * index;

          return (
            <motion.span
              key={`${index}-${letter}`}
              variants={itemVariants}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translateY(-${radius}px)
                `,
                transformOrigin: "center",
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </motion.div>

      {/* Accessibility */}
      <span className="sr-only">{text}</span>
    </div>
  );
}
