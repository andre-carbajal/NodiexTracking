"use client";

import { ExternalLink, FileText, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function CertificatesStrip({ publicData }) {
  const certificates = publicData.certificates || [];

  return (
    <section className="certificate-strip" id="certificates">
      <div className="certificate-strip-heading">
        <p className="eyebrow">Certificaciones</p>
        <h2>Certificaciones que respaldan nuestra calidad</h2>
        <span>Productos respaldados por estandares internacionales</span>
      </div>
      <div className="certificate-grid">
        {certificates.map((certificate) => (
          <article className="certificate-card" key={certificate.id}>
            {certificate.imageUrl ? (
              <a className="certificate-media" href={certificate.imageUrl} target="_blank" rel="noreferrer" aria-label={`Abrir evidencia ${certificate.type}`}>
                <Image unoptimized src={certificate.imageUrl} alt={`Evidencia ${certificate.type}`} width={420} height={300} />
              </a>
            ) : (
              <div className="certificate-media empty">
                <FileText size={46} />
                <span>Archivo pendiente</span>
              </div>
            )}
            <div className="certificate-card-body">
              <strong>{certificate.type}</strong>
              <span>{certificate.evidence}</span>
              <small>Vigente hasta {certificate.validUntil}</small>
              {certificate.imageUrl && (
                <a className="certificate-link" href={certificate.imageUrl} target="_blank" rel="noreferrer">
                  <ExternalLink size={15} />Abrir evidencia
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="certificate-strip-note"><ShieldCheck size={28} />Inocuidad, calidad y seguridad en la cadena de suministro.</p>
    </section>
  );
}
