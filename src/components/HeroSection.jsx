// VERCEL_FORCE_UPDATE_V7
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const gold  = "#D4B96A";
const white = "#F8FAFF";

// ── Revela letras una a una desde el centro ───────────────────────
function LetterReveal({ text, style, stagger = 0.045, initialDelay = 0 }) {
  return (
    <span style={{ display: "inline-block", ...style }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: initialDelay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

// ── Revela palabras una a una ─────────────────────────────────────
function WordReveal({ text, style, stagger = 0.12, initialDelay = 0 }) {
  return (
    <span style={{ display: "inline", ...style }}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: initialDelay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", marginRight: "0.3em" }}
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
  const [phase, setPhase] = useState(1);
  const timersRef = useRef([]);

  // Duración total del video ≈ 15s → fases más largas para que se lean bien
  // Fase 1: 0–4s   Fase 2: 4–8s   Fase 3: 8–12s   Fase 4: 12–16s   Fase 5: 16s+
  const startSequence = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setPhase(1);
    timersRef.current.push(setTimeout(() => setPhase(2), 4000));
    timersRef.current.push(setTimeout(() => setPhase(3), 8000));
    timersRef.current.push(setTimeout(() => setPhase(4), 12000));
    timersRef.current.push(setTimeout(() => setPhase(5), 16000));
  }, []);

  useEffect(() => {
    startSequence();
    return () => timersRef.current.forEach(clearTimeout);
  }, [startSequence]);

  // Video: pausa en último frame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      if (video.duration && video.currentTime >= video.duration - 0.12) video.pause();
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  // Scroll: reinicia al volver al tope
  useEffect(() => {
    let wasAway = false;
    const onScroll = () => {
      if (window.scrollY > 80) wasAway = true;
      if (wasAway && window.scrollY === 0) {
        wasAway = false;
        const v = videoRef.current;
        if (v) { v.currentTime = 0; v.play().catch(() => {}); }
        startSequence();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [startSequence]);

  // Scroll-driven opacity
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToNext = () => {
    containerRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  };

  // Transición de salida compartida
  const exit = { opacity: 0, filter: "blur(14px)", transition: { duration: 0.9 } };

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
      {/* objectPosition "center 68%" baja el encuadre para ver el pasillo
          completo y la figura femenina caminando hacia la luz             */}
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
            objectPosition: "center 68%",
            display: "block",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Overlay suave — solo bordes, centro libre */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(2,6,23,0.40) 0%, rgba(2,6,23,0.04) 35%, rgba(2,6,23,0.04) 65%, rgba(2,6,23,0.50) 100%)",
      }} />

      {/* ══════════════════════════════════════════════════════════
          FASE 1 (0 – 4s) — Frase inicial, palabra por palabra
          Texto grande y legible sobre la penumbra inicial
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div key="p1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={exit} transition={{ duration: 0.6 }}
            style={{
              position: "absolute", inset: 0, zIndex: 20,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "0 2.5rem", textAlign: "center",
            }}
          >
            {/* Línea de luz */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.5 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{
                width: "1px", height: "2.5rem",
                background: `linear-gradient(to bottom, transparent, ${gold}, transparent)`,
                marginBottom: "1.6rem", transformOrigin: "top",
              }}
            />
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
              fontWeight: 300,
              color: "rgba(248,250,255,0.88)",
              lineHeight: 1.7,
              maxWidth: "680px",
              letterSpacing: "0.02em",
              textShadow: "0 2px 36px rgba(2,6,23,0.95)",
              margin: 0,
            }}>
              <WordReveal text="Existe una versión original de ti" stagger={0.13} initialDelay={0.4} />
              <br />
              <WordReveal text="esperando ser recordada." stagger={0.13} initialDelay={1.3} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          FASE 2 (4 – 8s) — GENORA HEALING letra a letra
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div key="p2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={exit} transition={{ duration: 0.4 }}
            style={{
              position: "absolute", inset: 0, zIndex: 20,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              textAlign: "center", padding: "0 2rem", gap: "0.6rem",
            }}
          >
            {/* Halo fotónico que expande desde el rayo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 0.22, 0], scale: [0.3, 2.8, 3.5] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: "360px", height: "360px", borderRadius: "50%",
                background: `radial-gradient(circle, rgba(212,185,106,0.20) 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
            {/* GENORA */}
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(3rem, 8.5vw, 7rem)",
              fontWeight: 700, color: white,
              letterSpacing: "0.24em", textTransform: "uppercase", lineHeight: 1,
              textShadow: `0 0 55px rgba(212,185,106,0.50), 0 0 22px rgba(212,185,106,0.28)`,
            }}>
              <LetterReveal text="GENORA" stagger={0.058} initialDelay={0.18} />
            </div>
            {/* HEALING */}
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.6rem, 4.2vw, 3.4rem)",
              fontWeight: 300, color: gold,
              letterSpacing: "0.60em", textTransform: "uppercase", lineHeight: 1,
              textShadow: `0 0 32px rgba(212,185,106,0.55)`,
            }}>
              <LetterReveal text="HEALING" stagger={0.070} initialDelay={0.65} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          FASE 3 (8 – 12s) — Sistema Maestro, letra a letra, grande
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div key="p3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={exit} transition={{ duration: 0.5 }}
            style={{
              position: "absolute", inset: 0, zIndex: 20,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              textAlign: "center", padding: "0 3rem", gap: "1rem",
            }}
          >
            {/* Línea 1 — más grande, todo dorado, sin líneas decorativas */}
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)",
              fontWeight: 600, color: gold,
              letterSpacing: "0.12em", textTransform: "uppercase",
              textShadow: `0 0 40px rgba(212,185,106,0.70), 0 2px 12px rgba(0,0,0,0.8)`,
              lineHeight: 1.2,
            }}>
              <LetterReveal text="EL SISTEMA MAESTRO DE" stagger={0.028} initialDelay={0.2} />
            </div>
            {/* Línea 2 */}
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)",
              fontWeight: 600, color: gold,
              letterSpacing: "0.12em", textTransform: "uppercase",
              textShadow: `0 0 40px rgba(212,185,106,0.70), 0 2px 12px rgba(0,0,0,0.8)`,
              lineHeight: 1.2,
            }}>
              <LetterReveal text="ACTIVACIÓN GENÉTICA" stagger={0.032} initialDelay={0.85} />
            </div>
            {/* Línea 3 — subtítulo en dorado más suave */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.7 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1rem, 2vw, 1.4rem)",
                fontWeight: 300, fontStyle: "italic",
                color: "rgba(212,185,106,0.82)",
                letterSpacing: "0.04em",
                maxWidth: "580px", lineHeight: 1.7,
                textShadow: `0 0 28px rgba(212,185,106,0.40), 0 2px 10px rgba(0,0,0,0.7)`,
                margin: 0,
              }}
            >
              que une la ciencia vibracional con la evolución<br />de tu campo humano.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          FASE 4 (12 – 16s) — Centro vacío, ADN en su esplendor
          Solo scroll indicator muy sutil en la parte inferior
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 4 && (
          <motion.div key="p4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={exit} transition={{ duration: 1.0 }}
            style={{
              position: "absolute", inset: 0, zIndex: 20,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "flex-end",
              paddingBottom: "2.4rem",
            }}
          >
            {/* Scroll indicator — muy sutil, sin texto, solo pulso */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              onClick={scrollToNext}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
            >
              <div style={{ position: "relative", width: "1px", height: "44px" }}>
                <div style={{ position: "absolute", inset: 0, width: "1px", background: "rgba(212,185,106,0.12)" }} />
                <motion.div
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
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

      {/* ══════════════════════════════════════════════════════════
          FASE 5 (16s+) — Frase final de cierre, palabra por palabra
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 5 && (
          <motion.div key="p5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.0 }}
            style={{
              position: "absolute", inset: 0, zIndex: 20,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "0 2.5rem", textAlign: "center", gap: "2rem",
            }}
          >
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.5rem, 3.2vw, 2.4rem)",
              fontWeight: 300, fontStyle: "italic",
              color: "#1a3a6b",
              lineHeight: 1.65, maxWidth: "620px",
              letterSpacing: "0.025em",
              textShadow: "0 2px 24px rgba(26,58,107,0.25)",
              margin: 0,
            }}>
              <WordReveal text="El comienzo de todo lo extraordinario" stagger={0.13} initialDelay={0.3} />
              <br />
              <WordReveal text="que hay en ti." stagger={0.14} initialDelay={1.25} />
            </p>

            {/* Scroll indicator con texto — solo aparece en la fase final */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 2.2 }}
              onClick={scrollToNext}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.7rem", cursor: "pointer" }}
            >
              <motion.p
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.58rem", fontWeight: 600,
                  letterSpacing: "0.30em", color: `rgba(212,185,106,0.78)`,
                  textTransform: "uppercase", margin: 0,
                }}
              >
                ↓ Desliza para ingresar al portal
              </motion.p>
              <div style={{ position: "relative", width: "1px", height: "38px" }}>
                <div style={{ position: "absolute", inset: 0, width: "1px", background: "rgba(212,185,106,0.14)" }} />
                <motion.div
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute", top: 0, left: 0, width: "1px", height: "100%",
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

