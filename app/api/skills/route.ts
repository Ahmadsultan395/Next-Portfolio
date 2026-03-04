import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Skill } from '@/models/Skill';
import { requireAuth } from '@/lib/jwt';

// ── GET /api/skills ───────────────────────────────────────────────────────────
export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, data: skills });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ── POST /api/skills ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    requireAuth(req);
    await connectDB();
    const body = await req.json();
    const skill = await Skill.create(body);
    return NextResponse.json({ success: true, data: skill }, { status: 201 });
  } catch (err: any) {
    const status = err.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}
