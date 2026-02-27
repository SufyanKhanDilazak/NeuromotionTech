'use client';

/**
 * ProjectsShowcase — Ultra-Premium Dark Edition
 *
 * Design: Pitch-black editorial, per-card accent colour, bento grid desktop
 * Performance:
 *  ✓ Zero backdrop-filter (iOS Safari safe)
 *  ✓ No per-card mouse tracking / spring physics
 *  ✓ CSS transitions for hover colour states (not JS)
 *  ✓ Framer-motion only for entrance (runs once) + whileHover scale
 *  ✓ SVG patterns rendered once via React.memo
 *  ✓ CountUp uses RAF, cancelled on cleanup
 *  ✓ All static data outside component tree
 *  ✓ No useSpring / useMotionValue per card
 */

import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  memo,
} from 'react';
import type { CSSProperties } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, Zap, Users, Globe, FlaskConical,
  Leaf, BarChart3, FileText, Utensils, Star, Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────────────────── */
type PatternKind = 'grid' | 'dots' | 'lines' | 'waves' | 'diagonal' | 'cross' | 'hex' | 'circuit';
type FilterKey   = 'all' | 'saas' | 'ecommerce' | 'enterprise' | 'featured';

interface Project {
  id        : number;
  num       : string;
  name      : string;
  tagline   : string;
  description: string;
  category  : string;
  tags      : string[];
  accent    : string;
  glow      : string;
  stat      : string;
  statLabel : string;
  Icon      : LucideIcon;
  pattern   : PatternKind;
  featured ?: boolean;
  filterKeys: FilterKey[];
}

/* ─── Global CSS (injected once, never re-created) ───────────────────────── */
const GLOBAL_CSS = `
  @keyframes ps-blink {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.18; }
  }
  @keyframes ps-shimmer {
    0%   { transform: translateX(-120%) skewX(-16deg); }
    100% { transform: translateX(220%)  skewX(-16deg); }
  }
  @keyframes ps-pulse-ring {
    0%   { transform: scale(1);   opacity: 0.55; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes ps-float {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-8px); }
  }
  .ps-blink { animation: ps-blink 2s ease-in-out infinite; }
  /* Shimmer fires on card hover — CSS-only, zero JS */
  .ps-card:hover .ps-shimmer-beam {
    animation: ps-shimmer 0.72s ease forwards;
  }
`;

