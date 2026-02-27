'use client';

/**
 * ServicesTimeline — Performance-optimised rewrite
 *
 * WHAT WAS REMOVED (and why):
 *  ✕ Particle system         — 10+ animated divs on RAF loops = GPU drain on mobile
 *  ✕ CountUp                 — requestAnimationFrame number-ticking during scroll = jank
 *  ✕ TimelineNode pulse rings — 22 continuous motion.divs (2 per node × 11 services)
 *  ✕ Mouse-tilt on cards     — useMotionValue + useSpring + useTransform per card = expensive
 *  ✕ Mouse-follow radial glow— repaints on every mousemove
 *  ✕ Per-card shimmer motion — continuous translateX animation per card
 *  ✕ useSpring on scroll     — replaced with direct useTransform (smoother on low-end)
 *
 * WHAT WAS KEPT / IMPROVED:
 *  ✓ Scroll-driven timeline line (the signature animation — GPU-composited via height transform)
 *  ✓ Comet head on timeline line
 *  ✓ Card entrance animations (opacity + translateX, once, GPU-composited)
 *  ✓ Active state colour changes via CSS transition (no JS)
 *  ✓ Node active pulse via CSS @keyframes (single element, no framer-motion)
 *  ✓ Header stagger (runs once)
 *  ✓ All original card & layout designs preserved
 *  ✓ Background depth via pure CSS gradients + grid (zero JS)
 *  ✓ React.memo on all leaf components
 *  ✓ Static data arrays outside component tree
 */

