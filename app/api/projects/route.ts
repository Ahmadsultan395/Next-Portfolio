import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { requireAuth } from "@/lib/jwt";

// ── Helper: parse FormData into body object ───────────────────────────────────
// Arrays (tech, highlights) are sent as multiple entries with same key
function parseFormBody(formData: FormData): Record<string, any> {
  const body: Record<string, any> = {};
  const arrayKeys = ["tech", "highlights"];

  for (const [key, val] of formData.entries()) {
    if (key === "image") continue; // handled separately

    if (arrayKeys.includes(key)) {
      // accumulate into array
      if (!body[key]) body[key] = [];
      body[key].push(String(val));
    } else {
      body[key] = val;
    }
  }

  // booleans come as strings "true"/"false"
  if (body.featured !== undefined) body.featured = body.featured === "true";

  // numbers
  if (body.order !== undefined) body.order = Number(body.order);

  return body;
}

// ── GET /api/projects ─────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    const filter: Record<string, any> = {};
    if (featured === "true") filter.featured = true;

    const projects = await Project.find(filter).sort({
      order: 1,
      createdAt: -1,
    });
    return NextResponse.json({ success: true, data: projects });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ── POST /api/projects ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    requireAuth(req);
    await connectDB();

    const contentType = req.headers.get("content-type") || "";
    let body: Record<string, any> = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      body = parseFormBody(formData);

      const image = formData.get("image") as File | null;
      if (image && image.size > 0) {
        const dir = path.join(process.cwd(), "public/uploads/projects");
        if (!existsSync(dir)) await mkdir(dir, { recursive: true });
        const ext = image.name.split(".").pop();
        const filename = `project-${uuid()}.${ext}`;
        await writeFile(
          path.join(dir, filename),
          Buffer.from(await image.arrayBuffer()),
        );
        body.imageUrl = `uploads/projects/${filename}`;
      }
    } else {
      body = await req.json();
    }

    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}
