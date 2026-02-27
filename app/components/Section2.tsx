"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  MouseEvent,
  CSSProperties,
  ReactNode,
} from "react";

/* ─── Static data ─────────────────────────────────────────────────────────── */
const CHART_BARS    = [28, 45, 32, 62, 40, 78, 55, 88, 65, 96, 72, 100] as const;
const AVATAR_COLORS = ["#3dd6c8", "#a78bfa", "#60a5fa"] as const;
const PULSE_SCALES  = [0.52, 0.70, 0.86] as const;

const ACTIVITY = [
  { name: "Neural API",  status: "Active",   dot: "#3dd6c8" },
  { name: "Auth Module", status: "Deployed", dot: "#34d399" },
  { name: "Analytics",   status: "Running",  dot: "#a78bfa" },
] as const;

const METRICS = [
  { label: "Active Users", val: "12.4K", trend: "↑ 8%"  },
  { label: "Conversion",   val: "6.8%",  trend: "↑ 1.2%" },
] as const;

/* ─── Keyframes ───────────────────────────────────────────────────────────── */
const CSS = `
*, *::before, *::after { box-sizing: border-box; }

@keyframes nmt-float   { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-12px)} }
@keyframes nmt-pulse   { 0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.15;transform:translate(-50%,-50%) scale(1.07)} }
@keyframes nmt-scan    { 0%{top:-2px} 100%{top:100%} }
@keyframes nmt-grid    { 0%{transform:translateY(0)} 100%{transform:translateY(50px)} }
@keyframes nmt-dot     { 0%,100%{opacity:1} 50%{opacity:.2} }
@keyframes nmt-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
@keyframes nmt-right   { from{opacity:0;transform:translateX(-26px)} to{opacity:1;transform:translateX(0)} }
@keyframes nmt-left    { from{opacity:0;transform:translateX(26px)}  to{opacity:1;transform:translateX(0)} }
@keyframes nmt-badge   { from{opacity:0;transform:translateY(14px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }

@keyframes nmt-aurora-1 {
  0%,100% { transform: translate(0,0) scale(1); opacity: 0.55; }
  33%     { transform: translate(60px,-40px) scale(1.08); opacity: 0.7; }
  66%     { transform: translate(-30px,50px) scale(0.95); opacity: 0.45; }
}
@keyframes nmt-aurora-2 {
  0%,100% { transform: translate(0,0) scale(1); opacity: 0.45; }
  40%     { transform: translate(-80px,30px) scale(1.12); opacity: 0.6; }
  70%     { transform: translate(40px,-60px) scale(0.9); opacity: 0.35; }
}
@keyframes nmt-aurora-3 {
  0%,100% { transform: translate(0,0) scale(1); opacity: 0.35; }
  50%     { transform: translate(50px,70px) scale(1.06); opacity: 0.5; }
}
`;

/* ─── Phone SVG dims ──────────────────────────────────────────────────────── */
const W = 433, H = 882, R = 55;
const SCREEN_T  = `${(21 / H) * 100}%`;
const SCREEN_L  = `${(21 / W) * 100}%`;
const SCREEN_W  = `${((W - 42) / W) * 100}%`;
const SCREEN_H  = `${((H - 42) / H) * 100}%`;
const SCREEN_BR = `${(R / W) * 200}%`;

