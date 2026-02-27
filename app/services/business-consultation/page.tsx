"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion, useInView, AnimatePresence, useScroll,
  useTransform, useMotionValue, useSpring, animate,
} from "framer-motion";
import {
  Brain, TrendingUp, Globe, Shield, Users, Network,
  ArrowRight, Sparkles, CheckCircle2, BarChart2, Zap,
  Target, Rocket, Eye, Layers, Cpu, Compass,
  Activity, Flame, Star, ChevronRight, ArrowUpRight,
  BadgeCheck, Timer, Crown,
} from "lucide-react";
import { FiCpu, FiTrendingUp, FiGlobe, FiShield, FiUsers, FiZap } from "react-icons/fi";
import { HiOutlineLightBulb, HiOutlineSparkles } from "react-icons/hi2";
import { RiRocketLine, RiBarChartGroupedLine } from "react-icons/ri";
import { BsArrowUpRight, BsStars, BsGraphUpArrow } from "react-icons/bs";
import { TbTargetArrow, TbBrandSpeedtest, TbAtom } from "react-icons/tb";

/* ─── CSS ─────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap');

  .pg { font-family: 'Inter', system-ui, sans-serif; background: #ffffff; color: #0f0f1a; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  .pg *, .pg *::before, .pg *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .pg a { text-decoration: none; color: inherit; }
  .pg button { cursor: pointer; border: none; background: none; font: inherit; }
  .pg h1, .pg h2, .pg h3, .pg h4 { font-family: 'Outfit', sans-serif; }

  .pg-hero-bg {
    position: absolute; inset: 0; pointer-events: none; overflow: hidden;
    background:
      radial-gradient(ellipse 80% 60% at 20% 0%, rgba(139,92,246,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 10%, rgba(236,72,153,0.1) 0%, transparent 55%),
      radial-gradient(ellipse 50% 40% at 50% 85%, rgba(59,130,246,0.08) 0%, transparent 50%),
      radial-gradient(ellipse 40% 30% at 10% 70%, rgba(16,185,129,0.07) 0%, transparent 50%),
      #ffffff;
  }

  .pg-dot-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  @keyframes pg-float { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-14px) rotate(3deg)} }
  @keyframes pg-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes pg-spin-slow { to{transform:rotate(360deg)} }
  @keyframes pg-pulse-scale { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }

  .pg-shimmer-text {
    background: linear-gradient(90deg, #6d28d9, #db2777, #7c3aed, #2563eb, #6d28d9);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: pg-shimmer 3s linear infinite;
  }

  .pg-chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 13px; border-radius: 99px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.04em;
  }

  .pg-card {
    background: #fff; border-radius: 22px;
    border: 1.5px solid rgba(99,102,241,0.1);
    box-shadow: 0 4px 24px rgba(99,102,241,0.06), 0 1px 4px rgba(0,0,0,0.04);
    overflow: hidden; position: relative;
  }

  .pg-stat-bar { height: 6px; border-radius: 99px; background: rgba(99,102,241,0.08); overflow:hidden; }
  .pg-stat-bar-fill { height:100%; border-radius:99px; }

  .pg-blob {
    position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none;
  }
`;

/* ─── Animated counter ──────────────────────────────────────────── */
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8, ease: [0.22, 1, 0.36, 1],
      onUpdate: v => setVal(Math.floor(v)),
    });
    return controls.stop;
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

/* ─── Animated bar ──────────────────────────────────────────────── */
function Bar({ pct, color }: { pct: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="pg-stat-bar">
      <motion.div className="pg-stat-bar-fill" style={{ background: color }}
        initial={{ width: 0 }} animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.25 }} />
    </div>
  );
}

/* ─── Scroll reveal ─────────────────────────────────────────────── */
function Reveal({ children, delay = 0, dir = "up", style }: {
  children: React.ReactNode; delay?: number;
  dir?: "up" | "left" | "right" | "scale"; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y: dir === "up" ? 28 : 0, x: dir === "left" ? -28 : dir === "right" ? 28 : 0, scale: dir === "scale" ? 0.92 : 1 }}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Floating icon ─────────────────────────────────────────────── */
