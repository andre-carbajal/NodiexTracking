"use client";

import { Facebook, Youtube } from "lucide-react";

export default function Header({ lang, setLang, menuOpen, setMenuOpen, languages, t }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand-logo" href="#top" aria-label="NODIEX inicio">
          <img src="/logo.png" alt="Nodiex Logo" />
        </a>
        
        <nav className={`main-nav ${menuOpen ? "open" : ""}`} id="main-menu">
          <a href="#top" onClick={() => setMenuOpen(false)}>Inicio</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Empresa</a>
          <a href="#catalog" onClick={() => setMenuOpen(false)}>{t.nav.catalog || "Productos"}</a>
          <a href="#certificates" onClick={() => setMenuOpen(false)}>Galería</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact || "Contacto"}</a>
        </nav>

        <div className="header-actions">
          <div className="social-links">
             <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
             <a href="#" aria-label="YouTube"><Youtube size={16} /></a>
          </div>
          <a href="#tracking" className="button-lima">Seguimiento</a>
          
          <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="main-menu">
            <span />
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
