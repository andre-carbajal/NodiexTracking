"use client";

import { ShieldCheck } from "lucide-react";

export default function CertificatesStrip({ publicData }) {
  return (
    <section className="certificate-strip" id="certificates">
      <div>
        <strong>Certificaciones que respaldan nuestra calidad</strong>
        <span>Productos respaldados por estandares internacionales</span>
      </div>
      {publicData.certificates.map((certificate) => (
        <article key={certificate.id}>
          <strong>{certificate.type}</strong>
          <span>Vigente hasta {certificate.validUntil}</span>
        </article>
      ))}
      <p><ShieldCheck size={28} />Inocuidad, calidad y seguridad en la cadena de suministro.</p>
    </section>
  );
}
