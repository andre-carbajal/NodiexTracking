import Footer from "@/components/Footer";
import { getVisibleCertificates } from "@/lib/store";
import Image from "next/image";

export const metadata = {
  title: "Certificaciones | NODIEX",
  description: "Conoce las certificaciones de calidad que respaldan nuestros productos y operaciones internacionales."
};

export const dynamic = "force-dynamic";

export default async function CertificacionesPage() {
  const certificates = await getVisibleCertificates();

  return (
    <main className="public-site">
      <section className="products-hero-dark">
        <div className="hero-content">
          <h1>Calidad que Exportamos al <br /><span className="cursive-light">Mundo.</span></h1>
          <p className="hero-desc">Nuestros productos agroindustriales cumplen con las normas más exigentes del mercado internacional. Contamos con certificaciones de primer nivel que avalan la inocuidad, trazabilidad y excelencia de cada envío de NODIEX.</p>
        </div>
      </section>

      <section className="certificaciones-interleaved-container">
        {certificates.length > 0 ? (
          certificates.map((cert) => (
            <article className="cert-row-interleaved" key={cert.id}>
              <div className="cert-row-image">
                {cert.imageUrl ? (
                  <Image 
                    unoptimized 
                    src={cert.imageUrl} 
                    alt={cert.type} 
                    fill 
                    style={{ objectFit: "contain", padding: "20px" }} 
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "#f0f0f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
                    Sin logo
                  </div>
                )}
              </div>
              <div className="cert-row-content">
                <h2 className="cert-row-title">{cert.type}</h2>
                <span className="cert-row-date">Vigente hasta: {cert.validUntil}</span>
                <p className="cert-row-desc">
                  Esta certificación garantiza que nuestros procesos operativos y de suministro para <strong>{cert.type}</strong> cumplen con los estándares y exigencias internacionales, asegurando la máxima calidad para nuestros clientes globales.
                </p>
                {cert.evidence && (
                  <a href={cert.evidence} target="_blank" rel="noopener noreferrer" className="button-lima">
                    Ver Documento Oficial ↗
                  </a>
                )}
              </div>
            </article>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%", padding: "40px", color: "#666" }}>
            No hay certificaciones publicadas en este momento.
          </p>
        )}
      </section>
      <Footer />
    </main>
  );
}
