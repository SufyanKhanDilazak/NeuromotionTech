"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import {
  Brain, Cpu, Zap, Activity, Shield, Terminal,
  Network, ChevronRight, Settings2, Database,
  Eye, Mic, Sparkles, Lock, Bot,
  Code2, TrendingUp, CheckCircle2,
  AlertCircle, Radar,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

type AgentStatus = "active" | "idle" | "processing" | "offline";

interface Agent {
  id: string;
  name: string;
  codename: string;
  status: AgentStatus;
  role: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
  tasks: number;
  uptime: string;
  efficiency: number;
  capabilities: string[];
  lastAction: string;
  version: string;
  framework: string;
}

interface StatItem {
  label: string;
  value: string;
  delta: string;
  icon: React.ElementType;
  color: string;
}

// ─── Static Data ────────────────────────────────────────────────────────────

const AGENTS: Agent[] = [
  {
    id: "AGT-001",
    name: "NEXUS",
    codename: "Orchestration Core",
    status: "active",
    role: "Multi-Agent Orchestrator",
    description:
      "Master orchestration unit powered by LangGraph workflows. Manages agent graphs, state machines, and conditional routing across the entire fleet with sub-10ms handoff latency.",
    icon: Brain,
    accentColor: "#00ff88",
    glowColor: "rgba(0,255,136,0.12)",
    tasks: 2847,
    uptime: "99.97%",
    efficiency: 97,
    capabilities: ["LangGraph routing", "State machines", "Fault tolerance", "Priority queuing"],
    lastAction: "Delegated 12 sub-tasks via LangGraph conditional edge",
    version: "v4.2.1",
    framework: "LangGraph",
  },
  {
    id: "AGT-002",
    name: "CIPHER",
    codename: "Data Intelligence Unit",
    status: "processing",
    role: "RAG & Data Pipeline",
    description:
      "CrewAI-powered data agent handling semantic chunking, vector indexing, and knowledge retrieval. Specializes in multi-step reasoning chains with OpenAI embeddings under the hood.",
    icon: Database,
    accentColor: "#00d4ff",
    glowColor: "rgba(0,212,255,0.12)",
    tasks: 14293,
    uptime: "99.89%",
    efficiency: 94,
    capabilities: ["CrewAI tasks", "RAG pipelines", "OpenAI embeddings", "Stream processing"],
    lastAction: "Processed 3.2GB corpus via CrewAI crew.kickoff()",
    version: "v3.8.4",
    framework: "CrewAI",
  },
  {
    id: "AGT-003",
    name: "HERALD",
    codename: "Integration Mesh",
    status: "active",
    role: "API & Tool Orchestration",
    description:
      "Built on OpenAI Agents SDK with 200+ function tools. Handles bidirectional API sync, webhook routing, and Responses API streaming for real-time integrations at scale.",
    icon: Network,
    accentColor: "#ff6b35",
    glowColor: "rgba(255,107,53,0.12)",
    tasks: 31047,
    uptime: "99.99%",
    efficiency: 99,
    capabilities: ["OpenAI Agents SDK", "Function tools", "Webhook routing", "Responses API"],
    lastAction: "Synced 58 endpoints via Agents SDK tool_call",
    version: "v5.1.0",
    framework: "OpenAI Agents SDK",
  },
  {
    id: "AGT-004",
    name: "SENTINEL",
    codename: "Security Guardian",
    status: "active",
    role: "Security & Compliance AI",
    description:
      "Autonomous threat intelligence agent using LangChain agents for continuous PII scanning, compliance auditing, and real-time incident response with zero human intervention.",
    icon: Shield,
    accentColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.12)",
    tasks: 4182,
    uptime: "100%",
    efficiency: 100,
    capabilities: ["LangChain agents", "PII detection", "SOC2 audit", "Auto-remediation"],
    lastAction: "Blocked 3 anomalies via LangChain ReAct loop",
    version: "v6.0.2",
    framework: "LangChain",
  },
  {
    id: "AGT-005",
    name: "SPECTRA",
    codename: "Vision Processing Unit",
    status: "active",
    role: "Multimodal Vision AI",
    description:
      "Multimodal agent running on GPT-4o via OpenAI Agents SDK. Processes images, video frames, and documents with structured output extraction at enterprise scale.",
    icon: Eye,
    accentColor: "#a855f7",
    glowColor: "rgba(168,85,247,0.12)",
    tasks: 8721,
    uptime: "99.94%",
    efficiency: 96,
    capabilities: ["GPT-4o Vision", "Structured outputs", "OCR & extraction", "Spatial mapping"],
    lastAction: "Analyzed 847 images via Responses API with vision",
    version: "v2.9.7",
    framework: "OpenAI Agents SDK",
  },
  {
    id: "AGT-006",
    name: "VOXEL",
    codename: "Voice Interface Node",
    status: "idle",
    role: "Audio & Voice AI",
    description:
      "AutoGen-powered conversational agent with real-time TTS/STT pipelines. Handles multi-agent voice conversations, speaker diarization, and multilingual translation autonomously.",
    icon: Mic,
    accentColor: "#ec4899",
    glowColor: "rgba(236,72,153,0.12)",
    tasks: 6934,
    uptime: "98.71%",
    efficiency: 88,
    capabilities: ["AutoGen ConversableAgent", "TTS/STT streams", "Diarization", "Auto-translation"],
    lastAction: "Transcribed 2h 14m meeting via AutoGen pipeline",
    version: "v2.3.1",
    framework: "AutoGen",
  },
];

