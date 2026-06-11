"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { copy, languages } from "@/lib/i18n";
import { useI18n } from "@/components/I18nProvider";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, changeLang } = useI18n();
  const t = copy[lang] || copy["es"];

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
          <Link href="/#about" onClick={() => setMenuOpen(false)}>Nosotros</Link>
          <Link href="/productos" onClick={() => setMenuOpen(false)}>{t.nav.catalog || "Productos"}</Link>
          <Link href="/#certificates" onClick={() => setMenuOpen(false)}>Galería</Link>
          <Link href="/empresa/certificaciones" onClick={() => setMenuOpen(false)}>Certificaciones</Link>
          <Link href="/#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact || "Contacto"}</Link>
        </nav>

        <div className="header-actions">
          <div className="lang-selector">
            <select 
              value={lang} 
              onChange={(e) => changeLang(e.target.value)} 
              className="lang-select-modern"
              style={{ 
                padding: "8px 12px", 
                borderRadius: "8px", 
                border: "1px solid #e2e8f0", 
                background: "#f8fafc", 
                cursor: "pointer", 
                color: "#0f172a", 
                fontWeight: "600",
                fontSize: "14px",
                outline: "none",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
              }}
            >
              {languages.map(l => (
                <option key={l.code} value={l.code} style={{ color: "black" }}>
                  {l.country} {l.label}
                </option>
              ))}
            </select>
          </div>
          <Link href="/#tracking" className="button-lima">{t.nav?.tracking || "Seguimiento"}</Link>

          <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="main-menu">
            <span />
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
