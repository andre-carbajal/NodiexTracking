"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CatalogSection({ t, publicData }) {
  const products = publicData.products.slice(0, 4);

  return (
    <section className="catalog-section" id="catalog">
      <div className="catalog-grid-v">
        
        {/* Elemento 1: Imagen Extremo Izquierdo (Alta) */}
        {products[0] && (
          <Link href={`/productos/${products[0].id}`} className="gallery-item-card card-left">
            <div className="gallery-image-wrap">
              <Image unoptimized alt={products[0].name} src={products[0].imageUrl} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="gallery-floating-card">
              <h3>{products[0].name}</h3>
            </div>
          </Link>
        )}

        {/* Elemento 2: Bloque de Texto Central (Ubicado entre Col 2 y 3, Fila 1) */}
        <div className="catalog-header-v">
          <span className="catalog-subtitle">■ Del Campo al Mundo</span>
          <h2 className="catalog-title-main">Descubre el Arte de la Exportación a través de nuestros Productos</h2>
          <p className="catalog-desc-main">Ofrecemos productos orgánicos de la más alta calidad, seleccionados bajo estrictos estándares internacionales para garantizar el mejor sabor en cada envío.</p>
          <div className="catalog-cta-wrapper">
            <Link href="/productos" className="button-lima">
              Ver Productos
            </Link>
          </div>
        </div>

        {/* Elemento 3: Imagen Centro Izquierda (Baja) */}
        {products[1] && (
          <Link href={`/productos/${products[1].id}`} className="gallery-item-card card-center-left">
            <div className="gallery-image-wrap">
              <Image unoptimized alt={products[1].name} src={products[1].imageUrl} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="gallery-floating-card">
              <h3>{products[1].name}</h3>
            </div>
          </Link>
        )}

        {/* Elemento 4: Imagen Centro Derecha (Baja) */}
        {products[2] && (
          <Link href={`/productos/${products[2].id}`} className="gallery-item-card card-center-right">
            <div className="gallery-image-wrap">
              <Image unoptimized alt={products[2].name} src={products[2].imageUrl} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="gallery-floating-card">
              <h3>{products[2].name}</h3>
            </div>
          </Link>
        )}

        {/* Elemento 5: Imagen Extremo Derecho (Alta) */}
        {products[3] && (
          <Link href={`/productos/${products[3].id}`} className="gallery-item-card card-right">
            <div className="gallery-image-wrap">
              <Image unoptimized alt={products[3].name} src={products[3].imageUrl} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="gallery-floating-card">
              <h3>{products[3].name}</h3>
            </div>
          </Link>
        )}

      </div>
    </section>
  );
}
