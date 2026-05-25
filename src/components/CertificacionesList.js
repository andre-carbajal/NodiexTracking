"use client";

import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import EmptyState from "@/components/EmptyState";

export default function CertificacionesList({ certificates = [], onEdit, onDelete, onToggle }) {
  if (certificates.length === 0) {
    return <EmptyState title="Sin certificaciones" description="Registra la primera certificacion con el formulario de arriba." />;
  }

  return (
    <div className="data-table">
      {certificates.map((item) => (
        <div className="data-row admin-list-row" key={item.id}>
          <strong className="list-title">
            {item.imageUrl && <Image unoptimized src={item.imageUrl} alt="" width={42} height={42} />}
            {item.type}
          </strong>
          <span>Vence: {item.validUntil}</span>
          <span className="status-pill">{item.status}</span>
          <span className="status-pill">{item.published ? "Publicada" : "Oculta"}</span>
          <div className="row-actions">
            <button className="ghost-button small" onClick={() => onEdit(item)} title="Editar certificacion">
              <Pencil size={14} />
            </button>
            <button className="ghost-button small" onClick={() => onToggle(item)} title={item.published ? "Ocultar certificacion" : "Publicar certificacion"}>
              {item.published ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button className="ghost-button small danger" onClick={() => onDelete(item)} title="Eliminar certificacion">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
