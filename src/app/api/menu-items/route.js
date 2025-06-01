import prisma from '../../../lib/db';
import { NextResponse } from 'next/server';

// Get all menu items
export async function GET() {
  const items = await prisma.menuItem.findMany({ orderBy: { id: 'desc' } });
  return NextResponse.json(items);
}

// Create a new menu item
export async function POST(req) {
  const data = await req.json();
  const item = await prisma.menuItem.create({
    data: {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      image: data.image,
    },
  });
  return NextResponse.json(item);
}

// Update or delete a menu item by id
export async function PUT(req) {
  const data = await req.json();
  const item = await prisma.menuItem.update({
    where: { id: Number(data.id) },
    data: {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      image: data.image,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await prisma.menuItem.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
} 