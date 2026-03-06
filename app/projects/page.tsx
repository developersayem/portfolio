import { getProjects } from "@/lib/actions/project-actions";
import ProjectClient from "./ProjectClient";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Sayem Molla",
  description:
    "A showcase of my recent work in web development, design, and product engineering.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectClient projects={projects} />;
}
