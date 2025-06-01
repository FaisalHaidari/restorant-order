import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db';

export async function GET(req, { params }) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(req, { params }) {
  const data = await req.json();
  const user = await prisma.user.update({
    where: { id: Number(params.id) },
    data: {
      name: data.name,
      phone: data.phone,
      street: data.street,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
    },
  });
  return NextResponse.json(user);
} 