/* ─── Static data ────────────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: 1, num: '01', name: 'Tax On Track', tagline: 'Smart Tax Management',
    description: 'Comprehensive SaaS automating tax workflows, real-time compliance tracking and intelligent filing reminders for SMEs.',
    category: 'FinTech · SaaS', tags: ['Dashboard', 'Automation'],
    accent: '#60a5fa', glow: 'rgba(96,165,250,0.22)',
    stat: '60%', statLabel: 'Time Saved',
    Icon: FileText, pattern: 'circuit', featured: true,
    filterKeys: ['all', 'saas'],
  },
  {
    id: 2, num: '02', name: 'Niche Club', tagline: 'Premium Community Platform',
    description: 'Exclusive membership ecosystem connecting niche entrepreneurs with curated resources and thriving masterminds.',
    category: 'Community · Membership', tags: ['UI/UX', 'Branding'],
    accent: '#c084fc', glow: 'rgba(192,132,252,0.22)',
    stat: '340%', statLabel: 'Growth',
    Icon: Users, pattern: 'hex',
    filterKeys: ['all'],
  },
  {
    id: 3, num: '03', name: 'Dreamworks', tagline: 'Supply Chain Intelligence',
    description: 'Real-time freight management, route optimisation and live tracking dashboard across 14 countries.',
    category: 'Logistics · Enterprise', tags: ['Maps', 'B2B'],
    accent: '#fbbf24', glow: 'rgba(251,191,36,0.22)',
    stat: '14', statLabel: 'Countries',
    Icon: Globe, pattern: 'lines',
    filterKeys: ['all', 'enterprise'],
  },
  {
    id: 4, num: '04', name: 'Peptides.london', tagline: 'Luxury Biotech E-Commerce',
    description: 'High-conversion premium e-commerce for a London peptide research brand — clinical storytelling, seamless checkout.',
    category: 'Health · E-Commerce', tags: ['Branding', 'Shop'],
    accent: '#fb923c', glow: 'rgba(251,146,60,0.22)',
    stat: '+34%', statLabel: 'Conversion',
    Icon: FlaskConical, pattern: 'dots',
    filterKeys: ['all', 'ecommerce'],
  },
  {
    id: 5, num: '05', name: 'Casa Palma', tagline: 'Boutique Hotel Identity',
    description: 'Immersive gallery, bespoke booking flows and luxury brand storytelling for a boutique hospitality brand.',
    category: 'Hospitality · Luxury', tags: ['Branding', 'Booking'],
    accent: '#fde68a', glow: 'rgba(253,230,138,0.22)',
    stat: '4.9★', statLabel: 'Rating',
    Icon: Star, pattern: 'diagonal', featured: true,
    filterKeys: ['all'],
  },
  {
    id: 6, num: '06', name: 'Eartherist', tagline: 'Sustainable Living Marketplace',
    description: 'Eco-conscious product discovery, carbon footprint tracking and ethical brand storytelling at scale.',
    category: 'Sustainability · D2C', tags: ['Marketplace', 'SEO'],
    accent: '#4ade80', glow: 'rgba(74,222,128,0.22)',
    stat: '98%', statLabel: 'Satisfaction',
    Icon: Leaf, pattern: 'waves',
    filterKeys: ['all', 'ecommerce'],
  },
  {
    id: 7, num: '07', name: 'TOT Portal', tagline: 'Operations Command Centre',
    description: 'Enterprise-grade internal portal — role-based dashboards, client management, task automation and live reporting.',
    category: 'Enterprise · Portal', tags: ['Web App', 'B2B'],
    accent: '#22d3ee', glow: 'rgba(34,211,238,0.22)',
    stat: '25h', statLabel: 'Saved/Week',
    Icon: BarChart3, pattern: 'grid', featured: true,
    filterKeys: ['all', 'saas', 'enterprise'],
  },
  {
    id: 8, num: '08', name: 'Sherekhankitchen', tagline: 'Artisan Food Brand & Store',
    description: 'Vibrant food-first brand identity, online shop, recipe blog, catering bookings and product delivery.',
    category: 'Food & Beverage · D2C', tags: ['Branding', 'E-Commerce'],
    accent: '#f97316', glow: 'rgba(249,115,22,0.22)',
    stat: '3×', statLabel: 'Revenue',
    Icon: Utensils, pattern: 'cross',
    filterKeys: ['all', 'ecommerce'],
  },
];

const FILTER_TABS: { key: FilterKey; label: string; count: number }[] = [
  { key: 'all',        label: 'All Work',    count: 8 },
  { key: 'featured',   label: 'Featured',    count: 3 },
  { key: 'saas',       label: 'SaaS',        count: 2 },
  { key: 'ecommerce',  label: 'E-Commerce',  count: 3 },
  { key: 'enterprise', label: 'Enterprise',  count: 2 },
];

/* Bento column spans for desktop "all" view (4-col grid) */
const BENTO_COL: Record<number, string> = {
  1: 'lg:col-span-2', 2: 'lg:col-span-1', 3: 'lg:col-span-1',
  4: 'lg:col-span-1', 5: 'lg:col-span-1', 6: 'lg:col-span-2',
  7: 'lg:col-span-2', 8: 'lg:col-span-2',
};

