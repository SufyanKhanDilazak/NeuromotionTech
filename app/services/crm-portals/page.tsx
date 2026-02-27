'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import {
  motion, useInView, useMotionValue, useSpring, useTransform,
  AnimatePresence, type Variants,
} from 'framer-motion';
import {
  Users, TrendingUp, Zap, BarChart3, Shield,
  Star, ArrowRight, CheckCircle, Globe,
  Sparkles, ChevronRight, Database, RefreshCw, Bell,
  MessageSquare, PieChart, Clock, Award, Play, X,
  Phone, Building2, Layers3, GitMerge, Cpu, Lock,
  Workflow, HeartHandshake, LineChart, Megaphone,
  Headphones, FlaskConical, Rocket, CircleDot,
  LayoutDashboard, Activity, Target,
} from 'lucide-react';

/* ──────────────────────────── DESIGN TOKENS ──────────────────────────────── */
const GRAD = {
  primary : 'linear-gradient(135deg,#ff6b35 0%,#e91e8c 100%)',
  wide    : 'linear-gradient(135deg,#ff6b35 0%,#e91e8c 40%,#7c3aed 100%)',
  full    : 'linear-gradient(135deg,#ff6b35 0%,#e91e8c 35%,#7c3aed 70%,#0ea5e9 100%)',
  orange  : 'linear-gradient(135deg,#ff6b35,#ff9a3c)',
  pink    : 'linear-gradient(135deg,#e91e8c,#f472b6)',
  violet  : 'linear-gradient(135deg,#7c3aed,#a78bfa)',
  cyan    : 'linear-gradient(135deg,#0ea5e9,#38bdf8)',
  green   : 'linear-gradient(135deg,#10b981,#34d399)',
} as const;

const F_COLS = [
  { from: '#ff6b35', to: '#ff9a3c' }, { from: '#e91e8c', to: '#f472b6' },
  { from: '#7c3aed', to: '#a78bfa' }, { from: '#0ea5e9', to: '#38bdf8' },
  { from: '#10b981', to: '#34d399' }, { from: '#f59e0b', to: '#fbbf24' },
];

const PLATFORMS = [
  { name: 'Salesforce',  emoji: '☁️' }, { name: 'HubSpot',    emoji: '🧡' },
  { name: 'Zoho',        emoji: '🔴' }, { name: 'MS Dynamics',emoji: '💙' },
  { name: 'Pipedrive',   emoji: '💚' }, { name: 'Freshsales', emoji: '🩵' },
  { name: 'Monday CRM',  emoji: '⭐' }, { name: 'Notion CRM', emoji: '🖤' },
] as const;

/* ──────────────────────────── MOTION VARIANTS ────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show  : { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show  : { transition: { staggerChildren: 0.09 } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show  : { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ──────────────────────────── TINY PRIMITIVES ────────────────────────────── */
function GradientText({ children, gradient = GRAD.wide }: { children: ReactNode; gradient?: string }) {
  return (
    <span style={{
      background: gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor : 'transparent',
      backgroundClip      : 'text',
    }}>{children}</span>
  );
}

