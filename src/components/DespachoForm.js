"use client";

import { Plus, Ship } from "lucide-react";
import { useState } from "react";
import { validateShipmentFields } from "@/lib/validators";

export default function DespachoForm({ shipment, setShipment, onPost, errors }) {
  return (
    <div className="form-grid">
      <div>
        <input
          placeholder="Cliente internacional"
          value={shipment.client}
          onChange={(e) => setShipment({ ...shipment, client: e.target.value })}
          className={errors?.client ? "input-error" : ""}
        />
        {errors?.client && <span className="field-error">{errors.client}</span>}
      </div>
      <div>
        <input
          placeholder="Destino"
          value={shipment.destination}
          onChange={(e) => setShipment({ ...shipment, destination: e.target.value })}
          className={errors?.destination ? "input-error" : ""}
        />
        {errors?.destination && <span className="field-error">{errors.destination}</span>}
      </div>
      <div>
        <input
          placeholder="Producto"
          value={shipment.product}
          onChange={(e) => setShipment({ ...shipment, product: e.target.value })}
          className={errors?.product ? "input-error" : ""}
        />
        {errors?.product && <span className="field-error">{errors.product}</span>}
      </div>
      <button className="button primary" onClick={() => onPost({ type: "shipment" })}><Plus size={18} />Crear despacho</button>
    </div>
  );
}
