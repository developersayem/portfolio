"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";
import { sendMail } from "@/lib/mail";

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

    // Send email notification
    if (process.env.NOTIFY_EMAIL) {
      await sendMail({
        to: process.env.NOTIFY_EMAIL,
        subject: `New Contact Message: ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #10b981;">New Message Received</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              Sent from your portfolio website dashboard.
            </p>
          </div>
        `,
      });
    }

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
