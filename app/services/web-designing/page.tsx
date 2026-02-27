'use client';

import {
  useRef, useState, useEffect, type CSSProperties, type ReactNode,
} from 'react';
import Link from 'next/link';
import {
  motion, useInView, AnimatePresence,
  useMotionValue, useSpring, useTransform,
  type Variants,
} from 'framer-motion';
import {
  Palette, Wand2, Layers, MousePointerClick, Zap, Figma,
  ArrowRight, Sparkles, Eye, PenTool, Smartphone,
  LayoutDashboard, Star, MonitorSmartphone,
  Image, Play, Rocket, Paintbrush, Globe,
  HeartHandshake, TrendingUp, Brush, Type,
  Shapes, Aperture, SwatchBook, SquarePen,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   TOKENS
───────────────────────────────────────────────────────────── */
const C = {
  coral:    '#FF4D4D',
  lemon:    '#FFE03A',
  lime:     '#3DFF8F',
  sky:      '#3DCCFF',
  violet:   '#BF3DFF',
  pink:     '#FF3DB8',
  dark:     '#0A0A0F',
  darkCard: '#12121A',
  cream:    '#FFFCF5',
  offwhite: '#F7F4EE',
} as const;

const PALETTE = [C.coral, C.lemon, C.lime, C.sky, C.violet, C.pink] as const;

/* ─────────────────────────────────────────────────────────────
   MOTION
───────────────────────────────────────────────────────────── */
const ease   = [0.22, 1, 0.36, 1] as const;
const easeIn = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};
const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.68, rotate: -8 },
  show:   { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease } },
};

/* ─────────────────────────────────────────────────────────────
   GRADIENT TEXT
───────────────────────────────────────────────────────────── */
function GText({ children, from, to, className = '' }: {
  children: ReactNode; from: string; to: string; className?: string;
}) {
  return (
    <span className={className} style={{
      background: `linear-gradient(135deg,${from},${to})`,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    }}>{children}</span>
  );
}

