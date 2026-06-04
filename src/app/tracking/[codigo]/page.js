"use client";

import { CheckCircle2, ClipboardCheck, Copy, MapPin, Search, Ship, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { use } from "react";
import Header from "@/components/Header";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { copy, languages } from "@/lib/i18n";
import { isValidEmail } from "@/lib/validators";

function fmtDate(value) {
  return new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function TrackingCodePage({ params }) {
  const { codigo } = use(params);
  const [lang, setLang] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [tracking, setTracking] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const t = copy[lang];

  useEffect(() => {
    async function validateCode() {
      setLoading(true);
      setCodeVerified(false);
      setTracking(null);
      setEmail("");
      setError("");
      const res = await fetch(`/api/public/tracking/${codigo}`);
      const json = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(json.message || "No se encontro informacion para este codigo.");
        return;
      }

      setCodeVerified(true);
    }

    validateCode();
  }, [codigo]);

  async function verifyEmail(event) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!isValidEmail(trimmedEmail)) {
      setError("Ingrese el correo registrado para este pedido.");
      return;
    }

    setLoading(true);
    setTracking(null);
    setError("");
    const res = await fetch("/api/tracking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: codigo, email: trimmedEmail, step: "email" })
    });
    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(json.message || "El correo no coincide con este pedido.");
      return;
    }

    setTracking(json.shipment);
  }

  function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => alert("Enlace copiado al portapapeles"));
  }

  return (
    <main className="public-site tracking-page">
      <Header lang={lang} setLang={setLang} menuOpen={menuOpen} setMenuOpen={setMenuOpen} languages={languages} t={t} />

      <section className="tracking-hero">
        <div className="tracking-hero-inner">
          <Link href="/tracking" className="back-link">Nueva consulta</Link>
          <h1>Seguimiento de despacho</h1>
        </div>
      </section>

      {loading && (
        <section className="tracking-summary">
          <LoadingSkeleton variant="timeline" />
        </section>
      )}

      {error && !loading && !codeVerified && (
        <section className="tracking-summary">
          <p className="form-error" style={{ textAlign: "center" }}>{error}</p>
        </section>
      )}

      {codeVerified && !tracking && !loading && (
        <section className="tracking-summary">
          <div className="summary-main">
            <p className="eyebrow">Codigo validado</p>
            <h2>{String(codigo).trim().toUpperCase()}</h2>
            <form className="tracking-widget standalone" onSubmit={verifyEmail}>
              <label>
                Ingrese el correo registrado para verificar el pedido
                <div className="tracking-input-row large">
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="correo@empresa.com"
                    type="email"
                    className={error ? "input-error" : ""}
                  />
                  <button className="button primary" disabled={loading} type="submit">
                    <Search size={22} /> Verificar
                  </button>
                </div>
              </label>
              {error && <p className="form-error">{error}</p>}
            </form>
          </div>
          <aside className="summary-side">
            <h3>Verificacion requerida</h3>
            <p><ClipboardCheck size={18} />El detalle se mostrara solo si el correo coincide con el registrado.</p>
          </aside>
        </section>
      )}

      {tracking && (
        <section className="tracking-summary">
          <div className="summary-main">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p className="eyebrow">Resumen del pedido</p>
              <button className="button secondary small" onClick={copyLink}>
                <Copy size={14} /> Copiar enlace
              </button>
            </div>
            <h2>{tracking.code}</h2>
            <div className="shipment-facts">
              <div><Ship size={26} /><span>Producto</span><strong>{tracking.product}</strong></div>
              <div><ClipboardCheck size={26} /><span>Estado</span><strong>{tracking.currentStatus}</strong></div>
              <div><MapPin size={26} /><span>Destino</span><strong>{tracking.destination}</strong></div>
            </div>
            <ol className="timeline">
              {tracking.history.map((item) => (
                <li className={item.status === tracking.currentStatus ? "current" : ""} key={`${item.status}-${item.at}`}>
                  <strong>{item.status}</strong>
                  <span>{fmtDate(item.at)}</span>
                </li>
              ))}
            </ol>
            <p className="route-note"><Truck size={20} />Su despacho se encuentra actualizado en la plataforma de trazabilidad NODIEX.</p>
          </div>
          <aside className="summary-side">
            <h3>Detalles logisticos</h3>
            <p><MapPin size={18} />Ubicacion actual<br /><strong>{tracking.destination}</strong></p>
            <p><CheckCircle2 size={18} />Ultima actualizacion<br /><strong>{fmtDate(tracking.updatedAt)}</strong></p>
            <span className="status-pill">{tracking.currentStatus}</span>
          </aside>
        </section>
      )}

      <footer className="site-footer" style={{ marginTop: "auto" }}>
        <div className="footer-inner">
          <div className="footer-logo">
            <strong>NODIEX</strong>
            <span>DEL PERU</span>
            <small>Agroexportacion con calidad y confianza</small>
          </div>
        </div>
      </footer>
    </main>
  );
}