interface PillProps { children: ReactNode; style?: CSSProperties; className?: string }
function Pill({ children, style, className = '' }: PillProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase font-clash ${className}`}
      style={style}>
      {children}
    </span>
  );
}

function LiveDot() {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-clash"
      style={{ background: '#ecfdf5', color: '#065f46' }}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Live
    </span>
  );
}

/* ──────────────────────────── ANIMATED COUNTER ──────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = to / 55;
    const id = setInterval(() => {
      n += step;
      if (n >= to) { setVal(to); clearInterval(id); }
      else           setVal(Math.floor(n));
    }, 16);
    return () => clearInterval(id);
  }, [inView, to]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ──────────────────────────── FLOATING BLOB ─────────────────────────────── */
function Blob({ color, size, x, y, delay = 0 }:
  { color: string; size: number; x: string; y: string; delay?: number }) {
  return (
    <motion.div aria-hidden
      className="absolute rounded-full pointer-events-none select-none"
      style={{ width: size, height: size, left: x, top: y, background: color, filter: 'blur(80px)', opacity: 0.14 }}
      animate={{ scale: [1, 1.22, 1], x: [0, 24, 0], y: [0, -20, 0] }}
      transition={{ duration: 9 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ──────────────────────────── 3D TILT CARD ─────────────────────────────── */
interface TiltCardProps { children: ReactNode; className?: string; style?: CSSProperties }

function TiltCard({ children, className = '', style }: TiltCardProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-100, 100], [ 8, -8]), { stiffness: 200, damping: 24 });
  const ry = useSpring(useTransform(mx, [-100, 100], [-8,  8]), { stiffness: 200, damping: 24 });

  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', ...style }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left  - r.width  / 2);
        my.set(e.clientY - r.top   - r.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────── PLATFORM MARQUEE ──────────────────────────── */
function Marquee() {
  const items = [...PLATFORMS, ...PLATFORMS];
  return (
    <div className="overflow-hidden py-3 relative">
      <div className="absolute inset-y-0 left-0  w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg,#fff,transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg,#fff,transparent)' }} />
      <motion.ul className="flex gap-3 w-max list-none m-0 p-0"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>
        {items.map((p, i) => (
          <li key={i}
            className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-slate-100 whitespace-nowrap select-none"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <span aria-hidden>{p.emoji}</span>
            <span className="font-bold text-sm text-slate-700 font-syne">{p.name}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

/* ──────────────────────────── SECTION HEADER ────────────────────────────── */
interface SectionHeaderProps {
  badge: string; title: string; highlight: string; sub: string; badgeIcon?: ReactNode;
}
function SectionHeader({ badge, title, highlight, sub, badgeIcon = <Sparkles size={11} /> }: SectionHeaderProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
      className="text-center mb-14 px-4">
      <motion.div variants={scaleIn} className="flex justify-center mb-5">
        <Pill style={{ background: 'linear-gradient(135deg,#fff3ed,#fce7f3)', color: '#c2410c', border: '1.5px solid #fed7aa' }}>
          {badgeIcon} {badge}
        </Pill>
      </motion.div>
      <motion.h2 variants={fadeUp}
        className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight font-clash">
        {title} <GradientText>{highlight}</GradientText>
      </motion.h2>
      <motion.p variants={fadeUp}
        className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-syne">
        {sub}
      </motion.p>
    </motion.div>
  );
}

/* ──────────────────────────── FEATURE CARD ──────────────────────────────── */
interface FeatureCardProps { icon: React.ElementType; title: string; desc: string; index: number }

function FeatureCard({ icon: Icon, title, desc, index }: FeatureCardProps) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const col    = F_COLS[index % F_COLS.length];

  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, boxShadow: `0 28px 64px ${col.from}22` }}
      className="group bg-white rounded-3xl p-6 border border-slate-100 cursor-default relative overflow-hidden"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>

      {/* Corner glow on hover */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle,${col.from}25,transparent)` }} />

      <div className="flex items-start gap-4 relative z-10">
        <motion.div
          whileHover={{ rotate: 14, scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `linear-gradient(135deg,${col.from},${col.to})`, boxShadow: `0 8px 20px ${col.from}40` }}>
          <Icon size={22} color="#fff" aria-hidden />
        </motion.div>
        <div>
          <h3 className="text-slate-900 font-bold text-base mb-1.5 font-clash">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-syne">{desc}</p>
        </div>
      </div>

      <motion.div className="mt-4 h-0.5 rounded-full origin-left"
        initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.35 }}
        style={{ background: `linear-gradient(90deg,${col.from},${col.to})` }} />
    </motion.article>
  );
}

/* ──────────────────────────── STAT CARD ─────────────────────────────────── */
interface StatCardProps {
  value: number; suffix: string; label: string;
  icon: React.ElementType; gradient: string; delay: number;
}
function StatCard({ value, suffix, label, icon: Icon, gradient, delay }: StatCardProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.85, y: 28 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-3xl p-6 text-center relative overflow-hidden"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)' }}>
      <div className="absolute top-0 inset-x-0 h-1 rounded-t-3xl" style={{ background: gradient }} />
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-2"
        style={{ background: gradient }}
        animate={inView ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 2, delay: delay + 0.4 }}>
        <Icon size={24} color="#fff" aria-hidden />
      </motion.div>
      <div className="text-4xl font-black text-slate-900 mb-1 font-clash">
        <Counter to={value} suffix={suffix} />
      </div>
      <p className="text-slate-500 text-sm font-medium font-syne">{label}</p>
    </motion.div>
  );
}

