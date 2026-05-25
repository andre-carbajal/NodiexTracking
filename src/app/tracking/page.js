"use client";

import { CheckCircle2, ClipboardCheck, MapPin, PackageSearch, Search, Ship, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { copy, languages } from "@/lib/i18n";
import { isValidTrackingCode } from "@/lib/validators";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Header from "@/components/Header";

function fmtDate(value) {
  return new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function TrackingPage() {
  const [lang, setLang] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [code, setCode] = useState("");
  const [tracking, setTracking] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const t = copy[lang];

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      setError("Ingrese un codigo de seguimiento.");
      return;
    }
    if (!isValidTrackingCode(trimmed)) {
      setError("Formato de codigo invalido. Ejemplo: NDX-8Q4M-2026");
      return;
    }

    setLoading(true);
    setTracking(null);
    setError("");

    const res = await fetch("/api/tracking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: trimmed })
    });
    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(json.message || t.invalidTracking);
      return;
    }

    setTracking(json.shipment);
  }

  function copyLink() {
    const url = `${window.location.origin}/tracking/${tracking.code}`;
    navigator.clipboard.writeText(url).then(() => alert("Enlace copiado al portapapeles"));
  }

  return (
    <main className="public-site tracking-page">
      <Header lang={lang} setLang={setLang} menuOpen={menuOpen} setMenuOpen={setMenuOpen} languages={languages} t={t} />

      <section className="tracking-hero">
        <div className="tracking-hero-inner">
          <Link href="/" className="back-link">Volver al portal</Link>
          <h1>Consulta de seguimiento</h1>
          <p>Ingrese el codigo de tracking proporcionado por NODIEX para conocer el estado de su despacho.</p>

          <form className="tracking-widget standalone" onSubmit={handleSubmit}>
            <div className="tracking-input-row large">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.trackingPlaceholder}
                className={error ? "input-error" : ""}
              />
              <button className="button primary" disabled={loading} type="submit">
                {loading ? <span className="spinner-small" /> : <Search size={22} />}
                Consultar
              </button>
            </div>
            {error && <p className="form-error">{error}</p>}
          </form>
        </div>
      </section>

      {loading && (
        <section className="tracking-summary">
          <LoadingSkeleton variant="timeline" />
        </section>
      )}

      {tracking && (
        <section className="tracking-summary">
          <div className="summary-main">
            <p className="eyebrow">Resumen del pedido</p>
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
            <p><ClipboardCheck size={18} />Ultima actualizacion<br /><strong>{fmtDate(tracking.updatedAt)}</strong></p>
            <span className="status-pill">{tracking.currentStatus}</span>
            <button className="button primary" style={{ marginTop: "1rem", width: "100%" }} onClick={copyLink}>
              Copiar enlace
            </button>
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
