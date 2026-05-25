"use client";

import { ShieldCheck, PackageSearch, Headphones } from "lucide-react";

export default function SupportGrid() {
  return (
    <section className="support-grid">
      <article><ShieldCheck size={42} /><strong>Codigo seguro</strong><span>Codigos opacos y no secuenciales para cada despacho.</span></article>
      <article><PackageSearch size={42} /><strong>Actualizacion en tiempo real</strong><span>Informacion logistica visible para compradores internacionales.</span></article>
      <article><Headphones size={42} /><strong>Soporte internacional</strong><span>Atencion comercial preparada para mercados externos.</span></article>
    </section>
  );
}
