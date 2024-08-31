import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userId = req.cookies.get('weddingUserId')?.value;
  const isFirstUser = userId === '1';

  if (!isFirstUser) {
    return NextResponse.redirect(new URL('/timeLine', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/send_mail', '/invitee', '/invitation', '/invitee_list', '/invitee_detail'],
};
