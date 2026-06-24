import { useState, useEffect, useRef } from "react";

// ─── PALETA GENORA ───────────────────────────────────────────────
const C = {
  navy:    "#040d18",
  navyMid: "#0a1628",
  navyCard:"#0d1f35",
  cyan:    "#00d4ff",
  cyanDim: "#00a8cc",
  gold:    "#c9a84c",
  goldDim: "#a8892f",
  white:   "#f0f4ff",
  gray:    "#8090a8",
  grayDim: "#4a5568",
};

// ─── ESTILOS BASE ────────────────────────────────────────────────
const base = {
  fontFamily: "'Rajdhani', 'Cormorant Garamond', Georgia, serif",
};

// ─── HOOK: INTERSECTION OBSERVER ─────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── COMPONENTE: FADE WRAPPER ────────────────────────────────────
function Fade({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── COMPONENTE: LABEL CYAN ───────────────────────────────────────
function Label({ children }) {
  return (
    <p style={{
      fontFamily: "'Rajdhani', sans-serif",
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: "0.25em",
      color: C.cyan,
      textTransform: "uppercase",
      marginBottom: "1rem",
    }}>{children}</p>
  );
}

// ─── COMPONENTE: DIVISOR ─────────────────────────────────────────
function Divider() {
  return (
    <div style={{
      width: "3rem",
      height: "2px",
      background: `linear-gradient(90deg, ${C.cyan}, transparent)`,
      margin: "1.5rem 0",
    }} />
  );
}

// ─── COMPONENTE: CARD ─────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, rgba(13,31,53,0.9) 0%, rgba(10,22,40,0.95) 100%)`,
      border: `1px solid rgba(0,212,255,0.12)`,
      borderRadius: "1rem",
      padding: "2rem",
      backdropFilter: "blur(12px)",
      position: "relative",
      ...style,
    }}>
      {/* Acento arquitectónico: esquina superior izquierda */}
      <div style={{
        position: "absolute", top: "-1px", left: "-1px",
        width: "18px", height: "18px",
        borderTop: `1.5px solid ${C.cyan}`,
        borderLeft: `1.5px solid ${C.cyan}`,
        borderTopLeftRadius: "1rem",
        opacity: 0.5,
      }} />
      {children}
    </div>
  );
}

// ─── COMPONENTE: BOTÓN PRIMARIO ───────────────────────────────────
function BtnPrimary({ children, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "inline-block",
        padding: "1rem 2.5rem",
        background: hover
          ? `linear-gradient(135deg, ${C.cyan}, ${C.cyanDim})`
          : "rgba(0,212,255,0.04)",
        border: `1.5px solid ${C.cyan}`,
        borderRadius: "3rem",
        color: hover ? C.navy : C.cyan,
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.85rem",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all 0.35s ease",
        boxShadow: hover
          ? `0 0 36px rgba(0,212,255,0.4), inset 0 0 18px rgba(255,255,255,0.25)`
          : `0 0 18px rgba(0,212,255,0.08)`,
        overflow: "hidden",
      }}
    >
      {children}
    </button>
  );
}

// ─── COMPONENTE: BOTÓN SECUNDARIO ────────────────────────────────
function BtnSecondary({ children, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.85rem 0.25rem",
        background: "transparent",
        border: "none",
        color: hover ? C.white : `rgba(240,244,255,0.6)`,
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.8rem",
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all 0.3s ease",
        borderBottom: `1px solid ${hover ? C.cyan : "rgba(240,244,255,0.2)"}`,
        borderRadius: 0,
      }}
    >
      {children}
    </button>
  );
}

// ════════════════════════════════════════════════════════════════
// SECCIONES
// ════════════════════════════════════════════════════════════════

