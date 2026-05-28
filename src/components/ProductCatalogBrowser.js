"use client";

import { Download, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import EmptyState from "@/components/EmptyState";

const productImages = [
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=900&q=80"
];

function priceText(prices) {
  return Object.entries(prices || {})
    .map(([currency, price]) => `${currency} ${Number(price).toLocaleString("es-PE")}`)
    .join(" / ");
}

function normalizeSearch(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function ProductCatalogBrowser({ products = [] }) {
  const [search, setSearch] = useState("");
  const filteredProducts = useMemo(() => {
    const query = normalizeSearch(search.trim());
    if (!query) return products;
    return products.filter((product) => normalizeSearch(product.name).includes(query));
  }, [products, search]);

  return (
    <section className="products-page">
      <div style={{ textAlign: 'left', marginBottom: '40px' }}>
        <p className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--green)', display: 'inline-block' }}></span>
          Catálogo de productos
        </p>
        <h2 style={{ fontSize: '42px', marginTop: '12px', color: 'var(--ink)' }}>
          Origen Peruano, <br/>
          <span className="cursive-green" style={{ fontSize: '56px' }}>Calidad</span> que el mundo valora.
        </h2>
        <p style={{ maxWidth: '600px', fontSize: '16px', color: 'var(--charcoal)', marginTop: '16px' }}>
          Conoce nuestra selección de productos naturales, cultivados y procesados con dedicación para ofrecerte lo mejor de nuestra tierra.
        </p>
      </div>

      <div className="products-toolbar">
        <label>
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar producto"
            aria-label="Buscar producto"
          />
        </label>
        <span>{filteredProducts.length} productos publicados</span>
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState title="Sin productos" description="No hay productos publicados que coincidan con la busqueda." />
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <article className="catalog-card" key={product.id}>
              <Image unoptimized alt={product.name} src={product.imageUrl || productImages[index % productImages.length]} width={720} height={360} />
              <span className="status-pill" style={{ background: 'var(--green-lima)', color: '#111', fontWeight: 'bold' }}>Publicado</span>
              <h3>{product.name}</h3>
              <p style={{ fontSize: '14px', color: 'var(--charcoal)', marginBottom: '16px', minHeight: '60px' }}>{product.description}</p>
              
              <div className="presentation-list" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.presentations.map((presentation) => (
                  <div key={presentation.id || presentation.unit} style={{ background: '#f5faec', padding: '8px 12px', borderRadius: '8px', flex: '1', minWidth: '120px' }}>
                    <strong style={{ display: 'block', fontSize: '12px', color: 'var(--green-dark)' }}>{presentation.unit}</strong>
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>{priceText(presentation.prices)}</span>
                  </div>
                ))}
              </div>

              <div className="catalog-card-actions">
                <Link className="button-outline-green" href={`/productos/${product.id}`}>Ver detalle</Link>
                <a className="button-outline-green" href={`/api/public/productos/${product.id}/ficha`}><Download size={16} />Ficha</a>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="contact-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '50%' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green-lima)" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </span>
          <div>
            <h3>¿Buscas un producto específico o presentación especial?</h3>
            <p>Trabajamos contigo para ofrecer soluciones a la medida de tu negocio.</p>
          </div>
        </div>
        <Link href="/#contact" className="button-lima">Contáctanos ↗</Link>
      </div>
    </section>
  );
}
