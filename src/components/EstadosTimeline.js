"use client";

import { CheckCircle2, Truck, ClipboardCheck, AlertTriangle } from "lucide-react";

const statusIcons = {
  "registrado": ClipboardCheck,
  "en tránsito": Truck,
  "entregado/cerrado": CheckCircle2
};

const statusClass = {
  "registrado": "complete",
  "en tránsito": "active",
  "entregado/cerrado": "delivered"
};

const NEXT_STATES = {
  "registrado": ["en tránsito"],
  "en tránsito": ["entregado/cerrado"],
  "entregado/cerrado": []
};

export default function EstadosTimeline({ shipment, onStatusChange }) {
  const allowedNext = NEXT_STATES[shipment.currentStatus] || [];
  const canRevert = shipment.currentStatus !== "registrado";

  return (
    <div className="estados-timeline">
      <ol className="timeline status-timeline">
        {shipment.history.map((item, i) => {
          const Icon = statusIcons[item.status] || AlertTriangle;
          return (
            <li className={item.status === shipment.currentStatus ? "current" : ""} key={`${item.status}-${item.at}-${i}`}>
              <span className="timeline-icon">
                <Icon size={18} />
              </span>
              <div>
                <strong>{item.status}</strong>
                <span>{new Date(item.at).toLocaleString("es-PE", { dateStyle: "medium", timeStyle: "short" })}</span>
                {item.responsible && <small>{item.responsible}</small>}
                {item.note && <p className="timeline-note">{item.note}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="estados-actions">
        {allowedNext.map((nextState) => (
          <button
            key={nextState}
            className="button primary small"
            onClick={() => {
              const reason = prompt(`Motivo del cambio a "${nextState}":`) || "Actualizacion desde panel";
              onStatusChange(shipment.id, nextState, reason);
            }}
          >
            Avanzar a: {nextState}
          </button>
        ))}
        {canRevert && (
          <select
            className="revert-select"
            onChange={(e) => {
              if (!e.target.value) return;
              const reason = prompt("Motivo obligatorio para reversion:") || "";
              if (!reason.trim()) return;
              onStatusChange(shipment.id, e.target.value, reason);
              e.target.value = "";
            }}
          >
            <option value="">Revertir estado...</option>
            {["registrado", "en tránsito", "entregado/cerrado"]
              .filter((s) => s !== shipment.currentStatus)
              .map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
          </select>
        )}
      </div>
    </div>
  );
}
