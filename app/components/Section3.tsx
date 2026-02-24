'use client';

import React, {
  useRef, useState, useEffect, useCallback, useMemo,
} from 'react';
import {
  motion, useScroll, useTransform, useSpring,
  useInView, useMotionValue, MotionValue,
} from 'framer-motion';
import {
  Box, Cpu, Code2, Briefcase, Film, Database,
  Camera, Search, Share2, Palette, Globe,
  ArrowRight, Zap, ChevronDown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */
interface Service {
  id: string;
  title: string;
  sub: string;
  description: string;
  tags: string[];
  accent: string;
  glow: string;
  icon: LucideIcon;
  stat: string;
  statLabel: string;
  year: string;
}

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const SERVICES: Service[] = [
  { id:'01', title:'3D Animation',           sub:'Bring ideas to life',           description:'Cinematic 3D animations and motion graphics that captivate audiences across every platform — from product launches to brand films.',                              tags:['Motion Graphics','VFX'],        accent:'#22d3ee', glow:'rgba(34,211,238,0.4)',   icon:Box,       stat:'60+',  statLabel:'Animations Delivered' , year:'Service 01' },
  { id:'02', title:'AI Automation',           sub:'Intelligent systems',           description:'Custom AI pipelines and intelligent agents that eliminate repetitive tasks, reduce costs and scale your operations without scaling headcount.',                     tags:['LLM Integration','Bots'],       accent:'#a78bfa', glow:'rgba(167,139,250,0.4)', icon:Cpu,      stat:'10×',  statLabel:'Efficiency Gain'      , year:'Service 02' },
  { id:'03', title:'App Development',         sub:'Full-stack performance',        description:'Cross-platform web and mobile applications engineered with React, Next.js and React Native — designed for speed, scalability and seamless UX.',                    tags:['React','Next.js'],              accent:'#60a5fa', glow:'rgba(96,165,250,0.4)',   icon:Code2,    stat:'40+',  statLabel:'Apps Shipped'         , year:'Service 03' },
  { id:'04', title:'Business Consultation',   sub:'Strategy & growth',             description:'Expert-led digital strategy, growth frameworks and technology roadmaps tailored to your business goals — turning ambiguity into clear, executable plans.',          tags:['Strategy','Roadmaps'],          accent:'#fbbf24', glow:'rgba(251,191,36,0.4)',   icon:Briefcase,stat:'95%',  statLabel:'Client Retention'     , year:'Service 04' },
  { id:'05', title:'CGI Ads',                 sub:'Hyper-real creative',           description:'Photorealistic CGI product advertisements — cheaper than traditional shoots with infinite control over lighting, environment and composition.',                     tags:['CGI','Ad Creative'],            accent:'#f472b6', glow:'rgba(244,114,182,0.4)', icon:Film,     stat:'3×',   statLabel:'Higher Engagement'    , year:'Service 05' },
  { id:'06', title:'CRM Portals',             sub:'Enterprise dashboards',         description:'Bespoke CRM and client management portals with role-based dashboards, automated workflows and deep integrations — built around your process.',                     tags:['Dashboards','B2B'],             accent:'#34d399', glow:'rgba(52,211,153,0.4)',   icon:Database, stat:'25h',  statLabel:'Saved Per Week'       , year:'Service 06' },
  { id:'07', title:'Product Photoshoot',      sub:'Commercial photography',        description:'Studio and lifestyle product photography combining art direction, post-production and brand consistency — images built to perform across all channels.',             tags:['Photography','Art Direction'],  accent:'#fb923c', glow:'rgba(251,146,60,0.4)',   icon:Camera,   stat:'500+', statLabel:'Products Shot'        , year:'Service 07' },
  { id:'08', title:'SEO',                     sub:'Organic growth',                description:'Technical SEO audits, content strategy and link building — a full-funnel approach that drives qualified traffic and sustainable search rankings.',                  tags:['Technical SEO','Content'],      accent:'#4ade80', glow:'rgba(74,222,128,0.4)',   icon:Search,   stat:'8×',   statLabel:'Traffic Growth'       , year:'Service 08' },
  { id:'09', title:'Social Media Marketing',  sub:'Content that builds communities',description:'Platform-native content creation, paid social campaigns and community management — turning followers into brand advocates across every platform.',                 tags:['Content','Paid Social'],        accent:'#f43f5e', glow:'rgba(244,63,94,0.4)',    icon:Share2,   stat:'340%', statLabel:'Avg. Growth'          , year:'Service 09' },
  { id:'10', title:'Web Designing',           sub:'Interfaces that impress',       description:'UI/UX design grounded in psychology, conversion science and aesthetic precision — wireframes to polished Figma prototypes developers love to build.',               tags:['UI/UX','Design Systems'],       accent:'#818cf8', glow:'rgba(129,140,248,0.4)',  icon:Palette,  stat:'+34%', statLabel:'Conversion Lift'      , year:'Service 10' },
  { id:'11', title:'Web Development',         sub:'Sites that scale',              description:'From bespoke marketing sites to complex SaaS platforms — performant, accessible, SEO-ready web development using latest frameworks and best-in-class infrastructure.', tags:['Next.js','Performance'],      accent:'#38bdf8', glow:'rgba(56,189,248,0.4)',   icon:Globe,    stat:'99%',  statLabel:'Uptime SLA'           , year:'Service 11' },
];

/* ═══════════════════════════════════════════════════════
   BACKGROUND
═══════════════════════════════════════════════════════ */
interface ParticleProps { x: number; y: number; size: number; delay: number; opacity: number; }

function Particle({ x, y, size, delay, opacity }: ParticleProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: `rgba(255,255,255,${opacity})` }}
      animate={{ y: [0, -24, 8, -14, 0], x: [0, 10, -6, 5, 0], opacity: [opacity, opacity * 2.5, opacity, opacity * 2, opacity] }}
      transition={{ duration: 12 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

function Background() {
  const particles = useMemo<ParticleProps[]>(() => [
    { x: 4,  y: 12, size: 3,   delay: 0,   opacity: 0.18 },
    { x: 94, y: 22, size: 2,   delay: 2.2, opacity: 0.12 },
    { x: 10, y: 58, size: 2.5, delay: 4.1, opacity: 0.15 },
    { x: 90, y: 70, size: 2,   delay: 1.1, opacity: 0.10 },
    { x: 50, y: 6,  size: 1.5, delay: 3.3, opacity: 0.16 },
    { x: 18, y: 84, size: 2,   delay: 5.2, opacity: 0.09 },
    { x: 78, y: 42, size: 1.5, delay: 2.7, opacity: 0.13 },
    { x: 62, y: 92, size: 2.5, delay: 1.6, opacity: 0.11 },
    { x: 33, y: 35, size: 1.5, delay: 3.8, opacity: 0.08 },
    { x: 72, y: 15, size: 2,   delay: 0.8, opacity: 0.14 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: '#080c14' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 60% at 50% -5%, rgba(24,92,130,0.55) 0%, transparent 60%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 80% at 0% 50%, rgba(24,92,130,0.12) 0%, transparent 60%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 80% at 100% 50%, rgba(24,92,130,0.10) 0%, transparent 60%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 50% at 50% 100%, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
      {/* Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.07) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      {/* Horizontal lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(56,189,248,0.03) 79px, rgba(56,189,248,0.03) 80px)',
      }} />
      {particles.map((p, i) => <Particle key={i} {...p} />)}
      {/* Top edge line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.7), transparent)',
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   COUNT-UP
═══════════════════════════════════════════════════════ */
function CountUp({ value, inView }: { value: string; inView: boolean }) {
  const raw    = parseFloat(value.replace(/[^\d.]/g, ''));
  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.replace(/[\d.+]/g, '');
  const [n, setN] = useState(0);
  const valid = !isNaN(raw) && raw > 0;

  useEffect(() => {
    if (!inView || !valid) return;
    let raf: number;
    const t0 = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * raw));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, raw, valid]);

  if (!valid) return <>{value}</>;
  return <>{prefix}{n}{suffix}</>;
}

/* ═══════════════════════════════════════════════════════
   TIMELINE NODE
═══════════════════════════════════════════════════════ */
interface NodeProps { active: boolean; accent: string; size?: number; }

function TimelineNode({ active, accent, size = 28 }: NodeProps) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Pulse rings */}
      {active && (
        <>
          <motion.div
            className="absolute rounded-full"
            style={{ width: size + 22, height: size + 22, border: `1.5px solid ${accent}`, top: '50%', left: '50%', translateX: '-50%', translateY: '-50%' }}
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: size + 10, height: size + 10, border: `1px solid ${accent}`, top: '50%', left: '50%', translateX: '-50%', translateY: '-50%' }}
            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
          />
        </>
      )}
      {/* Node body */}
      <motion.div
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          background: active ? accent : 'rgba(12,18,30,0.95)',
          border: `2px solid ${active ? accent : 'rgba(56,189,248,0.25)'}`,
          boxShadow: active ? `0 0 16px ${accent}80, 0 0 36px ${accent}30` : 'none',
          transition: 'all 0.4s ease',
        }}
        animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 1.6, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
      >
        <div
          className="rounded-full"
          style={{
            width: size * 0.3,
            height: size * 0.3,
            background: active ? '#080c14' : `rgba(56,189,248,0.4)`,
            transition: 'background 0.4s ease',
          }}
        />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════ */