/* ─────────────────────────────────────────────────────────────
   CHIP
───────────────────────────────────────────────────────────── */
function Chip({ children, color, style }: { children: ReactNode; color: string; style?: CSSProperties }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.16em] uppercase"
      style={{ background: `${color}15`, color, border: `1.5px solid ${color}35`, ...style }}>
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────────────────────────── */
function MagneticWrap({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref  = useRef<HTMLDivElement>(null);
  const mx   = useMotionValue(0);
  const my   = useMotionValue(0);
  const sx   = useSpring(mx, { stiffness: 260, damping: 18 });
  const sy   = useSpring(my, { stiffness: 260, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width  / 2) * strength);
    my.set((e.clientY - r.top  - r.height / 2) * strength);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCRAMBLE TEXT HOOK
───────────────────────────────────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
function useScramble(text: string, trigger: boolean, speed = 28) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const total = text.length * 2;
    const id = setInterval(() => {
      setDisplay(
        text.split('').map((ch, i) =>
          i < Math.floor(frame / 2) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
      );
      frame++;
      if (frame >= total) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [trigger]);
  return display;
}

/* ─────────────────────────────────────────────────────────────
   SCROLL PROGRESS GRADIENT BAR
───────────────────────────────────────────────────────────── */
function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const s = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (s / h) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px]" style={{ background: 'rgba(0,0,0,0.08)' }}>
      <motion.div className="h-full origin-left"
        style={{
          width: `${pct}%`,
          background: `linear-gradient(90deg,${C.coral},${C.lemon},${C.lime},${C.sky},${C.violet},${C.pink})`,
        }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CURSOR GLOW  (desktop only)
───────────────────────────────────────────────────────────── */
function CursorGlow() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });

  useEffect(() => {
    const fn = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  return (
    <motion.div aria-hidden className="pointer-events-none fixed z-0 hidden lg:block"
      style={{
        width: 440, height: 440, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.coral}0d 0%, transparent 70%)`,
        x: useTransform(sx, v => v - 220),
        y: useTransform(sy, v => v - 220),
      }} />
  );
}

/* ─────────────────────────────────────────────────────────────
   FLOATING DOT
───────────────────────────────────────────────────────────── */
interface DotProps { c: string; size: number; x: string; y: string; delay?: number; rotate?: number }
function Dot({ c, size, x, y, delay = 0, rotate = 0 }: DotProps) {
  return (
    <motion.div aria-hidden className="absolute rounded-full pointer-events-none select-none"
      style={{ width: size, height: size, left: x, top: y, background: c,
        boxShadow: `0 8px 36px ${c}80`, rotate }}
      animate={{ y: [0, -16, 0], scale: [1, 1.12, 1], rotate: [rotate, rotate + 18, rotate] }}
      transition={{ duration: 4.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   TICKER
───────────────────────────────────────────────────────────── */
const WORDS = [
  'UI Design','✦','Brand Identity','✦','Motion Design','✦',
  'Design Systems','✦','Responsive','✦','Typography','✦',
  'Prototyping','✦','Visual Hierarchy','✦',
];
function Ticker() {
  const doubled = [...WORDS, ...WORDS];
  return (
    <div className="overflow-hidden py-5 border-y-2 relative" style={{ borderColor: `${C.coral}22` }}>
      <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
        style={{ background: `linear-gradient(90deg,${C.cream},transparent)` }} />
      <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
        style={{ background: `linear-gradient(-90deg,${C.cream},transparent)` }} />
      <motion.ul className="flex gap-8 w-max list-none m-0 p-0"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>
        {doubled.map((w, i) => (
          <li key={i} className="whitespace-nowrap text-[11px] font-black tracking-[0.2em] uppercase select-none"
            style={{ color: w === '✦' ? C.coral : C.dark, fontFamily: "'Clash Display',sans-serif" }}>
            {w}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ORBIT RING
───────────────────────────────────────────────────────────── */
const ORBIT_TOOLS = [
  { Icon: Palette,           color: C.coral  },
  { Icon: PenTool,           color: C.lemon  },
  { Icon: Wand2,             color: C.lime   },
  { Icon: Layers,            color: C.sky    },
  { Icon: Figma,             color: C.violet },
  { Icon: MousePointerClick, color: C.pink   },
];

function OrbitRing() {
  const R = 110;
  return (
    <div className="relative w-64 h-64 mx-auto flex-shrink-0">
      {/* Outer dashed ring */}
      <motion.div aria-hidden className="absolute inset-0 rounded-full"
        style={{ border: `2px dashed ${C.coral}30` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
      {/* Centre */}
      <motion.div
        className="absolute inset-0 m-auto w-28 h-28 rounded-full flex items-center justify-center"
        style={{ background: C.dark, boxShadow: `0 0 0 8px ${C.coral}15, 0 0 60px ${C.coral}60` }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.8, repeat: Infinity }}>
        <Paintbrush size={34} color={C.lemon} aria-hidden />
        {/* Ping */}
        <motion.div aria-hidden className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${C.coral}` }}
          animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>

      {/* Orbiting icons */}
      <motion.div className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
        {ORBIT_TOOLS.map(({ Icon, color }, i) => {
          const angle = (i / ORBIT_TOOLS.length) * 2 * Math.PI - Math.PI / 2;
          const cx = 128 + R * Math.cos(angle) - 20;
          const cy = 128 + R * Math.sin(angle) - 20;
          return (
            <motion.div key={i}
              className="absolute w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ left: cx, top: cy, background: color, boxShadow: `0 4px 20px ${color}90` }}
              animate={{ rotate: -360, scale: [1, 1.12, 1] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 } }}>
              <Icon size={16} color="#fff" aria-hidden />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────────────────────────── */
interface SvcCardProps { Icon: React.ElementType; title: string; desc: string; color: string; index: number }
function SvcCard({ Icon, title, desc, color, index }: SvcCardProps) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hot, setHot] = useState(false);

  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 48, rotate: index % 2 === 0 ? -2 : 2 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      whileHover={{ y: -12, rotate: index % 2 === 0 ? -1 : 1 }}
      onHoverStart={() => setHot(true)}
      onHoverEnd={()  => setHot(false)}
      className="relative rounded-3xl p-6 overflow-hidden border cursor-default"
      style={{
        background: hot ? `${color}0a` : C.cream,
        borderColor: hot ? `${color}60` : 'rgba(13,13,13,0.1)',
        boxShadow: hot
          ? `0 24px 64px ${color}28, 0 0 0 1px ${color}20`
          : '0 4px 22px rgba(0,0,0,0.06)',
        transition: 'background .3s,border-color .3s,box-shadow .35s',
      }}>

      {/* Noise grain overlay */}
      <div aria-hidden className="absolute inset-0 opacity-[0.025] pointer-events-none rounded-3xl"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")` }} />

      {/* Top gradient streak */}
      <AnimatePresence>
        {hot && (
          <motion.div aria-hidden initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }} style={{ background: color }}
            className="absolute top-0 left-6 right-6 h-[2px] origin-left rounded-full" />
        )}
      </AnimatePresence>

      <motion.div className="w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: hot ? color : `${color}18`, boxShadow: hot ? `0 10px 28px ${color}55` : 'none',
          transition: 'background .3s, box-shadow .3s' }}
        animate={hot ? { rotate: [0, -14, 14, -7, 0], scale: 1.18 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.55 }}>
        <Icon size={22} color={hot ? '#fff' : color} aria-hidden />
      </motion.div>

      <h3 className="font-black text-[15px] mb-2 text-slate-900 leading-tight"
        style={{ fontFamily: "'Clash Display',sans-serif" }}>{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif" }}>{desc}</p>

      <motion.div className="mt-5 flex items-center gap-1.5 text-[12px] font-black"
        animate={{ opacity: hot ? 1 : 0, x: hot ? 0 : -10 }}
        style={{ color, fontFamily: "'Clash Display',sans-serif" }}>
        Explore <ArrowRight size={11} aria-hidden />
      </motion.div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROCESS STEP
───────────────────────────────────────────────────────────── */
interface StepProps { n: string; Icon: React.ElementType; title: string; desc: string; color: string; delay: number }
function Step({ n, Icon, title, desc, color, delay }: StepProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [hot, setHot] = useState(false);
  const t = useScramble(title, hot);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay }} whileHover={{ x: 6 }}
      onHoverStart={() => setHot(true)} onHoverEnd={() => setHot(false)}
      className="flex items-start gap-5 cursor-default">
      <div className="relative flex-shrink-0">
        <motion.div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-[14px] text-white"
          style={{ background: `linear-gradient(135deg,${color},${color}cc)`,
            boxShadow: `0 10px 28px ${color}55`, fontFamily: "'Clash Display',sans-serif" }}
          animate={hot ? { scale: 1.1, rotate: -4 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.25 }}>
          {n}
        </motion.div>
        <motion.div aria-hidden
          className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: C.darkCard, border: `1.5px solid ${color}40` }}
          animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
          <Icon size={10} style={{ color }} />
        </motion.div>
      </div>
      <div>
        <h4 className="font-black text-white text-sm mb-1.5 transition-all"
          style={{ fontFamily: "'Clash Display',sans-serif", color: hot ? color : '#fff' }}>
          {hot ? t : title}
        </h4>
        <p className="text-white/45 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif" }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TOOL BADGE
