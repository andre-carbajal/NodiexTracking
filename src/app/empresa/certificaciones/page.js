import Footer from "@/components/Footer";
import { getVisibleCertificates } from "@/lib/store";
import Image from "next/image";
import { cookies } from "next/headers";
import { copy } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("nodiex_lang")?.value || "es";
  const t = copy[lang] || copy["es"];
  return {
    title: `${t.nav.certificates || "Certificaciones"} | NODIEX`,
    description: t.certHeroDesc || "Conoce las certificaciones de calidad de NODIEX."
  };
}

export default async function CertificacionesPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("nodiex_lang")?.value || "es";
  const t = copy[lang] || copy["es"];
  const certificates = await getVisibleCertificates();

  return (
    <main className="public-site">
      <section className="products-hero-dark">
        <div className="hero-content">
          <h1>{t.certHeroTitle || "Calidad que Exportamos al"}<br /><span className="cursive-light">{t.certHeroSubtitle || "Mundo."}</span></h1>
          <p className="hero-desc">{t.certHeroDesc || "Nuestros productos agroindustriales cumplen con las normas más exigentes del mercado internacional. Contamos con certificaciones de primer nivel que avalan la inocuidad, trazabilidad y excelencia de cada envío de NODIEX."}</p>
        </div>
      </section>

      <section className="certificaciones-interleaved-container">
        {certificates.length > 0 ? (
          certificates.map((cert) => {
            const descPattern = t.certProcessDesc || "Esta certificación garantiza que nuestros procesos operativos y de suministro para {type} cumplen con los estándares y exigencias internacionales, asegurando la máxima calidad para nuestros clientes globales.";
            const descParts = descPattern.split("{type}");

            return (
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
                  <span className="cert-row-date">{t.validUntil || "Vigente hasta:"} {cert.validUntil}</span>
                  <p className="cert-row-desc">
                    {descParts[0]}<strong>{cert.type}</strong>{descParts[1]}
                  </p>
                  {cert.evidence && (
                    <a href={cert.evidence} target="_blank" rel="noopener noreferrer" className="button-lima">
                      {t.viewDocument || "Ver Documento Oficial ↗"}
                    </a>
                  )}
                </div>
              </article>
            );
          })
        ) : (
          <p style={{ textAlign: "center", width: "100%", padding: "40px", color: "#666" }}>
            {t.noCertificates || "No hay certificaciones publicadas en este momento."}
          </p>
        )}
      </section>
      <Footer />
    </main>
  );
}
