"use client";

import { Home } from "lucide-react";
import Link from "next/link";

export default function Header({ lang, setLang, menuOpen, setMenuOpen, languages, t }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-logo" href="/" aria-label="NODIEX inicio">
          <strong>NODIEX</strong>
          <span>DEL PERU</span>
          <small>Agroexportacion con calidad y confianza</small>
        </Link>
        <div className="header-actions">
          <div className="language-switch" aria-label="Selector de idioma">
            {languages.map((item) => (
              <button className={lang === item.code ? "active" : ""} key={item.code} onClick={() => setLang(item.code)}>
                {item.label}
              </button>
            ))}
          </div>
          <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="main-menu">
            <span />
            Menu
          </button>
        </div>
      </div>
      <nav className={`main-nav ${menuOpen ? "open" : ""}`} id="main-menu">
        <Link href="/" onClick={() => setMenuOpen(false)}><Home size={16} />Inicio</Link>
        <Link href="/#about" onClick={() => setMenuOpen(false)}>Empresa</Link>
        <Link href="/#catalog" onClick={() => setMenuOpen(false)}>{t.nav.catalog}</Link>
        <Link href="/#tracking" onClick={() => setMenuOpen(false)}>{t.nav.tracking}</Link>
        <Link href="/#certificates" onClick={() => setMenuOpen(false)}>{t.nav.certificates}</Link>
        <Link href="/#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</Link>
      </nav>
    </header>
  );
}
