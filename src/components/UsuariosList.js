"use client";

import { useState } from "react";
import EmptyState from "@/components/EmptyState";

export default function UsuariosList({ usuarios = [] }) {
  if (usuarios.length === 0) {
    return <EmptyState title="Sin usuarios" description="No hay usuarios registrados en el sistema." />;
  }

  return (
    <div className="data-table">
      {usuarios.map((u) => (
        <div className="data-row" key={u.id}>
          <strong>{u.username}</strong>
          <span>{u.roles?.join(", ") || u.role || "Sin rol"}</span>
          <span className="status-pill">{u.estado || "activo"}</span>
        </div>
      ))}
    </div>
  );
}
