import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import AdminCredentials from "@/models/AdminCredentials";

const DEFAULT_EMAIL = "admin@sayemmolla.dev";
const DEFAULT_PASSWORD = "Admin@1234";

async function seedDefaultAdmin() {
  const existing = await AdminCredentials.findOne({});
  if (!existing) {
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 12);
    await AdminCredentials.create({
      email: DEFAULT_EMAIL,
      password: hashedPassword,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    await seedDefaultAdmin();

    const { email, password } = await req.json();

    const admin = await AdminCredentials.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Sign JWT
    const secret = new TextEncoder().encode(
      process.env.ADMIN_JWT_SECRET || "fallback-secret",
    );
    const token = await new SignJWT({ email: admin.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
