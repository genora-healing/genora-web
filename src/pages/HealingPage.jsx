import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";

export default function HealingPage() {
  return (
    <div className="w-full bg-[#020617] text-[#F8FAFF] min-h-screen">
      {/* ── 1. Hero Cinemático Flanqueado ── */}
      <HeroSection />

      {/* ── El resto de tu página continúa aquí abajo ── */}
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const gold = "#D4B96A";
const white = "#F8FAFF";

export default function HeroSection({ videoSrc = "/videos/Video-hook-mini.mp4" }) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

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
      style={{
        position: "relative",
        width: "100%",
        height: "88vh",
        minHeight: "88vh",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 95%",
            filter: "contrast(1.15) brightness(0.92)",
            display: "block",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 50%, #020617 100%)",
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1.5rem",
          textAlign: "center",
          opacity,
          filter: blurFilter,
        }}
      >
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.0 }}
        >
          <motion.button
            onClick={scrollToNext}
            whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(212,185,106,0.45)" }}
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
              border: "1px solid rgba(212,185,106,0.40)",
              borderRadius: "3rem",
              color: gold,
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            <span style={{
              fontSize: "1rem",
              lineHeight: 1,
            }} aria-hidden="true">
              ↓
            </span>
            Descubre el método
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}