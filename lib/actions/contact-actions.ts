"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";

export async function submitContactForm(formData: FormData) {
  await dbConnect();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newContact.save();
    revalidatePath("/admin/contacts");
    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Failed to send message" };
  }
}

export async function getContacts() {
  await dbConnect();
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(contacts));
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}

export async function markContactAsRead(id: string) {
  await dbConnect();
  try {
    await Contact.findByIdAndUpdate(id, { isRead: true });
    revalidatePath("/admin/contacts");
    return { success: true };
  } catch (error) {
    console.error("Error marking contact as read:", error);
    return { success: false };
  }
}
