"use client";

import React, { useEffect, useState, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

function AnimatedNumber({ value, duration = 2, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate(v) {
          setDisplayValue(Math.round(v));
        }
      });
      return controls.stop;
    }
  }, [isInView, value, duration]);

  return <strong ref={ref}>{displayValue}{suffix}</strong>;
}

export default function StatsBanner() {
  return (
    <div className="stats-banner-container">
      <div className="stats-banner-pill">
        <div className="stat-item">
          <AnimatedNumber value={2000} suffix="+" />
          <span>Clientes Satisfechos</span>
        </div>
        <div className="stat-item">
          <AnimatedNumber value={15} suffix="+" />
          <span>Años de Experiencia</span>
        </div>
        <div className="stat-item">
          <AnimatedNumber value={800} suffix="+" />
          <span>Envíos Exitosos</span>
        </div>
        <div className="stat-item">
          <AnimatedNumber value={150} suffix="M+" />
          <span>Toneladas Exportadas</span>
        </div>
      </div>
    </div>
  );
}
