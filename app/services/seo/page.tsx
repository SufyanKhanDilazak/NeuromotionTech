"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useInView, useSpring } from "framer-motion";
import {
  Search, TrendingUp, Globe, Zap, BarChart3, Star, ArrowRight,
  CheckCircle2, Sparkles, Rocket, Eye, Activity, Users, Heart,
  MessageCircle, Share2, Bookmark, Award, ShieldCheck, Cpu,
  Link2, FileText, Bell, Play, Flame, Crown, Hash, AtSign,
  Repeat2, MoreHorizontal, Radio, Layers, Database,
  Gauge, ChevronRight, Bot, Brain, Workflow, ScanLine,
  Radar, Signal, Network, Filter, RefreshCw, Clock,
  AlertCircle, X, Check, ExternalLink, Send, Image,
  Monitor, Smartphone, Tag, Crosshair, BarChart,
  ArrowUp, ArrowDown, Minus, Info, Terminal,
  MousePointer2, GitBranch, ChevronDown, Edit3,
  Download, Upload, DollarSign, Percent, Command,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────
interface Post {
  id: number; author: string; handle: string; time: string;
  content: string; tag: string; tagColor: string;
  likes: number; comments: number; shares: number; bookmarks: number;
  verified: boolean; hasImage?: boolean; imageGradient?: string;
  hashtags: string[];
}
interface Keyword { term: string; vol: string; diff: number; change: string; trend: "up"|"down"|"flat"; accent: string; }
interface TrendTag { tag: string; posts: string; delta: string; hot: boolean; color: string; }
interface Story { name: string; color: string; icon: React.ElementType; active: boolean; }
interface Feature { icon: React.ElementType; title: string; desc: string; accent: string; stat: string; pct: number; }

// ─────────────────────────────────────────────────────────
// SPARKLINE
// ─────────────────────────────────────────────────────────
function Spark({ data, color, w = 80, h = 32 }: { data: number[]; color: string; w?: number; h?: number }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 1)) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  const fill = `${pts} ${w},${h} 0,${h}`;
  const gid = `sg${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg width={w} height={h} className="overflow-visible flex-shrink-0">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fill} fill={`url(#${gid})`} />
      <motion.polyline points={pts} fill="none" stroke={color} strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// COUNT UP
// ─────────────────────────────────────────────────────────
function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame = 0; const total = 70;
    const t = setInterval(() => {
      frame++;
      setVal(Math.round(to * (1 - Math.pow(1 - frame / total, 3))));
      if (frame >= total) clearInterval(t);
    }, 14);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─────────────────────────────────────────────────────────
// RING GAUGE
// ─────────────────────────────────────────────────────────
function Ring({ value, color, size = 72, label, sub }: { value: number; color: string; size?: number; label: string; sub?: string }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color+"20"} strokeWidth={6} />
          <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6}
            strokeLinecap="round" strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - (value/100)*circ }}
            transition={{ duration: 1.6, ease: [0.22,1,0.36,1], delay: 0.3 }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-black text-sm leading-none" style={{ color }}>{value}</span>
        </div>
      </div>
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</span>
      {sub && <span className="text-[9px] text-gray-400">{sub}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// STORY BUBBLE
// ─────────────────────────────────────────────────────────
function StoryBubble({ story, index }: { story: Story; index: number }) {
  const Icon = story.icon;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06 }} whileHover={{ scale: 1.08, y: -3 }}
      className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0 w-16">
      <div className="relative">
        {story.active && <div className="absolute inset-0 rounded-full scale-110 blur-sm opacity-50" style={{ background: story.color }} />}
        <div className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-md"
          style={{ background: `linear-gradient(135deg,${story.color},${story.color}99)`,
            border: story.active ? `3px solid ${story.color}` : "3px solid #e5e7eb" }}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight truncate w-full text-center">{story.name}</span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// POST CARD  — FIX: unique keys via index, custom hashtags per post
// ─────────────────────────────────────────────────────────
function PostCard({ post, index }: { post: Post; index: number }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }} className="group">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 overflow-hidden hover:-translate-y-1">

        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md font-black text-white text-sm flex-shrink-0"
                style={{ background: `linear-gradient(135deg,${post.tagColor},${post.tagColor}BB)` }}>
                {post.author.slice(0,2).toUpperCase()}
              </div>
              {post.verified && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center ring-1 ring-white">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-gray-900 text-sm">{post.author}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: post.tagColor }}>{post.tag}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-gray-400 text-xs">{post.handle}</span>
                <span className="text-gray-300 text-xs">·</span>
                <span className="text-gray-400 text-xs">{post.time}</span>
              </div>
            </div>
          </div>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-300 hover:bg-gray-100 hover:text-gray-500 transition-all flex-shrink-0">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pb-4">
          <p className="text-gray-700 text-sm leading-relaxed">{post.content}</p>
        </div>

        {/* Optional image */}
        {post.hasImage && (
          <div className="mx-5 mb-4 rounded-2xl h-32 flex items-center justify-center overflow-hidden"
            style={{ background: post.imageGradient }}>
            <div className="text-white/50 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Analytics Preview
            </div>
          </div>
        )}

        {/* FIX: use index-based keys to avoid duplicates */}
        <div className="px-5 pb-4 flex flex-wrap gap-1.5">
          {post.hashtags.map((t, hi) => (
            <span key={`${post.id}-ht-${hi}`}
              className="text-xs font-semibold cursor-pointer hover:opacity-70 transition-opacity"
              style={{ color: post.tagColor }}>{t}</span>
          ))}
        </div>

        <div className="mx-5 border-t border-gray-50" />

        {/* Actions */}
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-4">
            <motion.button whileTap={{ scale: 0.75 }} onClick={() => setLiked(!liked)}
              className="flex items-center gap-1.5 text-xs font-semibold transition-all"
              style={{ color: liked ? "#F72585" : "#9ca3af" }}>
              <motion.div animate={liked ? { scale: [1,1.5,1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
                <Heart className={`w-4 h-4 ${liked ? "fill-[#F72585]" : ""}`} />
              </motion.div>
              {liked ? post.likes + 1 : post.likes}
            </motion.button>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />{post.comments}
            </button>
            <motion.button whileTap={{ scale: 0.75 }} onClick={() => setShared(!shared)}
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: shared ? "#06D6A0" : "#9ca3af" }}>
              <Repeat2 className="w-4 h-4" />{post.shares}
            </motion.button>
          </div>
          <motion.button whileTap={{ scale: 0.75 }} onClick={() => setSaved(!saved)}
            style={{ color: saved ? "#FFBE0B" : "#d1d5db" }}>
            <Bookmark className={`w-4 h-4 ${saved ? "fill-[#FFBE0B]" : ""}`} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// KEYWORD ROW
// ─────────────────────────────────────────────────────────
function KwRow({ kw, i }: { kw: Keyword; i: number }) {
  return (
    <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.05 }}
      className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: kw.accent }} />
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-xs font-semibold truncate">{kw.term}</p>
      </div>
      <span className="text-gray-400 text-[11px] font-mono flex-shrink-0 hidden sm:inline">{kw.vol}</span>
      <div className="w-12 bg-gray-100 rounded-full h-1.5 flex-shrink-0 overflow-hidden hidden sm:flex">
        <motion.div initial={{ width: 0 }} animate={{ width: `${kw.diff}%` }}
          transition={{ delay: i * 0.05 + 0.3, duration: 0.8 }}
          className="h-full rounded-full" style={{ background: kw.accent }} />
      </div>
      <div className={`flex items-center gap-0.5 text-[11px] font-black flex-shrink-0 ${kw.trend==="up"?"text-emerald-500":kw.trend==="down"?"text-red-500":"text-gray-300"}`}>
        {kw.trend==="up"?<ArrowUp className="w-3 h-3"/>:kw.trend==="down"?<ArrowDown className="w-3 h-3"/>:<Minus className="w-3 h-3"/>}
        {kw.change}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// PULSE ITEM