// S1: HERO
// Esfera de geometría sagrada — "Plantilla del ADN original" en líneas de luz finas
function SacredSphere() {
  const [rotate, setRotate] = useState(0);
  useEffect(() => {
    let raf;
    const tick = () => { setRotate(r => r + 0.08); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "min(420px, 80vw)",
      height: "min(420px, 80vw)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* Resplandor esférico de fondo */}
      <div style={{
        position: "absolute", inset: "-15%",
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(0,212,255,0.16) 0%, rgba(0,212,255,0.04) 45%, transparent 75%)`,
        filter: "blur(2px)",
      }} />
      <div style={{
        position: "absolute", inset: "8%",
        borderRadius: "50%",
        boxShadow: `0 0 80px 10px rgba(0,212,255,0.12), inset 0 0 60px rgba(0,212,255,0.06)`,
      }} />

      <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%", position: "relative", zIndex: 2 }}>
        <defs>
          <radialGradient id="sphereGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={C.cyan} stopOpacity="0.25" />
            <stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.cyan} stopOpacity="0.9" />
            <stop offset="100%" stopColor={C.gold} stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="160" fill="url(#sphereGlow)" />

        {/* Anillos de geometría — elipses rotadas, líneas ultra-finas */}
        <g style={{ transformOrigin: "200px 200px", transform: `rotate(${rotate}deg)` }}>
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <ellipse
              key={deg}
              cx="200" cy="200" rx="150" ry="62"
              fill="none"
              stroke="url(#lineGlow)"
              strokeWidth="0.6"
              opacity="0.55"
              transform={`rotate(${deg} 200 200)`}
            />
          ))}
        </g>

        {/* Anillo contrario, más lento */}
        <g style={{ transformOrigin: "200px 200px", transform: `rotate(${-rotate * 0.6}deg)` }}>
          <circle cx="200" cy="200" r="120" fill="none" stroke={C.cyan} strokeWidth="0.4" opacity="0.35" />
          <circle cx="200" cy="200" r="90" fill="none" stroke={C.gold} strokeWidth="0.4" opacity="0.3" />
        </g>

        {/* Núcleo central — puntos de luz tipo bio-fotones */}
        <circle cx="200" cy="200" r="3" fill={C.cyan} opacity="0.9">
          <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
        </circle>
        {[...Array(8)].map((_, i) => {
          const a = (i / 8) * 2 * Math.PI;
          const r = 145;
          return (
            <circle
              key={i}
              cx={200 + r * Math.cos(a + rotate * 0.02)}
              cy={200 + r * Math.sin(a + rotate * 0.02)}
              r="1.4"
              fill={i % 2 === 0 ? C.cyan : C.gold}
              opacity="0.7"
            />
          );
        })}
      </svg>
    </div>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Fondo: azul noche absoluto + halo sutil */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `radial-gradient(ellipse 70% 60% at 75% 45%, rgba(0,120,180,0.12) 0%, transparent 65%),
                     radial-gradient(ellipse 40% 35% at 10% 85%, rgba(201,168,76,0.04) 0%, transparent 60%),
                     ${C.navy}`,
      }} />

      {/* Layout asimétrico: texto | esfera */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "3rem",
        maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
      }}>
        {/* Columna texto */}
        <div style={{ flex: "1 1 480px", minWidth: "300px", maxWidth: "620px" }}>
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-12px)",
            transition: "all 0.8s ease",
          }}>
            <Label>GENORA HEALING™ · SISTEMA MAESTRO DE RECALIBRACIÓN CONSCIENTE</Label>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.1rem, 5vw, 3.8rem)",
            fontWeight: 400,
            lineHeight: 1.18,
            color: C.white,
            margin: "0 0 1.5rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 0.2s",
            letterSpacing: "-0.01em",
          }}>
            No viniste roto.<br />Viniste programado.<br />
            <em style={{ fontStyle: "italic", color: C.white, fontSize: "0.85em" }}>
              Existe una versión original de ti esperando ser recordada.
            </em>
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
            color: `rgba(240,244,255,0.7)`,
            lineHeight: 1.85,
            maxWidth: "560px",
            margin: "0 0 2.8rem",
            opacity: loaded ? 1 : 0,
            transition: "all 0.9s ease 0.6s",
          }}>
            El potencial humano es mucho mayor de lo que hemos recordado. GENORA acompaña
            procesos de recalibración consciente de códigos que permiten expresar niveles más
            elevados de coherencia, consciencia, creación y expansión. No se trata de convertirse
            en alguien diferente; se trata de recordar lo que siempre estuvo en ti.
          </p>

          <div style={{
            display: "flex", gap: "1rem", flexWrap: "wrap",
            opacity: loaded ? 1 : 0,
            transition: "all 0.9s ease 0.85s",
          }}>
            <BtnPrimary>Descubrir el Método GENORA™</BtnPrimary>
            <BtnSecondary>Acceder al Ecosistema App</BtnSecondary>
          </div>
        </div>

        {/* Columna esfera */}
        <div style={{
          flex: "1 1 380px",
          minWidth: "280px",
          display: "flex",
          justifyContent: "center",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "scale(1)" : "scale(0.92)",
          transition: "all 1.2s ease 0.3s",
        }}>
          <SacredSphere />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        zIndex: 2, opacity: 0.4,
        animation: "bounce 2s ease-in-out infinite",
      }}>
        <div style={{ width: "1px", height: "3rem", background: `linear-gradient(${C.cyan}, transparent)`, margin: "0 auto" }} />
      </div>
    </section>
  );
}

// S2: NO VINISTE ROTO, VINISTE PROGRAMADO
function ElProblema() {
  return (
    <section style={{
      padding: "7rem 1.5rem",
      background: `linear-gradient(180deg, ${C.navy} 0%, ${C.navyMid} 100%)`,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Acento geométrico: línea vertical fina descendiendo */}
      <div style={{
        position: "absolute", top: 0, right: "8%", width: "1px", height: "100%",
        background: `linear-gradient(180deg, transparent, rgba(0,212,255,0.12), transparent)`,
      }} />
      <div style={{
        position: "absolute", top: "12%", right: "calc(8% - 3px)", width: "7px", height: "7px",
        borderRadius: "50%", border: `1px solid rgba(0,212,255,0.3)`,
      }} />

      <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Fade>
          <Label>El Punto de Partida</Label>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: C.white,
            lineHeight: 1.2,
            margin: "0 0 2.5rem",
          }}>
            No viniste roto.<br />Viniste programado.
          </h2>
        </Fade>

        <Fade delay={0.15}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: `rgba(240,244,255,0.75)`, lineHeight: 1.9, marginBottom: "1.5rem" }}>
            Durante años nos enseñaron que debíamos corregirnos. Sanar heridas. Superar traumas.
            Combatir síntomas. Adaptarnos a las circunstancias.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: `rgba(240,244,255,0.75)`, lineHeight: 1.9, marginBottom: "1.5rem" }}>
            Pero ¿qué ocurre cuando, a pesar de todo el trabajo realizado, los mismos patrones
            continúan apareciendo? Las mismas relaciones. Las mismas limitaciones. Los mismos bloqueos.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: `rgba(240,244,255,0.75)`, lineHeight: 1.9, marginBottom: "2.5rem" }}>
            La respuesta no siempre está en lo que te sucede. Muchas veces está en la información
            que sostiene aquello que te sucede.
          </p>
        </Fade>

        <Fade delay={0.3}>
          <div style={{
            borderLeft: `3px solid ${C.cyan}`,
            paddingLeft: "2rem",
            margin: "2.5rem 0",
          }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", color: C.white, lineHeight: 1.8, fontWeight: 600, marginBottom: "1rem" }}>
              No eres el problema.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: `rgba(240,244,255,0.8)`, lineHeight: 1.9, marginBottom: "1rem" }}>
              La información desde la cual operas es el problema.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: `rgba(240,244,255,0.7)`, lineHeight: 1.9 }}>
              Cada pensamiento, cada emoción, cada reacción y cada decisión es el resultado de
              una arquitectura interna que opera silenciosamente en tu vida. Y cuando esa
              información cambia, todo comienza a reorganizarse.
            </p>
          </div>
        </Fade>

        <Fade delay={0.45}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: C.cyan, lineHeight: 1.8, fontWeight: 600, marginBottom: "0.5rem" }}>
            GENORA trabaja en esa información.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: `rgba(240,244,255,0.6)`, lineHeight: 1.8 }}>
            Porque cuando la raíz se reorganiza, la expresión externa también cambia.
          </p>
        </Fade>
      </div>
    </section>
  );
}

// S3: LA FILOSOFÍA
function LaFilosofia() {
  return (
    <section style={{
      padding: "7rem 1.5rem",
      background: `radial-gradient(ellipse 70% 50% at 30% 50%, rgba(0,80,120,0.12) 0%, transparent 70%), ${C.navyMid}`,
    }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <Fade>
          <Label>La Filosofía</Label>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            color: C.white,
            marginBottom: "0.5rem",
          }}>
            ¿Qué es GENORA?
          </h2>
          <Divider />
        </Fade>

        <Fade delay={0.1}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
            color: `rgba(240,244,255,0.85)`,
            lineHeight: 1.9,
            borderLeft: `2px solid rgba(0,212,255,0.3)`,
            paddingLeft: "1.5rem",
            marginBottom: "3.5rem",
          }}>
            GENORA es un Sistema Maestro de Recalibración Consciente® — una metodología de
            evolución humana desarrollada por Pamela Cadavid para acompañar procesos de
            restauración de coherencia entre la información, la energía y la experiencia humana.
            El cuerpo expresa lo que la información sostiene; cuando la información cambia,
            la experiencia cambia.
          </p>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          <Fade delay={0.15}>
            <Card>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: C.cyan, textTransform: "uppercase", marginBottom: "0.75rem" }}>Filosofía</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: C.white, marginBottom: "1rem" }}>
                Diseño Original Humano®
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: `rgba(240,244,255,0.7)`, lineHeight: 1.85 }}>
                La arquitectura multidimensional de consciencia, información y potencial con la que
                cada ser humano llega a la experiencia. Esta arquitectura no se crea — se recuerda.
                Existe más de ti esperando emerger.
              </p>
            </Card>
          </Fade>

          <Fade delay={0.25}>
            <Card>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase", marginBottom: "0.75rem" }}>Principio Organizador</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: C.white, marginBottom: "1rem" }}>
                Supraconsciencia®
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: `rgba(240,244,255,0.7)`, lineHeight: 1.85 }}>
                La expresión más elevada del Diseño Original Humano. A medida que recuperas
                coherencia con esta dimensión superior de ti, se amplían tu creación, tu bienestar,
                tu percepción y tu capacidad de expansión.
              </p>
            </Card>
          </Fade>

          <Fade delay={0.35}>
            <Card>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "#a78bfa", textTransform: "uppercase", marginBottom: "0.75rem" }}>Trayectoria</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: C.white, marginBottom: "1rem" }}>
                13 Años de Investigación y Desarrollo
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: `rgba(240,244,255,0.7)`, lineHeight: 1.85 }}>
                Pamela Cadavid desarrolló el Sistema Maestro GENORA a partir de 13 años de
                investigación, práctica clínica y exploración de los campos de información que
                influyen sobre la experiencia humana. Cada sesión es cocreación: el método abre
                el campo, tu presencia ancla el cambio.
              </p>
            </Card>
          </Fade>
        </div>
      </div>
    </section>
  );
}

// S4: PRINCIPIOS
const principios = [
  {
    num: "01",
    title: "El Diseño Original Existe",
    body: "Todo ser humano posee una arquitectura original de equilibrio, coherencia y expansión. GENORA trabaja para restaurar esa arquitectura.",
  },
  {
    num: "02",
    title: "El Cuerpo es Información",
    body: "El cuerpo no es únicamente biología. Es un sistema inteligente que expresa la información que contiene. Cada síntoma, emoción o patrón es un mensaje de esa información.",
  },
  {
    num: "03",
    title: "La Frecuencia Organiza la Materia",
    body: "La información se expresa a través de frecuencias. Cuando la frecuencia cambia, la organización del sistema cambia.",
  },
  {
    num: "04",
    title: "La Consciencia Participa en la Transformación",
    body: "No existe transformación profunda sin presencia consciente. GENORA es una cocreación entre el método y la persona.",
  },
  {
    num: "05",
    title: "La Evolución es Natural",
    body: "La expansión no es algo que debas forzar. Es el estado natural del ser cuando recupera coherencia con su Diseño Original.",
  },
];

function Principios() {
  return (
    <section style={{
      padding: "7rem 1.5rem",
      background: C.navy,
    }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <Fade>
          <Label>Fundamentos</Label>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: C.white,
            marginBottom: "3rem",
          }}>
            Los Cinco Principios Maestros de GENORA®
          </h2>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {principios.map((p, i) => (
            <Fade key={p.num} delay={i * 0.1}>
              <div style={{
                padding: "2rem",
                borderTop: `2px solid rgba(0,212,255,0.2)`,
                position: "relative",
                height: "100%",
              }}>
                <span style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "3.5rem",
                  fontWeight: 700,
                  color: "rgba(0,212,255,0.08)",
                  position: "absolute",
                  top: "0.5rem",
                  right: "1.5rem",
                  lineHeight: 1,
                  userSelect: "none",
                }}>{p.num}</span>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: C.white,
                  marginBottom: "1rem",
                  paddingRight: "2.5rem",
                }}>{p.title}</h3>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1rem",
                  color: `rgba(240,244,255,0.65)`,
                  lineHeight: 1.85,
                }}>{p.body}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// S4.5: MANIFIESTO — "Lo que creemos"
const creencias = [
  "Creemos que existe más de nosotros esperando emerger.",
  "Creemos que el potencial humano es mucho mayor de lo que hemos recordado.",
  "Creemos que la información organiza la experiencia.",
  "Creemos que la frecuencia influye en la forma en que experimentamos la realidad.",
  "Creemos que la coherencia transforma.",
  "Creemos que los dones naturales del ser humano no necesitan ser creados. Necesitan ser recordados.",
];

function Manifiesto() {
  return (
    <section style={{
      padding: "7rem 1.5rem",
      background: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 60%), ${C.navyMid}`,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <Fade>
          <Label>Manifiesto GENORA®</Label>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
            fontWeight: 400,
            color: C.white,
            lineHeight: 1.3,
            marginBottom: "3rem",
          }}>
            No concebimos la transformación humana<br />como un proceso de corrección.
          </h2>
        </Fade>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem", marginBottom: "3rem" }}>
          {creencias.map((c, i) => (
            <Fade key={i} delay={i * 0.08}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                color: `rgba(240,244,255,0.75)`,
                lineHeight: 1.7,
                fontStyle: "italic",
              }}>{c}</p>
            </Fade>
          ))}
        </div>

        <Fade delay={0.5}>
          <div style={{ borderTop: "1px solid rgba(0,212,255,0.12)", paddingTop: "2rem" }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.2rem",
              color: C.cyan,
              lineHeight: 1.7,
              fontWeight: 600,
            }}>
              No creemos que las personas estén rotas.<br />
              Creemos que el propósito de la evolución humana consiste en recordar.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// S5: LOS 5 PASOS
