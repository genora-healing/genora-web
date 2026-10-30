// GENORA · ProblemAndWorkshopsSection · V1
// 100 % inline styles — Tailwind NO está configurado en este proyecto
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
 
const gold  = "#D4B96A";
const white = "#F8FAFF";
const navy  = "#020617";
 
// ── Utilitario: revela líneas al entrar en viewport ──────────────────
function FadeIn({ children, delay = 0, y = 22 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
 
// ── Separador de luz ──────────────────────────────────────────────────
function GoldLine({ width = "48px", mb = "2rem", mt = "0" }) {
  return (
    <div style={{
      width, height: "1px",
      background: `linear-gradient(to right, transparent, ${gold}, transparent)`,
      marginBottom: mb, marginTop: mt,
    }} />
  );
}
 
// ════════════════════════════════════════════════════════════════════════
//  SECCIÓN 1 — EL ORIGEN DE LA MEMORIA ANCESTRAL
// ════════════════════════════════════════════════════════════════════════
function OriginSection() {
  const sectionRef = useRef(null);
 
  return (
    <section
      ref={sectionRef}
      style={{
        background: navy,
        position: "relative",
        overflow: "hidden",
        padding: "0 0 7rem 0",
      }}
    >
      {/* Halo de fondo — luz tenue central */}
      <div style={{
        position: "absolute",
        top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "min(900px, 120vw)", height: "600px",
        background: `radial-gradient(ellipse at center,
          rgba(212,185,106,0.06) 0%,
          rgba(6,22,70,0.12) 40%,
          transparent 70%)`,
        pointerEvents: "none",
      }} />
 
      {/* Grid 2 columnas */}
      <div style={{
        maxWidth: "1180px",
        margin: "0 auto",
        padding: "0 2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
        gap: "4rem",
        alignItems: "start",
      }}>
 
        {/* ── COLUMNA IZQUIERDA — Tarjeta cristalina sticky ── */}
        <div style={{ position: "sticky", top: "8rem", alignSelf: "start" }}>
          <FadeIn delay={0.1}>
            <div style={{
              background: "rgba(6,18,52,0.55)",
              border: `1px solid rgba(212,185,106,0.20)`,
              borderRadius: "1.5rem",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              overflow: "hidden",
              position: "relative",
              aspectRatio: "4/5",
              minHeight: "380px",
            }}>
              {/* Imagen de fondo — luz fotónica */}
              <div style={{
                position: "absolute", inset: 0,
                background: `
                  radial-gradient(ellipse at 30% 40%, rgba(212,185,106,0.18) 0%, transparent 55%),
                  radial-gradient(ellipse at 70% 70%, rgba(32,80,180,0.22) 0%, transparent 50%),
                  linear-gradient(160deg, #030c2a 0%, #061236 50%, #020617 100%)
                `,
              }} />
 
              {/* Partículas decorativas */}
              {[
                { top:"18%", left:"22%", size:"3px", opacity:0.7, delay:0 },
                { top:"42%", left:"68%", size:"2px", opacity:0.5, delay:0.8 },
                { top:"66%", left:"35%", size:"4px", opacity:0.6, delay:1.4 },
                { top:"28%", left:"78%", size:"2px", opacity:0.4, delay:0.4 },
                { top:"76%", left:"62%", size:"3px", opacity:0.55, delay:1.0 },
              ].map((p, i) => (
                <motion.div key={i}
                  animate={{ opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4] }}
                  transition={{ duration: 2.8 + i * 0.4, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: p.top, left: p.left,
                    width: p.size, height: p.size,
                    borderRadius: "50%",
                    background: gold,
                    boxShadow: `0 0 ${parseInt(p.size) * 3}px ${gold}`,
                  }}
                />
              ))}
 
              {/* Línea de luz central */}
              <motion.div
                animate={{ opacity: [0.15, 0.45, 0.15], scaleY: [0.9, 1.05, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: "10%", bottom: "10%",
                  left: "50%", transform: "translateX(-50%)",
                  width: "1px",
                  background: `linear-gradient(to bottom, transparent, ${gold}, transparent)`,
                }}
              />
 
              {/* Badge inferior */}
              <div style={{
                position: "absolute", bottom: "1.8rem", left: "1.8rem", right: "1.8rem",
                background: "rgba(2,6,23,0.70)",
                border: `1px solid rgba(212,185,106,0.18)`,
                borderRadius: "0.75rem",
                backdropFilter: "blur(10px)",
                padding: "1rem 1.4rem",
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
                  fontWeight: 300, fontStyle: "italic",
                  color: `rgba(248,250,255,0.75)`,
                  margin: 0, lineHeight: 1.6,
                }}>
                  "La biología guarda el relato del linaje.<br />
                  Tú eres el punto donde la historia puede cambiar."
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
 
        {/* ── COLUMNA DERECHA — Narrativa gradual ── */}
        <div style={{
          display: "flex", flexDirection: "column",
          gap: "2rem",
          paddingTop: "6rem",
          paddingBottom: "2rem",
        }}>
          {/* Badge superior */}
          <FadeIn delay={0.05}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.75rem",
            }}>
              <div style={{ width: "28px", height: "1px", background: gold, opacity: 0.6 }} />
              <span style={{
                fontFamily: "'League Spartan', 'Rajdhani', sans-serif",
                fontSize: "clamp(0.55rem, 1.1vw, 0.68rem)",
                fontWeight: 700, color: gold,
                letterSpacing: "0.35em", textTransform: "uppercase",
              }}>
                EL ORIGEN DE LA DISTORSIÓN
              </span>
              <div style={{ width: "28px", height: "1px", background: gold, opacity: 0.6 }} />
            </div>
          </FadeIn>
 
          {/* Titular */}
          <FadeIn delay={0.15}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 300,
              color: white,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              margin: 0,
            }}>
              Tu cuerpo recuerda lo que tus ancestros{" "}
              <em style={{ fontStyle: "italic", color: `rgba(212,185,106,0.90)` }}>
                no pudieron sanar.
              </em>
            </h2>
          </FadeIn>
 
          <FadeIn delay={0.22}>
            <GoldLine width="64px" />
          </FadeIn>
 
          {/* Párrafo principal */}
          <FadeIn delay={0.28}>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.1rem, 1.9vw, 1.3rem)",
              fontWeight: 300,
              color: `rgba(248,250,255,0.80)`,
              lineHeight: 1.85,
              margin: 0,
              maxWidth: "560px",
            }}>
              Hay patrones que vuelven sin importar cuánto trabajes en ti: el
              dinero que llega y no se queda, la relación que vuelve a doler,
              o el momento en que no te reconoces con amor. No es falta de
              voluntad: es que el origen está en la{" "}
              <span style={{ color: `rgba(212,185,106,0.90)`, fontStyle: "italic" }}>
                memoria de tu linaje.
              </span>
            </p>
          </FadeIn>
 
          {/* Puntos de evidencia */}
          <FadeIn delay={0.36}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                "Patrones de escasez que se repiten generación tras generación",
                "Vínculos afectivos que duelen del mismo modo que dolieron antes",
                "Una fatiga que no tiene nombre pero que el cuerpo conoce bien",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{
                    flexShrink: 0,
                    width: "6px", height: "6px",
                    borderRadius: "50%",
                    background: gold,
                    marginTop: "0.55rem",
                    boxShadow: `0 0 8px ${gold}`,
                  }} />
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(1rem, 1.7vw, 1.15rem)",
                    fontWeight: 300,
                    color: `rgba(248,250,255,0.68)`,
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
 
          {/* Cierre */}
          <FadeIn delay={0.45}>
            <div style={{
              borderLeft: `2px solid rgba(212,185,106,0.35)`,
              paddingLeft: "1.5rem",
              marginTop: "0.5rem",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.1rem, 1.9vw, 1.3rem)",
                fontWeight: 400, fontStyle: "italic",
                color: `rgba(212,185,106,0.88)`,
                lineHeight: 1.75,
                margin: 0,
              }}>
                El Método GENORA trabaja en la raíz. Cuando sanas la
                información, la superficie se transforma sola.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
 