/* ──────────────────────────── PROCESS STEP ─────────────────────────────── */
interface ProcessStepProps {
  icon: React.ElementType; step: string; title: string;
  desc: string; color: string; delay: number; last?: boolean;
}
function ProcessStep({ icon: Icon, step, title, desc, color, delay, last = false }: ProcessStepProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }} whileHover={{ y: -6 }}
      className="relative text-center">
      {!last && (
        <div aria-hidden
          className="hidden lg:block absolute top-10 left-[calc(50%+44px)] w-[calc(100%-88px)] h-px"
          style={{ borderTop: '2px dashed rgba(203,213,225,0.8)' }} />
      )}
      <motion.div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 relative"
        style={{ background: `${color}14`, border: `2px solid ${color}28` }}
        whileHover={{ scale: 1.1, background: `${color}22` }}>
        <Icon size={30} style={{ color }} aria-hidden />
        <span
          className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white font-clash"
          style={{ background: color, boxShadow: `0 4px 12px ${color}60` }}>
          {step}
        </span>
      </motion.div>
      <h4 className="font-black text-slate-900 mb-2 font-clash">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed font-syne">{desc}</p>
    </motion.div>
  );
}

/* ──────────────────────────── CAPABILITY ITEM ───────────────────────────── */
function CapItem({ item, index }: { item: string; index: number }) {
  const ref    = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.li ref={ref}
      initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.4 }} whileHover={{ x: 5 }}
      className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-100 cursor-default list-none"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: GRAD.primary }}>
        <CheckCircle size={13} color="#fff" aria-hidden />
      </div>
      <span className="text-slate-700 font-semibold text-sm font-syne">{item}</span>
    </motion.li>
  );
}

/* ──────────────────────────── PROGRESS BAR ─────────────────────────────── */
interface ProgressBarProps { label: string; pct: number; color: string }

function ProgressBar({ label, pct, color }: ProgressBarProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5 font-syne">
        <span>{label}</span>
        <motion.span style={{ color }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}>
          {pct}%
        </motion.span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
        <motion.div className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg,${color},${color}80)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────── TESTIMONIAL CARD ─────────────────────────── */
interface Testimonial { name: string; role: string; quote: string; avatar: string; color: string }

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.1 }}
      whileHover={{ y: -8, boxShadow: `0 24px 60px ${t.color}18` }}
      className="bg-white rounded-3xl p-6 border border-slate-100 relative overflow-hidden"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
      {/* Quote decoration */}
      <div aria-hidden
        className="absolute top-4 right-5 text-6xl font-black leading-none pointer-events-none select-none"
        style={{ color: `${t.color}10`, fontFamily: 'Georgia,serif' }}>"</div>
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 h-1 rounded-t-3xl"
        style={{ background: `linear-gradient(90deg,${t.color},${t.color}55)` }} />
      {/* Stars */}
      <div className="flex gap-1 mb-4 mt-2">
        {Array.from({ length: 5 }).map((_, si) => (
          <motion.div key={si}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1 + si * 0.05 + 0.2 }}>
            <Star size={14} fill={t.color} color={t.color} aria-hidden />
          </motion.div>
        ))}
      </div>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 font-syne italic relative z-10">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0 font-clash"
          style={{ background: `linear-gradient(135deg,${t.color},${t.color}90)` }}>
          {t.avatar}
        </div>
        <div>
          <p className="font-bold text-slate-900 text-sm font-clash">{t.name}</p>
          <p className="text-xs text-slate-400 font-syne">{t.role}</p>
        </div>
      </div>
    </motion.article>
  );
}