const pasos = [
  {
    n: "01",
    title: "Lectura del Campo de Información",
    body: "El primer paso es ver con precisión. Identificamos la información que sostiene tus patrones actuales — los códigos activos, los bloqueos de coherencia y las estructuras que están deteniendo tu expansión hoy. No avanzamos sin saber exactamente qué información está operando.",
  },
  {
    n: "02",
    title: "Recalibración de Códigos",
    body: "Trabajamos en la restauración de los códigos del ADN multidimensional/cuántico, activando patrones de organización que elevan la consciencia biológica y espiritual. Cada recalibración abre un nivel de expresión que estaba latente, no ausente.",
  },
  {
    n: "03",
    title: "Reorganización de la Información",
    body: "Cuando la información cambia, la experiencia cambia. En esta fase reorganizamos las estructuras que dieron origen a los patrones — no para corregirte, sino para que tu sistema vuelva a operar según su Diseño Original.",
  },
  {
    n: "04",
    title: "Anclaje con Frecuencias y Cristales",
    body: "Una vez reorganizada la información, el campo necesita una frecuencia que la sostenga. Usamos tecnología vibracional con cristales y frecuencias de alta precisión para anclar el nuevo estado de coherencia.",
  },
  {
    n: "05",
    title: "Coherencia Sostenida",
    body: "El proceso no termina en la sesión — termina cuando la nueva coherencia se convierte en tu forma natural de operar. Integramos la recalibración en tu vida cotidiana: tu creación, tu bienestar, tu expansión. Esa es la Emergencia del Potencial Humano®.",
  },
];

