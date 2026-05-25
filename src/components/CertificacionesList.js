"use client";

import EmptyState from "@/components/EmptyState";

export default function CertificacionesList({ certificates = [] }) {
  if (certificates.length === 0) {
    return <EmptyState title="Sin certificaciones" description="Registra la primera certificacion con el formulario de arriba." />;
  }

  return (
    <div className="data-table">
      {certificates.map((item) => (
        <div className="data-row" key={item.id}>
          <strong>{item.type}</strong>
          <span>Vence: {item.validUntil}</span>
          <span className="status-pill">{item.status}</span>
        </div>
      ))}
    </div>
  );
}
