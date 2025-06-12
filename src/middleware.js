import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const isAdmin = token?.admin;

  // اگر کاربر به صفحه جزئیات سفارش دسترسی پیدا کند و ادمین نباشد
  if (request.nextUrl.pathname.startsWith('/order/') && !isAdmin) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/order/:path*']
}; 