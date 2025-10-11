import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { workspaceId } = body || {};
    if (!workspaceId)
      return NextResponse.json(
        { error: "Missing workspaceId" },
        { status: 400 }
      );

    const session = await getServerSession(authOptions as any);
    if (!session || !(session as any).user?.email)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const userEmail = (session as any).user.email;
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const userCount = await prisma.user.count({ where: { workspaceId } });
    const isFirst = userCount === 0;

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { workspaceId, role: isFirst ? "ADMIN" : user.role },
    });

    return NextResponse.json({ ok: true, role: updated.role });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