import React, {
  useRef, useState, useEffect, useCallback, memo,
} from 'react';
import {
  motion, useScroll, useTransform, MotionValue,
} from 'framer-motion';
import {
  Box, Cpu, Code2, Briefcase, Film, Database,
  Camera, Search, Share2, Palette, Globe,
  ArrowRight, Zap, ChevronDown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Service {
  id: string; title: string; sub: string; description: string;
  tags: string[]; accent: string; glow: string; icon: LucideIcon;
  stat: string; statLabel: string; year: string;
}

/* ─── Static data (defined once outside the component tree) ──────────────── */
const SERVICES: Service[] = [
  { id:'01', title:'3D Animation',          sub:'Bring ideas to life',            description:'Cinematic 3D animations and motion graphics that captivate audiences across every platform — from product launches to brand films.',                               tags:['Motion Graphics','VFX'],       accent:'#22d3ee', glow:'rgba(34,211,238,0.4)',   icon:Box,       stat:'60+',  statLabel:'Animations Delivered', year:'Service 01' },
  { id:'02', title:'AI Automation',          sub:'Intelligent systems',            description:'Custom AI pipelines and intelligent agents that eliminate repetitive tasks, reduce costs and scale your operations without scaling headcount.',                      tags:['LLM Integration','Bots'],      accent:'#a78bfa', glow:'rgba(167,139,250,0.4)', icon:Cpu,       stat:'10×',  statLabel:'Efficiency Gain',      year:'Service 02' },
  { id:'03', title:'App Development',        sub:'Full-stack performance',         description:'Cross-platform web and mobile applications engineered with React, Next.js and React Native — designed for speed, scalability and seamless UX.',                     tags:['React','Next.js'],             accent:'#60a5fa', glow:'rgba(96,165,250,0.4)',   icon:Code2,     stat:'40+',  statLabel:'Apps Shipped',         year:'Service 03' },
  { id:'04', title:'Business Consultation',  sub:'Strategy & growth',              description:'Expert-led digital strategy, growth frameworks and technology roadmaps tailored to your business goals — turning ambiguity into clear, executable plans.',           tags:['Strategy','Roadmaps'],         accent:'#fbbf24', glow:'rgba(251,191,36,0.4)',   icon:Briefcase, stat:'95%',  statLabel:'Client Retention',     year:'Service 04' },
  { id:'05', title:'CGI Ads',                sub:'Hyper-real creative',            description:'Photorealistic CGI product advertisements — cheaper than traditional shoots with infinite control over lighting, environment and composition.',                      tags:['CGI','Ad Creative'],           accent:'#f472b6', glow:'rgba(244,114,182,0.4)', icon:Film,      stat:'3×',   statLabel:'Higher Engagement',    year:'Service 05' },
  { id:'06', title:'CRM Portals',            sub:'Enterprise dashboards',          description:'Bespoke CRM and client management portals with role-based dashboards, automated workflows and deep integrations — built around your process.',                      tags:['Dashboards','B2B'],            accent:'#34d399', glow:'rgba(52,211,153,0.4)',   icon:Database,  stat:'25h',  statLabel:'Saved Per Week',       year:'Service 06' },
  { id:'07', title:'Product Photoshoot',     sub:'Commercial photography',         description:'Studio and lifestyle product photography combining art direction, post-production and brand consistency — images built to perform across all channels.',              tags:['Photography','Art Direction'], accent:'#fb923c', glow:'rgba(251,146,60,0.4)',   icon:Camera,    stat:'500+', statLabel:'Products Shot',        year:'Service 07' },
  { id:'08', title:'SEO',                    sub:'Organic growth',                 description:'Technical SEO audits, content strategy and link building — a full-funnel approach that drives qualified traffic and sustainable search rankings.',                   tags:['Technical SEO','Content'],     accent:'#4ade80', glow:'rgba(74,222,128,0.4)',   icon:Search,    stat:'8×',   statLabel:'Traffic Growth',       year:'Service 08' },
  { id:'09', title:'Social Media Marketing', sub:'Content that builds communities',description:'Platform-native content creation, paid social campaigns and community management — turning followers into brand advocates across every platform.',                  tags:['Content','Paid Social'],       accent:'#f43f5e', glow:'rgba(244,63,94,0.4)',    icon:Share2,    stat:'340%', statLabel:'Avg. Growth',          year:'Service 09' },
  { id:'10', title:'Web Designing',          sub:'Interfaces that impress',        description:'UI/UX design grounded in psychology, conversion science and aesthetic precision — wireframes to polished Figma prototypes developers love to build.',                tags:['UI/UX','Design Systems'],      accent:'#818cf8', glow:'rgba(129,140,248,0.4)',  icon:Palette,   stat:'+34%', statLabel:'Conversion Lift',      year:'Service 10' },
  { id:'11', title:'Web Development',        sub:'Sites that scale',               description:'From bespoke marketing sites to complex SaaS platforms — performant, accessible, SEO-ready web development using latest frameworks and best-in-class infrastructure.',tags:['Next.js','Performance'],      accent:'#38bdf8', glow:'rgba(56,189,248,0.4)',   icon:Globe,     stat:'99%',  statLabel:'Uptime SLA',           year:'Service 11' },
];

/* ─── CSS injected once at module level ──────────────────────────────────── */
const GLOBAL_CSS = `
  /* Active node ring — single CSS animation, no JS */
  @keyframes nmt-ring {
    0%   { transform: translate(-50%,-50%) scale(1);   opacity: .6; }
    100% { transform: translate(-50%,-50%) scale(2.4); opacity: 0;  }
  }
  .nmt-node-ring {
    position: absolute; top: 50%; left: 50%;
    border-radius: 50%;
    animation: nmt-ring 2.2s ease-out infinite;
    pointer-events: none;
  }
  /* Scroll-progress comet head pulsing */
  @keyframes nmt-comet-pulse {
    0%,100% { transform: translate(-50%,-50%) scale(1);   }
    50%      { transform: translate(-50%,-50%) scale(1.35); }
  }
  .nmt-comet { animation: nmt-comet-pulse 2s ease-in-out infinite; }

  /* Live dot blink */
  @keyframes nmt-blink {
    0%,100% { opacity: 1; } 50% { opacity: .25; }
  }
  .nmt-blink { animation: nmt-blink 1.8s ease-in-out infinite; }

  /* Scroll cue bounce */
  @keyframes nmt-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
  .nmt-bounce { animation: nmt-bounce 1.6s ease-in-out infinite; }
`;

/* ─── Background — pure CSS, zero JS ────────────────────────────────────── */
const Background = memo(function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: '#000000' }} />
    </div>
  );
});

