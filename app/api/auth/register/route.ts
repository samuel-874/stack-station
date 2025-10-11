import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body || {};
    if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, hashedPassword } });
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