function Header({ inView }: { inView: boolean }) {
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
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.8)' }}
            animate={{ opacity: [1, 0.2, 1], scale: [1, 0.65, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <span className="text-[7.5px] font-black tracking-[0.22em] uppercase" style={{ color: 'rgba(74,222,128,0.85)' }}>
            11 Specialisms
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <div className="overflow-hidden mb-1">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.6rem] sm:text-[3.8rem] md:text-[5.2rem] lg:text-[6rem] font-black leading-[0.96] tracking-[-0.035em]"
          style={{ color: '#f0f8ff', fontFamily: "'DM Sans', 'Satoshi', system-ui, sans-serif" }}
        >
          Everything You
        </motion.h2>
      </div>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.6rem] sm:text-[3.8rem] md:text-[5.2rem] lg:text-[6rem] font-black leading-[0.96] tracking-[-0.035em]"
          style={{
            background: 'linear-gradient(125deg, #257ca3 0%, #38bdf8 42%, #22d3ee 70%, rgba(37,124,163,0.6) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: "'DM Sans', 'Satoshi', system-ui, sans-serif",
          }}
        >
          Need To Grow
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.38, duration: 0.65 }}
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
          <motion.div
            key={j}
            className="rounded-full"
            style={{
              width: j === 1 ? 8 : 4,
              height: j === 1 ? 8 : 4,
              background: j === 1 ? 'rgba(56,189,248,0.7)' : 'rgba(56,189,248,0.3)',
            }}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.7 + j * 0.07, type: 'spring' }}
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
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown style={{ width: 14, height: 14, color: 'rgba(56,189,248,0.45)' }} />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SPLIT CARD — MOBILE  (left panel | node | right panel)
═══════════════════════════════════════════════════════ */

