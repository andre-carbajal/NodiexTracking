"use client";

import { useEffect, useMemo, useState } from "react";
import { copy, languages } from "@/lib/i18n";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrackingWidget from "@/components/TrackingWidget";
import TrackingResult from "@/components/TrackingResult";
import AboutBand from "@/components/AboutBand";
import CatalogSection from "@/components/CatalogSection";
import CertificatesStrip from "@/components/CertificatesStrip";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function HomePage() {
  const [lang, setLang] = useState("es");
  const [publicData, setPublicData] = useState({ products: [], certificates: [] });
  const [trackingCode, setTrackingCode] = useState("NDX-8Q4M-2026");
  const [tracking, setTracking] = useState(null);
  const [trackingError, setTrackingError] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];
  const hasFallback = useMemo(() => publicData.products.some((product) => product.fallback), [publicData.products]);

  useEffect(() => {
    fetch(`/api/public?lang=${lang}`)
      .then((res) => res.json())
      .then(setPublicData);
  }, [lang]);

  async function submitTracking(event) {
    event.preventDefault();
    setLoading(true);
    setTracking(null);
    setTrackingError("");
    const res = await fetch("/api/tracking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: trackingCode })
    });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) {
      setTrackingError(json.message || t.invalidTracking);
      return;
    }
    setTracking(json.shipment);
  }

  return (
    <ErrorBoundary>
      <main className="public-site">
        <Header lang={lang} setLang={setLang} menuOpen={menuOpen} setMenuOpen={setMenuOpen} languages={languages} t={t} />
        <Hero t={t} />
        <section id="tracking" style={{ width: 'min(1060px, calc(100% - 32px))', margin: '40px auto 0', padding: '20px' }}>
          <TrackingWidget
            t={t}
            trackingCode={trackingCode}
            setTrackingCode={setTrackingCode}
            loading={loading}
            trackingError={trackingError}
            submitTracking={submitTracking}
          />
        </section>
        <TrackingResult tracking={tracking} t={t} />
        <AboutBand t={t} />
        <CatalogSection t={t} publicData={publicData} hasFallback={hasFallback} />
        <CertificatesStrip publicData={publicData} />
        <ContactForm t={t} />
        <Footer />
      </main>
    </ErrorBoundary>
  );
}
