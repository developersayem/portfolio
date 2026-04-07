import { getBlogs } from "@/lib/actions/blog-actions";
import BlogClient from "./BlogClient";
import React from "react";

export const metadata = {
  title: "Blogs | Sayem Molla",
  description: "Read my latest articles and tutorials.",
};

export default async function Page() {
  const blogs = await getBlogs();

  return <BlogClient posts={blogs} />;
}
