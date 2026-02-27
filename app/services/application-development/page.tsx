'use client';

import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import {
  Code2, Terminal, GitBranch, Layers, Cpu, Zap, Globe, Lock,
  Database, Server, Smartphone, Monitor, Tablet, ArrowRight,
  ChevronRight, Play, Package, RefreshCw, Shield, Star,
  Braces, Binary, Hash, Bug, TestTube2, Rocket, Cloud,
  GitCommit, GitMerge, CheckCircle2, Circle, Dot
} from 'lucide-react';
import { useRef, useEffect, useState, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface TypewriterProps {
  lines: string[];
  speed?: number;
}

interface MetricCardProps {
  number: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
}

interface PlatformCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  tag: string;
  index: number;
}

interface ProcessStepProps {
  step: string;
  num: number;
  title: string;
  desc: string;
  color: string;
  delay: number;
}

interface TechBadgeProps {
  tech: string;
  index: number;
}

// ─── Terminal Typewriter ───────────────────────────────────────────────────────
function TerminalTypewriter({ lines, speed = 45 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLine >= lines.length) return;
    if (currentChar < lines[currentLine].length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] || '') + lines[currentLine][currentChar];
          return next;
        });
        setCurrentChar(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, lines, speed]);

  useEffect(() => {
    const t = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="font-mono text-sm leading-relaxed">
      {lines.map((_, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-[#4ade80] select-none shrink-0">{'>'}</span>
          <span>
            <span className={getLineColor(lines[i])}>{displayed[i] || ''}</span>
            {i === currentLine && showCursor && (
              <span className="inline-block w-[2px] h-4 bg-[#4ade80] align-middle ml-[1px] animate-pulse" />
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

function getLineColor(line: string): string {
  if (line.startsWith('//')) return 'text-[#6a9955]';
  if (line.includes('import') || line.includes('export')) return 'text-[#c586c0]';
  if (line.includes('const') || line.includes('async') || line.includes('function')) return 'text-[#569cd6]';
  if (line.includes('"') || line.includes("'")) return 'text-[#ce9178]';
  if (line.includes('=>')) return 'text-[#dcdcaa]';
  return 'text-[#d4d4d4]';
}

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 15 });
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, motionVal, target]);

  useEffect(() => {
    return springVal.on('change', v => {
      if (ref.current) ref.current.textContent = Math.round(v).toString() + suffix;
    });
  }, [springVal, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// ─── Metric Card ───────────────────────────────────────────────────────────────
function MetricCard({ number, label, icon, delay }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/10 to-[#8b5cf6]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="relative border border-[#1e2d3d] hover:border-[#00d9ff]/40 bg-[#0d1117] rounded-2xl p-6 text-center transition-all duration-300 h-full">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d9ff]/20 to-[#8b5cf6]/20 border border-[#00d9ff]/30 mb-4 text-[#00d9ff]">
          {icon}
        </div>
        <div className="text-3xl font-mono font-bold text-white mb-1">{number}</div>
        <div className="text-[#8b949e] text-sm font-medium tracking-wide uppercase">{label}</div>
      </div>
    </motion.div>
  );
}

// ─── Platform Card ─────────────────────────────────────────────────────────────
function PlatformCard({ title, desc, icon, tag, index }: PlatformCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="relative group cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-400 blur-sm" />
      <div className="relative border border-[#1e2d3d] hover:border-[#00d9ff]/30 bg-gradient-to-br from-[#0d1117] to-[#111827] rounded-2xl p-6 transition-all duration-300 h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#1e2d3d] flex items-center justify-center text-[#00d9ff] group-hover:bg-[#00d9ff]/10 transition-colors duration-300">
            {icon}
          </div>
          <span className="text-[10px] font-mono text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/20 px-2 py-1 rounded-full tracking-widest uppercase">
            {tag}
          </span>
        </div>
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#00d9ff] transition-colors duration-300">{title}</h3>
        <p className="text-[#8b949e] text-sm leading-relaxed">{desc}</p>
        <div className="mt-4 flex items-center text-[#00d9ff] text-xs font-mono opacity-0 group-hover:opacity-100 transition-all duration-300 gap-1">
          <span>explore</span><ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Process Step ──────────────────────────────────────────────────────────────
function ProcessStep({ step, num, title, desc, color, delay }: ProcessStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: num % 2 === 0 ? 50 : -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5 group"
    >
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-mono font-bold text-lg shrink-0 ${color} shadow-lg`}>
          {num}
        </div>
        <div className="flex-1 w-px bg-gradient-to-b from-[#1e2d3d] to-transparent mt-3 last:hidden" />
      </div>
      <div className="pb-10 flex-1 min-w-0">
        <span className="text-[10px] font-mono text-[#4ade80] tracking-[0.2em] uppercase block mb-1">{step}</span>
        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#00d9ff] transition-colors duration-300">{title}</h3>
        <p className="text-[#8b949e] leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Tech Badge ────────────────────────────────────────────────────────────────
function TechBadge({ tech, index }: TechBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08, borderColor: '#00d9ff' }}
      className="px-4 py-2 font-mono text-sm border border-[#1e2d3d] hover:border-[#00d9ff]/50 bg-[#0d1117] hover:bg-[#00d9ff]/5 text-[#8b949e] hover:text-[#00d9ff] rounded-lg transition-all duration-250 cursor-default"
    >
      {tech}
    </motion.span>
  );
}

// ─── Floating Grid Background ──────────────────────────────────────────────────
function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,217,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,217,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d9ff]/30 to-transparent" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,217,255,0.15) 0%, transparent 60%)'
        }}
      />
      <motion.div
        className="absolute top-1/4 -right-32 w-96 h-96 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 -left-32 w-80 h-80 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #00d9ff 0%, transparent 70%)' }}
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}

// ─── Scrolling Code Strip ──────────────────────────────────────────────────────
const CODE_STRIP = [
  'const app = createApp(config)',
  'await deploy({ env: "prod" })',
  'git push origin main',
  'npm run build --turbopack',
  'docker compose up -d',
  'kubectl apply -f deployment.yaml',
  'const { data } = await fetch("/api")',
  'useEffect(() => { init() }, [])',
  'export default function Page()',
  'type Props = { children: ReactNode }',
];

function ScrollingCodeStrip() {
  const doubled = [...CODE_STRIP, ...CODE_STRIP];
  return (
    <div className="relative overflow-hidden py-3 border-y border-[#1e2d3d] bg-[#0a0e1a]/80 backdrop-blur-sm">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((line, i) => (
          <span key={i} className="font-mono text-xs text-[#2d4a6e] flex items-center gap-2 shrink-0">
            <span className="text-[#1e2d3d]">{'///'}</span>
            <span>{line}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────────
export default function Page() {
  const [activeTab, setActiveTab] = useState<'mobile' | 'web' | 'backend'>('mobile');
  const heroRef = useRef<HTMLElement>(null);

  const TERMINAL_LINES = [
    '// Initializing AppForge development environment',
    "import { buildApp } from '@appforge/core'",
    'const config = { target: ["ios", "android", "web"] }',
    'const app = await buildApp(config)',
    '// Compiling 247 modules... done in 1.8s',
    'export default app // Ready for deployment 🚀',
  ];

  const TECHS = ['TypeScript', 'React Native', 'Flutter', 'Next.js', 'Swift', 'Kotlin', 'Node.js', 'GraphQL', 'Rust', 'Docker', 'K8s', 'PostgreSQL'];

  const PLATFORMS = [
    { title: 'iOS Development', desc: 'Native Swift & SwiftUI apps with deep Apple ecosystem integration, CoreML, and App Store optimization.', icon: <Smartphone className="w-5 h-5" />, tag: 'NATIVE' },
    { title: 'Android Development', desc: 'Kotlin-first Android apps with Jetpack Compose, Material 3 design, and Play Store delivery.', icon: <Tablet className="w-5 h-5" />, tag: 'NATIVE' },
    { title: 'Cross-Platform', desc: 'Single codebase with React Native or Flutter delivering 95% native performance across platforms.', icon: <Layers className="w-5 h-5" />, tag: 'HYBRID' },
    { title: 'Web Applications', desc: 'Next.js, Remix, and Astro powered web apps with SSR, ISR and edge computing for peak performance.', icon: <Globe className="w-5 h-5" />, tag: 'WEB' },
    { title: 'Progressive Web Apps', desc: 'Offline-capable, installable PWAs with Service Workers, push notifications and native-app UX.', icon: <Zap className="w-5 h-5" />, tag: 'PWA' },
    { title: 'Backend & APIs', desc: 'Scalable microservices, REST and GraphQL APIs with real-time WebSocket capabilities.', icon: <Server className="w-5 h-5" />, tag: 'API' },
    { title: 'Cloud Infrastructure', desc: 'AWS, GCP, and Azure deployments with Kubernetes orchestration, CI/CD pipelines, and auto-scaling.', icon: <Cloud className="w-5 h-5" />, tag: 'CLOUD' },
    { title: 'Security & Auth', desc: 'Zero-trust security architecture, OAuth 2.0, biometric auth, and end-to-end encryption.', icon: <Shield className="w-5 h-5" />, tag: 'SEC' },
    { title: 'Database Design', desc: 'Relational, NoSQL, and vector databases with optimized schemas, migrations, and real-time sync.', icon: <Database className="w-5 h-5" />, tag: 'DB' },
  ];

  const PROCESS = [
    { step: 'PHASE_01', title: 'Architecture & Planning', desc: 'Deep-dive requirement analysis, system architecture design, tech stack selection, and sprint planning aligned with your business goals.', color: 'bg-[#00d9ff]' },
    { step: 'PHASE_02', title: 'UI/UX Engineering', desc: 'Figma prototyping, design systems, component libraries, and user testing before a single line of production code is written.', color: 'bg-[#8b5cf6]' },
    { step: 'PHASE_03', title: 'Agile Development', desc: 'Two-week sprints with daily standups, continuous integration, automated testing, and weekly stakeholder demos.', color: 'bg-[#4ade80]' },
    { step: 'PHASE_04', title: 'QA & Testing', desc: 'Unit, integration, E2E, performance load, and security penetration testing across every target device and platform.', color: 'bg-[#f59e0b]' },
    { step: 'PHASE_05', title: 'Deployment & Launch', desc: 'Zero-downtime production deployments, App Store submissions, CDN configuration, monitoring, and real-time alerting.', color: 'bg-[#ef4444]' },
    { step: 'PHASE_06', title: 'Growth & Maintenance', desc: 'Post-launch analytics, A/B testing, performance tuning, feature velocity, and SLA-guaranteed uptime support.', color: 'bg-[#00d9ff]' },
  ];

  const METRICS = [
    { number: '99.9%', label: 'Uptime SLA', icon: <Zap className="w-5 h-5" />, delay: 0.1 },
    { number: '<80ms', label: 'API Response', icon: <Cpu className="w-5 h-5" />, delay: 0.2 },
    { number: '4.9★', label: 'App Store Avg', icon: <Star className="w-5 h-5" />, delay: 0.3 },
    { number: '200+', label: 'Apps Launched', icon: <Rocket className="w-5 h-5" />, delay: 0.4 },
  ];

  const TAB_CODE: Record<'mobile' | 'web' | 'backend', string[]> = {
    mobile: [
      "// React Native Component",
      "import { usePushNotifications } from './hooks'",
      "const AppHome: FC<HomeProps> = ({ user }) => {",
      "  const { notify } = usePushNotifications()",
      "  return <SafeAreaView style={styles.root}>",
      "    <HeroSection user={user} />",
      "  </SafeAreaView>",
      "}",
    ],
    web: [
      "// Next.js 15 Server Component",
      "import { cache } from 'react'",
      "const getData = cache(async (id: string) => {",
      "  return await db.query({ where: { id } })",
      "})",
      "export default async function Page({ params }) {",
      "  const data = await getData(params.id)",
      "  return <Dashboard data={data} />",
      "}",
    ],
    backend: [
      "// Hono Edge API Route",
      "import { Hono } from 'hono'",
      "const api = new Hono()",
      "api.post('/inference', async (c) => {",
      "  const body = await c.req.json()",
      "  const result = await model.run(body)",
      "  return c.json({ ok: true, result })",
      "})",
    ],
  };

  return (
    <div className="min-h-screen bg-[#060b14] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .glow-cyan { box-shadow: 0 0 20px rgba(0,217,255,0.25), 0 0 60px rgba(0,217,255,0.1); }
        .glow-purple { box-shadow: 0 0 20px rgba(139,92,246,0.25), 0 0 60px rgba(139,92,246,0.1); }
        .text-gradient-cyan { background: linear-gradient(135deg, #00d9ff 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .text-gradient-white { background: linear-gradient(180deg, #ffffff 0%, #8b949e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #060b14; }
        ::-webkit-scrollbar-thumb { background: #1e2d3d; border-radius: 3px; }
      `}</style>

      <GridBackground />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-16">
        <div className="relative z-10 w-full max-w-6xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d9ff]/30 bg-[#00d9ff]/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="font-mono text-xs text-[#00d9ff] tracking-widest uppercase">System Online — v4.2.0</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-6"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-black leading-[0.92] tracking-[-0.03em] mb-0">
              <span className="block text-gradient-white">BUILD.</span>
              <span className="block text-gradient-cyan">SHIP.</span>
              <span className="block text-gradient-white">SCALE.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-center text-[#8b949e] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            End-to-end application development — from native mobile to cloud-native backends.
            <br className="hidden sm:block" />
            Code that performs. Design that converts. Architecture that lasts.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 bg-[#00d9ff] text-[#060b14] font-bold text-sm tracking-wide rounded-xl glow-cyan transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
            >
              <Rocket className="w-4 h-4" />
              START A PROJECT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 border border-[#1e2d3d] hover:border-[#00d9ff]/40 bg-transparent text-[#8b949e] hover:text-white font-bold text-sm tracking-wide rounded-xl transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
            >
              <Play className="w-4 h-4" />
              VIEW CASE STUDIES
            </motion.button>
          </motion.div>

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00d9ff]/20 via-[#8b5cf6]/10 to-[#4ade80]/20 rounded-2xl blur-xl" />
            <div className="relative border border-[#1e2d3d] bg-[#0d1117] rounded-2xl overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2d3d] bg-[#0a0e1a]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#4ade80]/80" />
                </div>
                <div className="flex items-center gap-2 text-[#3d5166] font-mono text-xs">
                  <Terminal className="w-3 h-3" />
                  appforge — zsh
                </div>
                <div className="w-14" />
              </div>
              {/* Terminal body */}
              <div className="p-6 space-y-1 min-h-[200px]">
                <TerminalTypewriter lines={TERMINAL_LINES} speed={40} />
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mt-10"
          >
            {TECHS.map((tech, i) => <TechBadge key={tech} tech={tech} index={i} />)}
          </motion.div>
        </div>
      </section>

      {/* ── SCROLLING CODE STRIP ─────────────────────────────────────────────── */}
      <ScrollingCodeStrip />

      {/* ── METRICS ──────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map((m, i) => (
              <MetricCard key={i} number={m.number} label={m.label} icon={m.icon} delay={m.delay} />
            ))}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW + CODE PREVIEW ──────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-mono text-xs text-[#00d9ff] tracking-[0.2em] uppercase block mb-4">// What We Build</span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                <span className="text-white">Crafted with</span>
                <br />
                <span className="text-gradient-cyan">engineering precision</span>
              </h2>
              <p className="text-[#8b949e] leading-relaxed mb-8">
                We don't just write code — we architect systems. Every application is built on a foundation of clean architecture, thorough documentation, and automated testing pipelines that ensure reliability from day one to day one thousand.
              </p>

              <div className="space-y-3">
                {[
                  { icon: <GitBranch className="w-4 h-4" />, text: 'Git-based workflow with code review gates' },
                  { icon: <TestTube2 className="w-4 h-4" />, text: '90%+ test coverage requirement on all projects' },
                  { icon: <Zap className="w-4 h-4" />, text: 'CI/CD pipelines with automated deployments' },
                  { icon: <Lock className="w-4 h-4" />, text: 'Security-first development & OWASP compliance' },
                  { icon: <Monitor className="w-4 h-4" />, text: 'Real-time monitoring with Datadog & Sentry' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0d1117] border border-[#1e2d3d] flex items-center justify-center text-[#00d9ff] group-hover:border-[#00d9ff]/40 transition-colors duration-300 shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[#8b949e] group-hover:text-white text-sm transition-colors duration-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Interactive Code Preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-[#00d9ff]/10 to-[#8b5cf6]/10 rounded-2xl blur-2xl" />
              <div className="relative border border-[#1e2d3d] bg-[#0d1117] rounded-2xl overflow-hidden">
                {/* Tab bar */}
                <div className="flex items-center gap-1 px-4 py-3 border-b border-[#1e2d3d] bg-[#0a0e1a] overflow-x-auto">
                  {(['mobile', 'web', 'backend'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 font-mono text-xs rounded-md transition-all duration-200 whitespace-nowrap ${
                        activeTab === tab
                          ? 'bg-[#1e2d3d] text-[#00d9ff] border border-[#00d9ff]/30'
                          : 'text-[#3d5166] hover:text-[#8b949e]'
                      }`}
                    >
                      {tab}.tsx
                    </button>
                  ))}
                  <div className="ml-auto flex items-center gap-1.5 text-[#3d5166]">
                    <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                    <span className="font-mono text-[10px]">live</span>
                  </div>
                </div>

                {/* Code content */}
                <div className="p-6 min-h-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="font-mono text-sm space-y-0.5"
                    >
                      {TAB_CODE[activeTab].map((line, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-[#3d5166] select-none w-4 text-right shrink-0">{i + 1}</span>
                          <span className={getLineColor(line)}>{line}</span>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-[#1e2d3d] bg-[#0a0e1a]">
                  <div className="flex items-center gap-3 text-[#3d5166] font-mono text-[10px]">
                    <span className="flex items-center gap-1"><GitCommit className="w-3 h-3" />main</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-[#4ade80]" />TypeScript</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#3d5166] font-mono text-[10px]">
                    <Bug className="w-3 h-3" /> 0 errors
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PLATFORMS GRID ───────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-[#00d9ff] tracking-[0.2em] uppercase block mb-4"
            >
              // Platforms & Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-black tracking-tight"
            >
              <span className="text-white">Everything your app</span>
              <br />
              <span className="text-gradient-cyan">needs to succeed</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PLATFORMS.map((p, i) => (
              <PlatformCard key={i} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: heading */}
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-mono text-xs text-[#00d9ff] tracking-[0.2em] uppercase block mb-4"
              >
                // Development Process
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl font-black tracking-tight mb-6"
              >
                <span className="text-white">From idea to</span>
                <br />
                <span className="text-gradient-cyan">production-ready</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-[#8b949e] leading-relaxed mb-8"
              >
                Our battle-tested 6-phase process transforms your vision into a world-class application. Transparent milestones, predictable delivery, and zero surprises.
              </motion.p>

              {/* Git commit graph visual */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="border border-[#1e2d3d] bg-[#0d1117] rounded-xl p-4 font-mono text-xs"
              >
                <div className="flex items-center gap-2 mb-3 text-[#3d5166]">
                  <GitMerge className="w-3.5 h-3.5" />
                  <span>commit history — main</span>
                </div>
                {[
                  { hash: 'a3f8c91', msg: 'feat: launch v1.0 to production', tag: 'main' },
                  { hash: 'b7e2140', msg: 'test: 95% coverage achieved', tag: null },
                  { hash: 'c9d4837', msg: 'feat: iOS & Android builds passing', tag: null },
                  { hash: 'd1a6f22', msg: 'design: Figma handoff complete', tag: null },
                ].map((commit, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5">
                    <span className="text-[#8b5cf6]">{commit.hash}</span>
                    <span className="text-[#8b949e] flex-1 truncate">{commit.msg}</span>
                    {commit.tag && (
                      <span className="text-[10px] text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/20 px-2 py-0.5 rounded-full shrink-0">
                        {commit.tag}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Steps */}
            <div>
              {PROCESS.map((p, i) => (
                <ProcessStep
                  key={i}
                  num={i + 1}
                  step={p.step}
                  title={p.title}
                  desc={p.desc}
                  color={p.color}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK DEEP DIVE ─────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 border-y border-[#1e2d3d]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: 'Frontend Stack',
                icon: <Code2 className="w-5 h-5" />,
                items: ['React / Next.js 15', 'Vue 3 / Nuxt', 'SvelteKit', 'Astro', 'Three.js', 'Framer Motion'],
                color: '#00d9ff',
              },
              {
                label: 'Mobile Stack',
                icon: <Smartphone className="w-5 h-5" />,
                items: ['React Native', 'Flutter / Dart', 'Swift / SwiftUI', 'Kotlin / Compose', 'Expo', 'Capacitor'],
                color: '#8b5cf6',
              },
              {
                label: 'Backend Stack',
                icon: <Server className="w-5 h-5" />,
                items: ['Node.js / Hono', 'Go / Fiber', 'Rust / Axum', 'GraphQL / tRPC', 'PostgreSQL', 'Redis / Kafka'],
                color: '#4ade80',
              },
            ].map((col, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="border border-[#1e2d3d] bg-[#0d1117] rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${col.color}20`, border: `1px solid ${col.color}30`, color: col.color }}>
                    {col.icon}
                  </div>
                  <h3 className="text-white font-bold">{col.label}</h3>
                </div>
                <div className="space-y-2.5">
                  {col.items.map((item, ii) => (
                    <div key={ii} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: col.color }} />
                      <span className="text-[#8b949e] text-sm font-mono">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow backdrop */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff]/10 via-[#8b5cf6]/5 to-[#00d9ff]/10 rounded-3xl blur-3xl" />

            <div className="relative border border-[#1e2d3d] bg-[#0a0e1a] rounded-3xl p-12 sm:p-16 overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent" />

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1e2d3d] bg-[#0d1117] mb-8">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                <span className="font-mono text-xs text-[#8b949e]">Ready to deploy your vision</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                <span className="text-white">Your app deserves</span>
                <br />
                <span className="text-gradient-cyan">world-class code</span>
              </h2>

              <p className="text-[#8b949e] text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Let's turn your idea into a production-grade application. Schedule a free architecture review and get a detailed project roadmap within 48 hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group px-8 py-4 bg-[#00d9ff] text-[#060b14] font-bold text-sm tracking-wide rounded-xl glow-cyan transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Rocket className="w-4 h-4" />
                  BOOK FREE CONSULTATION
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 border border-[#1e2d3d] hover:border-[#00d9ff]/40 bg-transparent text-[#8b949e] hover:text-white font-bold text-sm tracking-wide rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  VIEW PRICING PLANS
                </motion.button>
              </div>

              {/* Bottom stats row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[#1e2d3d]">
                {[
                  { icon: <RefreshCw className="w-5 h-5" />, title: '2-Week Sprints', desc: 'Agile delivery with demo every sprint' },
                  { icon: <Shield className="w-5 h-5" />, title: 'NDA on Day 1', desc: 'Your IP is protected from first call' },
                  { icon: <Zap className="w-5 h-5" />, title: 'Ship in 8 Weeks', desc: 'MVP to market, guaranteed timeline' },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0d1117] border border-[#1e2d3d] flex items-center justify-center text-[#00d9ff] mb-3">
                      {b.icon}
                    </div>
                    <div className="text-white font-bold text-sm mb-1">{b.title}</div>
                    <div className="text-[#3d5166] text-xs">{b.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER BAR ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-[#1e2d3d] py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#00d9ff] to-[#8b5cf6] flex items-center justify-center">
              <Braces className="w-3.5 h-3.5 text-[#060b14]" />
            </div>
            <span className="font-mono text-xs text-[#3d5166]">AppForge © 2025</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#3d5166]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            All systems operational
          </div>
          <div className="font-mono text-[10px] text-[#3d5166]">
            Built with Next.js · TypeScript · Turbopack
          </div>
        </div>
      </div>
    </div>
  );
}