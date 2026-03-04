import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { fname, lname, email, password } = body;

    if (!fname || !lname || !email || !password) {
      return NextResponse.json({ message: 'All fields required' }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ fname, lname, email, password: hash });

    return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
