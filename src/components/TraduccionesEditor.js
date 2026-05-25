"use client";

import { useState } from "react";

export default function TraduccionesEditor({ idiomas = ["es", "en", "pt"], onSave }) {
  const [activeTab, setActiveTab] = useState("es");
  const [translations, setTranslations] = useState({
    es: { titulo: "", cuerpo: "" },
    en: { titulo: "", cuerpo: "" },
    pt: { titulo: "", cuerpo: "" }
  });

  function handleSave() {
    if (onSave) onSave({ idioma: activeTab, ...translations[activeTab] });
  }

  return (
    <div className="traducciones-editor">
      <div className="tabs">
        {idiomas.map((lang) => (
          <button
            key={lang}
            className={`tab ${activeTab === lang ? "active" : ""}`}
            onClick={() => setActiveTab(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <input
          placeholder="Titulo"
          value={translations[activeTab].titulo}
          onChange={(e) =>
            setTranslations((prev) => ({
              ...prev,
              [activeTab]: { ...prev[activeTab], titulo: e.target.value }
            }))
          }
        />
        <textarea
          placeholder="Cuerpo / Descripcion"
          rows={4}
          value={translations[activeTab].cuerpo}
          onChange={(e) =>
            setTranslations((prev) => ({
              ...prev,
              [activeTab]: { ...prev[activeTab], cuerpo: e.target.value }
            }))
          }
        />
        <button className="button primary small" onClick={handleSave}>Guardar traduccion</button>
      </div>
    </div>
  );
}
