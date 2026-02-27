'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Code2, Globe, Server, Database, Shield, Zap, Terminal,
  Monitor, Cpu, GitBranch, Layers, RefreshCw, Lock, Cloud,
  ArrowRight, ChevronRight, Search, Eye, Package,
  BarChart3, Wifi, Code, Hash, AlignLeft, FileCode,
  Braces, Bug, CheckCircle2, GitCommit, Rocket, Star
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface InViewWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

interface SkillBarProps {
  label: string;
  value: number;
  color: string;
  delay: number;
}

interface CommandLineProps {
  commands: { cmd: string; output: string }[];
}

interface TechNodeProps {
  name: string;
  tag: string;
  index: number;
  accent: string;
}

interface ServiceCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  cmds: string[];
  index: number;
}

// ─── Scanline Overlay ──────────────────────────────────────────────────────────
function ScanlineOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.15) 2px, rgba(0,255,65,0.15) 4px)',
        backgroundSize: '100% 4px',
      }}
    />
  );
}

// ─── Matrix Rain Column ────────────────────────────────────────────────────────
function MatrixColumn({ x, delay }: { x: number; delay: number }) {
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]()<>/\\|;:.,=+*#@!?'.split('');
  const [column, setColumn] = useState<string[]>([]);

  useEffect(() => {
    const gen = () => Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]);
    setColumn(gen());
    const t = setInterval(() => setColumn(gen()), 180 + delay * 40);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="absolute top-0 flex flex-col gap-0 font-mono text-[10px] leading-4"
      style={{ left: `${x}%` }}
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: '120%', opacity: [0, 0.6, 0.6, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, delay: delay * 0.8, ease: 'linear' }}
    >
      {column.map((c, i) => (
        <span
          key={i}
          style={{
            color: i === column.length - 1 ? '#ffffff' : `rgba(0,255,65,${0.8 - i * 0.04})`,
          }}
        >
          {c}
        </span>
      ))}
    </motion.div>
  );
}

// ─── Matrix Background ─────────────────────────────────────────────────────────
function MatrixBackground() {
  const COLS = [3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 53, 58, 63, 68, 73, 78, 83, 88, 93, 98];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
      {COLS.map((x, i) => <MatrixColumn key={i} x={x} delay={i * 0.3} />)}
    </div>
  );
}

