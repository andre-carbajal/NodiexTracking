"use client";

import { Plus } from "lucide-react";

export default function UsuarioForm({ usuario, setUsuario, onPost }) {
  return (
    <div className="form-grid">
      <input
        placeholder="Username"
        value={usuario.username}
        onChange={(e) => setUsuario({ ...usuario, username: e.target.value })}
      />
      <input
        placeholder="Contrasena"
        type="password"
        value={usuario.password}
        onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
      />
      <select
        value={usuario.role}
        onChange={(e) => setUsuario({ ...usuario, role: e.target.value })}
      >
        <option value="">Seleccionar rol</option>
        <option value="operativo">Operativo</option>
        <option value="comercial">Comercial</option>
        <option value="gerencia">Gerencia</option>
      </select>
      <button className="button primary" onClick={() => onPost({ type: "user" })}>
        <Plus size={18} />Crear usuario
      </button>
    </div>
  );
}
