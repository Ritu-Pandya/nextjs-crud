// app/note/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const note = await prisma.note.findUnique({
    where: { id: Number(params.id) },
  });
  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(note);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { title, content } = body;
  const note = await prisma.note.update({
    where: { id: Number(params.id) },
    data: { title, content },
  });
  return NextResponse.json(note);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.note.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ success: true });
}
