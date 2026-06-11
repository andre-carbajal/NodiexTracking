"use client";

import { Save } from "lucide-react";
import { useState, useEffect } from "react";

export default function ContentForm({ sectionId, contentData, onPost, loading }) {
  const [lang, setLang] = useState("es");
  const [formData, setFormData] = useState({
    tituloEs: "", cuerpoEs: "",
    tituloEn: "", cuerpoEn: "",
    tituloPt: "", cuerpoPt: ""
  });

  useEffect(() => {
    if (contentData) {
      const es = contentData.traducciones?.find(t => t.idioma === "es") || {};
      const en = contentData.traducciones?.find(t => t.idioma === "en") || {};
      const pt = contentData.traducciones?.find(t => t.idioma === "pt") || {};
      
      setFormData({
        tituloEs: es.titulo || "", cuerpoEs: es.cuerpo || "",
        tituloEn: en.titulo || "", cuerpoEn: en.cuerpo || "",
        tituloPt: pt.titulo || "", cuerpoPt: pt.cuerpo || ""
      });
    }
  }, [contentData, sectionId]);

  const handleSave = () => {
    onPost({
      type: "content",
      seccion: sectionId,
      ...formData
    });
  };

  const currentTitle = lang === "es" ? "tituloEs" : lang === "en" ? "tituloEn" : "tituloPt";
  const currentBody = lang === "es" ? "cuerpoEs" : lang === "en" ? "cuerpoEn" : "cuerpoPt";

  return (
    <div className="product-form" style={{ marginTop: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button className={`ghost-button ${lang === "es" ? "active" : ""}`} onClick={() => setLang("es")}>🇪🇸 Español</button>
        <button className={`ghost-button ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>🇺🇸 Inglés</button>
        <button className={`ghost-button ${lang === "pt" ? "active" : ""}`} onClick={() => setLang("pt")}>🇧🇷 Portugués</button>
      </div>

      <div className="product-form-main">
        <div>
          <label>Título ({lang.toUpperCase()})</label>
          <input
            placeholder="Escribe el título aquí"
            value={formData[currentTitle]}
            onChange={(e) => setFormData({ ...formData, [currentTitle]: e.target.value })}
          />
        </div>
        <div className="full-span">
          <label>Cuerpo / Descripción ({lang.toUpperCase()})</label>
          <textarea
            placeholder="Escribe el contenido detallado aquí"
            value={formData[currentBody]}
            onChange={(e) => setFormData({ ...formData, [currentBody]: e.target.value })}
            rows={4}
          />
        </div>
      </div>

      <div className="product-actions">
        <button className="button primary" onClick={handleSave} disabled={loading}>
          <Save size={18} /> Guardar Contenido
        </button>
      </div>
    </div>
  );
}
