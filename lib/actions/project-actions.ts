"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";

export async function getProjects() {
  await dbConnect();
  try {
    const projects = await Project.find({}).sort({ order: 1 });
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function createProject(formData: FormData) {
  await dbConnect();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const techStackString = formData.get("techStack") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;

  const techStack = techStackString.split(",").map((s) => s.trim());

  try {
    const newProject = new Project({
      title,
      description,
      techStack,
      githubUrl,
      liveUrl,
    });

    await newProject.save();
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}
