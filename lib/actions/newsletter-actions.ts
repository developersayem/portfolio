"use server";

import dbConnect from "@/lib/db";
import Subscription from "@/models/Subscription";

export async function subscribeToNewsletter(formData: FormData) {
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
    await dbConnect();
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
  try {
    await dbConnect();
    const subscribers = await Subscription.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(subscribers));
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
}

export async function deleteSubscription(id: string) {
  try {
    await dbConnect();
    await Subscription.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return { success: false, error: "Failed to delete subscription" };
  }
}

export async function unsubscribe(email: string) {
  try {
    await dbConnect();
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
