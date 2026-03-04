import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { connectDB } from "@/lib/mongodb";
import { Profile } from "@/models/Profile";
import { requireAuth } from "@/lib/jwt";

type Params = { params: { id: string } };

// ── DELETE /api/profile/[id]/avatar ──────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    requireAuth(req);
    await connectDB();
    const { id } = await context.params;
    const profile = await Profile.findById(id);
    if (!profile)
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 },
      );

    if (profile.avatarUrl) {
      const abs = path.join(process.cwd(), "public", profile.avatarUrl);
      if (existsSync(abs)) await unlink(abs).catch(() => {});
      profile.avatarUrl = "";
      await profile.save();
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}
