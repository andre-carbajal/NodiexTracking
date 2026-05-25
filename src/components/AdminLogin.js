"use client";

import { LogIn, ShieldCheck } from "lucide-react";
import Link from "next/link";

const passwordHint = "Usuario: admin, operativo, comercial o gerencia · Clave: Nodiex2026!";

export default function AdminLogin({ login, setLogin, message, doLogin }) {
  return (
    <main className="admin-shell login-shell">
      <Link className="back-link" href="/">Volver al portal</Link>
      <form className="login-panel" onSubmit={doLogin}>
        <ShieldCheck size={36} />
        <h1>Panel administrativo NODIEX</h1>
        <p>{passwordHint}</p>
        <input value={login.username} onChange={(event) => setLogin({ ...login, username: event.target.value })} placeholder="Usuario" />
        <input value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} placeholder="Contrasena" type="password" />
        <button className="button primary"><LogIn size={18} />Ingresar</button>
        {message && <span className="form-error">{message}</span>}
      </form>
    </main>
  );
}