function ElCamino() {
  const [active, setActive] = useState(0);

  return (
    <section style={{
      padding: "7rem 1.5rem",
      background: `radial-gradient(ellipse 60% 50% at 70% 40%, rgba(201,168,76,0.05) 0%, transparent 65%), ${C.navyMid}`,
    }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <Fade>
          <Label>El Camino</Label>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: C.white,
            marginBottom: "0.5rem",
          }}>
            Cinco Pasos hacia tu Recalibración
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.15rem",
            color: `rgba(240,244,255,0.55)`,
            fontStyle: "italic",
            marginBottom: "3rem",
          }}>
            Un recorrido que no promete atajos — promete coherencia real.
          </p>
        </Fade>

        {/* Lista de pasos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {pasos.map((p, i) => (
            <Fade key={p.n} delay={i * 0.08}>
              <div
                onClick={() => setActive(active === i ? -1 : i)}
                style={{
                  borderBottom: `1px solid rgba(0,212,255,0.1)`,
                  padding: "1.75rem 0",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <span style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: active === i ? C.cyan : C.grayDim,
                    letterSpacing: "0.1em",
                    minWidth: "2rem",
                    transition: "color 0.3s",
                  }}>{p.n}</span>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.3rem",
                    fontWeight: active === i ? 600 : 400,
                    color: active === i ? C.white : `rgba(240,244,255,0.65)`,
                    flex: 1,
                    transition: "all 0.3s",
                  }}>{p.title}</h3>
                  <span style={{
                    color: active === i ? C.cyan : C.grayDim,
                    fontSize: "1.2rem",
                    transition: "transform 0.3s, color 0.3s",
                    transform: active === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}>+</span>
                </div>

                {active === i && (
                  <div style={{
                    paddingLeft: "3.5rem",
                    paddingTop: "1rem",
                    animation: "fadeIn 0.4s ease",
                  }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.1rem",
                      color: `rgba(240,244,255,0.7)`,
                      lineHeight: 1.9,
                    }}>{p.body}</p>
                  </div>
                )}
              </div>
            </Fade>
          ))}
        </div>

        {/* Curva de progreso */}
        <Fade delay={0.3}>
          <div style={{
            marginTop: "4rem",
            padding: "2rem",
            background: "rgba(0,212,255,0.03)",
            border: "1px solid rgba(0,212,255,0.08)",
            borderRadius: "1rem",
          }}>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: C.cyan, textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Impacto en la Coherencia del Campo
            </p>
            <svg viewBox="0 0 600 140" style={{ width: "100%", height: "auto" }}>
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={C.cyan} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={C.cyan} stopOpacity="1" />
                </linearGradient>
                <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={C.cyan} stopOpacity="0.12" />
                  <stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Área */}
              <path d="M 30 110 Q 150 105 200 85 Q 300 55 380 30 Q 460 12 570 10 L 570 130 L 30 130 Z"
                fill="url(#fillGrad)" />
              {/* Línea */}
              <path d="M 30 110 Q 150 105 200 85 Q 300 55 380 30 Q 460 12 570 10"
                fill="none" stroke="url(#lineGrad)" strokeWidth="2" />
              {/* Puntos */}
              {[[30,110,"LECTURA"],[300,52,"RECALIBRACIÓN"],[570,10,"COHERENCIA SOSTENIDA"]].map(([x,y,label]) => (
                <g key={label}>
                  <circle cx={x} cy={y} r="4" fill={C.cyan} opacity="0.9" />
                  <text x={x} y={y - 12} textAnchor="middle"
                    fontFamily="Rajdhani, sans-serif" fontSize="9" fill={C.gray} letterSpacing="1">
                    {label}
                  </text>
                </g>
              ))}
            </svg>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: `rgba(240,244,255,0.45)`, textAlign: "center", marginTop: "0.5rem", fontStyle: "italic" }}>
              Visualización de la estabilización de coherencia a medida que se avanza en el proceso.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// S6: VOZ DE PAMELA
