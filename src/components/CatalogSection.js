"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function CatalogSection({ t, publicData }) {
  const products = publicData.products.slice(0, 4);

  return (
    <section className="catalog-section" id="catalog">
      <motion.div 
        className="catalog-grid-v"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* Elemento 1: Imagen Extremo Izquierdo (Alta) */}
        {products[0] && (
          <motion.div variants={itemVariants} className="card-left">
            <Link href={`/productos/${products[0].id}`} className="gallery-item-card" style={{ display: 'block', height: '100%' }}>
              <div className="gallery-image-wrap">
                <Image unoptimized alt={products[0].name} src={products[0].imageUrl} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="gallery-floating-card">
                <h3>{products[0].name}</h3>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Elemento 2: Bloque de Texto Central (Ubicado entre Col 2 y 3, Fila 1) */}
        <motion.div variants={itemVariants} className="catalog-header-v">
          <span className="catalog-subtitle">■ Del Campo al Mundo</span>
          <h2 className="catalog-title-main">Descubre el Arte de la Exportación a través de nuestros Productos</h2>
          <p className="catalog-desc-main">Ofrecemos productos orgánicos de la más alta calidad, seleccionados bajo estrictos estándares internacionales para garantizar el mejor sabor en cada envío.</p>
          <div className="catalog-cta-wrapper">
            <Link href="/productos" className="button-lima">
              Ver Productos
            </Link>
          </div>
        </motion.div>

        {/* Elemento 3: Imagen Centro Izquierda (Baja) */}
        {products[1] && (
          <motion.div variants={itemVariants} className="card-center-left">
            <Link href={`/productos/${products[1].id}`} className="gallery-item-card" style={{ display: 'block', height: '100%' }}>
              <div className="gallery-image-wrap">
                <Image unoptimized alt={products[1].name} src={products[1].imageUrl} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="gallery-floating-card">
                <h3>{products[1].name}</h3>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Elemento 4: Imagen Centro Derecha (Baja) */}
        {products[2] && (
          <motion.div variants={itemVariants} className="card-center-right">
            <Link href={`/productos/${products[2].id}`} className="gallery-item-card" style={{ display: 'block', height: '100%' }}>
              <div className="gallery-image-wrap">
                <Image unoptimized alt={products[2].name} src={products[2].imageUrl} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="gallery-floating-card">
                <h3>{products[2].name}</h3>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Elemento 5: Imagen Extremo Derecho (Alta) */}
        {products[3] && (
          <motion.div variants={itemVariants} className="card-right">
            <Link href={`/productos/${products[3].id}`} className="gallery-item-card" style={{ display: 'block', height: '100%' }}>
              <div className="gallery-image-wrap">
                <Image unoptimized alt={products[3].name} src={products[3].imageUrl} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="gallery-floating-card">
                <h3>{products[3].name}</h3>
              </div>
            </Link>
          </motion.div>
        )}

      </motion.div>
    </section>
  );
}
