"use client";

import { CheckCircle2, ClipboardCheck, PackageSearch, Search, Truck } from "lucide-react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { isValidTrackingCode } from "@/lib/validators";
import { useState } from "react";

export default function TrackingWidget({ t, trackingCode, setTrackingCode, loading, trackingError, submitTracking }) {
  const [localError, setLocalError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLocalError("");
    const code = String(trackingCode).trim();
    if (!code) {
      setLocalError("Ingrese un codigo de seguimiento.");
      return;
    }
    if (!isValidTrackingCode(code)) {
      setLocalError("Formato de codigo invalido. Ejemplo: NDX-8Q4M-2026");
      return;
    }
    submitTracking(e);
  }

  return (
    <div className="tracking-card-modern">
      <form className="tracking-form-modern" id="tracking" onSubmit={handleSubmit}>
        <div className="tracking-header-modern">
          <div className="icon-circle">
            <PackageSearch size={28} color="white" />
          </div>
          <div>
            <h2>{t.trackingTitle || "Tracking de pedidos"}</h2>
            <p>Ingrese el código opaco entregado por NODIEX. No necesita crear una cuenta.</p>
          </div>
        </div>

        <div className="tracking-input-area">
          <label htmlFor="tracking-code-input">Ingrese el código opaco entregado por NODIEX</label>
          <div className="tracking-input-group">
            <input
              id="tracking-code-input"
              value={trackingCode}
              onChange={(event) => setTrackingCode(event.target.value)}
              placeholder="NDX-8Q4M-2026"
              className={localError ? "input-error" : ""}
            />
            <button className="button-lima" disabled={loading} aria-label="Consultar tracking" type="submit">
              {loading ? (
                <span className="spinner-small" />
              ) : (
                <>
                  <Search size={18} /> Buscar
                </>
              )}
            </button>
          </div>
          {(localError || trackingError) && <p className="form-error" style={{marginTop:'8px'}}>{localError || trackingError}</p>}
        </div>

        <div className="tracking-timeline-modern">
          <div className="timeline-step">
            <div className="step-icon"><ClipboardCheck size={20} /></div>
            <div>
              <strong>Registrado</strong>
              <span>Hemos recibido tu pedido</span>
            </div>
          </div>
          <div className="timeline-divider"></div>
          <div className="timeline-step">
            <div className="step-icon"><Truck size={20} /></div>
            <div>
              <strong>En tránsito</strong>
              <span>Tu pedido va en camino</span>
            </div>
          </div>
          <div className="timeline-divider"></div>
          <div className="timeline-step">
            <div className="step-icon"><CheckCircle2 size={20} /></div>
            <div>
              <strong>Entregado</strong>
              <span>Tu pedido fue entregado</span>
            </div>
          </div>
        </div>
      </form>

      <div className="tracking-promo-box">
        <div className="promo-content">
          <h3>¿Dónde está tu pedido?</h3>
          <p>Consulta el estado en tiempo real de tu carga de forma rápida y segura.</p>
        </div>
        <div className="promo-globe"></div>
      </div>
    </div>
  );
}
