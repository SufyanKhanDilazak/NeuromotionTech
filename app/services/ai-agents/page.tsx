"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Brain, Cpu, Zap, Activity, Shield, Terminal,
  Network, ChevronRight, Database, Eye, Mic,
  Sparkles, Lock, Bot, Code2, TrendingUp,
  CheckCircle2, AlertCircle, Radar, GitBranch,
  Server, Layers, Settings, Wifi, BarChart3,
  ArrowRight, Binary, Braces, Workflow,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type AgentStatus = "active" | "idle" | "processing" | "offline";

interface Agent {
  id: string; name: string; codename: string; status: AgentStatus;
  role: string; description: string; icon: React.ElementType;
  gradient: string; accentColor: string; glowColor: string;
  tasks: number; uptime: string; efficiency: number;
  capabilities: string[]; lastAction: string;
  version: string; framework: string; frameworkColor: string; model: string;
}

interface StatItem {
  label: string; value: string; delta: string;
  icon: React.ElementType; gradient: string; color: string;
}

interface Framework {
  name: string; desc: string; color: string; bg: string;
  icon: React.ElementType; useCase: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const AGENTS: Agent[] = [
  {
    id: "AGT-001", name: "NEXUS", codename: "Master Orchestrator",
    status: "active", role: "Multi-Agent Orchestrator",
    description: "Stateful LangGraph agent graph running conditional edge routing across 6 sub-agents. Manages checkpointing, memory, and human-in-the-loop breakpoints with sub-10ms handoff.",
    icon: Brain,
    gradient: "linear-gradient(135deg,#f953c6,#b91d73)",
    accentColor: "#f953c6", glowColor: "rgba(249,83,198,0.3)",
    tasks: 2847, uptime: "99.97%", efficiency: 97,
    capabilities: ["LangGraph StateGraph", "Conditional edges", "Memory checkpoints", "HITL breakpoints"],
    lastAction: "graph.invoke() → routed to CIPHER via conditional_edge",
    version: "v4.2.1", framework: "LangGraph", frameworkColor: "#f953c6", model: "GPT-4o",
  },
  {
    id: "AGT-002", name: "CIPHER", codename: "Data Intelligence Core",
    status: "processing", role: "RAG & Knowledge Pipeline",
    description: "CrewAI crew with 4 specialized sub-agents: Researcher, Analyst, Indexer, Summarizer. Orchestrated via crew.kickoff() with role-based task delegation and shared memory.",
    icon: Database,
    gradient: "linear-gradient(135deg,#4facfe,#00f2fe)",
    accentColor: "#4facfe", glowColor: "rgba(79,172,254,0.3)",
    tasks: 14293, uptime: "99.89%", efficiency: 94,
    capabilities: ["CrewAI crew.kickoff()", "Role-based agents", "RAG pipelines", "Vector indexing"],
    lastAction: "CrewAI crew.kickoff() → 3.2GB corpus indexed, 99.1% acc",
    version: "v3.8.4", framework: "CrewAI", frameworkColor: "#4facfe", model: "GPT-4o-mini",
  },
  {
    id: "AGT-003", name: "HERALD", codename: "Integration Mesh Node",
    status: "active", role: "API & Tool Orchestration",
    description: "OpenAI Agents SDK with 200+ registered function tools. Handles tool_call streaming via Responses API, agent handoffs, and bidirectional webhook sync at enterprise scale.",
    icon: Network,
    gradient: "linear-gradient(135deg,#43e97b,#38f9d7)",
    accentColor: "#43e97b", glowColor: "rgba(67,233,123,0.3)",
    tasks: 31047, uptime: "99.99%", efficiency: 99,
    capabilities: ["OpenAI Agents SDK", "Responses API", "tool_call streaming", "Agent handoffs"],
    lastAction: "SDK tool_call:webhook_sync → 58 endpoints in 12ms",
    version: "v5.1.0", framework: "OpenAI Agents SDK", frameworkColor: "#43e97b", model: "GPT-4o",
  },
  {
    id: "AGT-004", name: "SENTINEL", codename: "Security Guardian Unit",
    status: "active", role: "Security & Compliance AI",
    description: "LangChain ReAct agent running continuous threat loops. Uses AgentExecutor with custom tools for PII scanning, SOC2 audits, and real-time incident response chains.",
    icon: Shield,
    gradient: "linear-gradient(135deg,#fa709a,#fee140)",
    accentColor: "#fa709a", glowColor: "rgba(250,112,154,0.3)",
    tasks: 4182, uptime: "100%", efficiency: 100,
    capabilities: ["LangChain ReAct", "AgentExecutor", "PII scanning", "SOC2 compliance"],
    lastAction: "LangChain AgentExecutor.run() → 3 threats blocked",
    version: "v6.0.2", framework: "LangChain", frameworkColor: "#fa709a", model: "GPT-4o",
  },
  {
    id: "AGT-005", name: "SPECTRA", codename: "Vision Processing Unit",
    status: "active", role: "Multimodal Vision AI",
    description: "OpenAI Agents SDK multimodal agent with GPT-4o vision. Structured output extraction via Responses API with image_url tool, OCR pipelines, and spatial reasoning chains.",
    icon: Eye,
    gradient: "linear-gradient(135deg,#a18cd1,#fbc2eb)",
    accentColor: "#a18cd1", glowColor: "rgba(161,140,209,0.3)",
    tasks: 8721, uptime: "99.94%", efficiency: 96,
    capabilities: ["GPT-4o Vision", "Structured outputs", "Responses API", "Spatial reasoning"],
    lastAction: "Responses API vision → 847 images extracted in 1.2s",
    version: "v2.9.7", framework: "OpenAI Agents SDK", frameworkColor: "#a18cd1", model: "GPT-4o",
  },
  {
    id: "AGT-006", name: "VOXEL", codename: "Voice Interface Processor",
    status: "idle", role: "Audio & Conversational AI",
    description: "AutoGen ConversableAgent with real-time TTS/STT pipelines. Multi-agent voice conversations via GroupChat, speaker diarization, and 40-language translation autonomously.",
    icon: Mic,
    gradient: "linear-gradient(135deg,#f6d365,#fda085)",
    accentColor: "#fda085", glowColor: "rgba(253,160,133,0.3)",
    tasks: 6934, uptime: "98.71%", efficiency: 88,
    capabilities: ["AutoGen GroupChat", "ConversableAgent", "TTS/STT streams", "Diarization"],
    lastAction: "AutoGen GroupChat → 2h 14m session transcribed",
    version: "v2.3.1", framework: "AutoGen", frameworkColor: "#fda085", model: "GPT-4o-audio",
  },
];

const FRAMEWORKS: Framework[] = [
  {
    name: "LangGraph", desc: "Stateful agent graphs with conditional routing, memory checkpoints & human-in-the-loop.",
    color: "#f953c6", bg: "rgba(249,83,198,0.08)", icon: GitBranch, useCase: "Orchestration",
  },
  {
    name: "CrewAI", desc: "Role-based multi-agent crews with shared memory, task delegation & crew.kickoff().",
    color: "#4facfe", bg: "rgba(79,172,254,0.08)", icon: Layers, useCase: "Team Agents",
  },
  {
    name: "OpenAI Agents SDK", desc: "Function tools, agent handoffs, Responses API streaming & structured outputs.",
    color: "#43e97b", bg: "rgba(67,233,123,0.08)", icon: Braces, useCase: "Tool Calling",
  },
  {
    name: "LangChain", desc: "ReAct loops, AgentExecutor chains, custom tools & memory-backed reasoning.",
    color: "#fa709a", bg: "rgba(250,112,154,0.08)", icon: Workflow, useCase: "Chain Agents",
  },
  {
    name: "AutoGen", desc: "ConversableAgent, GroupChat multi-agent dialogue & code execution pipelines.",
    color: "#fda085", bg: "rgba(253,160,133,0.08)", icon: Bot, useCase: "Conversation",
  },
  {
    name: "Responses API", desc: "OpenAI streaming completions, tool_call events & real-time output parsing.",
    color: "#a18cd1", bg: "rgba(161,140,209,0.08)", icon: Wifi, useCase: "Streaming",
  },
];

const STATS: StatItem[] = [
  { label: "Active Agents", value: "5/6", delta: "+2 this week", icon: Bot, gradient: "linear-gradient(135deg,#f953c6,#b91d73)", color: "#f953c6" },
  { label: "Tasks Processed", value: "68,024", delta: "+12.4% today", icon: CheckCircle2, gradient: "linear-gradient(135deg,#4facfe,#00f2fe)", color: "#4facfe" },
  { label: "Neural Efficiency", value: "95.7%", delta: "+3.2% vs last month", icon: TrendingUp, gradient: "linear-gradient(135deg,#43e97b,#38f9d7)", color: "#43e97b" },
  { label: "System Uptime", value: "99.96%", delta: "45d 13h 22m", icon: Activity, gradient: "linear-gradient(135deg,#fa709a,#fee140)", color: "#fa709a" },
];

const LOG_LINES = [
  { text: "[NEXUS:LangGraph] StateGraph.invoke() → conditional_edge → node:CIPHER", color: "#f953c6" },
  { text: "[CIPHER:CrewAI] crew.kickoff({inputs}) → Task[3849] complete ✓ 99.1%", color: "#4facfe" },
  { text: "[SENTINEL:LangChain] AgentExecutor.run() → ReAct iter:4 → threat blocked", color: "#fa709a" },
  { text: "[HERALD:OpenAI SDK] tool_call:fetch_api → Responses API stream → 12ms", color: "#43e97b" },
  { text: "[SPECTRA:Responses API] image_url tool → GPT-4o vision → 847 extracted", color: "#a18cd1" },
  { text: "[SYS] LangGraph checkpoint saved → memory_saver v4829 persisted", color: "#f953c6" },
  { text: "[NEXUS] SDK handoff() → SENTINEL authorized via OpenAI Agents SDK", color: "#fda085" },
  { text: "[VOXEL:AutoGen] GroupChat.run() → ConversableAgent ready → 40 langs", color: "#fda085" },
  { text: "[CIPHER:CrewAI] Agent[Researcher] → Agent[Analyst] → 2.3M nodes indexed", color: "#4facfe" },
  { text: "[HERALD] Responses API delta stream active → 58 endpoints refreshed", color: "#43e97b" },
  { text: "[NEXUS:LangGraph] MemorySaver.get_tuple() → state restored → resuming", color: "#f953c6" },
  { text: "[SENTINEL:LangChain] Tool:pii_scanner → 0 violations → SOC2 passed ✓", color: "#fa709a" },
];

// ─────────────────────────────────────────────────────────────────────────────
// ROBOT SVG — vibrant version
// ─────────────────────────────────────────────────────────────────────────────
function RobotSVG({ color = "#f953c6", size = 64, animated = false, variant = 0 }:
  { color?: string; size?: number; animated?: boolean; variant?: number }) {
  const eyeShapes = [
    <>
      <motion.rect x="20" y="22" width="10" height="10" rx="2" fill={color}
        animate={animated ? { opacity: [1, 0.1, 1] } : {}}
        transition={{ duration: 2.5, repeat: Infinity }} />
      <motion.rect x="36" y="22" width="10" height="10" rx="2" fill={color}
        animate={animated ? { opacity: [1, 0.1, 1] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }} />
      <rect x="23" y="25" width="4" height="4" rx="1" fill="#000" opacity="0.5" />
      <rect x="39" y="25" width="4" height="4" rx="1" fill="#000" opacity="0.5" />
    </>,
    <>
      <motion.circle cx="25" cy="27" r="6" fill={color}
        animate={animated ? { r: [5, 7, 5], opacity: [1, 0.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }} />
      <motion.circle cx="41" cy="27" r="6" fill={color}
        animate={animated ? { r: [5, 7, 5], opacity: [1, 0.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
      <circle cx="25" cy="27" r="2.5" fill="#000" opacity="0.6" />
      <circle cx="41" cy="27" r="2.5" fill="#000" opacity="0.6" />
    </>,
    <>
      <motion.rect x="18" y="23" width="30" height="8" rx="4" fill={color} opacity="0.9"
        animate={animated ? { opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }} />
      <rect x="20" y="24.5" width="26" height="5" rx="2.5" fill="#000" opacity="0.4" />
      {[0,7,14,21].map((x) => (
        <motion.rect key={x} x={22+x} y="25.5" width="4" height="3" rx="0.8" fill={color}
          animate={animated ? { opacity: [0.3, 1, 0.3] } : {}}
          transition={{ duration: 0.8, repeat: Infinity, delay: x * 0.06 }} />
      ))}
    </>,
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 66 80" fill="none">
      <g transform={`scale(${(size/80)*(66/66)})`}>
        <motion.line x1="33" y1="1" x2="33" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"
          animate={animated ? { opacity: [0.4, 1, 0.4] } : {}} transition={{ duration: 1.2, repeat: Infinity }} />
        <motion.circle cx="33" cy="1.5" r="3" fill={color}
          animate={animated ? { r: [2, 4, 2] } : {}} transition={{ duration: 1.2, repeat: Infinity }} />
        <line x1="33" y1="6" x2="25" y2="3" stroke={color} strokeWidth="0.8" opacity="0.4" />
        <line x1="33" y1="6" x2="41" y2="3" stroke={color} strokeWidth="0.8" opacity="0.4" />
        <circle cx="25" cy="3" r="1.5" fill={color} opacity="0.4" />
        <circle cx="41" cy="3" r="1.5" fill={color} opacity="0.4" />
        <rect x="14" y="12" width="38" height="26" rx="6" stroke={color} strokeWidth="2" fill={`${color}15`} />
        {[[17,15],[47,15],[17,35],[47,35]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2" fill={color} opacity="0.35" />
        ))}
        {eyeShapes[variant % 3]}
        <rect x="21" y="35" width="24" height="2" rx="1" fill={color} opacity="0.3" />
        {[0,4,8,12,16,20].map((x) => (
          <rect key={x} x={22+x} y="35.5" width="2.5" height="1.5" rx="0.4" fill={color} opacity="0.5" />
        ))}
        <rect x="28" y="38" width="10" height="7" rx="2.5" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
        <line x1="28" y1="41" x2="38" y2="41" stroke={color} strokeWidth="0.8" opacity="0.3" />
        <rect x="10" y="45" width="46" height="24" rx="5" stroke={color} strokeWidth="2" fill={`${color}10`} />
        <motion.circle cx="33" cy="52" r="5.5" stroke={color} strokeWidth="1.5" fill={`${color}20`}
          animate={animated ? { r: [4.5, 6.5, 4.5] } : {}} transition={{ duration: 1.1, repeat: Infinity }} />
        <motion.circle cx="33" cy="52" r="3" fill={color}
          animate={animated ? { opacity: [0.5, 1, 0.5] } : {}} transition={{ duration: 1, repeat: Infinity }} />
        <rect x="1" y="46" width="8" height="19" rx="4" stroke={color} strokeWidth="1.5" fill={`${color}10`} opacity="0.8" />
        <rect x="57" y="46" width="8" height="19" rx="4" stroke={color} strokeWidth="1.5" fill={`${color}10`} opacity="0.8" />
        <motion.circle cx="5" cy="66.5" r="3.5" stroke={color} strokeWidth="1.5" fill={`${color}15`} opacity="0.7"
          animate={animated ? { r: [2.5, 4, 2.5] } : {}} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} />
        <motion.circle cx="61" cy="66.5" r="3.5" stroke={color} strokeWidth="1.5" fill={`${color}15`} opacity="0.7"
          animate={animated ? { r: [2.5, 4, 2.5] } : {}} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }} />
        <rect x="16" y="70" width="13" height="7" rx="3" stroke={color} strokeWidth="1.5" fill={`${color}10`} opacity="0.7" />
        <rect x="37" y="70" width="13" height="7" rx="3" stroke={color} strokeWidth="1.5" fill={`${color}10`} opacity="0.7" />
        <rect x="14" y="75" width="16" height="4" rx="2" fill={color} opacity="0.2" />
        <rect x="36" y="75" width="16" height="4" rx="2" fill={color} opacity="0.2" />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED MESH BACKGROUND
// ─────────────────────────────────────────────────────────────────────────────
function VibrantBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let t = 0;
    const colors = ["#f953c6","#4facfe","#43e97b","#fda085","#a18cd1","#fa709a","#fee140"];
    interface P { x: number; y: number; vx: number; vy: number; r: number; ci: number; a: number }
    const orbs: P[] = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 200 + 100,
      ci: i % colors.length,
      a: Math.random() * 0.12 + 0.04,
    }));
    interface Pt { x: number; y: number; vy: number; s: number; ci: number }
    const pts: Pt[] = Array.from({ length: 60 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vy: Math.random() * 0.5 + 0.15,
      s: Math.random() * 2 + 0.5,
      ci: i % colors.length,
    }));
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.004;
      // Moving orb glows
      for (const o of orbs) {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = canvas.width + o.r;
        if (o.x > canvas.width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = canvas.height + o.r;
        if (o.y > canvas.height + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        const c = colors[o.ci];
        g.addColorStop(0, c + Math.floor(o.a * 255).toString(16).padStart(2,"0"));
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(o.x - o.r, o.y - o.r, o.r * 2, o.r * 2);
      }
      // Subtle grid
      ctx.strokeStyle = "rgba(255,255,255,0.025)"; ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 60) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 60) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }
      // Floating particles
      for (const p of pts) {
        p.y -= p.vy;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = colors[p.ci] + "aa"; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATUS BADGE
// ─────────────────────────────────────────────────────────────────────────────
const STATUS_CFG: Record<AgentStatus, { label: string; color: string; bg: string }> = {
  active:     { label: "LIVE",      color: "#43e97b", bg: "rgba(67,233,123,0.15)" },
  processing: { label: "THINKING",  color: "#4facfe", bg: "rgba(79,172,254,0.15)" },
  idle:       { label: "STANDBY",   color: "#fda085", bg: "rgba(253,160,133,0.15)" },
  offline:    { label: "OFFLINE",   color: "#ff6b6b", bg: "rgba(255,107,107,0.15)" },
};
function StatusBadge({ status }: { status: AgentStatus }) {
  const c = STATUS_CFG[status];
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest whitespace-nowrap"
      style={{ color: c.color, backgroundColor: c.bg, border: `1.5px solid ${c.color}50` }}>
      <motion.span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }}
        animate={status !== "offline" ? { opacity: [1, 0.2, 1], scale: [1, 1.4, 1] } : { opacity: 0.3 }}
        transition={{ duration: 1.2, repeat: Infinity }} />
      {c.label}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AGENT CARD
