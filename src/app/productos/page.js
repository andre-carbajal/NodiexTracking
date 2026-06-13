import Footer from "@/components/Footer";
import ProductCatalogBrowser from "@/components/ProductCatalogBrowser";
import { getVisibleProducts } from "@/lib/store";
import { cookies } from "next/headers";
import { copy } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("nodiex_lang")?.value || "es";
  const t = copy[lang] || copy["es"];
  return {
    title: `${t.nav.catalog || "Productos"} | NODIEX`,
    description: t.catalogHeroDesc || "Catalogo publico de productos de NODIEX."
  };
}

export default async function ProductosPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("nodiex_lang")?.value || "es";
  const products = await getVisibleProducts(lang);
  const t = copy[lang] || copy["es"];

  return (
    <main className="public-site">
      <section className="products-hero-dark">
        <div className="hero-content">
          <h1>{t.catalogHeroTitle || "Nuestros"}<br /><span className="cursive-green">{t.catalogHeroSubtitle || "Productos."}</span></h1>
          <p className="hero-desc">{t.catalogHeroDesc || "Exportamos orégano, especias y hierbas aromáticas con los más altos estándares de calidad. Cultivados, seleccionados y procesados para llevar lo mejor del Perú al mundo."}</p>
        </div>
      </section>

      <ProductCatalogBrowser products={products} />
      <Footer />
    </main>
  );
}
