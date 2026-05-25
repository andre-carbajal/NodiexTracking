"use client";

import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import EmptyState from "@/components/EmptyState";

function productStatus(item) {
  if (!item.active) return "Retirado";
  if (item.published) return "Publicado";
  if (item.completeness?.complete) return "Completo no publicado";
  return "Borrador";
}

export default function ProductosList({ products = [], onEdit, onDelete, onToggle }) {
  if (products.length === 0) {
    return <EmptyState title="Sin productos" description="Crea el primer producto con el formulario de arriba." />;
  }

  return (
    <div className="data-table">
      {products.map((item) => (
        <div className="data-row admin-list-row" key={item.id}>
          <strong className="list-title">
            {item.imageUrl && <Image unoptimized src={item.imageUrl} alt="" width={42} height={42} />}
            {item.name}
          </strong>
          <span>{item.description?.slice(0, 60)}{item.description?.length > 60 ? "..." : ""}</span>
          <span>{item.presentations?.map((p) => {
            const price = Object.entries(p.prices || {})[0];
            return price ? `${p.unit} · ${price[0]} ${price[1]}` : p.unit;
          }).join(", ")}</span>
          <span className={`status-pill ${item.published ? "published" : item.completeness?.complete ? "complete" : "draft"}`}>
            {productStatus(item)}
          </span>
          <div className="row-actions">
            <button className="ghost-button small" onClick={() => onEdit(item)} title="Editar producto">
              <Pencil size={14} />
            </button>
            <button className="ghost-button small" onClick={() => onToggle(item)} title={item.published ? "Ocultar producto" : "Publicar producto"}>
              {item.published ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button className="ghost-button small danger" onClick={() => onDelete(item)} title="Eliminar producto">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
