"use client";

import { ShieldCheck, Activity, MapPin, Play } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutBand({ t = {} }) {
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
    <section className="agency-about-section" id="about">
      <motion.div 
        className="agency-about-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Top Header */}
        <motion.div className="agency-top-row" variants={itemVariants}>
          <div className="agency-title">
            <h2>{t.aboutTitle1 || "Tradición y "}<span>{t.aboutTitle2 || "Calidad"}</span>{t.aboutTitleSuffix || " Exportadora"}</h2>
          </div>
          <div className="agency-desc">
            <p>{t.aboutDesc1 || "Somos una empresa familiar dedicada a la producción y comercialización de productos de primera calidad, desde el cultivo, recolección y distribución. Gracias a la visión empresarial nuestra empresa es actualmente reconocida en el mercado nacional e internacional."}</p>
            <p>{t.aboutDesc2 || "Poseemos una amplia gama de productos disponibles en el mercado, destacando las hierbas aromáticas y especias, nos apoyamos en nuestro equipo de profesionales para aplicar las nuevas normas alimentarias y sanitarias para la mejora de calidad a las necesidades de nuestros clientes."}</p>
          </div>
        </motion.div>

        {/* Middle Cards */}
        <motion.div className="agency-cards-row" variants={itemVariants}>
          <div className="agency-feature-card">
            <div className="agency-icon-circle icon-red">
              <ShieldCheck size={28} />
            </div>
            <div className="agency-card-text">
              <h4>{t.aboutFeature1Title || "Primera Calidad"}</h4>
              <p>{t.aboutFeature1Desc || "Productos de primer nivel desde el cultivo hasta la distribución."}</p>
            </div>
          </div>
          
          <div className="agency-feature-card">
            <div className="agency-icon-circle icon-black">
              <Activity size={28} />
            </div>
            <div className="agency-card-text">
              <h4>{t.aboutFeature2Title || "Normas Sanitarias"}</h4>
              <p>{t.aboutFeature2Desc || "Aplicación de las más recientes normas alimentarias y sanitarias."}</p>
            </div>
          </div>
          
          <div className="agency-feature-card">
            <div className="agency-icon-circle icon-red">
              <MapPin size={28} />
            </div>
            <div className="agency-card-text">
              <h4>{t.aboutFeature3Title || "Trazabilidad Total"}</h4>
              <p>{t.aboutFeature3Desc || "Aseguramiento de calidad y control de producción en planta."}</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Collage */}
        <motion.div className="agency-image-collage" variants={itemVariants}>
          <div className="collage-main-img">
            <Image 
              alt={t.aboutAltMainImg || "Planta de procesamiento Nodiex"} 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80" 
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          <div className="collage-sub-img">
            <Image 
              alt={t.aboutAltSubImg || "Campos de cultivo Nodiex"} 
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80" 
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
