"use client";

import { FileClock } from "lucide-react";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";

const PAGE_SIZE = 10;

export default function BitacoraView({ token }) {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [filterUser, setFilterUser] = useState("");
  const [filterEntity, setFilterEntity] = useState("todos");
  const [filterDateStart, setFilterDateStart] = useState("");
  const [filterDateEnd, setFilterDateEnd] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAudit() {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          user: filterUser,
          entity: filterEntity,
          start: filterDateStart,
          end: filterDateEnd
        });
        const res = await fetch(`/api/admin/audit?${query.toString()}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const json = await res.json();
        if (json.ok) {
          setEvents(json.data);
        }
      } catch (error) {
        console.error("Error fetching audit logs", error);
      }
      setLoading(false);
    }
    fetchAudit();
  }, [filterUser, filterEntity, filterDateStart, filterDateEnd, token]);

  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const paginated = events.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function exportCSV() {
    const headers = ["Fecha", "Usuario", "Entidad", "Operacion", "Detalle"];
    const rows = events.map((e) => [
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
      <div className="audit-filters-panel" style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Usuario responsable..."
          value={filterUser}
          onChange={(e) => { setFilterUser(e.target.value); setPage(1); }}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <select 
          value={filterEntity} 
          onChange={(e) => { setFilterEntity(e.target.value); setPage(1); }}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
        >
          <option value="todos">Todas las Entidades</option>
          <option value="despacho">Despachos</option>
          <option value="producto">Productos</option>
          <option value="certificacion">Certificaciones</option>
          <option value="usuario">Usuarios</option>
        </select>
        <input 
          type="date" 
          value={filterDateStart} 
          onChange={(e) => { setFilterDateStart(e.target.value); setPage(1); }}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <input 
          type="date" 
          value={filterDateEnd} 
          onChange={(e) => { setFilterDateEnd(e.target.value); setPage(1); }}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button className="button secondary small" onClick={exportCSV}>Exportar CSV</button>
      </div>
      
      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>Cargando bitácora...</div>
      ) : events.length === 0 ? (
        <EmptyState title="Sin eventos de auditoria" description="No se encontraron registros para estos filtros." />
      ) : (
        <>
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
      )}
    </>
  );
}
