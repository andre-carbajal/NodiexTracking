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
      <section className="products-hero">
        <p className="eyebrow">Catalogo publico</p>
        <h1>Productos exportables</h1>
        <p>Consulta productos publicados con sus presentaciones logisticas, precios multimoneda y ficha tecnica.</p>
      </section>
      <ProductCatalogBrowser products={products} />
      <Footer />
    </main>
  );
}
