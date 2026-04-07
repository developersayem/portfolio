import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import AdminCredentials from "@/models/AdminCredentials";

export async function POST(req: NextRequest) {
  try {
    // Verify session first
    const token = req.cookies.get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(
      process.env.ADMIN_JWT_SECRET || "fallback-secret",
    );
    await jwtVerify(token, secret);

    const { currentPassword, newEmail, newPassword } = await req.json();

    await dbConnect();
    const admin = await AdminCredentials.findOne({});
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // Verify current password before allowing changes
    const isValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 },
      );
    }

    const updateData: { email?: string; password?: string } = {};
    if (newEmail) updateData.email = newEmail;
    if (newPassword) updateData.password = await bcrypt.hash(newPassword, 12);

    await AdminCredentials.findOneAndUpdate({}, updateData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Change credentials error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
