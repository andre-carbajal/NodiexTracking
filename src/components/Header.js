"use client";

import { Home } from "lucide-react";

export default function Header({ lang, setLang, menuOpen, setMenuOpen, languages, t }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand-logo" href="#top" aria-label="NODIEX inicio">
          <strong>NODIEX</strong>
          <span>DEL PERU</span>
          <small>Agroexportacion con calidad y confianza</small>
        </a>
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
        <a href="#top" onClick={() => setMenuOpen(false)}><Home size={16} />Inicio</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>Empresa</a>
        <a href="#catalog" onClick={() => setMenuOpen(false)}>{t.nav.catalog}</a>
        <a href="#tracking" onClick={() => setMenuOpen(false)}>{t.nav.tracking}</a>
        <a href="#certificates" onClick={() => setMenuOpen(false)}>{t.nav.certificates}</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
      </nav>
    </header>
  );
}
