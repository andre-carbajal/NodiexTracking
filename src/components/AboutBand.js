"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function AboutBand({ t }) {
  return (
    <section className="about-band" id="about">
      <div>
        <p className="eyebrow">Bienvenidos a NODIEX DEL PERU S.A.C.</p>
        <h2>{t.trustTitle || "Confianza exportadora, informacion verificable"}</h2>
        <p>{t.trustBody}</p>
        <a className="outline-link" href="#contact">Conoce mas sobre nosotros <ChevronRight size={16} /></a>
      </div>
      <Image alt="Control de calidad agroexportador" src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80" width={420} height={220} />
      <Image alt="Hierbas aromaticas y especias" src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80" width={420} height={220} />
    </section>
  );
}
