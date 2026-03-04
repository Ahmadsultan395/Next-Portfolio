import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ContactModel } from "@/models/Contact";
import { requireAuth } from "@/lib/jwt";
type P = { params: { id: string } };

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    requireAuth(req);
    await connectDB();
    const { id } = await context.params;
    const doc = await ContactModel.findByIdAndUpdate(id, await req.json(), {
      new: true,
    });
    if (!doc)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: doc });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: err.message === "Unauthorized" ? 401 : 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    requireAuth(req);
    await connectDB();
    const { id } = await context.params;
    await ContactModel.findByIdAndDelete(id);
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: err.message === "Unauthorized" ? 401 : 500 },
    );
  }
}
