"use client";

import { Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { copy } from "@/lib/i18n";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = copy["es"]; // Default language to ES since no selector is present

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-logo" href="/#top" aria-label="NODIEX inicio">
          <img src="/nodiex_logo.jpg" alt="Nodiex Logo" />
        </Link>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`} id="main-menu">
          <Link href="/#top" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link href="/#about" onClick={() => setMenuOpen(false)}>Empresa</Link>
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