// ─── In-View Wrapper ───────────────────────────────────────────────────────────
function FadeIn({ children, className = '', delay = 0, direction = 'up' }: InViewWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 30 : 0,
    x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Skill Bar ─────────────────────────────────────────────────────────────────
function SkillBar({ label, value, color, delay }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between font-mono text-xs">
        <span className="text-[#00ff41]">{label}</span>
        <span className="text-[#4a7c59]">{value}%</span>
      </div>
      <div className="h-1.5 bg-[#0a1a0a] rounded-full overflow-hidden border border-[#0d2b0d]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ delay: delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ─── Command Line Simulator ────────────────────────────────────────────────────
function CommandLine({ commands }: CommandLineProps) {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<'typing' | 'output' | 'done'>('typing');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || step >= commands.length) return;
    if (phase === 'typing') {
      if (typed.length < commands[step].cmd.length) {
        const t = setTimeout(() => setTyped(commands[step].cmd.slice(0, typed.length + 1)), 55);
        return () => clearTimeout(t);
      } else {
        setTimeout(() => setPhase('output'), 200);
      }
    } else if (phase === 'output') {
      setTimeout(() => {
        if (step + 1 < commands.length) {
          setStep(s => s + 1);
          setTyped('');
          setPhase('typing');
        } else {
          setPhase('done');
        }
      }, 600);
    }
  }, [inView, step, typed, phase, commands]);

  return (
    <div ref={ref} className="font-mono text-xs space-y-2">
      {commands.slice(0, step + 1).map((c, i) => (
        <div key={i}>
          <div className="flex items-center gap-2">
            <span className="text-[#4a7c59]">user@webdev</span>
            <span className="text-[#1a3a1a]">:</span>
            <span className="text-[#3a8ad4]">~/project</span>
            <span className="text-[#00ff41]">$</span>
            <span className="text-[#c8ffc8]">
              {i === step ? typed : c.cmd}
              {i === step && phase === 'typing' && (
                <motion.span
                  className="inline-block w-[6px] h-[11px] bg-[#00ff41] align-middle ml-px"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </span>
          </div>
          {(i < step || phase !== 'typing') && i <= step && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-4 text-[#4a7c59] leading-relaxed whitespace-pre-wrap"
            >
              {c.output}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Tech Node ─────────────────────────────────────────────────────────────────
function TechNode({ name, tag, index, accent }: TechNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="group cursor-default relative"
    >
      <div
        className="border border-[#0d2b0d] hover:border-[#00ff41]/40 bg-[#020c02] rounded-lg p-4 transition-all duration-300"
        style={{ '--accent': accent } as React.CSSProperties}
      >
        <div className="flex items-start justify-between mb-2">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: accent }}>{tag}</span>
          <div
            className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
          />
        </div>
        <span className="text-[#a8ffa8] font-mono text-sm font-medium group-hover:text-white transition-colors duration-300">{name}</span>
      </div>
    </motion.div>
  );
}

// ─── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ title, desc, icon, cmds, index }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-[#00ff41]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
      <div className="relative border border-[#0d2b0d] hover:border-[#00ff41]/30 bg-[#020c02] rounded-2xl p-6 h-full transition-all duration-300 overflow-hidden">
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{
          background: 'radial-gradient(circle at top right, rgba(0,255,65,0.08) 0%, transparent 70%)'
        }} />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg border border-[#0d2b0d] bg-[#030f03] flex items-center justify-center text-[#00ff41] group-hover:border-[#00ff41]/30 transition-colors duration-300 shrink-0">
            {icon}
          </div>
          <h3 className="text-[#a8ffa8] font-mono font-bold group-hover:text-white transition-colors duration-300">{title}</h3>
        </div>
        <p className="text-[#4a7c59] text-sm leading-relaxed mb-5">{desc}</p>
        <div className="space-y-1.5">
          {cmds.map((cmd, i) => (
            <div key={i} className="flex items-center gap-2 font-mono text-[10px]">
              <span className="text-[#1a3a1a]">$</span>
              <span className="text-[#2d6b2d]">{cmd}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── ASCII Divider ─────────────────────────────────────────────────────────────
function AsciiDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px border-t border-dashed border-[#0d2b0d]" />
      <span className="font-mono text-[10px] text-[#1a3a1a] tracking-[0.3em] uppercase whitespace-nowrap">
        {'/* '}{label}{' */'}
      </span>
      <div className="flex-1 h-px border-t border-dashed border-[#0d2b0d]" />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  const [activeSection, setActiveSection] = useState(0);

  const TECH_NODES: { name: string; tag: string; accent: string }[] = [
    { name: 'Next.js 15', tag: 'framework', accent: '#00ff41' },
    { name: 'TypeScript', tag: 'language', accent: '#3a8ad4' },
    { name: 'React 19', tag: 'ui lib', accent: '#61dafb' },
    { name: 'Node.js', tag: 'runtime', accent: '#68a063' },
    { name: 'GraphQL', tag: 'api', accent: '#e535ab' },
    { name: 'PostgreSQL', tag: 'database', accent: '#336791' },
    { name: 'Redis', tag: 'cache', accent: '#dc382d' },
    { name: 'Docker', tag: 'container', accent: '#2496ed' },
    { name: 'Tailwind CSS', tag: 'styling', accent: '#06b6d4' },
    { name: 'Prisma ORM', tag: 'orm', accent: '#5a67d8' },
    { name: 'Kubernetes', tag: 'orchestration', accent: '#326ce5' },
    { name: 'Vercel Edge', tag: 'deploy', accent: '#ffffff' },
  ];

  const SERVICES: {
    title: string; desc: string; icon: React.ReactNode; cmds: string[];
  }[] = [
    {
      title: 'Frontend Engineering',
      desc: 'Pixel-perfect React & Next.js applications with SSR, ISR, and edge rendering for sub-second load times worldwide.',
      icon: <Monitor className="w-5 h-5" />,
      cmds: ['npx create-next-app@latest', 'next build --turbopack', 'next start --port 3000'],
    },
    {
      title: 'Backend Architecture',
      desc: 'Scalable REST & GraphQL APIs built on Node.js, Go, or Rust with microservice or monolith patterns per your needs.',
      icon: <Server className="w-5 h-5" />,
      cmds: ['node --watch server.js', 'prisma migrate deploy', 'pm2 start ecosystem.json'],
    },
    {
      title: 'Database Design',
      desc: 'Relational, document, and vector databases with optimized schemas, query tuning, and real-time sync.',
      icon: <Database className="w-5 h-5" />,
      cmds: ['psql -U admin -d prod', 'prisma db push --force-reset', 'redis-cli monitor'],
    },
    {
      title: 'Performance Optimization',
      desc: 'Core Web Vitals engineering — LCP, CLS, INP tuning, bundle splitting, image optimization and CDN strategy.',
      icon: <Zap className="w-5 h-5" />,
      cmds: ['lighthouse --view --only-categories=performance', 'npm run analyze', 'webpack-bundle-analyzer'],
    },
    {
      title: 'Security & DevSecOps',
      desc: 'Zero-trust auth, OWASP hardening, CSP headers, dependency audits, penetration testing and SOC 2 prep.',
      icon: <Shield className="w-5 h-5" />,
      cmds: ['npm audit --audit-level=critical', 'snyk test --all-projects', 'openssl genrsa -out key.pem 4096'],
    },
    {
      title: 'SEO & Web Vitals',
      desc: 'Technical SEO architecture, schema markup, Core Web Vitals certification, and search performance analytics.',
      icon: <Search className="w-5 h-5" />,
      cmds: ['npx next-sitemap', 'curl -I https://site.com', 'lighthouse --output=json'],
    },
    {
      title: 'CI/CD Pipeline',
      desc: 'GitHub Actions, GitLab CI, and Jenkins pipelines with automated testing, staging deployments, and rollback.',
      icon: <GitBranch className="w-5 h-5" />,
      cmds: ['gh workflow run deploy.yml', 'docker build -t app:prod .', 'kubectl rollout status deployment'],
    },
    {
      title: 'Cloud Infrastructure',
      desc: 'AWS, GCP, and Azure deployments with IaC via Terraform, auto-scaling groups, and multi-region failover.',
      icon: <Cloud className="w-5 h-5" />,
      cmds: ['terraform plan -out=tfplan', 'terraform apply tfplan', 'aws ecs update-service --force-new-deployment'],
    },
    {
      title: 'Real-Time Features',
      desc: 'WebSockets, Server-Sent Events, and WebRTC for live dashboards, collaborative tools, and push notifications.',
      icon: <Wifi className="w-5 h-5" />,
      cmds: ['wscat -c ws://localhost:8080', 'socket.io --adapter redis', 'node --experimental-websocket'],
    },
  ];

  const PROCESS: { step: string; title: string; desc: string; cmd: string }[] = [
    { step: 'INIT', title: 'Discovery & Scoping', desc: 'Requirements gathering, user research, competitive analysis, and technical feasibility assessment to define the MVP scope.', cmd: 'git init && npm init -y' },
    { step: 'ARCH', title: 'System Architecture', desc: 'Data modeling, API contract design, infrastructure diagrams, and technology stack finalization with documented ADRs.', cmd: 'mkdir src && touch README.md' },
    { step: 'DEV', title: 'Iterative Development', desc: 'Two-week sprints with daily standups, PR reviews, pair programming sessions, and weekly stakeholder demos.', cmd: 'npm run dev -- --turbopack' },
    { step: 'TEST', title: 'Automated QA', desc: 'Unit, integration, E2E with Playwright, performance profiling with Lighthouse CI, and security scanning on every commit.', cmd: 'npm run test:coverage' },
    { step: 'SHIP', title: 'Production Deploy', desc: 'Blue-green deployments, feature flags, real-user monitoring, and a full runbook for incident response and rollback.', cmd: 'git push origin main && gh run watch' },
    { step: 'OPS', title: 'Observe & Iterate', desc: 'Datadog APM, Sentry error tracking, A/B testing, and continuous performance budgets enforced in the pipeline.', cmd: 'kubectl logs -f deployment/app-prod' },
  ];

  const METRICS = [
    { label: 'Lighthouse Score', value: 98, color: '#00ff41' },
    { label: 'Test Coverage', value: 94, color: '#3a8ad4' },
    { label: 'Core Web Vitals', value: 100, color: '#e535ab' },
    { label: 'Uptime SLA', value: 99.9, color: '#f59e0b' },
  ];

  const CLI_COMMANDS = [
    { cmd: 'npm create next-app@latest my-app -- --typescript --tailwind', output: '✓ Installing dependencies...\n✓ Project created in ./my-app' },
    { cmd: 'cd my-app && npm run dev --turbopack', output: '▲ Next.js 15.0.0 (turbopack)\n  Ready in 183ms on http://localhost:3000' },
    { cmd: 'git push origin main', output: '✓ Build passed (47s)\n✓ Deployed to https://my-app.vercel.app' },
  ];

  return (
    <div
      className="min-h-screen bg-[#010801] text-white overflow-x-hidden"
      style={{ fontFamily: "'Share Tech Mono', 'JetBrains Mono', 'Courier New', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: rgba(0,255,65,0.25); color: #fff; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #010801; }
        ::-webkit-scrollbar-thumb { background: #0d2b0d; border-radius: 3px; }
        .orbitron { font-family: 'Orbitron', 'Share Tech Mono', monospace; }
        .phosphor-glow { text-shadow: 0 0 10px rgba(0,255,65,0.7), 0 0 30px rgba(0,255,65,0.3); }
        .phosphor-glow-sm { text-shadow: 0 0 6px rgba(0,255,65,0.5); }
        .border-glow { box-shadow: 0 0 0 1px rgba(0,255,65,0.15), inset 0 0 20px rgba(0,255,65,0.02); }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .blink { animation: blink 1s step-end infinite; }
        @keyframes scanH { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        .scan-line {
          position: fixed; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(to bottom, transparent, rgba(0,255,65,0.04), transparent);
          animation: scanH 8s linear infinite;
          pointer-events: none; z-index: 40;
        }
      `}</style>

      {/* Atmosphere */}
      <ScanlineOverlay />
      <div className="scan-line" />
      <MatrixBackground />

      {/* Radial green glow center */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,255,65,0.04) 0%, transparent 70%)' }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-16 overflow-hidden">

        {/* Corner brackets decoration */}
        <div className="absolute top-24 left-6 text-[#0d2b0d] font-mono text-xs leading-none select-none hidden lg:block">
          {`┌──────────────────────────────┐\n│  TERMINAL v4.2.0             │\n│  STATUS: ONLINE              │\n└──────────────────────────────┘`}
        </div>
        <div className="absolute top-24 right-6 text-[#0d2b0d] font-mono text-xs leading-none select-none hidden lg:block text-right">
          {`SYS: ACTIVE\nMEM: 64GB\nCPU: 99%\nNET: ↑↓`}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#0d2b0d] bg-[#020c02] rounded mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00ff41] blink" style={{ boxShadow: '0 0 6px #00ff41' }} />
            <span className="text-[#4a7c59] text-xs tracking-[0.25em] uppercase">root@webdev:~# system ready</span>
          </motion.div>

          {/* Main heading — Orbitron for maximum impact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="orbitron text-5xl sm:text-7xl md:text-8xl lg:text-[88px] font-black leading-[0.9] tracking-[-0.02em] mb-2">
              <span className="block text-[#00ff41] phosphor-glow">WEB</span>
              <span className="block" style={{ color: '#a8ffa8', textShadow: '0 0 40px rgba(0,255,65,0.2)' }}>DEV.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[#4a7c59] text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
          >
            {'// Full-stack web engineering — from pixel-perfect frontends'}<br />
            {'// to distributed backends and everything in between.'}
          </motion.p>

          {/* CLI Hero Block */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-2xl mx-auto mb-12"
          >
            <div className="absolute -inset-px bg-gradient-to-r from-[#00ff41]/20 via-transparent to-[#00ff41]/10 rounded-lg opacity-60" />
            <div className="relative border border-[#0d2b0d] bg-[#010d01] rounded-lg overflow-hidden border-glow">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#0d2b0d] bg-[#020c02]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-[#00ff41]" />
                  <span className="text-[#2d6b2d] text-xs tracking-widest">TERMINAL — bash — 80×24</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a3a1a]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a3a1a]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00ff41]/40" style={{ boxShadow: '0 0 4px #00ff41' }} />
                </div>
              </div>
              <div className="p-5 min-h-[160px]">
                <CommandLine commands={CLI_COMMANDS} />
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group px-8 py-3.5 bg-[#00ff41] text-[#010801] font-bold text-sm tracking-widest rounded flex items-center justify-center gap-2 min-w-[200px] orbitron"
              style={{ boxShadow: '0 0 20px rgba(0,255,65,0.3), 0 0 60px rgba(0,255,65,0.1)' }}
            >
              <Code className="w-4 h-4" />
              INIT_PROJECT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
           
          </motion.div>
        </div>

        {/* Bottom scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#1a3a1a] text-[10px] tracking-[0.3em]">SCROLL_DOWN</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[#0d2b0d] to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ── TECH NODES ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 px-4 sm:px-6 border-y border-[#0d2b0d]">
        <div className="max-w-6xl mx-auto">
          <AsciiDivider label="tech_stack.json" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6">
            {TECH_NODES.map((t, i) => <TechNode key={i} {...t} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW — 2 column ───────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <FadeIn direction="left">
            <span className="text-[#2d6b2d] text-xs tracking-[0.3em] uppercase block mb-4">{'// About Our Craft'}</span>
            <h2 className="orbitron text-3xl md:text-4xl font-black leading-tight mb-6">
              <span className="text-[#a8ffa8]">CODE THAT</span><br />
              <span className="text-[#00ff41] phosphor-glow">PERFORMS.</span>
            </h2>
            <p className="text-[#4a7c59] leading-relaxed mb-6 text-sm">
              We treat web development as an engineering discipline — not just craft. Every project begins with system design, ends with observable production metrics, and is maintained with the rigor of a regulated industry.
            </p>

            <div className="space-y-4 mb-8">
              {METRICS.map((m, i) => (
                <SkillBar key={i} label={m.label} value={m.value} color={m.color} delay={i * 0.15} />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <CheckCircle2 className="w-4 h-4" />, text: 'TypeScript-first codebase' },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: '90%+ automated test coverage' },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: 'Semantic versioning enforced' },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: 'Zero-downtime deployments' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="text-[#00ff41] shrink-0">{item.icon}</span>
                  <span className="text-[#4a7c59]">{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right — file tree + code */}
          <FadeIn direction="right" delay={0.1}>
            <div className="border border-[#0d2b0d] bg-[#010d01] rounded-lg overflow-hidden border-glow">
              {/* Window bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#0d2b0d] bg-[#020c02]">
                <div className="flex items-center gap-2 text-[#2d6b2d] text-xs">
                  <FileCode className="w-3.5 h-3.5" />
                  EXPLORER — my-webapp
                </div>
                <div className="flex gap-1.5">
                  {['bg-[#1a3a1a]', 'bg-[#1a3a1a]', 'bg-[#00ff41]/40'].map((c, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                  ))}
                </div>
              </div>

              {/* File tree */}
              <div className="p-4 border-b border-[#0d2b0d] font-mono text-xs space-y-1">
                {[
                  { indent: 0, icon: '📁', name: 'my-webapp/', color: '#a8ffa8' },
                  { indent: 1, icon: '📁', name: 'app/', color: '#a8ffa8' },
                  { indent: 2, icon: '📄', name: 'page.tsx', color: '#61dafb' },
                  { indent: 2, icon: '📄', name: 'layout.tsx', color: '#61dafb' },
                  { indent: 1, icon: '📁', name: 'components/', color: '#a8ffa8' },
                  { indent: 2, icon: '📄', name: 'Hero.tsx', color: '#61dafb' },
                  { indent: 1, icon: '📁', name: 'lib/', color: '#a8ffa8' },
                  { indent: 2, icon: '📄', name: 'db.ts', color: '#68a063' },
                  { indent: 1, icon: '📄', name: 'next.config.ts', color: '#4a7c59' },
                  { indent: 1, icon: '📄', name: 'tailwind.config.ts', color: '#06b6d4' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 hover:bg-[#0d2b0d] px-1 rounded transition-colors duration-150 cursor-default" style={{ paddingLeft: `${f.indent * 12 + 4}px` }}>
                    <span>{f.icon}</span>
                    <span style={{ color: f.color }}>{f.name}</span>
                  </div>
                ))}
              </div>

              {/* Code snippet */}
              <div className="p-4 font-mono text-xs space-y-0.5">
                {[
                  { t: 'comment', v: '// app/page.tsx — Server Component' },
                  { t: 'keyword', v: "import type { Metadata } from 'next'" },
                  { t: 'keyword', v: "import { Hero } from '@/components/Hero'" },
                  { t: 'blank', v: '' },
                  { t: 'keyword', v: 'export const metadata: Metadata = {' },
                  { t: 'string', v: "  title: 'My WebApp | Production Ready'," },
                  { t: 'normal', v: '}' },
                  { t: 'blank', v: '' },
                  { t: 'keyword', v: 'export default function Page() {' },
                  { t: 'func', v: '  return <Hero />' },
                  { t: 'normal', v: '}' },
                ].map((line, i) => {
                  const colors: Record<string, string> = {
                    comment: '#2d6b2d', keyword: '#569cd6', string: '#ce9178',
                    func: '#dcdcaa', normal: '#a8ffa8', blank: 'transparent',
                  };
                  return (
                    <div key={i} className="flex gap-3">
                      <span className="text-[#1a3a1a] w-4 text-right shrink-0 select-none">{i + 1}</span>
                      <span style={{ color: colors[line.t] }}>{line.v}&nbsp;</span>
                    </div>
                  );
                })}
                <div className="flex gap-3">
                  <span className="text-[#1a3a1a] w-4 text-right shrink-0 select-none">12</span>
                  <span className="blink text-[#00ff41]">▮</span>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 py-1.5 border-t border-[#0d2b0d] bg-[#020c02]">
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1 text-[#4a7c59]"><GitCommit className="w-3 h-3" />main</span>
                  <span className="flex items-center gap-1 text-[#00ff41]"><CheckCircle2 className="w-3 h-3" />No errors</span>
                </div>
                <span className="text-[#1a3a1a] text-[10px]">TypeScript — UTF-8 — LF</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 border-t border-[#0d2b0d]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-[#2d6b2d] text-xs tracking-[0.3em] uppercase block mb-3">{'// services.map(s => <Card key={s.id} {...s} />)'}</span>
              <h2 className="orbitron text-3xl md:text-4xl font-black">
                <span className="text-[#a8ffa8]">WHAT WE</span>{' '}
                <span className="text-[#00ff41] phosphor-glow">BUILD</span>
              </h2>
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => <ServiceCard key={i} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 border-t border-[#0d2b0d]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-[#2d6b2d] text-xs tracking-[0.3em] uppercase block mb-3">{'// PROCESS.forEach(phase => execute(phase))'}</span>
              <h2 className="orbitron text-3xl md:text-4xl font-black">
                <span className="text-[#a8ffa8]">THE</span>{' '}
                <span className="text-[#00ff41] phosphor-glow">PIPELINE</span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((p, i) => {
              const ref = useRef<HTMLDivElement>(null);
              const inView = useInView(ref, { once: true, margin: '-40px' });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-[#0d2b0d] hover:border-[#00ff41]/25 bg-[#010d01] rounded-lg p-5 group transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded border border-[#0d2b0d] bg-[#020c02] flex items-center justify-center">
                      <span className="text-[#00ff41] orbitron font-black text-sm phosphor-glow-sm">{i + 1}</span>
                    </div>
                    <span className="text-[10px] tracking-[0.3em] text-[#1a3a1a] group-hover:text-[#2d6b2d] transition-colors duration-300 orbitron">{p.step}</span>
                  </div>
                  <h3 className="text-[#a8ffa8] font-bold text-sm mb-2 group-hover:text-white transition-colors duration-300">{p.title}</h3>
                  <p className="text-[#4a7c59] text-xs leading-relaxed mb-4">{p.desc}</p>
                  <div className="border-t border-[#0d2b0d] pt-3 font-mono text-[10px] flex items-center gap-2">
                    <span className="text-[#1a3a1a]">$</span>
                    <span className="text-[#2d6b2d] group-hover:text-[#4a7c59] transition-colors duration-300 truncate">{p.cmd}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS ROW ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 px-4 sm:px-6 border-t border-[#0d2b0d]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '200+', sub: 'sites_deployed', icon: <Rocket className="w-5 h-5" /> },
              { val: '99.9%', sub: 'uptime_sla', icon: <Zap className="w-5 h-5" /> },
              { val: '<80ms', sub: 'ttfb_avg', icon: <Cpu className="w-5 h-5" /> },
              { val: '4.9★', sub: 'client_rating', icon: <Star className="w-5 h-5" /> },
            ].map((s, i) => {
              const ref = useRef<HTMLDivElement>(null);
              const inView = useInView(ref, { once: true });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.04 }}
                  className="border border-[#0d2b0d] hover:border-[#00ff41]/20 bg-[#010d01] rounded-lg p-5 text-center group transition-all duration-300"
                >
                  <div className="text-[#2d6b2d] group-hover:text-[#00ff41] mb-3 flex justify-center transition-colors duration-300">{s.icon}</div>
                  <div className="orbitron text-2xl font-black text-[#00ff41] phosphor-glow mb-1">{s.val}</div>
                  <div className="text-[#2d6b2d] text-[10px] tracking-widest">{s.sub}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-[#0d2b0d] hover:border-[#00ff41]/20 bg-[#010d01] rounded-2xl overflow-hidden transition-colors duration-500"
          >
            {/* Top phosphor line */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00ff41, transparent)', boxShadow: '0 0 10px #00ff41' }} />

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,255,65,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative p-10 sm:p-16 text-center">
              {/* Terminal prompt heading */}
              <div className="inline-block border border-[#0d2b0d] bg-[#020c02] px-4 py-2 rounded mb-8 font-mono text-xs">
                <span className="text-[#4a7c59]">user@webdev:~$</span>{' '}
                <span className="text-[#00ff41]">./launch_project.sh</span>
                <span className="blink text-[#00ff41] ml-1">█</span>
              </div>

              <h2 className="orbitron text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-5">
                <span className="text-[#a8ffa8]">READY TO</span>{' '}
                <span className="text-[#00ff41] phosphor-glow">DEPLOY?</span>
              </h2>

              <p className="text-[#4a7c59] max-w-xl mx-auto mb-10 text-sm leading-relaxed">
                {'/* Let\'s architect your next web project. '}<br />
                {'   Free technical discovery call within 24h. */'  }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group px-8 py-3.5 bg-[#00ff41] text-[#010801] font-black text-sm tracking-widest rounded flex items-center justify-center gap-2 orbitron"
                  style={{ boxShadow: '0 0 20px rgba(0,255,65,0.4), 0 0 60px rgba(0,255,65,0.15)' }}
                >
                  <Rocket className="w-4 h-4" />
                  BOOK_CALL.EXE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04, borderColor: 'rgba(0,255,65,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3.5 border border-[#0d2b0d] text-[#4a7c59] hover:text-[#00ff41] font-black text-sm tracking-widest rounded flex items-center justify-center gap-2 transition-all duration-300 orbitron"
                >
                  <Package className="w-4 h-4" />
                  VIEW_PRICING
                </motion.button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#0d2b0d]">
                {[
                  { icon: <RefreshCw className="w-4 h-4" />, title: 'SPRINT_CYCLE := 2w', desc: 'Agile sprints with weekly demos' },
                  { icon: <Lock className="w-4 h-4" />, title: 'NDA_SIGNED := day_1', desc: 'Full IP protection from first call' },
                  { icon: <Zap className="w-4 h-4" />, title: 'MVP_ETA := 6_weeks', desc: 'Guaranteed production timeline' },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-8 h-8 border border-[#0d2b0d] bg-[#020c02] rounded flex items-center justify-center text-[#00ff41]">{b.icon}</div>
                    <span className="font-mono text-[10px] text-[#2d6b2d] tracking-wider">{b.title}</span>
                    <span className="text-[#1a3a1a] text-xs text-center">{b.desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER BAR ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-[#0d2b0d] py-5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-[#00ff41]" />
            <span className="orbitron text-xs text-[#2d6b2d]">WEBDEV © 2025</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#1a3a1a]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] blink" />
            <span className="text-[#2d6b2d]">all_systems_operational</span>
          </div>
          <div className="font-mono text-[10px] text-[#1a3a1a]">
            next@15 · ts@5.7 · turbopack
          </div>
        </div>
      </div>
    </div>
  );
}