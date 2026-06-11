"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutBand({ t, content }) {
  const title = content?.about?.titulo || t.trustTitle || "Confianza exportadora, informacion verificable";
  const body = content?.about?.cuerpo || t.trustBody;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="about-modern-wrapper" id="about">
      <motion.div 
        className="about-bento-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="bento-text-card" variants={itemVariants}>
          <p className="eyebrow-modern">Bienvenidos a NODIEX DEL PERU S.A.C.</p>
          <h2>{title}</h2>
          <p>{body}</p>
          <a className="bento-link" href="#contact">Conoce más sobre nosotros <ChevronRight size={18} /></a>
        </motion.div>
        
        <motion.div className="bento-image-grid" variants={itemVariants}>
          <div className="bento-img-wrapper img-1">
            <Image 
              alt="Control de calidad agroexportador" 
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80" 
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="bento-img-wrapper img-2">
            <Image 
              alt="Hierbas aromaticas y especias" 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80" 
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
