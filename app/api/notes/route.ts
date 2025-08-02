// app/api/notes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const notes = await prisma.note.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, content } = body;
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content required" }, { status: 400 });
  }
  const note = await prisma.note.create({
    data: { title, content },
  });
  return NextResponse.json(note);
}
