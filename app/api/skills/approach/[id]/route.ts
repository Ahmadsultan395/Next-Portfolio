import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Approach } from "@/models/Skill";
import { requireAuth } from "@/lib/jwt";

type Params = { params: { id: string } };

// ── PATCH /api/skills/approach/[id] ──────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    requireAuth(req);
    await connectDB();
    const { id } = await context.params;
    const body = await req.json();
    const approach = await Approach.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!approach)
      return NextResponse.json(
        { message: "Approach not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: approach });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}

// ── DELETE /api/skills/approach/[id] ─────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    requireAuth(req);
    await connectDB();
    const { id } = await context.params;
    const result = await Approach.findByIdAndDelete(id);
    if (!result)
      return NextResponse.json(
        { message: "Approach not found" },
        { status: 404 },
      );
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}
