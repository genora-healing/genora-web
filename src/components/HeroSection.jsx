import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── PALETA GENORA ───────────────────────────────────────────────
const gold = "#D4B96A";
const white = "#F8FAFF";

export default function HeroSection({ videoSrc = "/videos/Video-hook-mini.mp4" }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Carga dinámica de tipografías cinemáticas limpias (League Spartan)
  useEffect(() => {
    if (!document.getElementById("genora-fonts")) {
      const link = document.createElement("link");
      link.id = "genora-fonts";
      link.href =
        "https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

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
      if (next) {
        next.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="hero-section relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "100vh", backgroundColor: "#020617" }}
    >
      {/* ── Video de fondo ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center center",
            filter: "contrast(1.12) brightness(0.95)",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* ── Overlay lateral sutil (mantiene oscuros los bordes para leer sin tapar el centro) ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.15) 38%, rgba(2,6,23,0.15) 62%, rgba(2,6,23,0.85) 100%), linear-gradient(to bottom, rgba(2,6,23,0.3) 0%, transparent 60%, #020617 100%)",
        }}
      />

      {/* ── Contenido Flanqueado (Estructura de Escena Cinemática) ── */}
      <motion.div
        className="relative z-20 w-full h-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col justify-between box-border py-12"
        style={{ opacity, filter: blurFilter }}
      >
        {/* Badge / Super-título dorado superior */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <p
            style={{
              color: gold,
              fontFamily: "'League Spartan', sans-serif",
              fontSize: "clamp(0.62rem, 1.2vw, 0.72rem)",
              fontWeight: 500,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Sistema Maestro de Recalibración Consciente™
          </p>
        </motion.div>

        {/* Rejilla Asimétrica: Centro Despejado para el Haz de Luz y el ADN */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full my-auto">
          {/* Lado Izquierdo: Título Principal */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="md:col-span-5 text-left"
          >
            <h1
              style={{
                color: white,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 3.2vw, 3.4rem)",
                fontWeight: 300,
                lineHeight: 1.18,
                margin: 0,
                textShadow: "0 4px 25px rgba(0,0,0,0.85)",
              }}
            >
              Existe una versión original de ti esperando ser recordada.
            </h1>
          </motion.div>

          {/* Espacio Central Libre (Columnas 6 y 7 libres para que el rayo de luz respire) */}
          <div className="hidden md:block md:col-span-2 pointer-events-none" />

          {/* Lado Derecho: Subtítulo Editorial */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="md:col-span-5 text-right flex flex-col items-end"
          >
            <p
              style={{
                color: "rgba(248,250,255,0.82)",
                fontFamily: "'League Spartan', sans-serif",
                fontSize: "clamp(0.88rem, 1.4vw, 1.02rem)",
                fontWeight: 300,
                lineHeight: 1.75,
                letterSpacing: "0.03em",
                margin: 0,
                maxWidth: "420px",
                textShadow: "0 2px 18px rgba(0,0,0,0.85)",
              }}
            >
              GENORA HEALING™ es un Sistema Maestro de Recalibración Consciente™ que integra frecuencias vibracionales y bioelectrogénesis para restaurar la coherencia entre tu cuerpo y tu campo de información.
            </p>
          </motion.div>
        </div>

        {/* Indicador de scroll cinemático flotante (sin botón duro) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={scrollToNext}
          className="flex flex-col items-center gap-2 cursor-pointer text-center"
        >
          <motion.p
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              color: gold,
              fontFamily: "'League Spartan', sans-serif",
              fontSize: "0.62rem",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Desliza para ingresar al portal
          </motion.p>

          {/* Pulso de luz vertical */}
          <div style={{ position: "relative", width: "1px", height: "32px" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(212,185,106,0.20)",
                width: "1px",
              }}
            />
            <motion.div
              animate={{ scaleY: [0, 1, 0] }}
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
      </motion.div>
    </section>
  );
}