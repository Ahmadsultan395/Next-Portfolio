import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { About } from '@/models/About';
import { requireAuth } from '@/lib/jwt';

// ── GET /api/about ────────────────────────────────────────────────────────────
export async function GET() {
  try {
    await connectDB();
    const about = await About.findOne();
    if (!about) return NextResponse.json({ message: 'About not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: about });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ── POST /api/about ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    requireAuth(req);
    await connectDB();

    const existing = await About.findOne();
    if (existing) {
      return NextResponse.json(
        { message: 'About already exists. Use PATCH to update.' },
        { status: 409 }
      );
    }

    const body = await req.json();
    const about = await About.create(body);
    return NextResponse.json({ success: true, data: about }, { status: 201 });
  } catch (err: any) {
    const status = err.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json({ message: err.message }, { status });
  }
}
