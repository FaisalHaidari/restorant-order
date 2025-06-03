import prisma from '../../../lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await req.json();
  const { cartItems, phone, street, buildingNo, floor, apartmentNo, description, postalCode, city, country, total } = data;
  try {
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total,
        phone,
        street,
        buildingNo,
        floor,
        apartmentNo,
        description,
        postalCode,
        city,
        country,
        items: {
          create: cartItems.map(item => ({
            menuItemId: item.id,
            quantity: item.quantity || 1,
            price: item.price,
          }))
        }
      },
      include: { items: true }
    });
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Order creation error:', error, error?.meta);
    return NextResponse.json({ error: 'Order creation failed', details: error?.message }, { status: 500 });
  }
} 