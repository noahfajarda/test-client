import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for requests to static files
  if (pathname.startsWith('/_next') || pathname.includes('/static/') || pathname.includes('/images/') ||  pathname.includes('/icon.png')) {
    return NextResponse.next();
  }
  // console.log(`Middleware running for path: ${request.nextUrl.pathname}`);
  return await updateSession(request);
}

