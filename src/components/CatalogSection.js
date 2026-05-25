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
          <Link href="/productos">Ver pagina completa</Link>
        </div>
      </div>

      <div className="catalog-layout">
        <div className="catalog-grid">
          {filteredProducts.map((product, index) => (
            <article className="catalog-card" key={product.id}>
              <Image unoptimized alt={product.name} src={product.imageUrl || productImages[index % productImages.length]} width={520} height={260} />
              <span className="status-pill">Publicado</span>
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
              <div className="catalog-card-actions">
                <Link className="download-button" href={`/productos/${product.id}`}>Ver detalle</Link>
                <a className="download-button" href={`/api/public/productos/${product.id}/ficha`}><Download size={16} />Ficha</a>
              </div>
            </article>
          ))}
        </div>

        {selectedProduct && (
          <aside className="commercial-sheet">
            <span className="status-pill">Ficha comercial</span>
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
            <a className="download-button" href={`/api/public/productos/${selectedProduct.id}/ficha`}><Download size={18} />Descargar ficha tecnica</a>
          </aside>
        )}
      </div>
    </section>
  );
}
