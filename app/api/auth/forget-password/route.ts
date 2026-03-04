import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const token = randomBytes(32).toString("hex");
    const expires = Date.now() + 3_600_000; // 1 hour

    await User.findByIdAndUpdate(user._id, {
      resetToken: token,
      resetTokenExpires: expires,
    });

    const resetLink = `${FRONTEND_URL}/auth/resetpassword?token=${token}&email=${email}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // user: process.env.EMAIL_USER,
        // pass: process.env.EMAIL_PASS,
        user: "ahmisultan395@gmail.com",
        pass: "wvpa anpq bpch enkr",
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER || "ahmisultan395@gmail.com",
      to: email,
      subject: "Password Reset Link",
      html: `<p>Click the link below to reset your password (valid for 1 hour):</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });

    return NextResponse.json({ message: "Reset link sent to your email" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
