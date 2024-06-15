import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  const protectedPaths = ["/signin", "/signup", "/verify", "/"];
  const isProtectedPath = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  if (token && isProtectedPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/signin", "/signup", "/", "/dashboard/:paths*", "/verify/:paths*"],
};
