import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signUser } from "@/lib/auth";
import { audit, getUserByUsername, registerLoginFailure, registerLoginSuccess, userSessionPayload } from "@/lib/store";

function clientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function POST(request) {
  const { username, password } = await request.json().catch(() => ({}));
  const user = await getUserByUsername(username);
  const now = Date.now();

  if (!user) {
    await audit("anonimo", "login_fallido", "usuario", "Usuario inexistente");
    return NextResponse.json({ ok: false, message: "Credenciales invalidas" }, { status: 401 });
  }

  if (user.lockedUntil && user.lockedUntil.getTime() > now) {
    return NextResponse.json({ ok: false, message: "Acceso bloqueado temporalmente" }, { status: 423 });
  }

  const valid = await bcrypt.compare(String(password ?? ""), user.hashPassword);
  if (!valid) {
    await registerLoginFailure(user);
    return NextResponse.json({ ok: false, message: "Credenciales invalidas" }, { status: 401 });
  }

  const payload = userSessionPayload(user);
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);
  const token = signUser(payload, expiresAt);
  await registerLoginSuccess(user, token, clientIp(request), expiresAt);

  const response = NextResponse.json({ ok: true, token, user: { username: payload.username, role: payload.role } });
  response.cookies.set("nodiex-auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60
  });

  return response;
}
