"use client";

import { Send } from "lucide-react";
import Toast from "@/components/Toast";
import { validateContactFields } from "@/lib/validators";
import { useState } from "react";

export default function ContactForm({ t }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", country: "", message: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

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
    } else {
      const json = await res.json();
      setToast({ message: json.message || "Error al enviar. Intente nuevamente.", variant: "error" });
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div>
        <p className="eyebrow">Comercial</p>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactBody}</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>
        <input
          placeholder="Empresa"
          value={form.company}
          onChange={(e) => handleChange("company", e.target.value)}
        />
        <div>
          <input
            placeholder="Correo"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <input
          placeholder="Pais"
          value={form.country}
          onChange={(e) => handleChange("country", e.target.value)}
        />
        <div>
          <textarea
            placeholder="Mensaje / interes comercial"
            rows={4}
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className={errors.message ? "input-error" : ""}
          />
          {errors.message && <span className="field-error">{errors.message}</span>}
        </div>
        <button className="button primary" type="submit"><Send size={18} />Enviar solicitud</button>
      </form>
      {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </section>
  );
}
