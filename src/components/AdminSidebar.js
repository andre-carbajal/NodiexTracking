"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminSidebar({ sections = [], activeSection, onSectionChange, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSectionChange(sectionId) {
    onSectionChange(sectionId);
    setMenuOpen(false);
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-head">
        <Link className="brand" href="/"><span>N</span><strong>NODIEX</strong></Link>
        <button
          className="admin-menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="admin-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
          Menu
        </button>
      </div>
      <nav className={menuOpen ? "open" : ""} id="admin-menu">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              type="button"
              className={activeSection === section.id ? "active" : ""}
              onClick={() => handleSectionChange(section.id)}
            >
              <Icon size={18} />
              <span>{section.label}</span>
            </button>
          );
        })}
        <button
          className="admin-logout-menu"
          type="button"
          onClick={() => {
            setMenuOpen(false);
            onLogout();
          }}
        >
          Cerrar sesion
        </button>
      </nav>
      <button className="ghost-button" onClick={onLogout}>Cerrar sesion</button>
    </aside>
  );
}
