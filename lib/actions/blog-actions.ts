"use server";

import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export async function getBlogs() {
  await dbConnect();
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  await dbConnect();
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

export async function createBlog(formData: FormData) {
  await dbConnect();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const excerpt = formData.get("excerpt") as string;
  const imageFile = formData.get("image") as File;

  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  try {
    let imageUrl = "";

    if (imageFile && imageFile.name) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, "-")}`;

      const uploadDir = path.join(process.cwd(), "public/uploads/blogs");

      // Ensure directory exists
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);

      // The URL that will be saved in DB
      imageUrl = `/uploads/blogs/${filename}`;
    }

    const newBlog = new Blog({
      title,
      slug,
      content,
      category,
      excerpt,
      image: imageUrl,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      published: true,
    });

    await newBlog.save();
    revalidatePath("/");
    revalidatePath("/blogs");
    revalidatePath("/admin/blogs");
    return { success: true };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: "Failed to create blog" };
  }
}

export async function getBlogById(id: string) {
  await dbConnect();
  try {
    const blog = await Blog.findById(id);
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return null;
  }
}

export async function updateBlog(id: string, formData: FormData) {
  await dbConnect();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const excerpt = formData.get("excerpt") as string;
  const imageFile = formData.get("image") as File;
  const currentImage = formData.get("currentImage") as string;

  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  try {
    let imageUrl = currentImage || "";

    if (imageFile && imageFile.name && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, "-")}`;

      const uploadDir = path.join(process.cwd(), "public/uploads/blogs");

      // Ensure directory exists
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);

      // The URL that will be saved in DB
      imageUrl = `/uploads/blogs/${filename}`;
    }

    await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        content,
        category,
        excerpt,
        image: imageUrl,
      },
      { new: true },
    );

    revalidatePath("/");
    revalidatePath("/blogs");
    revalidatePath("/admin/blogs");
    revalidatePath(`/blogs/${slug}`);
    revalidatePath(`/blogs/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating blog:", error);
    return { success: false, error: "Failed to update blog" };
  }
}

export async function deleteBlog(id: string) {
  await dbConnect();
  try {
    await Blog.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/blogs");
    revalidatePath("/admin/blogs");
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error: "Failed to delete blog" };
  }
}
