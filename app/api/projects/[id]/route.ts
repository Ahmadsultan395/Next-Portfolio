import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { requireAuth } from "@/lib/jwt";

type Params = { params: { id: string } };

async function deleteFile(filePath: string) {
  if (!filePath) return;
  const abs = path.join(process.cwd(), "public", filePath);
  if (existsSync(abs)) await unlink(abs).catch(() => {});
}

// ── Helper: parse FormData into body object ───────────────────────────────────
function parseFormBody(formData: FormData): Record<string, any> {
  const body: Record<string, any> = {};
  const arrayKeys = ["tech", "highlights"];

  for (const [key, val] of formData.entries()) {
    if (key === "image") continue;

    if (arrayKeys.includes(key)) {
      if (!body[key]) body[key] = [];
      body[key].push(String(val));
    } else {
      body[key] = val;
    }
  }

  if (body.featured !== undefined) body.featured = body.featured === "true";
  if (body.order !== undefined) body.order = Number(body.order);

  return body;
}

// ── GET /api/projects/[id] ────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const project = await Project.findById(id);
    if (!project)
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: project });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ── PATCH /api/projects/[id] ──────────────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    requireAuth(req);
    await connectDB();

    const project = await Project.findById(id);
    if (!project)
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );

    const contentType = req.headers.get("content-type") || "";
    let body: Record<string, any> = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      body = parseFormBody(formData);

      const image = formData.get("image") as File | null;
      if (image && image.size > 0) {
        await deleteFile(project.imageUrl || "");
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

    Object.assign(project, body);
    await project.save();
    return NextResponse.json({ success: true, data: project });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}

// ── DELETE /api/projects/[id] ─────────────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    requireAuth(req);
    await connectDB();
    const project = await Project.findById(id);
    if (!project)
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    await deleteFile(project.imageUrl || "");
    await Project.findByIdAndDelete(id);
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    const status = err.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}
