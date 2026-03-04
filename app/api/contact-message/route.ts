import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/jwt";
import { ContactMessageModel } from "@/models/ContactMessage";

export async function GET() {
  try {
    await connectDB();
    const messages = await ContactMessageModel.find().sort({ createdAt: -1 }); // array of messages
    if (!messages || messages.length === 0)
      return NextResponse.json(
        { message: "No messages found" },
        { status: 404 },
      );

    return NextResponse.json(
      { success: true, data: messages },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { message: "Name, email and message are required" },
        { status: 400 },
      );
    }
    const data = {
      name: body.name,
      email: body.email,
      subject: body.subject || "",
      message: body.message,
      unread: body.unread,
      reply: body.reply || "",
    };
    const message = await ContactMessageModel.create(data);

    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