// ════════════════════════════════════════════════════════════════════════
//  SECCIÓN 2 — TALLERES DE MICROAPRENDIZAJE
// ════════════════════════════════════════════════════════════════════════
const WORKSHOPS = [
  {
    id: "reprogramacion-ancestral",
    badge: "Microaprendizaje · 90 min",
    badgeColor: gold,
    title: "Reprogramación de la Matriz Ancestral",
    subtitle: "Escasez y Relaciones",
    description:
      "Accede a las memorias de linaje que sostienen los patrones de escasez y los ciclos relacionales dolorosos. Usa frecuencias y protocolos bioelectrónicos para soltar lo heredado.",
    modules: ["Memoria epigenética", "Linajes emocionales", "Protocolos de soltura"],
    gradient: "linear-gradient(145deg, #07142e 0%, #0d1f4a 60%, #061030 100%)",
    accent: "rgba(212,185,106,0.25)",
    route: "/learning/reprogramacion-ancestral",
  },
  {
    id: "bioelectrogenesis",
    badge: "Activación Práctica",
    badgeColor: "#7EC8E3",
    title: "Bioelectrogénesis y Frecuencias",
    subtitle: "Ajuste Vibracional",
    description:
      "Tu cuerpo emite y recibe campos electromagnéticos. Aprende a leer, ajustar y amplificar tu señal bioeléctrica para alinear tu campo con los estados de salud y coherencia.",
    modules: ["Campo bioeléctrico", "Frecuencias terapéuticas", "Coherencia cardíaca"],
    gradient: "linear-gradient(145deg, #061830 0%, #0a2244 60%, #041228 100%)",
    accent: "rgba(126,200,227,0.22)",
    route: "/learning/bioelectrogenesis",
  },
  {
    id: "cristales",
    badge: "Tecnología Sagrada",
    badgeColor: "#C9A0DC",
    title: "Arquitectura de Cristales y Campo Fotónico",
    subtitle: "Amplificación de Luz",
    description:
      "Los cristales de cuarzo son antenas de coherencia fotónica. Aprende a trabajar con su geometría sagrada para amplificar los procesos de recalibración de tu campo.",
    modules: ["Geometría fotónica", "Rejillas de cristal", "Amplificación cuántica"],
    gradient: "linear-gradient(145deg, #0e0720 0%, #1a0a35 60%, #080418 100%)",
    accent: "rgba(201,160,220,0.22)",
    route: "/learning/cristales",
  },
];
 
