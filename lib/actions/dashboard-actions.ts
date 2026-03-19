"use server";

import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import Project from "@/models/Project";
import Contact from "@/models/Contact";
import Subscription from "@/models/Subscription";

export async function getDashboardStats() {
  try {
    await dbConnect();

    const [blogCount, projectCount, messageCount, subscriberCount] =
      await Promise.all([
        Blog.countDocuments({}),
        Project.countDocuments({}),
        Contact.countDocuments({}),
        Subscription.countDocuments({}),
      ]);

    const latestMessages = await Contact.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    return {
      stats: {
        blogs: blogCount,
        projects: projectCount,
        messages: messageCount,
        subscribers: subscriberCount,
      },
      latestMessages: JSON.parse(JSON.stringify(latestMessages)),
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      stats: {
        blogs: 0,
        projects: 0,
        messages: 0,
        subscribers: 0,
      },
      latestMessages: [],
    };
  }
}
