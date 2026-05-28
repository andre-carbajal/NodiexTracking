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
      <header className="simple-public-header" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '20px', marginBottom: '40px' }}>
        <Link className="brand-logo" href="/">
          <strong>NODIEX</strong>
          <span>DEL PERU</span>
          <small>Agroexportacion con calidad y confianza</small>
        </Link>
        <Link className="button-outline-green" href="/productos"><ArrowLeft size={18} />Catalogo</Link>
      </header>
      <section className="product-detail" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="product-detail-media" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
          <Image unoptimized src={product.imageUrl || fallbackImage} alt={product.name} width={920} height={520} style={{ display: 'block', width: '100%', height: 'auto' }} />
        </div>
        <div className="product-detail-info" style={{ paddingTop: '20px' }}>
          <p className="eyebrow" style={{ color: 'var(--green-dark)', fontWeight: 'bold' }}>PRODUCTO PUBLICADO</p>
          <h1 style={{ fontSize: '54px', color: 'var(--green-dark)', marginTop: '8px', marginBottom: '24px', lineHeight: '1.1' }}>{product.name}</h1>
          <p style={{ fontSize: '18px', color: 'var(--charcoal)', lineHeight: '1.6', marginBottom: '32px' }}>{product.description}</p>
          <a className="button-lima" href={`/api/public/productos/${product.id}/ficha`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Download size={18} />Descargar ficha tecnica</a>
        </div>
        <div className="product-detail-table" style={{ gridColumn: '1 / -1', marginTop: '40px', background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Presentaciones y precios</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                <th style={{ padding: '12px 0', color: 'var(--ink)' }}>Unidad logistica</th>
                <th style={{ padding: '12px 0', color: 'var(--ink)' }}>Precios disponibles</th>
              </tr>
            </thead>
            <tbody>
              {product.presentations.map((presentation) => (
                <tr key={presentation.id || presentation.unit} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '16px 0', fontWeight: 'bold', color: 'var(--charcoal)' }}>{presentation.unit}</td>
                  <td style={{ padding: '16px 0', color: 'var(--charcoal)' }}>{priceText(presentation.prices)}</td>
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