function VozDePamela() {
  return (
    <section style={{
      padding: "7rem 1.5rem",
      background: C.navy,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <Fade>
          <div style={{
            width: "84px", height: "84px", borderRadius: "50%",
            border: `1.5px solid rgba(0,212,255,0.3)`,
            margin: "0 auto 1.5rem",
            background: "rgba(0,212,255,0.04)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            {/* Placeholder foto — reemplazar con <img src="/pamela.jpg" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}} /> cuando tengas la foto */}
            <svg viewBox="0 0 60 60" style={{ width: "44px", height: "44px", opacity: 0.5 }}>
              <circle cx="30" cy="30" r="22" fill="none" stroke={C.cyan} strokeWidth="0.6" />
              <circle cx="30" cy="30" r="14" fill="none" stroke={C.gold} strokeWidth="0.6" />
              <circle cx="30" cy="30" r="2" fill={C.cyan} />
            </svg>
          </div>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            color: C.cyan,
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}>
            Pamela Cadavid · Creadora del Sistema Maestro GENORA® · Arquitecta del Diseño Original
          </p>
        </Fade>

        <Fade delay={0.15}>
          <blockquote style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
            fontWeight: 400,
            color: C.white,
            lineHeight: 1.5,
            fontStyle: "italic",
            margin: "0 0 2rem",
            padding: "0 1rem",
          }}>
            "No viniste roto.<br />
            Viniste <em style={{ color: C.cyan }}>programado.</em>"
          </blockquote>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            color: `rgba(240,244,255,0.4)`,
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}>— Pamela Cadavid</p>
        </Fade>

        <Fade delay={0.3}>
          <div style={{
            borderTop: "1px solid rgba(0,212,255,0.1)",
            paddingTop: "2rem",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem",
              color: `rgba(240,244,255,0.65)`,
              lineHeight: 1.9,
            }}>
              Desarrollé el Sistema Maestro GENORA® después de 13 años de investigación, práctica
              clínica y exploración de los campos de información que influyen sobre la experiencia
              humana. Hoy soy la arquitecta de una metodología propia que acompaña a las personas a
              recordar — no a corregir — quienes siempre han sido.
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.05rem",
              color: `rgba(240,244,255,0.45)`,
              lineHeight: 1.8,
              marginTop: "1rem",
              fontStyle: "italic",
            }}>
              Mi misión: conservar y salvaguardar la vida humana, animal y de la Tierra.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// S6.5: PRENSA Y MEDIOS (placeholder — preparada para menciones futuras)
