import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { About } from "@/models/About";
import { requireAuth } from "@/lib/jwt";

type Params = { params: { id: string } };

// ── GET /api/about/[id] ───────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const about = await About.findById(id);
    if (!about)
      return NextResponse.json({ message: "About not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: about });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ── PATCH /api/about/[id] ─────────────────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    requireAuth(req);
    await connectDB();
    const body = await req.json();
    const about = await About.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!about)
      return NextResponse.json({ message: "About not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: about });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}

// ── DELETE /api/about/[id] ────────────────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    requireAuth(req);
    await connectDB();
    const result = await About.findByIdAndDelete(id);
    if (!result)
      return NextResponse.json({ message: "About not found" }, { status: 404 });
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}