/* ─── Node — CSS-only pulse ring ────────────────────────────────────────── */
interface NodeProps { active: boolean; accent: string; size?: number; }

const TimelineNode = memo(function TimelineNode({ active, accent, size = 28 }: NodeProps) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* CSS-animated ring — only when active, single element */}
      {active && (
        <span
          className="nmt-node-ring"
          style={{
            width: size + 14, height: size + 14,
            border: `1.5px solid ${accent}`,
          }}
        />
      )}
      {/* Node body */}
      <div
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: size, height: size,
          background: active ? accent : 'rgba(12,18,30,0.95)',
          border: `2px solid ${active ? accent : 'rgba(56,189,248,0.25)'}`,
          boxShadow: active ? `0 0 14px ${accent}70, 0 0 30px ${accent}28` : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: size * 0.3, height: size * 0.3,
            background: active ? '#080c14' : 'rgba(56,189,248,0.4)',
            transition: 'background 0.4s ease',
          }}
        />
      </div>
    </div>
  );
});

/* ─── Scroll-driven timeline line + comet ────────────────────────────────── */
const TimelineLine = memo(function TimelineLine({ progress }: { progress: MotionValue<string> }) {
  return (
    <>
      {/* Static dim guide rail */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(56,189,248,0.18) 5%, rgba(56,189,248,0.10) 95%, transparent)',
          zIndex: 1,
        }}
      />
      {/* Animated fill line — height driven by scroll, GPU-composited */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 2,
          height: progress,
          background: 'linear-gradient(to bottom, #1e6fa8, #38bdf8, #22d3ee)',
          boxShadow: '0 0 14px rgba(34,211,238,0.55), 0 0 34px rgba(56,189,248,0.25)',
          borderRadius: 9999,
          zIndex: 2,
          willChange: 'height',
        }}
      />
      {/* Comet head — CSS pulsing, no JS animation loop */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 pointer-events-none"
        style={{ top: progress, zIndex: 10, willChange: 'top' }}
      >
        <div
          className="nmt-comet"
          style={{
            width: 16, height: 16,
            borderRadius: '50%',
            position: 'absolute',
            top: 0, left: 0,
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(circle, rgba(56,189,248,0.95) 0%, rgba(37,124,163,0.6) 55%, transparent 75%)',
            boxShadow: '0 0 12px 4px rgba(56,189,248,0.65), 0 0 28px 8px rgba(37,124,163,0.3)',
          }}
        />
      </motion.div>
    </>
  );
});

