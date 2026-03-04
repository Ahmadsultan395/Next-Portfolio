import { connectDB } from "@/lib/mongodb";
import { ContactMessageModel } from "@/models/ContactMessage";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, originalMessage, replyText } = await req.json();
    console.log(email, originalMessage, replyText);

    const contact = await ContactMessageModel.findOne({ email });

    if (!contact) {
      return NextResponse.json(
        { message: "Email not found in contact messages" },
        { status: 404 },
      );
    }

    // ✅ Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // user: process.env.EMAIL_USER,
        // pass: process.env.EMAIL_PASS,
        user: "ahmisultan395@gmail.com",
        pass: "wvpa anpq bpch enkr",
      },
    });

    // ✅ Send reply email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "ahmisultan395@gmail.com",
      to: email,
      subject: `Reply to your message: ${contact.subject || ""}`,
      html: `
        <strong>Hi ${contact.name},</strong>
        <p>${originalMessage}</p>
        <br/>
        <strong>Reply:</strong>
        <p>${replyText}</p>
        <br/>
        <br/>
        <p>Best regards,</p>
        <p>Your Team</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Reply sent successfully",
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
