"use client";

import { useState } from "react";
import { Eye, Calendar, User, Mail, Building, Globe } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";

export default function ContactosList({ contacts = [] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const pageSize = 8;

  // Filter contacts based on search query
  const filtered = contacts.filter((c) => {
    const term = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(term) ||
      (c.company && c.company.toLowerCase().includes(term)) ||
      c.email.toLowerCase().includes(term) ||
      (c.country && c.country.toLowerCase().includes(term)) ||
      c.message.toLowerCase().includes(term)
    );
  });

  // Calculate paginated slice
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("es-PE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  }

  if (contacts.length === 0) {
    return (
      <EmptyState
        title="Sin mensajes"
        description="No se han recibido mensajes de contacto en el sistema."
      />
    );
  }

  return (
    <div>
      <div className="admin-filters" style={{ marginBottom: "20px" }}>
        <label>
          Buscar mensajes
          <input
            placeholder="Buscar por nombre, correo, empresa, país o mensaje..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Sin resultados"
          description="Ningún mensaje coincide con tu búsqueda."
        />
      ) : (
        <>
          <div className="data-table">
            {paginated.map((c) => (
              <div
                className="data-row"
                key={c.id}
                style={{
                  gridTemplateColumns: "180px 1fr 1fr auto",
                }}
              >
                <span>{formatDate(c.createdAt)}</span>
                <strong className="list-title">
                  {c.name}
                  {c.company && (
                    <small
                      style={{
                        display: "block",
                        fontWeight: "normal",
                        color: "var(--muted)",
                        fontSize: "0.85em",
                      }}
                    >
                      {c.company} {c.country ? `(${c.country})` : ""}
                    </small>
                  )}
                </strong>
                <span>{c.email}</span>
                <div className="row-actions">
                  <button
                    className="ghost-button small"
                    onClick={() => setSelectedContact(c)}
                    title="Ver mensaje completo"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      {selectedContact && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedContact(null);
          }}
        >
          <section
            className="edit-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Detalle del mensaje de contacto"
            style={{ maxWidth: "600px" }}
          >
            <div className="modal-heading">
              <h2>Mensaje de Contacto</h2>
              <button
                type="button"
                className="ghost-button small"
                onClick={() => setSelectedContact(null)}
              >
                Cerrar
              </button>
            </div>

            <div style={{ display: "grid", gap: "16px", padding: "10px 0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px", alignItems: "center" }}>
                <Calendar size={18} style={{ color: "var(--green)" }} />
                <div>
                  <small style={{ display: "block", color: "var(--muted)" }}>Fecha de Envío</small>
                  <strong>{formatDate(selectedContact.createdAt)}</strong>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px", alignItems: "center" }}>
                <User size={18} style={{ color: "var(--green)" }} />
                <div>
                  <small style={{ display: "block", color: "var(--muted)" }}>Nombre del Remitente</small>
                  <strong>{selectedContact.name}</strong>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px", alignItems: "center" }}>
                <Mail size={18} style={{ color: "var(--green)" }} />
                <div>
                  <small style={{ display: "block", color: "var(--muted)" }}>Correo Electrónico</small>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    style={{ color: "var(--green-mid)", textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {selectedContact.email}
                  </a>
                </div>
              </div>

              {(selectedContact.company || selectedContact.country) && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {selectedContact.company && (
                    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px", alignItems: "center" }}>
                      <Building size={18} style={{ color: "var(--green)" }} />
                      <div>
                        <small style={{ display: "block", color: "var(--muted)" }}>Empresa</small>
                        <strong>{selectedContact.company}</strong>
                      </div>
                    </div>
                  )}
                  {selectedContact.country && (
                    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px", alignItems: "center" }}>
                      <Globe size={18} style={{ color: "var(--green)" }} />
                      <div>
                        <small style={{ display: "block", color: "var(--muted)" }}>País</small>
                        <strong>{selectedContact.country}</strong>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "8px 0" }} />

              <div>
                <small style={{ display: "block", color: "var(--muted)", marginBottom: "6px" }}>Mensaje</small>
                <div
                  style={{
                    background: "var(--soft)",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.5",
                    fontSize: "15px",
                    maxHeight: "250px",
                    overflowY: "auto",
                  }}
                >
                  {selectedContact.message}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
