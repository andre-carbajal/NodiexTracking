import React from 'react';

export default function StatsBanner() {
  return (
    <div className="stats-banner-container">
      <div className="stats-banner-pill">
        <div className="stat-item">
          <strong>2000+</strong>
          <span>Clientes Satisfechos</span>
        </div>
        <div className="stat-item">
          <strong>15+</strong>
          <span>Años de Experiencia</span>
        </div>
        <div className="stat-item">
          <strong>800+</strong>
          <span>Envíos Exitosos</span>
        </div>
        <div className="stat-item">
          <strong>150M+</strong>
          <span>Toneladas Exportadas</span>
        </div>
      </div>
    </div>
  );
}