───────────────────────────────────────────────────────────── */
interface BadgeProps { name: string; color: string; Icon: React.ElementType; index: number }
function Badge({ name, color, Icon, index }: BadgeProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [hot, setHot] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.75, y: 16 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.45, ease }}
      whileHover={{ scale: 1.1, y: -4 }}
      onHoverStart={() => setHot(true)} onHoverEnd={() => setHot(false)}
      className="flex items-center gap-2.5 px-4 py-3 rounded-2xl cursor-default transition-all duration-300"
      style={{ background: hot ? `${color}20` : `${color}0d`, border: `1.5px solid ${color}${hot ? '50' : '22'}`,
        boxShadow: hot ? `0 8px 24px ${color}22` : 'none' }}>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{ background: hot ? color : `${color}25`, boxShadow: hot ? `0 4px 12px ${color}60` : 'none' }}>
        <Icon size={15} color={hot ? '#fff' : color} aria-hidden />
      </div>
      <span className="font-black text-sm text-slate-800" style={{ fontFamily: "'Clash Display',sans-serif" }}>{name}</span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STAT BUBBLE
───────────────────────────────────────────────────────────── */
interface BubbleProps { value: string; label: string; color: string; delay: number }
function Bubble({ value, label, color, delay }: BubbleProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [hov, setHov] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.7, y: 24 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease }}
      whileHover={{ scale: 1.06, y: -6 }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      className="flex flex-col items-center justify-center rounded-3xl p-7 text-center relative overflow-hidden"
      style={{ background: `${color}10`, border: `2px solid ${color}${hov ? '50' : '22'}`,
        boxShadow: hov ? `0 16px 40px ${color}25` : `0 6px 22px ${color}12`,
        transition: 'border-color .3s,box-shadow .3s' }}>
      {/* Subtle background number */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ fontSize: 90, fontWeight: 900, color: `${color}08`, fontFamily: "'Clash Display',sans-serif",
          lineHeight: 1, userSelect: 'none' }}>
        {value.replace(/[^0-9+%★h]/g, '')}
      </div>
      <motion.span className="text-4xl font-black leading-none mb-2 relative z-10"
        animate={hov ? { scale: 1.12 } : { scale: 1 }}
        style={{
          fontFamily: "'Clash Display',sans-serif",
          background: `linear-gradient(135deg,${color},${color}aa)`,
          backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
        {value}
      </motion.span>
      <span className="text-[10px] font-bold text-slate-500 tracking-[0.15em] uppercase relative z-10"
        style={{ fontFamily: "'DM Sans',sans-serif" }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────────────────────── */
interface SHeadProps {
  chipText: string; chipColor: string; chipIcon: ReactNode;
  title: ReactNode; sub: string; dark?: boolean;
}
function SHead({ chipText, chipColor, chipIcon, title, sub, dark = false }: SHeadProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
      className="text-center mb-14 px-4">
      <motion.div variants={pop} className="flex justify-center mb-5">
        <Chip color={chipColor}>{chipIcon}&nbsp;{chipText}</Chip>
      </motion.div>
      <motion.h2 variants={fadeUp}
        className="text-4xl sm:text-5xl font-black mb-5 leading-tight"
        style={{ fontFamily: "'Clash Display',sans-serif", color: dark ? '#fff' : C.dark }}>
        {title}
      </motion.h2>
      <motion.p variants={fadeUp}
        className="text-base max-w-lg mx-auto leading-relaxed"
        style={{ fontFamily: "'DM Sans',sans-serif", color: dark ? 'rgba(255,255,255,0.45)' : '#64748b' }}>
        {sub}
      </motion.p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COLOUR BLOB (decorative BG)
───────────────────────────────────────────────────────────── */
function Blob({ color, size, x, y, blur = 100, opacity = 0.12 }: {
  color: string; size: number; x: string; y: string; blur?: number; opacity?: number;
}) {
  return (
    <motion.div aria-hidden className="absolute pointer-events-none rounded-full"
      style={{ width: size, height: size, left: x, top: y,
        background: color, filter: `blur(${blur}px)`, opacity }}
      animate={{ x: [0, 20, 0], y: [0, -14, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function WebDesignPage() {
  const heroRef    = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  /* ── data ── */
  const services = [
    { Icon: LayoutDashboard, title: 'UI / UX Design',    desc: 'Pixel-perfect interfaces grounded in user empathy and conversion science.',     color: C.coral  },
    { Icon: Eye,             title: 'Brand Identity',     desc: 'Logos, palettes, and visual systems that make your brand impossible to forget.', color: C.lemon  },
    { Icon: Smartphone,      title: 'Responsive Design',  desc: 'Layouts that feel native and beautiful across every device and screen.',         color: C.lime   },
    { Icon: Wand2,           title: 'Motion & Animation', desc: 'Micro-interactions that breathe life into every click and scroll.',              color: C.sky    },
    { Icon: Shapes,          title: 'Design Systems',     desc: 'Scalable component libraries that keep your product consistent as it grows.',    color: C.violet },
    { Icon: Globe,           title: 'Web Experiences',    desc: 'Immersive, scroll-driven storytelling that turns visitors into believers.',       color: C.pink   },
  ] as const;

  const steps = [
    { n:'01', Icon: Sparkles,   title: 'Discovery & Mood', desc: 'Deep dive into your brand, audience, and vision to set a creative north star.', color: C.coral,  delay: 0   },
    { n:'02', Icon: SquarePen,  title: 'Wireframe & Flow', desc: 'Structural blueprints that map every user journey before a pixel is placed.',    color: C.lemon,  delay: 0.1 },
    { n:'03', Icon: SwatchBook, title: 'Visual Design',    desc: 'High-fidelity mockups bursting with colour, type, and vibrant personality.',     color: C.lime,   delay: 0.2 },
    { n:'04', Icon: Rocket,     title: 'Deliver & Launch', desc: 'Handoff-ready files or fully coded output, with ongoing creative support.',      color: C.sky,    delay: 0.3 },
  ] as const;

  const tools = [
    { name: 'Figma',       color: C.coral,  Icon: Figma              },
    { name: 'Illustrator', color: C.lemon,  Icon: Brush              },
    { name: 'Prototyping', color: C.lime,   Icon: MousePointerClick  },
    { name: 'Webflow',     color: C.sky,    Icon: Globe              },
    { name: 'Framer',      color: C.violet, Icon: Layers             },
    { name: 'Typography',  color: C.pink,   Icon: Type               },
  ] as const;

  const stats = [
    { value: '200+', label: 'Brands Designed', color: C.coral,  delay: 0   },
    { value: '98%',  label: 'Happy Clients',    color: C.lemon,  delay: 0.1 },
    { value: '5★',   label: 'Avg Rating',       color: C.lime,   delay: 0.2 },
    { value: '48h',  label: 'First Draft',      color: C.sky,    delay: 0.3 },
  ] as const;

  const pillars = [
    { Icon: Star,           title: 'Award-Level Quality', desc: 'Every pixel justified, every choice intentional.',  color: C.lemon },
    { Icon: Zap,            title: 'Rapid Turnaround',    desc: 'First drafts in 48 hours, always on time.',         color: C.lime  },
    { Icon: HeartHandshake, title: 'Design Partnership',  desc: 'Collaborative, transparent, and yours to keep.',    color: C.sky   },
  ] as const;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700,800,900&display=swap');

        * { box-sizing: border-box; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(${C.coral},${C.violet});
          border-radius: 2px;
        }

        /* Ensure no overflow on mobile */
        .page-root { overflow-x: hidden; }

        /* Animate gradient text on hover */
        @keyframes gradShift {
          0%   { background-position: 0% 50%   }
          50%  { background-position: 100% 50% }
          100% { background-position: 0% 50%   }
        }
        .animated-grad {
          background-size: 200% 200%;
          animation: gradShift 3s ease infinite;
        }
      `}</style>

      <ProgressBar />
      <CursorGlow />

      <main className="page-root min-h-screen" style={{ background: C.cream, fontFamily: "'DM Sans',sans-serif" }}>

        {/* ══ HERO ════════════════════════════════════════════════════ */}
        <section ref={heroRef}
          className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden">

          {/* BG blobs */}
          <Blob color={C.coral}  size={400} x="-10%" y="0%"   opacity={0.09} blur={110} />
          <Blob color={C.violet} size={350} x="70%"  y="-5%"  opacity={0.08} blur={110} />
          <Blob color={C.lime}   size={280} x="5%"   y="65%"  opacity={0.07} blur={90}  />
          <Blob color={C.sky}    size={320} x="80%"  y="60%"  opacity={0.08} blur={100} />

          {/* Paint dots */}
          <Dot c={C.coral}  size={70}  x="-2%"  y="12%"  delay={0}   rotate={15}  />
          <Dot c={C.lemon}  size={50}  x="88%"  y="7%"   delay={1.5} rotate={-18} />
          <Dot c={C.lime}   size={38}  x="4%"   y="75%"  delay={0.8} rotate={30}  />
          <Dot c={C.sky}    size={58}  x="92%"  y="64%"  delay={2}   rotate={-10} />
          <Dot c={C.violet} size={32}  x="51%"  y="3%"   delay={1.2} rotate={45}  />

          {/* Grid pattern */}
          <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{ backgroundImage: `linear-gradient(${C.dark} 1px,transparent 1px),linear-gradient(90deg,${C.dark} 1px,transparent 1px)`,
              backgroundSize: '48px 48px' }} />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center min-h-[72vh]">

              {/* ── Left copy ── */}
              <motion.div className="flex flex-col items-center text-center lg:items-start lg:text-left w-full"
                variants={stagger} initial="hidden" animate={heroInView ? 'show' : 'hidden'}>

                {/* Chip */}
                <motion.div variants={fadeUp} className="mb-6">
                  <MagneticWrap>
                    <Chip color={C.coral}>
                      <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Palette size={11} aria-hidden />
                      </motion.span>
                      &nbsp;Web Design Studio
                    </Chip>
                  </MagneticWrap>
                </motion.div>

                {/* Headline */}
                <motion.h1 variants={fadeUp}
                  className="text-[clamp(2.8rem,9vw,5.5rem)] font-black leading-[0.88] tracking-tight mb-7 w-full"
                  style={{ color: C.dark, fontFamily: "'Clash Display',sans-serif" }}>
                  Design that{' '}
                  <span className="relative inline-block">
                    <GText from={C.coral} to={C.pink}>Speaks</GText>
                    {/* Wiggly underline */}
                    <motion.svg viewBox="0 0 180 14" aria-hidden
                      className="absolute -bottom-1 left-0 w-full overflow-visible"
                      initial={{ opacity: 0 }}
                      animate={heroInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.8 }}>
                      <motion.path
                        d="M2 7 Q22 3 45 7 Q68 11 90 7 Q112 3 135 7 Q158 11 178 7"
                        stroke={C.coral} strokeWidth="3.5" strokeLinecap="round" fill="none"
                        initial={{ pathLength: 0 }}
                        animate={heroInView ? { pathLength: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.8 }}
                      />
                    </motion.svg>
                  </span>
                  <br />
                  <GText from={C.lemon} to={C.lime}>Volumes</GText>
                </motion.h1>

                <motion.p variants={fadeUp}
                  className="text-slate-500 text-lg leading-relaxed mb-9 max-w-md w-full">
                  We craft vibrant digital experiences where colour, type, and motion fuse into something your users will{' '}
                  <em className="not-italic font-bold" style={{ color: C.coral }}>feel</em> — not just see.
                </motion.p>

                {/* CTAs */}
                <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start w-full">
                  <MagneticWrap strength={0.25}>
                    <Link href="/info/contact">
                      <motion.span
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-sm cursor-pointer"
                        style={{ background: C.dark, color: C.lemon, fontFamily: "'Clash Display',sans-serif",
                          boxShadow: `0 10px 30px rgba(13,13,13,0.24)` }}
                        whileHover={{ scale: 1.06, boxShadow: `0 20px 48px rgba(13,13,13,0.35)` }}
                        whileTap={{ scale: 0.96 }}>
                        Start Your Project <ArrowRight size={16} aria-hidden />
                      </motion.span>
                    </Link>
                  </MagneticWrap>
                  <MagneticWrap strength={0.25}>
                    <Link href="/info/contact">
                      <motion.span
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-sm cursor-pointer border-2"
                        style={{ borderColor: C.dark, color: C.dark, background: 'transparent',
                          fontFamily: "'Clash Display',sans-serif" }}
                        whileHover={{ background: C.dark, color: C.lemon, scale: 1.04,
                          borderColor: C.dark }}
                        whileTap={{ scale: 0.96 }}>
                        <Play size={14} aria-hidden /> See Our Work
                      </motion.span>
                    </Link>
                  </MagneticWrap>
                </motion.div>

                {/* Colour swatches */}
                <motion.div variants={stagger}
                  className="flex gap-2.5 flex-wrap justify-center lg:justify-start">
                  {PALETTE.map((c, i) => (
                    <motion.div key={c} variants={pop}
                      whileHover={{ scale: 1.35, y: -6, boxShadow: `0 14px 32px ${c}90` }}
                      className="w-7 h-7 rounded-full cursor-pointer"
                      style={{ background: c, boxShadow: `0 4px 14px ${c}60` }} />
                  ))}
                </motion.div>
              </motion.div>

              {/* ── Right visual ── */}
              <motion.div className="flex flex-col items-center gap-8 w-full"
                initial={{ opacity: 0, scale: 0.72, rotate: -20 }}
                animate={heroInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease }}>
                <OrbitRing />

                {/* Mini stat trio */}
                <motion.div className="flex gap-3 flex-wrap justify-center"
                  initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}>
                  {([
                    { n:'200+', l:'Projects',   c: C.coral },
                    { n:'98%',  l:'Satisfied',  c: C.lime  },
                    { n:'48h',  l:'Draft Speed',c: C.sky   },
                  ] as const).map(({ n, l, c }) => (
                    <motion.div key={l}
                      className="flex flex-col items-center px-5 py-3.5 rounded-2xl"
                      style={{ background: `${c}12`, border: `1.5px solid ${c}28` }}
                      whileHover={{ scale: 1.08, boxShadow: `0 8px 24px ${c}22` }}>
                      <span className="font-black text-xl leading-none"
                        style={{ color: c, fontFamily: "'Clash Display',sans-serif" }}>{n}</span>
                      <span className="text-[10px] font-bold text-slate-500 mt-0.5 uppercase tracking-wider"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}>{l}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ TICKER ══════════════════════════════════════════════════ */}
        <Ticker />

        {/* ══ SERVICES ════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <SHead
              chipText="What We Create" chipColor={C.violet} chipIcon={<Sparkles size={11} />}
              title={<>Design Services{' '}<GText from={C.violet} to={C.pink}>Built to Impress</GText></>}
              sub="Every discipline woven with craft, colour theory, and a relentless eye for the extraordinary."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s, i) => (
                <SvcCard key={s.title} Icon={s.Icon} title={s.title} desc={s.desc} color={s.color} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ DARK: PROCESS + TOOLS ═══════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
          style={{ background: C.dark }}>
          <Blob color={C.coral}  size={400} x="60%"  y="-10%" opacity={0.07} blur={130} />
          <Blob color={C.violet} size={350} x="-10%" y="60%"  opacity={0.07} blur={120} />

          {/* Dot mesh */}
          <div aria-hidden className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(white 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

          <div className="max-w-6xl mx-auto relative z-10">
            <SHead dark
              chipText="Our Approach" chipColor={C.lemon} chipIcon={<Zap size={11} />}
              title={<>Blank canvas to{' '}<GText from={C.coral} to={C.lemon}>wow-worthy</GText></>}
              sub="A four-act creative process designed to keep you in the loop while results stay extraordinary."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Process */}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="flex flex-col gap-9">
                {steps.map(s => (
                  <Step key={s.n} {...s} />
                ))}
              </motion.div>

              {/* Toolkit + card */}
              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="flex flex-col gap-10">

                {/* Tools */}
                <div>
                  <div className="mb-5"><Chip color={C.sky}><PenTool size={11} />&nbsp;Our Toolkit</Chip></div>
                  <h3 className="text-2xl font-black text-white mb-6"
                    style={{ fontFamily: "'Clash Display',sans-serif" }}>
                    Industry-standard,{' '}<GText from={C.sky} to={C.lime}>pixel-perfect</GText>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {tools.map((t, i) => (
                      <Badge key={t.name} name={t.name} color={t.color} Icon={t.Icon} index={i} />
                    ))}
                  </div>
                </div>

                {/* Portfolio teaser */}
                <motion.div
                  className="rounded-3xl p-7 relative overflow-hidden border-2"
                  style={{ background: 'rgba(255,255,255,0.035)', borderColor: `${C.coral}25` }}
                  whileHover={{ borderColor: `${C.coral}70`, boxShadow: `0 24px 56px ${C.coral}22` }}>

                  <div className="flex gap-2 mb-6">
                    {PALETTE.map((c, i) => (
                      <motion.div key={c} className="rounded-full"
                        style={{ width: 22, height: 22, background: c, boxShadow: `0 4px 14px ${c}70`,
                          flexShrink: 0 }}
                        animate={{ y: [0, -7, 0] }}
                        transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }} />
                    ))}
                  </div>

                  <h4 className="text-white font-black text-lg mb-2"
                    style={{ fontFamily: "'Clash Display',sans-serif" }}>
                    Ready to see the magic?
                  </h4>
                  <p className="text-white/40 text-sm mb-6 leading-relaxed">
                    Browse our portfolio of vibrant, award-worthy design work and see what's possible.
                  </p>

                  <MagneticWrap strength={0.2}>
                    <Link href="/info/contact">
                      <motion.span
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black cursor-pointer"
                        style={{ background: C.coral, color: '#fff', boxShadow: `0 8px 28px ${C.coral}55`,
                          fontFamily: "'Clash Display',sans-serif" }}
                        whileHover={{ scale: 1.06, boxShadow: `0 18px 44px ${C.coral}65` }}
                        whileTap={{ scale: 0.97 }}>
                        View Portfolio <ArrowRight size={14} aria-hidden />
                      </motion.span>
                    </Link>
                  </MagneticWrap>

                  <div aria-hidden className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full pointer-events-none"
                    style={{ background: C.coral, filter: 'blur(30px)', opacity: 0.18 }} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ STATS ═══════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <SHead
              chipText="Impact by Numbers" chipColor={C.lime} chipIcon={<TrendingUp size={11} />}
              title={<>Design that{' '}<GText from={C.lime} to={C.sky}>delivers results</GText></>}
              sub="Numbers that reflect real clients, real projects, and real delight — not marketing fluff."
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(s => (
                <Bubble key={s.label} value={s.value} label={s.label} color={s.color} delay={s.delay} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA BANNER ══════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 48, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden p-10 sm:p-16 text-center"
              style={{ background: C.dark }}>

              {/* Colour orbs */}
              {PALETTE.map((c, i) => (
                <motion.div key={c} aria-hidden
                  className="absolute rounded-full pointer-events-none"
                  style={{ width: 220, height: 220, background: c, filter: 'blur(70px)', opacity: 0.14,
                    left: `${(i * 18) % 82}%`, top: i % 2 === 0 ? '10%' : '55%' }}
                  animate={{ scale: [1, 1.35, 1], x: [0, 22, 0], y: [0, -16, 0] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }} />
              ))}

              {/* Dot mesh */}
              <div aria-hidden className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: 'radial-gradient(white 1px,transparent 1px)', backgroundSize: '26px 26px' }} />

              <div className="relative z-10">
                {/* Icon row */}
                <motion.div className="flex justify-center gap-3 mb-9 flex-wrap"
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}>
                  {([
                    { Icon: Palette, color: C.coral }, { Icon: Wand2, color: C.lemon },
                    { Icon: Sparkles, color: C.lime }, { Icon: Eye, color: C.sky },
                  ] as const).map(({ Icon, color }, i) => (
                    <motion.div key={i}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${color}18`, border: `1.5px solid ${color}35` }}
                      animate={{ y: [0, -10, 0], rotate: [0, i % 2 === 0 ? 6 : -6, 0] }}
                      transition={{ duration: 2.6 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}>
                      <Icon size={20} style={{ color }} aria-hidden />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.15 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
                  style={{ fontFamily: "'Clash Display',sans-serif" }}>
                  Let's Build Something{' '}
                  <GText from={C.coral} to={C.lemon}>Unforgettable</GText>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.2 }}
                  className="text-white/50 text-lg max-w-xl mx-auto mb-11 leading-relaxed">
                  Your vision deserves more than a template. Let our design team turn it into a scroll-stopping,
                  award-worthy reality.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.25 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                  <MagneticWrap>
                    <Link href="/info/contact">
                      <motion.span
                        className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-black text-base cursor-pointer"
                        style={{ background: `linear-gradient(135deg,${C.coral},${C.pink})`, color: '#fff',
                          boxShadow: `0 10px 36px ${C.coral}55`, fontFamily: "'Clash Display',sans-serif" }}
                        whileHover={{ scale: 1.07, boxShadow: `0 22px 56px ${C.coral}65` }}
                        whileTap={{ scale: 0.97 }}>
                        Start Designing <ArrowRight size={18} aria-hidden />
                      </motion.span>
                    </Link>
                  </MagneticWrap>
                  <MagneticWrap>
                    <Link href="/info/contact">
                      <motion.span
                        className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-black text-base cursor-pointer border-2"
                        style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)',
                          background: 'transparent', fontFamily: "'Clash Display',sans-serif" }}
                        whileHover={{ borderColor: 'rgba(255,255,255,0.55)', color: '#fff', scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}>
                        <HeartHandshake size={16} aria-hidden /> Book a Consult
                      </motion.span>
                    </Link>
                  </MagneticWrap>
                </motion.div>

                {/* Three pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-10 border-t border-white/[0.08]">
                  {pillars.map(({ Icon, title, desc, color }, i) => (
                    <motion.div key={title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="text-center rounded-2xl p-5"
                      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <motion.div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-3"
                        style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}
                        animate={{ rotate: [0, 7, -7, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}>
                        <Icon size={20} style={{ color }} aria-hidden />
                      </motion.div>
                      <p className="font-black text-white text-sm mb-1.5"
                        style={{ fontFamily: "'Clash Display',sans-serif" }}>{title}</p>
                      <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}