"use client";

import { Send, Phone, Mail, MapPin } from "lucide-react";
import Toast from "@/components/Toast";
import { validateContactFields } from "@/lib/validators";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ContactForm({ t }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", country: "", message: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const textareaRef = useRef(null);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleTextareaInput(e) {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    handleChange("message", e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { valid, errors: fieldErrors } = validateContactFields(form);
    if (!valid) {
      setErrors(fieldErrors);
      return;
    }

    const res = await fetch("/api/public/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setToast({ message: "Solicitud enviada correctamente. Nos pondremos en contacto pronto.", variant: "success" });
      setForm({ name: "", company: "", email: "", country: "", message: "" });
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // Reset height after success
      }
    } else {
      const json = await res.json();
      setToast({ message: json.message || "Error al enviar. Intente nuevamente.", variant: "error" });
    }
  }

  return (
    <section id="contact" className="contact-section-modern">
      <div className="contact-split-layout">
        <motion.div 
          className="contact-text-side"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>Información de Contacto</h2>
          <p>¿Interesado en nuestros productos o requiere una cotización personalizada? Nuestro equipo comercial está listo para atender sus requerimientos.</p>
        </motion.div>

        <motion.div 
          className="contact-form-panel"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <form className="modern-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tu Nombre</label>
              <input
                placeholder="Ej. Juan Pérez"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`modern-input ${errors.name ? "input-error" : ""}`}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Empresa</label>
              <input
                placeholder="Ej. Importaciones SAC"
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
                className="modern-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tu Correo</label>
                <input
                  type="email"
                  placeholder="ejemplo@empresa.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`modern-input ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>País</label>
                <input
                  placeholder="Ej. España"
                  value={form.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="modern-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mensaje</label>
              <textarea
                ref={textareaRef}
                placeholder="Escribe aquí tus requerimientos o interés comercial..."
                rows={1}
                value={form.message}
                onChange={handleTextareaInput}
                className={`modern-input modern-textarea ${errors.message ? "input-error" : ""}`}
                style={{ overflow: "hidden" }}
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            <button className="modern-submit-btn" type="submit">
              Enviar Mensaje
            </button>
          </form>
        </motion.div>
      </div>
      {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </section>
  );
}
