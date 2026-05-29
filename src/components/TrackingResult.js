"use client";

import { Leaf, Ship, MapPin, Truck, ClipboardCheck } from "lucide-react";

function fmtDate(value) {
  return new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function TrackingResult({ tracking, t }) {
  if (!tracking) return null;

  return (
    <section className="tracking-result-wrapper">
      <div className="tracking-result-card">
        <div className="result-main">
          <p className="eyebrow-orange">RESUMEN DEL PEDIDO</p>
          <span className="code-label">Codigo de seguimiento</span>
          <h2 className="code-value">{tracking.code}</h2>
          
          <div className="result-divider"></div>

          <div className="shipment-facts-modern">
            <div className="fact-item">
              <Leaf size={24} className="fact-icon" />
              <div>
                <span className="fact-title">Producto</span>
                <strong className="fact-data">{tracking.product}</strong>
              </div>
            </div>
            <div className="fact-item">
              <Ship size={24} className="fact-icon" />
              <div>
                <span className="fact-title">Estado</span>
                <strong className="fact-data">{tracking.currentStatus}</strong>
              </div>
            </div>
            <div className="fact-item">
              <MapPin size={24} className="fact-icon" />
              <div>
                <span className="fact-title">Destino</span>
                <strong className="fact-data">{tracking.destination}</strong>
              </div>
            </div>
          </div>

          <ol className="timeline-modern-history">
            {tracking.history.map((item, index) => {
              const isCurrent = item.status === tracking.currentStatus;
              return (
                <li className={`history-step ${isCurrent ? "current" : ""}`} key={`${item.status}-${item.at}`}>
                  <div className="step-dot"></div>
                  <strong>{item.status}</strong>
                  <span>{fmtDate(item.at)}</span>
                  {index < tracking.history.length - 1 && <div className="step-line"></div>}
                </li>
              );
            })}
          </ol>

          <div className="route-note-modern">
            <Truck size={18} />
            <p>Tu despacho se encuentra actualizado en la plataforma de trazabilidad NODIEX.</p>
          </div>
        </div>

        <aside className="result-side">
          <h3 className="side-title">Detalles logisticos</h3>
          
          <div className="side-detail">
            <MapPin size={18} className="side-icon" />
            <div>
              <span>Ubicacion actual</span>
              <strong>{tracking.destination}</strong>
            </div>
          </div>

          <div className="side-detail">
            <ClipboardCheck size={18} className="side-icon" />
            <div>
              <span>Ultima actualizacion</span>
              <strong>{fmtDate(tracking.updatedAt)}</strong>
            </div>
          </div>

          <div className="side-status-pill">{tracking.currentStatus}</div>
          
          <button
            className="button-lima share-btn"
            onClick={() => {
              const url = `${window.location.origin}/tracking/${tracking.code}`;
              navigator.clipboard.writeText(url).then(() => alert("Enlace copiado al portapapeles"));
            }}
          >
            Compartir enlace
          </button>
        </aside>
      </div>
    </section>
  );
}
