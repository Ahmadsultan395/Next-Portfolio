import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { connectDB } from "@/lib/mongodb";
import { Profile } from "@/models/Profile";
import { requireAuth } from "@/lib/jwt";

type Params = { params: { id: string } };

async function deleteFile(filePath: string) {
  if (!filePath) return;
  const abs = path.join(process.cwd(), "public", filePath);
  if (existsSync(abs)) {
    try {
      await unlink(abs);
    } catch (_) {}
  }
}

// ── GET /api/profile/[id] ────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const profile = await Profile.findById(id);
    if (!profile)
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: profile });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ── PATCH /api/profile/[id] ──────────────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    requireAuth(req);
    await connectDB();

    const profile = await Profile.findById(id);
    if (!profile)
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 },
      );

    const formData = await req.formData();
    const body: Record<string, any> = {};

    const textFields = [
      "name",
      "role",
      "email",
      "phone",
      "location",
      "bio",
      "github",
      "portfolio",
      "linkedin",
      "upwork",
      "showOnLanding",
      "availableForFreelance",
      "acceptContactForm",
      "showSocialLinks",
    ];
    for (const field of textFields) {
      const val = formData.get(field);
      if (val !== null) body[field] = val;
    }

    const avatar = formData.get("avatar") as File | null;
    if (avatar && avatar.size > 0) {
      await deleteFile(profile.avatarUrl);
      const dir = path.join(process.cwd(), "public/uploads/avatars");
      if (!existsSync(dir)) await mkdir(dir, { recursive: true });
      const ext = avatar.name.split(".").pop();
      const filename = `avatar-${uuid()}.${ext}`;
      await writeFile(
        path.join(dir, filename),
        Buffer.from(await avatar.arrayBuffer()),
      );
      body.avatarUrl = `uploads/avatars/${filename}`;
    }

    const resume = formData.get("resume") as File | null;
    if (resume && resume.size > 0) {
      await deleteFile(profile.resumeUrl);
      const dir = path.join(process.cwd(), "public/uploads/resumes");
      if (!existsSync(dir)) await mkdir(dir, { recursive: true });
      const filename = `resume-${uuid()}.pdf`;
      await writeFile(
        path.join(dir, filename),
        Buffer.from(await resume.arrayBuffer()),
      );
      body.resumeUrl = `uploads/resumes/${filename}`;
      body.resumeOriginalName = resume.name;
    }

    Object.assign(profile, body);
    await profile.save();
    return NextResponse.json({ success: true, data: profile });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}

// ── DELETE /api/profile/[id] ─────────────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    requireAuth(req);
    await connectDB();
    const profile = await Profile.findById(id);
    if (!profile)
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 },
      );
    await deleteFile(profile.avatarUrl);
    await deleteFile(profile.resumeUrl);
    await Profile.findByIdAndDelete(id);
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}