// ─────────────────────────────────────────────────────────────────────────────
function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      className="relative group">

      {/* Glow bloom */}
      <motion.div className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        style={{ background: agent.glowColor, filter: "blur(40px)", transform: "scale(1.12)" }} />

      <motion.div animate={{ y: hovered ? -8 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative rounded-3xl overflow-hidden flex flex-col h-full"
        style={{
          background: "rgba(10,10,18,0.88)",
          backdropFilter: "blur(20px)",
          border: hovered ? `1.5px solid ${agent.accentColor}70` : "1.5px solid rgba(255,255,255,0.1)",
          transition: "border-color 0.3s",
          boxShadow: hovered ? `0 20px 60px ${agent.glowColor}` : "0 4px 24px rgba(0,0,0,0.4)",
        }}>

        {/* Gradient top bar */}
        <div className="h-1.5 w-full" style={{ background: agent.gradient }} />

        {/* Scan line on hover */}
        <motion.div className="absolute top-1.5 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg,transparent,${agent.accentColor},transparent)` }}
          animate={hovered ? { opacity: [0, 1, 0], x: ["-100%", "100%"] } : { opacity: 0 }}
          transition={{ duration: 1.8, repeat: hovered ? Infinity : 0, ease: "easeInOut" }} />

        <div className="relative p-5 sm:p-6 flex flex-col gap-4 flex-1">

          {/* Header */}
          <div className="flex items-start gap-4">
            {/* Robot avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-[80px] h-[80px] rounded-2xl flex items-center justify-center"
                style={{ background: `radial-gradient(circle,${agent.accentColor}20 0%,${agent.accentColor}05 100%)`, border: `1.5px solid ${agent.accentColor}30` }}>
                <motion.div className="absolute inset-0 rounded-2xl"
                  style={{ border: `1.5px dashed ${agent.accentColor}30` }}
                  animate={agent.status !== "offline" ? { rotate: 360 } : {}}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
                <RobotSVG color={agent.accentColor} size={54} animated={agent.status !== "offline"} variant={index % 3} />
              </div>
              {/* Gradient number badge */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black"
                style={{ background: agent.gradient, color: "#000" }}>
                {index + 1}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-black tracking-widest leading-none"
                    style={{ fontFamily: "'Orbitron',monospace",
                      background: agent.gradient,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {agent.name}
                  </h3>
                  <p className="text-[10px] text-white/40 mt-0.5 font-mono tracking-wider">{agent.codename}</p>
                  <p className="text-[9px] text-white/20 mt-0.5 font-mono">{agent.id} · {agent.version}</p>
                </div>
                <StatusBadge status={agent.status} />
              </div>
              {/* Framework + model */}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider"
                  style={{ color: agent.frameworkColor, background: agent.frameworkColor + "18", border: `1px solid ${agent.frameworkColor}35` }}>
                  ◈ {agent.framework}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {agent.model}
                </span>
              </div>
            </div>
          </div>

          {/* Role */}
          <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase flex items-center gap-2">
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,${agent.accentColor}50,transparent)` }} />
            {agent.role}
          </div>

          {/* Description */}
          <p className="text-[12px] text-white/50 leading-relaxed flex-1">
            {agent.description}
          </p>

          {/* Efficiency bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-bold text-white/30 tracking-widest uppercase">Neural Efficiency</span>
              <span className="text-sm font-black" style={{ fontFamily: "'Orbitron',monospace",
                background: agent.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {agent.efficiency}%
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
              <motion.div className="h-full rounded-full" initial={{ width: 0 }}
                animate={inView ? { width: `${agent.efficiency}%` } : { width: 0 }}
                transition={{ duration: 1.6, delay: index * 0.09 + 0.4, ease: "easeOut" }}
                style={{ background: agent.gradient }} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Tasks", val: agent.tasks.toLocaleString() },
              { label: "Uptime", val: agent.uptime },
            ].map((s) => (
              <div key={s.label} className="p-3 rounded-2xl text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-sm font-black text-white/80" style={{ fontFamily: "'Orbitron',monospace" }}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Capabilities */}
          <div className="flex flex-wrap gap-1.5">
            {agent.capabilities.map((cap) => (
              <span key={cap} className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                style={{ color: agent.accentColor + "cc", background: agent.accentColor + "12", border: `1px solid ${agent.accentColor}25` }}>
                {cap}
              </span>
            ))}
          </div>

          {/* Terminal */}
          <div className="flex items-start gap-2 p-3 rounded-2xl"
            style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <Terminal size={11} style={{ color: agent.accentColor }} className="flex-shrink-0 mt-0.5" />
            <span className="text-[10px] font-mono text-white/30 break-all leading-relaxed">
              &gt;_ {agent.lastAction}
            </span>
          </div>

          {/* CTA on hover */}
          <motion.div initial={false}
            animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
            transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="flex gap-2 pt-1">
              <Link href="/info/contact" className="flex-1">
                <button className="w-full py-2.5 rounded-xl text-[11px] font-bold tracking-wider transition-all"
                  style={{ background: "transparent", border: `1.5px solid ${agent.accentColor}50`, color: agent.accentColor }}>
                  CONFIGURE
                </button>
              </Link>
              <Link href="/info/contact" className="flex-1">
                <button className="w-full py-2.5 rounded-xl text-[11px] font-black tracking-wider"
                  style={{ background: agent.gradient, color: "#000" }}>
                  DEPLOY →
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-4 right-4 w-4 h-4" style={{ borderTop: `1.5px solid ${agent.accentColor}40`, borderRight: `1.5px solid ${agent.accentColor}40` }} />
        <div className="absolute bottom-4 left-4 w-4 h-4" style={{ borderBottom: `1.5px solid ${agent.accentColor}40`, borderLeft: `1.5px solid ${agent.accentColor}40` }} />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const Icon = stat.icon;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative p-5 rounded-3xl overflow-hidden group cursor-default"
      style={{ background: "rgba(10,10,18,0.88)", backdropFilter: "blur(20px)", border: "1.5px solid rgba(255,255,255,0.1)" }}>
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: stat.gradient }} />
      {/* Hover glow */}
      <motion.div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: stat.color + "08" }} />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-bold text-white/30 tracking-widest uppercase mb-2">{stat.label}</p>
          <p className="text-3xl font-black leading-none" style={{ fontFamily: "'Orbitron',monospace",
            background: stat.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {stat.value}
          </p>
          <p className="text-[10px] font-mono text-white/30 mt-2">{stat.delta}</p>
        </div>
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: stat.gradient }}>
          <Icon size={18} color="#000" />
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TERMINAL FEED
// ─────────────────────────────────────────────────────────────────────────────
function TerminalFeed() {
  const [lines, setLines] = useState<typeof LOG_LINES>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idx = useRef(0);
  useEffect(() => {
    const add = () => setLines(p => [...p, LOG_LINES[idx.current++ % LOG_LINES.length]].slice(-9));
    add(); const t = setInterval(add, 1700); return () => clearInterval(t);
  }, []);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [lines]);
  return (
    <div className="rounded-3xl overflow-hidden"
      style={{ background: "rgba(6,6,12,0.96)", backdropFilter: "blur(20px)", border: "1.5px solid rgba(255,255,255,0.1)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {["#ff5f57","#febc2e","#28c840"].map((bg,i) => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ background: bg }} />
            ))}
          </div>
          <span className="text-[11px] font-bold text-white/30 ml-1 tracking-wider">
            AGENT OS · LIVE EXECUTION FEED
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.div className="w-2 h-2 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />
          <span className="text-[10px] font-bold text-white/30 tracking-widest">STREAMING</span>
        </div>
      </div>
      {/* Lines */}
      <div ref={scrollRef} className="p-5 h-56 overflow-y-auto space-y-2" style={{ scrollbarWidth: "none" }}>
        <div className="text-[10px] font-mono text-white/20 mb-3 tracking-wider">
          # LangGraph · CrewAI · OpenAI Agents SDK · LangChain · AutoGen
        </div>
        {lines.map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22 }}
            className="text-[11px] sm:text-xs font-mono flex gap-3 items-start leading-relaxed">
            <span className="text-white/20 flex-shrink-0 tabular-nums text-[10px]">
              {new Date().toLocaleTimeString("en", { hour12: false })}
            </span>
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
        <div className="text-sm font-mono flex gap-2 items-center mt-1">
          <span className="text-pink-400">$</span>
          <motion.span className="text-pink-400" animate={{ opacity: [1,0,1] }} transition={{ duration: 0.9, repeat: Infinity }}>█</motion.span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FRAMEWORK SECTION
// ─────────────────────────────────────────────────────────────────────────────
function FrameworkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }} className="mb-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-[11px] font-bold tracking-widest"
          style={{ background: "rgba(79,172,254,0.1)", border: "1.5px solid rgba(79,172,254,0.25)", color: "#4facfe" }}>
          <Cpu size={11} /> CORE TECHNOLOGY STACK
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-white"
          style={{ fontFamily: "'Orbitron',monospace" }}>
          FRAMEWORK ARSENAL
        </h2>
        <p className="text-sm text-white/40 mt-3 max-w-lg mx-auto leading-relaxed">
          Every agent is purpose-built on the world's leading AI orchestration frameworks — chosen for the task, not the trend.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FRAMEWORKS.map((fw, i) => {
          const FwIcon = fw.icon;
          return (
            <motion.div key={fw.name}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="relative p-5 rounded-3xl overflow-hidden cursor-default group"
              style={{ background: "rgba(10,10,18,0.88)", backdropFilter: "blur(20px)", border: `1.5px solid ${fw.color}25` }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl" style={{ background: fw.color + "80" }} />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: fw.bg, border: `1.5px solid ${fw.color}30` }}>
                  <RobotSVG color={fw.color} size={36} animated variant={i % 3} />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-wider" style={{ fontFamily: "'Orbitron',monospace", color: fw.color }}>{fw.name}</h3>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest mt-1 inline-block"
                    style={{ color: fw.color, background: fw.color + "15", border: `1px solid ${fw.color}25` }}>
                    {fw.useCase.toUpperCase()}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed">{fw.desc}</p>
              <div className="mt-3 flex items-center gap-2">
                <FwIcon size={11} style={{ color: fw.color, opacity: 0.6 }} />
                <span className="text-[10px] font-mono text-white/25">
                  {AGENTS.filter(a => a.framework === fw.name).length > 0
                    ? `Powering ${AGENTS.filter(a => a.framework === fw.name).length} agent(s)`
                    : "Streaming layer"}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg,transparent,${fw.color}50,transparent)` }} />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function AgentsPage() {
  const [filter, setFilter] = useState<"all" | AgentStatus>("all");
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const filtered = filter === "all" ? AGENTS : AGENTS.filter(a => a.status === filter);

  const heroRobots = [
    { color: "#a18cd1", size: 42, delay: 0.9 },
    { color: "#fda085", size: 52, delay: 0.5 },
    { color: "#4facfe", size: 64, delay: 0.25 },
    { color: "#f953c6", size: 82, delay: 0, label: "NEXUS" },
    { color: "#43e97b", size: 64, delay: 0.35 },
    { color: "#fa709a", size: 52, delay: 0.6 },
    { color: "#fee140", size: 42, delay: 0.95 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#f953c6,#4facfe); border-radius: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div className="relative min-h-screen text-white" style={{ fontFamily: "'Space Mono', monospace", background: "#06060f" }}>
        <VibrantBackground />

        {/* Dark overlay */}
        <div className="fixed inset-0 pointer-events-none z-[1]" style={{ background: "rgba(6,6,15,0.55)" }} />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-7xl mx-auto">

            {/* ═══════════════════════════════════════
                HERO
            ═══════════════════════════════════════ */}
            <div ref={heroRef} className="pt-12 sm:pt-16 pb-14 text-center">

              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: -12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full text-[11px] font-bold tracking-widest"
                style={{ background: "rgba(249,83,198,0.12)", border: "1.5px solid rgba(249,83,198,0.35)", color: "#f953c6" }}>
                <Radar size={11} />
                NEUROMOTION — AI COMMAND CENTER
                <ChevronRight size={11} />
              </motion.div>

              {/* Headline */}
              <motion.div initial={{ opacity: 0, y: 32 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.08 }}>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-2"
                  style={{ fontFamily: "'Orbitron',monospace", color: "#fff" }}>
                  NEXT-GEN
                </h1>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-8"
                  style={{ fontFamily: "'Orbitron',monospace",
                    background: "linear-gradient(135deg,#f953c6 0%,#4facfe 30%,#43e97b 55%,#fda085 75%,#a18cd1 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  AI AGENTS
                </h1>
              </motion.div>

              {/* Sub */}
              <motion.p initial={{ opacity: 0, y: 18 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.18 }}
                className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-8">
                Deploy intelligent AI agents engineered on{" "}
                <span className="font-bold" style={{ color: "#f953c6" }}>LangGraph</span>,{" "}
                <span className="font-bold" style={{ color: "#4facfe" }}>CrewAI</span>,{" "}
                <span className="font-bold" style={{ color: "#43e97b" }}>OpenAI Agents SDK</span>,{" "}
                <span className="font-bold" style={{ color: "#fa709a" }}>LangChain</span> &{" "}
                <span className="font-bold" style={{ color: "#fda085" }}>AutoGen</span>.
              </motion.p>

              {/* Framework pills */}
              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-2 mb-12">
                {[
                  { name: "LangGraph",         color: "#f953c6" },
                  { name: "CrewAI",            color: "#4facfe" },
                  { name: "OpenAI Agents SDK", color: "#43e97b" },
                  { name: "LangChain",         color: "#fa709a" },
                  { name: "AutoGen",           color: "#fda085" },
                  { name: "Responses API",     color: "#a18cd1" },
                ].map((fw, i) => (
                  <motion.div key={fw.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.34 + i * 0.06 }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-bold tracking-wider"
                    style={{ color: fw.color, background: fw.color + "12", border: `1.5px solid ${fw.color}30` }}>
                    ◈ {fw.name}
                  </motion.div>
                ))}
              </motion.div>

              {/* Hero robot formation */}
              <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center items-end gap-3 sm:gap-6 mb-12">
                {heroRobots.map((r, i) => (
                  <motion.div key={i}
                    animate={{ y: [0, -(10 + i%3*4), 0], rotate: [0, i%2===0?3:-3, 0] }}
                    transition={{ duration: 3 + i * 0.35, repeat: Infinity, delay: r.delay, ease: "easeInOut" }}
                    style={{ filter: `drop-shadow(0 0 24px ${r.color}60)` }}>
                    <RobotSVG color={r.color} size={r.size} animated variant={i % 3} />
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div initial={{ opacity: 0, y: 18 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.45 }}
                className="flex flex-wrap gap-3 justify-center">
                <Link href="/info/contact">
                  <motion.button whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(249,83,198,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-black tracking-wider"
                    style={{ background: "linear-gradient(135deg,#f953c6,#4facfe)", color: "#fff", fontFamily: "'Orbitron',monospace" }}>
                    <Zap size={15} /> DEPLOY AGENT
                  </motion.button>
                </Link>
                <Link href="/info/contact">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold tracking-wider"
                    style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", border: "1.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>
                    <Settings size={14} /> GET IN TOUCH
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* ═══════════════════════════════════════
                STATS
            ═══════════════════════════════════════ */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {STATS.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
            </div>

            {/* ═══════════════════════════════════════
                FRAMEWORKS
            ═══════════════════════════════════════ */}
            <FrameworkSection />

            {/* ═══════════════════════════════════════
                TERMINAL
            ═══════════════════════════════════════ */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-14">
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={13} style={{ color: "#f953c6" }} />
                <span className="text-[11px] font-bold tracking-widest uppercase text-white/30">Live Agent Execution Log</span>
                <div className="ml-auto flex items-center gap-2">
                  <motion.div className="w-2 h-2 rounded-full" style={{ background: "#43e97b" }}
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                  <span className="text-[10px] text-white/25">LIVE</span>
                </div>
              </div>
              <TerminalFeed />
            </motion.div>

            {/* ═══════════════════════════════════════
                AGENT GRID HEADER + FILTER
            ═══════════════════════════════════════ */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black tracking-widest text-white"
                  style={{ fontFamily: "'Orbitron',monospace" }}>
                  <span style={{
                    background: "linear-gradient(135deg,#f953c6,#4facfe,#43e97b)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                  }}>AGENT FLEET</span>
                </h2>
                <p className="text-[11px] text-white/30 mt-1 font-mono">
                  {filtered.length} unit{filtered.length !== 1 ? "s" : ""} deployed
                  {filter !== "all" && ` · status:${filter}`}
                </p>
              </div>
              <div className="flex items-center gap-1 p-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", border: "1.5px solid rgba(255,255,255,0.08)" }}>
                {(["all","active","processing","idle"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className="px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all"
                    style={{
                      background: filter === f ? "linear-gradient(135deg,#f953c6,#4facfe)" : "transparent",
                      color: filter === f ? "#fff" : "rgba(255,255,255,0.3)",
                    }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* ═══════════════════════════════════════
                AGENT CARDS
            ═══════════════════════════════════════ */}
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((agent, i) => <AgentCard key={agent.id} agent={agent} index={i} />)}
              </div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                <AlertCircle size={32} className="mx-auto mb-3 text-white/10" />
                <p className="text-white/30 text-sm font-mono">No units match this filter.</p>
              </motion.div>
            )}

            {/* ═══════════════════════════════════════
                CTA BANNER
            ═══════════════════════════════════════ */}
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="mt-20 relative rounded-3xl overflow-hidden"
              style={{ background: "rgba(10,10,18,0.88)", backdropFilter: "blur(20px)", border: "1.5px solid rgba(255,255,255,0.1)" }}>

              {/* Rainbow top bar */}
              <div className="h-1.5 w-full"
                style={{ background: "linear-gradient(90deg,#f953c6,#4facfe,#43e97b,#fda085,#a18cd1,#fa709a,#fee140)" }} />

              {/* BG glow blobs */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle,rgba(249,83,198,0.12),transparent)" }} />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle,rgba(79,172,254,0.12),transparent)" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full" style={{ background: "radial-gradient(ellipse,rgba(67,233,123,0.06),transparent)" }} />
              </div>

              <div className="relative p-10 sm:p-16 text-center">
                {/* Robot row */}
                <div className="flex justify-center items-end gap-4 sm:gap-8 mb-10">
                  {[
                    { color: "#a18cd1", size: 48 }, { color: "#4facfe", size: 60 },
                    { color: "#f953c6", size: 76 },
                    { color: "#43e97b", size: 60 }, { color: "#fda085", size: 48 },
                  ].map((r, i) => (
                    <motion.div key={i}
                      animate={{ y: [0, -12, 0], rotate: [0, i%2===0?4:-4, 0] }}
                      transition={{ duration: 3.2 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      style={{ filter: `drop-shadow(0 0 24px ${r.color}60)` }}>
                      <RobotSVG color={r.color} size={r.size} animated variant={i % 3} />
                    </motion.div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-[11px] font-bold tracking-widest"
                  style={{ background: "rgba(79,172,254,0.1)", border: "1.5px solid rgba(79,172,254,0.25)", color: "#4facfe" }}>
                  <Sparkles size={11} /> EXPAND YOUR FLEET
                </div>

                <h3 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-wide"
                  style={{ fontFamily: "'Orbitron',monospace" }}>
                  READY TO{" "}
                  <span style={{
                    background: "linear-gradient(135deg,#f953c6,#4facfe,#43e97b)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                  }}>AUTOMATE?</span>
                </h3>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {[
                    { n: "LangGraph", c: "#f953c6" }, { n: "CrewAI", c: "#4facfe" },
                    { n: "OpenAI Agents SDK", c: "#43e97b" }, { n: "LangChain", c: "#fa709a" },
                    { n: "AutoGen", c: "#fda085" },
                  ].map(fw => (
                    <span key={fw.n} className="text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wider"
                      style={{ color: fw.c, background: fw.c + "12", border: `1.5px solid ${fw.c}30` }}>
                      ◈ {fw.n}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-white/40 max-w-lg mx-auto mb-10 leading-relaxed">
                  Custom-engineered AI agents on the frameworks your stack needs. From stateful LangGraph orchestration to CrewAI role-based crews — we build it all.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/info/contact">
                    <motion.button whileHover={{ scale: 1.06, boxShadow: "0 0 50px rgba(249,83,198,0.4)" }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-9 py-4 rounded-full text-sm font-black tracking-widest"
                      style={{ background: "linear-gradient(135deg,#f953c6,#4facfe,#43e97b)", color: "#fff", fontFamily: "'Orbitron',monospace" }}>
                      <Bot size={15} /> BROWSE AGENTS
                    </motion.button>
                  </Link>
                  <Link href="/info/contact">
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-9 py-4 rounded-full text-sm font-bold tracking-widest"
                      style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", border: "1.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}>
                      <Code2 size={15} /> BUILD CUSTOM
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* ═══════════════════════════════════════
                FOOTER STRIP
            ═══════════════════════════════════════ */}
            <div className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-3">
                <motion.div animate={{ y: [0,-5,0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
                  <RobotSVG color="#f953c6" size={28} animated />
                </motion.div>
                <span className="text-[11px] text-white/25 font-mono tracking-wider">
                  NEUROMOTION AI AGENTS v2.0.0
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {[
                  { n: "LangGraph", c: "#f953c6" },{ n: "CrewAI", c: "#4facfe" },
                  { n: "OpenAI SDK", c: "#43e97b" },{ n: "LangChain", c: "#fa709a" },{ n: "AutoGen", c: "#fda085" },
                ].map(fw => (
                  <span key={fw.n} className="text-[9px] font-mono tracking-widest px-2 py-1 rounded-full"
                    style={{ color: fw.c + "90", border: `1px solid ${fw.c}20` }}>
                    {fw.n}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <Lock size={10} style={{ color: "#43e97b" }} />
                <span className="text-[10px] text-white/25 font-mono">SOC2 TYPE II</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}