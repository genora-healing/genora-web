// GENORA HEALING — HeroSection V9
// Fases animadas limpias · Video 100vh · Sin amontonamiento de texto
// NO usa react-router-dom · Navegación con window.location.href

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const gold = "#D4B96A";
const white = "#F8FAFF";

// Variantes de entrada/salida para cada fase
const phaseVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0,  transition: { duration: 1.1, ease: "easeOut" } },
  exit:    { opacity: 0, y: -14, transition: { duration: 0.8, ease: "easeIn"  } },
};

export default function HeroSection() {
  const videoRef = useRef(null);
  const [phase, setPhase] = useState(1); // 1 | 2 | 3 | 4
  const [videoPaused, setVideoPaused] = useState(false);

  // ── Temporizador de fases ─────────────────────────────────────
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 5000),
      setTimeout(() => setPhase(4), 7500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // ── Pausa al terminar primera vuelta del video ────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setVideoPaused(true);
    };

    // Si el video tiene loop activo lo quitamos para poder capturar "ended"
    video.loop = false;
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  // ── Reinicio al volver al top (IntersectionObserver en el hero) ─
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;";
    video.parentElement?.appendChild(sentinel);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoPaused) {
          video.currentTime = 0;
          video.play().catch(() => {});
          setVideoPaused(false);
          setPhase(1);
          // Reinicia fases
          setTimeout(() => setPhase(2), 2500);
          setTimeout(() => setPhase(3), 5000);
          setTimeout(() => setPhase(4), 7500);
        }
      },
      { threshold: 0.8 }
    );
    obs.observe(sentinel);
    return () => { obs.disconnect(); sentinel.remove(); };
  }, [videoPaused]);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#020617",
      }}
    >
      {/* ── VIDEO FONDO ───────────────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
          zIndex: 0,
        }}
      >
        <source src="/videos/genora-hook.mp4" type="video/mp4" />
      </video>

      {/* ── OVERLAY LIGERO — solo para que el texto respire ──── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(2,6,23,0.18) 0%, rgba(2,6,23,0.08) 50%, rgba(2,6,23,0.45) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── CENTRO DE FASES ───────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1.5rem",
        }}
      >
        <AnimatePresence mode="wait">

          {/* FASE 1 — Frase inicial */}
          {phase === 1 && (
            <motion.p
              key="fase1"
              variants={phaseVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.15rem, 2.8vw, 1.75rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: white,
                textAlign: "center",
                lineHeight: 1.65,
                maxWidth: "680px",
                textShadow: "0 2px 24px rgba(2,6,23,0.7)",
                letterSpacing: "0.01em",
              }}
            >
              Existe una versión original de ti<br />esperando ser recordada.
            </motion.p>
          )}

          {/* FASE 2 — GENORA HEALING */}
          {phase === 2 && (
            <motion.div
              key="fase2"
              variants={phaseVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ textAlign: "center" }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                  fontWeight: 300,
                  color: white,
                  lineHeight: 1,
                  margin: 0,
                  letterSpacing: "0.12em",
                  textShadow: `0 0 60px rgba(212,185,106,0.55), 0 2px 32px rgba(2,6,23,0.6)`,
                }}
              >
                GENORA
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1.1rem, 2.8vw, 2.1rem)",
                  fontWeight: 300,
                  color: gold,
                  letterSpacing: "0.35em",
                  margin: "0.4rem 0 0",
                  textShadow: `0 0 40px rgba(212,185,106,0.6)`,
                }}
              >
                HEALING
              </p>
            </motion.div>
          )}

          {/* FASE 3 — Sistema Maestro */}
          {phase === 3 && (
            <motion.div
              key="fase3"
              variants={phaseVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ textAlign: "center" }}
            >
              <p
                style={{
                  fontFamily: "'League Spartan', 'Rajdhani', sans-serif",
                  fontSize: "clamp(0.65rem, 1.4vw, 0.9rem)",
                  fontWeight: 700,
                  color: gold,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  lineHeight: 1.8,
                  textShadow: `0 0 30px rgba(212,185,106,0.5)`,
                }}
              >
                Sistema Maestro de<br />Recalibración Consciente™
              </p>
            </motion.div>
          )}

          {/* FASE 4 — Frase de cierre + scroll hint */}
          {phase === 4 && (
            <motion.div
              key="fase4"
              variants={phaseVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1rem, 2.2vw, 1.5rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: white,
                  letterSpacing: "0.02em",
                  lineHeight: 1.65,
                  textShadow: "0 2px 24px rgba(2,6,23,0.65)",
                  maxWidth: "560px",
                }}
              >
                El comienzo de todo lo extraordinario<br />que hay en ti.
              </p>

              {/* Scroll indicator */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  opacity: 0.55,
                  cursor: "pointer",
                }}
                onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
              >
                <span
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.22em",
                    color: white,
                    textTransform: "uppercase",
                  }}
                >
                  Desliza para ingresar al portal
                </span>
                <div
                  style={{
                    width: "1px",
                    height: "2.5rem",
                    background: `linear-gradient(to bottom, ${gold}, transparent)`,
                  }}
                />
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── LOGO GENORA esquina superior izquierda (siempre visible) ── */}
      <div
        style={{
          position: "absolute",
          top: "1.75rem",
          left: "2rem",
          zIndex: 3,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1rem",
          fontWeight: 400,
          color: "rgba(248,250,255,0.7)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        GENORA
      </div>

    </section>
  );
}
