"use server";

import dbConnect from "@/lib/db";
import Subscription from "@/models/Subscription";

export async function subscribeToNewsletter(formData: FormData) {
  await dbConnect();

  const email = formData.get("email") as string;

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email address" };
  }

  try {
    const existingSubscription = await Subscription.findOne({ email });

    if (existingSubscription) {
      return { success: false, error: "Email already subscribed" };
    }

    const newSubscription = new Subscription({ email });
    await newSubscription.save();

    return { success: true };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, error: "Failed to subscribe" };
  }
}

export async function getSubscribers() {
  await dbConnect();
  try {
    const subscribers = await Subscription.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(subscribers));
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
}

export async function deleteSubscription(id: string) {
  await dbConnect();
  try {
    await Subscription.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return { success: false, error: "Failed to delete subscription" };
  }
}

export async function unsubscribe(email: string) {
  await dbConnect();
  try {
    const result = await Subscription.findOneAndDelete({ email });
    if (!result) {
      return { success: false, error: "Email not found" };
    }
    return { success: true };
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return { success: false, error: "Failed to unsubscribe" };
  }
}