/* ─── SVG Patterns ───────────────────────────────────────────────────────── */
const PatternBg = memo(function PatternBg({
  kind, color, uid,
}: { kind: PatternKind; color: string; uid: string }) {
  const op = 0.07;
  const id = `ps-p-${uid}`;

  const shapes: Record<PatternKind, React.ReactElement> = {
    dots:
      <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.1" fill={color} fillOpacity={op} />
      </pattern>,
    lines:
      <pattern id={id} width="30" height="30" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="30" y2="30" stroke={color} strokeWidth="0.5" strokeOpacity={op} />
      </pattern>,
    grid:
      <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M 28 0 L 0 0 0 28" fill="none" stroke={color} strokeWidth="0.4" strokeOpacity={op} />
      </pattern>,
    diagonal:
      <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
        <line x1="0" y1="16" x2="16" y2="0" stroke={color} strokeWidth="0.5" strokeOpacity={op} />
      </pattern>,
    waves:
      <pattern id={id} width="40" height="20" patternUnits="userSpaceOnUse">
        <path d="M 0 10 Q 10 0 20 10 Q 30 20 40 10" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity={op} />
      </pattern>,
    cross:
      <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
        <line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="0.6" strokeOpacity={op} />
        <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="0.6" strokeOpacity={op} />
      </pattern>,
    hex:
      <pattern id={id} width="40" height="46" patternUnits="userSpaceOnUse">
        <polygon points="20,1 39,11 39,33 20,43 1,33 1,11" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity={op} />
      </pattern>,
    circuit:
      <pattern id={id} width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 8 8 H 24 V 24 H 40 V 40" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity={op} />
        <circle cx="8"  cy="8"  r="1.8" fill={color} fillOpacity={op * 2} />
        <circle cx="24" cy="24" r="1.8" fill={color} fillOpacity={op * 2} />
        <circle cx="40" cy="40" r="1.8" fill={color} fillOpacity={op * 2} />
      </pattern>,
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>{shapes[kind]}</defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
});

/* ─── CountUp (RAF, cancels on cleanup) ──────────────────────────────────── */
const CountUp = memo(function CountUp({
  value, inView,
}: { value: string; inView: boolean }) {
  const num    = parseFloat(value.replace(/[^0-9.]/g, ''));
  const prefix = value.match(/^\+/)?.[0] ?? '';
  const suffix = value.replace(/[\d.+]/g, '');
  const hasNum = !isNaN(num) && num > 0;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || !hasNum) return;
    let raf = 0;
    const start = performance.now();
    const dur   = 1400;
    const tick  = (now: number) => {
      const p    = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(ease * num));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, hasNum]);

  if (!hasNum) return <>{value}</>;
  return <>{prefix}{display}{suffix}</>;
});

