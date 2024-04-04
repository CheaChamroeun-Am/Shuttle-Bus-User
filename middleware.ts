import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  let token = request.cookies.get('token')
    ? request.cookies.get('token')!.value
    : '';
  let id = request.cookies.get('id') ? request.cookies.get('id')!.value : '';

  if (path === '/vkClubLogin' && !token && !id) {
    return;
  }

  if ((token === '' || id === '') && path !== '/auth/signIn') {
    return NextResponse.redirect(new URL('/auth/signIn', request.url));
  }

  if (path === '/auth/signIn' && token && id) {
    return NextResponse.redirect(new URL('/booking', request.url));
  }

  if (path === '/' && token && id) {
    return NextResponse.redirect(new URL('/booking', request.url));
  }
  if (path === '/vkClubLogin' && token && id) {
    return NextResponse.redirect(new URL('/booking', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
