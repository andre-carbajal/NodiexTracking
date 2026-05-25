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

  const load = useCallback(async (currentToken = token) => {
    if (!currentToken) return;
    const res = await fetch("/api/admin", { headers: { Authorization: `Bearer ${currentToken}` } });
    const json = await res.json();
    if (res.ok) {
      setData(json.data);
      setUser(json.user);
    } else {
      localStorage.removeItem("nodiex-token");
      setToken("");
    }
  }, [token]);

  useEffect(() => {
    setHydrated(true);
    setToken(localStorage.getItem("nodiex-token") || "");
  }, []);

  useEffect(() => {
    if (token) load(token);
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
    localStorage.setItem("nodiex-token", json.token);
    await load(json.token);
  }

  function handleLogout() {
    localStorage.removeItem("nodiex-token");
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
