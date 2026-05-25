"use client";

import EmptyState from "@/components/EmptyState";

export default function ProductosList({ products = [] }) {
  if (products.length === 0) {
    return <EmptyState title="Sin productos" description="Crea el primer producto con el formulario de arriba." />;
  }

  return (
    <div className="data-table">
      {products.map((item) => (
        <div className="data-row" key={item.id}>
          <strong>{item.name}</strong>
          <span>{item.description?.slice(0, 60)}{item.description?.length > 60 ? "..." : ""}</span>
          <span>{item.presentations?.map((p) => p.unit).join(", ")}</span>
          <span className="status-pill">{item.published ? "Publicado" : "Borrador"}</span>
        </div>
      ))}
    </div>
  );
}
