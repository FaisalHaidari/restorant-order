import prisma from '../../../../lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { orderId } = params;

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(orderId),
        ...(session.user && !session.user.admin && { userId: session.user.id }),
      },
      include: {
        items: {
          include: { menuItem: true } // Include menuItem details for each order item
        },
      },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error fetching order:', error, error?.meta);
    return NextResponse.json({ error: 'Failed to fetch order', details: error?.message }, { status: 500 });
  }
}
