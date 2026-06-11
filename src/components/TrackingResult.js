"use client";

import { Leaf, Ship, MapPin, Truck, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";

function fmtDate(value) {
  return new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function TrackingResult({ tracking, t }) {
  if (!tracking) return null;

  const currentIndex = Math.max(0, tracking.history.findIndex(h => h.status === tracking.currentStatus));

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
              <div className="fact-icon-wrapper">
                <Leaf size={24} className="fact-icon" />
              </div>
              <div>
                <span className="fact-title">Producto</span>
                <strong className="fact-data">{tracking.product}</strong>
              </div>
            </div>
            <div className="fact-item">
              <div className="fact-icon-wrapper">
                <Ship size={24} className="fact-icon" />
              </div>
              <div>
                <span className="fact-title">Estado</span>
                <strong className="fact-data">{tracking.currentStatus}</strong>
              </div>
            </div>
            <div className="fact-item">
              <div className="fact-icon-wrapper">
                <MapPin size={24} className="fact-icon" />
              </div>
              <div>
                <span className="fact-title">Destino</span>
                <strong className="fact-data">{tracking.destination}</strong>
              </div>
            </div>
          </div>

          <div className="timeline-container" style={{ position: "relative" }}>
            <motion.div
              className="progress-line-fill"
              initial={{ width: `${(0.5 / tracking.history.length) * 100}%` }}
              animate={{ width: `${(currentIndex + 0.5) / tracking.history.length * 100}%` }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.div
              className="truck-indicator"
              initial={{ left: `${(0.5 / tracking.history.length) * 100}%` }}
              animate={{ left: `${(currentIndex + 0.5) / tracking.history.length * 100}%` }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <Truck size={24} color="var(--green-lima)" fill="white" />
            </motion.div>

            <ol className="timeline-modern-history">
              {tracking.history.map((item, index) => {
                const isCurrent = item.status === tracking.currentStatus;
                const isPast = index <= currentIndex;
                return (
                  <li className={`history-step ${isPast ? "current" : ""}`} key={`${item.status}-${item.at}`}>
                    <div className="step-dot"></div>
                    <strong>{item.status}</strong>
                    <span>{fmtDate(item.at)}</span>
                    {index < tracking.history.length - 1 && <div className="step-line"></div>}
                  </li>
                );
              })}
            </ol>
          </div>

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
