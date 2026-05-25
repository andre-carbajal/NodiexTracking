import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signUser } from "@/lib/auth";
import { audit, store } from "@/lib/store";

export async function POST(request) {
  const { username, password } = await request.json().catch(() => ({}));
  const user = store.users.find((item) => item.username === username);
  const now = Date.now();

  if (!user) {
    audit("anonimo", "login_fallido", "usuario", "Usuario inexistente");
    return NextResponse.json({ ok: false, message: "Credenciales invalidas" }, { status: 401 });
  }

  if (user.lockedUntil && user.lockedUntil > now) {
    return NextResponse.json({ ok: false, message: "Acceso bloqueado temporalmente" }, { status: 423 });
  }

  const valid = await bcrypt.compare(String(password ?? ""), user.passwordHash);
  if (!valid) {
    user.failedAttempts += 1;
    if (user.failedAttempts >= 5) {
      user.lockedUntil = now + 15 * 60 * 1000;
      user.failedAttempts = 0;
    }
    audit(user.username, "login_fallido", "usuario", "Credenciales invalidas");
    return NextResponse.json({ ok: false, message: "Credenciales invalidas" }, { status: 401 });
  }

  user.failedAttempts = 0;
  user.lockedUntil = null;
  audit(user.username, "login_exitoso", "usuario", `Rol ${user.role}`);
  return NextResponse.json({ ok: true, token: signUser(user), user: { username: user.username, role: user.role } });
}
