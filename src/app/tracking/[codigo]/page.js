"use client";

import { CheckCircle2, ClipboardCheck, Copy, MapPin, Ship, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { use } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Footer from "@/components/Footer";
import { useI18n } from "@/components/I18nProvider";
import { copy } from "@/lib/i18n";

function fmtDate(value, lang = "es") {
  const locale = lang === "en" ? "en-US" : lang === "pt" ? "pt-BR" : "es-PE";
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function TrackingCodePage({ params }) {
  const { codigo } = use(params);
  const { lang } = useI18n();
  const [tracking, setTracking] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const t = copy[lang] || copy["es"];

  useEffect(() => {
    async function fetchTracking() {
      setLoading(true);
      const res = await fetch(`/api/public/tracking/${codigo}`);
      const json = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(json.message || t.invalidTracking || "No se encontro informacion para este codigo.");
        return;
      }

      setTracking(json.shipment);
    }

    fetchTracking();
  }, [codigo, t.invalidTracking]);

  function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => alert(t.copiedSuccess || "Enlace copiado al portapapeles"));
  }

  return (
    <main className="public-site tracking-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <section className="tracking-hero" style={{ marginTop: "120px" }}>
        <div className="tracking-hero-inner">
          <Link href="/tracking" className="back-link">{t.newSearch || "Nueva consulta"}</Link>
          <h1>{t.trackingLabel || "Seguimiento de despacho"}</h1>
        </div>
      </section>

      {loading && (
        <section className="tracking-summary">
          <LoadingSkeleton variant="timeline" />
        </section>
      )}

      {error && !loading && (
        <section className="tracking-summary">
          <p className="form-error" style={{ textAlign: "center" }}>{error}</p>
        </section>
      )}

      {tracking && (
        <section className="tracking-summary" style={{ marginBottom: "60px" }}>
          <div className="summary-main">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p className="eyebrow">{t.shipmentSummary || "Resumen del pedido"}</p>
              <button className="button secondary small" onClick={copyLink}>
                <Copy size={14} /> {t.copyLinkBtn || "Copiar enlace"}
              </button>
            </div>
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
            <p><CheckCircle2 size={18} />{t.lastUpdate || "Ultima actualizacion"}<br /><strong>{fmtDate(tracking.updatedAt, lang)}</strong></p>
            <span className="status-pill">{tracking.currentStatus}</span>
          </aside>
        </section>
      )}

      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
    </main>
  );
}