function FloatIcon({ icon, style, color, bg, delay = 0 }: {
  icon: React.ReactNode; style?: React.CSSProperties; color: string; bg: string; delay?: number;
}) {
  return (
    <motion.div style={{ position: "absolute", ...style, width: 52, height: 52, borderRadius: 16,
      background: bg, color, display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 8px 24px ${color}30`, border: `1.5px solid ${color}25`, zIndex: 2 }}
      animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}>
      {icon}
    </motion.div>
  );
}

/* ─── Pulse dot ─────────────────────────────────────────────────── */
function PulseDot({ color }: { color: string }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10 }}>
      <motion.span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.4 }}
        animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }} />
      <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: color }} />
    </span>
  );
}

/* ─── Data ──────────────────────────────────────────────────────── */
const SERVICES = [
  { icon: <FiCpu size={22} />, label: "Strategic Intelligence", kpi: "94% win rate", pct: 94,
    color: "#7c3aed", light: "#f5f3ff", border: "rgba(124,58,237,0.15)",
    desc: "AI-powered market analysis that surfaces hidden opportunities and keeps you three moves ahead." },
  { icon: <FiTrendingUp size={22} />, label: "Revenue Acceleration", kpi: "3.2× ROI", pct: 82,
    color: "#059669", light: "#ecfdf5", border: "rgba(5,150,105,0.15)",
    desc: "Growth frameworks engineered to compound results — from pipeline optimization to pricing power." },
  { icon: <FiGlobe size={22} />, label: "Digital Transformation", kpi: "200+ done", pct: 88,
    color: "#d97706", light: "#fffbeb", border: "rgba(217,119,6,0.15)",
    desc: "End-to-end technology evolution from legacy modernization to full AI integration." },
  { icon: <FiShield size={22} />, label: "Risk Architecture", kpi: "Zero failures", pct: 100,
    color: "#db2777", light: "#fdf2f8", border: "rgba(219,39,119,0.15)",
    desc: "Comprehensive risk frameworks that safeguard critical assets and ensure regulatory confidence." },
  { icon: <FiUsers size={22} />, label: "Leadership Development", kpi: "12k+ leaders", pct: 76,
    color: "#2563eb", light: "#eff6ff", border: "rgba(37,99,235,0.15)",
    desc: "Executive coaching that turns latent leadership capacity into your sharpest competitive edge." },
  { icon: <FiZap size={22} />, label: "Global Market Entry", kpi: "48 markets", pct: 91,
    color: "#ea580c", light: "#fff7ed", border: "rgba(234,88,12,0.15)",
    desc: "Surgical international expansion with research, regulatory navigation, and partner networks." },
];

const STATS = [
  { n: 2800, suffix: "M+", prefix: "$", label: "Value Created",  color: "#7c3aed", icon: <BsGraphUpArrow size={18} /> },
  { n: 420,  suffix: "+",  prefix: "",  label: "Clients Served", color: "#059669", icon: <FiUsers size={18} /> },
  { n: 97,   suffix: "%",  prefix: "",  label: "Retention Rate", color: "#db2777", icon: <BsStars size={18} /> },
  { n: 48,   suffix: "",   prefix: "",  label: "Global Markets",  color: "#d97706", icon: <FiGlobe size={18} /> },
];

const PROCESS = [
  { n: "01", icon: <Eye size={20} />, title: "Discovery Immersion", color: "#7c3aed",
    desc: "Full immersion into your data, team dynamics, and competitive landscape." },
  { n: "02", icon: <TbTargetArrow size={20} />, title: "Blueprint Design", color: "#059669",
    desc: "Bespoke roadmap with milestones and KPIs tied to real business outcomes." },
  { n: "03", icon: <TbBrandSpeedtest size={20} />, title: "Embedded Execution", color: "#d97706",
    desc: "We work inside your team driving every initiative with full accountability." },
  { n: "04", icon: <RiRocketLine size={20} />, title: "Scale & Sustain", color: "#db2777",
    desc: "Continuous optimization to sustain exponential growth long after we leave." },
];

const METRICS = [
  { label: "Avg Revenue Lift",  value: 340, suffix: "%", color: "#7c3aed" },
  { label: "Strategy Accuracy", value: 94,  suffix: "%", color: "#059669" },
  { label: "Deal Close Rate",   value: 87,  suffix: "%", color: "#d97706" },
  { label: "Time to Value",     value: 48,  suffix: "h", color: "#db2777" },
  { label: "Client NPS",        value: 92,  suffix: "",  color: "#2563eb" },
  { label: "Markets Served",    value: 48,  suffix: "",  color: "#ea580c" },
];

const FEATURES = [
  { icon: <TbAtom size={16} />,              label: "AI-Augmented Research",  color: "#7c3aed", bg: "#f5f3ff" },
  { icon: <Layers size={16} />,              label: "Embedded Execution",      color: "#2563eb", bg: "#eff6ff" },
  { icon: <RiBarChartGroupedLine size={16}/>,label: "Live KPI Dashboards",     color: "#059669", bg: "#ecfdf5" },
  { icon: <BadgeCheck size={16} />,          label: "Outcome Guarantees",      color: "#db2777", bg: "#fdf2f8" },
  { icon: <Timer size={16} />,               label: "48hr Strategy Drafts",    color: "#d97706", bg: "#fffbeb" },
  { icon: <Crown size={16} />,               label: "C-Suite Network Access",  color: "#ea580c", bg: "#fff7ed" },
];

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function ConsultationPage() {
  return (
    <div className="pg">
      <style>{CSS}</style>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "100px 24px 80px", overflow: "hidden", textAlign: "center" }}>

        <div className="pg-hero-bg" />
        <div className="pg-dot-grid" />

        <div className="pg-blob" style={{ width: 500, height: 500, background: "rgba(139,92,246,0.12)", top: -80, left: -120 }} />
        <div className="pg-blob" style={{ width: 400, height: 400, background: "rgba(236,72,153,0.1)", top: 60, right: -100 }} />
        <div className="pg-blob" style={{ width: 350, height: 350, background: "rgba(16,185,129,0.08)", bottom: 0, left: "30%" }} />

        <FloatIcon icon={<Brain size={22} />}         style={{ top: "18%", left: "8%" }}  color="#7c3aed" bg="#f5f3ff" delay={0} />
        <FloatIcon icon={<BsGraphUpArrow size={20}/>} style={{ top: "25%", right: "9%" }} color="#059669" bg="#ecfdf5" delay={1} />
        <FloatIcon icon={<FiGlobe size={20} />}       style={{ top: "62%", left: "12%" }} color="#2563eb" bg="#eff6ff" delay={2} />
        <FloatIcon icon={<RiRocketLine size={22}/>}   style={{ top: "65%", right: "8%" }} color="#db2777" bg="#fdf2f8" delay={1.5} />
        <FloatIcon icon={<HiOutlineSparkles size={20}/>} style={{ top: "10%", left: "42%" }} color="#d97706" bg="#fffbeb" delay={0.7} />

        <div style={{ position: "relative", zIndex: 3, maxWidth: 860 }}>

          {/* Badge */}
          <motion.div
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px",
              borderRadius: 99, background: "rgba(124,58,237,0.07)", border: "1.5px solid rgba(124,58,237,0.18)",
              fontSize: 13, fontWeight: 600, color: "#6d28d9", marginBottom: 28 }}
            initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", bounce: 0.45 }}>
            <PulseDot color="#7c3aed" />
            3 strategy spots open this month
            <BsArrowUpRight size={13} />
          </motion.div>

          {/* H1 */}
          <motion.h1
            style={{ fontSize: "clamp(3rem,7.5vw,7.5rem)", fontWeight: 900, lineHeight: 0.93,
              letterSpacing: "-0.04em", color: "#0f0f1a", marginBottom: 24 }}
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            Strategy that<br />
            <span className="pg-shimmer-text">actually works.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            style={{ fontSize: "clamp(1rem,1.8vw,1.18rem)", color: "#64748b", maxWidth: 520,
              margin: "0 auto 40px", lineHeight: 1.75, fontWeight: 400 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}>
            We partner with founders and executives to engineer breakout growth
            and lasting competitive advantage — not just slide decks.
          </motion.p>

          {/* CTAs */}
          <motion.div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 60 }}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <motion.a href="#pg-services"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "14px 30px",
                borderRadius: 14, fontWeight: 700, fontSize: 15, color: "white",
                background: "linear-gradient(135deg,#7c3aed,#a21caf)",
                boxShadow: "0 8px 32px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.15)" }}
              whileHover={{ scale: 1.04, y: -3, boxShadow: "0 16px 48px rgba(124,58,237,0.45)" }}
              whileTap={{ scale: 0.97 }}>
              <HiOutlineSparkles size={18} />
              Explore Services
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                <ArrowRight size={17} />
              </motion.span>
            </motion.a>
            <motion.a href="#pg-process"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 26px",
                borderRadius: 14, fontWeight: 600, fontSize: 14, color: "#4c1d95",
                background: "rgba(124,58,237,0.06)", border: "1.5px solid rgba(124,58,237,0.15)" }}
              whileHover={{ scale: 1.02, background: "rgba(124,58,237,0.1)", borderColor: "rgba(124,58,237,0.3)" }}>
              How We Work <ChevronRight size={16} />
            </motion.a>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
              background: "#fff", borderRadius: 22,
              boxShadow: "0 8px 48px rgba(99,102,241,0.1), 0 2px 8px rgba(0,0,0,0.05)",
              border: "1.5px solid rgba(99,102,241,0.08)", overflow: "hidden",
              maxWidth: 680, margin: "0 auto" }}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
            {STATS.map((s, i) => (
              <motion.div key={i}
                style={{ padding: "22px 12px", textAlign: "center", position: "relative",
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(99,102,241,0.07)" : "none" }}
                whileHover={{ background: `${s.color}06` }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 6, color: s.color }}>{s.icon}</div>
                <div style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 800, lineHeight: 1,
                  fontFamily: "'Outfit', sans-serif", color: s.color }}>
                  {s.prefix}<Counter to={s.n} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginTop: 5 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)" }}
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom,rgba(124,58,237,0.5),transparent)", margin: "0 auto" }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════
          SERVICES
      ══════════════════════════════ */}
      <section id="pg-services" style={{ padding: "80px 24px", background: "#fafafe" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
            <span className="pg-chip" style={{ background: "#f5f3ff", color: "#7c3aed",
              border: "1px solid rgba(124,58,237,0.18)", marginBottom: 14 }}>
              <Zap size={12} /> Services
            </span>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 800, color: "#0f0f1a",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 8 }}>
              Six disciplines.{" "}
              <span style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                One unstoppable business.
              </span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 18 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 0.07} dir="scale">
                <motion.div className="pg-card" style={{ padding: "28px" }}
                  whileHover={{ y: -6, boxShadow: `0 20px 60px ${s.color}14, 0 4px 16px rgba(0,0,0,0.06)`,
                    borderColor: `${s.color}35` }}>
                  <div style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100,
                    background: `radial-gradient(circle at 100% 0%, ${s.color}10 0%, transparent 70%)`,
                    borderRadius: "0 22px 0 0", pointerEvents: "none" }} />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <motion.div style={{ width: 52, height: 52, borderRadius: 16, background: s.light,
                      color: s.color, display: "flex", alignItems: "center", justifyContent: "center",
                      border: `1.5px solid ${s.border}`, boxShadow: `0 4px 16px ${s.color}18` }}
                      whileHover={{ rotate: 8, scale: 1.1 }} transition={{ type: "spring", bounce: 0.5 }}>
                      {s.icon}
                    </motion.div>
                    <span className="pg-chip" style={{ background: s.light, color: s.color,
                      border: `1px solid ${s.border}`, fontSize: 10 }}>
                      {s.kpi}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f0f1a", marginBottom: 10, lineHeight: 1.3 }}>{s.label}</h3>
                  <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.75, marginBottom: 20 }}>{s.desc}</p>

                  <Bar pct={s.pct} color={s.color} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7 }}>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>Performance index</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>
                      <Counter to={s.pct} suffix="%" />
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          METRICS
      ══════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
            <span className="pg-chip" style={{ background: "#ecfdf5", color: "#059669",
              border: "1px solid rgba(5,150,105,0.18)", marginBottom: 14 }}>
              <Activity size={12} /> By The Numbers
            </span>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, color: "#0f0f1a",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 8 }}>
              Results that{" "}
              <span style={{ background: "linear-gradient(135deg,#059669,#2563eb)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                speak for themselves.
              </span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
            {METRICS.map((m, i) => (
              <Reveal key={i} delay={i * 0.08} dir="scale">
                <motion.div style={{ padding: "28px 20px", borderRadius: 20, textAlign: "center",
                  background: "#fff", border: "1.5px solid rgba(99,102,241,0.08)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)", position: "relative", overflow: "hidden" }}
                  whileHover={{ y: -5, boxShadow: `0 20px 48px ${m.color}18, 0 4px 12px rgba(0,0,0,0.06)`,
                    borderColor: `${m.color}40` }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg,transparent,${m.color},transparent)` }} />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 60,
                    background: `linear-gradient(to bottom,${m.color}08,transparent)`, pointerEvents: "none" }} />

                  <div style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 900, lineHeight: 1,
                    fontFamily: "'Outfit', sans-serif", color: m.color, marginBottom: 6 }}>
                    <Counter to={m.value} suffix={m.suffix} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{m.label}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PROCESS
      ══════════════════════════════ */}
      <section id="pg-process" style={{ padding: "80px 24px", background: "#fafafe" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
            <span className="pg-chip" style={{ background: "#fffbeb", color: "#d97706",
              border: "1px solid rgba(217,119,6,0.18)", marginBottom: 14 }}>
              <Target size={12} /> Process
            </span>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, color: "#0f0f1a",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 8 }}>
              From insight{" "}
              <span style={{ background: "linear-gradient(135deg,#d97706,#db2777)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                to impact.
              </span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, position: "relative" }}>
            {PROCESS.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div style={{ padding: "30px 24px", borderRadius: 22, background: "#fff",
                  border: "1.5px solid rgba(99,102,241,0.08)", position: "relative", overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)", cursor: "default" }}
                  whileHover={{ y: -6, boxShadow: `0 20px 56px ${step.color}14`,
                    borderColor: `${step.color}35` }}>
                  <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 3,
                    background: `linear-gradient(90deg,transparent,${step.color},transparent)`,
                    borderRadius: "0 0 6px 6px" }} />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80,
                    background: `linear-gradient(to bottom,${step.color}07,transparent)`, pointerEvents: "none" }} />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <motion.div style={{ width: 52, height: 52, borderRadius: 15,
                      background: `linear-gradient(135deg,${step.color}18,${step.color}08)`,
                      color: step.color, display: "flex", alignItems: "center", justifyContent: "center",
                      border: `1.5px solid ${step.color}25`, boxShadow: `0 4px 16px ${step.color}20` }}
                      whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", bounce: 0.5 }}>
                      {step.icon}
                    </motion.div>
                    <span style={{ fontSize: 44, fontWeight: 900, color: `${step.color}18`,
                      fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>{step.n}</span>
                  </div>

                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f0f1a", marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.7 }}>{step.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          WHY US
      ══════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 60, alignItems: "center" }}>

          <Reveal dir="left">
            <span className="pg-chip" style={{ background: "#f5f3ff", color: "#7c3aed",
              border: "1px solid rgba(124,58,237,0.18)", marginBottom: 18 }}>
              <Star size={12} /> Why Nexus
            </span>
            <h2 style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, color: "#0f0f1a",
              letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 18, marginTop: 4 }}>
              We embed,{" "}
              <span style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                not just advise.
              </span>
            </h2>
            <p style={{ fontSize: 14.5, color: "#64748b", lineHeight: 1.8, marginBottom: 28 }}>
              Unlike firms that hand you a deck and disappear, our consultants work
              inside your team — owning outcomes and staying accountable to every
              milestone from day one through final delivery.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {["Dedicated embedded team", "Outcome-linked milestones", "48hr strategy turnaround", "Post-engagement support"].map((t, i) => (
                <motion.div key={i}
                  style={{ display: "flex", alignItems: "center", gap: 14,
                    padding: "13px 0", borderBottom: "1px solid rgba(99,102,241,0.07)",
                    fontSize: 14.5, color: "#374151", fontWeight: 500 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}>
                  <motion.div style={{ width: 28, height: 28, borderRadius: 99,
                    background: "#f5f3ff", color: "#7c3aed",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    border: "1px solid rgba(124,58,237,0.15)" }}
                    whileHover={{ scale: 1.15, rotate: 10 }}>
                    <CheckCircle2 size={14} />
                  </motion.div>
                  {t}
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal dir="right" delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {FEATURES.map((f, i) => (
                <motion.div key={i}
                  style={{ display: "flex", alignItems: "center", gap: 11,
                    padding: "16px 14px", borderRadius: 16, background: "#fff",
                    border: "1.5px solid rgba(99,102,241,0.08)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)", cursor: "default" }}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, type: "spring", bounce: 0.35 }}
                  whileHover={{ y: -4, borderColor: `${f.color}40`,
                    boxShadow: `0 12px 32px ${f.color}14` }}>
                  <motion.div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: f.bg, color: f.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: `1px solid ${f.color}20` }}
                    whileHover={{ rotate: 8 }}>
                    {f.icon}
                  </motion.div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", lineHeight: 1.35 }}>{f.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Performance bars */}
            <div style={{ padding: "22px", borderRadius: 18,
              background: "linear-gradient(135deg,#f5f3ff,#fff)",
              border: "1.5px solid rgba(124,58,237,0.12)",
              boxShadow: "0 4px 20px rgba(124,58,237,0.07)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed",
                marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>
                Avg client performance
              </div>
              {[
                { label: "Revenue Growth",    pct: 87, color: "#7c3aed" },
                { label: "Cost Reduction",    pct: 34, color: "#059669" },
                { label: "Timeline Accuracy", pct: 96, color: "#d97706" },
              ].map((bar, i) => (
                <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12.5, color: "#64748b", fontWeight: 500 }}>{bar.label}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: bar.color }}>
                      <Counter to={bar.pct} suffix="%" />
                    </span>
                  </div>
                  <Bar pct={bar.pct} color={bar.color} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
      <section style={{ padding: "80px 24px", position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg,#faf5ff 0%,#fff1f8 40%,#eff6ff 100%)" }}>

        <div style={{ position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)", width: 600, height: 600,
          borderRadius: "50%", border: "1.5px solid rgba(124,58,237,0.07)",
          animation: "pg-spin-slow 40s linear infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)", width: 400, height: 400,
          borderRadius: "50%", border: "1px dashed rgba(219,39,119,0.08)",
          animation: "pg-spin-slow 25s linear infinite reverse", pointerEvents: "none" }} />

        <Reveal style={{ maxWidth: 580, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <motion.div
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px",
              borderRadius: 99, background: "rgba(219,39,119,0.08)", border: "1.5px solid rgba(219,39,119,0.18)",
              fontSize: 13, fontWeight: 600, color: "#be185d", marginBottom: 24 }}
            animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <Flame size={14} /> Limited spots available
          </motion.div>

          <h2 style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 900, color: "#0f0f1a",
            letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
            Ready to build your{" "}
            <span style={{ background: "linear-gradient(135deg,#7c3aed,#db2777,#ea580c)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              unfair advantage?
            </span>
          </h2>
          <p style={{ fontSize: 15, color: "#64748b", marginBottom: 36, lineHeight: 1.75 }}>
            45 minutes. No pitch. Just raw strategic insight tailored to your business.
          </p>

          <motion.a href="/info/contact"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px",
              borderRadius: 16, fontWeight: 700, fontSize: 15.5, color: "white",
              background: "linear-gradient(135deg,#7c3aed,#a21caf,#db2777)",
              boxShadow: "0 16px 56px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              marginBottom: 32 }}
            whileHover={{ scale: 1.06, y: -4, boxShadow: "0 24px 72px rgba(124,58,237,0.5)" }}
            whileTap={{ scale: 0.97 }}>
            <HiOutlineSparkles size={20} />
            Book Free Strategy Call
            <ArrowRight size={18} />
          </motion.a>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
            {["No commitment required", "100% confidential", "Results in 6–8 weeks"].map((t, i) => (
              <motion.div key={i}
                style={{ display: "flex", alignItems: "center", gap: 7,
                  fontSize: 13, color: "#64748b", fontWeight: 500 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}>
                <CheckCircle2 size={14} style={{ color: "#7c3aed" }} />
                {t}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}