import prisma from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json(categories);
} 