const mediosPlaceholder = [
  "MEDIO", "PUBLICACIÓN", "REVISTA", "PODCAST", "ENTREVISTA", "ALIANZA",
];

function PrensaYMedios() {
  return (
    <section style={{
      padding: "4.5rem 1.5rem",
      background: C.navyMid,
      borderTop: "1px solid rgba(0,212,255,0.06)",
      borderBottom: "1px solid rgba(0,212,255,0.06)",
    }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", textAlign: "center" }}>
        <Fade>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            color: `rgba(128,144,168,0.55)`,
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}>
            El Sistema GENORA en medios y alianzas
          </p>
        </Fade>
        <Fade delay={0.1}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2.5rem",
            flexWrap: "wrap",
            opacity: 0.85,
          }}>
            {mediosPlaceholder.map((m) => (
              <span key={m} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.05rem",
                letterSpacing: "0.04em",
                color: `rgba(240,244,255,0.28)`,
                fontStyle: "italic",
                border: "1px solid rgba(240,244,255,0.08)",
                borderRadius: "0.4rem",
                padding: "0.5rem 1.1rem",
              }}>{m}</span>
            ))}
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.85rem",
            color: `rgba(240,244,255,0.25)`,
            fontStyle: "italic",
            marginTop: "1.5rem",
          }}>
            Espacio reservado — se actualizará con menciones, entrevistas y alianzas reales del Sistema GENORA.
          </p>
        </Fade>
      </div>
    </section>
  );
}

