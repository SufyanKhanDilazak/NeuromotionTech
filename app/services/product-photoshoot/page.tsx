'use client';

/**
 * PRODUCT PHOTOGRAPHY — "FLASHPOINT"
 * ─────────────────────────────────────────────────────────────
 * Aesthetic: Electric neobrutalist. White photography sweep as canvas.
 * Colours:   Raw white · ink black · electric magenta · shock lime
 * Type:      Bebas Neue (heavy condensed display) + Syne (geometric body)
 * Motion:    Framer Motion — flash burst, scan lines, staggered reveals
 * Stack:     Next.js · TypeScript · Framer Motion · Lucide React
 */

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
  Zap,
  Eye,
  Layers,
  Repeat2,
  ChevronRight,
  Move,
  ScanLine,
  Crosshair,
  FlipHorizontal,
  Image,
  Sun,
} from 'lucide-react';

/* ─────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Bebas+Neue&display=swap');

  :root {
    --white:  #FAFAF8;
    --ink:    #0A0A0C;
    --pink:   #FF1A6C;
    --pink-d: #CC0050;
    --lime:   #CDFF00;
    --lime-d: #A8D400;
    --blue:   #0055FF;
    --mid:    rgba(10,10,12,0.45);
    --rule:   rgba(10,10,12,0.10);
    --rule-h: rgba(10,10,12,0.04);
  }

  .fp *, .fp *::before, .fp *::after { box-sizing:border-box; margin:0; padding:0; }

  .fp {
    font-family: 'Syne', sans-serif;
    background: var(--white);
    color: var(--ink);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    cursor: crosshair;
  }

  .cd { font-family: 'Bebas Neue', Impact, sans-serif; }

  /* Noise overlay */
  .fp::after {
    content:''; position:fixed; inset:0; pointer-events:none; z-index:9999;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:160px 160px; opacity:.022; mix-blend-mode:multiply;
  }

  /* Flash burst */
  @keyframes flashBurst {
    0%,100%{opacity:0} 8%{opacity:1} 16%{opacity:0} 24%{opacity:.55} 30%{opacity:0}
  }
  .flash { animation:flashBurst 6s ease-in-out infinite; pointer-events:none; }

  /* Scan line */
  @keyframes scanMove { 0%{transform:translateX(-100%)} 100%{transform:translateX(250%)} }
  .scan-anim { animation:scanMove 3s ease-in-out infinite; }

  /* Marquee */
  @keyframes mqF { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes mqB { from{transform:translateX(-50%)} to{transform:translateX(0)} }
  .mq-f { animation:mqF 20s linear infinite; white-space:nowrap; display:inline-flex; }
  .mq-b { animation:mqB 25s linear infinite; white-space:nowrap; display:inline-flex; }
  .mq-f:hover,.mq-b:hover { animation-play-state:paused; }

  /* Pulse */
  @keyframes pdot { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
  .pdot { animation:pdot 2s ease-in-out infinite; }

  /* Section */
  .sec { padding:clamp(64px,9vw,128px) clamp(16px,6vw,80px); }
  .inn { max-width:1280px; margin:0 auto; width:100%; }

  /* Outline text */
  .txt-outline { -webkit-text-stroke:2.5px var(--ink); color:transparent; }

  /* Buttons */
  .btn-pink {
    display:inline-flex; align-items:center; gap:9px;
    padding:15px 36px; background:var(--pink); color:var(--white);
    font-family:'Syne',sans-serif; font-size:11px; font-weight:700;
    letter-spacing:.20em; text-transform:uppercase;
    border:2px solid var(--pink); text-decoration:none; cursor:pointer;
    transition:background .20s, color .20s, transform .20s, box-shadow .20s;
    white-space:nowrap;
  }
  .btn-pink:hover {
    background:var(--white); color:var(--pink);
    transform:translate(-4px,-4px);
    box-shadow:4px 4px 0 var(--pink);
  }

  .btn-ink {
    display:inline-flex; align-items:center; gap:9px;
    padding:15px 36px; background:var(--ink); color:var(--white);
    font-family:'Syne',sans-serif; font-size:11px; font-weight:700;
    letter-spacing:.20em; text-transform:uppercase;
    border:2px solid var(--ink); text-decoration:none; cursor:pointer;
    transition:background .20s, color .20s, transform .20s, box-shadow .20s;
    white-space:nowrap;
  }
  .btn-ink:hover {
    background:var(--white); color:var(--ink);
    transform:translate(-4px,-4px);
    box-shadow:4px 4px 0 var(--ink);
  }

  .btn-wht {
    display:inline-flex; align-items:center; gap:9px;
    padding:15px 36px; background:transparent; color:var(--white);
    font-family:'Syne',sans-serif; font-size:11px; font-weight:700;
    letter-spacing:.20em; text-transform:uppercase;
    border:2px solid rgba(250,250,248,0.30); text-decoration:none; cursor:pointer;
    transition:border-color .20s, background .20s, transform .20s;
    white-space:nowrap;
  }
  .btn-wht:hover {
    border-color:var(--white); background:rgba(250,250,248,0.10);
    transform:translate(-4px,-4px);
  }

  /* Process row */
  .p-row {
    display:grid;
    grid-template-columns:clamp(60px,9vw,110px) 1fr clamp(72px,11vw,150px);
    align-items:center;
    gap:clamp(14px,3vw,48px);
    padding:clamp(18px,3vw,34px) 0;
    border-bottom:1.5px solid var(--rule);
    transition:background .22s;
    cursor:default;
  }
  .p-row:hover { background:var(--rule-h); }
  .p-row:hover .p-num { color:var(--pink); }
  .p-num { transition:color .22s; }

  /* Craft card */
  .c-card {
    padding:clamp(22px,3.5vw,40px) clamp(18px,3vw,34px);
    border:1.5px solid var(--rule);
    background:var(--ink);
    position:relative; overflow:hidden;
    cursor:default;
    transition:border-color .25s;
  }
  .c-card:hover { border-color:rgba(250,250,248,0.28); }
  .c-bar {
    position:absolute; bottom:0; left:0; right:0; height:3px;
    transform-origin:left; transform:scaleX(0); transition:transform .35s ease;
  }
  .c-card:hover .c-bar { transform:scaleX(1); }

  /* Work card */
  .w-card {
    position:relative; overflow:hidden;
    aspect-ratio:2/3;
    cursor:pointer;
    display:flex; flex-direction:column; justify-content:flex-end;
    padding:clamp(14px,2vw,24px);
    transition:transform .28s ease;
  }
  .w-card:hover { transform:scale(1.025) translateY(-4px); }
  .w-card:hover .w-arrow { opacity:1; transform:translate(0,0); }
  .w-arrow { opacity:0; transform:translate(-7px,7px); transition:.28s; }

  /* Outcome row */
  .out-row {
    display:flex; align-items:center; justify-content:space-between;
    padding:clamp(16px,2.5vw,30px) 0;
    border-bottom:1.5px solid rgba(250,250,248,0.12);
    gap:clamp(16px,3vw,40px); flex-wrap:wrap;
  }

  /* Category chip */
  .cat-chip {
    display:inline-flex; align-items:center; gap:12px;
    padding:clamp(10px,1.8vw,18px) clamp(14px,2.5vw,28px);
    border:1.5px solid var(--rule);
    cursor:default; background:var(--white);
    transition:background .22s, color .22s, border-color .22s, transform .18s;
  }
  .cat-chip:hover {
    background:var(--ink); color:var(--white);
    border-color:var(--ink);
    transform:translate(-3px,-3px);
    box-shadow:3px 3px 0 var(--ink);
  }

  /* Mobile */
  @media(max-width:767px){
    .h-ctas { flex-direction:column; align-items:stretch !important; }
    .h-ctas > * { justify-content:center !important; }
    .h-reel { display:none !important; }
    .h-grid { grid-template-columns:1fr !important; }
    .p-row  { grid-template-columns:48px 1fr; }
    .p-tag  { display:none; }
    .c-grid { grid-template-columns:1fr !important; }
    .w-grid { grid-template-columns:1fr 1fr !important; }
    .o-grid { grid-template-columns:1fr !important; }
    .cta-grid { grid-template-columns:1fr !important; }
  }
  @media(max-width:480px){
    .w-grid { grid-template-columns:1fr !important; }
    .w-card { aspect-ratio:16/9; }
    .txt-outline { -webkit-text-stroke:1.5px var(--ink); }
  }
`;

/* ─────────────────────────────────────────────────
   VARIANTS
───────────────────────────────────────────────── */
const up: Variants = {
  hidden:{ y:72, opacity:0 },
  show:(d=0)=>({ y:0, opacity:1, transition:{ duration:.76, delay:d, ease:[.16,1,.3,1] } }),
};
const left: Variants = {
  hidden:{ x:-60, opacity:0 },
  show:{ x:0, opacity:1, transition:{ duration:.78, ease:[.16,1,.3,1] } },
};
const row: Variants = {
  hidden:{ x:-28, opacity:0 },
  show:(d=0)=>({ x:0, opacity:1, transition:{ duration:.62, delay:d, ease:[.16,1,.3,1] } }),
};
const pop: Variants = {
  hidden:{ scale:.84, opacity:0 },
  show:(d=0)=>({ scale:1, opacity:1, transition:{ duration:.62, delay:d, ease:[.16,1,.3,1] } }),
};

/* ─────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────── */
const PROCESS = [
  { n:'01', title:'Brief & Vision',     desc:'We extract the exact feeling your product needs to own before a single light is set.',            tag:'DISCOVERY',  c:'var(--pink)' },
  { n:'02', title:'Light Architecture', desc:'Every key, fill, hair light and practical placed deliberately — light is the first lens.',        tag:'LIGHTING',   c:'var(--lime)' },
  { n:'03', title:'The Shoot',          desc:'Fast, focused, decisive. Every hero angle, variant and texture captured in locked setups.',       tag:'CAPTURE',    c:'var(--ink)'  },
  { n:'04', title:'Post & Retouch',     desc:'Hand-retouched files — not batch processed. Colour-accurate. Platform-calibrated. Signature.',   tag:'POST',       c:'var(--blue)' },
  { n:'05', title:'Delivery',           desc:'Every format, every ratio, every platform spec — named, organised and dropped in 48 hours.',      tag:'DELIVERY',   c:'var(--pink)' },
];

const CRAFT = [
  { icon:<Sun size={20} strokeWidth={1.5}/>,           color:'#CDFF00', textColor:'var(--ink)', title:'LIGHT',       desc:'Hard, soft, directional, diffused, practical. We sculpt light like a second lens — the invisible architecture of every great shot.' },
  { icon:<Crosshair size={20} strokeWidth={1.5}/>,     color:'#FF1A6C', textColor:'#fff',       title:'COMPOSITION', desc:'The negative space is as deliberate as the subject. Where we place the product in the frame is where we place it in the mind.' },
  { icon:<ScanLine size={20} strokeWidth={1.5}/>,      color:'#0055FF', textColor:'#fff',       title:'RETOUCHING',  desc:'Not filters. Not presets. Hand retouching that preserves material truth while removing everything that shouldn\'t be there.' },
  { icon:<Move size={20} strokeWidth={1.5}/>,          color:'#FAFAF8', textColor:'var(--ink)', title:'MOVEMENT',    desc:'Static or in motion — stop-motion, slow pull-focus, spins. We build shots that feel alive even when perfectly still.' },
  { icon:<FlipHorizontal size={20} strokeWidth={1.5}/>,color:'#FF1A6C', textColor:'#fff',       title:'COLOUR',      desc:'Science-calibrated, not eyeballed. Every shade measured against swatch and matched to exact brand specification.' },
  { icon:<Layers size={20} strokeWidth={1.5}/>,        color:'#CDFF00', textColor:'var(--ink)', title:'COMPOSITE',   desc:'When the real world isn\'t enough, we build and layer elements that couldn\'t be captured in a single frame.' },
];

const WORK_CARDS = [
  { label:'White Void',   bg:'#0A0A0C', fg:'#FAFAF8', accent:'#FF1A6C', tag:'E-COMMERCE'    },
  { label:'Dark & Moody', bg:'#FF1A6C', fg:'#FAFAF8', accent:'#CDFF00', tag:'LUXURY'        },
  { label:'Lifestyle',    bg:'#CDFF00', fg:'#0A0A0C', accent:'#0055FF', tag:'BRAND'         },
  { label:'Macro Detail', bg:'#0055FF', fg:'#FAFAF8', accent:'#CDFF00', tag:'CRAFT'         },
  { label:'360° Spin',    bg:'#F0EDE6', fg:'#0A0A0C', accent:'#FF1A6C', tag:'INTERACTIVE'   },
  { label:'Campaign',     bg:'#0A0A0C', fg:'#CDFF00', accent:'#FF1A6C', tag:'CREATIVE DIR.' },
];

const OUTCOMES = [
  { metric:'3–5×',  label:'Average uplift in conversion rate after professional product reshoots',  pct:75 },
  { metric:'48hr',  label:'From final shoot day to delivered, retouched, platform-ready assets',    pct:90 },
  { metric:'100%',  label:'Bespoke — every frame custom-captured. Zero stock. Zero templates.',     pct:100 },
  { metric:'∞',     label:'Colour grade revisions — open until every pixel matches brand spec.',    pct:55  },
];

const CATS = [
  'Beauty & Skincare','Tech & Electronics','Fashion & Apparel','Food & Beverage',
  'Luxury & Jewellery','Home & Interiors','Supplements & Health','Automotive Parts',
];

const MQ_A = ['PRODUCT PHOTOGRAPHY','WHITE VOID','MACRO DETAIL','360° SPIN','LIFESTYLE SHOOTS','CREATIVE DIRECTION','STOP-MOTION','COMPOSITE'];
const MQ_B = ['LIGHT ARCHITECTURE','HAND RETOUCHING','BRAND COLOUR MATCH','PLATFORM-READY','E-COMMERCE','FASHION','BEAUTY','TECH & ELECTRONICS'];

/* ─────────────────────────────────────────────────
   ① HERO
───────────────────────────────────────────────── */
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end start'] });
  const textY = useTransform(scrollYProgress,[0,1],['0%','18%']);

  return (
    <section ref={ref} style={{
      position:'relative', overflow:'hidden', minHeight:'100svh',
      background:'var(--white)',
      display:'flex', flexDirection:'column', justifyContent:'flex-end',
      padding:'0 clamp(16px,6vw,80px) clamp(52px,7vw,80px)',
    }}>

      {/* Right-side colour split */}
      <div aria-hidden style={{ position:'absolute',top:0,right:0,width:'44%',height:'100%',background:'var(--pink)',
        clipPath:'polygon(22% 0,100% 0,100% 100%,0 100%)',zIndex:0,pointerEvents:'none' }}/>
      {/* Lime stripe far right */}
      <div aria-hidden style={{ position:'absolute',top:0,right:0,width:'10%',height:'100%',background:'var(--lime)',
        zIndex:1,pointerEvents:'none' }}/>

      {/* Subtle horizontal rule grid left side */}
      <div aria-hidden style={{ position:'absolute',inset:0,zIndex:0,pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(10,10,12,0.055) 1px,transparent 1px)',
        backgroundSize:'100% 72px',
        maskImage:'linear-gradient(180deg,transparent 0%,black 25%,black 75%,transparent 100%)' }}/>

      {/* Flash burst */}
      <div className="flash" style={{ position:'absolute',inset:0,zIndex:3,
        background:'radial-gradient(ellipse 55% 55% at 48% 38%, rgba(255,255,255,0.95) 0%, transparent 70%)' }}/>

      {/* Status strip */}
      <div style={{ position:'absolute',top:22,left:'clamp(16px,6vw,80px)',right:'clamp(16px,6vw,80px)',
        display:'flex',alignItems:'center',justifyContent:'space-between',zIndex:10,flexWrap:'wrap',gap:8 }}>
        <div style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div className="pdot" style={{ width:8,height:8,borderRadius:'50%',background:'var(--pink)' }}/>
          <span style={{ fontSize:9,fontWeight:700,letterSpacing:'.22em',color:'var(--ink)',textTransform:'uppercase' }}>
            SHOOT IN PROGRESS
          </span>
        </div>
        <div style={{ display:'flex', gap:2 }}>
          {['#','F','L','A','S','H'].map((c,i)=>(
            <div key={i} style={{
              width:20,height:20,display:'flex',alignItems:'center',justifyContent:'center',
              background:i===0?'var(--ink)':i%2===0?'var(--pink)':'var(--lime)',
              fontSize:9,fontWeight:700,
              color:i===2||i===4?'var(--ink)':'var(--white)',
            }}>{c}</div>
          ))}
        </div>
      </div>

      {/* Headline */}
      <motion.div style={{ y:textY, position:'relative', zIndex:5 }}>
        {/* Eyebrow */}
        <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:.15,duration:.5 }}
          style={{ display:'flex',alignItems:'center',gap:10,marginBottom:22 }}>
          <div style={{ width:32,height:2,background:'var(--pink)' }}/>
          <span style={{ fontSize:9,fontWeight:700,letterSpacing:'.28em',color:'var(--pink)',textTransform:'uppercase' }}>
            Product Photography Studio
          </span>
        </motion.div>

        {/* Big type */}
        <div style={{ marginBottom:36 }}>
          {[
            { w:'WE',      variant:'solid'   },
            { w:'MAKE',    variant:'outline' },
            { w:'OBJECTS', variant:'solid'   },
            { w:'DESIRE.', variant:'pink'    },
          ].map((l,i)=>(
            <div key={l.w} style={{ overflow:'hidden', lineHeight:.86 }}>
              <motion.div className="cd"
                initial={{ y:130,opacity:0 }} animate={{ y:0,opacity:1 }}
                transition={{ duration:1.0,delay:.12+i*.09,ease:[.16,1,.3,1] }}
                style={{
                  fontSize:'clamp(4.2rem,12vw,12rem)',
                  letterSpacing:'.01em',lineHeight:.86,display:'block',userSelect:'none',
                  color: l.variant==='outline'?'transparent':l.variant==='pink'?'var(--pink)':'var(--ink)',
                  WebkitTextStroke: l.variant==='outline'?'2.5px var(--ink)':undefined,
                }}
              >{l.w}</motion.div>
            </div>
          ))}
        </div>

        {/* Sub row */}
        <div className="h-grid" style={{ display:'grid', gridTemplateColumns:'1fr auto', alignItems:'flex-end',
          gap:'clamp(24px,4vw,60px)' }}>
          <motion.div initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} transition={{ delay:.52 }}>
            <div style={{ borderLeft:'3px solid var(--ink)',paddingLeft:18,maxWidth:380,marginBottom:28 }}>
              <p style={{ fontSize:'clamp(12px,1.4vw,14px)',color:'var(--mid)',lineHeight:1.88,fontWeight:500 }}>
                From a single hero shot to a full campaign — we build visual worlds where your product
                becomes the only thing worth looking at.
              </p>
            </div>
            <div className="h-ctas" style={{ display:'flex',gap:12,flexWrap:'wrap',alignItems:'center' }}>
              <Link href="/info/contact" className="btn-pink">Book a Shoot <ArrowUpRight size={14}/></Link>
          
            </div>
          </motion.div>

          {/* Rotating ring — hide on mobile */}
          <motion.div className="h-reel"
            initial={{ opacity:0,rotate:-90,scale:.5 }} animate={{ opacity:1,rotate:0,scale:1 }}
            transition={{ delay:.35,duration:1.2,ease:[.16,1,.3,1] }}
            style={{ flexShrink:0,paddingBottom:4 }}>
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none"
              style={{ animation:'mqF 18s linear infinite',opacity:.55 }}>
              <circle cx="80" cy="80" r="76" stroke="var(--ink)" strokeWidth="1" strokeDasharray="6 6"/>
              <circle cx="80" cy="80" r="56" stroke="var(--pink)" strokeWidth="1.5"/>
              <circle cx="80" cy="80" r="36" stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 5"/>
              <circle cx="80" cy="80" r="8" fill="var(--pink)"/>
              {[0,45,90,135,180,225,270,315].map(a=>{
                const r=a*Math.PI/180;
                return <line key={a}
                  x1={80+46*Math.cos(r)} y1={80+46*Math.sin(r)}
                  x2={80+56*Math.cos(r)} y2={80+56*Math.sin(r)}
                  stroke="var(--pink)" strokeWidth="1.5"/>;
              })}
            </svg>
            <div style={{ textAlign:'center',marginTop:8 }}>
              <div style={{ fontSize:9,fontWeight:700,letterSpacing:'.22em',color:'var(--mid)' }}>EXPOSURE LOCKED</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Corner SCROLL */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.8 }}
        style={{ position:'absolute',bottom:22,left:'50%',transform:'translateX(-50%)',
          display:'flex',flexDirection:'column',alignItems:'center',gap:4,zIndex:5 }}>
        <div style={{ width:1,height:28,background:'linear-gradient(180deg,transparent,var(--pink))' }}/>
        <span style={{ fontSize:8,fontWeight:700,letterSpacing:'.26em',color:'var(--mid)',textTransform:'uppercase' }}>Scroll</span>
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────────
   ② DOUBLE MARQUEE
───────────────────────────────────────────────── */
const Marquee = () => {
  const rowA=[...MQ_A,...MQ_A,...MQ_A], rowB=[...MQ_B,...MQ_B,...MQ_B];
  return (
    <div style={{ background:'var(--ink)',overflow:'hidden' }}>
      <div style={{ padding:'10px 0',borderBottom:'1px solid rgba(250,250,248,0.08)' }}>
        <div className="mq-f">
          {rowA.map((t,i)=>(
            <span key={i} style={{ display:'inline-flex',alignItems:'center',gap:10,padding:'0 24px',flexShrink:0 }}>
              <span className="cd" style={{ fontSize:15,letterSpacing:'.12em',color:'var(--white)',whiteSpace:'nowrap' }}>{t}</span>
              <span style={{ color:'var(--pink)',fontSize:9 }}>◆</span>
            </span>
          ))}
        </div>
      </div>
      <div style={{ padding:'10px 0' }}>
        <div className="mq-b">
          {rowB.map((t,i)=>(
            <span key={i} style={{ display:'inline-flex',alignItems:'center',gap:10,padding:'0 24px',flexShrink:0 }}>
              <span className="cd" style={{ fontSize:15,letterSpacing:'.12em',color:'var(--lime)',whiteSpace:'nowrap' }}>{t}</span>
              <span style={{ color:'rgba(250,250,248,0.28)',fontSize:9 }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   ③ PROCESS
───────────────────────────────────────────────── */
const Process = () => {
  const ref=useRef<HTMLElement>(null), inView=useInView(ref,{once:true,margin:'-60px'});
  return (
    <section ref={ref} className="sec" style={{ background:'var(--white)' }}>
      <div className="inn">
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,260px),1fr))',
          gap:'clamp(20px,4vw,56px)',alignItems:'flex-end',marginBottom:'clamp(40px,6vw,70px)' }}>
          <motion.div variants={left} initial="hidden" animate={inView?'show':'hidden'}>
            <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:14 }}>
              <div style={{ width:24,height:2,background:'var(--pink)' }}/>
              <span style={{ fontSize:9,fontWeight:700,letterSpacing:'.24em',color:'var(--pink)',textTransform:'uppercase' }}>How We Work</span>
            </div>
            <h2 className="cd" style={{ fontSize:'clamp(3rem,7vw,7rem)',letterSpacing:'.02em',lineHeight:.88,color:'var(--ink)' }}>
              BRIEF TO LIVE<br/><span style={{ color:'var(--pink)' }}>IN 5 STEPS.</span>
            </h2>
          </motion.div>
          <motion.p variants={up} custom={0} initial="hidden" animate={inView?'show':'hidden'}
            style={{ fontSize:'clamp(12px,1.3vw,14px)',color:'var(--mid)',lineHeight:1.90,maxWidth:340,alignSelf:'flex-end',fontWeight:500 }}>
            A disciplined shoot process built around total clarity at every stage — so you never wonder what happens next.
          </motion.p>
        </div>

        {PROCESS.map((s,i)=>(
          <motion.div key={s.n} className="p-row"
            variants={row} custom={i*.09} initial="hidden" animate={inView?'show':'hidden'}>
            <div className="p-num cd"
              style={{ fontSize:'clamp(2.8rem,5.5vw,5rem)',lineHeight:1,color:'rgba(10,10,12,0.13)' }}>
              {s.n}
            </div>
            <div>
              <h3 className="cd" style={{ fontSize:'clamp(1.4rem,3vw,2.6rem)',letterSpacing:'.04em',color:'var(--ink)',marginBottom:7 }}>
                {s.title}
              </h3>
              <p style={{ fontSize:12,color:'var(--mid)',lineHeight:1.82,maxWidth:500,fontWeight:500 }}>{s.desc}</p>
            </div>
            <div className="p-tag" style={{
              padding:'7px 13px',
              background:s.c, color:s.c==='var(--lime)'?'var(--ink)':'var(--white)',
              fontSize:9,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',
              textAlign:'center',whiteSpace:'nowrap',
            }}>{s.tag}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────
   ④ CRAFT OBSESSIONS
───────────────────────────────────────────────── */
const Craft = () => {
  const ref=useRef<HTMLElement>(null), inView=useInView(ref,{once:true,margin:'-80px'});
  const [hov,setHov]=useState<number|null>(null);
  return (
    <section ref={ref} className="sec" style={{ background:'var(--ink)' }}>
      <div className="inn">
        <motion.div variants={left} initial="hidden" animate={inView?'show':'hidden'}
          style={{ marginBottom:'clamp(40px,5vw,64px)',display:'flex',alignItems:'flex-end',
            justifyContent:'space-between',flexWrap:'wrap',gap:20 }}>
          <h2 className="cd" style={{ fontSize:'clamp(2.8rem,7vw,7rem)',letterSpacing:'.02em',lineHeight:.88,color:'var(--white)' }}>
            SIX THINGS<br/><span style={{ color:'var(--lime)' }}>WE OBSESS</span><br/>OVER.
          </h2>
          <p style={{ fontSize:'clamp(12px,1.3vw,13px)',color:'rgba(250,250,248,0.40)',lineHeight:1.90,
            maxWidth:300,fontWeight:500,alignSelf:'flex-end' }}>
            Every one of these is non-negotiable on every job we take — no exceptions.
          </p>
        </motion.div>

        <div className="c-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'rgba(250,250,248,0.08)' }}>
          {CRAFT.map((c,i)=>(
            <motion.div key={c.title} className="c-card"
              variants={pop} custom={i*.08} initial="hidden" animate={inView?'show':'hidden'}
              onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}>
              <div style={{
                width:38,height:38,borderRadius:'50%',marginBottom:16,
                background:hov===i?c.color:'rgba(250,250,248,0.08)',
                display:'flex',alignItems:'center',justifyContent:'center',
                transition:'background .22s',
                color:hov===i?c.textColor:'rgba(250,250,248,0.60)',
              }}>{c.icon}</div>
              <h3 className="cd" style={{
                fontSize:'clamp(1.5rem,2.8vw,2.4rem)',letterSpacing:'.04em',marginBottom:12,
                color:hov===i?c.color:'rgba(250,250,248,0.70)',
                transition:'color .22s',
              }}>{c.title}</h3>
              <p style={{ fontSize:12,color:'rgba(250,250,248,0.38)',lineHeight:1.84,fontWeight:500 }}>{c.desc}</p>
              <div className="c-bar" style={{ background:c.color }}/>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────
   ⑤ WORK STYLES — colour-blocked
───────────────────────────────────────────────── */
const WorkStyles = () => {
  const ref=useRef<HTMLElement>(null), inView=useInView(ref,{once:true,margin:'-80px'});
  return (
    <section ref={ref} className="sec" style={{ background:'var(--white)' }}>
      <div className="inn">
        <motion.div variants={left} initial="hidden" animate={inView?'show':'hidden'}
          style={{ marginBottom:'clamp(30px,4vw,52px)' }}>
          <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:14 }}>
            <div style={{ width:24,height:2,background:'var(--ink)' }}/>
            <span style={{ fontSize:9,fontWeight:700,letterSpacing:'.24em',color:'var(--mid)',textTransform:'uppercase' }}>Photography Styles</span>
          </div>
          <h2 className="cd" style={{ fontSize:'clamp(2.8rem,6.5vw,6.5rem)',letterSpacing:'.02em',lineHeight:.88,color:'var(--ink)' }}>
            SIX LOOKS.<br/><span className="txt-outline">ONE PRODUCT.</span>
          </h2>
        </motion.div>

        <div className="w-grid" style={{ display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:4 }}>
          {WORK_CARDS.map((w,i)=>(
            <motion.div key={w.label} className="w-card"
              variants={pop} custom={i*.07} initial="hidden" animate={inView?'show':'hidden'}
              style={{ background:w.bg }}>
              {/* Decorative ring */}
              <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
                width:'50%',paddingBottom:'50%',borderRadius:'50%',
                border:`1.5px solid ${w.accent}`,opacity:.30 }}/>
              {/* Category tag */}
              <div style={{ position:'absolute',top:14,left:14,fontSize:8,fontWeight:700,
                letterSpacing:'.18em',color:w.fg,opacity:.50,textTransform:'uppercase' }}>{w.tag}</div>
              {/* Label */}
              <div>
                <h3 className="cd" style={{ fontSize:'clamp(.9rem,1.6vw,1.5rem)',letterSpacing:'.04em',color:w.fg,lineHeight:1,marginBottom:6 }}>
                  {w.label}
                </h3>
                <div className="w-arrow" style={{ display:'flex',alignItems:'center',gap:4 }}>
                  <div style={{ width:14,height:1,background:w.accent }}/>
                  <ArrowUpRight size={11} color={w.accent}/>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────
   ⑥ OUTCOMES — on pink
───────────────────────────────────────────────── */
const Outcomes = () => {
  const ref=useRef<HTMLElement>(null), inView=useInView(ref,{once:true,margin:'-80px'});
  return (
    <section ref={ref} style={{ background:'var(--pink)',position:'relative',overflow:'hidden',
      padding:'clamp(60px,9vw,120px) clamp(16px,6vw,80px)' }}>
      {/* Watermark */}
      <div className="cd" aria-hidden style={{ position:'absolute',right:'-1%',top:'50%',
        transform:'translateY(-50%)',fontSize:'clamp(140px,26vw,400px)',
        color:'rgba(255,255,255,0.07)',pointerEvents:'none',userSelect:'none',
        lineHeight:1,whiteSpace:'nowrap' }}>RESULTS</div>

      <div className="inn" style={{ position:'relative',zIndex:2 }}>
        <motion.div variants={left} initial="hidden" animate={inView?'show':'hidden'}
          style={{ marginBottom:'clamp(36px,5vw,60px)' }}>
          <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:14 }}>
            <div style={{ width:24,height:2,background:'var(--white)' }}/>
            <span style={{ fontSize:9,fontWeight:700,letterSpacing:'.24em',color:'rgba(255,255,255,0.65)',textTransform:'uppercase' }}>Outcomes</span>
          </div>
          <h2 className="cd" style={{ fontSize:'clamp(2.8rem,7vw,7rem)',letterSpacing:'.02em',lineHeight:.88,color:'var(--white)' }}>
            NUMBERS<br/><span style={{ color:'var(--lime)' }}>DON'T LIE.</span>
          </h2>
        </motion.div>

        {OUTCOMES.map((o,i)=>(
          <motion.div key={i} className="out-row"
            variants={row} custom={i*.09} initial="hidden" animate={inView?'show':'hidden'}>
            <div className="cd" style={{ fontSize:'clamp(3rem,8vw,7rem)',letterSpacing:'.01em',lineHeight:.88,
              color:'var(--white)',flexShrink:0,minWidth:'clamp(100px,14vw,190px)' }}>
              {o.metric}
            </div>
            <div style={{ flex:1,minWidth:0 }}>
              <p style={{ fontSize:'clamp(12px,1.4vw,14px)',color:'rgba(255,255,255,0.80)',lineHeight:1.76,
                fontWeight:500,marginBottom:10,maxWidth:540 }}>{o.label}</p>
              <div style={{ height:2,background:'rgba(255,255,255,0.18)',overflow:'hidden' }}>
                <motion.div
                  initial={{ scaleX:0 }} animate={inView?{ scaleX:o.pct/100 }:{}}
                  transition={{ duration:1.4,delay:.3+i*.12,ease:[.16,1,.3,1] }}
                  style={{ height:'100%',background:'var(--lime)',transformOrigin:'left' }}/>
              </div>
            </div>
            <div className="cd" style={{ fontSize:'clamp(1rem,2.2vw,2rem)',color:'rgba(255,255,255,0.28)',flexShrink:0,textAlign:'right' }}>
              {o.pct}%
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────
   ⑦ CATEGORIES
───────────────────────────────────────────────── */
const Categories = () => {
  const ref=useRef<HTMLElement>(null), inView=useInView(ref,{once:true,margin:'-80px'});
  return (
    <section ref={ref} className="sec" style={{ background:'var(--white)' }}>
      <div className="inn">
        <motion.div variants={left} initial="hidden" animate={inView?'show':'hidden'}
          style={{ marginBottom:'clamp(32px,5vw,54px)' }}>
          <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:14 }}>
            <div style={{ width:24,height:2,background:'var(--lime)',outline:'0',boxShadow:'0 0 8px rgba(205,255,0,0.5)' }}/>
            <span style={{ fontSize:9,fontWeight:700,letterSpacing:'.24em',color:'var(--mid)',textTransform:'uppercase' }}>We Shoot</span>
          </div>
          <h2 className="cd" style={{ fontSize:'clamp(2.8rem,6.5vw,6.5rem)',letterSpacing:'.02em',lineHeight:.88,color:'var(--ink)' }}>
            ANY PRODUCT.<br/><span className="txt-outline">EVERY CATEGORY.</span>
          </h2>
        </motion.div>

        <div style={{ display:'flex',flexWrap:'wrap',gap:4 }}>
          {CATS.map((c,i)=>(
            <motion.div key={c} className="cat-chip"
              variants={pop} custom={i*.07} initial="hidden" animate={inView?'show':'hidden'}>
              <span style={{ fontSize:9,fontWeight:700,letterSpacing:'.16em',opacity:.35 }}>
                {String.fromCharCode(65+i)}
              </span>
              <span className="cd" style={{ fontSize:'clamp(.95rem,1.9vw,1.6rem)',letterSpacing:'.05em' }}>{c}</span>
              <ChevronRight size={12} strokeWidth={2} style={{ opacity:.35,flexShrink:0 }}/>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────
   ⑧ CTA
───────────────────────────────────────────────── */
const CTA = () => {
  const ref=useRef<HTMLElement>(null), inView=useInView(ref,{once:true,margin:'-80px'});
  return (
    <section ref={ref} style={{ background:'var(--ink)',position:'relative',overflow:'hidden',
      padding:'clamp(60px,9vw,120px) clamp(16px,6vw,80px)' }}>
      {/* Lime left accent bar */}
      <div aria-hidden style={{ position:'absolute',top:0,left:0,bottom:0,width:8,background:'var(--lime)',zIndex:0 }}/>

      <div className="inn" style={{ position:'relative',zIndex:2,paddingLeft:'clamp(16px,3vw,32px)' }}>
        <div className="cta-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',
          gap:'clamp(48px,7vw,100px)',alignItems:'center' }}>

          {/* Left */}
          <motion.div variants={left} initial="hidden" animate={inView?'show':'hidden'}>
            <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:20 }}>
              <div style={{ width:24,height:2,background:'var(--lime)' }}/>
              <span style={{ fontSize:9,fontWeight:700,letterSpacing:'.24em',color:'var(--lime)',textTransform:'uppercase' }}>Start a Project</span>
            </div>
            <h2 className="cd" style={{ fontSize:'clamp(2.8rem,7vw,7rem)',letterSpacing:'.02em',lineHeight:.88,
              color:'var(--white)',marginBottom:32 }}>
              MAKE YOUR<br/><span style={{ color:'var(--pink)' }}>PRODUCT</span><br/>IMPOSSIBLE<br/>TO IGNORE.
            </h2>
            <div style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
              <Link href="/info/contact" className="btn-pink">Book a Shoot <ArrowUpRight size={14}/></Link>
             
            </div>
          </motion.div>

          {/* Right — benefit rows */}
          <motion.div variants={up} custom={0} initial="hidden" animate={inView?'show':'hidden'}>
            {[
              { icon:<Zap size={15} strokeWidth={1.5}/>,       col:'var(--lime)', label:'48hr Turnaround',        desc:'Final retouched assets within two working days of shoot completion.' },
              { icon:<Eye size={15} strokeWidth={1.5}/>,       col:'var(--pink)', label:'Free Concept Moodboard', desc:'We visualise the shoot before you commit to anything.' },
              { icon:<Repeat2 size={15} strokeWidth={1.5}/>,   col:'var(--blue)', label:'Unlimited Revisions',    desc:'On colour grade, retouching and crops — open until perfect.' },
              { icon:<Image size={15} strokeWidth={1.5}/>,     col:'var(--lime)', label:'Every Format Included',  desc:'Web, print, social, platform spec — all in one clean delivery.' },
            ].map((f,i)=>(
              <motion.div key={f.label}
                variants={row} custom={i*.09} initial="hidden" animate={inView?'show':'hidden'}
                style={{ display:'grid',gridTemplateColumns:'40px 1fr',gap:14,padding:'16px 0',
                  borderBottom:i<3?'1px solid rgba(250,250,248,0.08)':'none' }}>
                <div style={{ width:34,height:34,
                  border:`1.5px solid ${f.col}`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  color:f.col,flexShrink:0,borderRadius:2 }}>{f.icon}</div>
                <div>
                  <div className="cd" style={{ fontSize:'clamp(.95rem,1.8vw,1.4rem)',letterSpacing:'.04em',
                    color:'var(--white)',marginBottom:4 }}>{f.label}</div>
                  <p style={{ fontSize:11,color:'rgba(250,250,248,0.38)',lineHeight:1.76,fontWeight:500 }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}

            <div style={{ marginTop:22,paddingTop:16,borderTop:'1px solid rgba(250,250,248,0.08)',
              display:'flex',alignItems:'center',gap:8 }}>
              <div className="pdot" style={{ width:8,height:8,borderRadius:'50%',
                background:'#3DFF8F',boxShadow:'0 0 10px rgba(61,255,143,0.55)',flexShrink:0 }}/>
              <span style={{ fontSize:9,fontWeight:700,letterSpacing:'.18em',
                color:'rgba(61,255,143,0.70)',textTransform:'uppercase' }}>
                Currently Accepting New Projects
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────── */
export default function ProductPhotographyPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>
      <div className="fp">
        <Hero/>
        <Marquee/>
        <Process/>
        <Craft/>
        <WorkStyles/>
        <Outcomes/>
        <Categories/>
        <CTA/>
      </div>
    </>
  );
}