import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  /*   const protectedPaths = ["/signin", "/signup", "/verify", "/"];
  const isProtectedPath = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  console.log(token, "——————————————————");
  

  if (token && isProtectedPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } */

  console.log(pathname);

  const isProtectedPath = pathname.startsWith("/dashboard");

  // if (!token && isProtectedPath) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/", "/dashboard/:paths*", "/verify/:paths*"],
};
