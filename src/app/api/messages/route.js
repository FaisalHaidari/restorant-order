import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// دریافت پیام‌های کاربر جاری یا همه پیام‌ها برای ادمین
export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = session.user.id;
  const isAdmin = session.user.admin;

  let messages;
  if (isAdmin) {
    // ادمین همه پیام‌ها را می‌بیند
    messages = await prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
      include: { sender: true, receiver: true }
    });
  } else {
    // کاربر فقط پیام‌های خودش را می‌بیند
    messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      orderBy: { createdAt: 'asc' },
      include: { sender: true, receiver: true }
    });
  }
  return NextResponse.json(messages);
}

// ارسال پیام جدید
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = session.user.id;
  const isAdmin = session.user.admin;
  const data = await req.json();

  // فقط کاربر به ادمین یا ادمین به کاربر می‌تواند پیام بدهد
  if (!data.receiverId || !data.content) {
    return NextResponse.json({ error: 'receiverId and content required' }, { status: 400 });
  }
  // اگر کاربر عادی است فقط به ادمین پیام بدهد
  if (!isAdmin && !data.isToAdmin) {
    return NextResponse.json({ error: 'User can only send to admin' }, { status: 403 });
  }

  const message = await prisma.message.create({
    data: {
      senderId: userId,
      receiverId: data.receiverId,
      content: data.content
    }
  });
  return NextResponse.json(message);
}

// علامت‌گذاری پیام‌ها به عنوان خوانده‌شده
export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { userId, receiverId } = await req.json();
  if (session.user.admin && userId) {
    // همه پیام‌های خوانده‌نشده از این کاربر به ادمین را خوانده‌شده کن
    await prisma.message.updateMany({
      where: {
        senderId: userId,
        receiverId: session.user.id,
        read: false
      },
      data: { read: true }
    });
    return NextResponse.json({ success: true });
  } else if (!session.user.admin && receiverId && receiverId === session.user.id) {
    // کاربر: همه پیام‌های ادمین به خودش را خوانده‌شده کن
    await prisma.message.updateMany({
      where: {
        sender: { admin: true },
        receiverId: receiverId,
        read: false
      },
      data: { read: true }
    });
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// حذف همه پیام‌ها (فقط توسط ادمین)
export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (userId) {
    // Delete all messages for this user
    await prisma.message.deleteMany({
      where: {
        OR: [
          { senderId: Number(userId) },
          { receiverId: Number(userId) }
        ]
      }
    });
    // Do NOT delete the user itself
    return NextResponse.json({ success: true });
  }
  await prisma.message.deleteMany({});
  return NextResponse.json({ success: true });
} 