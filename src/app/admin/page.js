"use client";

import { Activity, Award, Boxes, FileClock, LogIn, Plus, ShieldCheck, Ship } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const passwordHint = "Usuario: admin, operativo, comercial o gerencia · Clave: Nodiex2026!";

export default function AdminPage() {
  const [token, setToken] = useState(() => (typeof window === "undefined" ? "" : localStorage.getItem("nodiex-token") || ""));
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ shipments: [], products: [], certificates: [], audit: [] });
  const [message, setMessage] = useState("");
  const [login, setLogin] = useState({ username: "admin", password: "Nodiex2026!" });
  const [shipment, setShipment] = useState({ client: "", destination: "", product: "" });
  const [product, setProduct] = useState({ name: "", description: "", unit: "TM", currency: "USD", price: "", publish: true });
  const [certificate, setCertificate] = useState({ certType: "SENASA", validUntil: "2026-12-31", evidence: "" });

  const stats = useMemo(() => [
    { label: "Despachos", value: data.shipments.length, icon: Ship },
    { label: "Productos", value: data.products.length, icon: Boxes },
    { label: "Certificaciones", value: data.certificates.length, icon: Award },
    { label: "Eventos auditoria", value: data.audit.length, icon: Activity }
  ], [data]);

  const load = useCallback(async (currentToken = token) => {
    if (!currentToken) return;
    const res = await fetch("/api/admin", { headers: { Authorization: `Bearer ${currentToken}` } });
    const json = await res.json();
    if (res.ok) {
      setData(json.data);
      setUser(json.user);
    }
  }, [token]);

  useEffect(() => {
    if (token) load(token);
  }, [load, token]);

  async function doLogin(event) {
    event.preventDefault();
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
    setMessage("");
    await load(json.token);
  }

  async function post(body) {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    setMessage(json.message || (res.ok ? "Operacion registrada en bitacora." : "Operacion rechazada."));
    await load();
  }

  if (!token) {
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

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="brand" href="/"><span>N</span><strong>NODIEX</strong></Link>
        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#shipments">Despachos</a>
          <a href="#catalog-admin">Catalogo</a>
          <a href="#cert-admin">Certificaciones</a>
          <a href="#audit">Auditoria</a>
        </nav>
        <button className="ghost-button" onClick={() => { localStorage.removeItem("nodiex-token"); setToken(""); }}>Cerrar sesion</button>
      </aside>

      <section className="admin-content">
        <header className="admin-topbar" id="dashboard">
          <div>
            <p className="eyebrow">Rol: {user?.role}</p>
            <h1>Operación comercial y trazabilidad</h1>
          </div>
          <span>{user?.username}</span>
        </header>
        {message && <p className="notice">{message}</p>}

        <div className="admin-stats">
          {stats.map((item) => {
            const Icon = item.icon;
            return <article key={item.label}><Icon /><strong>{item.value}</strong><span>{item.label}</span></article>;
          })}
        </div>

        <section className="admin-panel" id="shipments">
          <div className="panel-heading"><Ship /><h2>Gestión de despachos</h2></div>
          <div className="form-grid">
            <input placeholder="Cliente internacional" value={shipment.client} onChange={(e) => setShipment({ ...shipment, client: e.target.value })} />
            <input placeholder="Destino" value={shipment.destination} onChange={(e) => setShipment({ ...shipment, destination: e.target.value })} />
            <input placeholder="Producto" value={shipment.product} onChange={(e) => setShipment({ ...shipment, product: e.target.value })} />
            <button className="button primary" onClick={() => post({ type: "shipment", ...shipment })}><Plus size={18} />Crear despacho</button>
          </div>
          <div className="data-table">
            {data.shipments.map((item) => (
              <div className="data-row" key={item.id}>
                <strong>{item.code}</strong>
                <span>{item.client}</span>
                <span>{item.destination}</span>
                <select value={item.currentStatus} onChange={(event) => post({ type: "shipmentStatus", id: item.id, status: event.target.value, reason: "Actualizacion desde panel" })}>
                  <option>registrado</option>
                  <option>en tránsito</option>
                  <option>entregado/cerrado</option>
                </select>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel" id="catalog-admin">
          <div className="panel-heading"><Boxes /><h2>Catálogo y precios</h2></div>
          <div className="form-grid">
            <input placeholder="Nombre producto" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            <input placeholder="Descripcion" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
            <select value={product.unit} onChange={(e) => setProduct({ ...product, unit: e.target.value })}><option>TM</option><option>{"Contenedor 20'"}</option><option>{"Contenedor 40'"}</option></select>
            <select value={product.currency} onChange={(e) => setProduct({ ...product, currency: e.target.value })}><option>PEN</option><option>USD</option><option>EUR</option></select>
            <input placeholder="Precio" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
            <button className="button primary" onClick={() => post({ type: "product", ...product })}><Plus size={18} />Crear producto</button>
          </div>
        </section>

        <section className="admin-panel" id="cert-admin">
          <div className="panel-heading"><Award /><h2>Certificaciones</h2></div>
          <div className="form-grid">
            <select value={certificate.certType} onChange={(e) => setCertificate({ ...certificate, certType: e.target.value })}><option>SENASA</option><option>BRC</option><option>ISO</option><option>BASC</option></select>
            <input type="date" value={certificate.validUntil} onChange={(e) => setCertificate({ ...certificate, validUntil: e.target.value })} />
            <input placeholder="Evidencia documental" value={certificate.evidence} onChange={(e) => setCertificate({ ...certificate, evidence: e.target.value })} />
            <button className="button primary" onClick={() => post({ type: "certificate", ...certificate })}><Plus size={18} />Registrar certificacion</button>
          </div>
        </section>

        <section className="admin-panel" id="audit">
          <div className="panel-heading"><FileClock /><h2>Bitácora gerencial</h2></div>
          <div className="audit-list">
            {data.audit.map((event) => (
              <article key={event.id}>
                <strong>{event.operation}</strong>
                <span>{event.user} · {event.entity} · {new Date(event.createdAt).toLocaleString("es-PE")}</span>
                <p>{event.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
