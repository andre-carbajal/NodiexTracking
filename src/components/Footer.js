"use client";

import { LockKeyhole, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import { copy } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useI18n();
  const t = copy[lang] || copy["es"];
  const f = t.footer || {};

  return (
    <motion.footer 
      className="site-footer-modern"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >

      {/* Nueva Franja de Información de Contacto */}

      <div className="footer-grid">
        {/* Brand Column */}
        <div className="footer-brand">
          <Link href="/#top" className="footer-logo">
            <span className="logo-text">NODIEX</span>
            <span className="logo-subtext">DEL PERU</span>
          </Link>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="footer-links-col">
          <h4>{f.company || "Empresa"}</h4>
          <Link href="/#about">{f.about || "Nosotros"}</Link>
          <Link href="/empresa/certificaciones">{f.certifications || "Certificaciones"}</Link>
          <Link href="/#catalog">{f.catalog || "Catálogo"}</Link>
          <Link href="/#certificates">{f.gallery || "Galería"}</Link>
        </div>

        {/* Links Column 2 */}
        <div className="footer-links-col">
          <h4>{f.help || "Ayuda"}</h4>
          <Link href="/#contact">{f.contact || "Contacto"}</Link>
          <Link href="/#tracking">{f.tracking || "Tracking de Pedidos"}</Link>
          <a href="mailto:comercial@nodiex.com.pe">{f.support || "Soporte"}</a>
        </div>

        {/* Links Column 3 */}
        <div className="footer-links-col">
          <h4>{f.legal || "Legal"}</h4>
          <Link href="#">{f.terms || "Términos de Uso"}</Link>
          <Link href="#">{f.privacy || "Política de Privacidad"}</Link>
          <Link href="/admin" className="admin-link">
            <LockKeyhole size={14} /> {f.adminAccess || "Acceso Administrador"}
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nodiex del Peru. {f.rights || "Todos los derechos reservados."}</p>
      </div>
    </motion.footer>
  );
}
