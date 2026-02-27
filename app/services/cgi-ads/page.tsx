'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import {
  ArrowUpRight,
  Play,
  Camera,
  Flame,
  Layers,
  Wand2,
  Film,
  MonitorPlay,
  Zap,
  Package,
  ShieldCheck,
  RefreshCcw,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

  :root {
    --ink:    #09080F;
    --cream:  #F2EDE4;
    --orange: #FF4500;
    --odim:   #CC3300;
    --lime:   #C8FF00;
    --mid:    rgba(242,237,228,0.52);
    --rule:   rgba(242,237,228,0.12);
  }

  .d *, .d *::before, .d *::after { box-sizing:border-box; margin:0; padding:0; }
  .d {
    font-family: 'IBM Plex Mono', 'Courier New', monospace;
    -webkit-font-smoothing: antialiased;
    background: var(--ink);
    color: var(--cream);
    overflow-x: hidden;
    width: 100%;
  }
  .ff { font-family: 'Bebas Neue', Impact, sans-serif; }

  /* Film grain overlay */
  .d::after {
    content:'';
    position:fixed; inset:0; pointer-events:none; z-index:9999;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:180px 180px; opacity:.032; mix-blend-mode:overlay;
  }

  /* Text gradients */
  .ot {
    background: linear-gradient(110deg,#FF6A00 0%,#FF4500 60%,#FF2500 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }

  /* Giant background watermark letters */
  .bg-wm {
    position:absolute;
    font-family:'Bebas Neue',sans-serif;
    font-size:clamp(120px,22vw,420px);
    font-weight:400; line-height:.85;
    color:rgba(242,237,228,.025); pointer-events:none; user-select:none;
    white-space:nowrap; z-index:0; letter-spacing:-.02em;
  }

  /* Scan line */
  @keyframes scanH {
    0%{top:-2px;opacity:.8} 100%{top:102%;opacity:0}
  }
  .scan { position:absolute; left:0; right:0; height:1.5px;
    background:linear-gradient(90deg,transparent,var(--orange),transparent);
    animation:scanH 4.5s linear infinite; pointer-events:none; }

  /* Viewfinder corner brackets */
  .vf-tl { position:absolute; top:16px; left:16px; width:22px; height:22px;
    border-top:2px solid rgba(255,69,0,.55); border-left:2px solid rgba(255,69,0,.55); pointer-events:none; }
  .vf-tr { position:absolute; top:16px; right:16px; width:22px; height:22px;
    border-top:2px solid rgba(255,69,0,.55); border-right:2px solid rgba(255,69,0,.55); pointer-events:none; }
  .vf-bl { position:absolute; bottom:16px; left:16px; width:22px; height:22px;
    border-bottom:2px solid rgba(255,69,0,.55); border-left:2px solid rgba(255,69,0,.55); pointer-events:none; }
  .vf-br { position:absolute; bottom:16px; right:16px; width:22px; height:22px;
    border-bottom:2px solid rgba(255,69,0,.55); border-right:2px solid rgba(255,69,0,.55); pointer-events:none; }

  /* Pulse dot */
  @keyframes pdot { 0%,100%{opacity:.55;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
  .pdot { animation:pdot 2.6s ease-in-out infinite; }

  /* Marquee */
  @keyframes marqX { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .mq { animation:marqX 22s linear infinite; white-space:nowrap; display:inline-flex; }
  .mq:hover { animation-play-state:paused; }

  /* Spin for reel */
  @keyframes rotZ { to{transform:rotate(360deg)} }
  .rot { animation:rotZ 20s linear infinite; }

  /* Service row */
  .srow {
    display:grid;
    grid-template-columns: 56px 1fr 32px;
    align-items:start;
    gap:clamp(12px,2vw,28px);
    padding:clamp(18px,3vw,36px) 0;
    border-bottom:1px solid var(--rule);
    cursor:default;
    transition:background .22s ease;
  }
  .srow:hover { background:rgba(255,69,0,.035); }
  .srow:hover .sn { color:var(--orange); }
  .srow:hover .sarr { opacity:1; transform:translate(0,0); }
  .sn { color:rgba(242,237,228,.18); transition:color .22s ease; font-family:'Bebas Neue',sans-serif; }
  .sarr { opacity:0; transform:translate(-6px,6px); transition:opacity .22s ease, transform .22s ease; color:var(--orange); flex-shrink:0; }

  /* Tool row */
  .trow {
    display:flex; align-items:center; justify-content:space-between;
    padding:14px 0 14px 14px;
    border-bottom:1px solid var(--rule);
    cursor:default; transition:color .22s ease;
  }
  .trow:hover { color:var(--orange); }
  .trow.lo { border-left:3px solid var(--orange); }
  .trow.hi { border-left:3px solid rgba(242,237,228,.10); }

  /* Buttons */
  .bn-solid {
    display:inline-flex; align-items:center; gap:9px;
    padding:13px 28px; background:var(--orange); color:#fff;
    font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:.06em;
    border:none; cursor:pointer; text-decoration:none;
    clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);
    transition:transform .22s ease, box-shadow .22s ease;
    white-space:nowrap;
  }
  .bn-solid:hover { transform:translateY(-3px); box-shadow:0 12px 36px rgba(255,69,0,.40); }

  .bn-ghost {
    display:inline-flex; align-items:center; gap:9px;
    padding:13px 28px; background:transparent; color:var(--cream);
    font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:.06em;
    border:1.5px solid rgba(242,237,228,.28); cursor:pointer; text-decoration:none;
    clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);
    transition:background .22s ease, border-color .22s ease, transform .22s ease;
    white-space:nowrap;
  }
  .bn-ghost:hover { background:rgba(242,237,228,.07); border-color:rgba(242,237,228,.55); transform:translateY(-3px); }

  /* Sections */
  .sec { padding:clamp(56px,8vw,110px) clamp(16px,5vw,72px); }
  .inn { max-width:1280px; margin:0 auto; width:100%; }

  /* Stat display number */
  .sval { font-family:'Bebas Neue',sans-serif; font-size:clamp(3rem,7vw,6rem); line-height:.9; color:var(--ink); }

  /* ── HERO CTA row ── */
  .hero-ctas {
    display:flex;
    flex-wrap:wrap;
    gap:12px;
    align-items:center;
  }

  /* ── Reel wrapper: hide on small screens ── */
  .reel-wrap {
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:12px;
    padding-bottom:4px;
    flex-shrink:0;
  }

  /* ── Hero grid ── */
  .hero-grid {
    display:grid;
    grid-template-columns: 1fr auto;
    align-items:flex-end;
    gap:clamp(20px,4vw,52px);
  }

  /* ── Stats grid ── */
  .stats-grid {
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:0;
  }

  .stat-cell {
    padding:clamp(20px,3vw,40px) clamp(14px,2vw,28px);
    border-right:1px solid rgba(9,8,15,.10);
  }
  .stat-cell:last-child { border-right:none; }
  .stat-cell:first-child { border-top:4px solid var(--orange); }

  /* ── CTA section grid ── */
  .cta-grid {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:clamp(32px,5vw,72px);
    align-items:center;
    min-height:clamp(320px,45vw,580px);
  }

  /* ── Why grid ── */
  .why-grid {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:clamp(40px,5vw,88px);
    align-items:start;
  }

  /* ── Tools grid ── */
  .tools-grid {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:clamp(36px,5vw,88px);
    align-items:start;
  }

  /* ── Services header grid ── */
  .srv-hdr {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:clamp(16px,3vw,52px);
    align-items:flex-end;
    margin-bottom:clamp(32px,5vw,64px);
  }

  /* ── CTA left orange stripe ── */
  .cta-stripe {
    position:absolute; top:0; left:0; bottom:0; width:50%;
    background:var(--orange);
    clip-path:polygon(0 0,90% 0,100% 100%,0 100%);
    pointer-events:none; z-index:0;
  }

  /* ────────── MOBILE ────────── */
  @media(max-width:767px){
    /* Hero */
    .hero-grid { grid-template-columns:1fr; }
    .reel-wrap { display:none; }

    /* Service rows */
    .srow { grid-template-columns:44px 1fr; }
    .sarr { display:none !important; }

    /* Why */
    .why-grid { grid-template-columns:1fr; }

    /* Stats: 2 columns on mobile */
    .stats-grid { grid-template-columns:1fr 1fr; }
    .stat-cell { border-right:none; border-bottom:1px solid rgba(9,8,15,.10); }
    .stat-cell:first-child { border-top:4px solid var(--orange); }
    .stat-cell:nth-child(odd) { border-right:1px solid rgba(9,8,15,.10); }
    .stat-cell:last-child { border-bottom:none; }

    /* Tools: single column */
    .tools-grid { grid-template-columns:1fr; }
    .tools-sticky { position:static !important; }

    /* CTA: single column */
    .cta-grid { grid-template-columns:1fr; min-height:auto; }
    .cta-stripe { display:none; }
    .cta-orange-side {
      background:var(--orange);
      padding:clamp(28px,5vw,48px) clamp(16px,4vw,32px);
      clip-path:none !important;
    }

    /* Srv header */
    .srv-hdr { grid-template-columns:1fr; }

    /* Hero CTAs */
    .hero-ctas { flex-direction:column; align-items:flex-start; }
    .hero-ctas > a { width:100%; justify-content:center; }
  }

  @media(max-width:480px){
    .stats-grid { grid-template-columns:1fr 1fr; }
    .sval { font-size:clamp(2.4rem,9vw,4rem); }
  }

  @media(min-width:768px) and (max-width:1024px){
    /* CTA stripe still visible but narrower */
    .cta-stripe { width:46%; }
  }
`;

/* ─────────────────────────────────────────────────────────────
   MOTION VARIANTS
───────────────────────────────────────────────────────────── */
const slideUp: Variants = {
  hidden:{ opacity:0, y:60 },
  show:(i:number)=>({ opacity:1, y:0, transition:{ duration:.75, delay:i*.1, ease:[.16,1,.3,1] } }),
};
const slideLeft: Variants = {
  hidden:{ opacity:0, x:-52 },
  show:{ opacity:1, x:0, transition:{ duration:.78, ease:[.16,1,.3,1] } },
};
const rowIn: Variants = {
  hidden:{ opacity:0, x:-28 },
  show:(i:number)=>({ opacity:1, x:0, transition:{ duration:.65, delay:i*.09, ease:[.16,1,.3,1] } }),
};
const fadeIn: Variants = {
  hidden:{ opacity:0, y:22 },
  show:{ opacity:1, y:0, transition:{ duration:.62, ease:[.16,1,.3,1] } },
};

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const SERVICES = [
  { n:'01', title:'Product Visualisation',   icon:<Camera size={20} strokeWidth={1.7}/>,      desc:'Photorealistic hero shots, 360° spins and deconstructed assembly views. No studio. No product prototype needed.' },
  { n:'02', title:'Physics & FX Simulation', icon:<Flame size={20} strokeWidth={1.7}/>,       desc:'Houdini-powered fire, fluid, cloth shatter and rigid-body dynamics. Cinematic weight on every frame.' },
  { n:'03', title:'Virtual Environments',    icon:<Layers size={20} strokeWidth={1.7}/>,      desc:'Full CG sets — photorealistic loft interiors, abstract brand worlds or alien terrain — built entirely in the machine.' },
  { n:'04', title:'Compositing & Grade',     icon:<Film size={20} strokeWidth={1.7}/>,        desc:'Multi-pass EXR compositing in Nuke. Deep colour grade. Delivered in every broadcast and social format.' },
  { n:'05', title:'Motion Graphics & Type',  icon:<Wand2 size={20} strokeWidth={1.7}/>,       desc:'Kinetic title cards, logo stings and animated type — crafted in Cinema 4D and After Effects to any spec.' },
  { n:'06', title:'Social & Platform Cuts',  icon:<MonitorPlay size={20} strokeWidth={1.7}/>, desc:'Every aspect ratio. Square, vertical, 16:9, ultra-wide. Optimised for the platform that matters to your brand.' },
];

const TOOLS = [
  { name:'Blender',         sub:'Modelling',      hi:true  },
  { name:'Maya',            sub:'Rigging & Anim', hi:false },
  { name:'Houdini',         sub:'FX & Sim',       hi:true  },
  { name:'Cinema 4D',       sub:'Motion',         hi:false },
  { name:'ZBrush',          sub:'Sculpt',         hi:true  },
  { name:'Substance 3D',    sub:'Texture',        hi:false },
  { name:'Redshift',        sub:'GPU Render',     hi:true  },
  { name:'Arnold',          sub:'Ray-trace',      hi:false },
  { name:'V-Ray',           sub:'Arch Viz',       hi:true  },
  { name:'After Effects',   sub:'Composite',      hi:false },
  { name:'Nuke',            sub:'VFX Comp',       hi:true  },
  { name:'Unreal Engine 5', sub:'Real-time',      hi:false },
  { name:'DaVinci Resolve', sub:'Grade',          hi:true  },
];

const STATS = [
  { val:'4K',  sup:'+',   label:'Resolution',        sub:'up to 8K on request' },
  { val:'120', sup:'fps', label:'Frame Rate',         sub:'real-time & offline' },
  { val:'48',  sup:'hr',  label:'Concept Turnaround', sub:'first render draft'  },
  { val:'100', sup:'%',   label:'Custom Production',  sub:'zero stock footage'  },
];

const WHY = [
  { icon:<Zap size={20} strokeWidth={1.8}/>,         title:'NO PHYSICAL CONSTRAINTS',  desc:'Showcase products before they exist. Build environments that could never be built. The brief is the only limit.' },
  { icon:<Package size={20} strokeWidth={1.8}/>,     title:'UNLIMITED ASSET VARIANTS',  desc:'Swap materials, colours, environments from a single master scene file — in hours, not shooting days.' },
  { icon:<ShieldCheck size={20} strokeWidth={1.8}/>, title:'BRAND-PIXEL-PERFECT',       desc:'Every colour matched to swatch. Every light placed by design. Zero off-brand shadows or uncontrolled reflections.' },
  { icon:<RefreshCcw size={20} strokeWidth={1.8}/>,  title:'REVISE WITHOUT RESHOOTING', desc:'Change the surface, sky or angle — all inside the software. No booking fees. No new shoot day required.' },
];

const MARQ = [
  'PHOTOREALISTIC CGI','HOUDINI FX','ZERO PHYSICAL LIMITS','PRODUCT VISUALISATION',
  'REDSHIFT · ARNOLD · V-RAY','VIRTUAL ENVIRONMENTS','IMPOSSIBLE SHOTS','BLENDER · MAYA · C4D',
  'MOTION COMPOSITING','BROADCAST DELIVERY',
];

const PROCESS_STEPS = [
  { step:'01', label:'BRIEF RECEIVED',   active:true  },
  { step:'02', label:'CONCEPT RENDER',   active:false },
  { step:'03', label:'APPROVED → BUILD', active:false },
  { step:'04', label:'FX & LIGHTING',    active:false },
  { step:'05', label:'FINAL DELIVERY',   active:false },
];

const CTA_PERKS = [
  { n:'001', t:'Free CGI Concept',   d:'A rendered mood-board draft delivered before you commit to anything.' },
  { n:'002', t:'48hr Turnaround',    d:'First concept render in 48 hours from brief received — guaranteed.' },
  { n:'003', t:'Unlimited Variants', d:'Swap colours, surfaces and environments from the master scene at no extra cost.' },
  { n:'004', t:'Every Format',       d:'ProRes, H.264, WebM, EXR — delivered precisely to platform spec.' },
];

/* ─────────────────────────────────────────────────────────────
   REEL SVG
───────────────────────────────────────────────────────────── */
const ReelSVG = () => (
  <svg width="170" height="170" viewBox="0 0 200 200" fill="none" className="rot"
    style={{ opacity:.60, flexShrink:0 }}>
    <circle cx="100" cy="100" r="95" stroke="rgba(255,69,0,.28)" strokeWidth="1.5"/>
    <circle cx="100" cy="100" r="72" stroke="rgba(255,69,0,.16)" strokeWidth="1" strokeDasharray="5 5"/>
    <circle cx="100" cy="100" r="50" stroke="rgba(255,69,0,.24)" strokeWidth="1.5"/>
    <circle cx="100" cy="100" r="16" stroke="rgba(255,69,0,.50)" strokeWidth="2"/>
    <circle cx="100" cy="100" r="5" fill="#FF4500"/>
    {[0,60,120,180,240,300].map(a => {
      const rad = a * Math.PI / 180;
      return <circle key={a} cx={100+72*Math.cos(rad)} cy={100+72*Math.sin(rad)} r="5" fill="rgba(255,69,0,.55)"/>;
    })}
    {[0,45,90,135,180,225,270,315].map(a => {
      const rad = a * Math.PI / 180;
      return <line key={a}
        x1={100+50*Math.cos(rad)} y1={100+50*Math.sin(rad)}
        x2={100+72*Math.cos(rad)} y2={100+72*Math.sin(rad)}
        stroke="rgba(255,69,0,.18)" strokeWidth="1"/>;
    })}
    <text x="100" y="107" textAnchor="middle" fill="rgba(242,237,228,.65)"
      style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:'.12em' }}>CGI</text>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   ① HERO
───────────────────────────────────────────────────────────── */
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end start'] });
  const bgY = useTransform(scrollYProgress,[0,1],['0%','28%']);
  const op  = useTransform(scrollYProgress,[0,.55],[1,0]);

  return (
    <section ref={ref} style={{
      position:'relative',
      overflow:'hidden',
      minHeight:'100svh',
      background:'var(--ink)',
      display:'flex',
      flexDirection:'column',
      justifyContent:'flex-end',
      padding:'0 clamp(16px,5vw,72px) clamp(48px,7vw,80px)',
    }}>
      {/* Watermark */}
      <motion.div aria-hidden style={{ y:bgY, position:'absolute', inset:0, pointerEvents:'none', zIndex:0 }}>
        <div className="bg-wm" style={{ top:'-4%', left:'-1%' }}>CGI</div>
        <div className="bg-wm" style={{ bottom:'-8%', right:'-1%' }}>ADS</div>
      </motion.div>

      {/* Diagonal right accent */}
      <div aria-hidden style={{
        position:'absolute', top:0, right:0, width:'38%', height:'100%',
        background:'linear-gradient(175deg,rgba(255,69,0,.09) 0%,rgba(255,69,0,.03) 100%)',
        clipPath:'polygon(22% 0,100% 0,100% 100%,0 100%)',
        pointerEvents:'none',
      }}/>
      <div aria-hidden style={{
        position:'absolute', top:0, right:'38%',
        width:1, height:'100%',
        background:'linear-gradient(180deg,transparent 0%,rgba(255,69,0,.30) 30%,rgba(255,69,0,.30) 70%,transparent 100%)',
        pointerEvents:'none',
      }}/>

      {/* Viewfinder corners */}
      <div className="vf-tl" style={{ zIndex:4 }}/>
      <div className="vf-tr" style={{ zIndex:4 }}/>
      <div className="vf-bl" style={{ zIndex:4 }}/>
      <div className="vf-br" style={{ zIndex:4 }}/>

      {/* Scan line */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:1 }}>
        <div className="scan"/>
      </div>

      {/* Status bar */}
      <div style={{
        position:'absolute', top:24, left:'clamp(16px,5vw,72px)', right:'clamp(16px,5vw,72px)',
        display:'flex', alignItems:'center', justifyContent:'space-between', zIndex:4,
        flexWrap:'wrap', gap:8,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div className="pdot" style={{ width:8, height:8, borderRadius:'50%', background:'var(--orange)', flexShrink:0 }}/>
          <span style={{ fontSize:10, fontWeight:700, letterSpacing:'.20em', color:'rgba(255,69,0,.80)', textTransform:'uppercase' }}>
            RENDER: ACTIVE
          </span>
        </div>
        <span style={{ fontSize:10, fontWeight:600, letterSpacing:'.14em', color:'var(--mid)' }}>
          FRAME 001 / ∞ · 4K · 120FPS
        </span>
      </div>

      {/* Main content */}
      <motion.div style={{ opacity:op, position:'relative', zIndex:2 }}>
        <div className="hero-grid">

          {/* Headline block */}
          <div style={{ minWidth:0 }}>
            {/* Lines */}
            {['REALITY IS', 'JUST A SETTING', 'WE CAN CHANGE.'].map((line, idx) => (
              <div key={line} style={{ overflow:'hidden', marginBottom: idx === 2 ? 36 : 2 }}>
                <motion.h1 className="ff"
                  initial={{ y:110, opacity:0 }} animate={{ y:0, opacity:1 }}
                  transition={{ duration:1.0, delay:.16 + idx*.08, ease:[.16,1,.3,1] }}
                  style={{
                    fontSize:'clamp(3rem,10vw,9.5rem)',
                    fontWeight:400, lineHeight:.88, letterSpacing:'.01em',
                    margin:0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                    color: idx === 1 ? undefined : 'var(--cream)',
                  }}
                >
                  {idx === 1 ? <span className="ot">{line}</span> : line}
                </motion.h1>
              </div>
            ))}

            <motion.div
              initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:.65, delay:.44 }}
              style={{ borderLeft:'3px solid var(--orange)', paddingLeft:16, maxWidth:400, marginBottom:36 }}
            >
              <p style={{ fontSize:'clamp(12px,1.4vw,14px)', color:'var(--mid)', lineHeight:1.82, fontWeight:500 }}>
                Photorealistic CGI ads for brands, film and e-commerce.
                No studio costs. No physical limitations.
                Your product in any world imaginable.
              </p>
            </motion.div>

            <motion.div className="hero-ctas"
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.60, delay:.54 }}
            >
              <Link href="/info/contact" className="bn-solid">
                Get a Quote <ArrowUpRight size={16}/>
              </Link>
              <Link href="/info/contact" className="bn-ghost">
                <Play size={13}/> View CGI Reel
              </Link>
              <span style={{ fontSize:10, color:'var(--mid)', fontWeight:700, letterSpacing:'.14em' }}>
                FREE 30-MIN BRIEF CALL
              </span>
            </motion.div>
          </div>

          {/* Reel — hidden on mobile via CSS */}
          <motion.div
            className="reel-wrap"
            initial={{ opacity:0, scale:.6, rotate:-90 }}
            animate={{ opacity:1, scale:1, rotate:0 }}
            transition={{ duration:1.2, delay:.30, ease:[.16,1,.3,1] }}
          >
            <ReelSVG/>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.20em', color:'var(--mid)', marginBottom:4 }}>CINEMA 4K</div>
              <div className="ff" style={{ fontSize:17, letterSpacing:'.04em', color:'var(--orange)', lineHeight:1.3 }}>
                BLENDER · MAYA<br/>HOUDINI · REDSHIFT
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div style={{
        position:'absolute', bottom:22, left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:5, zIndex:4,
      }}>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.7 }}
          style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
          <div style={{ width:20, height:30, border:'1.5px solid rgba(242,237,228,.28)',
            borderRadius:10, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:4 }}>
            <motion.div animate={{ y:[0,9,0] }} transition={{ duration:1.9, repeat:Infinity, ease:'easeInOut' }}
              style={{ width:4, height:7, borderRadius:99, background:'var(--orange)' }}/>
          </div>
          <span style={{ fontSize:9, fontWeight:700, letterSpacing:'.22em', color:'var(--mid)' }}>SCROLL</span>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   ② MARQUEE
───────────────────────────────────────────────────────────── */
const Marquee = () => {
  const items = [...MARQ,...MARQ,...MARQ];
  return (
    <div style={{ overflow:'hidden', background:'var(--orange)', padding:'11px 0',
      borderTop:'1px solid var(--odim)', borderBottom:'1px solid var(--odim)' }}>
      <div className="mq">
        {items.map((t,i) => (
          <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'0 22px', flexShrink:0 }}>
            <span className="ff" style={{ fontSize:17, letterSpacing:'.10em', color:'#fff', whiteSpace:'nowrap' }}>{t}</span>
            <span style={{ color:'rgba(255,255,255,.50)', fontSize:13 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   ③ SERVICES
───────────────────────────────────────────────────────────── */
const Services = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref,{ once:true, margin:'-60px' });
  const [hovered, setHovered] = useState<number|null>(null);

  return (
    <section ref={ref} className="sec" style={{ background:'var(--ink)' }}>
      <div className="inn">
        <div className="srv-hdr">
          <motion.div variants={slideLeft} initial="hidden" animate={inView?'show':'hidden'}>
            <h2 className="ff" style={{ fontSize:'clamp(2.6rem,6vw,5.5rem)', fontWeight:400, lineHeight:.88,
              letterSpacing:'.02em', color:'var(--cream)' }}>
              SIX CGI<br/><span className="ot">CAPABILITIES.</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeIn} initial="hidden" animate={inView?'show':'hidden'}
            style={{ fontSize:'clamp(12px,1.4vw,14px)', color:'var(--mid)', lineHeight:1.82, fontWeight:500, maxWidth:380, alignSelf:'flex-end' }}>
            From a single product still to a full broadcast campaign —
            every frame handcrafted inside the render engine. No physical shoot required.
          </motion.p>
        </div>

        <div>
          {SERVICES.map((s,i) => (
            <motion.div key={s.n}
              className="srow"
              variants={rowIn} custom={i} initial="hidden" animate={inView?'show':'hidden'}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="sn ff"
                style={{ fontSize:'clamp(1.7rem,3.5vw,3rem)', lineHeight:1,
                  color: hovered===i ? 'var(--orange)' : 'rgba(242,237,228,.18)', whiteSpace:'nowrap' }}>
                {s.n}
              </div>
              <div style={{ minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:7, flexWrap:'wrap' }}>
                  <div style={{ color: hovered===i ? 'var(--orange)' : 'var(--mid)', transition:'color .22s ease', flexShrink:0 }}>
                    {s.icon}
                  </div>
                  <h3 className="ff"
                    style={{ fontSize:'clamp(1.2rem,2.5vw,2.1rem)', fontWeight:400, letterSpacing:'.04em',
                      color: hovered===i ? 'var(--cream)' : 'rgba(242,237,228,.78)', transition:'color .22s ease' }}>
                    {s.title}
                  </h3>
                </div>
                <p style={{ fontSize:12, color:'var(--mid)', lineHeight:1.76, maxWidth:520, fontWeight:500 }}>
                  {s.desc}
                </p>
              </div>
              <div className="sarr"><ArrowUpRight size={22} strokeWidth={1.8}/></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   ④ WHY CGI
───────────────────────────────────────────────────────────── */
const WhyCGI = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref,{ once:true, margin:'-80px' });

  return (
    <section ref={ref} style={{ background:'var(--ink)', borderTop:'1px solid var(--rule)', position:'relative', overflow:'hidden' }}>
      <div className="bg-wm" aria-hidden style={{ bottom:'-12%', right:'-2%' }}>WHY</div>

      <div className="inn sec">
        <div className="why-grid">
          {/* LEFT */}
          <motion.div variants={slideLeft} initial="hidden" animate={inView?'show':'hidden'}>
            <h2 className="ff" style={{ fontSize:'clamp(2.4rem,5.5vw,5.2rem)', fontWeight:400, lineHeight:.88,
              letterSpacing:'.02em', marginBottom:40, color:'var(--cream)' }}>
              ADVERTISING<br/>WITHOUT<br/><span className="ot">BOUNDARIES.</span>
            </h2>

            {WHY.map((w,i) => (
              <motion.div key={w.title}
                variants={rowIn} custom={i} initial="hidden" animate={inView?'show':'hidden'}
                style={{ display:'grid', gridTemplateColumns:'36px 1fr', gap:14,
                  padding:'20px 0', borderBottom: i<WHY.length-1 ? '1px solid var(--rule)' : 'none' }}>
                <div style={{ color:'var(--orange)', paddingTop:2, flexShrink:0 }}>{w.icon}</div>
                <div>
                  <div className="ff" style={{ fontSize:'clamp(1rem,2vw,1.5rem)', letterSpacing:'.04em', color:'var(--cream)', marginBottom:6 }}>
                    {w.title}
                  </div>
                  <p style={{ fontSize:12, color:'var(--mid)', lineHeight:1.76, fontWeight:500 }}>
                    {w.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT — process box */}
          <motion.div variants={slideUp} custom={0} initial="hidden" animate={inView?'show':'hidden'}
            style={{ position:'relative' }}>
            <div aria-hidden style={{
              position:'absolute', inset:0, background:'rgba(204,51,0,.38)',
              transform:'translate(10px,10px)', zIndex:-1,
              clipPath:'polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%)',
            }}/>
            <div style={{
              background:'var(--orange)', position:'relative', overflow:'hidden',
              padding:'clamp(28px,4vw,48px) clamp(20px,3.5vw,44px)',
              clipPath:'polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%)',
            }}>
              <div className="vf-tl"/><div className="vf-tr"/><div className="vf-bl"/><div className="vf-br"/>
              <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
                <div className="scan" style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent)' }}/>
              </div>

              <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.22em', color:'rgba(255,255,255,.65)', marginBottom:20, textTransform:'uppercase' }}>
                PRODUCTION PIPELINE
              </div>

              {PROCESS_STEPS.map((s,i) => (
                <div key={s.step}
                  style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 0',
                    borderBottom: i<4 ? '1px solid rgba(255,255,255,.16)' : 'none' }}>
                  <div className="ff" style={{ fontSize:22, color:'rgba(255,255,255,.32)', flexShrink:0 }}>{s.step}</div>
                  <div className="ff" style={{ fontSize:'clamp(.95rem,2.2vw,1.6rem)', letterSpacing:'.05em',
                    color: s.active ? '#fff' : 'rgba(255,255,255,.76)' }}>{s.label}</div>
                  {s.active && (
                    <div className="pdot" style={{ marginLeft:'auto', width:9, height:9, borderRadius:'50%',
                      background:'#fff', boxShadow:'0 0 12px rgba(255,255,255,.70)', flexShrink:0 }}/>
                  )}
                </div>
              ))}

              <div style={{ marginTop:24, paddingTop:18, borderTop:'1px solid rgba(255,255,255,.16)',
                display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:'.14em', color:'rgba(255,255,255,.65)', textTransform:'uppercase' }}>
                  TURNAROUND: 48HR CONCEPT
                </span>
                <ArrowUpRight size={18} color="#fff"/>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   ⑤ NUMBERS
───────────────────────────────────────────────────────────── */
const Numbers = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref,{ once:true, margin:'-80px' });

  return (
    <section ref={ref} style={{ background:'var(--cream)', position:'relative', overflow:'hidden' }}>
      <div aria-hidden style={{ position:'absolute', top:0, left:0, right:0, height:48,
        background:'var(--ink)', clipPath:'polygon(0 0,100% 0,100% 100%,0 0)' }}/>
      <div aria-hidden style={{ position:'absolute', bottom:0, left:0, right:0, height:48,
        background:'var(--ink)', clipPath:'polygon(0 100%,100% 0,100% 100%)' }}/>

      <div className="inn sec" style={{ paddingTop:'clamp(72px,9vw,130px)', paddingBottom:'clamp(72px,9vw,130px)' }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(36px,5vw,60px)', overflow:'hidden' }}>
          <motion.h2 className="ff"
            initial={{ y:52, opacity:0 }} animate={inView?{ y:0,opacity:1 }:{}}
            transition={{ duration:.88, delay:.08, ease:[.16,1,.3,1] }}
            style={{ fontSize:'clamp(2.2rem,5.5vw,4.5rem)', fontWeight:400, lineHeight:.90, letterSpacing:'.02em', color:'var(--ink)' }}>
            CINEMA-GRADE OUTPUT.<br/><span className="ot">EVERY SINGLE FRAME.</span>
          </motion.h2>
        </div>

        <div className="stats-grid">
          {STATS.map((s,i) => (
            <motion.div key={s.label}
              className="stat-cell"
              variants={slideUp} custom={i} initial="hidden" animate={inView?'show':'hidden'}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:3, marginBottom:8 }}>
                <div className="sval">{s.val}</div>
                <span className="ff" style={{ fontSize:'clamp(1.2rem,3vw,2.4rem)', color:'var(--orange)', marginTop:6, letterSpacing:'.02em' }}>{s.sup}</span>
              </div>
              <div className="ff" style={{ fontSize:'clamp(.9rem,2vw,1.5rem)', letterSpacing:'.05em', color:'var(--ink)', marginBottom:5 }}>
                {s.label}
              </div>
              <div style={{ fontSize:10, fontWeight:600, color:'rgba(9,8,15,.40)', letterSpacing:'.12em', textTransform:'uppercase' }}>
                {s.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   ⑥ TOOLS
───────────────────────────────────────────────────────────── */
const Tools = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref,{ once:true, margin:'-80px' });

  return (
    <section ref={ref} className="sec" style={{ background:'var(--ink)', borderTop:'1px solid var(--rule)', position:'relative', overflow:'hidden' }}>
      <div className="bg-wm" aria-hidden style={{ top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}>FX</div>

      <div className="inn">
        <div className="tools-grid">
          <motion.div className="tools-sticky" variants={slideLeft} initial="hidden" animate={inView?'show':'hidden'}
            style={{ position:'sticky', top:100 }}>
            <h2 className="ff" style={{ fontSize:'clamp(2.6rem,6.5vw,6rem)', fontWeight:400, lineHeight:.88,
              letterSpacing:'.02em', color:'var(--cream)', marginBottom:20 }}>
              INDUSTRY<br/>TOOLS.<br/><span className="ot">EXPERT<br/>OPERATORS.</span>
            </h2>
            <p style={{ fontSize:12, color:'var(--mid)', lineHeight:1.76, fontWeight:500, maxWidth:300 }}>
              Battle-tested software stack used on real productions — operated by specialists who know the craft.
            </p>
          </motion.div>

          <div>
            {TOOLS.map((t,i) => (
              <motion.div key={t.name}
                className={`trow ${t.hi ? 'lo' : 'hi'}`}
                variants={rowIn} custom={i} initial="hidden" animate={inView?'show':'hidden'}>
                <div style={{ display:'flex', alignItems:'center', gap:0, flexWrap:'wrap', minWidth:0 }}>
                  <span className="ff" style={{ fontSize:'clamp(1.1rem,2.4vw,1.9rem)', letterSpacing:'.04em',
                    color: t.hi ? 'var(--cream)' : 'rgba(242,237,228,.60)' }}>{t.name}</span>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:'.18em', color:'var(--mid)',
                    marginLeft:12, textTransform:'uppercase' }}>{t.sub}</span>
                </div>
                <div className="ff" style={{ fontSize:12, letterSpacing:'.10em', color:'rgba(255,69,0,.60)', flexShrink:0, marginLeft:8 }}>
                  {String(i+1).padStart(2,'0')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   ⑦ CTA
───────────────────────────────────────────────────────────── */
const CTA = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref,{ once:true, margin:'-80px' });

  return (
    <section ref={ref} style={{ position:'relative', overflow:'hidden', background:'var(--ink)' }}>
      {/* Orange left stripe — desktop only (hidden via CSS on mobile) */}
      <div className="cta-stripe" aria-hidden/>
      <div style={{ position:'absolute', top:0, left:0, bottom:0, width:'50%',
        overflow:'hidden', pointerEvents:'none', zIndex:1 }}>
        <div className="scan" style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)' }}/>
      </div>

      <div className="inn sec" style={{ position:'relative', zIndex:2 }}>
        <div className="cta-grid">
          {/* Orange side */}
          <motion.div
            className="cta-orange-side"
            variants={slideLeft} initial="hidden" animate={inView?'show':'hidden'}
            style={{ padding:'clamp(0px,1vw,8px) 0' }}
          >
            <h2 className="ff" style={{ fontSize:'clamp(2.4rem,6vw,5.5rem)', fontWeight:400, lineHeight:.86,
              letterSpacing:'.02em', color:'#fff', marginBottom:32 }}>
              READY TO<br/>RENDER<br/>SOMETHING<br/>IMPOSSIBLE?
            </h2>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <Link href="/info/contact" style={{
                display:'inline-flex', alignItems:'center', gap:9,
                padding:'13px 28px', background:'#fff', color:'var(--orange)',
                fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:'.06em',
                clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)',
                textDecoration:'none', whiteSpace:'nowrap',
              }}>
                GET A QUOTE <ArrowUpRight size={16}/>
              </Link>
              <Link href="/info/contact" style={{
                display:'inline-flex', alignItems:'center', gap:9,
                padding:'13px 28px', background:'transparent', color:'#fff',
                fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:'.06em',
                border:'1.5px solid rgba(255,255,255,.45)',
                clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)',
                textDecoration:'none', whiteSpace:'nowrap',
              }}>
                <Play size={13}/> VIEW REEL
              </Link>
            </div>
          </motion.div>

          {/* Dark side */}
          <motion.div variants={slideUp} custom={0} initial="hidden" animate={inView?'show':'hidden'}>
            {CTA_PERKS.map((p,i) => (
              <motion.div key={p.n}
                variants={rowIn} custom={i} initial="hidden" animate={inView?'show':'hidden'}
                style={{ display:'grid', gridTemplateColumns:'48px 1fr', gap:12,
                  padding:'16px 0', borderBottom: i<3 ? '1px solid var(--rule)' : 'none' }}>
                <div className="ff" style={{ fontSize:'clamp(.9rem,2.2vw,1.7rem)', color:'rgba(242,237,228,.20)', letterSpacing:'.04em', paddingTop:2 }}>
                  {p.n}
                </div>
                <div>
                  <div className="ff" style={{ fontSize:'clamp(.95rem,2vw,1.5rem)', letterSpacing:'.04em', color:'var(--cream)', marginBottom:5 }}>
                    {p.t}
                  </div>
                  <p style={{ fontSize:12, color:'var(--mid)', lineHeight:1.76, fontWeight:500 }}>
                    {p.d}
                  </p>
                </div>
              </motion.div>
            ))}

            <div style={{ marginTop:28, paddingTop:20, borderTop:'1px solid var(--rule)',
              display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
              <div className="pdot" style={{ width:9, height:9, borderRadius:'50%', background:'var(--lime)',
                boxShadow:'0 0 14px rgba(200,255,0,.70)', flexShrink:0 }}/>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:'.16em', color:'var(--lime)', textTransform:'uppercase' }}>
                NOW ACCEPTING NEW CGI PRODUCTIONS
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────── */
export default function CGIAdsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>
      <div className="d">
        <Hero/>
        <Marquee/>
        <Services/>
        <WhyCGI/>
        <Numbers/>
        <Tools/>
        <CTA/>
      </div>
    </>
  );
}