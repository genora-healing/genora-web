import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
 
// ─── PALETA GENORA ───────────────────────────────────────────────
const gold = "#D4B96A";
const white = "#F8FAFF";
 
export default function HeroSection({ videoSrc = "/videos/Video-hook-mini.mp4" }) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
 
  // Efecto scroll: opacidad y blur al bajar
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.6], [0, 12]);
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);
 
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
 
  const scrollToNext = () => {
    const hero = containerRef.current;
    if (hero) {
      const next = hero.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: "smooth" });
    }
  };
 
  return (
    <section
      ref={containerRef}
      className="hero-section relative w-full overflow-hidden"
      style={{ height: "88vh", minHeight: "88vh" }}
    >
      {/* ── Video de fondo ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center 95%",
            filter: "contrast(1.15) brightness(0.92)",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
 
      {/* ── Overlay gradiente sutil ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.20) 50%, #020617 100%)",
        }}
      />
 
      {/* ── Contenido con efecto scroll (opacidad + blur al bajar) ── */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity, filter: blurFilter }}
      >
        {/* Badge / Super-título dorado */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            color: gold,
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "clamp(0.58rem, 1.3vw, 0.75rem)",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          Sistema Maestro de Recalibración Consciente™
        </motion.p>
 
        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4 }}
          style={{
            color: white,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.9rem, 5vw, 3.8rem)",
            fontWeight: 400,
            lineHeight: 1.22,
            maxWidth: "760px",
            marginBottom: "1.75rem",
            textShadow: "0 2px 30px rgba(0,0,0,0.55)",
          }}
        >
          Existe una versión original de ti esperando ser recordada.
        </motion.h1>
 
        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.7 }}
          style={{
            color: "rgba(248,250,255,0.70)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(0.92rem, 1.7vw, 1.12rem)",
            lineHeight: 1.82,
            maxWidth: "600px",
            marginBottom: "2.8rem",
            textShadow: "0 1px 14px rgba(0,0,0,0.45)",
          }}
        >
          GENORA HEALING™ es un Sistema Maestro de Recalibración Consciente™ que integra
          frecuencias vibracionales, bioelectrogénesis y tecnología con cristales para
          restaurar la coherencia entre el cuerpo, la supraconsciencia y el campo de
          información que sostiene tu experiencia de vida.
        </motion.p>
 
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.0 }}
        >
          <motion.button
            onClick={scrollToNext}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 28px rgba(212,185,106,0.45), 0 0 60px rgba(212,185,106,0.18)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.65rem",
              padding: "1rem 2.8rem",
              background: "rgba(2,6,23,0.55)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid rgba(212,185,106,0.40)`,
              borderRadius: "3rem",
              color: gold,
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 0 12px rgba(212,185,106,0.12)",
            }}
          >
            <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>✦</span>
            Recalibrar mi Código
          </motion.button>
        </motion.div>
      </motion.div>
 
      {/* ── Indicador de scroll flotante ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.6 }}
        onClick={scrollToNext}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
        }}
      >
        <motion.p
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            color: `rgba(212,185,106,0.7)`,
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Descubre el Sistema
        </motion.p>
 
        {/* Pulso de luz vertical */}
        <div style={{ position: "relative", width: "1px", height: "40px" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `rgba(212,185,106,0.20)`,
              width: "1px",
            }}
          />
          <motion.div
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "1px",
              height: "100%",
              background: `linear-gradient(to bottom, ${gold}, transparent)`,
              transformOrigin: "top",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
 
