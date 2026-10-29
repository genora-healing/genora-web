import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const gold  = "#D4B96A";
const white = "#F8FAFF";

export default function HeroSection({ videoSrc = "/videos/Video-hook-mini.mp4" }) {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState(1);

  // ── Secuencia de fases por tiempo ──────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 2500);
    const t2 = setTimeout(() => setPhase(3), 5000);
    const t3 = setTimeout(() => setPhase(4), 7500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // ── Efecto scroll: opacidad al bajar ──────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // ── Config compartida AnimatePresence ─────────────────────────
  const fadeBlur = {
    initial:    { opacity: 0, scale: 0.95, filter: "blur(8px)" },
    animate:    { opacity: 1, scale: 1,    filter: "blur(0px)" },
    exit:       { opacity: 0, scale: 0.98, filter: "blur(10px)" },
    transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
  };

  const scrollToNext = () => {
    const next = containerRef.current?.nextElementSibling;
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "88vh",
        minHeight: "88vh",
        overflow: "hidden",
        background: "#020617",
        opacity: scrollOpacity,
      }}
    >
      {/* ── Video de fondo ─────────────────────────────────────── */}
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
            filter: "contrast(1.12) brightness(0.88)",
            display: "block",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* ── Overlay base ───────────────────────────────────────── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        background:
          "linear-gradient(to bottom, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.20) 45%, rgba(2,6,23,0.60) 100%)",
      }} />

      {/* ══════════════════════════════════════════════════════════
          FASE 1 — Expectativa en la Penumbra (0 – 2.5s)
          Frase inicial centrada, serif fino
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            key="phase-1"
            {...fadeBlur}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 2rem",
              textAlign: "center",
            }}
          >
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)",
              fontWeight: 300,
              color: `rgba(248,250,255,0.78)`,
              lineHeight: 1.5,
              maxWidth: "680px",
              letterSpacing: "0.02em",
              textShadow: "0 2px 24px rgba(2,6,23,0.8)",
            }}>
              Existe una versión original de ti<br />esperando ser recordada.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          FASE 2 — Revelación del Origen (2.5s – 5.0s)
          Nombre de marca desde el rayo de luz
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            key="phase-2"
            {...fadeBlur}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 2rem",
            }}
          >
            {/* Línea de luz antes del nombre */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                width: "3rem",
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
                marginBottom: "1.2rem",
                transformOrigin: "center",
              }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 18, letterSpacing: "0.08em" }}
              animate={{ opacity: 1, y: 0,  letterSpacing: "0.18em" }}
              transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                fontWeight: 400,
                color: white,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: 0,
                textShadow: `0 0 30px rgba(212,185,106,0.5), 0 2px 20px rgba(2,6,23,0.6)`,
              }}
            >
              GENORA{" "}
              <span style={{ color: gold }}>HEALING</span>
              <span style={{
                fontSize: "0.45em",
                verticalAlign: "super",
                color: gold,
                letterSpacing: "0.05em",
              }}>™</span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          FASE 3 — Identidad del Sistema (5.0s – 7.5s)
          Concepto maestro
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            key="phase-3"
            {...fadeBlur}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 2rem",
              gap: "1.2rem",
            }}
          >
            {/* Nombre más pequeño arriba */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.65, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                fontWeight: 400,
                color: white,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textShadow: `0 0 20px rgba(212,185,106,0.3)`,
              }}
            >
              GENORA <span style={{ color: gold }}>HEALING™</span>
            </motion.p>

            {/* Divisor */}
            <div style={{
              width: "1px",
              height: "2rem",
              background: `linear-gradient(to bottom, ${gold}44, ${gold}99, ${gold}44)`,
            }} />

            {/* Concepto maestro */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.15em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
              style={{
                fontFamily: "'League Spartan', 'Rajdhani', sans-serif",
                fontSize: "clamp(0.55rem, 1.4vw, 0.78rem)",
                fontWeight: 700,
                color: gold,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                textShadow: `0 0 18px rgba(212,185,106,0.35)`,
                maxWidth: "680px",
              }}
            >
              Sistema Maestro de Recalibración Consciente™
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          FASE 4 — Propósito & Asentamiento Lateral (7.5s+)
          Centro despejado · texto flanqueando el video
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 4 && (
          <motion.div
            key="phase-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0 }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              display: "grid",
              gridTemplateAreas: `
                "top    top    top"
                "left   center right"
                "bottom bottom bottom"
              `,
              gridTemplateRows: "auto 1fr auto",
              gridTemplateColumns: "1fr 38% 1fr",
              padding: "3rem 1.5rem 2.5rem",
            }}
          >
            {/* ── Arriba al centro: concepto maestro ── */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              style={{
                gridArea: "top",
                textAlign: "center",
                padding: "0 1rem 1.5rem",
              }}
            >
              <p style={{
                fontFamily: "'League Spartan', 'Rajdhani', sans-serif",
                fontSize: "clamp(0.5rem, 1.1vw, 0.68rem)",
                fontWeight: 700,
                color: gold,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                textShadow: `0 0 16px rgba(212,185,106,0.4)`,
              }}>
                Sistema Maestro de Recalibración Consciente™
              </p>
            </motion.div>

            {/* ── Izquierda: frase original ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.3 }}
              style={{
                gridArea: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "0 1.5rem 0 0.5rem",
              }}
            >
              <div style={{
                maxWidth: "220px",
                textAlign: "right",
                borderRight: `1px solid rgba(212,185,106,0.25)`,
                paddingRight: "1.2rem",
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(0.78rem, 1.4vw, 1rem)",
                  fontWeight: 300,
                  color: `rgba(248,250,255,0.72)`,
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  textShadow: "0 1px 12px rgba(2,6,23,0.7)",
                }}>
                  "Existe una versión original de ti esperando ser recordada."
                </p>
              </div>
            </motion.div>

            {/* ── Centro: despejado (la hélice de ADN del video) ── */}
            <div style={{ gridArea: "center" }} />

            {/* ── Derecha: propósito ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.3 }}
              style={{
                gridArea: "right",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "0 0.5rem 0 1.5rem",
              }}
            >
              <div style={{
                maxWidth: "220px",
                textAlign: "left",
                borderLeft: `1px solid rgba(212,185,106,0.25)`,
                paddingLeft: "1.2rem",
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(0.78rem, 1.4vw, 1rem)",
                  fontWeight: 300,
                  color: `rgba(248,250,255,0.72)`,
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  textShadow: "0 1px 12px rgba(2,6,23,0.7)",
                }}>
                  "Restaurando la coherencia entre tu cuerpo y tu campo energético de información."
                </p>
              </div>
            </motion.div>

            {/* ── Abajo al centro: indicador de scroll ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              onClick={scrollToNext}
              style={{
                gridArea: "bottom",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.6rem",
                cursor: "pointer",
                paddingTop: "1rem",
              }}
            >
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  color: `rgba(212,185,106,0.75)`,
                  textTransform: "uppercase",
                }}
              >
                ↓ Desliza para ingresar al portal
              </motion.p>

              {/* Línea de pulso */}
              <div style={{ position: "relative", width: "1px", height: "36px" }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: `rgba(212,185,106,0.18)`,
                  width: "1px",
                }} />
                <motion.div
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute", top: 0, left: 0,
                    width: "1px", height: "100%",
                    background: `linear-gradient(to bottom, ${gold}, transparent)`,
                    transformOrigin: "top",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

