"use client";

import {
  Award,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Download,
  Headphones,
  Home,
  Leaf,
  LockKeyhole,
  Mail,
  MapPin,
  PackageSearch,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Ship,
  Truck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { copy, languages } from "@/lib/i18n";

const productImages = [
  "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80"
];

function fmtDate(value) {
  return new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

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
      setTrackingError(t.invalidTracking);
      return;
    }
    setTracking(json.shipment);
  }

  const selectedProduct = publicData.products[0];

  return (
    <main className="public-site">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand-logo" href="#top" aria-label="NODIEX inicio">
            <strong>NODIEX</strong>
            <span>DEL PERU</span>
            <small>Agroexportacion con calidad y confianza</small>
          </a>
          <div className="header-actions">
            <div className="language-switch" aria-label="Selector de idioma">
              {languages.map((item) => (
                <button className={lang === item.code ? "active" : ""} key={item.code} onClick={() => setLang(item.code)}>
                  {item.label}
                </button>
              ))}
            </div>
            <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="main-menu">
              <span />
              Menu
            </button>
          </div>
        </div>
        <nav className={`main-nav ${menuOpen ? "open" : ""}`} id="main-menu">
          <a href="#top" onClick={() => setMenuOpen(false)}><Home size={16} />Inicio</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Empresa</a>
          <a href="#catalog" onClick={() => setMenuOpen(false)}>{t.nav.catalog}</a>
          <a href="#tracking" onClick={() => setMenuOpen(false)}>{t.nav.tracking}</a>
          <a href="#certificates" onClick={() => setMenuOpen(false)}>{t.nav.certificates}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
        </nav>
      </header>

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

        <form className="tracking-widget" id="tracking" onSubmit={submitTracking}>
          <div className="widget-title">
            <span><PackageSearch size={23} /></span>
            <div>
              <strong>Order Tracking</strong>
              <small>Consulta publica y segura</small>
            </div>
          </div>
          <label>
            Ingrese su codigo de seguimiento
            <div className="tracking-input-row">
              <input value={trackingCode} onChange={(event) => setTrackingCode(event.target.value)} placeholder={t.trackingPlaceholder} />
              <button className="icon-button" disabled={loading} aria-label="Consultar tracking"><Search size={22} /></button>
            </div>
          </label>
          <div className="mini-status">
            <span className="complete"><ClipboardCheck size={18} />Registrado</span>
            <span className="active"><Truck size={18} />En transito</span>
            <span><CheckCircle2 size={18} />Entregado</span>
          </div>
          {trackingError && <p className="form-error">{trackingError}</p>}
        </form>
      </section>

      {tracking && (
        <section className="tracking-summary">
          <div className="summary-main">
            <p className="eyebrow">Resumen del pedido</p>
            <span>Codigo de seguimiento</span>
            <h2>{tracking.code}</h2>
            <div className="shipment-facts">
              <div><Leaf size={26} /><span>Producto</span><strong>{tracking.product}</strong></div>
              <div><Ship size={26} /><span>Estado</span><strong>{tracking.currentStatus}</strong></div>
              <div><MapPin size={26} /><span>Destino</span><strong>{tracking.destination}</strong></div>
            </div>
            <ol className="timeline">
              {tracking.history.map((item) => (
                <li className={item.status === tracking.currentStatus ? "current" : ""} key={`${item.status}-${item.at}`}>
                  <strong>{item.status}</strong>
                  <span>{fmtDate(item.at)}</span>
                </li>
              ))}
            </ol>
            <p className="route-note"><Truck size={20} />Tu despacho se encuentra actualizado en la plataforma de trazabilidad NODIEX.</p>
          </div>
          <aside className="summary-side">
            <h3>Detalles logisticos</h3>
            <p><MapPin size={18} />Ubicacion actual<br /><strong>{tracking.destination}</strong></p>
            <p><ClipboardCheck size={18} />Ultima actualizacion<br /><strong>{fmtDate(tracking.updatedAt)}</strong></p>
            <span className="status-pill">{tracking.currentStatus}</span>
          </aside>
        </section>
      )}

      <section className="about-band" id="about">
        <div>
          <p className="eyebrow">Bienvenidos a NODIEX DEL PERU S.A.C.</p>
          <h2>Confianza exportadora, informacion verificable</h2>
          <p>{t.trustBody}</p>
          <a className="outline-link" href="#contact">Conoce mas sobre nosotros <ChevronRight size={16} /></a>
        </div>
        <Image alt="Control de calidad agroexportador" src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80" width={420} height={220} />
        <Image alt="Hierbas aromaticas y especias" src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80" width={420} height={220} />
      </section>

      <section className="catalog-section" id="catalog">
        <div className="section-heading catalog-heading">
          <div>
            <p className="eyebrow">Catalogo de productos</p>
            <h2>{t.catalogTitle}</h2>
            {hasFallback && <p className="fallback-note">{t.fallback}</p>}
          </div>
          <div className="filter-bar">
            <div><Search size={18} />Buscar producto</div>
            <button>Todos</button>
            <span>Hierbas aromaticas</span>
            <span>Especias</span>
          </div>
        </div>

        <div className="catalog-layout">
          <div className="catalog-grid">
            {publicData.products.map((product, index) => (
              <article className="catalog-card" key={product.id}>
                <Image alt={product.name} src={productImages[index % productImages.length]} width={520} height={260} />
                <span className="category-pill">Exportacion</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="presentation-list">
                  {product.presentations.map((presentation) => (
                    <div key={presentation.unit}>
                      <strong>{presentation.unit}</strong>
                      <span>{Object.entries(presentation.prices).map(([currency, price]) => `${currency} ${price.toLocaleString("es-PE")}`).join(" / ")}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {selectedProduct && (
            <aside className="commercial-sheet">
              <span className="category-pill">Ficha comercial</span>
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <table>
                <thead>
                  <tr><th>Unidad</th><th>Monedas</th></tr>
                </thead>
                <tbody>
                  {selectedProduct.presentations.map((item) => (
                    <tr key={item.unit}>
                      <td>{item.unit}</td>
                      <td>{Object.keys(item.prices).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p><CheckCircle2 size={18} />Estado publicado</p>
              <p><Award size={18} />Respaldo SENASA / ISO</p>
              <button className="download-button"><Download size={18} />Descargar ficha tecnica</button>
            </aside>
          )}
        </div>
      </section>

      <section className="certificate-strip" id="certificates">
        <div>
          <strong>Certificaciones que respaldan nuestra calidad</strong>
          <span>Productos respaldados por estandares internacionales</span>
        </div>
        {publicData.certificates.map((certificate) => (
          <article key={certificate.id}>
            <strong>{certificate.type}</strong>
            <span>Vigente hasta {certificate.validUntil}</span>
          </article>
        ))}
        <p><ShieldCheck size={28} />Inocuidad, calidad y seguridad en la cadena de suministro.</p>
      </section>

      <section className="support-grid">
        <article><ShieldCheck size={42} /><strong>Codigo seguro</strong><span>Codigos opacos y no secuenciales para cada despacho.</span></article>
        <article><PackageSearch size={42} /><strong>Actualizacion en tiempo real</strong><span>Informacion logistica visible para compradores internacionales.</span></article>
        <article><Headphones size={42} /><strong>Soporte internacional</strong><span>Atencion comercial preparada para mercados externos.</span></article>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Comercial</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
        </div>
        <form className="contact-form">
          <input placeholder="Nombre" />
          <input placeholder="Empresa" />
          <input placeholder="Correo" type="email" />
          <input placeholder="Pais" />
          <textarea placeholder="Mensaje / interes comercial" rows={4} />
          <button className="button primary" type="button"><Send size={18} />Enviar solicitud</button>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <strong>NODIEX</strong>
            <span>DEL PERU</span>
            <small>Agroexportacion con calidad y confianza</small>
          </div>
          <div>
            <h3>Contacto</h3>
            <p><MapPin size={16} />Parque Industrial, Tacna - Peru</p>
            <p><Mail size={16} />comercial@nodiex.com.pe</p>
            <p><Phone size={16} />+51 952 341 231</p>
          </div>
          <div>
            <h3>Acceso seguro</h3>
            <p>Ingreso exclusivo para usuarios autorizados.</p>
            <Link className="admin-access" href="/admin"><LockKeyhole size={16} />Ingresar al Administrador</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
