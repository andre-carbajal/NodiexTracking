"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function CertificatesStrip({ publicData, t = {} }) {
  return (
    <section className="certificate-strip-modern" id="certificates">
      <div className="certificates-header">
        <h2 className="certificates-title">{t.stripTitle || "Certificaciones que Respaldan Nuestra Calidad"}</h2>
        <p className="certificates-subtitle">{t.stripSubtitle || "Inocuidad, calidad y seguridad en la cadena de suministro internacional."}</p>
      </div>
      
      <motion.div 
        className="certificates-logos"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {publicData.certificates.map((certificate) => (
          <motion.div variants={itemVariants} key={certificate.id}>
            <Link href="/empresa/certificaciones" className="certificate-logo-link">
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
