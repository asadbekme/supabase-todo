import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { access_token, refresh_token } = await req.json();

  const res = NextResponse.json({ success: true });
  res.cookies.set("sb-access-token", access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  res.cookies.set("sb-refresh-token", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