// S7: ECOSISTEMA
const ecosistema = [
  {
    tag: "Profundidad",
    tagColor: C.cyan,
    title: "Sesiones Individuales",
    desc: "Para quienes necesitan trabajo profundo y personalizado.",
    body: "Identificamos la información específica que sostiene tus patrones actuales y trabajamos con precisión sobre los códigos que más limitan tu coherencia hoy. El camino de mayor profundidad e impacto del Sistema GENORA.",
    cta: "Agendar sesión →",
  },
  {
    tag: "Aprendizaje",
    tagColor: C.gold,
    title: "Talleres de Microaprendizaje",
    desc: "Para quienes aprenden y recalibran en movimiento.",
    body: "Experiencias cortas, precisas y profundas, diseñadas para trabajar un código de información específico en cada encuentro. Accesibles desde cualquier lugar del mundo. Cada taller es una recalibración en sí misma.",
    cta: "Unirme a la lista →",
    badge: "Próximamente",
  },
  {
    tag: "Comunidad",
    tagColor: "#a78bfa",
    title: "Genora Viva",
    desc: "Para quienes están listos para un proceso de evolución continua.",
    body: "Genora Viva es el espacio de acompañamiento sostenido — donde el sistema se convierte en práctica de vida. La coherencia se construye, se profundiza y se expande en comunidad.",
    cta: "Conocer Genora Viva →",
  },
  {
    tag: "Diario",
    tagColor: C.gold,
    title: "Genora Frequencies App",
    desc: "Para quienes quieren coherencia consciente en su vida diaria.",
    body: "Una biblioteca de frecuencias que te llevará desde la relajación mental más simple hasta procesos de expansión de consciencia: meditaciones de recalibración inmediata, activación de capacidades y ajuste de coherencia diario.",
    cta: "Explorar la app →",
  },
];

