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
      <section className="products-hero-dark">
        <div className="hero-content">
          <p className="eyebrow-light"><span className="circle-icon">🌿</span> Productos de calidad premium</p>
          <h1>Nuestros<br /><span className="cursive-light">Productos.</span></h1>
          <p className="hero-desc">Exportamos orégano, especias y hierbas aromáticas con los más altos estándares de calidad. Cultivados, seleccionados y procesados para llevar lo mejor del Perú al mundo.</p>
        </div>

      </section>

      <ProductCatalogBrowser products={products} />
      <Footer />
    </main>
  );
}
