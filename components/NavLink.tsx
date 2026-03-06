"use client";

import Link from "next/link";
import { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends ComponentProps<typeof Link> {
  className?: string;
  activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, ...props }, ref) => {
    return <Link ref={ref} className={cn(className)} {...props} />;
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
