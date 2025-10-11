import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, location, phone, email, address } = body || {};

    if (!name || !location || !phone || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create workspace
    const workspace = await prisma.workspace.create({
      data: { name, location, phone, email, address },
    });

    // If user is signed in, attach them to workspace and set role ADMIN if first
    // Note: getServerSession requires the request cookies; Next's server route doesn't expose it directly in this context
    // We'll attempt to retrieve a session via getServerSession (NextAuth will check cookies)
    let role = "REP";
    try {
      const session = await getServerSession(authOptions as any);
      const userCount = await prisma.user.count({
        where: { workspaceId: workspace.id },
      });
      if (session && (session as any).user) {
        const userEmail = (session as any).user.email;
        // If user exists in DB, update their workspaceId and role if first
        const user = await prisma.user.findUnique({
          where: { email: userEmail || undefined },
        });
        if (user) {
          const isFirst = userCount === 0;
          const newRole = isFirst ? "ADMIN" : user.role;
          await prisma.user.update({
            where: { id: user.id },
            data: { workspaceId: workspace.id, role: newRole as any },
          });
          role = isFirst ? "ADMIN" : user.role;
        }
      }
    } catch (e) {
      // ignore session errors in dev
    }

    return NextResponse.json({ ok: true, role, workspaceId: workspace.id });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
