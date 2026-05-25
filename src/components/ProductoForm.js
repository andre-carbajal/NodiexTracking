"use client";

import { Plus } from "lucide-react";
import Image from "next/image";

function imageToDataUrl(file, onReady) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => onReady(String(reader.result || ""));
  reader.readAsDataURL(file);
}

export default function ProductForm({ product, setProduct, onPost, onEdit, editingId, onCancel, errors }) {
  return (
    <div className="form-grid">
      <div>
        <input
          placeholder="Nombre producto"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className={errors?.name ? "input-error" : ""}
        />
        {errors?.name && <span className="field-error">{errors.name}</span>}
      </div>
      <div>
        <input
          placeholder="Descripcion"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          className={errors?.description ? "input-error" : ""}
        />
        {errors?.description && <span className="field-error">{errors.description}</span>}
      </div>
      <div>
        <select value={product.unit} onChange={(e) => setProduct({ ...product, unit: e.target.value })} className={errors?.unit ? "input-error" : ""}>
          <option>TM</option>
          <option>{"Contenedor 20'"}</option>
          <option>{"Contenedor 40'"}</option>
        </select>
        {errors?.unit && <span className="field-error">{errors.unit}</span>}
      </div>
      <div>
        <select value={product.currency} onChange={(e) => setProduct({ ...product, currency: e.target.value })} className={errors?.currency ? "input-error" : ""}>
          <option>PEN</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
        {errors?.currency && <span className="field-error">{errors.currency}</span>}
      </div>
      <div>
        <input
          placeholder="Precio"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className={errors?.price ? "input-error" : ""}
        />
        {errors?.price && <span className="field-error">{errors.price}</span>}
      </div>
      <label className="check-row">
        <input
          type="checkbox"
          checked={product.publish}
          onChange={(e) => setProduct({ ...product, publish: e.target.checked })}
        />
        Publicado
      </label>
      <label className="file-field">
        Imagen del producto
        <input
          type="file"
          accept="image/*"
          onChange={(e) => imageToDataUrl(e.target.files?.[0], (imageUrl) => setProduct({ ...product, imageUrl }))}
        />
      </label>
      {product.imageUrl && (
        <div className="image-preview">
          <Image unoptimized src={product.imageUrl} alt="Vista previa producto" width={84} height={64} />
          <button type="button" className="ghost-button small danger" onClick={() => setProduct({ ...product, imageUrl: "" })}>
            Quitar
          </button>
        </div>
      )}
      {editingId ? (
        <div className="inline-actions">
          <button className="button primary" onClick={() => onEdit({ type: "productEdit", id: editingId })}>
            Guardar cambios
          </button>
          <button className="button secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      ) : (
        <button className="button primary" onClick={() => onPost({ type: "product" })}><Plus size={18} />Crear producto</button>
      )}
    </div>
  );
}
