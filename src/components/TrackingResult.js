"use client";

import { Leaf, Ship, MapPin, Truck, ClipboardCheck } from "lucide-react";

function fmtDate(value) {
  return new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function TrackingResult({ tracking, t }) {
  if (!tracking) return null;

  return (
    <section className="tracking-summary">
      <div className="summary-main">
        <p className="eyebrow">Resumen del pedido</p>
        <span>Codigo de seguimiento</span>
        <h2>{tracking.code}</h2>
        <div className="shipment-facts">
          <div><Leaf size={26} /><span>Producto</span><strong>{tracking.product}</strong></div>
          <div><Ship size={26} /><span>Estado</span><strong>{tracking.currentStatus}</strong></div>
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
        <p className="route-note"><Truck size={20} />Tu despacho se encuentra actualizado en la plataforma de trazabilidad NODIEX.</p>
      </div>
      <aside className="summary-side">
        <h3>Detalles logisticos</h3>
        <p><MapPin size={18} />Ubicacion actual<br /><strong>{tracking.destination}</strong></p>
        <p><ClipboardCheck size={18} />Ultima actualizacion<br /><strong>{fmtDate(tracking.updatedAt)}</strong></p>
        <span className="status-pill">{tracking.currentStatus}</span>
        <button
          className="button-lima"
          style={{ marginTop: "1rem", width: "100%", textAlign: "center", justifyContent: "center" }}
          onClick={() => {
            const url = `${window.location.origin}/tracking/${tracking.code}`;
            navigator.clipboard.writeText(url).then(() => alert("Enlace copiado al portapapeles"));
          }}
        >
          Compartir enlace
        </button>
      </aside>
    </section>
  );
}
