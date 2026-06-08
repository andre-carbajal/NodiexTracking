"use client";

import { LockKeyhole, Mail, MapPin, Phone, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
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
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="footer-links-col">
          <h4>Empresa</h4>
          <Link href="/#about">Nosotros</Link>
          <Link href="/empresa/certificaciones">Certificaciones</Link>
          <Link href="/#catalog">Catálogo</Link>
          <Link href="/galeria">Galería</Link>
        </div>

        {/* Links Column 2 */}
        <div className="footer-links-col">
          <h4>Ayuda</h4>
          <Link href="/#contact">Contacto</Link>
          <Link href="/#tracking">Tracking de Pedidos</Link>
          <a href="mailto:comercial@nodiex.com.pe">Soporte</a>
        </div>

        {/* Links Column 3 */}
        <div className="footer-links-col">
          <h4>Legal</h4>
          <Link href="#">Términos de Uso</Link>
          <Link href="#">Política de Privacidad</Link>
          <Link href="/admin" className="admin-link">
            <LockKeyhole size={14} /> Acceso Administrador
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nodiex del Peru. Todos los derechos reservados.</p>
      </div>
    </motion.footer>
  );
}