function WorkshopCard({ workshop, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
 
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.025, y: -5 }}
      onClick={() => navigate(workshop.route)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: workshop.gradient,
        border: `1px solid ${hovered ? "rgba(212,185,106,0.40)" : "rgba(212,185,106,0.14)"}`,
        borderRadius: "1.4rem",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transition: "border-color 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Halo interior */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse at 50% 0%, ${workshop.accent} 0%, transparent 65%)`,
        }}
      />
 
      {/* Zona visual superior */}
      <div style={{
        height: "180px", position: "relative", overflow: "hidden",
        background: workshop.gradient,
      }}>
        {/* Orbe de luz */}
        <motion.div
          animate={hovered
            ? { scale: 1.15, opacity: 0.55 }
            : { scale: 1,    opacity: 0.30 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px", height: "200px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${workshop.accent.replace("0.22", "0.6")} 0%, transparent 70%)`,
          }}
        />
        {/* Partículas */}
        {[...Array(5)].map((_, i) => (
          <motion.div key={i}
            animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -6, 0] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.5 }}
            style={{
              position: "absolute",
              top: `${20 + i * 14}%`,
              left: `${15 + i * 16}%`,
              width: i % 2 === 0 ? "3px" : "2px",
              height: i % 2 === 0 ? "3px" : "2px",
              borderRadius: "50%",
              background: workshop.badgeColor,
              boxShadow: `0 0 6px ${workshop.badgeColor}`,
            }}
          />
        ))}
        {/* Badge */}
        <div style={{
          position: "absolute", top: "1.2rem", left: "1.2rem",
          background: "rgba(2,6,23,0.72)",
          border: `1px solid rgba(212,185,106,0.20)`,
          borderRadius: "2rem",
          padding: "0.28rem 0.85rem",
          backdropFilter: "blur(8px)",
        }}>
          <span style={{
            fontFamily: "'League Spartan', 'Rajdhani', sans-serif",
            fontSize: "0.58rem", fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: workshop.badgeColor,
          }}>
            {workshop.badge}
          </span>
        </div>
      </div>
 
      {/* Contenido */}
      <div style={{ padding: "1.6rem 1.8rem 2rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
        <div>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.2rem, 1.8vw, 1.4rem)",
            fontWeight: 600, color: white,
            lineHeight: 1.3, margin: 0,
          }}>
            {workshop.title}
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
            fontWeight: 300, fontStyle: "italic",
            color: `rgba(212,185,106,0.75)`,
            margin: "0.2rem 0 0 0",
          }}>
            {workshop.subtitle}
          </p>
        </div>
 
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
          fontWeight: 300,
          color: `rgba(248,250,255,0.68)`,
          lineHeight: 1.7, margin: 0, flex: 1,
        }}>
          {workshop.description}
        </p>
 
        {/* Chips de módulos */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {workshop.modules.map((m, i) => (
            <span key={i} style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: "0.62rem", fontWeight: 600,
              letterSpacing: "0.10em", textTransform: "uppercase",
              color: `rgba(212,185,106,0.80)`,
              background: "rgba(212,185,106,0.08)",
              border: "1px solid rgba(212,185,106,0.18)",
              borderRadius: "2rem",
              padding: "0.22rem 0.75rem",
            }}>
              {m}
            </span>
          ))}
        </div>
 
        {/* CTA individual */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
          transition={{ duration: 0.3 }}
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            paddingTop: "0.3rem",
          }}
        >
          <span style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: "0.68rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: gold,
          }}>
            Ver taller
          </span>
          <span style={{ color: gold, fontSize: "0.9rem" }}>→</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
 
function WorkshopsSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: "-80px 0px" });
  const navigate = useNavigate();
 
  return (
    <section style={{
      background: `linear-gradient(to bottom, ${navy} 0%, #040e28 100%)`,
      padding: "6rem 0 8rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Halo superior de transición */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", height: "320px",
        background: `radial-gradient(ellipse at center top, rgba(212,185,106,0.05) 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />
 
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 2rem" }}>
 
        {/* Header */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}
          >
            <div style={{ width: "32px", height: "1px", background: gold, opacity: 0.5 }} />
            <span style={{
              fontFamily: "'League Spartan', 'Rajdhani', sans-serif",
              fontSize: "clamp(0.55rem, 1.1vw, 0.68rem)",
              fontWeight: 700, color: gold,
              letterSpacing: "0.35em", textTransform: "uppercase",
            }}>
              ACADEMIA DE MICROAPRENDIZAJE
            </span>
            <div style={{ width: "32px", height: "1px", background: gold, opacity: 0.5 }} />
          </motion.div>
 
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300, color: white,
              lineHeight: 1.3, margin: "0 auto 1.2rem",
              maxWidth: "680px",
            }}
          >
            Talleres para transformar lo que{" "}
            <em style={{ color: `rgba(212,185,106,0.88)` }}>la información heredada</em>{" "}
            instaló en ti.
          </motion.h2>
 
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1rem, 1.7vw, 1.15rem)",
              fontWeight: 300,
              color: `rgba(248,250,255,0.60)`,
              lineHeight: 1.75, margin: "0 auto",
              maxWidth: "540px",
            }}
          >
            Cada taller es una experiencia de 60 a 90 minutos diseñada para
            trabajar un nodo específico de tu campo de información.
          </motion.p>
        </div>
 
        {/* Grid de tarjetas */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "1.8rem",
          marginBottom: "4rem",
        }}>
          {WORKSHOPS.map((w, i) => (
            <WorkshopCard key={w.id} workshop={w} index={i} />
          ))}
        </div>
 
        {/* CTA principal */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FadeIn delay={0.3}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/learning")}
              style={{
                fontFamily: "'League Spartan', 'Rajdhani', sans-serif",
                fontSize: "clamp(0.75rem, 1.3vw, 0.88rem)",
                fontWeight: 700,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: gold,
                background: "transparent",
                border: `1px solid rgba(212,185,106,0.45)`,
                borderRadius: "3rem",
                padding: "1rem 2.6rem",
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: "0.75rem",
                transition: "background 0.3s, border-color 0.3s",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(212,185,106,0.08)";
                e.currentTarget.style.borderColor = "rgba(212,185,106,0.75)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(212,185,106,0.45)";
              }}
            >
              <span>+ Explorar la Academia Completa de Microaprendizaje</span>
              <span style={{ fontSize: "1rem", opacity: 0.8 }}>→</span>
            </motion.button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
 
// ════════════════════════════════════════════════════════════════════════
//  EXPORT — Ambas secciones unidas
// ════════════════════════════════════════════════════════════════════════
export default function ProblemAndWorkshopsSection() {
  return (
    <>
      <OriginSection />
      <WorkshopsSection />
    </>
  );
}
 
