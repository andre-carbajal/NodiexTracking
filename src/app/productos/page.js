import Link from "next/link";
import Footer from "@/components/Footer";
import ProductCatalogBrowser from "@/components/ProductCatalogBrowser";
import { getVisibleProducts } from "@/lib/store";

export const metadata = {
  title: "Productos | NODIEX",
  description: "Catalogo publico de productos exportables de NODIEX con presentaciones logisticas, precios y fichas tecnicas."
};

export const dynamic = "force-dynamic";

export default async function ProductosPage() {
  const products = await getVisibleProducts("es");

  return (
    <main className="public-site">
      <header className="simple-public-header">
        <Link className="brand-logo" href="/">
          <strong>NODIEX</strong>
          <span>DEL PERU</span>
          <small>Agroexportacion con calidad y confianza</small>
        </Link>
        <Link className="button secondary" href="/">Volver al portal</Link>
      </header>
      
      <section className="products-hero-dark">
        <div className="hero-content">
          <p className="eyebrow-light"><span className="circle-icon">🌿</span> Productos de calidad premium</p>
          <h1>Nuestros<br/><span className="cursive-light">Productos.</span></h1>
          <p className="hero-desc">Exportamos orégano, especias y hierbas aromáticas con los más altos estándares de calidad. Cultivados, seleccionados y procesados para llevar lo mejor del Perú al mundo.</p>
        </div>
        <div className="hero-features">
          <div className="feature">
            <span className="feature-icon">🍃</span>
            <strong>100% Naturales</strong>
            <p>Sin aditivos ni conservantes</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🛡️</span>
            <strong>Calidad Premium</strong>
            <p>Estándares internacionales</p>
          </div>
          <div className="feature">
            <span className="feature-icon">✈️</span>
            <strong>Exportación Global</strong>
            <p>Envíos seguros y confiables</p>
          </div>
        </div>
      </section>

      <ProductCatalogBrowser products={products} />
      <Footer />
    </main>
  );
}
