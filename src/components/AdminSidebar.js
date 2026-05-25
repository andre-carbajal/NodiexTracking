"use client";

import Link from "next/link";

export default function AdminSidebar({ user, onLogout }) {
  return (
    <aside className="admin-sidebar">
      <Link className="brand" href="/"><span>N</span><strong>NODIEX</strong></Link>
      <nav>
        <a href="#dashboard">Dashboard</a>
        <a href="#shipments">Despachos</a>
        <a href="#catalog-admin">Catalogo</a>
        <a href="#cert-admin">Certificaciones</a>
        <a href="#audit">Auditoria</a>
      </nav>
      <button className="ghost-button" onClick={onLogout}>Cerrar sesion</button>
    </aside>
  );
}
