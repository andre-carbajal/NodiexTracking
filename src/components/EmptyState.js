"use client";

import { PackageSearch } from "lucide-react";

export default function EmptyState({ icon: Icon = PackageSearch, title = "Sin resultados", description = "No hay datos disponibles para mostrar." }) {
  return (
    <div className="empty-state">
      <Icon size={48} strokeWidth={1.5} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