/* ─── Card ───────────────────────────────────────────────────────────────── */
const Card = memo(function Card({
  p, entranceIndex,
}: { p: Project; entranceIndex: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const { Icon } = p;

  const onEnter = useCallback(() => setHovered(true),  []);
  const onLeave = useCallback(() => setHovered(false), []);

  /* Derived hover styles — CSS transitions handle the interpolation */
  const cardStyle: CSSProperties = {
    background: `linear-gradient(145deg, #0e0e0e 0%, #0a0a0a 100%)`,
    border: `1px solid ${hovered ? p.accent + '30' : 'rgba(255,255,255,0.055)'}`,
    boxShadow: hovered
      ? `0 0 0 1px ${p.accent}18, 0 24px 80px rgba(0,0,0,0.85), 0 0 60px ${p.glow}`
      : '0 8px 40px rgba(0,0,0,0.7)',
    transition: 'border-color 0.3s ease, box-shadow 0.35s ease',
    borderRadius: 20,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: entranceIndex * 0.07,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
      style={{ willChange: inView ? 'auto' : 'transform, opacity' }}
    >
      <motion.article
        className="ps-card relative overflow-hidden flex flex-col h-full cursor-pointer select-none"
        style={cardStyle}
        whileHover={{ scale: 1.013 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* ── Shimmer beam (CSS-only, fires on .ps-card:hover) ── */}
        <div
          className="ps-shimmer-beam absolute inset-y-0 w-[45%] pointer-events-none z-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${p.accent}10, transparent)`,
          }}
          aria-hidden="true"
        />

        {/* ── Top accent line ── */}
        <div
          className="absolute top-0 left-[12%] right-[12%] h-[1.5px] rounded-full z-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${p.accent}${hovered ? 'cc' : '60'}, transparent)`,
            transition: 'background 0.4s ease',
          }}
          aria-hidden="true"
        />

        {/* ── SVG pattern ── */}
        <PatternBg kind={p.pattern} color={p.accent} uid={String(p.id)} />

        {/* ── Corner glow blobs ── */}
        <div
          className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${p.accent}14 0%, transparent 65%)` }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${p.accent}08 0%, transparent 65%)` }}
          aria-hidden="true"
        />

        {/* ── Large watermark number ── */}
        <div
          className="absolute bottom-0 right-4 pointer-events-none select-none"
          style={{
            fontSize: 'clamp(5rem, 10vw, 8rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: p.accent,
            opacity: hovered ? 0.07 : 0.04,
            transition: 'opacity 0.4s ease',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            letterSpacing: '-0.04em',
          }}
          aria-hidden="true"
        >
          {p.num}
        </div>

        {/* ── Bottom gradient fade ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)' }}
          aria-hidden="true"
        />

        {/* ════ CONTENT ════ */}
        <div className="relative z-10 flex flex-col h-full p-6 sm:p-7">

          {/* Row 1 — number · icon · featured badge · arrow */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              {/* Number micro-label */}
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 900,
                  letterSpacing: '0.2em',
                  color: `${p.accent}45`,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {p.num}
              </span>

              {/* Icon box */}
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                style={{
                  background: `${p.accent}${hovered ? '18' : '0e'}`,
                  border: `1px solid ${p.accent}${hovered ? '35' : '1c'}`,
                  transition: 'background 0.3s ease, border-color 0.3s ease',
                }}
              >
                <Icon style={{ width: 16, height: 16, color: p.accent }} />
              </div>

              {/* Featured badge */}
              {p.featured && (
                <span
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
                  style={{
                    fontSize: 7,
                    fontWeight: 900,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    background: `${p.accent}12`,
                    border: `1px solid ${p.accent}25`,
                    color: p.accent,
                  }}
                >
                  <Sparkles style={{ width: 6, height: 6 }} />
                  Featured
                </span>
              )}
            </div>

            {/* Arrow */}
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
              style={{
                background: `${p.accent}${hovered ? '18' : '08'}`,
                border: `1px solid ${p.accent}${hovered ? '35' : '15'}`,
                transform: hovered ? 'rotate(45deg) scale(1.12)' : 'rotate(0deg) scale(1)',
                transition: 'transform 0.25s ease, background 0.3s ease, border-color 0.3s ease',
              }}
            >
              <ArrowUpRight style={{ width: 13, height: 13, color: p.accent }} />
            </div>
          </div>

          {/* Category pill */}
          <span
            className="self-start mb-5 px-3 py-1.5 rounded-full"
            style={{
              fontSize: 7,
              fontWeight: 900,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: p.accent,
              background: `${p.accent}0e`,
              border: `1px solid ${p.accent}1c`,
            }}
          >
            {p.category}
          </span>

          {/* Project name */}
          <h3
            className="font-black leading-[1.06] tracking-tight mb-1.5"
            style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
              color: '#ffffff',
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
          >
            {p.name}
          </h3>

          {/* Animated underline */}
          <motion.div
            className="rounded-full mb-3"
            style={{
              height: 1.5,
              background: `linear-gradient(90deg, ${p.accent}90, transparent)`,
            }}
            initial={{ width: 0 }}
            animate={inView ? { width: hovered ? 56 : 32 } : {}}
            transition={{ delay: entranceIndex * 0.07 + 0.4, duration: 0.5 }}
          />

          {/* Tagline */}
          <p
            className="font-bold uppercase tracking-[0.13em] mb-4"
            style={{
              fontSize: 8.5,
              color: `${p.accent}75`,
            }}
          >
            {p.tagline}
          </p>

          {/* Description */}
          <p
            className="leading-[1.82] flex-1"
            style={{
              fontSize: 'clamp(11px, 1.1vw, 12.5px)',
              color: 'rgba(255,255,255,0.42)',
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
          >
            {p.description}
          </p>

          {/* Footer — tags + stat */}
          <div
            className="flex items-end justify-between gap-3 mt-5 pt-5"
            style={{ borderTop: `1px solid ${p.accent}12` }}
          >
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full"
                  style={{
                    fontSize: 6.5,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '3px 10px',
                    color: 'rgba(255,255,255,0.35)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Stat */}
            <div className="text-right shrink-0">
              <div
                className="font-black leading-none tabular-nums"
                style={{
                  fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
                  color: p.accent,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  textShadow: hovered ? `0 0 28px ${p.accent}55` : 'none',
                  transition: 'text-shadow 0.35s ease',
                  letterSpacing: '-0.03em',
                }}
              >
                <CountUp value={p.stat} inView={inView} />
              </div>
              <div
                className="font-black tracking-widest uppercase mt-0.5"
                style={{
                  fontSize: 6.5,
                  color: 'rgba(255,255,255,0.25)',
                }}
              >
                {p.statLabel}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
});

/* ─── Filter Tabs ────────────────────────────────────────────────────────── */
const FilterTabs = memo(function FilterTabs({
  active, set,
}: { active: FilterKey; set: (k: FilterKey) => void }) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2"
      role="tablist"
      aria-label="Project filter"
    >
      {FILTER_TABS.map((tab) => {
        const on = active === tab.key;
        return (
          <motion.button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => set(tab.key)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="relative flex items-center gap-2 rounded-full overflow-hidden"
            style={{
              padding: '8px 18px',
              fontSize: 9.5,
              fontWeight: 900,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: on ? '#000000' : 'rgba(255,255,255,0.38)',
              background: on ? '#ffffff' : 'rgba(255,255,255,0.05)',
              border: on ? 'none' : '1px solid rgba(255,255,255,0.08)',
              boxShadow: on ? '0 4px 24px rgba(255,255,255,0.15)' : 'none',
              cursor: 'pointer',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              transition: 'color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
            }}
          >
            <span className="relative z-10">{tab.label}</span>
            <span
              className="relative z-10 rounded-full"
              style={{
                fontSize: 7,
                fontWeight: 900,
                padding: '1px 6px',
                background: on ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.07)',
                color: on ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.25)',
              }}
            >
              {tab.count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
});

/* ─── Section Header ─────────────────────────────────────────────────────── */
const SectionHeader = memo(function SectionHeader({ inView }: { inView: boolean }) {
  return (
    <div className="text-center mb-12 sm:mb-16 px-4">

      {/* Eyebrow badges */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 mb-8"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Label pill — solid bg, no backdrop-filter */}
        <div
          className="flex items-center gap-2 rounded-full"
          style={{
            padding: '6px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Zap style={{ width: 8, height: 8, color: '#fbbf24' }} />
          <span
            style={{
              fontSize: 8,
              fontWeight: 900,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Selected Work
          </span>
        </div>

        {/* Live dot */}
        <div className="flex items-center gap-2">
          <span
            className="ps-blink w-2 h-2 rounded-full"
            style={{ background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.7)', display: 'inline-block' }}
          />
          <span
            style={{
              fontSize: 8,
              fontWeight: 900,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(74,222,128,0.85)',
            }}
          >
            All Live
          </span>
        </div>
      </motion.div>

      {/* Headline — clipped reveal per line */}
      <div className="overflow-hidden mb-0.5">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 6.2rem)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            color: '#ffffff',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          Projects That
        </motion.h2>
      </div>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 6.2rem)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            background: 'linear-gradient(120deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.25) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          Drive Results
        </motion.h2>
      </div>

      {/* Divider dots */}
      <motion.div
        className="flex items-center justify-center gap-3 mt-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18))' }}
          initial={{ width: 0 }}
          animate={inView ? { width: 88 } : {}}
          transition={{ delay: 0.65, duration: 0.7 }}
        />
        <div className="flex gap-1.5">
          {[0, 1, 2].map((j) => (
            <div
              key={j}
              className="rounded-full"
              style={{
                width:      j === 1 ? 7 : 4,
                height:     j === 1 ? 7 : 4,
                background: j === 1 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
        <motion.div
          className="h-px"
          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.18), transparent)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: 88 } : {}}
          transition={{ delay: 0.65, duration: 0.7 }}
        />
      </motion.div>
    </div>
  );
});

/* ─── Root ───────────────────────────────────────────────────────────────── */
export default function ProjectsShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(wrapRef, { once: true, margin: '-50px' });
  const [filter, setFilter] = useState<FilterKey>('all');

  const setFilterCb = useCallback((k: FilterKey) => setFilter(k), []);

  const visible = useMemo<Project[]>(() => {
    if (filter === 'all')      return PROJECTS;
    if (filter === 'featured') return PROJECTS.filter((p) => p.featured);
    return PROJECTS.filter((p) => p.filterKeys.includes(filter));
  }, [filter]);

  const isAll = filter === 'all';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <section
        className="relative overflow-hidden"
        style={{
          background: '#000000',
          paddingTop:    'clamp(64px, 8vw, 112px)',
          paddingBottom: 'clamp(64px, 8vw, 112px)',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
        aria-label="Projects showcase"
      >

        {/* ── Background: pitch black + very subtle dot grid ── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Dot mesh */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.018) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Very faint centre glow — keeps it from feeling clinically flat */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 90% 55% at 50% 50%, rgba(255,255,255,0.012) 0%, transparent 65%)',
            }}
          />
          {/* Top edge line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
          />
          {/* Bottom edge line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
          />
        </div>

        {/* ── Max-width content container ── */}
        <div
          ref={wrapRef}
          className="relative z-10 w-full mx-auto"
          style={{ maxWidth: 1520, paddingLeft: 'clamp(16px, 4vw, 80px)', paddingRight: 'clamp(16px, 4vw, 80px)' }}
        >

          {/* Header */}
          <SectionHeader inView={inView} />

          {/* Filter tabs */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.38 }}
          >
            <FilterTabs active={filter} set={setFilterCb} />
          </motion.div>

          {/* ── Bento / Grid ── */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={[
                'grid gap-5 sm:gap-6',
                'grid-cols-1',
                'sm:grid-cols-2',
                isAll ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
              ].join(' ')}
            >
              {visible.map((p, i) => {
                /* Bento span only applies when viewing "all" in 4-col desktop layout */
                const spanClass = isAll ? (BENTO_COL[p.id] ?? 'lg:col-span-1') : '';

                return (
                  <div
                    key={p.id}
                    className={spanClass}
                    style={{ minHeight: isAll && BENTO_COL[p.id] === 'lg:col-span-2' ? 260 : 300 }}
                  >
                    <Card p={p} entranceIndex={i} />
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* ── Footer strip ── */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-16 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.0 }}
          >
            {[
              'All projects delivered on time',
              '18-month avg. engagement',
              'UK & Global clients',
            ].map((text, i) => (
              <React.Fragment key={text}>
                {i > 0 && (
                  <span
                    className="hidden sm:block rounded-full"
                    style={{ width: 3, height: 3, background: 'rgba(255,255,255,0.14)' }}
                    aria-hidden="true"
                  />
                )}
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 900,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.22)',
                  }}
                >
                  {text}
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}