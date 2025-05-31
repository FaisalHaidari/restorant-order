import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name } = body;
  if (!name || typeof name !== "string") {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { name },
    });
    return Response.json({ success: true, user: { email: updatedUser.email, name: updatedUser.name } });
  } catch (e) {
    return Response.json({ error: "Failed to update profile" }, { status: 500 });
  }
} 