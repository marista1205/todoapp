import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET semua todo
export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(todos);
}

// POST tambah todo
export async function POST(req: Request) {
  const body = await req.json();

  const todo = await prisma.todo.create({
    data: {
      title: body.title,
    },
  });

  return NextResponse.json(todo);
}

// PATCH update completed
export async function PATCH(req: Request) {
  const body = await req.json();

  const todo = await prisma.todo.update({
    where: { id: body.id },
    data: { completed: body.completed },
  });

  return NextResponse.json(todo);
}

// DELETE todo
export async function DELETE(req: Request) {
  const body = await req.json();

  await prisma.todo.delete({
    where: { id: body.id },
  });

  return NextResponse.json({ message: "Deleted" });
}