function Ecosistema() {
  return (
    <section style={{
      padding: "7rem 1.5rem",
      background: `radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,80,120,0.1) 0%, transparent 60%), ${C.navyMid}`,
    }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
        <Fade>
          <Label>Ecosistema GENORA</Label>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: C.white,
            marginBottom: "0.75rem",
          }}>
            Cuatro caminos hacia tu coherencia.
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem",
            color: `rgba(240,244,255,0.5)`,
            fontStyle: "italic",
            marginBottom: "3.5rem",
          }}>
            Elige el que resuena con tu momento.
          </p>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {ecosistema.map((e, i) => (
            <Fade key={e.title} delay={i * 0.1}>
              <Card style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
                {e.badge && (
                  <span style={{
                    position: "absolute", top: "1.25rem", right: "1.25rem",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.65rem", letterSpacing: "0.12em",
                    color: C.navy, background: C.gold,
                    padding: "0.2rem 0.6rem", borderRadius: "1rem",
                    textTransform: "uppercase", fontWeight: 700,
                  }}>{e.badge}</span>
                )}
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: e.tagColor, textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  {e.tag}
                </p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", color: C.white, marginBottom: "0.5rem" }}>
                  {e.title}
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: C.cyan, fontStyle: "italic", marginBottom: "1rem" }}>
                  {e.desc}
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: `rgba(240,244,255,0.65)`, lineHeight: 1.8, flex: 1, marginBottom: "1.5rem" }}>
                  {e.body}
                </p>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.8rem", letterSpacing: "0.12em",
                  color: e.tagColor, textTransform: "uppercase",
                  fontWeight: 700, cursor: "pointer",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: "1rem",
                }}>
                  {e.cta}
                </p>
              </Card>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// S8: CTA FINAL
function CTAFinal() {
  return (
    <section style={{
      padding: "8rem 1.5rem",
      background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,120,180,0.15) 0%, transparent 70%), ${C.navy}`,
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decoración fondo */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0,212,255,0.04) 0%, transparent 40%),
                          radial-gradient(circle at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 40%)`,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto" }}>
        <Fade>
          <Label>El Primer Paso</Label>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            color: C.white,
            lineHeight: 1.2,
            marginBottom: "1.5rem",
          }}>
            ¿Estás lista para<br />recordar tu Diseño Original?
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.15rem",
            color: `rgba(240,244,255,0.65)`,
            lineHeight: 1.85,
            marginBottom: "1rem",
          }}>
            El primer paso es reconocer que no eres el problema — la información desde la que
            operas sí puede recalibrarse.
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem",
            color: `rgba(240,244,255,0.4)`,
            fontStyle: "italic",
            marginBottom: "3rem",
          }}>
            13 años de investigación y desarrollo. Existe más de ti esperando emerger.
          </p>
        </Fade>

        <Fade delay={0.2}>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <BtnPrimary>→ Descubrir el Método GENORA™</BtnPrimary>
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.95rem",
            color: `rgba(240,244,255,0.35)`,
            marginTop: "1.5rem",
          }}>
            ¿Tienes preguntas? Escríbeme directamente.
          </p>
        </Fade>

        <Fade delay={0.35}>
          <div style={{
            marginTop: "4rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid rgba(0,212,255,0.08)",
            display: "flex",
            justifyContent: "center",
            gap: "2.5rem",
            flexWrap: "wrap",
          }}>
            {[
              ["Instagram", "@soypamelacadavid"],
              ["Web", "genoraglobal.com"],
            ].map(([label, val]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: C.grayDim, textTransform: "uppercase", marginBottom: "0.25rem" }}>{label}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: `rgba(240,244,255,0.5)` }}>{val}</p>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// PÁGINA COMPLETA
// ═══════════════════════════════════════════
export default function HealingPage() {
  return (
    <div style={{ background: C.navy, color: C.white, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Rajdhani:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #040d18; }
        @keyframes pulse { 0%{opacity:0.2;transform:scale(1)} 100%{opacity:0.6;transform:scale(1.4)} }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        ::selection { background: rgba(0,212,255,0.2); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #040d18; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 2px; }
      `}</style>

      <Hero />
      <ElProblema />
      <LaFilosofia />
      <Principios />
      <Manifiesto />
      <ElCamino />
      <VozDePamela />
      <PrensaYMedios />
      <Ecosistema />
      <CTAFinal />

      {/* Footer mínimo */}
      <footer style={{
        padding: "2rem 1.5rem",
        textAlign: "center",
        background: "#020810",
        borderTop: "1px solid rgba(0,212,255,0.06)",
      }}>
        <p style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.18em",
          color: `rgba(128,144,168,0.4)`,
          textTransform: "uppercase",
        }}>
          © 2026 GENORA Global S.A.S. BIC · Todos los derechos reservados · Sistema GENORA®
        </p>
      </footer>
    </div>
  );
}
