import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, token, newPassword } = await req.json();

    const user = await User.findOne({ email });

    if (
      !user ||
      !user.resetToken ||
      !user.resetTokenExpires ||
      user.resetToken !== token ||
      Date.now() > user.resetTokenExpires
    ) {
      return NextResponse.json({ message: 'Invalid or expired link' }, { status: 400 });
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, {
      password: hash,
      resetToken: null,
      resetTokenExpires: null,
    });

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
