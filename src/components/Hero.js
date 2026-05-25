"use client";

import { Leaf, Search } from "lucide-react";
import TrackingWidget from "@/components/TrackingWidget";

export default function Hero({ t, trackingCode, setTrackingCode, loading, trackingError, submitTracking }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Tacna, Peru - mercados internacionales</p>
        <h1>Agroexportacion con trazabilidad digital</h1>
        <p>Productos certificados desde Tacna para compradores internacionales que necesitan informacion clara, estados logisticos y respaldo documental.</p>
        <div className="hero-actions">
          <a className="button primary" href="#tracking"><Search size={18} />Consultar tracking</a>
          <a className="button secondary" href="#catalog"><Leaf size={18} />Ver catalogo</a>
        </div>
      </div>

      <TrackingWidget
        t={t}
        trackingCode={trackingCode}
        setTrackingCode={setTrackingCode}
        loading={loading}
        trackingError={trackingError}
        submitTracking={submitTracking}
      />
    </section>
  );
}
