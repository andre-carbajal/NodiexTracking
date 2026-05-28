"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title1: "Orégano Verde ",
    title2: "& Especias.",
    description: "Hojas seleccionadas con altos niveles de aceites esenciales. Adaptamos la mejora de calidad a las necesidades de nuestros clientes internacionales.",
    buttonText: "Realiza tu Pedido",
    buttonLink: "#catalog",
    image: "https://images.unsplash.com/photo-1595855761361-b4f0b2f1e29c?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 2,
    title1: "Páprika de ",
    title2: "Exportación.",
    description: "Nuestro producto estrella. Color intenso, aroma inconfundible y un riguroso procesamiento bajo estrictas normas alimentarias y sanitarias.",
    buttonText: "Ver Producto",
    buttonLink: "#catalog",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 3,
    title1: "Tradición familiar, ",
    title2: "calidad global.",
    description: "Somos una empresa familiar dedicada a la producción y comercialización de productos agrícolas de primera calidad, desde el cultivo hasta la distribución.",
    buttonText: "Nuestra Empresa",
    buttonLink: "#about",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80"
  }
];

export default function Hero({ t }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section 
      className="hero" 
      id="top" 
      style={{ backgroundImage: `url(${slide.image})`, transition: 'background-image 0.5s ease-in-out' }}
    >
      <div className="hero-copy" key={slide.id}>
        <h1>
          {slide.title1}
          <span className="cursive-green">{slide.title2}</span>
        </h1>
        <p>{slide.description}</p>
        <div className="hero-actions">
          <a className="button-lima" href={slide.buttonLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', fontSize: '16px' }}>
            {slide.buttonText} <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      
      <div className="carousel-indicators">
        {slides.map((s, idx) => (
          <button 
            key={s.id}
            className={`indicator-dot ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Ir a diapositiva ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