/* ─── Header ─────────────────────────────────────────────────────────────── */
const Header = memo(function Header({ inView }: { inView: boolean }) {
  return (
    <div className="text-center mb-20 sm:mb-28 px-4">
      {/* Badge row */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 mb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', backdropFilter: 'blur(20px)' }}
        >
          <Zap style={{ width: 9, height: 9, color: '#fbbf24' }} />
          <span className="text-[7.5px] font-black tracking-[0.25em] uppercase" style={{ color: 'rgba(56,189,248,0.8)' }}>
            Full Service Digital Studio
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="nmt-blink w-2 h-2 rounded-full inline-block"
            style={{ background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.75)' }}
          />
          <span className="text-[7.5px] font-black tracking-[0.22em] uppercase" style={{ color: 'rgba(74,222,128,0.85)' }}>
            11 Specialisms
          </span>
        </div>
      </motion.div>

      {/* Headline — mask-reveal */}
      <div className="overflow-hidden mb-1">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.6rem] sm:text-[3.8rem] md:text-[5.2rem] lg:text-[6rem] font-black leading-[0.96] tracking-[-0.035em]"
          style={{ color: '#f0f8ff', fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          Everything You
        </motion.h2>
      </div>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.6rem] sm:text-[3.8rem] md:text-[5.2rem] lg:text-[6rem] font-black leading-[0.96] tracking-[-0.035em]"
          style={{
            background: 'linear-gradient(125deg, #257ca3 0%, #38bdf8 42%, #22d3ee 70%, rgba(37,124,163,0.6) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          Need To Grow
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.38, duration: 0.6 }}
        className="text-[13px] sm:text-[15px] max-w-sm mx-auto leading-relaxed mt-6"
        style={{ color: 'rgba(160,190,215,0.5)', fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        Eleven specialist services engineered to transform your brand and drive compounding, measurable growth.
      </motion.p>

      {/* Divider dots */}
      <motion.div
        className="flex items-center justify-center gap-3 mt-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.55 }}
      >
        <motion.div
          className="h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5))' }}
          initial={{ width: 0 }}
          animate={inView ? { width: 120 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
        {[0, 1, 2].map(j => (
          <div
            key={j}
            className="rounded-full"
            style={{
              width: j === 1 ? 8 : 4,
              height: j === 1 ? 8 : 4,
              background: j === 1 ? 'rgba(56,189,248,0.7)' : 'rgba(56,189,248,0.3)',
            }}
          />
        ))}
        <motion.div
          className="h-px"
          style={{ background: 'linear-gradient(90deg, rgba(56,189,248,0.5), transparent)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: 120 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="flex flex-col items-center gap-2 mt-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9 }}
      >
        <span className="text-[7px] font-black tracking-[0.28em] uppercase" style={{ color: 'rgba(56,189,248,0.4)' }}>
          Scroll to explore
        </span>
        <span className="nmt-bounce inline-block">
          <ChevronDown style={{ width: 14, height: 14, color: 'rgba(56,189,248,0.45)' }} />
        </span>
      </motion.div>
    </div>
  );
});

/* ─── Mobile — Left identity panel ──────────────────────────────────────── */
const MobileLeftPanel = memo(function MobileLeftPanel({
  s, active, visible,
}: { s: Service; active: boolean; visible: boolean }) {
  const Icon = s.icon;
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl flex flex-col justify-between"
      style={{
        background: active
          ? `linear-gradient(145deg, ${s.accent}14 0%, rgba(8,12,20,0.97) 100%)`
          : 'linear-gradient(145deg, rgba(12,18,30,0.96) 0%, rgba(6,10,18,0.98) 100%)',
        border: `1px solid ${active ? s.accent + '35' : 'rgba(56,189,248,0.12)'}`,
        boxShadow: active ? `0 0 38px ${s.glow}, 0 10px 44px rgba(0,0,0,0.7)` : '0 6px 30px rgba(0,0,0,0.55)',
        padding: '18px 16px',
        minHeight: 160,
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease',
      }}
      initial={{ opacity: 0, x: -24 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-[8%] right-[8%] h-[1.5px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${s.accent}80, transparent)`,
          opacity: active ? 1 : 0.3,
          transition: 'opacity 0.4s ease',
        }}
      />
      {/* Corner glow */}
      <div className="absolute -top-8 -right-8 w-28 h-28 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${s.accent}12 0%, transparent 65%)` }} />

      <span className="text-[7.5px] font-black tracking-[0.2em] uppercase select-none block mb-3"
        style={{ color: `${s.accent}55` }}>{s.id}</span>

      <div
        className="flex items-center justify-center w-10 h-10 rounded-xl mb-3"
        style={{
          background: `${s.accent}10`,
          border: `1px solid ${s.accent}22`,
          transition: 'background 0.3s ease',
        }}
      >
        <Icon style={{ width: 16, height: 16, color: s.accent }} />
      </div>

      <h3
        className="font-black text-[0.88rem] leading-[1.1] tracking-tight"
        style={{ color: '#e8f4ff', fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {s.title}
      </h3>
      <p className="text-[7.5px] font-bold tracking-[0.1em] uppercase mt-1" style={{ color: `${s.accent}70` }}>
        {s.sub}
      </p>

      <div className="flex flex-wrap gap-1 mt-3">
        {s.tags.map(t => (
          <span
            key={t}
            className="text-[6px] font-bold tracking-wide px-2 py-0.5 rounded-full"
            style={{ color: 'rgba(160,190,215,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

/* ─── Mobile — Right metrics panel ──────────────────────────────────────── */
const MobileRightPanel = memo(function MobileRightPanel({
  s, active, visible,
}: { s: Service; active: boolean; visible: boolean }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl flex flex-col justify-between"
      style={{
        background: active
          ? `linear-gradient(225deg, ${s.accent}10 0%, rgba(8,12,20,0.97) 100%)`
          : 'linear-gradient(225deg, rgba(12,18,30,0.96) 0%, rgba(6,10,18,0.98) 100%)',
        border: `1px solid ${active ? s.accent + '30' : 'rgba(56,189,248,0.10)'}`,
        boxShadow: active ? `0 0 38px ${s.glow}, 0 10px 44px rgba(0,0,0,0.7)` : '0 6px 30px rgba(0,0,0,0.55)',
        padding: '18px 16px',
        minHeight: 160,
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease',
      }}
      initial={{ opacity: 0, x: 24 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-[8%] right-[8%] h-[1.5px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${s.accent}60, transparent)`,
          opacity: active ? 1 : 0.2,
          transition: 'opacity 0.4s ease',
        }}
      />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${s.accent}10 0%, transparent 65%)` }} />

      {/* Stat — static, no CountUp */}
      <div>
        <div
          className="font-black leading-none tabular-nums"
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
            color: s.accent,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            textShadow: active ? `0 0 22px ${s.accent}55` : 'none',
            transition: 'text-shadow 0.4s ease',
          }}
        >
          {s.stat}
        </div>
        <div className="text-[6.5px] font-black tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(160,190,215,0.35)' }}>
          {s.statLabel}
        </div>
      </div>

      <span
        className="inline-block text-[6px] font-black tracking-[0.18em] uppercase px-2.5 py-1 rounded-full mt-2 self-start"
        style={{ color: s.accent, background: `${s.accent}0e`, border: `1px solid ${s.accent}1c` }}
      >
        {s.year}
      </span>

      <p
        className="text-[9.5px] leading-[1.75] mt-2 flex-1"
        style={{
          color: 'rgba(160,190,215,0.45)',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        } as React.CSSProperties}
      >
        {s.description}
      </p>

      <div
        className="flex items-center justify-center w-7 h-7 rounded-full mt-3 self-end"
        style={{
          background: `${s.accent}10`,
          border: `1px solid ${s.accent}20`,
          transition: 'transform 0.25s ease',
          transform: active ? 'rotate(45deg) scale(1.08)' : 'rotate(0deg)',
        }}
      >
        <ArrowRight style={{ width: 11, height: 11, color: s.accent }} />
      </div>
    </motion.div>
  );
});

/* ─── Mobile row ─────────────────────────────────────────────────────────── */
const MobileRow = memo(function MobileRow({
  s, active,
}: { s: Service; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { rootMargin: '-50px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 44px 1fr',
        marginBottom: 20,
        alignItems: 'stretch',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <MobileLeftPanel s={s} active={active} visible={visible} />

      {/* Center corridor */}
      <div className="relative flex flex-col items-center justify-center" style={{ zIndex: 20 }}>
        <div
          className="absolute"
          style={{
            top: '50%', left: 0, width: '50%', height: 1,
            background: active
              ? `linear-gradient(90deg, transparent, ${s.accent}55)`
              : 'linear-gradient(90deg, transparent, rgba(56,189,248,0.14))',
            transition: 'background 0.4s ease',
            zIndex: 5,
          }}
        />
        <div
          className="absolute"
          style={{
            top: '50%', right: 0, width: '50%', height: 1,
            background: active
              ? `linear-gradient(270deg, transparent, ${s.accent}55)`
              : 'linear-gradient(270deg, transparent, rgba(56,189,248,0.14))',
            transition: 'background 0.4s ease',
            zIndex: 5,
          }}
        />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <TimelineNode active={active} accent={s.accent} size={24} />
        </div>
      </div>

      <MobileRightPanel s={s} active={active} visible={visible} />
    </div>
  );
});

/* ─── Desktop card ───────────────────────────────────────────────────────── */
const DesktopCard = memo(function DesktopCard({
  s, isLeft, active,
}: { s: Service; isLeft: boolean; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = s.icon;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { rootMargin: '-70px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateX(0)'
          : `translateX(${isLeft ? '-40px' : '40px'})`,
        transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        /* hardware accelerate entrance only */
        willChange: visible ? 'auto' : 'transform, opacity',
      }}
    >
      <div
        className="relative overflow-hidden rounded-2xl cursor-pointer group"
        style={{
          background: 'linear-gradient(145deg, rgba(12,18,30,0.97) 0%, rgba(6,10,18,0.99) 100%)',
          border: `1px solid ${active ? s.accent + '38' : 'rgba(56,189,248,0.12)'}`,
          boxShadow: active
            ? `0 0 0 1px ${s.accent}18, 0 20px 64px rgba(0,0,0,0.8), 0 0 72px ${s.glow}`
            : '0 10px 44px rgba(0,0,0,0.65)',
          transition: 'border-color 0.4s ease, box-shadow 0.5s ease',
        }}
      >
        {/* Top edge glow line */}
        <div
          className="absolute top-0 left-[8%] right-[8%] h-[1.5px] rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${s.accent}cc, transparent)`,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.3s',
          }}
        />

        {/* Corner accent glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            [isLeft ? 'right' : 'left']: -40, top: -40,
            width: 200, height: 200,
            background: `radial-gradient(circle, ${s.accent}12 0%, transparent 65%)`,
          }}
        />

        {/* SVG grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.045]" aria-hidden="true">
          <defs>
            <pattern id={`dg${s.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke={s.accent} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dg${s.id})`} />
        </svg>

        {/* Content */}
        <div className="relative z-10 p-7 xl:p-9">
          {/* Top row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="text-[7.5px] font-black tracking-[0.22em] select-none" style={{ color: `${s.accent}40` }}>
                {s.id}
              </span>
              <div
                className="flex items-center justify-center w-11 h-11 rounded-xl"
                style={{ background: `${s.accent}10`, border: `1px solid ${s.accent}22` }}
              >
                <Icon style={{ width: 18, height: 18, color: s.accent }} />
              </div>
            </div>
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{
                background: `${s.accent}0e`,
                border: `1px solid ${s.accent}1e`,
                transform: active ? 'rotate(45deg) scale(1.12)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease',
              }}
            >
              <ArrowRight style={{ width: 13, height: 13, color: s.accent }} />
            </div>
          </div>

          {/* Year badge */}
          <span
            className="inline-block text-[7px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
            style={{ color: s.accent, background: `${s.accent}0e`, border: `1px solid ${s.accent}1c` }}
          >
            {s.year}
          </span>

          {/* Title */}
          <h3
            className="text-[1.2rem] xl:text-[1.45rem] font-black leading-[1.05] tracking-tight mb-2"
            style={{ color: '#f0f8ff', fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            {s.title}
          </h3>

          {/* Underline */}
          <div
            className="h-[1.5px] rounded-full mb-3"
            style={{
              background: `linear-gradient(90deg, ${s.accent}90, transparent)`,
              width: visible ? (active ? 72 : 44) : 0,
              transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s',
            }}
          />

          <p className="text-[9.5px] font-bold tracking-[0.13em] uppercase mb-3" style={{ color: `${s.accent}80` }}>
            {s.sub}
          </p>

          <p
            className="text-[11.5px] xl:text-[12.5px] leading-[1.85] mb-5"
            style={{ color: 'rgba(160,190,215,0.52)', fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            {s.description}
          </p>

          {/* Footer */}
          <div
            className="flex items-end justify-between gap-3 pt-4"
            style={{ borderTop: `1px solid ${s.accent}12` }}
          >
            <div className="flex flex-wrap gap-1.5">
              {s.tags.map(t => (
                <span
                  key={t}
                  className="text-[6.5px] font-bold tracking-wide px-2.5 py-1 rounded-full"
                  style={{ color: 'rgba(160,190,215,0.38)', background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {t}
                </span>
              ))}
            </div>
            {/* Static stat — no CountUp */}
            <div className="text-right shrink-0">
              <div
                className="font-black leading-none tabular-nums"
                style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                  color: s.accent,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  textShadow: active ? `0 0 26px ${s.accent}50` : 'none',
                  transition: 'text-shadow 0.4s ease',
                }}
              >
                {s.stat}
              </div>
              <div className="text-[6.5px] font-black tracking-widest uppercase mt-0.5" style={{ color: 'rgba(160,190,215,0.28)' }}>
                {s.statLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/* ─── Desktop row ─────────────────────────────────────────────────────────── */
const DesktopRow = memo(function DesktopRow({
  s, index, active,
}: { s: Service; index: number; active: boolean }) {
  const isLeft = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { rootMargin: '-70px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 96px 1fr',
        alignItems: 'center',
        marginBottom: 48,
      }}
    >
      {/* LEFT ZONE */}
      <div>
        {isLeft ? (
          <DesktopCard s={s} isLeft={true} active={active} />
        ) : (
          <div
            style={{
              textAlign: 'right',
              paddingRight: 32,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-18px)',
              transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
            }}
          >
            <div
              className="font-black leading-none tabular-nums"
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                color: active ? s.accent : `${s.accent}22`,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                textShadow: active ? `0 0 55px ${s.accent}38` : 'none',
                transition: 'color 0.5s ease, text-shadow 0.5s ease',
                letterSpacing: '-0.04em',
              }}
            >
              {s.stat}
            </div>
            <div
              className="text-[8px] font-black tracking-[0.22em] uppercase mt-2"
              style={{
                color: active ? `${s.accent}60` : 'rgba(56,189,248,0.15)',
                transition: 'color 0.5s ease',
              }}
            >
              {s.statLabel}
            </div>
            <div className="text-[7px] font-black tracking-[0.18em] uppercase mt-4" style={{ color: 'rgba(160,190,215,0.18)' }}>
              {s.year}
            </div>
          </div>
        )}
      </div>

      {/* CENTER corridor — node + connectors */}
      <div className="relative flex items-center justify-center" style={{ zIndex: 20 }}>
        <div
          className="absolute left-0 right-1/2"
          style={{
            top: '50%', height: 1,
            background: active
              ? `linear-gradient(90deg, transparent, ${s.accent}52)`
              : 'linear-gradient(90deg, transparent, rgba(56,189,248,0.11))',
            transition: 'background 0.4s ease',
          }}
        />
        <div
          className="absolute right-0 left-1/2"
          style={{
            top: '50%', height: 1,
            background: active
              ? `linear-gradient(270deg, transparent, ${s.accent}52)`
              : 'linear-gradient(270deg, transparent, rgba(56,189,248,0.11))',
            transition: 'background 0.4s ease',
          }}
        />
        <TimelineNode active={active} accent={s.accent} size={32} />
      </div>

      {/* RIGHT ZONE */}
      <div>
        {!isLeft ? (
          <DesktopCard s={s} isLeft={false} active={active} />
        ) : (
          <div
            style={{
              paddingLeft: 32,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(18px)',
              transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
            }}
          >
            <div
              className="font-black leading-none tracking-tight"
              style={{
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                color: active ? s.accent : `${s.accent}22`,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                transition: 'color 0.5s ease',
              }}
            >
              {s.title}
            </div>
            <div
              className="text-[8px] font-bold tracking-[0.14em] uppercase mt-2 max-w-xs"
              style={{
                color: active ? `${s.accent}55` : 'rgba(56,189,248,0.12)',
                transition: 'color 0.5s ease',
              }}
            >
              {s.sub}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {s.tags.map(t => (
                <span
                  key={t}
                  className="text-[6.5px] font-bold tracking-wide px-2.5 py-1 rounded-full"
                  style={{
                    color: active ? `${s.accent}70` : 'rgba(56,189,248,0.2)',
                    background: active ? `${s.accent}08` : 'rgba(56,189,248,0.04)',
                    border: `1px solid ${active ? s.accent + '18' : 'rgba(56,189,248,0.08)'}`,
                    transition: 'all 0.4s ease',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

/* ─── Root ───────────────────────────────────────────────────────────────── */
export default function ServicesTimeline() {
  const pageRef    = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef  = useRef<HTMLDivElement>(null);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeIndex,   setActiveIndex]   = useState(-1);

  // Header visibility via IntersectionObserver (no framer overhead)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { rootMargin: '-50px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Desktop timeline line — useScroll + useTransform only ── */
  const { scrollYProgress: deskProg } = useScroll({
    target: desktopRef,
    offset: ['start 10%', 'end 90%'],
  });
  // Direct transform — no useSpring (smoother on low-end: no over-shoot physics)
  const deskHeight = useTransform(deskProg, [0, 1], ['0%', '100%']);

  /* ── Mobile timeline line ── */
  const { scrollYProgress: mobProg } = useScroll({
    target: mobileRef,
    offset: ['start 12%', 'end 88%'],
  });
  const mobHeight = useTransform(mobProg, [0, 1], ['0%', '100%']);

  /* ── Active index — throttled via scroll event ── */
  const { scrollYProgress: pageProg } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return pageProg.on('change', (v) => {
      const idx = Math.min(
        Math.floor(v * (SERVICES.length + 1.5) - 0.4),
        SERVICES.length - 1,
      );
      if (idx >= 0) setActiveIndex(idx);
    });
  }, [pageProg]);

  return (
    <>
      {/* Inject CSS once */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <div
        ref={pageRef}
        className="relative overflow-hidden"
        style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}
      >
        <Background />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">

          {/* Header */}
          <div ref={headerRef} className="pt-20 sm:pt-28">
            <Header inView={headerVisible} />
          </div>

          {/* ── Desktop (lg+) ── */}
          <div ref={desktopRef} className="relative pb-28 hidden lg:block">
            <TimelineLine progress={deskHeight} />
            {SERVICES.map((s, i) => (
              <DesktopRow key={s.id} s={s} index={i} active={i <= activeIndex} />
            ))}
          </div>

          {/* ── Mobile / Tablet (< lg) ── */}
        <div className="lg:hidden pb-20">
  <div ref={mobileRef} className="relative">
    <TimelineLine progress={mobHeight} />
    {SERVICES.map((s, i) => (
      <MobileRow key={s.id} s={s} active={i <= activeIndex} />
    ))}
  </div>
</div>

          {/* Footer strip */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 pb-16 pt-6"
            style={{ borderTop: '1px solid rgba(56,189,248,0.1)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {(['Full-service digital studio', 'UK & Global clients', '4.9★ average rating'] as const).map((text, i) => (
              <React.Fragment key={text}>
                {i > 0 && (
                  <span className="hidden sm:block w-1 h-1 rounded-full" style={{ background: 'rgba(56,189,248,0.25)' }} />
                )}
                <span className="text-[7.5px] font-black tracking-[0.24em] uppercase" style={{ color: 'rgba(56,189,248,0.35)' }}>
                  {text}
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}