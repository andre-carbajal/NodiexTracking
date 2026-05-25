import { ArrowLeft, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { getPublicProduct } from "@/lib/store";

const fallbackImage = "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1100&q=80";

export const dynamic = "force-dynamic";

function priceText(prices) {
  return Object.entries(prices || {})
    .map(([currency, price]) => `${currency} ${Number(price).toLocaleString("es-PE")}`)
    .join(" / ");
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getPublicProduct(id, "es");
  if (!product) {
    return {
      title: "Producto no encontrado | NODIEX"
    };
  }

  return {
    title: `${product.name} | NODIEX`,
    description: product.description
  };
}

export default async function ProductoDetallePage({ params }) {
  const { id } = await params;
  const product = await getPublicProduct(id, "es");
  if (!product) notFound();

  return (
    <main className="public-site">
      <header className="simple-public-header">
        <Link className="brand-logo" href="/">
          <strong>NODIEX</strong>
          <span>DEL PERU</span>
          <small>Agroexportacion con calidad y confianza</small>
        </Link>
        <Link className="button secondary" href="/productos"><ArrowLeft size={18} />Catalogo</Link>
      </header>
      <section className="product-detail">
        <div className="product-detail-media">
          <Image unoptimized src={product.imageUrl || fallbackImage} alt={product.name} width={920} height={520} />
        </div>
        <div className="product-detail-info">
          <p className="eyebrow">Producto publicado</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <a className="button primary" href={`/api/public/productos/${product.id}/ficha`}><Download size={18} />Descargar ficha tecnica</a>
        </div>
        <div className="product-detail-table">
          <h2>Presentaciones y precios</h2>
          <table>
            <thead>
              <tr>
                <th>Unidad logistica</th>
                <th>Precios disponibles</th>
              </tr>
            </thead>
            <tbody>
              {product.presentations.map((presentation) => (
                <tr key={presentation.id || presentation.unit}>
                  <td>{presentation.unit}</td>
                  <td>{priceText(presentation.prices)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </main>
  );
}