const STATS: StatItem[] = [
  { label: "Active Agents", value: "5/6", delta: "+2 this week", icon: Bot, color: "#00ff88" },
  { label: "Tasks Completed", value: "68,024", delta: "+12.4% today", icon: CheckCircle2, color: "#00d4ff" },
  { label: "Avg Efficiency", value: "95.7%", delta: "+3.2% vs last month", icon: TrendingUp, color: "#a855f7" },
  { label: "System Uptime", value: "99.96%", delta: "45d 13h 22m", icon: Activity, color: "#f59e0b" },
];

const FRAMEWORKS = [
  { name: "LangGraph", desc: "Stateful agent graphs", color: "#00ff88" },
  { name: "CrewAI", desc: "Multi-agent crews", color: "#00d4ff" },
  { name: "OpenAI Agents SDK", desc: "Tool-use & handoffs", color: "#ff6b35" },
  { name: "LangChain", desc: "ReAct & chain agents", color: "#f59e0b" },
  { name: "AutoGen", desc: "Conversable agents", color: "#ec4899" },
  { name: "Responses API", desc: "Streaming outputs", color: "#a855f7" },
];

const TERMINAL_LINES = [
  { text: "[NEXUS:LangGraph] Conditional edge routed → CIPHER node active", color: "#00ff88" },
  { text: "[CIPHER:CrewAI] crew.kickoff() → Task 3849 complete, 99.1% accuracy", color: "#00d4ff" },
  { text: "[SENTINEL:LangChain] ReAct loop iteration 4 — threat neutralized", color: "#f59e0b" },
  { text: "[HERALD:OpenAI] tool_call:fetch_api completed in 12ms", color: "#ff6b35" },
  { text: "[SPECTRA:GPT-4o] Vision extraction — 847 images processed", color: "#a855f7" },
  { text: "[SYS] LangGraph state checkpoint saved — version 4829", color: "#00ff88" },
  { text: "[NEXUS] Handoff → SENTINEL via OpenAI Agents SDK handoff()", color: "#00ff88" },
  { text: "[VOXEL:AutoGen] ConversableAgent session initialized — ready", color: "#ec4899" },
  { text: "[CIPHER] Knowledge graph updated — 2.3M nodes indexed via CrewAI", color: "#00d4ff" },
  { text: "[HERALD] Responses API stream active — 58 webhook endpoints synced", color: "#ff6b35" },
];

// ─── SVG Robot ───────────────────────────────────────────────────────────────

interface RobotSVGProps {
  color?: string;
  size?: number;
  animated?: boolean;
}