/* ─── AppScreen ───────────────────────────────────────────────────────────── */
const AppScreen = memo(function AppScreen() {
  return (
    <div style={SC.screen}>
      <div style={SC.grid} aria-hidden />

      <div style={SC.statusBar}>
        <span>9:41</span>
        <span style={{ letterSpacing: 1 }}>●●● ᯤ ■</span>
      </div>

      <div style={{ padding: "12px 17px 0", position: "relative", zIndex: 1 }}>
        <div style={SC.appRow}>
          <div>
            <div style={SC.appLabel}>Dashboard</div>
            <div style={SC.appTitle}>Overview</div>
          </div>
          <div style={SC.appIcon}>
            <div style={SC.appIconInner} />
          </div>
        </div>

        <div style={SC.card}>
          <div style={SC.cardLabel}>Monthly Revenue</div>
          <div style={SC.cardValue}>$48,291</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={SC.badge}>↑ 23.4%</div>
            <span style={SC.cardSub}>vs last month</span>
          </div>
          <div style={SC.chartRow}>
            {CHART_BARS.map((h, i) => (
              <div key={i} style={{
                ...SC.bar,
                height: `${h}%`,
                background: i === CHART_BARS.length - 1
                  ? "linear-gradient(to top,#3dd6c8,#257ca3)"
                  : "rgba(37,124,163,0.22)",
              }} />
            ))}
          </div>
        </div>

        <div style={SC.metricsRow}>
          {METRICS.map((m) => (
            <div key={m.label} style={SC.metricCard}>
              <div style={SC.metricLabel}>{m.label}</div>
              <div style={SC.metricVal}>{m.val}</div>
              <div style={SC.metricTrend}>{m.trend}</div>
            </div>
          ))}
        </div>

        <div style={SC.activity}>
          <div style={SC.activityHead}>Recent Activity</div>
          {ACTIVITY.map((a) => (
            <div key={a.name} style={SC.activityRow}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ ...SC.dot, background: a.dot, boxShadow: `0 0 6px ${a.dot}` }} />
                <span style={SC.activityName}>{a.name}</span>
              </div>
              <span style={SC.activityStatus}>{a.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={SC.bottomNav} aria-hidden>
        {(["⬡", "◈", "◎", "⊙"] as const).map((icon, i) => (
          <div key={i} style={{
            fontSize: 17, opacity: i === 0 ? 1 : 0.3,
            color: i === 0 ? "#3dd6c8" : "white",
            filter: i === 0 ? "drop-shadow(0 0 5px #3dd6c8)" : "none",
          }}>{icon}</div>
        ))}
      </div>
    </div>
  );
});

/* ─── PhoneFrame ──────────────────────────────────────────────────────────── */
const PhoneFrame = memo(function PhoneFrame({ hovered }: { hovered: boolean }) {
  return (
    <div style={{ position: "relative", width: "100%", willChange: "transform" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}
        xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="nmt-ti" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#e2e2e6" />
            <stop offset="20%"  stopColor="#efeff3" />
            <stop offset="52%"  stopColor="#f5f5f9" />
            <stop offset="80%"  stopColor="#cccccf" />
            <stop offset="100%" stopColor="#a5a5a8" />
          </linearGradient>
          <linearGradient id="nmt-sl" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#7a7a7e" />
            <stop offset="100%" stopColor="#b8b8bc" />
          </linearGradient>
          <linearGradient id="nmt-sr" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#b8b8bc" />
            <stop offset="100%" stopColor="#7a7a7e" />
          </linearGradient>
          <radialGradient id="nmt-glow" cx="50%" cy="0%" r="75%">
            <stop offset="0%"   stopColor="rgba(37,124,163,0.09)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <clipPath id="nmt-clip">
            <rect x="21" y="21" width={W-42} height={H-42} rx={R} ry={R} />
          </clipPath>
        </defs>

        <rect x="1" y="1" width={W-2} height={H-2} rx="76"
          fill="url(#nmt-ti)" stroke="rgba(255,255,255,0.48)" strokeWidth="0.5" />

        <rect x="-1" y="196" width="5" height="50"  rx="2.5" fill="url(#nmt-sl)" />
        <rect x="-1" y="268" width="5" height="84"  rx="2.5" fill="url(#nmt-sl)" />
        <rect x="-1" y="374" width="5" height="84"  rx="2.5" fill="url(#nmt-sl)" />
        <rect x={W-4} y="246" width="5" height="128" rx="2.5" fill="url(#nmt-sr)" />

        <rect x="18" y="18" width={W-36} height={H-36} rx="60" fill="#020c18" />
        <rect x="21" y="21" width={W-42} height={H-42} rx={R}
          fill="#010810" clipPath="url(#nmt-clip)" />
        <rect x="21" y="21" width={W-42} height={H-42} rx={R}
          fill="url(#nmt-glow)" clipPath="url(#nmt-clip)" />

        <rect x={(W/2)-64} y="26" width="129" height="44" rx="22" fill="#000" />
        <circle cx={(W/2)+33} cy="48" r="9"   fill="#050505" />
        <circle cx={(W/2)+33} cy="48" r="6.2" fill="#0d0d0f" />
        <circle cx={(W/2)+33} cy="48" r="4"   fill="#13181f" />
        <circle cx={(W/2)+31} cy="46" r="1.3" fill="rgba(255,255,255,0.12)" />

        {hovered && (
          <rect x="21" y="21" width={W-42} height={H-42} rx={R}
            fill="none" stroke="rgba(37,124,163,0.35)" strokeWidth="1.5"
            clipPath="url(#nmt-clip)" />
        )}

        <rect x="1" y="1" width={W-2} height={H-2} rx="76"
          fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.75" />
        <rect x="2" y="3" width={W-4} height={H-6} rx="76"
          fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="0.5" />
      </svg>

      <div style={{
        position: "absolute",
        top: SCREEN_T, left: SCREEN_L,
        width: SCREEN_W, height: SCREEN_H,
        borderRadius: SCREEN_BR,
        overflow: "hidden",
        isolation: "isolate",
      }}>
        <AppScreen />
      </div>
    </div>
  );
});

/* ─── FloatingBadge ───────────────────────────────────────────────────────── */
interface BadgeProps {
  children: ReactNode;
  delay?: number;
  floatDur?: string;
  floatDelay?: string;
  style?: CSSProperties;
}

const FloatingBadge = memo(function FloatingBadge({
  children, delay = 0, floatDur = "6s", floatDelay = "0s", style,
}: BadgeProps) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{
      position: "absolute",
      willChange: "transform",
      opacity: show ? 1 : 0,
      animation: show
        ? `nmt-badge 0.75s cubic-bezier(0.16,1,0.3,1) both, nmt-float ${floatDur} ease-in-out ${floatDelay} infinite`
        : "none",
      ...style,
    }}>
      {children}
    </div>
  );
});

