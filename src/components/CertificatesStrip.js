"use client";

import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function CertificatesStrip({ publicData }) {
  return (
    <section className="certificate-strip" id="certificates">
      <div>
        <strong>Certificaciones que respaldan nuestra calidad</strong>
        <span>Productos respaldados por estandares internacionales</span>
      </div>
      {publicData.certificates.map((certificate) => (
        <article key={certificate.id}>
          {certificate.imageUrl && <Image unoptimized src={certificate.imageUrl} alt={certificate.type} width={220} height={70} />}
          <strong>{certificate.type}</strong>
          <span>Vigente hasta {certificate.validUntil}</span>
        </article>
      ))}
      <p><ShieldCheck size={28} />Inocuidad, calidad y seguridad en la cadena de suministro.</p>
    </section>
  );
}