function RobotSVG({ color = "#00ff88", size = 56, animated = false }: RobotSVGProps) {
  const eyeBlink = animated
    ? { animate: { opacity: [1, 0.15, 1] }, transition: { duration: 2.8, repeat: Infinity } }
    : {};
  const chestPulse = animated
    ? { animate: { opacity: [0.4, 1, 0.4], r: [2.2, 3.2, 2.2] }, transition: { duration: 1, repeat: Infinity } }
    : {};
  const antennaPulse = animated
    ? { animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 1.3, repeat: Infinity } }
    : {};

  return (
    <svg width={size} height={size} viewBox="0 0 56 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Antenna */}
      <motion.line x1="28" y1="4" x2="28" y2="13" stroke={color} strokeWidth="1.5" strokeLinecap="round" {...antennaPulse} />
      <motion.circle cx="28" cy="3" r="2" fill={color} {...antennaPulse} />

      {/* Head */}
      <rect x="15" y="13" width="26" height="19" rx="4" stroke={color} strokeWidth="1.4" fill={`${color}08`} />

      {/* Eyes */}
      <motion.rect x="20" y="18" width="5.5" height="5.5" rx="1.2" fill={color} {...(animated ? { animate: { opacity: [1, 0.15, 1] }, transition: { duration: 2.8, repeat: Infinity, delay: 0 } } : {})} />
      <motion.rect x="30.5" y="18" width="5.5" height="5.5" rx="1.2" fill={color} {...(animated ? { animate: { opacity: [1, 0.15, 1] }, transition: { duration: 2.8, repeat: Infinity, delay: 0.18 } } : {})} />

      {/* Mouth grill */}
      {[0, 3, 6].map((offset) => (
        <line key={offset} x1={`${22 + offset}`} y1="27" x2={`${22 + offset}`} y2="29" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.45" />
      ))}

      {/* Neck */}
      <rect x="25.5" y="32" width="5" height="5" rx="1" stroke={color} strokeWidth="1" fill={`${color}10`} opacity="0.6" />

      {/* Body */}
      <rect x="13" y="37" width="30" height="18" rx="3.5" stroke={color} strokeWidth="1.4" fill={`${color}06`} />

      {/* Chest light */}
      <motion.circle cx="28" cy="46" r="3" fill={color} {...chestPulse} />

      {/* Side vents */}
      <line x1="17" y1="43" x2="23" y2="43" stroke={color} strokeWidth="0.9" opacity="0.35" />
      <line x1="17" y1="46" x2="21" y2="46" stroke={color} strokeWidth="0.9" opacity="0.25" />
      <line x1="33" y1="43" x2="39" y2="43" stroke={color} strokeWidth="0.9" opacity="0.35" />
      <line x1="35" y1="46" x2="39" y2="46" stroke={color} strokeWidth="0.9" opacity="0.25" />

      {/* Arms */}
      <rect x="5" y="38" width="7" height="13" rx="3" stroke={color} strokeWidth="1.2" fill={`${color}06`} opacity="0.65" />
      <rect x="44" y="38" width="7" height="13" rx="3" stroke={color} strokeWidth="1.2" fill={`${color}06`} opacity="0.65" />
      {/* Hand dots */}
      <circle cx="8.5" cy="52.5" r="1.5" fill={color} opacity="0.4" />
      <circle cx="47.5" cy="52.5" r="1.5" fill={color} opacity="0.4" />

      {/* Legs */}
      <rect x="17" y="56" width="9" height="3.5" rx="1.5" stroke={color} strokeWidth="1" fill={`${color}08`} opacity="0.55" />
      <rect x="30" y="56" width="9" height="3.5" rx="1.5" stroke={color} strokeWidth="1" fill={`${color}08`} opacity="0.55" />
    </svg>
  );
}

// ─── Animated Canvas Background ─────────────────────────────────────────────

function RoboticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let time = 0;

    interface Pt { x: number; y: number; vy: number; size: number; alpha: number }
    const pts: Pt[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vy: Math.random() * 0.3 + 0.07,
      size: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.4 + 0.12,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawHex = (cx: number, cy: number, r: number, strokeColor: string) => {
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
        const method = i === 0 ? "moveTo" : "lineTo";
        ctx[method](cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };

    const nodes = [
      { x: 0.08, y: 0.18 }, { x: 0.88, y: 0.12 }, { x: 0.94, y: 0.72 },
      { x: 0.04, y: 0.82 }, { x: 0.5, y: 0.04 }, { x: 0.5, y: 0.96 },
      { x: 0.72, y: 0.44 }, { x: 0.25, y: 0.56 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.004;
      const W = canvas.width;
      const H = canvas.height;

      // Grid
      ctx.strokeStyle = "rgba(0,255,136,0.028)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 55) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 55) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Scan line
      const sy = ((time * 72) % (H + 140)) - 70;
      const sg = ctx.createLinearGradient(0, sy - 50, 0, sy + 50);
      sg.addColorStop(0, "transparent");
      sg.addColorStop(0.5, "rgba(0,255,136,0.032)");
      sg.addColorStop(1, "transparent");
      ctx.fillStyle = sg;
      ctx.fillRect(0, sy - 50, W, 100);

      // Hex nodes + connections + traveling dots
      nodes.forEach((n, i) => {
        const px = n.x * W;
        const py = n.y * H;
        const pulse = Math.sin(time * 1.6 + i * 1.3) * 0.5 + 0.5;
        drawHex(px, py, 18 + pulse * 5, `rgba(0,255,136,${0.035 + pulse * 0.055})`);

        const next = nodes[(i + 1) % nodes.length];
        const nx = next.x * W;
        const ny = next.y * H;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,212,255,${0.012 + pulse * 0.022})`;
        ctx.lineWidth = 0.4;
        ctx.setLineDash([3, 18]);
        ctx.moveTo(px, py);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        ctx.setLineDash([]);

        const t2 = ((time * 0.48 + i * 0.3) % 1);
        ctx.beginPath();
        ctx.arc(px + (nx - px) * t2, py + (ny - py) * t2, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,136,${0.25 + pulse * 0.35})`;
        ctx.fill();
      });

      // Floating particles
      for (const p of pts) {
        p.y -= p.vy;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        const a = p.alpha * (Math.sin(time * 1.8 + p.x) * 0.28 + 0.72);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,136,${a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

// ─── Status Badge ────────────────────────────────────────────────────────────

const STATUS_CFG: Record<AgentStatus, { label: string; color: string; bg: string }> = {
  active:     { label: "ACTIVE",     color: "#00ff88", bg: "rgba(0,255,136,0.1)"  },
  processing: { label: "PROCESSING", color: "#00d4ff", bg: "rgba(0,212,255,0.1)"  },
  idle:       { label: "STANDBY",    color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  offline:    { label: "OFFLINE",    color: "#ff4444", bg: "rgba(255,68,68,0.1)"  },
};

function StatusBadge({ status }: { status: AgentStatus }) {
  const c = STATUS_CFG[status];
  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold tracking-widest whitespace-nowrap"
      style={{ color: c.color, backgroundColor: c.bg, border: `1px solid ${c.color}30` }}
    >
      <motion.span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: c.color }}
        animate={status !== "offline" ? { opacity: [1, 0.2, 1] } : { opacity: 0.35 }}
        transition={{ duration: 1.3, repeat: Infinity }}
      />
      {c.label}
    </div>
  );
}

// ─── Agent Card ──────────────────────────────────────────────────────────────

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group"
    >
      {/* Glow bloom */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        style={{ background: agent.glowColor, filter: "blur(30px)", transform: "scale(1.07)" }}
      />

      <motion.div
        animate={{ y: hovered ? -5 : 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative rounded-xl overflow-hidden flex flex-col h-full"
        style={{
          background: "linear-gradient(145deg,rgba(9,9,12,0.97) 0%,rgba(14,14,20,0.99) 100%)",
          border: `1px solid ${hovered ? agent.accentColor + "45" : "rgba(255,255,255,0.06)"}`,
          transition: "border-color 0.28s",
          boxShadow: hovered ? `0 0 35px ${agent.glowColor}` : "none",
        }}
      >
        {/* Top sweep line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg,transparent,${agent.accentColor},transparent)` }}
          animate={hovered ? { opacity: [0, 1, 0], scaleX: [0.3, 1, 0.3] } : { opacity: 0 }}
          transition={{ duration: 1.4, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
        />

        <div className="p-5 flex flex-col gap-4 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Robot icon box */}
              <div
                className="relative flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg,${agent.accentColor}14,${agent.accentColor}04)`,
                  border: `1px solid ${agent.accentColor}22`,
                }}
              >
                <motion.div
                  className="absolute inset-1 rounded-lg"
                  style={{ border: `1px dashed ${agent.accentColor}18` }}
                  animate={agent.status !== "offline" ? { rotate: 360 } : {}}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <RobotSVG color={agent.accentColor} size={40} animated={agent.status === "active" || agent.status === "processing"} />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className="text-base font-black tracking-widest"
                    style={{ fontFamily: "'Orbitron',monospace", color: agent.accentColor }}
                  >
                    {agent.name}
                  </h3>
                  <span className="text-[9px] font-mono text-zinc-800">{agent.id}</span>
                </div>
                <p className="text-[11px] font-mono text-zinc-600 mt-0.5">{agent.codename}</p>
              </div>
            </div>
            <StatusBadge status={agent.status} />
          </div>

          {/* Framework + role */}
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="text-[10px] font-mono px-2.5 py-0.5 rounded-sm tracking-wider font-bold"
              style={{ color: agent.accentColor, background: agent.accentColor + "12", border: `1px solid ${agent.accentColor}20` }}
            >
              ⬡ {agent.framework}
            </div>
            <span className="text-[10px] font-mono text-zinc-700">{agent.role}</span>
            <span className="text-[9px] font-mono text-zinc-800 ml-auto">{agent.version}</span>
          </div>

          {/* Description */}
          <p className="text-[12px] text-zinc-400 leading-relaxed font-mono flex-1">{agent.description}</p>

          {/* Efficiency bar */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] font-mono text-zinc-700 tracking-widest uppercase">Efficiency</span>
              <motion.span
                className="text-[11px] font-mono font-bold"
                style={{ color: agent.accentColor }}
                animate={hovered ? { opacity: [1, 0.45, 1] } : { opacity: 1 }}
                transition={{ duration: 0.85, repeat: hovered ? Infinity : 0 }}
              >
                {agent.efficiency}%
              </motion.span>
            </div>
            <div className="h-1 rounded-full bg-zinc-900 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: `${agent.efficiency}%` } : { width: 0 }}
                transition={{ duration: 1.3, delay: index * 0.09 + 0.35, ease: "easeOut" }}
                style={{ background: `linear-gradient(90deg,${agent.accentColor}70,${agent.accentColor})` }}
              />
            </div>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Tasks", value: agent.tasks.toLocaleString() },
              { label: "Uptime", value: agent.uptime },
            ].map((s) => (
              <div
                key={s.label}
                className="p-2 rounded-md text-center"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest mb-0.5">{s.label}</p>
                <p className="text-xs font-mono font-bold text-zinc-300">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Capabilities */}
          <div className="flex flex-wrap gap-1.5">
            {agent.capabilities.map((cap) => (
              <span
                key={cap}
                className="text-[10px] font-mono px-2 py-0.5 rounded-sm"
                style={{ color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {cap}
              </span>
            ))}
          </div>

          {/* Terminal last action */}
          <div
            className="flex items-center gap-2 p-2.5 rounded-md"
            style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.04)" }}
          >
            <Terminal size={11} style={{ color: agent.accentColor }} className="flex-shrink-0" />
            <span className="text-[10px] font-mono text-zinc-600 truncate">&gt;_{agent.lastAction}</span>
          </div>

          {/* Hover CTA */}
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex gap-2 pt-1">
              <Link href="/info/contact" className="flex-1">
                <button
                  className="w-full py-2 rounded-md text-[11px] font-mono font-bold tracking-wider transition-all"
                  style={{ background: agent.accentColor + "14", border: `1px solid ${agent.accentColor}35`, color: agent.accentColor }}
                >
                  CONFIGURE
                </button>
              </Link>
              <Link href="/info/contact" className="flex-1">
                <button
                  className="w-full py-2 rounded-md text-[11px] font-mono font-bold tracking-wider"
                  style={{ background: agent.accentColor, color: "#000" }}
                >
                  DEPLOY →
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Corner marks */}
        <div className="absolute top-2 right-2 w-3 h-3" style={{ borderTop: `1px solid ${agent.accentColor}28`, borderRight: `1px solid ${agent.accentColor}28` }} />
        <div className="absolute bottom-2 left-2 w-3 h-3" style={{ borderBottom: `1px solid ${agent.accentColor}28`, borderLeft: `1px solid ${agent.accentColor}28` }} />
      </motion.div>
    </motion.div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.48, delay: index * 0.07 }}
      className="relative p-4 sm:p-5 rounded-lg overflow-hidden"
      style={{ background: "linear-gradient(135deg,rgba(9,9,12,0.95),rgba(14,14,20,0.98))", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] font-mono text-zinc-700 tracking-widest uppercase mb-2">{stat.label}</p>
          <p className="text-2xl sm:text-3xl font-black" style={{ fontFamily: "'Orbitron',monospace", color: stat.color }}>
            {stat.value}
          </p>
          <p className="text-[11px] font-mono text-zinc-600 mt-1.5">{stat.delta}</p>
        </div>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: stat.color + "12", border: `1px solid ${stat.color}20` }}>
          <Icon size={16} style={{ color: stat.color }} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${stat.color}28,transparent)` }} />
    </motion.div>
  );
}

// ─── Terminal Feed ────────────────────────────────────────────────────────────

function TerminalFeed() {
  const [lines, setLines] = useState<typeof TERMINAL_LINES>([]);
  const [blink, setBlink] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef(0);

  useEffect(() => {
    const add = () => {
      setLines((prev) => [...prev, TERMINAL_LINES[idxRef.current++ % TERMINAL_LINES.length]].slice(-7));
    };
    add();
    const t = setInterval(add, 1900);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 520);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "rgba(4,4,7,0.98)", border: "1px solid rgba(0,255,136,0.1)", boxShadow: "0 0 40px rgba(0,255,136,0.025)" }}
    >
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            {["rgba(255,59,48,0.55)", "rgba(255,190,6,0.55)", "rgba(50,215,75,0.55)"].map((bg, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ background: bg }} />
            ))}
          </div>
          <span className="text-[11px] font-mono text-zinc-700 ml-1">AGENT_OS — LIVE SYSTEM LOG</span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00ff88" }}
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <span className="text-[10px] font-mono text-zinc-700">STREAMING</span>
        </div>
      </div>

      <div ref={scrollRef} className="p-4 h-48 overflow-y-auto space-y-1.5" style={{ scrollbarWidth: "none" }}>
        {lines.map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}
            className="text-[11px] sm:text-xs font-mono flex gap-3 items-start"
          >
            <span className="text-zinc-800 flex-shrink-0 tabular-nums">{new Date().toLocaleTimeString("en", { hour12: false })}</span>
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
        <div className="text-[11px] font-mono flex gap-2 items-center">
          <span style={{ color: "#00ff88" }}>$</span>
          <span className="text-zinc-700">await agentOS.orchestrate()</span>
          <span style={{ opacity: blink ? 1 : 0, color: "#00ff88" }}>█</span>
        </div>
      </div>
    </div>
  );
}

// ─── Framework Strip ─────────────────────────────────────────────────────────

function FrameworkStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-10">
      <p className="text-[10px] font-mono text-zinc-700 tracking-widest uppercase text-center mb-5">
        POWERED BY INDUSTRY-LEADING AGENT FRAMEWORKS
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {FRAMEWORKS.map((fw, i) => (
          <motion.div
            key={fw.name}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ scale: 1.05, y: -3 }}
            className="relative p-3 rounded-lg text-center overflow-hidden cursor-default"
            style={{ background: "rgba(9,9,12,0.9)", border: `1px solid ${fw.color}18` }}
          >
            <div className="w-9 h-9 rounded-md mx-auto mb-2 flex items-center justify-center" style={{ background: fw.color + "10", border: `1px solid ${fw.color}18` }}>
              <RobotSVG color={fw.color} size={24} animated />
            </div>
            <p className="text-[10px] font-black font-mono tracking-wider leading-tight" style={{ color: fw.color }}>{fw.name}</p>
            <p className="text-[9px] font-mono text-zinc-700 mt-0.5">{fw.desc}</p>
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${fw.color}32,transparent)` }} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AgentsPage() {
  const [filter, setFilter] = useState<"all" | AgentStatus>("all");
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const filtered = filter === "all" ? AGENTS : AGENTS.filter((a) => a.status === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&display=swap');
        body { background: #030305; margin: 0; }
        *, *::before, *::after { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,136,0.16); border-radius: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div className="min-h-screen relative text-zinc-200" style={{ background: "#030305", fontFamily: "'Share Tech Mono', monospace" }}>
        <RoboticBackground />

        {/* Ambient radial glows */}
        <div className="fixed inset-0 pointer-events-none z-[1]"
          style={{ background: "radial-gradient(ellipse 70% 45% at 50% -10%,rgba(0,255,136,0.05) 0%,transparent 65%)" }} />
        <div className="fixed inset-0 pointer-events-none z-[1]"
          style={{ background: "radial-gradient(ellipse 50% 35% at 90% 55%,rgba(0,212,255,0.03) 0%,transparent 55%)" }} />

        <div className="relative z-10 flex flex-col min-h-screen">

          {/* ── NAVBAR ── */}
          <motion.header
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-50 backdrop-blur-2xl border-b"
            style={{ background: "rgba(3,3,5,0.85)", borderColor: "rgba(255,255,255,0.05)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)" }}>
                  <RobotSVG color="#00ff88" size={22} animated />
                </div>
                <span className="text-sm font-black tracking-widest" style={{ fontFamily: "'Orbitron',monospace", color: "#00ff88" }}>
                  AGENT<span style={{ color: "rgba(255,255,255,0.2)" }}>_OS</span>
                </span>
              </div>

              <nav className="hidden sm:flex items-center gap-6">
                {["Dashboard", "Agents", "Workflows", "Analytics", "Docs"].map((item) => (
                  <button key={item} className="text-[11px] tracking-widest uppercase transition-colors hover:text-zinc-300"
                    style={{ color: item === "Agents" ? "#00ff88" : "rgba(255,255,255,0.28)" }}>
                    {item}
                  </button>
                ))}
              </nav>

              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] flex-shrink-0"
                style={{ background: "rgba(0,255,136,0.07)", border: "1px solid rgba(0,255,136,0.18)", color: "#00ff88" }}
                animate={{ boxShadow: ["0 0 0px rgba(0,255,136,0)", "0 0 16px rgba(0,255,136,0.16)", "0 0 0px rgba(0,255,136,0)"] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                <Cpu size={10} />
                <span className="hidden sm:inline">ALL SYSTEMS ONLINE</span>
                <span className="sm:hidden">ONLINE</span>
              </motion.div>
            </div>
          </motion.header>

          <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-24">
            <div className="max-w-7xl mx-auto">

              {/* ── HERO ── */}
              <div ref={heroRef} className="pt-16 pb-12 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-sm text-[10px] tracking-widest uppercase"
                  style={{ color: "#00ff88", background: "rgba(0,255,136,0.07)", border: "1px solid rgba(0,255,136,0.2)" }}
                >
                  <Radar size={10} />
                  AI AGENT CONTROL CENTER
                  <ChevronRight size={10} />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.75, delay: 0.08 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight mb-4"
                  style={{ fontFamily: "'Orbitron',monospace" }}
                >
                  <span style={{ color: "#ffffff" }}>AUTONOMOUS</span>
                  <br />
                  <span style={{
                    background: "linear-gradient(135deg,#00ff88 0%,#00d4ff 45%,#a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    AGENT FLEET
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.18 }}
                  className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto leading-relaxed mb-4"
                >
                  Command your AI workforce built on LangGraph, CrewAI, and OpenAI Agents SDK.
                  Monitor, deploy, and orchestrate intelligent agents in real-time — at scale.
                </motion.p>

                {/* Framework name drops */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.28 }}
                  className="flex flex-wrap justify-center gap-2 mb-10"
                >
                  {["LangGraph", "CrewAI", "OpenAI Agents SDK", "AutoGen", "LangChain"].map((fw, i) => (
                    <motion.span
                      key={fw}
                      initial={{ opacity: 0, y: 8 }}
                      animate={heroInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.32 + i * 0.06 }}
                      className="text-[10px] px-2.5 py-1 rounded-sm tracking-wider"
                      style={{ color: "rgba(255,255,255,0.32)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      {fw}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Hero robots */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="flex justify-center items-end gap-4 sm:gap-6 mb-10"
                >
                  {[
                    { color: "#00d4ff", delay: 0.3, size: 52 },
                    { color: "#a855f7", delay: 0.6, size: 52 },
                    { color: "#00ff88", delay: 0,   size: 70 },
                    { color: "#ff6b35", delay: 0.9, size: 52 },
                    { color: "#f59e0b", delay: 1.2, size: 52 },
                  ].map((r, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -7, 0], rotate: [0, i % 2 === 0 ? 2.5 : -2.5, 0] }}
                      transition={{ duration: 2.6 + i * 0.35, repeat: Infinity, delay: r.delay, ease: "easeInOut" }}
                      style={{ filter: `drop-shadow(0 0 10px ${r.color}45)` }}
                    >
                      <RobotSVG color={r.color} size={r.size} animated />
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.38 }}
                  className="flex flex-wrap gap-3 justify-center"
                >
                  <Link href="/info/contact">
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-bold tracking-wider"
                      style={{ background: "#00ff88", color: "#000", fontFamily: "'Orbitron',monospace" }}
                    >
                      <Zap size={14} /> DEPLOY AGENT
                    </motion.button>
                  </Link>
                  <Link href="/info/contact">
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-bold tracking-wider"
                      style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
                    >
                      <Settings2 size={14} /> GET IN TOUCH
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* ── STATS ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.42 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
              >
                {STATS.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
              </motion.div>

              {/* ── FRAMEWORKS ── */}
              <FrameworkStrip />

              {/* ── TERMINAL ── */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Terminal size={12} style={{ color: "#00ff88" }} />
                  <span className="text-[10px] tracking-widest uppercase text-zinc-700">Live System Feed</span>
                </div>
                <TerminalFeed />
              </motion.div>

              {/* ── AGENT GRID HEADER ── */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-black tracking-widest text-white" style={{ fontFamily: "'Orbitron',monospace" }}>
                    DEPLOYED AGENTS
                  </h2>
                  <p className="text-[10px] text-zinc-700 mt-0.5">
                    {filtered.length} unit{filtered.length !== 1 ? "s" : ""}
                    {filter !== "all" && ` · ${filter}`}
                  </p>
                </div>

                <div className="flex items-center gap-1 p-1 rounded-lg flex-wrap"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  {(["all", "active", "processing", "idle"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className="px-3 py-1.5 rounded-md text-[10px] tracking-widest uppercase transition-all"
                      style={{
                        background: filter === f ? "rgba(0,255,136,0.1)" : "transparent",
                        color: filter === f ? "#00ff88" : "rgba(255,255,255,0.28)",
                        border: filter === f ? "1px solid rgba(0,255,136,0.22)" : "1px solid transparent",
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── AGENT CARDS ── */}
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((agent, i) => (
                    <AgentCard key={agent.id} agent={agent} index={i} />
                  ))}
                </div>
              </AnimatePresence>

              {filtered.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                  <AlertCircle size={28} className="mx-auto mb-3" style={{ color: "rgba(255,255,255,0.1)" }} />
                  <p className="text-zinc-700 text-sm font-mono">No agents match this filter.</p>
                </motion.div>
              )}

              {/* ── CTA BANNER ── */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mt-16 relative rounded-xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg,rgba(0,255,136,0.035) 0%,rgba(0,212,255,0.035) 50%,rgba(168,85,247,0.035) 100%)",
                  border: "1px solid rgba(0,255,136,0.12)",
                }}
              >
                <div className="p-8 sm:p-12 text-center">
                  {/* CTA robots */}
                  <div className="flex justify-center items-end gap-4 sm:gap-6 mb-7">
                    {[
                      { color: "#00d4ff", size: 44, delay: 0.4 },
                      { color: "#00ff88", size: 58, delay: 0 },
                      { color: "#a855f7", size: 44, delay: 0.7 },
                    ].map((r, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -8, 0], rotate: [0, i % 2 === 0 ? 3 : -3, 0] }}
                        transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
                        style={{ filter: `drop-shadow(0 0 12px ${r.color}40)` }}
                      >
                        <RobotSVG color={r.color} size={r.size} animated />
                      </motion.div>
                    ))}
                  </div>

                  <div
                    className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-sm text-[10px] tracking-widest"
                    style={{ color: "#00d4ff", background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.18)" }}
                  >
                    <Sparkles size={10} /> EXPAND YOUR FLEET
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 tracking-wide" style={{ fontFamily: "'Orbitron',monospace" }}>
                    READY TO AUTOMATE?
                  </h3>
                  <p className="text-sm text-zinc-500 max-w-md mx-auto mb-7 leading-relaxed font-mono">
                    Scale your intelligent automation with LangGraph, CrewAI, and OpenAI Agents SDK.
                    Add specialized AI robots tailored for your workflow.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link href="/info/contact">
                      <motion.button
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-md text-sm font-black tracking-widest"
                        style={{ background: "linear-gradient(135deg,#00ff88,#00d4ff)", color: "#000", fontFamily: "'Orbitron',monospace" }}
                      >
                        <Bot size={15} /> BROWSE AGENT LIBRARY
                      </motion.button>
                    </Link>
                    <Link href="/info/contact">
                      <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-md text-sm font-bold tracking-widest"
                        style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
                      >
                        <Code2 size={15} /> BUILD CUSTOM
                      </motion.button>
                    </Link>
                  </div>
                </div>

                {/* Corners */}
                {[
                  "top-3 left-3 border-t border-l",
                  "top-3 right-3 border-t border-r",
                  "bottom-3 left-3 border-b border-l",
                  "bottom-3 right-3 border-b border-r",
                ].map((cls, i) => (
                  <div key={i} className={`absolute w-4 h-4 ${cls}`} style={{ borderColor: "rgba(0,255,136,0.22)" }} />
                ))}
              </motion.div>

            </div>
          </main>

          {/* ── FOOTER ── */}
          <footer className="border-t px-4 sm:px-8 py-5" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <RobotSVG color="#00ff88" size={18} />
                <span className="text-[10px] text-zinc-700 font-mono">AGENT_OS v2.0.0</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap justify-center">
                {["LangGraph", "CrewAI", "OpenAI SDK", "AutoGen", "LangChain"].map((f) => (
                  <span key={f} className="text-[9px] text-zinc-800 tracking-widest uppercase font-mono">{f}</span>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <Lock size={9} style={{ color: "#00ff88" }} />
                <span className="text-[10px] text-zinc-700 font-mono">SOC2 TYPE II</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}