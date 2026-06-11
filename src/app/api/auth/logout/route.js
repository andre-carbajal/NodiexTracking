import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true, message: "Sesión cerrada correctamente" });
  
  response.cookies.set("nodiex-auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0) // Expire immediately
  });

  return response;
}
