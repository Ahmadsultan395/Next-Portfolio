import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Approach } from '@/models/Skill';
import { requireAuth } from '@/lib/jwt';

// ── GET /api/skills/approach ──────────────────────────────────────────────────
export async function GET() {
  try {
    await connectDB();
    const approach = await Approach.findOne();
    if (!approach) return NextResponse.json({ message: 'Approach not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: approach });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ── POST /api/skills/approach ─────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    requireAuth(req);
    await connectDB();
    const existing = await Approach.findOne();
    if (existing) {
      return NextResponse.json(
        { message: 'Approach already exists. Use PATCH to update.' },
        { status: 409 }
      );
    }
    const body = await req.json();
    const approach = await Approach.create(body);
    return NextResponse.json({ success: true, data: approach }, { status: 201 });
  } catch (err: any) {
    const status = err.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}
