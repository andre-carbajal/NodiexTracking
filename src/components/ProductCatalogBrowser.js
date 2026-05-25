"use client";

import { Download, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import EmptyState from "@/components/EmptyState";

const productImages = [
  "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80"
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
            <article className="catalog-card product-card-large" key={product.id}>
              <Image unoptimized alt={product.name} src={product.imageUrl || productImages[index % productImages.length]} width={720} height={360} />
              <span className="status-pill">Publicado</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="presentation-list">
                {product.presentations.map((presentation) => (
                  <div key={presentation.id || presentation.unit}>
                    <strong>{presentation.unit}</strong>
                    <span>{priceText(presentation.prices)}</span>
                  </div>
                ))}
              </div>
              <div className="catalog-card-actions">
                <Link className="download-button" href={`/productos/${product.id}`}>Ver detalle</Link>
                <a className="download-button" href={`/api/public/productos/${product.id}/ficha`}><Download size={16} />Ficha tecnica</a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