// Left identity panel
function MobileLeftPanel({ s, active, inView }: { s: Service; active: boolean; inView: boolean }) {
  const Icon = s.icon;
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl flex flex-col justify-between"
      style={{
        background: active
          ? `linear-gradient(145deg, ${s.accent}14 0%, rgba(8,12,20,0.97) 100%)`
          : 'linear-gradient(145deg, rgba(12,18,30,0.96) 0%, rgba(6,10,18,0.98) 100%)',
        border: `1px solid ${active ? s.accent + '35' : 'rgba(56,189,248,0.12)'}`,
        boxShadow: active ? `0 0 40px ${s.glow}, 0 12px 50px rgba(0,0,0,0.7)` : '0 8px 36px rgba(0,0,0,0.6)',
        padding: '18px 16px',
        minHeight: 160,
        transition: 'all 0.45s ease',
      }}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-[8%] right-[8%] h-[1.5px]"
        style={{ background: `linear-gradient(90deg, transparent, ${s.accent}80, transparent)`, opacity: active ? 1 : 0.3, transition: 'opacity 0.4s ease' }}
      />

      {/* Corner glow */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${s.accent}14 0%, transparent 65%)` }}
      />

      {/* Service number */}
      <span
        className="text-[7.5px] font-black tracking-[0.2em] uppercase select-none block mb-3"
        style={{ color: `${s.accent}55` }}
      >
        {s.id}
      </span>

      {/* Icon */}
      <motion.div
        className="flex items-center justify-center w-10 h-10 rounded-xl mb-3"
        style={{ background: `${s.accent}10`, border: `1px solid ${s.accent}22` }}
        animate={active ? { scale: [1, 1.06, 1], background: `${s.accent}1c` } : { scale: 1 }}
        transition={{ duration: 1.6, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
      >
        <Icon style={{ width: 16, height: 16, color: s.accent }} />
      </motion.div>

      {/* Title */}
      <h3
        className="font-black text-[0.88rem] leading-[1.1] tracking-tight"
        style={{ color: '#e8f4ff', fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {s.title}
      </h3>

      {/* Sub */}
      <p
        className="text-[7.5px] font-bold tracking-[0.1em] uppercase mt-1"
        style={{ color: `${s.accent}70` }}
      >
        {s.sub}
      </p>

      {/* Tags */}
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

      {/* Active glow overlay */}
      {active && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top right, ${s.accent}08, transparent 60%)` }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
}

