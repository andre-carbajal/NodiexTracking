"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";
import EstadosTimeline from "@/components/EstadosTimeline";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 8;

export default function DespachosList({ shipments = [], onPost, onEdit }) {
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = statusFilter
    ? shipments.filter((s) => s.currentStatus === statusFilter)
    : shipments;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (shipments.length === 0) {
    return <EmptyState title="Sin despachos" description="Crea el primer despacho con el formulario de arriba." />;
  }

  return (
    <>
      <div className="filter-bar" style={{ marginBottom: "0.5rem" }}>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">Todos los estados</option>
          <option value="registrado">Registrado</option>
          <option value="en tránsito">En transito</option>
          <option value="entregado/cerrado">Entregado/Cerrado</option>
        </select>
      </div>
      <div className="data-table">
        {paginated.map((item) => (
          <div key={item.id}>
            <div className="data-row admin-list-row">
              <strong>{item.code}</strong>
              <span>{item.client}</span>
              <span>{item.destination}</span>
              <span className="status-pill">{item.currentStatus}</span>
              <div className="row-actions">
                <button
                  className="ghost-button small"
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  {expandedId === item.id ? "Ocultar" : "Detalle"}
                </button>
                <button
                  className="ghost-button small"
                  onClick={() => onEdit(item)}
                  title="Editar despacho"
                >
                  <Pencil size={14} />
                </button>
              </div>
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
