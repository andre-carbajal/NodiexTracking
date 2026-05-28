"use client";

import { ArrowUpRight } from "lucide-react";

export default function Hero({ t }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <h1>
          Tradición familiar, 
          <span className="cursive-green">calidad global.</span>
        </h1>
        <p>
          Somos una empresa familiar dedicada a la producción y comercialización de productos agrícolas de primera calidad, desde el cultivo hasta la distribución.
        </p>
        <div className="hero-actions">
          <a className="button-lima" href="#about" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', fontSize: '16px' }}>
            Nuestra Empresa <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