/* ─── Main ────────────────────────────────────────────────────────────────── */
export default function NeuromotionTechHero() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt,    setTilt]    = useState({ x: 0, y: 0 });
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const onMove  = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const r = phoneRef.current.getBoundingClientRect();
    setTilt({
      x:  ((e.clientX - r.left) / r.width  - 0.5) * 14,
      y: -((e.clientY - r.top)  / r.height - 0.5) * 10,
    });
  }, []);

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => { setHovered(false); setTilt({ x: 0, y: 0 }); }, []);

  /* Premium glass badge — high contrast on ice blue bg */
  const glass: CSSProperties = {
    background: "rgba(0, 6, 18, 0.82)",
    backdropFilter: "blur(32px)",
    WebkitBackdropFilter: "blur(32px)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 16,
    padding: "12px 16px",
    willChange: "transform",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section style={L.section}>

        {/* ── Ice blue aurora background layers ── */}
        <div aria-hidden style={L.auroraWrap}>
          {/* Primary deep ice blue wash — covers entire bg */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 140% 100% at 50% -10%, #0d2d45 0%, #071829 40%, #000d1a 70%, #000810 100%)",
          }} />

          {/* Large aurora blob — top left */}
          <div style={{
            position: "absolute",
            top: "-20%", left: "-15%",
            width: "70vw", height: "70vw",
            maxWidth: 900, maxHeight: 900,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,124,163,0.42) 0%, rgba(37,124,163,0.18) 40%, transparent 70%)",
            animation: "nmt-aurora-1 18s ease-in-out infinite",
            willChange: "transform",
          }} />

          {/* Secondary aurora blob — bottom right */}
          <div style={{
            position: "absolute",
            bottom: "-25%", right: "-10%",
            width: "60vw", height: "60vw",
            maxWidth: 780, maxHeight: 780,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(13,66,100,0.55) 0%, rgba(9,44,70,0.28) 45%, transparent 70%)",
            animation: "nmt-aurora-2 22s ease-in-out infinite",
            willChange: "transform",
          }} />

          {/* Tertiary aurora — center accent */}
          <div style={{
            position: "absolute",
            top: "30%", left: "30%",
            width: "40vw", height: "40vw",
            maxWidth: 520, maxHeight: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,124,163,0.16) 0%, transparent 65%)",
            animation: "nmt-aurora-3 14s ease-in-out infinite",
            willChange: "transform",
          }} />

          {/* Horizontal light band across mid-section */}
          <div style={{
            position: "absolute",
            top: "35%", left: 0, right: 0, height: "30%",
            background: "linear-gradient(180deg, transparent 0%, rgba(37,124,163,0.06) 50%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* Top rim glow — pure white edge light */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 30%, rgba(37,124,163,0.5) 50%, rgba(255,255,255,0.12) 70%, transparent)",
          }} />

          {/* Animated grid — very subtle */}
          <div style={{
            position: "absolute", inset: "-50px",
            backgroundImage: "linear-gradient(rgba(37,124,163,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,124,163,0.06) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            animation: "nmt-grid 12s linear infinite",
            willChange: "transform",
          }} />

          {/* Noise grain overlay for depth */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
            opacity: 0.35,
            pointerEvents: "none",
          }} />
        </div>

        {/* Scanline */}
        <div style={L.scanLine} aria-hidden />

        {/* ── Content grid ── */}
        <div style={L.grid}>

          {/* LEFT — copy */}
          <div style={{
            ...L.copyCol,
            ...(mounted
              ? { animation: "nmt-right 0.9s cubic-bezier(0.16,1,0.3,1) both" }
              : { opacity: 0 }),
          }}>
            {/* Brand row */}
            <div style={L.brandRow}>
              <div style={L.logoBox} aria-label="NeuromotionTech logo">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" stroke="white" strokeWidth="1.5" />
                  <circle cx="8" cy="8" r="2.2" fill="white" />
                </svg>
              </div>
              <span style={L.brandName}>NeuromotionTech</span>
              <div style={L.livePill}>
                <div style={L.liveDot} />
                <span style={L.liveLabel}>Live</span>
              </div>
            </div>

            {/* Eyebrow */}
            <div style={L.eyebrow}>
              <div style={L.eyebrowBar} />
              <span style={L.eyebrowText}>Mobile-First Development</span>
            </div>

            {/* Headline */}
            <h1 style={L.h1}>
              Perfect Mobile{" "}
              <span style={L.gradWord}>Responsive</span>
              <br />
              <span style={L.h1Sub}>Website&thinsp;/&thinsp;Apps</span>
            </h1>

            {/* Body */}
            <p style={L.body}>
              We craft pixel-perfect digital experiences that flow seamlessly
              across every screen — engineered from concept to deployment with
              obsessive precision.
            </p>

            {/* CTA row */}
            <div style={L.ctaRow}>
              <button style={L.ctaPrimary}>
                Start a Project
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 8 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button style={L.ctaSecondary}>View Work</button>
            </div>

            {/* Trust badges */}
            <div style={L.trustRow}>
              {[
                { val: "500+", label: "Projects" },
                { val: "99%",  label: "Uptime" },
                { val: "4.9★", label: "Rating" },
              ].map((t) => (
                <div key={t.label} style={L.trustItem}>
                  <div style={L.trustVal}>{t.val}</div>
                  <div style={L.trustLabel}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — phone */}
          <div style={{
            ...L.phoneCol,
            ...(mounted
              ? { animation: "nmt-left 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s both" }
              : { opacity: 0 }),
          }}>

            {/* Pulse rings */}
            {PULSE_SCALES.map((sc, i) => (
              <div key={i} aria-hidden style={{
                position: "absolute",
                width: `${sc * 100}%`, height: `${sc * 70}%`,
                borderRadius: "50%",
                border: "1px solid rgba(37,124,163,0.12)",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                animation: `nmt-pulse 4.8s ease-in-out ${i * 0.8}s infinite`,
                pointerEvents: "none",
              }} />
            ))}

            {/* Phone with 3-D tilt */}
            <div
              ref={phoneRef}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              onMouseMove={onMove}
              style={{
                width: "clamp(268px, 36vw, 384px)",
                willChange: "transform",
                transform: `perspective(1100px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transition: hovered
                  ? "transform 0.08s linear"
                  : "transform 0.95s cubic-bezier(0.16,1,0.3,1)",
                filter: `drop-shadow(0 60px 120px rgba(37,124,163,${hovered ? 0.55 : 0.35}))
                         drop-shadow(0 24px 50px rgba(0,0,0,0.9))
                         drop-shadow(0 0 80px rgba(37,124,163,${hovered ? 0.22 : 0.12}))`,
                animation: "nmt-float 6.5s ease-in-out infinite",
              }}
            >
              <PhoneFrame hovered={hovered} />
            </div>

            {/* Badge — active users */}
            <FloatingBadge delay={850} floatDur="7.5s" floatDelay="1s"
              style={{ top: "8%", right: "-1%", ...glass }}>
              <div style={B.label}>Active Now</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex" }}>
                  {AVATAR_COLORS.map((c, i) => (
                    <div key={i} style={{
                      width: 24, height: 24, borderRadius: "50%",
                      background: `linear-gradient(135deg,${c},${c}66)`,
                      border: "2px solid #000d1a",
                      marginLeft: i === 0 ? 0 : -7,
                    }} />
                  ))}
                </div>
                <div>
                  <div style={B.val}>1,284</div>
                  <div style={{ ...B.sub, color: "#34d399" }}>↑ Live</div>
                </div>
              </div>
            </FloatingBadge>

            {/* Badge — lighthouse */}
            <FloatingBadge delay={1050} floatDur="5.5s" floatDelay="0.6s"
              style={{ bottom: "14%", left: "-2%", ...glass, borderColor: "rgba(37,124,163,0.22)" }}>
              <div style={{ ...B.label, color: "rgba(37,124,163,0.9)" }}>Performance</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ position: "relative", width: 38, height: 38 }}>
                  <svg viewBox="0 0 38 38"
                    style={{ transform: "rotate(-90deg)", width: 38, height: 38 }}>
                    <circle cx="19" cy="19" r="16" fill="none"
                      stroke="rgba(37,124,163,0.15)" strokeWidth="3" />
                    <circle cx="19" cy="19" r="16" fill="none"
                      stroke="#3dd6c8" strokeWidth="3"
                      strokeDasharray={`${0.97 * 100.53} 100.53`}
                      strokeLinecap="round" />
                  </svg>
                  <div style={B.radial}>97</div>
                </div>
                <div>
                  <div style={B.val}>Lighthouse</div>
                  <div style={B.sub}>Score</div>
                </div>
              </div>
            </FloatingBadge>

            {/* Badge — pixel perfect */}
            <FloatingBadge delay={1250} floatDur="8.5s" floatDelay="2.2s"
              style={{ top: "40%", right: "-8%", ...glass,
                borderColor: "rgba(167,139,250,0.2)",
                display: "flex", alignItems: "center", gap: 10 }}>
              <div style={B.icon}>✦</div>
              <div>
                <div style={B.val}>Pixel Perfect</div>
                <div style={B.sub}>Every breakpoint</div>
              </div>
            </FloatingBadge>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Layout styles ───────────────────────────────────────────────────────── */
const L = {
  section: {
    minHeight: "100vh", width: "100%",
    background: "#000d1a",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "clamp(52px,7vw,100px) clamp(20px,5vw,64px)",
    position: "relative", overflow: "hidden",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
  } as CSSProperties,

  auroraWrap: {
    position: "absolute", inset: 0,
    overflow: "hidden", pointerEvents: "none",
  } as CSSProperties,

  grid: {
    width: "100%", maxWidth: 1200,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "clamp(48px,6vw,100px)",
    alignItems: "center",
    position: "relative", zIndex: 1,
  } as CSSProperties,

  copyCol: {
    display: "flex", flexDirection: "column",
    alignItems: "center", textAlign: "center",
  } as CSSProperties,

  phoneCol: {
    display: "flex", justifyContent: "center", alignItems: "center",
    position: "relative",
    minHeight: "clamp(460px,62vw,700px)",
  } as CSSProperties,

  scanLine: {
    position: "absolute", left: 0, right: 0, height: 1,
    background: "linear-gradient(90deg, transparent, rgba(37,124,163,0.18), transparent)",
    animation: "nmt-scan 12s linear infinite",
    willChange: "top", pointerEvents: "none", zIndex: 0,
  } as CSSProperties,

  brandRow: {
    display: "flex", alignItems: "center", gap: 10,
    marginBottom: "clamp(18px,2.8vw,28px)", justifyContent: "center",
  } as CSSProperties,

  logoBox: {
    width: 34, height: 34, borderRadius: 9,
    background: "linear-gradient(135deg,#257ca3,#1a5f82)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 0 28px rgba(37,124,163,0.65), 0 0 60px rgba(37,124,163,0.25)",
    flexShrink: 0,
    border: "1px solid rgba(37,124,163,0.4)",
  } as CSSProperties,

  brandName: {
    fontSize: "clamp(14px,1.5vw,17px)", fontWeight: 600,
    color: "rgba(255,255,255,0.95)", letterSpacing: "0.2px",
  } as CSSProperties,

  livePill: {
    padding: "3px 9px", borderRadius: 20,
    background: "rgba(37,124,163,0.12)", border: "1px solid rgba(37,124,163,0.3)",
    display: "flex", alignItems: "center", gap: 5,
  } as CSSProperties,

  liveDot: {
    width: 5, height: 5, borderRadius: "50%",
    background: "#3dd6c8",
    boxShadow: "0 0 8px #3dd6c8",
    animation: "nmt-dot 1.6s ease infinite",
  } as CSSProperties,

  liveLabel: {
    fontSize: 9, color: "#3dd6c8",
    letterSpacing: "1.5px", textTransform: "uppercase" as const,
    fontWeight: 600,
  } as CSSProperties,

  eyebrow: {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "5px 14px", borderRadius: 4,
    background: "rgba(37,124,163,0.08)",
    border: "1px solid rgba(37,124,163,0.22)",
    marginBottom: "clamp(14px,2.2vw,22px)",
  } as CSSProperties,

  eyebrowBar: { width: 1, height: 11, background: "#257ca3", opacity: 0.9 } as CSSProperties,

  eyebrowText: {
    fontSize: "clamp(9px,0.9vw,10px)", color: "#5ba8cc",
    letterSpacing: "3px", textTransform: "uppercase" as const, fontWeight: 600,
  } as CSSProperties,

  h1: {
    fontSize: "clamp(34px,4.8vw,62px)", fontWeight: 800,
    lineHeight: 1.07, letterSpacing: "-1.5px",
    color: "#ffffff", margin: "0 0 clamp(14px,2.2vw,22px)",
    textShadow: "0 2px 40px rgba(37,124,163,0.2)",
  } as CSSProperties,

  gradWord: {
    display: "inline-block",
    background: "linear-gradient(135deg, #257ca3 0%, #3dd6c8 45%, #60c8f5 75%, #a78bfa 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "nmt-shimmer 4.5s linear infinite",
    filter: "drop-shadow(0 0 20px rgba(37,124,163,0.5))",
  } as CSSProperties,

  h1Sub: {
    fontWeight: 300, fontSize: "0.8em",
    color: "rgba(255,255,255,0.4)", letterSpacing: "-0.5px",
  } as CSSProperties,

  body: {
    fontSize: "clamp(13px,1.3vw,15px)", lineHeight: 1.82,
    color: "rgba(255,255,255,0.5)", fontWeight: 400,
    maxWidth: 400, margin: 0, letterSpacing: "0.1px",
  } as CSSProperties,

  ctaRow: {
    display: "flex", gap: 12, marginTop: "clamp(22px,3vw,32px)",
    justifyContent: "center", flexWrap: "wrap" as const,
  } as CSSProperties,

  ctaPrimary: {
    display: "inline-flex", alignItems: "center",
    padding: "12px 26px", borderRadius: 10,
    background: "linear-gradient(135deg, #257ca3 0%, #1a5f82 100%)",
    color: "#ffffff", fontWeight: 700,
    fontSize: "clamp(13px,1.2vw,14px)", letterSpacing: "0.2px",
    border: "1px solid rgba(37,124,163,0.5)",
    boxShadow: "0 0 28px rgba(37,124,163,0.45), 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
    cursor: "pointer",
    fontFamily: "inherit",
  } as CSSProperties,

  ctaSecondary: {
    display: "inline-flex", alignItems: "center",
    padding: "12px 26px", borderRadius: 10,
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.75)", fontWeight: 600,
    fontSize: "clamp(13px,1.2vw,14px)",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
    cursor: "pointer",
    fontFamily: "inherit",
    backdropFilter: "blur(12px)",
  } as CSSProperties,

  trustRow: {
    display: "flex", gap: 28, marginTop: "clamp(24px,3vw,36px)",
    justifyContent: "center",
    paddingTop: "clamp(18px,2vw,24px)",
    borderTop: "1px solid rgba(37,124,163,0.12)",
  } as CSSProperties,

  trustItem: { textAlign: "center" as const } as CSSProperties,

  trustVal: {
    fontSize: "clamp(18px,2vw,22px)", fontWeight: 800,
    color: "#ffffff", letterSpacing: "-0.5px",
    textShadow: "0 0 20px rgba(37,124,163,0.4)",
  } as CSSProperties,

  trustLabel: {
    fontSize: 9, color: "rgba(37,124,163,0.75)",
    letterSpacing: "2px", textTransform: "uppercase" as const,
    fontWeight: 600, marginTop: 3,
  } as CSSProperties,
} as const;

/* ─── Badge sub-styles ────────────────────────────────────────────────────── */
const B = {
  label: {
    fontSize: 8, color: "rgba(255,255,255,0.3)",
    letterSpacing: "2px", textTransform: "uppercase" as const, marginBottom: 8,
  } as CSSProperties,
  val:   { color: "#ffffff", fontSize: 13, fontWeight: 700 } as CSSProperties,
  sub:   { color: "rgba(255,255,255,0.32)", fontSize: 9  } as CSSProperties,
  radial: {
    position: "absolute", inset: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "white", fontSize: 9, fontWeight: 700,
  } as CSSProperties,
  icon: {
    width: 28, height: 28, borderRadius: 8,
    background: "linear-gradient(135deg,#a78bfa,#818cf8)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, flexShrink: 0,
    boxShadow: "0 0 16px rgba(167,139,250,0.4)",
  } as CSSProperties,
} as const;

/* ─── App screen sub-styles ───────────────────────────────────────────────── */
const SC = {
  screen: {
    width: "100%", height: "100%",
    background: "linear-gradient(175deg, #010810 0%, #071929 42%, #040f1e 100%)",
    position: "relative", overflow: "hidden",
  } as CSSProperties,
  grid: {
    position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
    backgroundImage:
      "linear-gradient(rgba(37,124,163,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,124,163,1) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
  } as CSSProperties,
  statusBar: {
    display: "flex", justifyContent: "space-between",
    padding: "14px 22px 0", color: "rgba(255,255,255,0.85)",
    fontSize: 11, fontWeight: 600, position: "relative", zIndex: 1,
  } as CSSProperties,
  appRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: 11,
  } as CSSProperties,
  appLabel: {
    fontSize: 9, color: "#257ca3",
    letterSpacing: "2.5px", textTransform: "uppercase" as const, marginBottom: 3,
  } as CSSProperties,
  appTitle:    { fontSize: 17, color: "white", fontWeight: 700 } as CSSProperties,
  appIcon: {
    width: 32, height: 32, borderRadius: 9,
    background: "linear-gradient(135deg,#257ca3,#1a5f82)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 0 14px rgba(37,124,163,0.5)",
  } as CSSProperties,
  appIconInner: {
    width: 13, height: 13, borderRadius: 3,
    border: "2px solid rgba(255,255,255,0.9)",
  } as CSSProperties,
  card: {
    background: "linear-gradient(135deg, rgba(37,124,163,0.12) 0%, rgba(13,66,100,0.08) 100%)",
    border: "1px solid rgba(37,124,163,0.2)",
    borderRadius: 17, padding: 14, marginBottom: 9,
    boxShadow: "inset 0 1px 0 rgba(37,124,163,0.1)",
  } as CSSProperties,
  cardLabel: {
    fontSize: 9, color: "rgba(37,124,163,0.8)",
    letterSpacing: "2px", textTransform: "uppercase" as const, marginBottom: 5,
  } as CSSProperties,
  cardValue: {
    fontSize: 25, color: "white", fontWeight: 800,
    letterSpacing: "-1px", marginBottom: 5,
  } as CSSProperties,
  badge: {
    background: "rgba(52,211,153,0.13)", border: "1px solid rgba(52,211,153,0.27)",
    borderRadius: 6, padding: "2px 8px", fontSize: 9, color: "#34d399", fontWeight: 600,
  } as CSSProperties,
  cardSub:  { fontSize: 9, color: "rgba(255,255,255,0.27)" } as CSSProperties,
  chartRow: {
    marginTop: 11, height: 34,
    display: "flex", alignItems: "flex-end", gap: 3,
  } as CSSProperties,
  bar: { flex: 1, borderRadius: "2px 2px 0 0" } as CSSProperties,
  metricsRow: { display: "flex", gap: 8, marginBottom: 9 } as CSSProperties,
  metricCard: {
    flex: 1,
    background: "rgba(37,124,163,0.06)", border: "1px solid rgba(37,124,163,0.1)",
    borderRadius: 13, padding: "11px 10px",
  } as CSSProperties,
  metricLabel: {
    fontSize: 8, color: "rgba(255,255,255,0.3)",
    letterSpacing: "1.5px", textTransform: "uppercase" as const, marginBottom: 4,
  } as CSSProperties,
  metricVal:   { fontSize: 16, color: "white", fontWeight: 700, marginBottom: 3 } as CSSProperties,
  metricTrend: { fontSize: 9, color: "#34d399", fontWeight: 600 } as CSSProperties,
  activity: {
    background: "rgba(37,124,163,0.04)", border: "1px solid rgba(37,124,163,0.1)",
    borderRadius: 13, overflow: "hidden",
  } as CSSProperties,
  activityHead: {
    padding: "9px 12px 7px", fontSize: 8, color: "rgba(255,255,255,0.25)",
    letterSpacing: "2px", textTransform: "uppercase" as const,
    borderBottom: "1px solid rgba(37,124,163,0.08)",
  } as CSSProperties,
  activityRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "9px 12px", borderBottom: "1px solid rgba(37,124,163,0.06)",
  } as CSSProperties,
  dot:         { width: 6, height: 6, borderRadius: "50%" } as CSSProperties,
  activityName: { color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: 500 } as CSSProperties,
  activityStatus: {
    fontSize: 9, color: "rgba(255,255,255,0.3)",
    background: "rgba(37,124,163,0.08)", padding: "2px 7px", borderRadius: 20,
    border: "1px solid rgba(37,124,163,0.15)",
  } as CSSProperties,
  bottomNav: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    background: "linear-gradient(to top, rgba(1,8,16,0.98) 60%, transparent)",
    padding: "12px 28px 26px",
    display: "flex", justifyContent: "space-around",
  } as CSSProperties,
} as const;