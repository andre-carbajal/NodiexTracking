"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title1: "Orégano Verde ",
    title2: "& Especias.",
    description: "Hojas seleccionadas con altos niveles de aceites esenciales. Adaptamos la mejora de calidad a las necesidades de nuestros clientes internacionales.",
    buttonText: "Realiza tu Pedido",
    buttonLink: "#catalog",
    image: "https://plus.unsplash.com/premium_photo-1700064759190-f8a6b2b27f7f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

export default function Hero({ t = {}, content }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const localizedSlides = [
    {
      id: 1,
      title1: t.heroSlide1Title1 || "Orégano Verde ",
      title2: t.heroSlide1Title2 || "& Especias.",
      description: t.heroSlide1Desc || "Hojas seleccionadas con altos niveles de aceites esenciales. Adaptamos la mejora de calidad a las necesidades de nuestros clientes internacionales.",
      buttonText: t.heroSlide1Btn || "Realiza tu Pedido",
      buttonLink: "#catalog",
      image: "https://plus.unsplash.com/premium_photo-1700064759190-f8a6b2b27f7f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      title1: t.heroSlide2Title1 || "Páprika de ",
      title2: t.heroSlide2Title2 || "Exportación.",
      description: t.heroSlide2Desc || "Nuestro producto estrella. Color intenso, aroma inconfundible y un riguroso procesamiento bajo estrictas normas alimentarias y sanitarias.",
      buttonText: t.heroSlide2Btn || "Ver Producto",
      buttonLink: "#catalog",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 3,
      title1: t.heroSlide3Title1 || "Tradición familiar, ",
      title2: t.heroSlide3Title2 || "calidad global.",
      description: t.heroSlide3Desc || "Somos una empresa familiar dedicada a la producción y comercialización de productos agrícolas de primera calidad, desde el cultivo hasta la distribución.",
      buttonText: t.heroSlide3Btn || "Nuestra Empresa",
      buttonLink: "#about",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80"
    }
  ];

  const dynamicSlides = localizedSlides.map((s, idx) => {
    const slideData = content && content[`hero-${idx + 1}`];
    if (slideData && slideData.titulo) {
      return {
        ...s,
        title1: slideData.titulo,
        title2: "",
        description: slideData.cuerpo || s.description
      };
    }
    return s;
  });

  const slide = dynamicSlides[currentSlide];

  return (
    <section
      className="hero"
      id="top"
      style={{ backgroundImage: `url(${slide.image})`, transition: 'background-image 0.5s ease-in-out' }}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          className="hero-copy" 
          key={slide.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>
      </AnimatePresence>

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
