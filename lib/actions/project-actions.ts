"use server";

import { promises as fs } from "fs";
import path from "path";
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

export async function getProjectBySlug(slug: string) {
  await dbConnect();
  try {
    const project = await Project.findOne({ slug });
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

export async function createProject(formData: FormData) {
  await dbConnect();

  const title = formData.get("title") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const description = formData.get("description") as string;
  const techStackString = formData.get("techStack") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const imageFile = formData.get("image") as File;

  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  const techStack = techStackString.split(",").map((s) => s.trim());

  try {
    let imageUrl = "";

    if (imageFile && imageFile.name) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, "-")}`;

      const uploadDir = path.join(process.cwd(), "public/uploads/projects");

      // Ensure directory exists
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);

      // The URL that will be saved in DB
      imageUrl = `/uploads/projects/${filename}`;
    }

    const newProject = new Project({
      title,
      slug,
      shortDescription,
      description,
      techStack,
      githubUrl,
      liveUrl,
      image: imageUrl,
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

export async function getProjectById(id: string) {
  await dbConnect();
  try {
    const project = await Project.findById(id);
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
}

export async function updateProject(id: string, formData: FormData) {
  await dbConnect();

  const title = formData.get("title") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const description = formData.get("description") as string;
  const techStackString = formData.get("techStack") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const imageFile = formData.get("image") as File;
  const currentImage = formData.get("currentImage") as string;

  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  const techStack = techStackString.split(",").map((s) => s.trim());

  try {
    let imageUrl = currentImage || "";

    if (imageFile && imageFile.name && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, "-")}`;

      const uploadDir = path.join(process.cwd(), "public/uploads/projects");

      // Ensure directory exists
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);

      if (currentImage && currentImage.startsWith("/uploads/")) {
        const oldImagePath = path.join(process.cwd(), "public", currentImage);
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.error("Error deleting old image file:", err);
        }
      }

      // The URL that will be saved in DB
      imageUrl = `/uploads/projects/${filename}`;
    }

    await Project.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        shortDescription,
        description,
        techStack,
        githubUrl,
        liveUrl,
        image: imageUrl,
      },
      { new: true },
    );

    revalidatePath("/");
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${slug}`);
    revalidatePath(`/projects/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  await dbConnect();
  try {
    const project = await Project.findById(id);
    if (project && project.image && project.image.startsWith("/uploads/")) {
      const imagePath = path.join(process.cwd(), "public", project.image);
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error("Error deleting image file:", err);
      }
    }

    await Project.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
