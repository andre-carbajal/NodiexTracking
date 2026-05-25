"use client";

import { Award, CheckCircle2, Download, Search } from "lucide-react";
import Image from "next/image";

const productImages = [
  "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80"
];

export default function CatalogSection({ t, publicData, hasFallback }) {
  const selectedProduct = publicData.products[0];

  return (
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
              <Image unoptimized alt={product.name} src={product.imageUrl || productImages[index % productImages.length]} width={520} height={260} />
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
  );
}
