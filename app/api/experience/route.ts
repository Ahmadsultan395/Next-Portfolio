import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ExperienceModel } from "@/models/Experience";
import { requireAuth } from "@/lib/jwt";

export async function GET() {
  try {
    await connectDB();
    const data = await ExperienceModel.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data });
  } catch (err: any) { return NextResponse.json({ message: err.message }, { status: 500 }); }
}

export async function POST(req: NextRequest) {
  try {
    requireAuth(req); await connectDB();
    const doc = await ExperienceModel.create(await req.json());
    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: err.message === "Unauthorized" ? 401 : 500 });
  }
}