// ─────────────────────────────────────────────────────────
function PulseItem({ text, sub, color, icon: Icon, delay }: { text:string; sub:string; color:string; icon:React.ElementType; delay:number }) {
  return (
    <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
      transition={{ delay }}
      className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 cursor-pointer">
      <div className="w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: color+"15" }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-xs font-semibold leading-snug truncate">{text}</p>
        <p className="text-gray-400 text-[10px] mt-0.5">{sub}</p>
      </div>
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: color }} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// METRIC WIDGET
// ─────────────────────────────────────────────────────────
function MetricWidget({ label, value, delta, positive, sparkData, accent, icon: Icon }: {
  label:string; value:string; delta:string; positive:boolean;
  sparkData:number[]; accent:string; icon:React.ElementType;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
          <span className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">{label}</span>
        </div>
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${positive?"bg-emerald-50 text-emerald-600":"bg-red-50 text-red-500"}`}>{delta}</span>
      </div>
      <div className="flex items-end justify-between gap-3">
        <span className="text-gray-900 font-black text-2xl tracking-tight leading-none">{value}</span>
        <Spark data={sparkData} color={accent} w={80} h={28} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// TREND ROW
// ─────────────────────────────────────────────────────────
function TrendRow({ item, i }: { item: TrendTag; i: number }) {
  return (
    <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
      transition={{ delay: i*0.06 }} whileHover={{ x:4 }}
      className="flex items-center gap-3 py-2.5 cursor-pointer group border-b border-gray-50 last:border-0">
      <span className="text-gray-300 text-xs font-mono w-4 text-right flex-shrink-0">{i+1}</span>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 text-sm font-bold truncate group-hover:text-blue-600 transition-colors">
          {item.hot && <Flame className="w-3.5 h-3.5 text-orange-500 inline mr-1" />}
          {item.tag}
        </p>
        <p className="text-gray-400 text-[10px] mt-0.5">{item.posts} conversations</p>
      </div>
      <span className="text-emerald-500 text-xs font-black flex-shrink-0">{item.delta}</span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────
export default function SEOPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const [liveUsers, setLiveUsers] = useState(847412);

  useEffect(() => {
    const t = setInterval(() => setLiveUsers(n => n + Math.floor(Math.random() * 5)), 2000);
    return () => clearInterval(t);
  }, []);

  const sp1 = [22,35,28,45,52,47,63,70,68,84,91,96];
  const sp2 = [60,55,71,65,80,74,88,80,92,86,97,100];
  const sp3 = [15,25,19,35,42,37,55,60,57,72,80,89];

  // FIX: each post has unique hashtags — no more duplicate keys
  const posts: Post[] = [
    { id:1, author:"Rand Fishkin", handle:"@randfish", time:"2m",
      content:"Just checked our organic traffic after 30 days on RankFlow — up 312% and ranking #1 for 47 new keywords. The AI discovery engine found opportunities I never would have spotted manually. This changes everything. 🔥",
      tag:"Founder", tagColor:"#3D5AFE", likes:4821, comments:342, shares:891, bookmarks:1204, verified:true,
      hasImage:true, imageGradient:"linear-gradient(135deg,#3D5AFE22,#06D6A022)",
      hashtags:["#SEO", "#Growth", "#Founder"] },
    { id:2, author:"Aleyda Solis", handle:"@aleyda", time:"14m",
      content:"Ran a 90-day experiment: RankFlow's AI engine vs every other tool I use. Result? 3x more keyword discoveries, 2x faster site audits, zero manual work on technical fixes. The competitor intel feed alone is worth it.",
      tag:"SEO Expert", tagColor:"#F72585", likes:3102, comments:198, shares:567, bookmarks:882, verified:true,
      hashtags:["#KeywordResearch", "#TechnicalSEO", "#SEOExpert"] },
    { id:3, author:"Neil Patel", handle:"@neilpatel", time:"1h",
      content:"PageSpeed: 43 → 97. Domain Authority: +18 in 60 days. Organic revenue: +340%. That's the RankFlow autopilot running in the background while we focus on content. Not an ad, just reporting facts.",
      tag:"Growth", tagColor:"#FFBE0B", likes:6704, comments:514, shares:1923, bookmarks:2341, verified:true,
      hasImage:true, imageGradient:"linear-gradient(135deg,#FFBE0B22,#F7258522)",
      hashtags:["#OrganicGrowth", "#ContentMarketing", "#GrowthHacking"] },
    { id:4, author:"Brian Dean", handle:"@backlinko", time:"3h",
      content:"Entity mapping + semantic gap detection in one dashboard. I've been teaching this stuff for years and RankFlow is the first tool that actually makes it accessible. The Content DNA analyzer is pure gold.",
      tag:"Content", tagColor:"#06D6A0", likes:2847, comments:156, shares:478, bookmarks:693, verified:true,
      hashtags:["#SemanticSEO", "#ContentStrategy", "#EntityMapping"] },
  ];

  const keywords: Keyword[] = [
    { term:"best seo platform 2025", vol:"90.4K", diff:72, change:"+312%", trend:"up", accent:"#3D5AFE" },
    { term:"keyword research tool ai", vol:"74.2K", diff:58, change:"+189%", trend:"up", accent:"#F72585" },
    { term:"rank tracker real-time", vol:"52.1K", diff:65, change:"+94%", trend:"up", accent:"#06D6A0" },
    { term:"backlink checker free", vol:"48.8K", diff:44, change:"0%", trend:"flat", accent:"#FFBE0B" },
    { term:"on page seo audit tool", vol:"38.5K", diff:51, change:"+67%", trend:"up", accent:"#FF6B35" },
    { term:"content gap analysis ai", vol:"27.9K", diff:43, change:"+218%", trend:"up", accent:"#8338EC" },
  ];

  const trending: TrendTag[] = [
    { tag:"#AISearchOptimization", posts:"142K", delta:"+840%", hot:true, color:"#3D5AFE" },
    { tag:"#CoreWebVitals2025", posts:"89K", delta:"+420%", hot:true, color:"#F72585" },
    { tag:"#SemanticSEO", posts:"67K", delta:"+280%", hot:false, color:"#06D6A0" },
    { tag:"#SearchGPT", posts:"54K", delta:"+320%", hot:true, color:"#FFBE0B" },
    { tag:"#ZeroClickSearch", posts:"41K", delta:"+190%", hot:false, color:"#FF6B35" },
    { tag:"#EEATSignals", posts:"29K", delta:"+210%", hot:false, color:"#8338EC" },
  ];

  const stories: Story[] = [
    { name:"AI Engine", color:"#3D5AFE", icon:Brain, active:true },
    { name:"Rank Live", color:"#F72585", icon:Activity, active:true },
    { name:"Backlinks", color:"#06D6A0", icon:Link2, active:true },
    { name:"Content", color:"#FFBE0B", icon:FileText, active:false },
    { name:"Technical", color:"#FF6B35", icon:Cpu, active:false },
    { name:"Signals", color:"#8338EC", icon:Signal, active:true },
    { name:"Global", color:"#3D5AFE", icon:Globe, active:false },
  ];

  const pulseItems = [
    { text:"TechBurst Co. ranked #1 for 'saas tools 2025'", sub:"2s ago", color:"#06D6A0", icon:Crown },
    { text:"GrowthHQ secured Forbes.com backlink DR 94", sub:"18s ago", color:"#3D5AFE", icon:Link2 },
    { text:"NovaSoft fixed 47 Core Web Vitals automatically", sub:"34s ago", color:"#FFBE0B", icon:Cpu },
    { text:"Pixel Labs indexed 312 new pages in 4.8s", sub:"1m ago", color:"#F72585", icon:Zap },
    { text:"ScaleOps won featured snippet: 'crm software'", sub:"2m ago", color:"#8338EC", icon:Star },
  ];

  const features: Feature[] = [
    { icon:Brain, title:"Neural Keyword Engine", desc:"Processes 2B+ monthly searches to surface high-intent keywords your competitors can't see.", accent:"#3D5AFE", stat:"2B+ Searches/mo", pct:65 },
    { icon:Radar, title:"360° SERP Radar", desc:"Real-time rank monitoring across 190+ countries, 300+ search engines, every device.", accent:"#F72585", stat:"190+ Countries", pct:73 },
    { icon:Network, title:"Backlink Velocity", desc:"Auto-identify and secure DR 80+ link opportunities completely on autopilot.", accent:"#06D6A0", stat:"DR 80+ Links", pct:79 },
    { icon:ScanLine, title:"Technical DNA Scanner", desc:"Deep-crawl 50M pages. Auto-fix Core Web Vitals, schema errors, indexation issues.", accent:"#FFBE0B", stat:"50M Pages Crawled", pct:85 },
    { icon:Workflow, title:"Content Intelligence", desc:"NLP semantic analysis maps entity relationships, gaps, and E-E-A-T signals automatically.", accent:"#FF6B35", stat:"NLP Powered", pct:91 },
    { icon:Signal, title:"Competitor Signal Feed", desc:"Stream competitor actions in real-time — new pages, links, rankings — as they happen.", accent:"#8338EC", stat:"Real-Time Feed", pct:97 },
  ];

  return (
    <div className="bg-[#F6F7FF] min-h-screen" style={{ fontFamily:"'DM Sans',system-ui,sans-serif" }}>

      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{ scaleX, background:"linear-gradient(90deg,#3D5AFE,#F72585,#06D6A0,#FFBE0B)" }} />

      {/* ══════════════════════════
          HERO
      ══════════════════════════ */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background:"linear-gradient(135deg,#3D5AFE 0%,#8338EC 50%,#F72585 100%)" }} />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize:"32px 32px" }} />
        <motion.div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl bg-white"
          animate={{ scale:[1,1.2,1], rotate:[0,45,0] }} transition={{ duration:10, repeat:Infinity }} />
        <motion.div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-20 blur-3xl bg-yellow-300"
          animate={{ scale:[1,0.8,1] }} transition={{ duration:8, repeat:Infinity, delay:2 }} />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-12">
          {/* Badges */}
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
            className="flex flex-wrap items-center gap-2 mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-white text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#B8FF0A] animate-pulse" />
              LIVE — {liveUsers.toLocaleString()} Users Ranking Now
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-3 py-1.5 text-white/80 text-xs font-semibold">
              <Crown className="w-3.5 h-3.5 text-yellow-300" /> #1 Product of the Day
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-3 py-1.5 text-white/80 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" /> G2 Leader 2025
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-10 items-center">
            {/* Left copy */}
            <div>
              <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
                className="font-black text-white leading-[1.0] tracking-tighter mb-5"
                style={{ fontSize:"clamp(2.8rem,6.5vw,5.5rem)" }}>
                SEO That Feels
                <br />Like
                <span className="relative inline-block mx-3">
                  <span className="relative z-10">Social.</span>
                  <motion.span className="absolute inset-0 bg-[#FFBE0B] rounded-lg -rotate-1" style={{ zIndex:-1 }}
                    initial={{ scaleX:0 }} animate={{ scaleX:1 }}
                    transition={{ delay:0.6, duration:0.5, ease:[0.22,1,0.36,1] }} />
                </span>
              </motion.h1>
              <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.3, duration:0.7 }}
                className="text-white/75 text-lg md:text-xl leading-relaxed mb-8 max-w-lg font-light">
                The AI-first SEO command center with a social media soul. Real-time feeds, live rankings, community signals — all in one vibrant dashboard.
              </motion.p>
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.45, duration:0.6 }}
                className="flex flex-col sm:flex-row gap-3">
                <Link href="/info/contact">
                  <motion.button whileHover={{ scale:1.04, boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale:0.96 }}
                    className="flex items-center justify-center gap-2.5 px-8 h-14 rounded-2xl font-black text-base bg-white text-[#3D5AFE] shadow-xl shadow-black/20 group w-full sm:w-auto">
                    <Rocket className="w-4 h-4" />
                    Start Ranking Free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.96 }}
                  className="flex items-center justify-center gap-2.5 px-7 h-14 rounded-2xl font-bold text-base bg-white/15 border border-white/30 text-white backdrop-blur-sm hover:bg-white/25 transition-all">
                  <Play className="w-4 h-4 fill-white" />
                  Watch Demo
                </motion.button>
              </motion.div>
            </div>

            {/* Right live dashboard */}
            <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.4, duration:0.9, ease:[0.22,1,0.36,1] }}
              className="hidden lg:block">
              <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-3xl p-5 shadow-2xl shadow-black/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-bold text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Live Dashboard
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-white/70 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF0A] animate-pulse" />SYNCING
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { label:"Organic Traffic", val:"2.4M", delta:"+312%", d:sp1, c:"#B8FF0A" },
                    { label:"Keywords #1", val:"12,847", delta:"+89%", d:sp2, c:"#FFBE0B" },
                    { label:"Domain Authority", val:"87", delta:"+18pts", d:sp3, c:"#06D6A0" },
                  ].map(({ label, val, delta, d, c }) => (
                    <div key={label} className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/10 border border-white/15">
                      <div>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-black text-xl">{val}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/20 text-white/80">{delta}</span>
                        </div>
                      </div>
                      <Spark data={d} color={c} w={70} h={28} />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-around mt-4 pt-4 border-t border-white/15">
                  <Ring value={97} color="#B8FF0A" size={60} label="Speed" />
                  <Ring value={91} color="#FFBE0B" size={60} label="SEO" />
                  <Ring value={84} color="#06D6A0" size={60} label="Auth" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          MAIN CONTENT
      ══════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-8">

        {/* Platform Modules */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }} className="mb-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900 text-base">Platform Modules</h3>
              <button className="text-[#3D5AFE] text-xs font-bold flex items-center gap-1">
                See all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {stories.map((s, i) => <StoryBubble key={s.name} story={s} index={i} />)}
            </div>
          </div>
        </motion.div>

        {/* 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] xl:grid-cols-[1fr,340px,300px] gap-5">

          {/* ── LEFT: FEED ── */}
          <div className="space-y-5">
            {/* Compose box */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                  style={{ background:"linear-gradient(135deg,#3D5AFE,#8338EC)" }}>RF</div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-2xl px-4 py-3 text-gray-400 text-sm cursor-text hover:bg-gray-100 transition-colors">
                    Share your SEO win today...
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      {[Image, BarChart3, Hash, AtSign].map((Icon, i) => (
                        <button key={i} className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-[#3D5AFE] transition-all">
                          <Icon className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                    <button className="flex items-center gap-2 px-5 h-9 rounded-xl font-bold text-sm text-white"
                      style={{ background:"linear-gradient(135deg,#3D5AFE,#8338EC)" }}>
                      <Send className="w-3.5 h-3.5" /> Post
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feed tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {["For You", "Trending", "Following", "SEO News"].map((tab, i) => (
                <button key={tab}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${i===0?"text-white shadow-lg":"bg-white text-gray-500 border border-gray-100 hover:text-[#3D5AFE]"}`}
                  style={i===0?{ background:"linear-gradient(135deg,#3D5AFE,#8338EC)", boxShadow:"0 8px 25px rgba(61,90,254,0.25)" }:{}}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Posts — only 4 */}
            <div className="space-y-4">
              {posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
            </div>
          </div>

          {/* ── MIDDLE ── */}
          <div className="space-y-5">
            {/* Your Metrics */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-black text-gray-900 text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#3D5AFE]" /> Your Metrics
                </h3>
                <span className="flex items-center gap-1.5 text-[10px] text-[#06D6A0] font-black border border-[#06D6A0]/30 bg-[#06D6A0]/5 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06D6A0] animate-pulse" /> LIVE
                </span>
              </div>
              <div className="space-y-5 divide-y divide-gray-50">
                <MetricWidget label="Organic Traffic" value="2.4M" delta="+312%" positive sparkData={sp1} accent="#3D5AFE" icon={TrendingUp} />
                <div className="pt-5"><MetricWidget label="Top Rankings" value="12,847" delta="+89%" positive sparkData={sp2} accent="#F72585" icon={Search} /></div>
                <div className="pt-5"><MetricWidget label="Domain Authority" value="87" delta="+18pts" positive sparkData={sp3} accent="#06D6A0" icon={Award} /></div>
              </div>
              <div className="mt-5 pt-5 border-t border-gray-50 flex items-center justify-around">
                <Ring value={97} color="#3D5AFE" size={68} label="Speed" sub="LCP 0.8s" />
                <Ring value={91} color="#F72585" size={68} label="SEO" sub="No errors" />
                <Ring value={84} color="#06D6A0" size={68} label="Authority" sub="DR 87" />
              </div>
            </motion.div>

            {/* Live Feed */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-gray-900 text-base flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#F72585]" /> Live Feed
                </h3>
                <span className="text-[10px] text-[#F72585] font-black flex items-center gap-1.5 bg-[#F72585]/5 border border-[#F72585]/20 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F72585] animate-ping" />LIVE
                </span>
              </div>
              {pulseItems.map((item, i) => (
                <PulseItem key={i} text={item.text} sub={item.sub} color={item.color} icon={item.icon} delay={i*0.06} />
              ))}
            </motion.div>

            {/* AI Keywords */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.15 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-gray-900 text-base flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#FFBE0B]" /> AI Keywords
                </h3>
                <Badge className="bg-[#FFBE0B]/10 text-[#FFBE0B] border-[#FFBE0B]/25 text-[10px] font-black">2B+ Analyzed</Badge>
              </div>
              <div className="grid grid-cols-[1fr,auto,auto,auto] gap-2 px-3 py-1 mb-1">
                {["Keyword","Vol","KD","Δ"].map(h => (
                  <span key={h} className="text-[9px] font-black uppercase tracking-widest text-gray-300">{h}</span>
                ))}
              </div>
              {keywords.map((kw, i) => <KwRow key={kw.term} kw={kw} i={i} />)}
              <button className="mt-3 w-full h-10 rounded-2xl bg-[#FFBE0B]/10 hover:bg-[#FFBE0B]/20 text-[#FFBE0B] font-bold text-xs transition-colors flex items-center justify-center gap-2">
                Explore 2,847 more <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT ── */}
          <div className="space-y-5">
            {/* CTA Card */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              className="relative overflow-hidden rounded-3xl p-5 shadow-xl"
              style={{ background:"linear-gradient(135deg,#3D5AFE 0%,#8338EC 60%,#F72585 100%)" }}>
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize:"24px 24px" }} />
              <motion.div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"
                animate={{ scale:[1,1.3,1] }} transition={{ duration:5, repeat:Infinity }} />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Get Started Today</p>
                <h3 className="text-white font-black text-xl leading-tight mb-3">Rank #1 in 90 Days or Money Back</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-5">Join 847K+ teams. Setup in 3 minutes. First results in 7 days.</p>
                <Link href="/info/contact">
                  <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                    className="w-full h-11 rounded-2xl bg-white font-black text-[#3D5AFE] text-sm shadow-lg flex items-center justify-center gap-2">
                    Start Free — No CC <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
                  {["14-day free","No contracts","Cancel anytime"].map(t => (
                    <span key={t} className="text-white/60 text-[10px] font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3 text-white/80" />{t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Trending */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-gray-900 text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#06D6A0]" /> Trending SEO
                </h3>
                <span className="text-gray-400 text-xs font-semibold">Today</span>
              </div>
              {trending.map((item, i) => <TrendRow key={item.tag} item={item} i={i} />)}
            </motion.div>

            {/* Live Users */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#06D6A0]/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#06D6A0]" />
                </div>
                <div>
                  <p className="text-gray-900 font-black text-sm">Ranking Right Now</p>
                  <p className="text-gray-400 text-[10px]">Across 190 countries</p>
                </div>
              </div>
              <motion.p className="font-black text-4xl text-gray-900 tracking-tight mb-1"
                animate={{ opacity:[1,0.7,1] }} transition={{ duration:2, repeat:Infinity }}>
                {liveUsers.toLocaleString()}
              </motion.p>
              <p className="text-gray-400 text-xs mb-4">active users</p>
              <div className="flex gap-1 items-end h-8">
                {Array.from({ length:20 }).map((_, i) => (
                  <motion.div key={i} className="flex-1 rounded-full min-w-0"
                    style={{ background:"linear-gradient(to top,#3D5AFE,#06D6A0)" }}
                    animate={{ height:[4, 8+Math.random()*24, 4] }}
                    transition={{ duration:0.6+Math.random()*0.8, repeat:Infinity, delay:i*0.05 }} />
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.15 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-black text-gray-900 text-base mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8338EC]" /> Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { icon:Search, label:"Run Keyword Discovery", color:"#3D5AFE" },
                  { icon:Link2, label:"Find Backlink Opportunities", color:"#F72585" },
                  { icon:Cpu, label:"Run Technical Audit", color:"#FFBE0B" },
                  { icon:Brain, label:"Ask AI Strategist", color:"#8338EC" },
                ].map(({ icon: Icon, label, color }) => (
                  <motion.button key={label} whileHover={{ x:4 }} whileTap={{ scale:0.97 }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all text-left group">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:color+"15" }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <span className="text-gray-700 text-sm font-semibold group-hover:text-gray-900 flex-1 truncate">{label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════
            FEATURES
        ══════════════════════════ */}
        <div className="mt-16">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[#3D5AFE]/25 bg-[#3D5AFE]/5 text-[#3D5AFE] text-xs font-black uppercase tracking-widest mb-5">
              <Zap className="w-3.5 h-3.5" /> Platform Intelligence
            </div>
            <h2 className="font-black text-gray-900 tracking-tighter leading-[1.05] mb-4"
              style={{ fontSize:"clamp(2.2rem,5vw,4rem)" }}>
              Six Engines.{" "}
              <span style={{ background:"linear-gradient(135deg,#3D5AFE,#F72585)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Infinite Results.
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">Every module built by SEOs, for SEOs. Unified in one social-first command center.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title}
                  initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
                  whileHover={{ y:-6 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 cursor-pointer group transition-all duration-300">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500"
                      style={{ background:`linear-gradient(135deg,${f.accent}25,${f.accent}10)`, border:`2px solid ${f.accent}20` }}>
                      <Icon className="w-7 h-7" style={{ color:f.accent }} />
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full text-white shadow-sm" style={{ background:f.accent }}>{f.stat}</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-lg mb-2 tracking-tight group-hover:text-[#3D5AFE] transition-colors">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{f.desc}</p>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background:`linear-gradient(90deg,${f.accent},${f.accent}80)` }}
                      initial={{ width:0 }} whileInView={{ width:`${f.pct}%` }}
                      viewport={{ once:true }} transition={{ duration:1.2, delay:0.4 }} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-400 text-[11px] font-semibold">Adoption rate</span>
                    <span className="font-black text-sm" style={{ color:f.accent }}>{f.pct}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════
            DARK STATS BLOCK
        ══════════════════════════ */}
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.7 }}
          className="mt-16 relative overflow-hidden rounded-3xl p-8 md:p-12"
          style={{ background:"linear-gradient(135deg,#0D0D1A 0%,#1A0D2E 50%,#0D1A2E 100%)" }}>
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize:"28px 28px" }} />
          <motion.div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 bg-[#3D5AFE]"
            animate={{ scale:[1,1.2,1] }} transition={{ duration:8, repeat:Infinity }} />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n:10000, suffix:"+", label:"Pages Indexed", icon:Database, color:"#00FFE7" },
              { n:100,   suffix:"+", label:"Happy Users",   icon:Users,    color:"#FFBE0B" },
              { n:110,      suffix:"+", label:"Countries",     icon:Globe,    color:"#06D6A0" },
              { n:320,      suffix:"%", label:"Avg. Growth",   icon:TrendingUp, color:"#F72585" },
            ].map(({ n, suffix, label, icon:Icon, color }, i) => (
              <motion.div key={label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background:color+"20", border:`1px solid ${color}30` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <p className="font-black text-white tracking-tighter" style={{ fontSize:"clamp(2rem,4vw,3.5rem)" }}>
                  <Count to={n} suffix={suffix} />
                </p>
                <div className="w-8 h-1 rounded-full" style={{ background:color }} />
                <p className="text-white/40 text-sm font-medium">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════
            FINAL CTA
        ══════════════════════════ */}
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.8 }}
          className="mt-16 mb-12 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border-2 mb-6"
            style={{ borderColor:"#06D6A0", color:"#06D6A0", background:"#06D6A010" }}
            animate={{ boxShadow:["0 0 0 0 rgba(6,214,160,0)","0 0 0 12px rgba(6,214,160,0)"] }}
            transition={{ duration:1.8, repeat:Infinity }}>
            <Sparkles className="w-3.5 h-3.5" /> No Credit Card Required
          </motion.div>

          <h2 className="font-black text-gray-900 tracking-tighter leading-[1.0] mb-5"
            style={{ fontSize:"clamp(2.5rem,6vw,5rem)" }}>
            Your competitors are
            <br />
            <span style={{ background:"linear-gradient(135deg,#3D5AFE 0%,#8338EC 40%,#F72585 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              already using this.
            </span>
          </h2>
          <p className="text-gray-500 text-xl font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Join 322+ teams running SEO on autopilot. First ranking improvement in under a week. Guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/info/contact">
              <motion.button
                whileHover={{ scale:1.05, boxShadow:"0 30px 80px rgba(61,90,254,0.35)" }}
                whileTap={{ scale:0.96 }}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 h-16 rounded-2xl font-black text-lg text-white shadow-2xl"
                style={{ background:"linear-gradient(135deg,#3D5AFE 0%,#8338EC 50%,#F72585 100%)" }}>
                <Rocket className="w-5 h-5" /> Start Free Trial <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/info/contact">
              <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 h-16 rounded-2xl font-bold text-base border-2 border-gray-200 bg-white text-gray-700 hover:border-[#3D5AFE]/30 hover:text-[#3D5AFE] transition-all shadow-sm">
                <MessageCircle className="w-5 h-5" /> Talk to an Expert
              </motion.button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10">
            {[
              { icon:CheckCircle2, text:"Free 14-day trial", color:"#06D6A0" },
              { icon:ShieldCheck,  text:"SOC 2 Certified",   color:"#3D5AFE" },
              { icon:Zap,          text:"3-minute setup",    color:"#FFBE0B" },
              { icon:X,            text:"No contracts",      color:"#F72585" },
            ].map(({ icon:Icon, text, color }) => (
              <div key={text} className="flex items-center gap-2 text-gray-500 text-sm">
                <Icon className="w-4 h-4" style={{ color }} />{text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}