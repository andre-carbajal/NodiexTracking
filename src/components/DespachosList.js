"use client";

import { useState } from "react";
import EstadosTimeline from "@/components/EstadosTimeline";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 8;

export default function DespachosList({ shipments = [], onPost }) {
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);

  const totalPages = Math.max(1, Math.ceil(shipments.length / PAGE_SIZE));
  const paginated = shipments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (shipments.length === 0) {
    return <EmptyState title="Sin despachos" description="Crea el primer despacho con el formulario de arriba." />;
  }

  return (
    <>
      <div className="data-table">
        {paginated.map((item) => (
          <div key={item.id}>
            <div className="data-row">
              <strong>{item.code}</strong>
              <span>{item.client}</span>
              <span>{item.destination}</span>
              <span className="status-pill">{item.currentStatus}</span>
              <button
                className="ghost-button small"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                {expandedId === item.id ? "Ocultar" : "Detalle"}
              </button>
            </div>
            {expandedId === item.id && (
              <div className="expanded-row">
                <EstadosTimeline
                  shipment={item}
                  onStatusChange={(id, status, reason) =>
                    onPost({ type: "shipmentStatus", id, status, reason })
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
