'use client';

/**
 * 3D Animation Service Page — Cartoonish Studio Theme 🎨
 * Next.js 16 · TypeScript · Turbopack · Framer Motion · Lucide React
 *
 * ✅ Zero type errors   ✅ Zero build errors
 * ✅ Cartoonish bubbly vibe — thick borders, offset shadows, bright candy palette
 * ✅ useInView scroll triggers · Mobile-first · Fully responsive
 */

import React, { useRef, memo, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import {
  Box,
  Layers,
  Sparkles,
  Play,
  Cpu,
  Aperture,
  Triangle,
  Hexagon,
  Orbit,
  Wand2,
  Film,
  MonitorPlay,
  Blend,
  Scan,
  ArrowUpRight,
  ChevronRight,
  Star,
  Lightbulb,
  Palette,
  Clapperboard,
  Flame,
  Zap,
  Wind,
  Mountain,
  Brush,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@500;600;700;800;900&display=swap');

  :root {
    --bg:        #FFF8EE;
    --bg2:       #FFF2E0;
    --cream:     #FFEFD0;
    --ink:       #1A0A00;
    --coral:     #FF5733;
    --orange:    #FF8C42;
    --yellow:    #FFD93D;
    --sky:       #4CC9F0;
    --mint:      #06D6A0;
    --purple:    #9B5DE5;
    --pink:      #F72585;
    --red:       #EF233C;
    --text:      #1A0A00;
    --muted:     rgba(26,10,0,0.52);
    --white:     #ffffff;

    /* cartoon card system */
    --border-thick:  3px solid #1A0A00;
    --border-med:    2.5px solid #1A0A00;
    --border-thin:   2px solid #1A0A00;
    --shadow-coral:  6px 6px 0px 0px #CC3300;
    --shadow-sky:    6px 6px 0px 0px #0077AA;
    --shadow-yellow: 6px 6px 0px 0px #CC9900;
    --shadow-mint:   6px 6px 0px 0px #009966;
    --shadow-purple: 6px 6px 0px 0px #6622AA;
    --shadow-pink:   6px 6px 0px 0px #AA0055;
    --shadow-ink:    6px 6px 0px 0px #1A0A00;
    --shadow-ink-sm: 4px 4px 0px 0px #1A0A00;
    --shadow-ink-xs: 3px 3px 0px 0px #1A0A00;
  }

  .td *, .td *::before, .td *::after { box-sizing: border-box; }
  .td {
    font-family: 'Nunito', 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
  }

  .font-display { font-family: 'Boogaloo', cursive; }

  /* ── Polka dot bg ── */
  .polka {
    background-color: var(--bg);
    background-image: radial-gradient(circle, rgba(26,10,0,0.07) 1.5px, transparent 1.5px);
    background-size: 28px 28px;
  }
  .polka-cream {
    background-color: var(--bg2);
    background-image: radial-gradient(circle, rgba(26,10,0,0.06) 1.5px, transparent 1.5px);
    background-size: 28px 28px;
  }

  /* ── Diagonal stripe ── */
  .stripe-bg {
    background-image: repeating-linear-gradient(
      45deg,
      rgba(26,10,0,0.025) 0px, rgba(26,10,0,0.025) 1px,
      transparent 1px, transparent 18px
    );
  }

  /* ── Gradient text helpers ── */
  @keyframes rainbowShift {
    0%,100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }
  .rainbow-text {
    background: linear-gradient(125deg, #FF5733 0%, #FF8C42 18%, #FFD93D 36%, #06D6A0 54%, #4CC9F0 72%, #9B5DE5 88%, #F72585 100%);
    background-size: 300% 300%;
    animation: rainbowShift 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .coral-text {
    background: linear-gradient(135deg, #FF5733 0%, #FF8C42 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Animations ── */
  @keyframes wobble {
    0%,100% { transform: rotate(-2deg) scale(1); }
    25%     { transform: rotate(2.5deg) scale(1.03); }
    50%     { transform: rotate(-1.5deg) scale(0.98); }
    75%     { transform: rotate(3deg) scale(1.02); }
  }
  .wobble { animation: wobble 3.5s ease-in-out infinite; }

  @keyframes float-up {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-14px); }
  }
  .float-a { animation: float-up 3.2s ease-in-out infinite; }
  .float-b { animation: float-up 3.8s ease-in-out infinite 0.5s; }
  .float-c { animation: float-up 4.2s ease-in-out infinite 1.1s; }
  .float-d { animation: float-up 3.5s ease-in-out infinite 1.8s; }
  .float-e { animation: float-up 4.6s ease-in-out infinite 0.3s; }
  .float-f { animation: float-up 3.0s ease-in-out infinite 2.3s; }

  @keyframes spinSlow  { to { transform: rotate(360deg); } }
  @keyframes spinSlowR { to { transform: rotate(-360deg); } }
  .spin-s  { animation: spinSlow  8s linear infinite; }
  .spin-sr { animation: spinSlowR 12s linear infinite; }

  @keyframes blobPulse {
    0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1); }
    33%     { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: scale(1.04); }
    66%     { border-radius: 70% 30% 50% 50% / 30% 40% 60% 50%; transform: scale(0.97); }
  }
  .blob { animation: blobPulse 8s ease-in-out infinite; }

  @keyframes bounce-x {
    0%,100% { transform: translateX(0); }
    50%     { transform: translateX(6px); }
  }
  .bounce-x { animation: bounce-x 1.2s ease-in-out infinite; }

  @keyframes jelly {
    0%,100% { transform: scale(1,1); }
    25%     { transform: scale(0.95,1.05); }
    50%     { transform: scale(1.05,0.95); }
    75%     { transform: scale(0.97,1.03); }
  }
  .jelly { animation: jelly 2.6s ease-in-out infinite; }

  @keyframes star-spin {
    from { transform: rotate(0deg) scale(1); }
    50%  { transform: rotate(180deg) scale(1.15); }
    to   { transform: rotate(360deg) scale(1); }
  }
  .star-spin { animation: star-spin 4s linear infinite; }

  /* ── Ticker ── */
  @keyframes tickerX { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .ticker-inner { animation: tickerX 28s linear infinite; white-space: nowrap; }
  .ticker-inner:hover { animation-play-state: paused; }

  /* ── Scroll cue ── */
  @keyframes scrollBounce {
    0%,100% { transform: translateY(0); opacity: 1; }
    50%     { transform: translateY(8px); opacity: 0.4; }
  }
  .scroll-cue { animation: scrollBounce 1.5s ease-in-out infinite; }

  /* ── Sticker badge ── */
  .sticker {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 18px;
    border-radius: 50px;
    border: var(--border-thick);
    font-family: 'Boogaloo', cursive;
    font-size: 13px;
    letter-spacing: .06em;
    box-shadow: var(--shadow-ink-xs);
  }

  /* ── Cartoon card ── */
  .card-cartoon {
    background: #fff;
    border: var(--border-thick);
    border-radius: 22px;
    box-shadow: var(--shadow-ink);
    transition: transform .22s cubic-bezier(.34,1.56,.64,1),
                box-shadow .22s ease;
    position: relative; overflow: hidden;
    cursor: default;
  }
  .card-cartoon:hover {
    transform: translate(-3px,-5px);
    box-shadow: 9px 9px 0px 0px #1A0A00;
  }

  .card-process {
    background: #fff;
    border: var(--border-thick);
    border-radius: 24px;
    box-shadow: var(--shadow-ink);
    transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s ease;
    position: relative; overflow: hidden;
  }
  .card-process:hover {
    transform: translate(-3px,-5px);
    box-shadow: 9px 9px 0px 0px #1A0A00;
  }

  .card-stat {
    background: #fff;
    border: var(--border-thick);
    border-radius: 24px;
    transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s ease;
    position: relative; overflow: hidden;
  }

  .tool-pill {
    background: #fff;
    border: var(--border-med);
    border-radius: 50px;
    box-shadow: var(--shadow-ink-xs);
    transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s ease;
    cursor: default;
  }
  .tool-pill:hover {
    transform: translate(-2px,-4px);
    box-shadow: 5px 5px 0px 0px #1A0A00;
  }

  /* ── Primary button ── */
  .btn-main {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 14px 32px; border-radius: 50px;
    background: var(--coral); color: #fff;
    font-family: 'Boogaloo', cursive;
    font-size: 17px; letter-spacing: .04em;
    border: var(--border-thick);
    box-shadow: 5px 5px 0px 0px #CC3300;
    transition: transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .18s ease;
    text-decoration: none; cursor: pointer;
  }
  .btn-main:hover  { transform: translate(-2px,-3px); box-shadow: 7px 7px 0px 0px #CC3300; }
  .btn-main:active { transform: translate(2px,2px); box-shadow: 2px 2px 0px 0px #CC3300; }

  .btn-outline {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 14px 32px; border-radius: 50px;
    background: transparent; color: var(--ink);
    font-family: 'Boogaloo', cursive;
    font-size: 17px; letter-spacing: .04em;
    border: var(--border-thick);
    box-shadow: 5px 5px 0px 0px #1A0A00;
    transition: transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .18s ease, background .18s ease;
    text-decoration: none; cursor: pointer;
  }
  .btn-outline:hover  { background: var(--yellow); transform: translate(-2px,-3px); box-shadow: 7px 7px 0px 0px #1A0A00; }
  .btn-outline:active { transform: translate(2px,2px); box-shadow: 2px 2px 0px 0px #1A0A00; }

  /* ── Helpers ── */
  .sec { padding: clamp(72px,9vw,120px) clamp(20px,5vw,60px); }
  .inn { max-width: 1220px; margin: 0 auto; }
  .sec-head { text-align: center; margin-bottom: clamp(44px,6vw,68px); }

  @media (max-width: 640px) {
    .hero-btns > * { width: 100%; justify-content: center; }
    .hero-btns { flex-direction: column; align-items: center; }
  }
`;

/* ─────────────────────────────────────────────────────────────
   SHARED VARIANTS
───────────────────────────────────────────────────────────── */
const bounceUp: Variants = {
  hidden: { opacity: 0, y: 52, scale: .92 },
  show: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * .07, type: 'spring', stiffness: 280, damping: 18 },
  }),
};
const popIn: Variants = {
  hidden: { opacity: 0, scale: .70, rotate: -4 },
  show: (i: number) => ({
    opacity: 1, scale: 1, rotate: 0,
    transition: { delay: i * .06, type: 'spring', stiffness: 320, damping: 16 },
  }),
};
const fadeSlide: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: .55, ease: [.16, 1, .3, 1] } },
};

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
interface CapItem {
  icon: React.ReactNode; title: string; desc: string;
  bg: string; accent: string; shadow: string; emoji: string;
}
const CAPABILITIES: CapItem[] = [
  { icon:<Box size={22} strokeWidth={2}/>,        title:'3D Modelling',           desc:'High-polygon hero meshes, environment props and hard-surface assets with PBR textures — every vertex placed with purpose.',             bg:'#FFE8E4', accent:'#FF5733', shadow:'5px 5px 0 #CC3300',    emoji:'📦' },
  { icon:<Layers size={22} strokeWidth={2}/>,     title:'Rigging & Skinning',     desc:'Anatomically correct character rigs, facial blend-shapes and IK/FK control rigs for natural, expressive movement.',                    bg:'#FFF5CC', accent:'#E6AC00', shadow:'5px 5px 0 #CC9900',    emoji:'🦴' },
  { icon:<Wand2 size={22} strokeWidth={2}/>,      title:'Character Animation',    desc:'Keyframe and mocap-driven hero performances — from subtle blinks and breathing cycles to full action set-pieces.',                    bg:'#E6F9F2', accent:'#06D6A0', shadow:'5px 5px 0 #009966',    emoji:'🎭' },
  { icon:<Flame size={22} strokeWidth={2}/>,      title:'VFX & Simulations',      desc:'Fluid dynamics, pyro fire/smoke, cloth teardown, soft-body physics and particle floods — Houdini-powered, cinema-quality.',            bg:'#E8F4FD', accent:'#4CC9F0', shadow:'5px 5px 0 #0077AA',    emoji:'💥' },
  { icon:<Aperture size={22} strokeWidth={2}/>,   title:'Lighting & Rendering',   desc:'HDRI three-point setups and full ray-traced lighting pipelines — Redshift, V-Ray and Arnold — producing photorealistic final frames.', bg:'#F3EEFF', accent:'#9B5DE5', shadow:'5px 5px 0 #6622AA',    emoji:'💡' },
  { icon:<Film size={22} strokeWidth={2}/>,       title:'Compositing',            desc:'Multi-layer EXR compositing in Nuke or After Effects, colour grading, lens distortion and atmospheric effects.',                       bg:'#FFE4F5', accent:'#F72585', shadow:'5px 5px 0 #AA0055',    emoji:'🎬' },
  { icon:<MonitorPlay size={22} strokeWidth={2}/>,title:'Real-time & Game-ready', desc:'Unreal Engine 5 / Unity game-ready assets with LOD chains, baked lightmaps and WebGL optimised meshes at any poly budget.',           bg:'#FFF5CC', accent:'#E6AC00', shadow:'5px 5px 0 #CC9900',    emoji:'🕹️' },
  { icon:<Blend size={22} strokeWidth={2}/>,      title:'Motion Graphics',        desc:'Logo stings, broadcast title cards, kinetic typography and social-format animations — delivered frame-perfect in any spec.',            bg:'#FFE8E4', accent:'#FF8C42', shadow:'5px 5px 0 #CC5500',    emoji:'✨' },
];

interface StyleItem {
  icon: React.ReactNode; title: string; desc: string;
  label: string; bg: string; accent: string; shadow: string; emoji: string;
}
const STYLES: StyleItem[] = [
  { icon:<Scan size={26} strokeWidth={2}/>,      title:'Hyper-realism',    desc:'Indistinguishable from live-action — product viz, arch renders and cinematic trailer hero shots.',   label:'Photo-real',   bg:'#FFE8E4', accent:'#FF5733', shadow:'5px 5px 0 #CC3300', emoji:'📸' },
  { icon:<Sparkles size={26} strokeWidth={2}/>,  title:'Stylised & Toon',  desc:'Bold colour, exaggerated proportions and expressive worlds — from Studio Ghibli warmth to Pixar charm.', label:'Toon / Stylised', bg:'#FFF5CC', accent:'#E6AC00', shadow:'5px 5px 0 #CC9900', emoji:'🎨' },
  { icon:<Cpu size={26} strokeWidth={2}/>,       title:'Sci-fi & Hard-surface', desc:'Greebled mechanical environments, mech designs and tech-brand VFX for the future-facing story.', label:'Futuristic',   bg:'#E8F4FD', accent:'#4CC9F0', shadow:'5px 5px 0 #0077AA', emoji:'🤖' },
  { icon:<Mountain size={26} strokeWidth={2}/>,  title:'Architectural Viz',desc:'Photorealistic walkthroughs, hero stills and lighting studies for developers and interior studios.',  label:'Arch Viz',     bg:'#E6F9F2', accent:'#06D6A0', shadow:'5px 5px 0 #009966', emoji:'🏛️' },
  { icon:<Orbit size={26} strokeWidth={2}/>,     title:'Character & Mascot', desc:'Expressive hero characters, brand mascots and multi-platform avatar rigs built for any pipeline.', label:'Characters',   bg:'#F3EEFF', accent:'#9B5DE5', shadow:'5px 5px 0 #6622AA', emoji:'🦸' },
  { icon:<Box size={26} strokeWidth={2}/>,       title:'Product Animation', desc:'360° hero shots, exploded assembly views and shatter reveals for e-commerce and crowdfunding.',       label:'Product',      bg:'#FFE4F5', accent:'#F72585', shadow:'5px 5px 0 #AA0055', emoji:'📦' },
];

const STATS = [
  { value:'4K+', label:'Resolution Output',      sub:'Film & broadcast ready',  bg:'#FF5733', shadow:'6px 6px 0 #CC3300', emoji:'🎞️' },
  { value:'60',  label:'Frames Per Second',       sub:'Silky real-time renders', bg:'#FFD93D', shadow:'6px 6px 0 #CC9900', emoji:'⚡' },
  { value:'∞',   label:'Creative Possibilities',  sub:'No concept too complex',  bg:'#9B5DE5', shadow:'6px 6px 0 #6622AA', emoji:'🌟' },
  { value:'100%',label:'Custom Assets',           sub:'Zero stock, all original', bg:'#06D6A0', shadow:'6px 6px 0 #009966', emoji:'🎯' },
];

interface ToolItem { name: string; role: string; icon: React.ReactNode; bg: string; accent: string; emoji: string; }
const TOOLS: ToolItem[] = [
  { name:'Blender',       role:'Modelling',   icon:<Box size={18} strokeWidth={2}/>,        bg:'#FFE8E4', accent:'#FF5733', emoji:'🟠' },
  { name:'Maya',          role:'Rigging',     icon:<Layers size={18} strokeWidth={2}/>,     bg:'#E8F4FD', accent:'#4CC9F0', emoji:'🔵' },
  { name:'Cinema 4D',     role:'Motion',      icon:<Wand2 size={18} strokeWidth={2}/>,      bg:'#FFF5CC', accent:'#E6AC00', emoji:'🟡' },
  { name:'Houdini',       role:'FX & Sim',    icon:<Wind size={18} strokeWidth={2}/>,       bg:'#E6F9F2', accent:'#06D6A0', emoji:'🟢' },
  { name:'ZBrush',        role:'Sculpting',   icon:<Brush size={18} strokeWidth={2}/>,      bg:'#FFE4F5', accent:'#F72585', emoji:'🩷' },
  { name:'Substance 3D',  role:'Texturing',   icon:<Palette size={18} strokeWidth={2}/>,    bg:'#FFE8E4', accent:'#FF8C42', emoji:'🟠' },
  { name:'Unreal Engine', role:'Real-time',   icon:<MonitorPlay size={18} strokeWidth={2}/>,bg:'#F3EEFF', accent:'#9B5DE5', emoji:'🟣' },
  { name:'After Effects', role:'Compositing', icon:<Film size={18} strokeWidth={2}/>,       bg:'#E8F4FD', accent:'#4CC9F0', emoji:'🔵' },
  { name:'Nuke',          role:'VFX Comp',    icon:<Aperture size={18} strokeWidth={2}/>,   bg:'#FFF5CC', accent:'#E6AC00', emoji:'🟡' },
  { name:'Redshift',      role:'Rendering',   icon:<Orbit size={18} strokeWidth={2}/>,      bg:'#FFE8E4', accent:'#FF5733', emoji:'🔴' },
  { name:'V-Ray',         role:'Arch Viz',    icon:<Scan size={18} strokeWidth={2}/>,       bg:'#E6F9F2', accent:'#06D6A0', emoji:'🟢' },
  { name:'Unity',         role:'Game-ready',  icon:<Cpu size={18} strokeWidth={2}/>,        bg:'#FFE4F5', accent:'#F72585', emoji:'🩷' },
];

const TICKER_ITEMS = [
  '✦ 3D MODELLING','✦ CHARACTER ANIMATION','✦ VFX SIMULATION','✦ CINEMATIC LIGHTING',
  '✦ ARCH VIZ','✦ GAME-READY ASSETS','✦ MOTION GRAPHICS','✦ HOUDINI FX','✦ SCULPTING IN ZBRUSH',
  '✦ PHOTOREALISTIC RENDER','✦ RIGGING & SKINNING','✦ REAL-TIME UNREAL ENGINE',
];

const PROCESS = [
  { n:'01', title:'Brief & Concept',     desc:'We break down your creative brief, build mood boards and lock the visual direction — before a single polygon is pulled.',                color:'#FF5733', shadow:'5px 5px 0 #CC3300', bg:'#FFE8E4', emoji:'📋' },
  { n:'02', title:'Model & Texture',     desc:'Geometry is blocked, refined to final resolution and textured with PBR materials — shot-ready in your exact art style.',               color:'#E6AC00', shadow:'5px 5px 0 #CC9900', bg:'#FFF5CC', emoji:'🧱' },
  { n:'03', title:'Rig & Animate',       desc:'Characters get anatomical rigs with blend-shapes; keyframe animation or cleaned mocap data is refined right to the frame.',            color:'#06D6A0', shadow:'5px 5px 0 #009966', bg:'#E6F9F2', emoji:'💃' },
  { n:'04', title:'Render & Deliver',    desc:'Ray-traced lighting, Houdini FX and a full render pass — then composited, colour-graded and delivered in every format you need.',      color:'#9B5DE5', shadow:'5px 5px 0 #6622AA', bg:'#F3EEFF', emoji:'🎬' },
];

/* ─────────────────────────────────────────────────────────────
   CARTOON 3D CUBE (pure CSS + SVG)
───────────────────────────────────────────────────────────── */
const CartoonCube = () => (
  <motion.div
    className="wobble"
    style={{ width: 140, height: 140, position: 'relative', margin: '0 auto 32px', flexShrink: 0 }}
  >
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="72" cy="132" rx="44" ry="8" fill="rgba(26,10,0,0.12)"/>
      {/* Back face */}
      <polygon points="70,12 120,36 120,90 70,66" fill="#FF8C42" stroke="#1A0A00" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Left face */}
      <polygon points="70,12 20,36 20,90 70,66" fill="#FFD93D" stroke="#1A0A00" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Top face */}
      <polygon points="70,12 120,36 70,60 20,36" fill="#FF5733" stroke="#1A0A00" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Highlight shine */}
      <polygon points="70,18 110,38 70,52 30,38" fill="rgba(255,255,255,0.22)" />
      {/* Stars decorating */}
      <path d="M116,20 L118,14 L120,20 L126,18 L120,22 L118,28 L116,22 L110,18 Z" fill="#FFD93D" stroke="#1A0A00" strokeWidth="1.5"/>
      <path d="M18,28 L19.5,24 L21,28 L25,26.5 L21,29.5 L19.5,33 L18,29.5 L14,26.5 Z" fill="#FF5733" stroke="#1A0A00" strokeWidth="1.5"/>
    </svg>
    {/* Orbit dots */}
    {['#FF5733','#FFD93D','#06D6A0','#4CC9F0','#9B5DE5','#F72585'].map((c,i) => (
      <motion.div
        key={i}
        animate={{ rotate: 360 }}
        transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 90 + i * 14, height: 90 + i * 14,
          marginLeft: -(45 + i * 7), marginTop: -(45 + i * 7),
          borderRadius: '50%',
          border: `2px dashed ${c}50`,
        }}
      >
        <div style={{
          position: 'absolute', top: -6, left: '50%', marginLeft: -6,
          width: 12, height: 12, borderRadius: '50%',
          background: c, border: '2px solid #1A0A00',
          boxShadow: `0 0 8px ${c}80`,
        }}/>
      </motion.div>
    ))}
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────────────────────── */
const Label = ({ children, bg = '#FFD93D' }: { children: React.ReactNode; bg?: string }) => (
  <div style={{ display:'flex', justifyContent:'center', marginBottom:18 }}>
    <span className="sticker" style={{ background: bg, color: '#1A0A00' }}>
      {children}
    </span>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   FLOATING DOODLE SHAPES
───────────────────────────────────────────────────────────── */
const FloatDoodle = ({
  style, floatClass, children,
}: { style: React.CSSProperties; floatClass: string; children: React.ReactNode }) => (
  <div className={floatClass} style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
    {children}
  </div>
);

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fadeOut= useTransform(scrollYProgress, [0, .5], [1, 0]);

  return (
    <section ref={ref} className="polka stripe-bg" style={{
      position: 'relative', overflow: 'hidden',
      minHeight: '100svh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(100px,13vw,156px) clamp(20px,6vw,64px) clamp(60px,8vw,100px)',
      textAlign: 'center',
    }}>
      {/* BG blobs */}
      <motion.div aria-hidden style={{ y: bgY, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div className="blob" style={{
          position: 'absolute', top: '-15%', left: '-12%',
          width: 480, height: 480,
          background: 'rgba(255,87,51,0.12)',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          filter: 'blur(8px)',
        }}/>
        <div className="blob" style={{
          position: 'absolute', bottom: '-10%', right: '-8%',
          width: 420, height: 420,
          background: 'rgba(76,201,240,0.12)',
          borderRadius: '40% 60% 70% 30% / 50% 60% 30% 60%',
          filter: 'blur(8px)',
          animationDelay: '3s',
        }}/>
        <div className="blob" style={{
          position: 'absolute', top: '30%', right: '-5%',
          width: 300, height: 300,
          background: 'rgba(255,217,61,0.15)',
          borderRadius: '70% 30% 50% 50% / 40% 60% 50% 60%',
          filter: 'blur(6px)',
          animationDelay: '5s',
        }}/>

        {/* Floating tool icons */}
        <FloatDoodle floatClass="float-a" style={{ top:'13%', left:'6%', opacity:.75 }}>
          <div style={{ background:'#FFE8E4', border:'2.5px solid #1A0A00', borderRadius:16, padding:'10px 14px', display:'flex', flexDirection:'column', alignItems:'center', gap:4, boxShadow:'3px 3px 0 #1A0A00' }}>
            <Box size={26} color="#FF5733" strokeWidth={2}/>
            <span style={{ fontSize:10, fontWeight:800, fontFamily:"'Boogaloo',cursive", color:'#1A0A00' }}>Blender</span>
          </div>
        </FloatDoodle>
        <FloatDoodle floatClass="float-b" style={{ top:'18%', right:'7%', opacity:.75 }}>
          <div style={{ background:'#E8F4FD', border:'2.5px solid #1A0A00', borderRadius:16, padding:'10px 14px', display:'flex', flexDirection:'column', alignItems:'center', gap:4, boxShadow:'3px 3px 0 #1A0A00' }}>
            <Layers size={26} color="#4CC9F0" strokeWidth={2}/>
            <span style={{ fontSize:10, fontWeight:800, fontFamily:"'Boogaloo',cursive", color:'#1A0A00' }}>Maya</span>
          </div>
        </FloatDoodle>
        <FloatDoodle floatClass="float-c" style={{ bottom:'26%', left:'8%', opacity:.75 }}>
          <div style={{ background:'#E6F9F2', border:'2.5px solid #1A0A00', borderRadius:16, padding:'10px 14px', display:'flex', flexDirection:'column', alignItems:'center', gap:4, boxShadow:'3px 3px 0 #1A0A00' }}>
            <Wind size={26} color="#06D6A0" strokeWidth={2}/>
            <span style={{ fontSize:10, fontWeight:800, fontFamily:"'Boogaloo',cursive", color:'#1A0A00' }}>Houdini</span>
          </div>
        </FloatDoodle>
        <FloatDoodle floatClass="float-d" style={{ bottom:'20%', right:'6%', opacity:.75 }}>
          <div style={{ background:'#F3EEFF', border:'2.5px solid #1A0A00', borderRadius:16, padding:'10px 14px', display:'flex', flexDirection:'column', alignItems:'center', gap:4, boxShadow:'3px 3px 0 #1A0A00' }}>
            <Brush size={26} color="#9B5DE5" strokeWidth={2}/>
            <span style={{ fontSize:10, fontWeight:800, fontFamily:"'Boogaloo',cursive", color:'#1A0A00' }}>ZBrush</span>
          </div>
        </FloatDoodle>
        <FloatDoodle floatClass="float-e" style={{ top:'52%', left:'3%', opacity:.65 }}>
          <div style={{ background:'#FFF5CC', border:'2.5px solid #1A0A00', borderRadius:16, padding:'10px 14px', display:'flex', flexDirection:'column', alignItems:'center', gap:4, boxShadow:'3px 3px 0 #1A0A00' }}>
            <MonitorPlay size={26} color="#E6AC00" strokeWidth={2}/>
            <span style={{ fontSize:10, fontWeight:800, fontFamily:"'Boogaloo',cursive", color:'#1A0A00' }}>Unreal</span>
          </div>
        </FloatDoodle>
        <FloatDoodle floatClass="float-f" style={{ top:'45%', right:'3%', opacity:.65 }}>
          <div style={{ background:'#FFE4F5', border:'2.5px solid #1A0A00', borderRadius:16, padding:'10px 14px', display:'flex', flexDirection:'column', alignItems:'center', gap:4, boxShadow:'3px 3px 0 #1A0A00' }}>
            <Wand2 size={26} color="#F72585" strokeWidth={2}/>
            <span style={{ fontSize:10, fontWeight:800, fontFamily:"'Boogaloo',cursive", color:'#1A0A00' }}>C4D</span>
          </div>
        </FloatDoodle>

        {/* Deco stars */}
        <div className="star-spin" style={{ position:'absolute', top:'10%', right:'22%', opacity:.6 }}>
          <Star size={30} color="#FFD93D" fill="#FFD93D" strokeWidth={1.5}/>
        </div>
        <div className="star-spin" style={{ position:'absolute', bottom:'32%', left:'22%', opacity:.5, animationDelay:'2s', animationDirection:'reverse' }}>
          <Star size={22} color="#FF5733" fill="#FF5733" strokeWidth={1.5}/>
        </div>
        <div className="star-spin" style={{ position:'absolute', top:'68%', right:'24%', opacity:.45, animationDelay:'1s' }}>
          <Star size={18} color="#9B5DE5" fill="#9B5DE5" strokeWidth={1.5}/>
        </div>
      </motion.div>

      <motion.div style={{ opacity: fadeOut, position: 'relative', zIndex: 2, width: '100%', maxWidth: 820, margin: '0 auto' }}>
        {/* Cartoon cube */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.0, type: 'spring', stiffness: 180, damping: 14, delay: .1 }}
        >
          <CartoonCube/>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: .8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: .5, delay: .28, type: 'spring', stiffness: 300 }}
        >
          <Label bg="#FFD93D">🎬 Cinematic 3D Studio</Label>
        </motion.div>

        {/* H1 */}
        <div style={{ overflow: 'hidden', marginBottom: 4 }}>
          <motion.h1
            className="font-display"
            initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .85, delay: .22, ease: [.16, 1, .3, 1] }}
            style={{
              fontSize: 'clamp(3rem,9.5vw,7.8rem)', fontWeight: 400,
              lineHeight: .92, letterSpacing: '.01em',
              color: '#1A0A00', margin: 0,
            }}
          >
            Where imagination
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 30 }}>
          <motion.h1
            className="font-display rainbow-text"
            initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .85, delay: .32, ease: [.16, 1, .3, 1] }}
            style={{
              fontSize: 'clamp(3rem,9.5vw,7.8rem)', fontWeight: 400,
              lineHeight: .92, letterSpacing: '.01em',
              margin: 0, paddingBottom: '.12em',
            }}
          >
            becomes dimension!
          </motion.h1>
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .65, delay: .42 }}
          style={{
            fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(26,10,0,0.62)',
            lineHeight: 1.80, maxWidth: 520, margin: '0 auto 40px', fontWeight: 700,
          }}
        >
          Cinematic 3D animation for <strong style={{ color: '#FF5733' }}>brands, films & games</strong> — from a
          single hero asset to a full-scale Houdini production pipeline. 🚀
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-btns"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, delay: .52 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}
        >
          <Link href="/info/contact" className="btn-main">
            Start a Project <ArrowUpRight size={17}/>
          </Link>
          <Link href="/info/contact" className="btn-outline">
            <Play size={15}/> View Showreel
          </Link>
        </motion.div>

        {/* Tool stickers row */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .72, duration: .8 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 40 }}
        >
          {[
            { name: 'Blender', bg: '#FFE8E4', color: '#FF5733' },
            { name: 'Maya', bg: '#E8F4FD', color: '#4CC9F0' },
            { name: 'Houdini', bg: '#E6F9F2', color: '#06D6A0' },
            { name: 'Cinema 4D', bg: '#FFF5CC', color: '#E6AC00' },
            { name: 'ZBrush', bg: '#FFE4F5', color: '#F72585' },
            { name: 'Unreal Engine', bg: '#F3EEFF', color: '#9B5DE5' },
          ].map((t, i) => (
            <motion.span
              key={t.name}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3 + i * .35, repeat: Infinity, delay: i * .4, ease: 'easeInOut' }}
              style={{
                padding: '6px 14px', borderRadius: 50,
                background: t.bg, border: '2px solid #1A0A00',
                fontSize: 12, fontWeight: 800, color: '#1A0A00',
                fontFamily: "'Boogaloo', cursive", letterSpacing: '.04em',
                boxShadow: '2px 2px 0 #1A0A00',
              }}
            >{t.name}</motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}
      >
        <div className="scroll-cue" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 22 }}>👇</span>
          <span style={{ fontSize: 11, fontWeight: 800, fontFamily:"'Boogaloo',cursive", color:'rgba(26,10,0,0.45)', letterSpacing:'.1em' }}>SCROLL</span>
        </div>
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   TICKER
───────────────────────────────────────────────────────────── */
const Ticker = () => {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      overflow: 'hidden', padding: '14px 0',
      background: '#FF5733', borderTop: '3px solid #1A0A00', borderBottom: '3px solid #1A0A00',
    }}>
      <div className="ticker-inner" style={{ display: 'inline-flex', gap: 0 }}>
        {items.map((t, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '0 24px', flexShrink: 0,
          }}>
            <span style={{
              fontSize: 12, fontWeight: 800, letterSpacing: '.20em',
              textTransform: 'uppercase', color: '#fff',
              fontFamily: "'Boogaloo', cursive", whiteSpace: 'nowrap',
            }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CAPABILITIES
───────────────────────────────────────────────────────────── */
const CapCard = memo(function CapCard({ item, i, inView }: { item: CapItem; i: number; inView: boolean }) {
  return (
    <motion.div
      className="card-cartoon"
      variants={bounceUp} custom={i} initial="hidden" animate={inView ? 'show' : 'hidden'}
      style={{ padding: 'clamp(22px,2.8vw,30px)' }}
    >
      {/* Top colour bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: item.accent, borderRadius: '22px 22px 0 0' }}/>

      <div style={{ marginTop: 8, marginBottom: 16 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 54, height: 54, borderRadius: 16,
          background: item.bg, border: '2.5px solid #1A0A00',
          boxShadow: item.shadow, color: item.accent, fontSize: 22,
        }}>
          {item.icon}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 22 }}>{item.emoji}</span>
        <h3 className="font-display" style={{
          fontSize: 'clamp(16px,1.7vw,19px)', fontWeight: 400,
          color: '#1A0A00', margin: 0, letterSpacing: '.01em',
        }}>{item.title}</h3>
      </div>

      <p style={{ fontSize: 13.5, color: 'rgba(26,10,0,.60)', lineHeight: 1.74, margin: '0 0 16px', fontWeight: 700 }}>
        {item.desc}
      </p>

      <div className="bounce-x" style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontSize: 13, fontWeight: 800, color: item.accent,
        fontFamily: "'Boogaloo', cursive", letterSpacing: '.03em',
      }}>
        Details <ChevronRight size={14}/>
      </div>
    </motion.div>
  );
});

const Capabilities = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} id="capabilities" className="sec polka" style={{ background: 'var(--bg)' }}>
      <div className="inn">
        <div className="sec-head">
          <motion.div variants={fadeSlide} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <Label bg="#4CC9F0">🎨 What We Create</Label>
          </motion.div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="font-display"
              initial={{ y: 60, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: .85, delay: .08, ease: [.16, 1, .3, 1] }}
              style={{ fontSize: 'clamp(2.2rem,6vw,4.8rem)', fontWeight: 400, lineHeight: .94, color: '#1A0A00', margin: 0 }}
            >
              Eight disciplines.<br/>
              <span className="coral-text">One production house.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: .22, duration: .6 }}
            style={{ fontSize: 'clamp(14px,1.7vw,16px)', color: 'rgba(26,10,0,.55)', lineHeight: 1.82, maxWidth: 480, margin: '18px auto 0', fontWeight: 700 }}
          >
            From the first polygon to the final colour grade — every stage of your animation pipeline, in-house. 🎬
          </motion.p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,270px),1fr))', gap: 'clamp(14px,2vw,22px)' }}>
          {CAPABILITIES.map((c, i) => <CapCard key={c.title} item={c} i={i} inView={inView}/>)}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   ANIMATION STYLES
───────────────────────────────────────────────────────────── */
const Styles = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="sec polka-cream stripe-bg" style={{ background: 'var(--bg2)', borderTop: '3px solid #1A0A00' }}>
      <div className="inn">
        <div className="sec-head">
          <motion.div variants={fadeSlide} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <Label bg="#9B5DE5" >🌈 Visual Direction</Label>
          </motion.div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="font-display"
              initial={{ y: 56, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: .85, delay: .08, ease: [.16, 1, .3, 1] }}
              style={{ fontSize: 'clamp(2.2rem,6vw,4.6rem)', fontWeight: 400, lineHeight: .94, color: '#1A0A00', margin: 0 }}
            >
              Every aesthetic.<br/><span className="rainbow-text">Mastered! ✨</span>
            </motion.h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 'clamp(14px,2vw,22px)' }}>
          {STYLES.map((s, i) => (
            <motion.div
              key={s.title}
              variants={bounceUp} custom={i} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="card-process"
              style={{ padding: 'clamp(24px,3vw,34px)', textAlign: 'center' }}
            >
              {/* Top stripe */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: s.accent, borderRadius: '24px 24px 0 0' }}/>

              <div style={{ marginTop: 10, marginBottom: 12 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 68, height: 68, borderRadius: '50%',
                  background: s.bg, border: '2.5px solid #1A0A00', boxShadow: s.shadow,
                  color: s.accent,
                }}>
                  {s.icon}
                </div>
              </div>

              <span style={{
                display: 'inline-block', marginBottom: 10,
                fontSize: 11, fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase',
                color: '#1A0A00', background: s.bg,
                padding: '4px 12px', borderRadius: 50,
                border: '2px solid #1A0A00', boxShadow: '2px 2px 0 #1A0A00',
                fontFamily: "'Boogaloo', cursive",
              }}>{s.label}</span>

              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>

              <h3 className="font-display" style={{ fontSize: 'clamp(16px,1.9vw,20px)', fontWeight: 400, color: '#1A0A00', margin: '0 0 10px' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(26,10,0,.58)', lineHeight: 1.74, margin: 0, fontWeight: 700 }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   PROCESS
───────────────────────────────────────────────────────────── */
const Process = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="sec polka" style={{ background: 'var(--bg)', borderTop: '3px solid #1A0A00' }}>
      <div className="inn">
        <div className="sec-head">
          <motion.div variants={fadeSlide} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <Label bg="#06D6A0">🔄 How We Work</Label>
          </motion.div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="font-display"
              initial={{ y: 52, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: .85, delay: .08, ease: [.16, 1, .3, 1] }}
              style={{ fontSize: 'clamp(2.2rem,6vw,4.6rem)', fontWeight: 400, lineHeight: .94, color: '#1A0A00', margin: 0 }}
            >
              Four steps.<br/><span className="coral-text">Frame-perfect delivery.</span>
            </motion.h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,265px),1fr))', gap: 'clamp(14px,2vw,22px)' }}>
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.n}
              className="card-process"
              variants={bounceUp} custom={i} initial="hidden" animate={inView ? 'show' : 'hidden'}
              style={{ padding: 'clamp(28px,3.5vw,40px)', textAlign: 'center' }}
            >
              {/* Watermark number */}
              <div aria-hidden style={{
                position: 'absolute', top: -10, right: 12,
                fontSize: 110, fontWeight: 400, lineHeight: 1,
                color: `${p.color}10`, letterSpacing: '-.04em',
                userSelect: 'none', fontFamily: "'Boogaloo', cursive",
              }}>{p.n}</div>

              {/* Emoji */}
              <div style={{ fontSize: 40, marginBottom: 14 }}>{p.emoji}</div>

              {/* Step pill */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '5px 16px', borderRadius: 50, marginBottom: 16,
                background: p.bg, border: '2.5px solid #1A0A00', boxShadow: p.shadow,
                fontSize: 13, fontWeight: 400, color: '#1A0A00',
                fontFamily: "'Boogaloo', cursive", letterSpacing: '.04em',
              }}>Step {p.n}</div>

              <h3 className="font-display" style={{ fontSize: 'clamp(17px,2vw,21px)', fontWeight: 400, color: '#1A0A00', margin: '0 0 12px' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(26,10,0,.58)', lineHeight: 1.76, margin: 0, fontWeight: 700 }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   STATS
───────────────────────────────────────────────────────────── */
const Stats = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="sec polka-cream stripe-bg" style={{ background: 'var(--bg2)', borderTop: '3px solid #1A0A00' }}>
      <div className="inn">
        <div className="sec-head">
          <motion.div variants={fadeSlide} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <Label bg="#FF5733">📊 The Numbers</Label>
          </motion.div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="font-display"
              initial={{ y: 48, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: .82, delay: .08, ease: [.16, 1, .3, 1] }}
              style={{ fontSize: 'clamp(2.2rem,6vw,4.4rem)', fontWeight: 400, lineHeight: .94, color: '#1A0A00', margin: 0 }}
            >
              Studio-grade quality.<br/><span className="coral-text">Every single frame.</span>
            </motion.h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,215px),1fr))', gap: 'clamp(14px,2vw,22px)' }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="card-stat"
              variants={popIn} custom={i} initial="hidden" animate={inView ? 'show' : 'hidden'}
              style={{ boxShadow: s.shadow, padding: 'clamp(28px,3.5vw,42px) 24px', textAlign: 'center' }}
            >
              {/* Colour header band */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: s.bg, borderRadius: '24px 24px 0 0' }}/>

              <div style={{ marginTop: 8, fontSize: 36, marginBottom: 8 }}>{s.emoji}</div>
              <div className="font-display" style={{
                fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', fontWeight: 400, lineHeight: 1,
                color: s.bg, marginBottom: 10,
                WebkitTextStroke: '2px #1A0A00',
                textShadow: '3px 3px 0 #1A0A00',
              }}>{s.value}</div>
              <div className="font-display" style={{ fontSize: 17, fontWeight: 400, color: '#1A0A00', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(26,10,0,.50)', letterSpacing: '.10em', textTransform: 'uppercase', fontWeight: 800 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   TOOL STACK
───────────────────────────────────────────────────────────── */
const ToolStack = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="sec polka" style={{ background: 'var(--bg)', borderTop: '3px solid #1A0A00' }}>
      <div className="inn">
        <div className="sec-head">
          <motion.div variants={fadeSlide} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <Label bg="#FFD93D">🛠️ Our Arsenal</Label>
          </motion.div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="font-display"
              initial={{ y: 48, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: .82, delay: .08, ease: [.16, 1, .3, 1] }}
              style={{ fontSize: 'clamp(2rem,5vw,4.2rem)', fontWeight: 400, lineHeight: .95, color: '#1A0A00', margin: 0 }}
            >
              Industry-standard tools.<br/><span className="rainbow-text">Expert hands. 🙌</span>
            </motion.h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(10px,1.4vw,14px)' }}>
          {TOOLS.map((t, i) => (
            <motion.div
              key={t.name}
              className="tool-pill"
              variants={popIn} custom={i} initial="hidden" animate={inView ? 'show' : 'hidden'}
              style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: t.bg, border: '2px solid #1A0A00',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: t.accent, flexShrink: 0,
                boxShadow: '2px 2px 0 #1A0A00',
              }}>{t.icon}</div>
              <div>
                <div className="font-display" style={{ fontSize: 15, fontWeight: 400, color: '#1A0A00', letterSpacing: '.02em' }}>{t.name}</div>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,10,0,.45)' }}>{t.role}</div>
              </div>
              <div style={{ fontSize: 18 }}>{t.emoji}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   CTA
───────────────────────────────────────────────────────────── */
const CTA = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const benefits = [
    { emoji:'🎨', title:'Dedicated Art Director',  desc:'One creative owner from concept call to final delivery — full creative continuity.' },
    { emoji:'📦', title:'Every Format Delivered',  desc:'ProRes, H.264, WebM, EXR, FBX — delivered in whatever format you need, ready to publish.' },
    { emoji:'🔁', title:'Unlimited Revisions',     desc:'Iterate until it\'s absolutely perfect. Your brief is our contract and our standard.' },
  ];

  return (
    <section ref={ref} className="sec polka-cream stripe-bg" style={{ background: 'var(--bg2)', borderTop: '3px solid #1A0A00' }}>
      <div className="inn">
        <motion.div
          variants={bounceUp} custom={0} initial="hidden" animate={inView ? 'show' : 'hidden'}
          style={{
            position: 'relative', overflow: 'hidden',
            background: '#fff', border: '3px solid #1A0A00',
            borderRadius: 32, boxShadow: '8px 8px 0 #1A0A00',
            padding: 'clamp(48px,7vw,84px) clamp(24px,5vw,72px)',
          }}
        >
          {/* Blob decorations inside */}
          <div className="blob" style={{ position:'absolute', top:'-20%', left:'-8%', width:340, height:340, background:'rgba(255,87,51,0.07)', borderRadius:'60% 40% 30% 70%/60% 30% 70% 40%', filter:'blur(6px)', pointerEvents:'none' }}/>
          <div className="blob" style={{ position:'absolute', bottom:'-15%', right:'-5%', width:300, height:300, background:'rgba(76,201,240,0.08)', borderRadius:'40% 60% 70% 30%/50% 60% 30% 60%', filter:'blur(6px)', pointerEvents:'none', animationDelay:'4s' }}/>

          {/* Corner deco stars */}
          <div className="star-spin" style={{ position:'absolute', top:24, right:28, opacity:.55 }}>
            <Star size={32} color="#FFD93D" fill="#FFD93D" strokeWidth={1.5}/>
          </div>
          <div className="star-spin" style={{ position:'absolute', bottom:24, left:28, opacity:.45, animationDelay:'2s', animationDirection:'reverse' }}>
            <Star size={24} color="#FF5733" fill="#FF5733" strokeWidth={1.5}/>
          </div>

          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14, scale: .8 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: .18, type: 'spring', stiffness: 300 }}
            >
              <Label bg="#06D6A0">🟢 Accepting New Productions</Label>
            </motion.div>

            {/* Headline */}
            <div style={{ overflow: 'hidden', marginBottom: 4 }}>
              <motion.h2
                className="font-display"
                initial={{ y: 56, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: .82, delay: .24, ease: [.16, 1, .3, 1] }}
                style={{ fontSize: 'clamp(2.2rem,6vw,4.6rem)', fontWeight: 400, lineHeight: .94, color: '#1A0A00', margin: 0 }}
              >Ready to bring your world</motion.h2>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: 26 }}>
              <motion.h2
                className="font-display rainbow-text"
                initial={{ y: 56, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: .82, delay: .32, ease: [.16, 1, .3, 1] }}
                style={{ fontSize: 'clamp(2.2rem,6vw,4.6rem)', fontWeight: 400, lineHeight: .94, margin: 0, paddingBottom: '.12em' }}
              >into three dimensions? 🌍</motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .40, duration: .6 }}
              style={{ fontSize: 'clamp(14px,1.8vw,17px)', color: 'rgba(26,10,0,.58)', lineHeight: 1.82, maxWidth: 460, margin: '0 auto 36px', fontWeight: 700 }}
            >
              Book a free creative consultation — we&apos;ll review your brief and sketch out the
              production roadmap within 48 hours. 🚀
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .48 }}
              className="hero-btns"
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginBottom: 56 }}
            >
              <Link href="/info/contact" className="btn-main">
                Start a Project <ArrowUpRight size={17}/>
              </Link>
              <Link href="/info/contact" className="btn-outline">
                <Clapperboard size={15}/> View Showreel
              </Link>
            </motion.div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '0 auto 44px', maxWidth: 560 }}>
              <div style={{ flex: 1, height: 2, background: '#1A0A00', borderRadius: 99 }}/>
              <Star size={16} color="#FFD93D" fill="#FFD93D"/>
              <Star size={16} color="#FFD93D" fill="#FFD93D"/>
              <Star size={16} color="#FFD93D" fill="#FFD93D"/>
              <div style={{ flex: 1, height: 2, background: '#1A0A00', borderRadius: 99 }}/>
            </div>

            {/* Benefits */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,188px),1fr))', gap: 'clamp(20px,3vw,36px)' }}>
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  variants={bounceUp} custom={i} initial="hidden" animate={inView ? 'show' : 'hidden'}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: 18, margin: '0 auto 14px',
                    background: ['#FFE8E4','#FFF5CC','#E6F9F2'][i],
                    border: '2.5px solid #1A0A00', boxShadow: '4px 4px 0 #1A0A00',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 30,
                  }}>{b.emoji}</div>
                  <h4 className="font-display" style={{ fontSize: 17, fontWeight: 400, color: '#1A0A00', margin: '0 0 6px' }}>{b.title}</h4>
                  <p style={{ fontSize: 13.5, color: 'rgba(26,10,0,.57)', lineHeight: 1.72, margin: 0, fontWeight: 700 }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────────────────────── */
export default function AnimationPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>
      <div className="td">
        <Hero/>
        <Ticker/>
        <Capabilities/>
        <Styles/>
        <Process/>
        <Stats/>
        <ToolStack/>
        <CTA/>
      </div>
    </>
  );
}