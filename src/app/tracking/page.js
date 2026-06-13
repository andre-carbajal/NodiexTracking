"use client";

import { CheckCircle2, ClipboardCheck, MapPin, PackageSearch, Search, Ship, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { copy } from "@/lib/i18n";
import { isValidTrackingCode } from "@/lib/validators";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Footer from "@/components/Footer";
import { useI18n } from "@/components/I18nProvider";

function fmtDate(value, lang = "es") {
  const locale = lang === "en" ? "en-US" : lang === "pt" ? "pt-BR" : "es-PE";
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function TrackingPage() {
  const { lang } = useI18n();
  const [code, setCode] = useState("");
  const [tracking, setTracking] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const t = copy[lang] || copy["es"];

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      setError(t.enterCodeError || "Ingrese un codigo de seguimiento.");
      return;
    }
    if (!isValidTrackingCode(trimmed)) {
      setError(t.invalidCodeFormat || "Formato de codigo invalido. Ejemplo: NDX-8Q4M-2026");
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
    navigator.clipboard.writeText(url).then(() => alert(t.copiedSuccess || "Enlace copiado al portapapeles"));
  }

  return (
    <main className="public-site tracking-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <section className="tracking-hero" style={{ marginTop: "120px" }}>
        <div className="tracking-hero-inner">
          <Link href="/" className="back-link">{t.backToPortal || "Volver al portal"}</Link>
          <h1>{t.trackingTitleSingle || "Consulta de seguimiento"}</h1>
          <p>{t.trackingDescSingle || "Ingrese el codigo de tracking proporcionado por NODIEX para conocer el estado de su despacho."}</p>

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
                {t.trackingButton || "Consultar"}
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
        <section className="tracking-summary" style={{ marginBottom: "60px" }}>
          <div className="summary-main">
            <p className="eyebrow">{t.shipmentSummary || "Resumen del pedido"}</p>
            <h2>{tracking.code}</h2>
            <div className="shipment-facts">
              <div><Ship size={26} /><span>{t.productLabel || "Producto"}</span><strong>{tracking.product}</strong></div>
              <div><ClipboardCheck size={26} /><span>{t.statusLabel || "Estado"}</span><strong>{tracking.currentStatus}</strong></div>
              <div><MapPin size={26} /><span>{t.destinationLabel || "Destino"}</span><strong>{tracking.destination}</strong></div>
            </div>
            <ol className="timeline">
              {tracking.history.map((item) => (
                <li className={item.status === tracking.currentStatus ? "current" : ""} key={`${item.status}-${item.at}`}>
                  <strong>{item.status}</strong>
                  <span>{fmtDate(item.at, lang)}</span>
                </li>
              ))}
            </ol>
            <p className="route-note"><Truck size={20} />{t.routeUpdated || "Su despacho se encuentra actualizado en la plataforma de trazabilidad NODIEX."}</p>
          </div>
          <aside className="summary-side">
            <h3>{t.logisticsDetails || "Detalles logisticos"}</h3>
            <p><MapPin size={18} />{t.currentLocation || "Ubicacion actual"}<br /><strong>{tracking.destination}</strong></p>
            <p><ClipboardCheck size={18} />{t.lastUpdate || "Ultima actualizacion"}<br /><strong>{fmtDate(tracking.updatedAt, lang)}</strong></p>
            <span className="status-pill">{tracking.currentStatus}</span>
            <button className="button primary" style={{ marginTop: "1rem", width: "100%" }} onClick={copyLink}>
              {t.copyLinkBtn || "Copiar enlace"}
            </button>
          </aside>
        </section>
      )}

      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
    </main>
  );
}
