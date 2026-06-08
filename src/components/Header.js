"use client";

import { Facebook, Youtube } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { copy } from "@/lib/i18n";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const t = copy["es"]; // Default language to ES since no selector is present

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <Link className="brand-logo" href="/#top" aria-label="NODIEX inicio">
          <img src="/logo1.png" alt="Nodiex Logo" />
        </Link>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`} id="main-menu">
          <Link href="/#top" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <div className="nav-dropdown">
            <div className="dropdown-toggle" aria-haspopup="true">Empresa</div>
            <div className="dropdown-menu">
              <Link href="/#about" onClick={() => setMenuOpen(false)}>Nosotros</Link>
              <Link href="/empresa/certificaciones" onClick={() => setMenuOpen(false)}>Certificaciones</Link>
            </div>
          </div>
          <Link href="/productos" onClick={() => setMenuOpen(false)}>{t.nav.catalog || "Productos"}</Link>
          <Link href="/#certificates" onClick={() => setMenuOpen(false)}>Galería</Link>
          <Link href="/#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact || "Contacto"}</Link>
        </nav>

        <div className="header-actions">
          <div className="social-links">
            <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={16} /></a>
          </div>
          <Link href="/#tracking" className="button-lima">Seguimiento</Link>

          <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="main-menu">
            <span />
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
