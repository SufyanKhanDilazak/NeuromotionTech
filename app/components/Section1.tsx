'use client';

import React, {
  useState, useRef, useCallback, useMemo, useEffect,
} from 'react';
import {
  motion, useInView, useMotionValue, useSpring,
  useTransform, AnimatePresence, useScroll, useMotionTemplate,
} from 'framer-motion';
import {
  ArrowUpRight, Zap, Users, Globe, FlaskConical,
  Leaf, BarChart3, FileText, Utensils, Star, Sparkles,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════ */
type PatternKind = 'grid' | 'dots' | 'lines' | 'waves' | 'diagonal' | 'cross' | 'hex' | 'circuit';

interface Project {
  id: number;
  num: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  bg: string;
  accent: string;
  glow: string;
  text: string;
  stat: string;
  statLabel: string;
  Icon: React.ElementType;
  pattern: PatternKind;
  featured?: boolean;
  filterKey: string[];
}

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const PROJECTS: Project[] = [
  {
    id: 1, num: '01', name: 'Tax On Track', tagline: 'Smart Tax Management',
    description: 'Comprehensive SaaS automating tax workflows, real-time compliance tracking and intelligent filing reminders for SMEs.',
    category: 'FinTech · SaaS', tags: ['Dashboard', 'Automation'],
    bg: 'linear-gradient(145deg,#04091a 0%,#070f24 55%,#09142e 100%)',
    accent: '#60a5fa', glow: 'rgba(96,165,250,0.35)',
    text: '#ffffff', stat: '60%', statLabel: 'Time Saved',
    Icon: FileText, pattern: 'circuit', featured: true,
    filterKey: ['all', 'saas'],
  },
  {
    id: 2, num: '02', name: 'Niche Club', tagline: 'Premium Community Platform',
    description: 'Exclusive membership ecosystem connecting niche entrepreneurs with curated resources and thriving masterminds.',
    category: 'Community · Membership', tags: ['UI/UX', 'Branding'],
    bg: 'linear-gradient(145deg,#0d0518 0%,#14082a 55%,#1a0c38 100%)',
    accent: '#c084fc', glow: 'rgba(192,132,252,0.35)',
    text: '#ffffff', stat: '340%', statLabel: 'Growth',
    Icon: Users, pattern: 'hex',
    filterKey: ['all'],
  },
  {
    id: 3, num: '03', name: 'Dreamworks', tagline: 'Supply Chain Intelligence',
    description: 'Real-time freight management, route optimisation and live tracking dashboard across 14 countries.',
    category: 'Logistics · Enterprise', tags: ['Maps', 'B2B'],
    bg: 'linear-gradient(145deg,#081206 0%,#0e1c08 55%,#132410 100%)',
    accent: '#fbbf24', glow: 'rgba(251,191,36,0.35)',
    text: '#ffffff', stat: '14', statLabel: 'Countries',
    Icon: Globe, pattern: 'lines',
    filterKey: ['all', 'enterprise'],
  },
  {
    id: 4, num: '04', name: 'Peptides.london', tagline: 'Luxury Biotech E-Commerce',
    description: 'High-conversion premium e-commerce for a London peptide research brand — clinical storytelling, seamless checkout.',
    category: 'Health · E-Commerce', tags: ['Branding', 'Shop'],
    bg: 'linear-gradient(145deg,#160900 0%,#211000 55%,#2c1500 100%)',
    accent: '#fb923c', glow: 'rgba(251,146,60,0.35)',
    text: '#fff7e6', stat: '+34%', statLabel: 'Conversion',
    Icon: FlaskConical, pattern: 'dots',
    filterKey: ['all', 'ecommerce'],
  },
  {
    id: 5, num: '05', name: 'Casa Palma', tagline: 'Boutique Hotel Identity',
    description: 'Immersive gallery, bespoke booking flows and luxury brand storytelling for a boutique hospitality brand.',
    category: 'Hospitality · Luxury', tags: ['Branding', 'Booking'],
    bg: 'linear-gradient(145deg,#140d00 0%,#1e1300 55%,#281a00 100%)',
    accent: '#fde68a', glow: 'rgba(253,230,138,0.35)',
    text: '#fff9e6', stat: '4.9★', statLabel: 'Rating',
    Icon: Star, pattern: 'diagonal', featured: true,
    filterKey: ['all'],
  },
  {
    id: 6, num: '06', name: 'Eartherist', tagline: 'Sustainable Living Marketplace',
    description: 'Eco-conscious product discovery, carbon footprint tracking and ethical brand storytelling at scale.',
    category: 'Sustainability · D2C', tags: ['Marketplace', 'SEO'],
    bg: 'linear-gradient(145deg,#011006 0%,#031809 55%,#052010 100%)',
    accent: '#4ade80', glow: 'rgba(74,222,128,0.35)',
    text: '#efffef', stat: '98%', statLabel: 'Satisfaction',
    Icon: Leaf, pattern: 'waves',
    filterKey: ['all', 'ecommerce'],
  },
  {
    id: 7, num: '07', name: 'TOT Portal', tagline: 'Operations Command Centre',
    description: 'Enterprise-grade internal portal — role-based dashboards, client management, task automation and live reporting.',
    category: 'Enterprise · Portal', tags: ['Web App', 'B2B'],
    bg: 'linear-gradient(145deg,#000d18 0%,#001320 55%,#001b2e 100%)',
    accent: '#22d3ee', glow: 'rgba(34,211,238,0.35)',
    text: '#e0f9ff', stat: '25h', statLabel: 'Saved/Week',
    Icon: BarChart3, pattern: 'grid', featured: true,
    filterKey: ['all', 'saas', 'enterprise'],
  },
  {
    id: 8, num: '08', name: 'Sherekhankitchen', tagline: 'Artisan Food Brand & Store',
    description: 'Vibrant food-first brand identity, online shop, recipe blog, catering bookings and product delivery.',
    category: 'Food & Beverage · D2C', tags: ['Branding', 'E-Commerce'],
    bg: 'linear-gradient(145deg,#190300 0%,#240500 55%,#300800 100%)',
    accent: '#f97316', glow: 'rgba(249,115,22,0.35)',
    text: '#fff3e6', stat: '3×', statLabel: 'Revenue',
    Icon: Utensils, pattern: 'cross',
    filterKey: ['all', 'ecommerce'],
  },
];

/* Bento col-spans — 4 col desktop */
const ALL_SPANS = [
  'lg:col-span-2', // Tax On Track — wide
  'lg:col-span-1', // Niche Club
  'lg:col-span-1', // Dreamworks
  'lg:col-span-1', // Peptides
  'lg:col-span-1', // Casa Palma
  'lg:col-span-2', // Eartherist — wide
  'lg:col-span-2', // TOT Portal — wide
  'lg:col-span-2', // Sherekhankitchen — wide
];

/* ═══════════════════════════════════════════════════════════════
   SVG PATTERN BACKGROUNDS
═══════════════════════════════════════════════════════════════ */
const PatternBg = React.memo(function PatternBg({ kind, color, uid }: {
  kind: PatternKind; color: string; uid: string;
}) {
  const o = 0.08;
  const id = `pp-${uid}`;
  const shapes: Record<PatternKind, React.ReactElement> = {
    dots:     <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.1" fill={color} fillOpacity={o} /></pattern>,
    lines:    <pattern id={id} width="30" height="30" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="30" y2="30" stroke={color} strokeWidth="0.5" strokeOpacity={o} /></pattern>,
    grid:     <pattern id={id} width="26" height="26" patternUnits="userSpaceOnUse"><path d="M 26 0 L 0 0 0 26" fill="none" stroke={color} strokeWidth="0.4" strokeOpacity={o} /></pattern>,
    diagonal: <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse"><line x1="0" y1="16" x2="16" y2="0" stroke={color} strokeWidth="0.5" strokeOpacity={o} /></pattern>,
    waves:    <pattern id={id} width="38" height="19" patternUnits="userSpaceOnUse"><path d="M 0 9.5 Q 9.5 0 19 9.5 Q 28.5 19 38 9.5" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity={o} /></pattern>,
    cross:    <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse"><line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="0.6" strokeOpacity={o} /><line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="0.6" strokeOpacity={o} /></pattern>,
    hex:      <pattern id={id} width="38" height="44" patternUnits="userSpaceOnUse"><polygon points="19,1 37,11 37,31 19,43 1,31 1,11" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity={o} /></pattern>,
    circuit:  <pattern id={id} width="46" height="46" patternUnits="userSpaceOnUse"><path d="M 8 8 H 23 V 23 H 38 V 38" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity={o} /><circle cx="8" cy="8" r="1.6" fill={color} fillOpacity={o * 2.2} /><circle cx="23" cy="23" r="1.6" fill={color} fillOpacity={o * 2.2} /><circle cx="38" cy="38" r="1.6" fill={color} fillOpacity={o * 2.2} /></pattern>,
  };
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>{shapes[kind]}</defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
});

/* ═══════════════════════════════════════════════════════════════
   FLOATING ORBS — ambient background life
═══════════════════════════════════════════════════════════════ */
function FloatingOrbs() {
  const orbs = [
    { x: 5,  y: 8,  w: 360, h: 360, color: 'rgba(255,255,255,0.04)', dur: 24, delay: 0 },
    { x: 80, y: 60, w: 500, h: 500, color: 'rgba(0,0,0,0.28)',       dur: 30, delay: 6 },
    { x: 40, y: 80, w: 300, h: 300, color: 'rgba(0,0,0,0.2)',        dur: 20, delay: 3 },
    { x: 90, y: 5,  w: 280, h: 280, color: 'rgba(255,255,255,0.03)', dur: 18, delay: 9 },
  ];
  return (
    <>
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${o.x}%`, top: `${o.y}%`,
            width: o.w, height: o.h,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            translateX: '-50%', translateY: '-50%',
          }}
          animate={{ x: [0, 30, -20, 10, 0], y: [0, -25, 15, -10, 0], scale: [1, 1.1, 0.95, 1.05, 1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
        />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BACKGROUND — #257ca3 with black depth corners
═══════════════════════════════════════════════════════════════ */
function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Ice blue base */}
      <div className="absolute inset-0" style={{ background: '#257ca3' }} />
      {/* Top highlight */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 45% at 50% 0%, rgba(255,255,255,0.09) 0%, transparent 55%)' }} />
      {/* Black vignette — all four corners */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 65% at 0% 0%, rgba(0,0,0,0.3) 0%, transparent 55%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 65% at 100% 0%, rgba(0,0,0,0.28) 0%, transparent 55%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 75% 70% at 0% 100%, rgba(0,0,0,0.65) 0%, transparent 58%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 75% 70% at 100% 100%, rgba(0,0,0,0.6) 0%, transparent 56%)' }} />
      {/* Center mass darkening */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 40% at 50% 100%, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
      {/* Edge frame */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.18) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.18) 100%)' }} />
      {/* Fine mesh */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      <FloatingOrbs />
      {/* Edge lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(0,0,0,0.5),transparent)' }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED STAT NUMBER
═══════════════════════════════════════════════════════════════ */
function CountUp({ value, inView }: { value: string; inView: boolean }) {
  const num = parseFloat(value.replace(/[^0-9.]/g, ''));
  const prefix = value.match(/^\+/)?.[0] ?? '';
  const suffix = value.replace(/[\d.+]/g, '');
  const [display, setDisplay] = useState(0);
  const hasNum = !isNaN(num) && num > 0;

  useEffect(() => {
    if (!inView || !hasNum) return;
    let raf: number;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(ease * num));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, hasNum]);

  if (!hasNum) return <>{value}</>;
  return <>{prefix}{display}{suffix}</>;
}

/* ═══════════════════════════════════════════════════════════════
   CARD
═══════════════════════════════════════════════════════════════ */
function Card({ p, i, active, onHover }: {
  p: Project; i: number; active: boolean; onHover: (id: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 240, damping: 26 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 240, damping: 26 });
  const gx = useTransform(mx, [-0.5, 0.5], [5, 95]);
  const gy = useTransform(my, [-0.5, 0.5], [5, 95]);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);

  const onLeave = useCallback(() => {
    mx.set(0); my.set(0); onHover(null);
  }, [mx, my, onHover]);

  const { Icon } = p;

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 50, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: i * 0.09, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <motion.article
        onMouseMove={onMove}
        onMouseEnter={() => onHover(p.id)}
        onMouseLeave={onLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', background: p.bg }}
        className="relative cursor-pointer overflow-hidden rounded-[24px] flex flex-col h-full min-h-[290px] group"
        whileHover={{ scale: 1.012 }}
        transition={{ duration: 0.2 }}
      >
        {/* ── Outer glow ring ── */}
        <motion.div
          className="absolute inset-0 rounded-[24px] z-20 pointer-events-none"
          animate={active
            ? { boxShadow: `0 0 0 1.5px ${p.accent}55, 0 0 80px ${p.glow}, 0 28px 80px rgba(0,0,0,0.75)` }
            : { boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 16px 60px rgba(0,0,0,0.7)' }}
          transition={{ duration: 0.22 }}
        />

        {/* ── Top colour bar ── */}
        <motion.div
          className="absolute top-0 left-[15%] right-[15%] h-[1.5px] z-30 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${p.accent}cc, transparent)` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: active ? 1 : 0.5 } : {}}
          transition={{ delay: i * 0.09 + 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <PatternBg kind={p.pattern} color={p.accent} uid={String(p.id)} />

        {/* ── Corner glows ── */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${p.accent}16 0%, transparent 65%)` }} />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${p.accent}08 0%, transparent 65%)` }} />

        {/* ── Bottom black vignette ── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }} />

        {/* ── Mouse glow ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(300px circle at ${gx}% ${gy}%, ${p.accent}1a 0%, transparent 65%)`,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* ── Shimmer sweep ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[6]"
          style={{ background: `linear-gradient(110deg, transparent 15%, ${p.accent}0e 50%, transparent 85%)` }}
          initial={{ x: '-160%' }}
          animate={active ? { x: '160%' } : { x: '-160%' }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />

        {/* ════ CONTENT ════ */}
        <div className="relative z-10 flex flex-col h-full p-7 sm:p-8">

          {/* Row 1 — num · icon · featured · arrow */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-[8.5px] font-black tabular-nums select-none"
                style={{ color: `${p.accent}40`, letterSpacing: '0.18em' }}>
                {p.num}
              </span>

              <motion.div
                className="flex items-center justify-center w-11 h-11 rounded-2xl shrink-0"
                style={{ background: `${p.accent}12`, border: `1px solid ${p.accent}26` }}
                animate={active
                  ? { scale: 1.12, background: `${p.accent}22`, borderColor: `${p.accent}48` }
                  : { scale: 1 }}
                transition={{ duration: 0.22 }}
              >
                <Icon style={{ width: 17, height: 17, color: p.accent }} />
              </motion.div>

              {p.featured && (
                <motion.span
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[7px] font-black uppercase tracking-[0.18em]"
                  style={{ background: `${p.accent}15`, border: `1px solid ${p.accent}28`, color: p.accent }}
                  animate={active ? { scale: 1.06 } : { scale: 1 }}
                >
                  <Sparkles style={{ width: 6, height: 6 }} />
                  Featured
                </motion.span>
              )}
            </div>

            <motion.div
              className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
              style={{ background: `${p.accent}10`, border: `1px solid ${p.accent}1e` }}
              animate={active
                ? { rotate: 45, scale: 1.2, background: `${p.accent}24`, borderColor: `${p.accent}42` }
                : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.22 }}
            >
              <ArrowUpRight style={{ width: 13, height: 13, color: p.accent }} />
            </motion.div>
          </div>

          {/* Category pill */}
          <span className="self-start text-[7px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5"
            style={{ color: p.accent, background: `${p.accent}10`, border: `1px solid ${p.accent}1e` }}>
            {p.category}
          </span>

          {/* Project name */}
          <h3 className="text-[1.22rem] sm:text-[1.35rem] font-black leading-[1.07] tracking-tight mb-1.5"
            style={{ color: p.text }}>
            {p.name}
          </h3>

          {/* Animated underline */}
          <motion.div
            className="h-[1.5px] rounded-full mb-3"
            style={{ background: `linear-gradient(90deg, ${p.accent}90, transparent)` }}
            initial={{ width: 0 }}
            animate={inView ? { width: active ? 60 : 36 } : {}}
            transition={{ delay: i * 0.09 + 0.45, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Tagline */}
          <p className="text-[8.5px] font-bold tracking-[0.14em] uppercase mb-4"
            style={{ color: `${p.accent}88` }}>
            {p.tagline}
          </p>

          {/* Description */}
          <p className="text-[11.5px] leading-[1.8] flex-1"
            style={{ color: `${p.text}52` }}>
            {p.description}
          </p>

          {/* Footer */}
          <div className="flex items-end justify-between gap-3 mt-6 pt-5"
            style={{ borderTop: `1px solid ${p.accent}12` }}>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="text-[6.5px] font-bold tracking-wide px-2.5 py-1 rounded-full"
                  style={{ color: `${p.text}45`, background: `${p.text}07`, border: `1px solid ${p.text}0e` }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="text-right shrink-0">
              <motion.div
                className="text-[1.7rem] font-black leading-none tabular-nums"
                style={{ color: p.accent }}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09 + 0.55, duration: 0.5 }}
              >
                <CountUp value={p.stat} inView={inView} />
              </motion.div>
              <div className="text-[6.5px] font-black tracking-widest uppercase mt-0.5"
                style={{ color: `${p.text}35` }}>
                {p.statLabel}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FILTER TABS
═══════════════════════════════════════════════════════════════ */
type FilterKey = 'all' | 'saas' | 'ecommerce' | 'enterprise' | 'featured';

const TABS: { key: FilterKey; label: string; count: number }[] = [
  { key: 'all',        label: 'All',        count: 8 },
  { key: 'featured',   label: 'Featured',   count: 3 },
  { key: 'saas',       label: 'SaaS',       count: 2 },
  { key: 'ecommerce',  label: 'E-Commerce', count: 3 },
  { key: 'enterprise', label: 'Enterprise', count: 2 },
];

function Tabs({ active, set }: { active: FilterKey; set: (k: FilterKey) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {TABS.map((t) => {
        const on = active === t.key;
        return (
          <motion.button
            key={t.key} type="button"
            onClick={() => set(t.key)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.14em] overflow-hidden"
            style={{
              color: on ? '#fff' : 'rgba(255,255,255,0.42)',
              background: on ? undefined : 'rgba(0,0,0,0.32)',
              border: on ? 'none' : '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(14px)',
              boxShadow: on ? '0 6px 28px rgba(0,0,0,0.55)' : 'none',
            }}
          >
            {on && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 rounded-full"
                style={{ background: 'linear-gradient(135deg, #080808 0%, #181818 100%)', border: '1px solid rgba(255,255,255,0.1)' }}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10">{t.label}</span>
            <span className="relative z-10 text-[7px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
              style={{
                background: on ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)',
                color: on ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.26)',
              }}>
              {t.count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════════════ */
function Header({ inView }: { inView: boolean }) {
  return (
    <div className="text-center mb-12 sm:mb-16 px-4">

      {/* Eyebrow */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ background: 'rgba(0,0,0,0.38)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)' }}
          whileHover={{ scale: 1.04, background: 'rgba(0,0,0,0.5)' }}
        >
          <Zap style={{ width: 9, height: 9, color: '#fbbf24' }} />
          <span className="text-[8px] font-black tracking-[0.24em] uppercase" style={{ color: 'rgba(255,255,255,0.52)' }}>
            Selected Work
          </span>
        </motion.div>

        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.7)' }}
            animate={{ opacity: [1, 0.25, 1], scale: [1, 0.72, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <span className="text-[8px] font-black tracking-[0.22em] uppercase" style={{ color: 'rgba(74,222,128,0.9)' }}>
            All Live
          </span>
        </div>
      </motion.div>

      {/* Headline — clip-path reveal per line */}
      <div className="overflow-hidden mb-1">
        <motion.h2
          initial={{ y: 90, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.8rem] font-black leading-[1.0] tracking-[-0.03em]"
          style={{ color: '#ffffff' }}
        >
          Projects That
        </motion.h2>
      </div>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: 90, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.8rem] font-black leading-[1.0] tracking-[-0.03em]"
          style={{
            background: 'linear-gradient(120deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.38) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Drive Results
        </motion.h2>
      </div>

      {/* Divider */}
      <motion.div
        className="flex items-center justify-center gap-3 mt-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <motion.div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(0,0,0,0.55))' }}
          initial={{ width: 0 }} animate={inView ? { width: 96 } : {}}
          transition={{ delay: 0.65, duration: 0.7 }} />
        <div className="flex gap-1.5">
          {[0, 1, 2].map((j) => (
            <motion.div key={j} className="rounded-full"
              style={{ width: j === 1 ? 7 : 4, height: j === 1 ? 7 : 4, background: j === 1 ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.3)' }}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.72 + j * 0.06, type: 'spring' }}
            />
          ))}
        </div>
        <motion.div className="h-px" style={{ background: 'linear-gradient(90deg,rgba(0,0,0,0.55),transparent)' }}
          initial={{ width: 0 }} animate={inView ? { width: 96 } : {}}
          transition={{ delay: 0.65, duration: 0.7 }} />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════ */
export default function ProjectsShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: '-50px' });
  const [activeId, setActiveId] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterKey>('all');

  const handleHover = useCallback((id: number | null) => setActiveId(id), []);

  const visible = useMemo(() =>
    filter === 'all'
      ? PROJECTS
      : filter === 'featured'
        ? PROJECTS.filter((p) => p.featured)
        : PROJECTS.filter((p) => p.filterKey.includes(filter)),
  [filter]);

  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ fontFamily: "'Inter','DM Sans',system-ui,sans-serif" }}
    >
      <Background />

      {/* Max-width container with generous horizontal padding */}
      <div
        ref={wrapRef}
        className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24"
      >
        <Header inView={inView} />

        {/* Tabs */}
        <motion.div
          className="mb-10 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.34 }}
        >
          <Tabs active={filter} set={setFilter} />
        </motion.div>

        {/* ── BENTO GRID ── */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className={[
              'grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8',
              filter === 'all'
                ? 'lg:grid-cols-4 lg:gap-8 xl:gap-10'
                : 'lg:grid-cols-3 lg:gap-8 xl:gap-10',
            ].join(' ')}
          >
            {visible.map((p, i) => {
              const origIdx = PROJECTS.findIndex((x) => x.id === p.id);
              const span = filter === 'all' ? ALL_SPANS[origIdx] : '';
              return (
                <div key={p.id} className={span}>
                  <Card p={p} i={i} active={activeId === p.id} onHover={handleHover} />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Footnote */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-7 mt-16 pt-7"
          style={{ borderTop: '1px solid rgba(0,0,0,0.22)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.05 }}
        >
          {['All projects delivered on time', '18-month avg. engagement', 'UK & Global clients'].map((text, i) => (
            <React.Fragment key={text}>
              {i > 0 && <span className="hidden sm:block w-1 h-1 rounded-full" style={{ background: 'rgba(0,0,0,0.38)' }} />}
              <span className="text-[8px] font-black tracking-[0.2em] uppercase" style={{ color: 'rgba(0,0,0,0.4)' }}>
                {text}
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}