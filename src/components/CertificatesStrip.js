"use client";

import Image from "next/image";
import Link from "next/link";

export default function CertificatesStrip({ publicData }) {
  return (
    <section className="certificate-strip-modern" id="certificates">
      <div className="certificates-header">
        <h2 className="certificates-title">Certificaciones que Respaldan Nuestra Calidad</h2>
        <p className="certificates-subtitle">Inocuidad, calidad y seguridad en la cadena de suministro internacional.</p>
      </div>
      
      <div className="certificates-logos">
        {publicData.certificates.map((certificate) => (
          <Link href="/empresa/certificaciones" key={certificate.id} className="certificate-logo-link">
            {certificate.imageUrl && (
              <Image 
                unoptimized 
                src={certificate.imageUrl} 
                alt={certificate.type} 
                width={160} 
                height={80} 
                style={{ objectFit: "contain" }}
              />
            )}
            <span className="sr-only">{certificate.type}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
