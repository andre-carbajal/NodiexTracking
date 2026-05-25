"use client";

import { Plus } from "lucide-react";

export default function DespachoForm({ shipment, setShipment, onPost, onEdit, editingId, onCancel, errors, productOptions = [] }) {
  const hasCurrentProduct = shipment.product && productOptions.some((product) => product.name === shipment.product);

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
        <select
          value={shipment.product}
          onChange={(e) => setShipment({ ...shipment, product: e.target.value })}
          className={errors?.product ? "input-error" : ""}
        >
          <option value="">Producto</option>
          {shipment.product && !hasCurrentProduct && <option value={shipment.product}>{shipment.product}</option>}
          {productOptions.map((product) => (
            <option key={product.id} value={product.name}>{product.name}</option>
          ))}
        </select>
        {errors?.product && <span className="field-error">{errors.product}</span>}
      </div>
      <input
        placeholder="Email cliente (notificaciones)"
        type="email"
        value={shipment.emailCliente || ""}
        onChange={(e) => setShipment({ ...shipment, emailCliente: e.target.value })}
      />
      <select
        value={shipment.idiomaPreferido || "es"}
        onChange={(e) => setShipment({ ...shipment, idiomaPreferido: e.target.value })}
      >
        <option value="es">Notificaciones: Espanol</option>
        <option value="en">Notificaciones: English</option>
        <option value="pt">Notificaciones: Portugues</option>
      </select>
      {editingId && (
        <select
          value={shipment.currentStatus || "registrado"}
          onChange={(e) => setShipment({ ...shipment, currentStatus: e.target.value })}
        >
          <option value="registrado">Estado: Registrado</option>
          <option value="en tránsito">Estado: En transito</option>
          <option value="entregado/cerrado">Estado: Entregado/Cerrado</option>
        </select>
      )}
      {editingId ? (
        <div className="inline-actions">
          <button className="button primary" onClick={() => onEdit({ type: "shipmentEdit", id: editingId })}>
            Guardar cambios
          </button>
          <button className="button secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      ) : (
        <button className="button primary" onClick={() => onPost({ type: "shipment" })}>
          <Plus size={18} />Crear despacho
        </button>
      )}
    </div>
  );
}
