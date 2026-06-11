"use client";

import { useCallback, useEffect, useState } from "react";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function AdminPage() {
  const [hydrated, setHydrated] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ shipments: [], products: [], certificates: [], audit: [], users: [] });
  const [message, setMessage] = useState("");
  const [login, setLogin] = useState({ username: "admin", password: "Nodiex2026!" });

  const load = useCallback(async (currentToken = token, params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
    });
    const path = query.toString() ? `/api/admin?${query.toString()}` : "/api/admin";
    const headers = {};
    if (currentToken && currentToken !== "cookie-authenticated") {
      headers.Authorization = `Bearer ${currentToken}`;
    }
    const res = await fetch(path, { headers });
    const json = await res.json();
    if (res.ok) {
      setData(json.data);
      setUser(json.user);
      setToken(json.token || currentToken || "cookie-authenticated");
    } else {
      setToken("");
    }
  }, [token]);

  useEffect(() => {
    setHydrated(true);
    load("");
  }, []);

  useEffect(() => {
    if (token && token !== "cookie-authenticated") load(token);
  }, [load, token]);

  async function doLogin(event) {
    event.preventDefault();
    setMessage("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)
    });
    const json = await res.json();
    if (!res.ok) {
      setMessage(json.message || "No se pudo iniciar sesion");
      return;
    }
    setToken(json.token);
    setUser(json.user);
    await load(json.token);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setToken("");
    setUser(null);
  }

  if (!hydrated) {
    return (
      <ErrorBoundary>
        <main className="admin-shell login-shell">
          <section className="login-panel">
            <p className="eyebrow">Panel administrativo</p>
            <h1>Cargando...</h1>
          </section>
        </main>
      </ErrorBoundary>
    );
  }

  if (!token) {
    return (
      <ErrorBoundary>
        <AdminLogin login={login} setLogin={setLogin} message={message} doLogin={doLogin} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <AdminDashboard user={user} data={data} token={token} onLogout={handleLogout} load={load} />
    </ErrorBoundary>
  );
}
