"use client";

import { FileClock } from "lucide-react";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";

const PAGE_SIZE = 10;

export default function BitacoraView({ events = [] }) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const filtered = filter
    ? events.filter((e) =>
        e.operation?.toLowerCase().includes(filter.toLowerCase()) ||
        e.entity?.toLowerCase().includes(filter.toLowerCase()) ||
        e.user?.toLowerCase().includes(filter.toLowerCase())
      )
    : events;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (events.length === 0) {
    return <EmptyState title="Sin eventos de auditoria" description="Los eventos se registraran automaticamente al usar el sistema." />;
  }

  function exportCSV() {
    const headers = ["Fecha", "Usuario", "Entidad", "Operacion", "Detalle"];
    const rows = filtered.map((e) => [
      new Date(e.createdAt).toLocaleString("es-PE"),
      e.user,
      e.entity,
      e.operation,
      e.detail
    ]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bitacora-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="audit-controls">
        <input
          placeholder="Filtrar por usuario, entidad u operacion..."
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
        />
        <button className="button secondary small" onClick={exportCSV}>Exportar CSV</button>
      </div>
      <div className="audit-list">
        {paginated.map((event) => (
          <article key={event.id}>
            <strong>{event.operation}</strong>
            <span>{event.user} · {event.entity} · {new Date(event.createdAt).toLocaleString("es-PE")}</span>
            <p>{event.detail}</p>
          </article>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
