import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { connectDB } from '@/lib/mongodb';
import { Profile } from '@/models/Profile';
import { requireAuth } from '@/lib/jwt';

// ── GET /api/profile ─────────────────────────────────────────────────────────
export async function GET() {
  try {
    await connectDB();
    const profile = await Profile.findOne();
    if (!profile) {
      return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: profile });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ── POST /api/profile ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    requireAuth(req); // only admin
    await connectDB();

    const formData = await req.formData();

    // Extract text fields
    const body: Record<string, any> = {};
    const textFields = [
      'name','role','email','phone','location','bio',
      'github','portfolio','linkedin','upwork',
      'showOnLanding','availableForFreelance','acceptContactForm','showSocialLinks',
    ];
    for (const field of textFields) {
      const val = formData.get(field);
      if (val !== null) body[field] = val;
    }

    // Handle avatar upload
    const avatar = formData.get('avatar') as File | null;
    if (avatar && avatar.size > 0) {
      const dir = path.join(process.cwd(), 'public/uploads/avatars');
      if (!existsSync(dir)) await mkdir(dir, { recursive: true });
      const ext = avatar.name.split('.').pop();
      const filename = `avatar-${uuid()}.${ext}`;
      const buffer = Buffer.from(await avatar.arrayBuffer());
      await writeFile(path.join(dir, filename), buffer);
      body.avatarUrl = `uploads/avatars/${filename}`;
    }

    // Handle resume upload
    const resume = formData.get('resume') as File | null;
    if (resume && resume.size > 0) {
      const dir = path.join(process.cwd(), 'public/uploads/resumes');
      if (!existsSync(dir)) await mkdir(dir, { recursive: true });
      const filename = `resume-${uuid()}.pdf`;
      const buffer = Buffer.from(await resume.arrayBuffer());
      await writeFile(path.join(dir, filename), buffer);
      body.resumeUrl = `uploads/resumes/${filename}`;
      body.resumeOriginalName = resume.name;
    }

    const profile = await Profile.create(body);
    return NextResponse.json({ success: true, data: profile }, { status: 201 });
  } catch (err: any) {
    const status = err.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}