// Right metrics panel
function MobileRightPanel({ s, active, inView }: { s: Service; active: boolean; inView: boolean }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl flex flex-col justify-between"
      style={{
        background: active
          ? `linear-gradient(225deg, ${s.accent}10 0%, rgba(8,12,20,0.97) 100%)`
          : 'linear-gradient(225deg, rgba(12,18,30,0.96) 0%, rgba(6,10,18,0.98) 100%)',
        border: `1px solid ${active ? s.accent + '30' : 'rgba(56,189,248,0.10)'}`,
        boxShadow: active ? `0 0 40px ${s.glow}, 0 12px 50px rgba(0,0,0,0.7)` : '0 8px 36px rgba(0,0,0,0.6)',
        padding: '18px 16px',
        minHeight: 160,
        transition: 'all 0.45s ease',
      }}
      initial={{ opacity: 0, x: 28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-[8%] right-[8%] h-[1.5px]"
        style={{ background: `linear-gradient(90deg, transparent, ${s.accent}60, transparent)`, opacity: active ? 1 : 0.2, transition: 'opacity 0.4s ease' }}
      />

      {/* Corner glow */}
      <div
        className="absolute -bottom-8 -left-8 w-24 h-24 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${s.accent}10 0%, transparent 65%)` }}
      />

      {/* Stat number */}
      <div>
        <motion.div
          className="font-black leading-none tabular-nums"
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
            color: s.accent,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            textShadow: active ? `0 0 24px ${s.accent}60` : 'none',
            transition: 'text-shadow 0.4s ease',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <CountUp value={s.stat} inView={inView} />
        </motion.div>
        <div
          className="text-[6.5px] font-black tracking-[0.2em] uppercase mt-1"
          style={{ color: 'rgba(160,190,215,0.35)' }}
        >
          {s.statLabel}
        </div>
      </div>

      {/* Year badge */}
      <span
        className="inline-block text-[6px] font-black tracking-[0.18em] uppercase px-2.5 py-1 rounded-full mt-2 self-start"
        style={{ color: s.accent, background: `${s.accent}0e`, border: `1px solid ${s.accent}1c` }}
      >
        {s.year}
      </span>

      {/* Description */}
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

      {/* Arrow */}
      <motion.div
        className="flex items-center justify-center w-7 h-7 rounded-full mt-3 self-end"
        style={{ background: `${s.accent}10`, border: `1px solid ${s.accent}20` }}
        animate={active ? { rotate: 45, scale: 1.1 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <ArrowRight style={{ width: 11, height: 11, color: s.accent }} />
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MOBILE ROW  — LEFT PANEL | CENTER TIMELINE | RIGHT PANEL
   ─────────────────────────────────────────────────────
   Layout:
   ┌──────────────┬───────────────┬──────────────┐
   │  LEFT PANEL  │ 44px corridor │  RIGHT PANEL │
   │  icon+title  │      (●)      │  stat+desc   │
   │  tags        │       │       │  tags        │
   └──────────────┴───────────────┴──────────────┘
   
   The corridor is exactly 44px. The absolute vertical line
   in the parent aligns with `left: 50%` which equals the
   center of this corridor when both side panels are equal (1fr each).
═══════════════════════════════════════════════════════ */
const MOBILE_CORRIDOR = 44; // px

function MobileRow({ s, index, active }: { s: Service; index: number; active: boolean }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{
        display: 'grid',
        gridTemplateColumns: `1fr ${MOBILE_CORRIDOR}px 1fr`,
        gap: 0,
        marginBottom: 20,
        alignItems: 'stretch',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* LEFT PANEL */}
      <MobileLeftPanel s={s} active={active} inView={inView} />

      {/* CENTER CORRIDOR — node + connectors */}
      <div className="relative flex flex-col items-center justify-center" style={{ zIndex: 20 }}>
        {/* Horizontal connector left */}
        <div
          className="absolute"
          style={{
            top: '50%',
            left: 0,
            width: '50%',
            height: 1,
            background: active
              ? `linear-gradient(90deg, transparent, ${s.accent}60)`
              : 'linear-gradient(90deg, transparent, rgba(56,189,248,0.15))',
            transition: 'background 0.4s ease',
            zIndex: 5,
          }}
        />
        {/* Horizontal connector right */}
        <div
          className="absolute"
          style={{
            top: '50%',
            right: 0,
            width: '50%',
            height: 1,
            background: active
              ? `linear-gradient(270deg, transparent, ${s.accent}60)`
              : 'linear-gradient(270deg, transparent, rgba(56,189,248,0.15))',
            transition: 'background 0.4s ease',
            zIndex: 5,
          }}
        />
        {/* Node */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <TimelineNode active={active} accent={s.accent} size={24} />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <MobileRightPanel s={s} active={active} inView={inView} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   DESKTOP CARD — FULL WIDTH
═══════════════════════════════════════════════════════ */
function DesktopCard({ s, isLeft, active }: { s: Service; isLeft: boolean; active: boolean }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mx     = useMotionValue(0);
  const my     = useMotionValue(0);
  const rotX   = useSpring(useTransform(my, [-0.5, 0.5], [3.5, -3.5]), { stiffness: 250, damping: 30 });
  const rotY   = useSpring(useTransform(mx, [-0.5, 0.5], [isLeft ? -5 : 5, isLeft ? 5 : -5]), { stiffness: 250, damping: 30 });
  const gx     = useTransform(mx, [-0.5, 0.5], [10, 90]);
  const gy     = useTransform(my, [-0.5, 0.5], [10, 90]);
  const Icon   = s.icon;

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);

  const handleLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.015 }}
        className="relative overflow-hidden rounded-2xl cursor-pointer group"
        transition={{ duration: 0.22 }}
      >
        {/* Card base */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(145deg, rgba(12,18,30,0.97) 0%, rgba(6,10,18,0.99) 100%)',
            border: `1px solid ${active ? s.accent + '38' : 'rgba(56,189,248,0.12)'}`,
            boxShadow: active
              ? `0 0 0 1px ${s.accent}20, 0 24px 70px rgba(0,0,0,0.8), 0 0 80px ${s.glow}`
              : '0 12px 50px rgba(0,0,0,0.7)',
            transition: 'all 0.4s ease',
          }}
        />

        {/* Top edge glow */}
        <motion.div
          className="absolute top-0 left-[8%] right-[8%] h-[1.5px] rounded-full z-20"
          style={{ background: `linear-gradient(90deg, transparent, ${s.accent}cc, transparent)` }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        {/* Corner glow top */}
        <div
          className="absolute pointer-events-none"
          style={{
            [isLeft ? 'right' : 'left']: -40,
            top: -40,
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${s.accent}14 0%, transparent 65%)`,
          }}
        />

        {/* Mouse follow glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(280px circle at ${gx}% ${gy}%, ${s.accent}14 0%, transparent 65%)`,
            transition: 'opacity 0.35s ease',
          }}
        />

        {/* SVG grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden="true">
          <defs>
            <pattern id={`dg${s.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke={s.accent} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dg${s.id})`} />
        </svg>

        {/* Shimmer on active */}
        <motion.div
          className="absolute inset-0 z-[3] pointer-events-none rounded-2xl"
          style={{ background: `linear-gradient(110deg, transparent 20%, ${s.accent}0a 50%, transparent 80%)` }}
          animate={active ? { x: ['-160%', '160%'] } : { x: '-160%' }}
          transition={{ duration: 1.2, ease: 'easeInOut', repeat: active ? Infinity : 0, repeatDelay: 2 }}
        />

        {/* Content */}
        <div className="relative z-10 p-7 xl:p-9">
          {/* Top row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="text-[7.5px] font-black tracking-[0.22em] select-none" style={{ color: `${s.accent}40` }}>
                {s.id}
              </span>
              <motion.div
                className="flex items-center justify-center w-11 h-11 rounded-xl"
                style={{ background: `${s.accent}10`, border: `1px solid ${s.accent}22` }}
                animate={active ? { scale: 1.08 } : { scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <Icon style={{ width: 18, height: 18, color: s.accent }} />
              </motion.div>
            </div>
            <motion.div
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{ background: `${s.accent}0e`, border: `1px solid ${s.accent}1e` }}
              animate={active ? { rotate: 45, scale: 1.15 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.22 }}
            >
              <ArrowRight style={{ width: 13, height: 13, color: s.accent }} />
            </motion.div>
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
          <motion.div
            className="h-[1.5px] rounded-full mb-3"
            style={{ background: `linear-gradient(90deg, ${s.accent}90, transparent)` }}
            initial={{ width: 0 }}
            animate={inView ? { width: active ? 72 : 44 } : {}}
            transition={{ delay: 0.4, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
            <div className="text-right shrink-0">
              <motion.div
                className="font-black leading-none tabular-nums"
                style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                  color: s.accent,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  textShadow: active ? `0 0 28px ${s.accent}55` : 'none',
                  transition: 'text-shadow 0.4s ease',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                <CountUp value={s.stat} inView={inView} />
              </motion.div>
              <div className="text-[6.5px] font-black tracking-widest uppercase mt-0.5" style={{ color: 'rgba(160,190,215,0.28)' }}>
                {s.statLabel}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   DESKTOP ROW — ALTERNATING CARD | CENTER TIMELINE | EMPTY (or vice versa)
   ─────────────────────────────────────────────────────
   Grid: [left-zone (card or spacer)] [96px center] [right-zone (spacer or card)]
   When isLeft=true:  card on left, empty on right
   When isLeft=false: empty on left, card on right
═══════════════════════════════════════════════════════ */
const DESKTOP_CORRIDOR = 96; // px

function DesktopRow({ s, index, active }: { s: Service; index: number; active: boolean }) {
  const isLeft = index % 2 === 0;
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        display: 'grid',
        gridTemplateColumns: `1fr ${DESKTOP_CORRIDOR}px 1fr`,
        alignItems: 'center',
        marginBottom: 48,
        gap: 0,
      }}
    >
      {/* LEFT ZONE */}
      <div>
        {isLeft ? (
          <DesktopCard s={s} isLeft={true} active={active} />
        ) : (
          // Decorative "echo" accent block
          <motion.div
            className="flex items-center justify-end pr-8"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{ textAlign: 'right' }}>
              <motion.div
                className="font-black leading-none tabular-nums"
                style={{
                  fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                  color: active ? s.accent : `${s.accent}22`,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  textShadow: active ? `0 0 60px ${s.accent}40` : 'none',
                  transition: 'all 0.5s ease',
                  letterSpacing: '-0.04em',
                }}
              >
                <CountUp value={s.stat} inView={inView} />
              </motion.div>
              <div
                className="text-[8px] font-black tracking-[0.22em] uppercase mt-2"
                style={{ color: active ? `${s.accent}60` : 'rgba(56,189,248,0.15)', transition: 'color 0.5s ease' }}
              >
                {s.statLabel}
              </div>
              <div
                className="text-[7px] font-black tracking-[0.18em] uppercase mt-4"
                style={{ color: 'rgba(160,190,215,0.18)' }}
              >
                {s.year}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* CENTER CORRIDOR — node */}
      <div className="relative flex items-center justify-center" style={{ zIndex: 20 }}>
        {/* Horizontal connectors */}
        <div
          className="absolute left-0 right-1/2"
          style={{
            top: '50%',
            height: 1,
            background: active
              ? `linear-gradient(90deg, transparent, ${s.accent}55)`
              : 'linear-gradient(90deg, transparent, rgba(56,189,248,0.12))',
            transition: 'background 0.45s ease',
          }}
        />
        <div
          className="absolute right-0 left-1/2"
          style={{
            top: '50%',
            height: 1,
            background: active
              ? `linear-gradient(270deg, transparent, ${s.accent}55)`
              : 'linear-gradient(270deg, transparent, rgba(56,189,248,0.12))',
            transition: 'background 0.45s ease',
          }}
        />
        {/* Node */}
        <TimelineNode active={active} accent={s.accent} size={32} />
      </div>

      {/* RIGHT ZONE */}
      <div>
        {!isLeft ? (
          <DesktopCard s={s} isLeft={false} active={active} />
        ) : (
          // Decorative echo for odd rows
          <motion.div
            className="flex items-center justify-start pl-8"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
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
                style={{ color: active ? `${s.accent}55` : 'rgba(56,189,248,0.12)', transition: 'color 0.5s ease' }}
              >
                {s.sub}
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {s.tags.map(t => (
                  <span
                    key={t}
                    className="text-[6.5px] font-bold tracking-wide px-2.5 py-1 rounded-full"
                    style={{
                      color: active ? `${s.accent}70` : 'rgba(56,189,248,0.2)',
                      background: active ? `${s.accent}08` : 'rgba(56,189,248,0.04)',
                      border: `1px solid ${active ? s.accent + '18' : 'rgba(56,189,248,0.08)'}`,
                      transition: 'all 0.45s ease',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED TIMELINE LINE WRAPPER
═══════════════════════════════════════════════════════ */
function TimelineLine({ progress }: { progress: MotionValue<string> }) {
  return (
    <>
      {/* Static dim line */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 1,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(56,189,248,0.2) 5%, rgba(56,189,248,0.12) 95%, transparent 100%)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      {/* Animated glow fill */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 2,
          height: progress,
          background: 'linear-gradient(to bottom, #1e6fa8, #38bdf8, #22d3ee)',
          boxShadow: '0 0 16px rgba(34,211,238,0.6), 0 0 40px rgba(56,189,248,0.3)',
          borderRadius: 9999,
          zIndex: 2,
          transformOrigin: 'top center',
        }}
        aria-hidden="true"
      />
      {/* Comet head */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ top: progress, translateY: '-50%', zIndex: 10 }}
        aria-hidden="true"
      >
        <motion.div
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.95) 0%, rgba(37,124,163,0.65) 55%, transparent 75%)',
            boxShadow: '0 0 14px 4px rgba(56,189,248,0.7), 0 0 30px 10px rgba(37,124,163,0.35)',
          }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT COMPONENT
═══════════════════════════════════════════════════════ */
export default function ServicesTimeline() {
  const pageRef      = useRef<HTMLDivElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const desktopRef   = useRef<HTMLDivElement>(null);
  const mobileRef    = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  /* ── Desktop timeline line ── */
  const { scrollYProgress: deskProg } = useScroll({
    target: desktopRef,
    offset: ['start 12%', 'end 88%'],
  });
  const deskSpring = useSpring(deskProg, { stiffness: 55, damping: 22, restDelta: 0.001 });
  const deskHeight = useTransform(deskSpring, [0, 1], ['0%', '100%']);

  /* ── Mobile timeline line ── */
  const { scrollYProgress: mobProg } = useScroll({
    target: mobileRef,
    offset: ['start 15%', 'end 85%'],
  });
  const mobSpring = useSpring(mobProg, { stiffness: 45, damping: 18, restDelta: 0.001 });
  const mobHeight = useTransform(mobSpring, [0, 1], ['0%', '100%']);

  /* ── Active card index driven by scroll ── */
  const { scrollYProgress: pageProg } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsub = pageProg.on('change', v => {
      const idx = Math.min(
        Math.floor(v * (SERVICES.length + 2) - 0.5),
        SERVICES.length - 1,
      );
      if (idx >= 0) setActiveIndex(idx);
    });
    return unsub;
  }, [pageProg]);

  return (
    <div
      ref={pageRef}
      className="relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}
    >
      <Background />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">

        {/* ── HEADER ── */}
        <div ref={headerRef} className="pt-20 sm:pt-28">
          <Header inView={headerInView} />
        </div>

        {/* ════════════════════════════════════════════════
            DESKTOP  (lg+)
            Grid: [card] [96px center timeline] [card or echo]
            Alternates which side gets the primary card.
        ════════════════════════════════════════════════ */}
        <div ref={desktopRef} className="relative pb-28 hidden lg:block">
          {/* Center timeline line — grows with scroll */}
          <TimelineLine progress={deskHeight} />

          {SERVICES.map((s, i) => (
            <DesktopRow
              key={s.id}
              s={s}
              index={i}
              active={i <= activeIndex}
            />
          ))}
        </div>

        {/* ════════════════════════════════════════════════
            MOBILE / TABLET  (< lg)
            Grid per row: [left panel] [44px center] [right panel]
            Left = identity (icon, title, tags)
            Right = metrics (stat, description)
            Center line runs vertically through all nodes.
        ════════════════════════════════════════════════ */}
        <div className="lg:hidden pb-20">
          <div
            ref={mobileRef}
            className="relative"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            {/* Center timeline line */}
            <TimelineLine progress={mobHeight} />

            {/* Card rows */}
            {SERVICES.map((s, i) => (
              <MobileRow
                key={s.id}
                s={s}
                index={i}
                active={i <= activeIndex}
              />
            ))}
          </div>
        </div>

        {/* ── FOOTER STRIP ── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 pb-16 pt-6"
          style={{ borderTop: '1px solid rgba(56,189,248,0.1)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {['Full-service digital studio', 'UK & Global clients', '4.9★ average rating'].map((text, i) => (
            <React.Fragment key={text}>
              {i > 0 && (
                <span className="hidden sm:block w-1 h-1 rounded-full" style={{ background: 'rgba(56,189,248,0.25)' }} />
              )}
              <span
                className="text-[7.5px] font-black tracking-[0.24em] uppercase"
                style={{ color: 'rgba(56,189,248,0.35)' }}
              >
                {text}
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
}