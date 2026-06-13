"use client";

import { CheckCircle2, ClipboardCheck, PackageSearch, Search, Truck } from "lucide-react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { isValidTrackingCode } from "@/lib/validators";
import { useState, useEffect } from "react";

export default function TrackingWidget({ t, trackingCode, setTrackingCode, loading, trackingError, submitTracking }) {
  const [localError, setLocalError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!loading && !trackingCode) {
      const timer1 = setTimeout(() => setCurrentStep(1), 800);
      const timer2 = setTimeout(() => setCurrentStep(2), 2400);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    } else if (trackingCode) {
      setCurrentStep(0); // reset when they start typing
    }
  }, [loading, trackingCode]);

  function handleSubmit(e) {
    e.preventDefault();
    setLocalError("");
    const code = String(trackingCode).trim();
    if (!code) {
      setLocalError(t.enterCodeError || "Ingrese un codigo de seguimiento.");
      return;
    }
    if (!isValidTrackingCode(code)) {
      setLocalError(t.invalidCodeFormat || "Formato de codigo invalido. Ejemplo: NDX-8Q4M-2026");
      return;
    }
    submitTracking(e);
  }

  return (
    <div className="tracking-card-modern">
      <form className="tracking-form-modern" id="tracking" onSubmit={handleSubmit}>
        <div className="tracking-header-modern">
          <div className="icon-circle icon-green-mockup">
            <PackageSearch size={28} color="white" />
          </div>
          <div>
            <h2>{t.trackingTitle || "Tracking de pedidos"}</h2>
            <p>{t.trackingHelp || "Ingrese el código opaco entregado por NODIEX. No necesita crear una cuenta."}</p>
          </div>
        </div>

        <div className="tracking-input-area">
          <label htmlFor="tracking-code-input">{t.trackingInputLabel || "Ingrese el código opaco entregado por NODIEX"}</label>
          <div className="tracking-input-wrapper-mockup">
            <input
              id="tracking-code-input"
              value={trackingCode}
              onChange={(event) => setTrackingCode(event.target.value)}
              placeholder="NDX-8Q4M-2026"
              className={localError ? "input-error" : "tracking-input"}
            />
            <button className="button-buscar-mockup" disabled={loading} aria-label="Consultar tracking" type="submit">
              {loading ? (
                <span className="spinner-small" />
              ) : (
                <>
                  <Search size={18} /> {t.searchBtnLabel || "Buscar"}
                </>
              )}
            </button>
          </div>
          {(localError || trackingError) && <p className="form-error" style={{marginTop:'8px'}}>{localError || trackingError}</p>}
        </div>

        <div className="tracking-timeline-modern">
          <div className={`timeline-step ${currentStep >= 1 ? "active" : ""}`}>
            <div className="step-icon"><ClipboardCheck size={20} /></div>
            <div>
              <strong>{t.registeredLabel || "Registrado"}</strong>
              <span>{t.registeredSub || "Hemos recibido tu pedido"}</span>
            </div>
          </div>
          <div className={`timeline-divider ${currentStep >= 2 ? "filled" : ""}`}></div>
          <div className={`timeline-step ${currentStep >= 2 ? "active" : ""}`}>
            <div className="step-icon"><Truck size={20} /></div>
            <div>
              <strong>{t.inTransitLabel || "En tránsito"}</strong>
              <span>{t.inTransitSub || "Tu pedido va en camino"}</span>
            </div>
          </div>
          <div className="timeline-divider"></div>
          <div className="timeline-step">
            <div className="step-icon"><CheckCircle2 size={20} /></div>
            <div>
              <strong>{t.deliveredLabel || "Entregado"}</strong>
              <span>{t.deliveredSub || "Tu pedido fue entregado"}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
