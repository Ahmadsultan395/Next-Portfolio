import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ContactModel } from "@/models/Contact";
import { requireAuth } from "@/lib/jwt";

export async function GET() {
  try {
    await connectDB();
    const doc = await ContactModel.findOne();
    if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: doc });
  } catch (err: any) { return NextResponse.json({ message: err.message }, { status: 500 }); }
}

export async function POST(req: NextRequest) {
  try {
    requireAuth(req); await connectDB();
    const existing = await ContactModel.findOne();
    if (existing) return NextResponse.json({ message: "Already exists, use PATCH" }, { status: 409 });
    const doc = await ContactModel.create(await req.json());
    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: err.message === "Unauthorized" ? 401 : 500 });
  }
}