/* ──────────────────────────── DEMO MODAL ───────────────────────────────── */
function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog" aria-modal aria-label="Book a demo"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}>
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            className="relative bg-white rounded-3xl p-8 max-w-md w-full text-center"
            initial={{ scale: 0.8, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 30 }}
            onClick={e => e.stopPropagation()}
            style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.25)' }}>
            <button onClick={onClose} aria-label="Close dialog"
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
              <X size={16} aria-hidden />
            </button>
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: GRAD.primary, boxShadow: '0 12px 30px rgba(255,107,53,0.4)' }}
              animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Play size={28} color="#fff" aria-hidden />
            </motion.div>
            <h3 className="text-xl font-black text-slate-900 mb-3 font-clash">Schedule a Live Demo</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-syne mb-6">
              See our CRM portal solutions in action. Book a free 30-minute walkthrough tailored to your exact needs.
            </p>
            <Link href="/info/contacts">
              <motion.span
                whileHover={{ scale: 1.04, boxShadow: '0 16px 40px rgba(255,107,53,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-white font-clash cursor-pointer"
                style={{ background: GRAD.primary }}>
                <Phone size={16} aria-hidden /> Book a Free Demo Call
              </motion.span>
            </Link>
            <button onClick={onClose}
              className="mt-3 w-full py-2.5 text-sm text-slate-400 hover:text-slate-600 transition-colors font-syne">
              Maybe later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────── REUSABLE CTA BUTTON ──────────────────────── */
type BtnVariant = 'primary' | 'outline' | 'white' | 'ghost';

interface CtaButtonProps {
  href: string; children: ReactNode;
  variant?: BtnVariant; className?: string; onClick?: () => void;
}
function CtaButton({ href, children, variant = 'primary', className = '' }: CtaButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base font-clash transition-all select-none cursor-pointer';

  const variantStyle: Record<BtnVariant, CSSProperties> = {
    primary : { background: GRAD.primary, color: '#fff', boxShadow: '0 8px 24px rgba(255,107,53,0.3)' },
    white   : { background: '#fff', color: '#ff6b35', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' },
    outline : { background: 'transparent', border: '2px solid rgba(255,255,255,0.4)', color: '#fff' },
    ghost   : { background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' },
  };

  return (
    <Link href={href}>
      <motion.span
        className={`${base} ${className}`}
        style={variantStyle[variant]}
        whileHover={{ scale: 1.05, boxShadow: variant === 'primary' ? '0 20px 50px rgba(255,107,53,0.45)' : undefined }}
        whileTap={{ scale: 0.97 }}>
        {children}
      </motion.span>
    </Link>
  );
}

/* ──────────────────────────── FLOATING BADGE ───────────────────────────── */
function FloatingBadge({ text, sub, iconColor, className }: {
  text: string; sub: string; iconColor: string; className?: string;
}) {
  return (
    <motion.div
      aria-hidden
      className={`absolute bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl border border-slate-100 ${className ?? ''}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconColor }}>
        <TrendingUp size={16} color="#fff" aria-hidden />
      </div>
      <div>
        <p className="font-black text-slate-900 text-sm font-clash">{text}</p>
        <p className="text-xs text-slate-400 font-syne">{sub}</p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════════ */
export default function CRMPortalsPage() {
  const [demoOpen,  setDemoOpen]  = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const heroRef  = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  /* ─ data ─ */
  const TABS = ['Sales', 'Marketing', 'Support', 'Analytics'] as const;

  const tabContent = [
    { icon: TrendingUp, title: 'Sales Pipeline',  desc: 'Visualise every deal stage, track prospects in real-time, and close faster with AI-powered lead scoring and follow-up reminders that never miss a beat.' },
    { icon: Megaphone,  title: 'Marketing Hub',   desc: 'Launch targeted email campaigns, automate nurture sequences, and track engagement metrics — all from one unified dashboard with full attribution.' },
    { icon: Headphones, title: 'Support Center',  desc: 'Resolve tickets faster with a unified inbox, SLA tracking, live chat integration, and automated resolution workflows that delight customers.' },
    { icon: LineChart,  title: 'Analytics Suite', desc: 'Turn raw data into revenue with custom reports, cohort analysis, churn prediction, and real-time KPI dashboards that surface insights instantly.' },
  ] as const;

  const features = [
    { icon: Users,    title: 'Contact Management',  desc: 'Centralise every interaction, note, and file in one intelligent timeline view your whole team can access.' },
    { icon: Target,   title: 'AI Lead Scoring',     desc: 'Automatically rank your hottest prospects so your team focuses on the deals most likely to close today.' },
    { icon: Workflow, title: 'Task Automation',     desc: 'Eliminate manual data entry with smart workflows triggered by customer actions, saving hours weekly.' },
    { icon: Globe,    title: '200+ Integrations',   desc: 'Connect Slack, Stripe, Gmail, and your existing stack without complex custom code or expensive consultants.' },
    { icon: Lock,     title: 'Enterprise Security', desc: 'SOC 2 compliant with role-based access, full audit logs, and end-to-end encryption built in from day one.' },
    { icon: Activity, title: 'Live Analytics',      desc: 'Real-time KPI dashboards that surface the data you need before you even think to ask for it.' },
  ] as const;

  const capabilities = [
    'Custom CRM Development', 'System Integration',
    'Sales Pipeline Management', 'Analytics & Reporting',
    'Support Automation', 'AI Lead Scoring',
    'Mobile CRM Apps', 'White-label Solutions',
  ] as const;

  const progressBars: ProgressBarProps[] = [
    { label: 'Customer Satisfaction', pct: 94, color: '#ff6b35' },
    { label: 'Deal Close Rate',        pct: 78, color: '#e91e8c' },
    { label: 'Lead Conversion',        pct: 62, color: '#7c3aed' },
    { label: 'Support Resolution',     pct: 88, color: '#0ea5e9' },
  ];

  const testimonials: Testimonial[] = [
    { name: 'Sarah Chen',  role: 'VP Sales, TechFlow',  avatar: 'SC', color: '#ff6b35', quote: 'Deal close rate jumped 40% in 90 days. The pipeline visibility alone was worth every penny of the investment.' },
    { name: 'Marcus Reid', role: 'CEO, Growthly',       avatar: 'MR', color: '#e91e8c', quote: 'Finally a CRM our team actually uses. Custom workflows saved 12 hours per rep every week — truly transformative.' },
    { name: 'Priya Patel', role: 'Head of CX, Nexify',  avatar: 'PP', color: '#7c3aed', quote: 'Customer satisfaction hit 97%. Support automation alone justified the entire platform cost within 30 days.' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
        .font-clash { font-family: 'Clash Display','Syne',sans-serif; }
        .font-syne  { font-family: 'Syne',sans-serif; }
        ::-webkit-scrollbar       { width: 5px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#ff6b35,#e91e8c); border-radius: 3px; }
      `}</style>

      <main className="min-h-screen bg-white overflow-x-hidden font-syne">
        <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <Blob color="#ff6b35" size={520} x="-8%"  y="-5%"  delay={0}   />
          <Blob color="#e91e8c" size={440} x="62%"  y="5%"   delay={2}   />
          <Blob color="#7c3aed" size={380} x="28%"  y="50%"  delay={4}   />
          <Blob color="#0ea5e9" size={320} x="82%"  y="60%"  delay={1.5} />

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -18 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="flex justify-center mb-8">
            <Pill style={{ background: 'linear-gradient(135deg,#fff3ed,#fce7f3)', color: '#c2410c', border: '1.5px solid #fed7aa' }}>
              <Star size={11} fill="#c2410c" color="#c2410c" aria-hidden />
              Award-Winning CRM Solutions
              <Star size={11} fill="#c2410c" color="#c2410c" aria-hidden />
            </Pill>
          </motion.div>

          {/* Heading */}
          <div className="text-center max-w-5xl mx-auto mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.93] tracking-tight text-slate-900 mb-6 font-clash">
              Build Deeper{' '}
              <span className="relative inline-block">
                <GradientText>Customer</GradientText>
                <motion.svg viewBox="0 0 300 14" fill="none" aria-hidden
                  className="absolute -bottom-1 left-0 w-full"
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}>
                  <motion.path d="M 4 7 Q 75 1 150 7 Q 225 13 296 7"
                    stroke="url(#hg)" strokeWidth="3.5" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={heroInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, delay: 0.75 }} />
                  <defs>
                    <linearGradient id="hg" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor="#ff6b35" />
                      <stop offset="50%"  stopColor="#e91e8c" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
              <br />Relationships
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-syne">
              Custom CRM portals that centralise your data, automate your pipeline, and deliver insights that turn customers into lifelong advocates.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <CtaButton href="/info/contacts" variant="primary">
                Get Started Free <ArrowRight size={18} aria-hidden />
              </CtaButton>
              <motion.button onClick={() => setDemoOpen(true)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-slate-700 text-base border-2 border-slate-200 bg-white hover:border-slate-300 transition-colors font-clash">
                <Play size={16} aria-hidden /> Watch Demo
              </motion.button>
            </motion.div>

            {/* Trust row */}
            <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.65 }}
              className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-slate-500 font-syne">
              {[
                { icon: <Shield size={14} className="text-emerald-500" />, text: 'SOC 2 Certified' },
                { icon: <Users  size={14} className="text-blue-500"    />, text: '500+ Clients' },
                { icon: <Star   size={14} className="text-amber-400" fill="currentColor" />, text: '4.9 / 5 Rating' },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 font-medium">{icon}{text}</span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.75 }}>
              <p className="text-xs text-slate-400 font-semibold tracking-widest uppercase mb-4 font-clash">
                Integrates with your favourite platforms
              </p>
              <Marquee />
            </motion.div>
          </div>

          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto relative">

            <FloatingBadge text="+$12,400 Deal"  sub="Just closed · Acme Corp"  iconColor={GRAD.orange} className="hidden sm:flex -left-6 top-12 z-20" />
            <FloatingBadge text="94% CSAT Score" sub="↑ 12% this month"         iconColor={GRAD.green}  className="hidden sm:flex -right-6 top-28 z-20" />

            <TiltCard
              className="relative rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.14),0 0 0 1px rgba(0,0,0,0.06)' }}>
              {/* Browser chrome */}
              <header className="bg-slate-900 px-5 py-3 flex items-center gap-3">
                <div className="flex gap-1.5" aria-hidden>
                  {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 flex items-center gap-2 max-w-xs mx-auto">
                    <Shield size={10} aria-hidden /> app.neuromotion.ai/crm
                  </div>
                </div>
                <RefreshCw size={13} className="text-slate-500" aria-hidden />
              </header>

              <div className="bg-gradient-to-br from-slate-50 to-white p-5 sm:p-7">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-black text-slate-900 text-lg font-clash flex items-center gap-2">
                    <LayoutDashboard size={18} className="text-slate-400" aria-hidden /> CRM Dashboard
                  </h2>
                  <LiveDot />
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {([
                    { label: 'New Leads',    val: '248',  trend: '+12%', color: '#ff6b35', icon: Users      },
                    { label: 'Revenue',      val: '$84k', trend: '+8%',  color: '#e91e8c', icon: TrendingUp },
                    { label: 'Deals Closed', val: '36',   trend: '+21%', color: '#7c3aed', icon: CircleDot  },
                  ] as const).map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100"
                        style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon size={11} style={{ color: s.color }} aria-hidden />
                          <p className="text-xs text-slate-400 font-syne">{s.label}</p>
                        </div>
                        <p className="font-black text-slate-900 text-xl sm:text-2xl font-clash">{s.val}</p>
                        <p className="text-xs font-bold mt-0.5 font-clash" style={{ color: s.color }}>{s.trend}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bar chart */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-600 font-clash flex items-center gap-1.5">
                      <BarChart3 size={12} aria-hidden /> Pipeline Progress
                    </span>
                    <span className="text-xs text-slate-400 font-syne">Q4 2024</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-14" role="img" aria-label="Pipeline progress bar chart">
                    {[60,80,45,95,70,88,50,75,90,65,85,72].map((h, i) => (
                      <motion.div key={i} className="flex-1 rounded-t-lg"
                        style={{ background: i%3===0 ? GRAD.orange : i%3===1 ? GRAD.pink : GRAD.violet }}
                        initial={{ height: 0 }}
                        animate={heroInView ? { height: `${h}%` } : { height: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 + i * 0.05 }} />
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </section>

        {/* ══ STATS ════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(180deg,#fff,#fafafa,#fff)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {([
              { value: 500, suffix: '+',  label: 'CRM Portals Delivered', icon: Database,   gradient: GRAD.orange, delay: 0   },
              { value: 98,  suffix: '%',  label: 'Client Satisfaction',   icon: Star,       gradient: GRAD.pink,   delay: 0.1 },
              { value: 3,   suffix: 'x',  label: 'Average ROI Boost',     icon: TrendingUp, gradient: GRAD.violet, delay: 0.2 },
              { value: 24,  suffix: '/7', label: 'Support Coverage',      icon: Clock,      gradient: GRAD.cyan,   delay: 0.3 },
            ] as const).map((s, i) => <StatCard key={i} {...s} />)}
          </div>
        </section>

        {/* ══ TAB SHOWCASE ════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="What We Build" badgeIcon={<Rocket size={11} />}
            title="Everything Your Team" highlight="Needs to Win"
            sub="A complete suite of CRM capabilities, each engineered for the workflows your team actually uses every day."
          />
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist">
              {TABS.map((t, i) => (
                <motion.button key={t} role="tab" aria-selected={activeTab === i}
                  onClick={() => setActiveTab(i)}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="px-6 py-2.5 rounded-full font-bold text-sm font-clash transition-colors"
                  style={{
                    background: activeTab===i ? GRAD.primary : '#f1f5f9',
                    color:      activeTab===i ? '#fff'        : '#64748b',
                    boxShadow:  activeTab===i ? '0 8px 24px rgba(255,107,53,0.35)' : 'none',
                  }}>
                  {t}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeTab} role="tabpanel"
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.97 }}
                transition={{ duration: 0.32 }}
                className="rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8"
                style={{ background: 'linear-gradient(135deg,#fff7ed,#fdf2f8,#f5f3ff)', border: '1.5px solid #e2e8f0', boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
                <motion.div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0"
                  style={{ background: GRAD.primary, boxShadow: '0 16px 40px rgba(255,107,53,0.35)' }}
                  animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
                  {(() => { const Icon = tabContent[activeTab].icon; return <Icon size={36} color="#fff" aria-hidden />; })()}
                </motion.div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-black text-slate-900 mb-3 font-clash">{tabContent[activeTab].title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed font-syne">{tabContent[activeTab].desc}</p>
                  <Link href="/info/contacts">
                    <motion.span whileHover={{ x: 4 }}
                      className="mt-5 flex items-center gap-1.5 font-bold text-sm mx-auto sm:mx-0 font-clash cursor-pointer w-fit"
                      style={{ color: '#ff6b35' }}>
                      Learn More <ChevronRight size={16} aria-hidden />
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ══ FEATURES ════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#fafafa' }}>
          <SectionHeader
            badge="Core Features" badgeIcon={<Cpu size={11} />}
            title="Built for" highlight="Modern Teams"
            sub="Every feature is designed around real sales and support workflows — not bloated checkboxes nobody uses."
          />
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} index={i} />
            ))}
          </div>
        </section>

        {/* ══ HOW IT WORKS ════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Process" badgeIcon={<GitMerge size={11} />}
            title="From Discovery to" highlight="Launch in Weeks"
            sub="A streamlined 4-step process that gets your CRM live fast without ever sacrificing quality."
          />
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {([
              { icon: MessageSquare, step:'01', title:'Discovery Call',    desc:'We map your workflows, pain points, and goals.',      color:'#ff6b35' },
              { icon: Layers3,       step:'02', title:'Custom Design',     desc:'Wireframes and UI crafted around your brand.',         color:'#e91e8c' },
              { icon: FlaskConical,  step:'03', title:'Development',       desc:'Agile sprints with weekly demos and feedback loops.',  color:'#7c3aed' },
              { icon: Rocket,        step:'04', title:'Go Live + Support', desc:'Launch day support and ongoing maintenance included.', color:'#0ea5e9' },
            ] as const).map((s, i, arr) => (
              <ProcessStep key={s.step} icon={s.icon} step={s.step} title={s.title}
                desc={s.desc} color={s.color} delay={i * 0.1} last={i === arr.length - 1} />
            ))}
          </div>
        </section>

        {/* ══ CAPABILITIES ════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#fafafa' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <Pill className="mb-5"
                style={{ background: 'linear-gradient(135deg,#f5f3ff,#fce7f3)', color: '#6d28d9', border: '1.5px solid #e9d5ff' }}>
                <Sparkles size={11} /> Our Capabilities
              </Pill>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-5 leading-tight font-clash">
                Centralised Data,{' '}
                <GradientText gradient={GRAD.violet}>Automated Growth</GradientText>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8 font-syne">
                We build CRM systems that align perfectly with your business — ensuring seamless adoption and maximum ROI from day one.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
                {capabilities.map((item, i) => <CapItem key={item} item={item} index={i} />)}
              </ul>
              <div className="mt-8">
                <CtaButton href="/info/contacts" variant="primary">
                  Explore All Features <ArrowRight size={18} />
                </CtaButton>
              </div>
            </motion.div>

            {/* Right: perf card */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl opacity-15"
                style={{ background: GRAD.primary }} />
              <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl opacity-10"
                style={{ background: GRAD.violet }} />
              <div className="relative bg-white rounded-3xl p-8 border border-slate-100"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
                <div className="flex items-center gap-3 mb-7">
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: GRAD.primary, boxShadow: '0 8px 24px rgba(255,107,53,0.35)' }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                    <PieChart size={22} color="#fff" aria-hidden />
                  </motion.div>
                  <div>
                    <p className="font-black text-slate-900 font-clash">CRM Performance</p>
                    <p className="text-xs text-slate-400 font-syne">Real-time metrics</p>
                  </div>
                  <div className="ml-auto"><LiveDot /></div>
                </div>
                {progressBars.map(b => <ProgressBar key={b.label} {...b} />)}
                <motion.div
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.7 }}
                  className="mt-5 flex items-center gap-3 p-3.5 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg,#fff7ed,#fdf2f8)', border: '1px solid #fed7aa' }}>
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Bell size={16} style={{ color: '#ff6b35' }} aria-hidden />
                  </motion.div>
                  <p className="text-xs font-semibold text-slate-600 font-syne">
                    🎉 New deal closed — <strong>$12,400</strong> with Acme Corp
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Social Proof" badgeIcon={<HeartHandshake size={11} />}
            title="Trusted by" highlight="Growing Teams"
            sub="Real results from real companies who transformed their customer relationships with our solutions."
          />
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => <TestimonialCard key={t.name} t={t} i={i} />)}
          </div>
        </section>

        {/* ══ CTA BANNER ══════════════════════════════════════════════════ */}
        <section className="py-10 pb-24 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] p-10 sm:p-16 text-center"
            style={{ background: GRAD.full }}>

            {/* Dot mesh */}
            <div aria-hidden className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'radial-gradient(white 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
            <div aria-hidden className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
              style={{ background: 'white', filter: 'blur(60px)' }} />
            <div aria-hidden className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
              style={{ background: 'white', filter: 'blur(60px)' }} />

            <div className="relative">
              <motion.div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 bg-white/20 border border-white/30"
                animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                <Building2 size={36} color="#fff" aria-hidden />
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex justify-center mb-6">
                <Pill className="bg-white/20 text-white border border-white/30">
                  <Zap size={11} /> Limited Spots Available This Month
                </Pill>
              </motion.div>

              <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 leading-tight font-clash">
                Ready to Transform Your<br />Customer Relationships?
              </h2>
              <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-syne">
                Join 500+ businesses already using our CRM portals to close more deals, retain more customers, and grow faster.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <CtaButton href="/info/contacts" variant="white">
                  Request a Quote <ArrowRight size={18} />
                </CtaButton>
                <CtaButton href="/info/contacts" variant="outline">
                  <Phone size={16} /> Schedule a Demo
                </CtaButton>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/20">
                {([
                  { icon: Database,  title: 'Centralised Data',   desc: 'One source of truth for every team' },
                  { icon: Zap,       title: 'Process Automation', desc: 'Save 10+ hours per rep weekly' },
                  { icon: BarChart3, title: 'Real-Time Insights', desc: 'Decisions backed by live analytics' },
                ] as const).map(({ icon: BIcon, title, desc }, i) => (
                  <motion.div key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="text-center">
                    <motion.div
                      className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3 border border-white/20"
                      whileHover={{ scale: 1.12, background: 'rgba(255,255,255,0.3)' }}>
                      <BIcon size={22} color="#fff" aria-hidden />
                    </motion.div>
                    <p className="font-black text-white text-sm mb-1 font-clash">{title}</p>
                    <p className="text-white/70 text-xs font-syne">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}