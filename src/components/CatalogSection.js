"use client";

import { Award, CheckCircle2, Download, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const productImages = [
  "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80"
];

function normalizeSearch(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function CatalogSection({ t, publicData, hasFallback }) {
  const [search, setSearch] = useState("");
  const filteredProducts = useMemo(() => {
    const query = normalizeSearch(search.trim());
    if (!query) return publicData.products;
    return publicData.products.filter((product) => normalizeSearch(product.name).includes(query));
  }, [publicData.products, search]);
  const selectedProduct = filteredProducts[0];

  return (
    <section className="catalog-section" id="catalog">
      <div className="section-heading catalog-heading">
        <div>
          <p className="eyebrow">Catalogo de productos</p>
          <h2>{t.catalogTitle}</h2>
          {hasFallback && <p className="fallback-note">{t.fallback}</p>}
        </div>
        <div className="filter-bar">
          <label>
            <Search size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar producto"
              aria-label="Buscar producto"
            />
          </label>
          <button type="button" onClick={() => setSearch("")}>Todos</button>
          <Link href="/productos" className="button-lima" style={{ color: 'var(--green-dark)', background: '#fff', border: '1px solid #dcebce' }}>Ver pagina completa</Link>
        </div>
      </div>

      <div className="catalog-grid-modern">
        {filteredProducts.slice(0, 3).map((product, index) => (
          <article className="product-card-modern" key={product.id}>
            <div className="card-image-wrap">
              <Image unoptimized alt={product.name} src={product.imageUrl || productImages[index % productImages.length]} fill style={{ objectFit: 'cover' }} />
            </div>
            
            <div className="card-content">
              <h3>{product.name}</h3>
              <p className="card-desc">{product.description}</p>
              
              <div className="card-actions-row">
                <Link className="button-lima full-width" href={`/productos/${product.id}`}>
                  Ver más información ↗
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
