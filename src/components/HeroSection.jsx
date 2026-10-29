// VERCEL_FORCE_UPDATE_V5
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const gold  = "#D4B96A";
const white = "#F8FAFF";

// ── Componente: revela texto letra a letra desde el centro ────────
function LetterReveal({ text, style, stagger = 0.045, initialDelay = 0 }) {
  const letters = text.split("");
  return (
    <span style={{ display: "inline-block", ...style }}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: initialDelay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

// ── Componente: frase que entra palabra por palabra ───────────────
function WordReveal({ text, style, stagger = 0.12, initialDelay = 0 }) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline", ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            delay: initialDelay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection({ videoSrc = "/videos/Video-hook-mini.mp4" }) {
  const containerRef = useRef(null);
  const videoRef     = useRef(null);
  const [phase, setPhase]   = useState(1);
  const timersRef = useRef([]);

  // ── Inicia la secuencia de fases ──────────────────────────────
  const startSequence = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setPhase(1);
    timersRef.current.push(setTimeout(() => setPhase(2), 2600));
    timersRef.current.push(setTimeout(() => setPhase(3), 5200));
    timersRef.current.push(setTimeout(() => setPhase(4), 7800));
  }, []);

  useEffect(() => {
    startSequence();
    return () => timersRef.current.forEach(clearTimeout);
  }, [startSequence]);

  // ── Video: pausa en último frame ──────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.1) {
        video.pause();
      }
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  // ── Scroll: reinicia todo al volver al tope ───────────────────
  useEffect(() => {
    let wasAway = false;
    const handleScroll = () => {
      if (window.scrollY > 80) wasAway = true;
      if (wasAway && window.scrollY === 0) {
        wasAway = false;
        const video = videoRef.current;
        if (video) { video.currentTime = 0; video.play().catch(() => {}); }
        startSequence();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startSequence]);

  // ── Scroll-driven opacity ─────────────────────────────────────
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

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
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#020617",
        opacity: scrollOpacity,
      }}
    >
      {/* ── Video de fondo ─────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* ── Overlay suave en bordes ───────────────────────────── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        background: "linear-gradient(to bottom, rgba(2,6,23,0.42) 0%, rgba(2,6,23,0.06) 38%, rgba(2,6,23,0.06) 62%, rgba(2,6,23,0.52) 100%)",
        pointerEvents: "none",
      }} />

      {/* ══════════════════════════════════════════════════════════
          FASE 1 (0 – 2.6s) — Frase inicial, palabras una a una
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            key="phase-1"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(14px)", transition: { duration: 0.8 } }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 2.5rem",
              textAlign: "center",
            }}
          >
            {/* Línea de luz que pulsa antes de la frase */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: [0, 0.6, 0.3] }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                width: "1px",
                height: "3rem",
                background: `linear-gradient(to bottom, transparent, rgba(212,185,106,0.6), transparent)`,
                marginBottom: "1.4rem",
                transformOrigin: "top",
              }}
            />

            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.3rem, 3vw, 2.1rem)",
              fontWeight: 300,
              color: "rgba(248,250,255,0.82)",
              lineHeight: 1.65,
              maxWidth: "640px",
              letterSpacing: "0.02em",
              textShadow: "0 2px 32px rgba(2,6,23,0.9)",
              margin: 0,
            }}>
              <WordReveal
                text="Existe una versión original de ti"
                stagger={0.10}
                initialDelay={0.3}
              />
              <br />
              <WordReveal
                text="esperando ser recordada."
                stagger={0.10}
                initialDelay={0.95}
              />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          FASE 2 (2.6s – 5.2s) — GENORA HEALING letra a letra
          Las letras emergen desde el rayo de luz central
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            key="phase-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(16px)", scale: 1.02, transition: { duration: 0.75 } }}
            transition={{ duration: 0.3 }}
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
              gap: "0.5rem",
            }}
          >
            {/* Resplandor central que expande antes de las letras */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.25, 0], scale: [0.4, 2.5, 3] }}
              transition={{ duration: 1.0, delay: 0, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: "320px",
                height: "320px",
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(212,185,106,0.22) 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            {/* GENORA — letras de izquierda a derecha */}
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.6rem, 7.5vw, 6rem)",
              fontWeight: 700,
              color: white,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              lineHeight: 1,
              textShadow: `0 0 50px rgba(212,185,106,0.45), 0 0 20px rgba(212,185,106,0.25)`,
            }}>
              <LetterReveal text="GENORA" stagger={0.055} initialDelay={0.15} />
            </div>

            {/* HEALING — letras en dorado, stagger más lento */}
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              fontWeight: 300,
              color: gold,
              letterSpacing: "0.55em",
              textTransform: "uppercase",
              lineHeight: 1,
              textShadow: `0 0 30px rgba(212,185,106,0.5)`,
            }}>
              <LetterReveal text="HEALING" stagger={0.065} initialDelay={0.55} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          FASE 3 (5.2s – 7.8s) — SISTEMA MAESTRO letra a letra
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            key="phase-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(14px)", transition: { duration: 0.75 } }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 3rem",
              gap: "0.8rem",
            }}
          >
            {/* Línea dorada que crece desde el centro */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                width: "5rem",
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
                marginBottom: "0.5rem",
                transformOrigin: "center",
              }}
            />

            {/* SISTEMA MAESTRO DE — primera línea */}
            <div style={{
              fontFamily: "'League Spartan', 'Rajdhani', sans-serif",
              fontSize: "clamp(0.5rem, 1.2vw, 0.75rem)",
              fontWeight: 700,
              color: gold,
              letterSpacing: "0.40em",
              textTransform: "uppercase",
              textShadow: `0 0 20px rgba(212,185,106,0.5)`,
            }}>
              <LetterReveal text="SISTEMA MAESTRO DE" stagger={0.028} initialDelay={0.2} />
            </div>

            {/* RECALIBRACIÓN CONSCIENTE™ — segunda línea */}
            <div style={{
              fontFamily: "'League Spartan', 'Rajdhani', sans-serif",
              fontSize: "clamp(0.5rem, 1.2vw, 0.75rem)",
              fontWeight: 700,
              color: gold,
              letterSpacing: "0.40em",
              textTransform: "uppercase",
              textShadow: `0 0 20px rgba(212,185,106,0.5)`,
            }}>
              <LetterReveal text="RECALIBRACIÓN CONSCIENTE™" stagger={0.028} initialDelay={0.75} />
            </div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              style={{
                width: "5rem",
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
                marginTop: "0.5rem",
                transformOrigin: "center",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          FASE 4 (7.8s+) — Reposo: solo scroll indicator
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 4 && (
          <motion.div
            key="phase-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: "2.8rem",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              onClick={scrollToNext}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.7rem",
                cursor: "pointer",
              }}
            >
              <motion.p
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 600,
                  letterSpacing: "0.30em",
                  color: `rgba(212,185,106,0.82)`,
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                ↓ Desliza para ingresar al portal
              </motion.p>

              <div style={{ position: "relative", width: "1px", height: "40px" }}>
                <div style={{ position: "absolute", inset: 0, width: "1px", background: `rgba(212,185,106,0.14)` }} />
                <motion.div
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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

