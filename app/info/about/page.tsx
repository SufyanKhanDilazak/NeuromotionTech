'use client';

/**
 * AboutPage.tsx — Premium redesign
 * White bg · System fonts · Bento services grid · No stats section
 * Next.js 16 · TypeScript · Framer Motion · Lucide React
 */

import React, {
  useState, useCallback, useEffect, useRef, memo, type JSX,
} from 'react';
import Image from 'next/image';
import {
  motion, AnimatePresence, useInView, useScroll, useTransform,
} from 'framer-motion';
import {
  Box, Bot, Code2, Briefcase, Film, Database,
  Camera, Search, Share2, Palette, Globe,
  ChevronLeft, ChevronRight, ArrowUpRight, Sparkles,
} from 'lucide-react';

/* ─── CSS ──────────────────────────────────────────────────────────────────── */
const CSS = `
  :root {
    --blue:  #0057FF;
    --blue2: #3b82f6;
    --ink:   #0a0a0f;
    --muted: #6b7280;
    --faint: #e5e7eb;
    --surf:  #f7f8fc;
  }

  .ap * { box-sizing: border-box; }
  .ap { -webkit-font-smoothing: antialiased; }

  @keyframes gx {
    0%,100%{ background-position:0% 50% }
    50%    { background-position:100% 50% }
  }
  .grad-text {
    background: linear-gradient(120deg,#0057FF 0%,#6366f1 45%,#06b6d4 100%);
    background-size: 200% 200%;
    animation: gx 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
  .blink { animation: blink 2s ease-in-out infinite; }

  .grain { position: relative; }
  .grain::after {
    content:'';
    position:absolute; inset:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:180px 180px;
    opacity:.022; mix-blend-mode:overlay;
    pointer-events:none; border-radius:inherit;
  }

  .svc {
    position:relative; overflow:hidden;
    background:#fff; border:1px solid var(--faint); border-radius:24px;
    transition: transform .32s cubic-bezier(.16,1,.3,1),
                box-shadow .32s cubic-bezier(.16,1,.3,1),
                border-color .25s ease;
  }
  .svc:hover {
    transform:translateY(-8px);
    box-shadow: 0 28px 72px -8px rgba(0,87,255,.13), 0 8px 24px rgba(0,0,0,.06);
    border-color: rgba(0,87,255,.22);
  }
  .svc-glow {
    position:absolute; inset:0; opacity:0;
    transition:opacity .35s ease; pointer-events:none; border-radius:inherit;
  }
  .svc:hover .svc-glow { opacity:1; }
  .svc-bar {
    position:absolute; bottom:0; left:0; right:0;
    height:3px; border-radius:0 0 24px 24px;
    opacity:0; transition:opacity .3s ease; pointer-events:none;
  }
  .svc:hover .svc-bar { opacity:1; }

  .bento-feat { grid-column: span 2; }
  @media (max-width:700px) { .bento-feat { grid-column: span 1; } }

  .tc { transition: transform .3s ease, box-shadow .3s ease; }
  .tc:hover { transform: translateY(-5px); box-shadow: 0 24px 60px rgba(0,0,0,.13); }

  .vc {
    border:1px solid var(--faint); border-radius:20px; background:#fff;
    transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
  }
  .vc:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0,87,255,.09);
    border-color: rgba(0,87,255,.18);
  }

  @keyframes scroll-line {
    0%   { transform:scaleY(0); opacity:1; transform-origin:top; }
    100% { transform:scaleY(1); opacity:0; transform-origin:top; }
  }
  .scroll-line { animation: scroll-line 1.8s ease-in-out infinite; }

  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .marquee-track { animation: marquee 22s linear infinite; white-space:nowrap; }
  .marquee-track:hover { animation-play-state: paused; }
`;

/* ─── Services ─────────────────────────────────────────────────────────────── */
interface Service {
  id:string; title:string; desc:string;
  icon:JSX.Element; bg:string; fg:string; tag:string; featured?:boolean;
}

const SERVICES: Service[] = [
  { id:'3d',    title:'3D Animation',         desc:'Cinematic renders and animations that captivate.',
    icon:<Box size={22} strokeWidth={1.7}/>,    bg:'linear-gradient(135deg,#fef3c7,#fde68a)', fg:'#b45309', tag:'Creative', featured:true },
  { id:'ai',    title:'AI Automation',         desc:'Intelligent workflows that multiply your output.',
    icon:<Bot size={22} strokeWidth={1.7}/>,    bg:'linear-gradient(135deg,#ede9fe,#ddd6fe)', fg:'#7c3aed', tag:'Innovation' },
  { id:'app',   title:'App Development',       desc:'Full-stack applications built for scale.',
    icon:<Code2 size={22} strokeWidth={1.7}/>,  bg:'linear-gradient(135deg,#dbeafe,#bfdbfe)', fg:'#1d4ed8', tag:'Engineering' },
  { id:'biz',   title:'Business Consultation', desc:'Strategy that turns ambition into real results.',
    icon:<Briefcase size={22} strokeWidth={1.7}/>, bg:'linear-gradient(135deg,#d1fae5,#a7f3d0)', fg:'#047857', tag:'Strategy', featured:true },
  { id:'cgi',   title:'CGI Ads',               desc:'Photo-real ads that stop the scroll cold.',
    icon:<Film size={22} strokeWidth={1.7}/>,   bg:'linear-gradient(135deg,#fce7f3,#fbcfe8)', fg:'#be185d', tag:'Creative' },
  { id:'crm',   title:'CRM Portals',           desc:'Custom systems that delight your customers.',
    icon:<Database size={22} strokeWidth={1.7}/>,bg:'linear-gradient(135deg,#e0f2fe,#bae6fd)', fg:'#0369a1', tag:'Engineering' },
  { id:'photo', title:'Product Photoshoot',    desc:'Visuals that make your catalogue irresistible.',
    icon:<Camera size={22} strokeWidth={1.7}/>, bg:'linear-gradient(135deg,#fef9c3,#fef08a)', fg:'#ca8a04', tag:'Creative' },
  { id:'seo',   title:'SEO',                   desc:'Rank higher, grow faster, dominate search.',
    icon:<Search size={22} strokeWidth={1.7}/>, bg:'linear-gradient(135deg,#dcfce7,#bbf7d0)', fg:'#15803d', tag:'Growth' },
  { id:'smm',   title:'Social Media',          desc:'Content that compounds brand equity daily.',
    icon:<Share2 size={22} strokeWidth={1.7}/>, bg:'linear-gradient(135deg,#faf5ff,#ede9fe)', fg:'#9333ea', tag:'Growth' },
  { id:'wd',    title:'Web Designing',         desc:'Bespoke UI/UX that converts at every touch.',
    icon:<Palette size={22} strokeWidth={1.7}/>,bg:'linear-gradient(135deg,#fff1f2,#fecdd3)', fg:'#e11d48', tag:'Creative' },
  { id:'wdev',  title:'Web Development',       desc:'Lightning-fast builds — 100/100 Lighthouse.',
    icon:<Globe size={22} strokeWidth={1.7}/>,  bg:'linear-gradient(135deg,#dbeafe,#e0f2fe)', fg:'#2563eb', tag:'Engineering' },
];

/* ─── Team ─────────────────────────────────────────────────────────────────── */
interface Member { id:string; name:string; role:string; image:string; initials:string; }
const MEMBERS: Member[] = [
  { id:'daniyal', name:'Daniyal Khurram', role:'Founder & Director',            image:'/team/daniyal.jpg', initials:'DK' },
  { id:'sufyan',  name:'Sufyan Khan',     role:'Co-Founder & Chief AI Engineer', image:'/team/sufyan.jpg',  initials:'SK' },
  { id:'huzaifa', name:'Huzaifa',         role:'CEO · Chief Executive Officer',   image:'/team/huzaifa.jpg', initials:'HZ' },
];
const TOTAL=MEMBERS.length, CARD_W=280, CARD_H=360;
const CE:[number,number,number,number]=[0.25,0.46,0.45,0.94];

const TAGS=['3D Animation','AI Automation','App Dev','Business Consultation',
  'CGI Ads','CRM Portals','Product Photoshoot','SEO','Social Media','Web Design','Web Development'];

const fadeUp={
  hidden:{ opacity:0, y:36 },
  show:(i:number)=>({ opacity:1, y:0, transition:{ duration:.7, delay:i*.07, ease:[.16,1,.3,1] as const } }),
};

/* ═══════════════════════════ HERO ══════════════════════════════════════════ */
const Hero = () => {
  const ref=useRef<HTMLElement>(null);
  const { scrollYProgress }=useScroll({ target:ref, offset:['start start','end start'] });
  const yBlob  = useTransform(scrollYProgress,[0,1],['0%','30%']);
  const fadeOut= useTransform(scrollYProgress,[0,.55],[1,0]);

  return (
    <section ref={ref} className="grain" style={{
      position:'relative', overflow:'hidden', minHeight:'100svh',
      background:'#ffffff',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'clamp(100px,14vw,160px) clamp(20px,6vw,64px) clamp(60px,8vw,100px)',
      textAlign:'center',
    }}>
      {/* Background mesh */}
      <motion.div aria-hidden="true" style={{ y:yBlob, position:'absolute', inset:0, pointerEvents:'none' }}>
        <div style={{
          position:'absolute', top:'-20%', left:'50%', transform:'translateX(-50%)',
          width:'140%', height:'90%',
          background:'radial-gradient(ellipse 70% 55% at 50% 30%, rgba(0,87,255,.07) 0%, transparent 70%)',
          filter:'blur(32px)',
        }}/>
        <div style={{
          position:'absolute', bottom:'-10%', left:'-5%', width:'45%', height:'60%',
          background:'radial-gradient(ellipse, rgba(99,102,241,.06) 0%, transparent 70%)',
          filter:'blur(40px)',
        }}/>
        <div style={{
          position:'absolute', top:'20%', right:'-5%', width:'35%', height:'50%',
          background:'radial-gradient(ellipse, rgba(6,182,212,.05) 0%, transparent 70%)',
          filter:'blur(36px)',
        }}/>
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'radial-gradient(circle, rgba(0,87,255,.055) 1px, transparent 1px)',
          backgroundSize:'44px 44px',
          maskImage:'radial-gradient(ellipse 75% 65% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:'radial-gradient(ellipse 75% 65% at 50% 50%, black 30%, transparent 100%)',
        }}/>
      </motion.div>

      {/* Content */}
      <motion.div style={{
        opacity:fadeOut, position:'relative', zIndex:10,
        width:'100%', maxWidth:820, margin:'0 auto',
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}
          style={{
            display:'inline-flex', alignItems:'center', gap:8, marginBottom:36,
            padding:'8px 20px', borderRadius:99,
            background:'rgba(0,87,255,.06)', border:'1px solid rgba(0,87,255,.16)',
          }}
        >
          <span className="blink" style={{ width:6,height:6,borderRadius:'50%',background:'var(--blue)',display:'inline-block',flexShrink:0 }}/>
          <span style={{ fontSize:11,fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--blue)' }}>
            Digital Studio — Est. 2022
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ overflow:'hidden', marginBottom:10 }}>
          <motion.h1
            initial={{ y:90, opacity:0 }} animate={{ y:0, opacity:1 }}
            transition={{ duration:1, delay:.08, ease:[.16,1,.3,1] }}
            style={{
              fontSize:'clamp(3.2rem,9vw,7.5rem)', fontWeight:900,
              lineHeight:.93, letterSpacing:'-0.045em', color:'var(--ink)', margin:0,
            }}
          >We craft digital</motion.h1>
        </div>
        <div style={{ overflow:'hidden', marginBottom:32 }}>
          <motion.h1
            className="grad-text"
            initial={{ y:90, opacity:0 }} animate={{ y:0, opacity:1 }}
            transition={{ duration:1, delay:.16, ease:[.16,1,.3,1] }}
            style={{
              fontSize:'clamp(3.2rem,9vw,7.5rem)', fontWeight:900,
              lineHeight:.93, letterSpacing:'-0.045em', margin:0, paddingBottom:'.1em',
            }}
          >experiences.</motion.h1>
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7, delay:.3 }}
          style={{
            fontSize:'clamp(15px,1.9vw,18px)', color:'var(--muted)',
            lineHeight:1.8, maxWidth:480, margin:'0 auto 44px', fontWeight:400,
          }}
        >
          A lean studio of three — delivering{' '}
          <strong style={{ color:'var(--ink)', fontWeight:600 }}>11 disciplines</strong>{' '}
          from AI automation to cinematic CGI, all under one roof.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6, delay:.42 }}
          style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:12 }}
        >
          <button type="button" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'14px 32px', borderRadius:99,
            background:'var(--ink)', color:'#fff',
            fontSize:14, fontWeight:600, border:'none', cursor:'pointer',
            boxShadow:'0 4px 24px rgba(0,0,0,.18)',
            transition:'transform .25s ease, box-shadow .25s ease',
          }}
            onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,.25)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,.18)'; }}
          >Our Services <ArrowUpRight size={16}/></button>

          <button type="button" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'14px 32px', borderRadius:99,
            background:'transparent', color:'var(--ink)',
            fontSize:14, fontWeight:600, border:'1.5px solid var(--faint)', cursor:'pointer',
            transition:'border-color .25s ease, color .25s ease',
          }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--blue)'; e.currentTarget.style.color='var(--blue)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--faint)'; e.currentTarget.style.color='var(--ink)'; }}
          >Meet the Team</button>
        </motion.div>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
        style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)' }}
      >
        <div style={{ width:1.5, height:48, background:'linear-gradient(to bottom, var(--blue), transparent)', borderRadius:99, overflow:'hidden' }}>
          <div className="scroll-line" style={{ width:'100%', height:'100%', background:'var(--blue)' }}/>
        </div>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════ MARQUEE ═══════════════════════════════════════ */
const Marquee = () => {
  const items=[...TAGS,...TAGS,...TAGS];
  return (
    <div style={{
      overflow:'hidden', borderTop:'1px solid var(--faint)', borderBottom:'1px solid var(--faint)',
      background:'var(--surf)', padding:'14px 0',
    }}>
      <div className="marquee-track" style={{ display:'inline-flex', gap:0 }}>
        {items.map((t,i)=>(
          <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:20, padding:'0 32px', borderRight:'1px solid var(--faint)' }}>
            <span style={{ fontSize:10,fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--muted)',whiteSpace:'nowrap' }}>{t}</span>
            <div style={{ width:3,height:3,borderRadius:'50%',background:'var(--blue)',opacity:.4 }}/>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════ SERVICE CARD ══════════════════════════════════ */
const SvcCard = memo(({ s,i,inView }:{ s:Service; i:number; inView:boolean }) => (
  <motion.div
    className={`svc grain${s.featured?' bento-feat':''}`}
    custom={i} variants={fadeUp} initial="hidden" animate={inView?'show':'hidden'}
    style={{ padding:'clamp(22px,2.8vw,30px)', cursor:'default' }}
  >
    <div className="svc-glow" style={{ background:`radial-gradient(ellipse at top left, ${s.fg}12 0%, transparent 60%)` }}/>
    <div className="svc-bar"  style={{ background:s.bg }}/>

    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
      <div style={{ width:48,height:48,borderRadius:13,background:s.bg,display:'flex',alignItems:'center',justifyContent:'center',color:s.fg,flexShrink:0 }}>
        {s.icon}
      </div>
      <span style={{ fontSize:9,fontWeight:700,letterSpacing:'0.20em',textTransform:'uppercase',color:s.fg,background:s.bg,padding:'4px 10px',borderRadius:99 }}>
        {s.tag}
      </span>
    </div>

    <h3 style={{ fontSize:'clamp(15px,1.6vw,18px)',fontWeight:700,color:'var(--ink)',margin:'0 0 8px',letterSpacing:'-0.02em' }}>{s.title}</h3>
    <p  style={{ fontSize:13.5,color:'var(--muted)',lineHeight:1.72,margin:0 }}>{s.desc}</p>
    <div style={{ display:'flex',alignItems:'center',gap:5,marginTop:20,fontSize:13,fontWeight:600,color:s.fg,cursor:'pointer' }}>
      Learn more <ArrowUpRight size={13}/>
    </div>
  </motion.div>
));
SvcCard.displayName='SvcCard';

/* ═══════════════════════════ SERVICES ══════════════════════════════════════ */
const Services = () => {
  const ref=useRef<HTMLElement>(null);
  const inView=useInView(ref,{ once:true, margin:'-60px' });

  return (
    <section ref={ref} style={{ background:'#fff', padding:'clamp(72px,9vw,120px) clamp(20px,5vw,60px)' }}>
      <div style={{ maxWidth:1240, margin:'0 auto' }}>
        {/* Header */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(min(100%,340px),1fr))',
          gap:32, alignItems:'flex-end', marginBottom:'clamp(44px,6vw,68px)',
        }}>
          <motion.div initial={{ opacity:0,y:24 }} animate={inView?{ opacity:1,y:0 }:{}} transition={{ duration:.7 }}>
            <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:16 }}>
              <span className="blink" style={{ width:6,height:6,borderRadius:'50%',background:'var(--blue)',display:'inline-block' }}/>
              <span style={{ fontSize:11,fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--blue)' }}>What We Do</span>
            </div>
            <div style={{ overflow:'hidden' }}>
              <motion.h2
                initial={{ y:60,opacity:0 }} animate={inView?{ y:0,opacity:1 }:{}}
                transition={{ duration:.9, delay:.08, ease:[.16,1,.3,1] }}
                style={{ fontSize:'clamp(2.2rem,5.5vw,4.8rem)',fontWeight:900,lineHeight:.95,letterSpacing:'-0.04em',color:'var(--ink)',margin:0 }}
              >
                11 services.<br/><span className="grad-text">One studio.</span>
              </motion.h2>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity:0,y:20 }} animate={inView?{ opacity:1,y:0 }:{}} transition={{ duration:.6, delay:.2 }}
            style={{ fontSize:'clamp(14px,1.7vw,16px)',color:'var(--muted)',lineHeight:1.82,margin:0,maxWidth:360 }}
          >
            Everything your brand needs — designed, engineered and delivered with zero hand-offs from one tight-knit team.
          </motion.p>
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%,268px),1fr))', gap:'clamp(12px,1.6vw,20px)' }}>
          {SERVICES.map((s,i)=><SvcCard key={s.id} s={s} i={i} inView={inView}/>)}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════ TEAM fallback / image ═════════════════════════ */
const Fallback=memo(({ m }:{ m:Member })=>(
  <div style={{
    position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
    background:'linear-gradient(145deg,#0f172a,#1e3a5f)',
  }}>
    <div style={{ width:76,height:76,borderRadius:16,background:'rgba(0,87,255,.18)',border:'1.5px solid rgba(0,87,255,.35)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:10 }}>
      <span style={{ fontSize:24,fontWeight:900,color:'#93c5fd',letterSpacing:'-0.04em' }}>{m.initials}</span>
    </div>
    <span style={{ fontSize:8,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(255,255,255,.22)' }}>
      /public/team/{m.id}.jpg
    </span>
  </div>
));
Fallback.displayName='Fallback';

const CardImg=memo(({ m,priority }:{ m:Member; priority:boolean })=>{
  const [err,setErr]=useState(false);
  if(err) return <Fallback m={m}/>;
  return (
    <>
      <Image src={m.image} alt={m.name} fill sizes={`${CARD_W*2}px`}
        className="object-cover object-top" priority={priority} draggable={false}
        onError={()=>setErr(true)}/>
      <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top, rgba(10,10,15,.92) 0%, rgba(10,10,15,.4) 45%, transparent 100%)',pointerEvents:'none' }}/>
    </>
  );
});
CardImg.displayName='CardImg';

/* ═══════════════════════════ CAROUSEL ══════════════════════════════════════ */
const Carousel=memo(()=>{
  const [cur,setCur]=useState(0);
  const [dir,setDir]=useState(0);
  const [ts, setTs] =useState(0);
  const [te, setTe] =useState(0);

  const paginate=useCallback((d:number)=>{ setDir(d); setCur(c=>(c+d+TOTAL)%TOTAL); },[]);
  const wrap=(i:number)=>(i+TOTAL)%TOTAL;
  const getPos=(i:number)=>{
    const d=wrap(i-cur);
    if(d===0) return 'center';
    if(d<=1)  return `right-${d}`;
    if(d>=TOTAL-1) return `left-${TOTAL-d}`;
    return 'hidden';
  };
  const getStyle=(p:string)=>{
    const t={ duration:.8, ease:CE };
    switch(p){
      case 'center':  return { zIndex:10,opacity:1,   scale:1.08,x:0,           filter:'grayscale(0%)',  pointerEvents:'auto'  as const,transition:t };
      case 'right-1': return { zIndex:5, opacity:.74, scale:.88, x:CARD_W*.68,  filter:'grayscale(100%)',pointerEvents:'auto'  as const,transition:t };
      case 'right-2': return { zIndex:1, opacity:.42, scale:.78, x:CARD_W*1.36, filter:'grayscale(100%)',pointerEvents:'auto'  as const,transition:t };
      case 'left-1':  return { zIndex:5, opacity:.74, scale:.88, x:-CARD_W*.68, filter:'grayscale(100%)',pointerEvents:'auto'  as const,transition:t };
      case 'left-2':  return { zIndex:1, opacity:.42, scale:.78, x:-CARD_W*1.36,filter:'grayscale(100%)',pointerEvents:'auto'  as const,transition:t };
      default: return { zIndex:0,opacity:0,scale:.8,x:dir>0?CARD_W*3:-CARD_W*3,filter:'grayscale(100%)',pointerEvents:'none' as const,transition:t };
    }
  };

  useEffect(()=>{
    const h=(e:KeyboardEvent)=>{ if(e.key==='ArrowLeft') paginate(-1); if(e.key==='ArrowRight') paginate(1); };
    document.addEventListener('keydown',h);
    return ()=>document.removeEventListener('keydown',h);
  },[paginate]);

  const m=MEMBERS[cur];

  return (
    <div style={{ display:'flex',flexDirection:'column',alignItems:'center',width:'100%',overflow:'hidden' }}
      onTouchStart={e=>setTs(e.targetTouches[0].clientX)}
      onTouchMove ={e=>setTe(e.targetTouches[0].clientX)}
      onTouchEnd  ={()=>{ const d=ts-te; if(Math.abs(d)>50) paginate(d>0?1:-1); }}
    >
      <div style={{ width:'100%', height:CARD_H+60, position:'relative', perspective:'1000px' }}>
        {/* Arrows */}
        {([{ d:-1, side:'left' },{ d:1, side:'right' }] as const).map(({ d,side })=>(
          <motion.button key={side} type="button" onClick={()=>paginate(d)}
            aria-label={d<0?'Previous':'Next'} whileTap={{ scale:.9 }}
            style={{
              position:'absolute', [side]:10, top:'50%', transform:'translateY(-50%)', zIndex:20,
              width:42,height:42,borderRadius:'50%',background:'#fff',
              border:'1.5px solid var(--faint)',display:'flex',alignItems:'center',justifyContent:'center',
              color:'var(--ink)',cursor:'pointer',boxShadow:'0 4px 16px rgba(0,0,0,.07)',
              transition:'border-color .25s ease, color .25s ease',
            }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--blue)'; e.currentTarget.style.color='var(--blue)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--faint)'; e.currentTarget.style.color='var(--ink)'; }}
          >
            {d<0?<ChevronLeft size={19} strokeWidth={2}/>:<ChevronRight size={19} strokeWidth={2}/>}
          </motion.button>
        ))}

        {/* Cards */}
        <div style={{ width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',position:'relative',transformStyle:'preserve-3d' }}>
          <AnimatePresence initial={false} custom={dir}>
            {MEMBERS.map((member,idx)=>{
              const p=getPos(idx); const isC=idx===cur;
              if(p==='hidden'&&!isC) return null;
              return (
                <motion.div key={member.id} className="tc"
                  style={{
                    position:'absolute',width:CARD_W,height:CARD_H,borderRadius:22,
                    top:'50%',left:'50%',marginLeft:-CARD_W/2,marginTop:-CARD_H/2,
                    overflow:'hidden',
                    border:isC?'2px solid rgba(0,87,255,.28)':'1px solid rgba(0,0,0,.07)',
                    boxShadow:isC?'0 0 0 1px rgba(0,87,255,.10), 0 28px 72px rgba(0,0,0,.22)':'0 8px 28px rgba(0,0,0,.09)',
                    cursor:isC?'default':'pointer',
                  }}
                  initial={getStyle('hidden')} animate={getStyle(p)} exit={getStyle('hidden')}
                  onClick={()=>{ if(!isC){ setDir(idx>cur?1:-1); setCur(idx); }}}
                >
                  <CardImg m={member} priority={isC}/>
                  {isC&&<div style={{ position:'absolute',top:0,left:0,right:0,height:3,zIndex:10,background:'linear-gradient(90deg,transparent,var(--blue),#6366f1,var(--blue),transparent)' }}/>}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Info */}
      <AnimatePresence mode="wait">
        <motion.div key={m.id+'-i'}
          initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-14 }} transition={{ duration:.28 }}
          style={{ textAlign:'center',padding:'4px 24px 0' }}
        >
          <h3 style={{ fontSize:'clamp(1.3rem,3.5vw,1.9rem)',fontWeight:800,color:'var(--ink)',margin:'0 0 5px',letterSpacing:'-0.03em' }}>{m.name}</h3>
          <p   style={{ fontSize:11,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--blue)',margin:0 }}>{m.role}</p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div style={{ display:'flex',gap:8,marginTop:22 }}>
        {MEMBERS.map((_,i)=>(
          <motion.button key={i} type="button" aria-label={`${MEMBERS[i].name}`} whileTap={{ scale:.9 }}
            onClick={()=>{ if(i!==cur){ setDir(i>cur?1:-1); setCur(i); }}}
            style={{
              height:8,width:i===cur?28:8,borderRadius:99,border:'none',padding:0,cursor:'pointer',
              background:i===cur?'var(--blue)':'var(--faint)',
              transition:'width .35s cubic-bezier(.16,1,.3,1), background .3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
});
Carousel.displayName='Carousel';

/* ═══════════════════════════ TEAM ══════════════════════════════════════════ */
const Team=()=>{
  const ref=useRef<HTMLElement>(null);
  const inView=useInView(ref,{ once:true, margin:'-80px' });

  return (
    <section ref={ref} style={{ background:'var(--surf)', borderTop:'1px solid var(--faint)', padding:'clamp(72px,9vw,120px) clamp(20px,5vw,60px)' }}>
      <div style={{ maxWidth:1200,margin:'0 auto' }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(min(100%,380px),1fr))',
          gap:'clamp(40px,7vw,96px)', alignItems:'center',
        }}>
          {/* Left */}
          <div>
            <motion.div initial={{ opacity:0,y:20 }} animate={inView?{ opacity:1,y:0 }:{}} transition={{ duration:.55 }}
              style={{ display:'flex',alignItems:'center',gap:8,marginBottom:20 }}>
              <span className="blink" style={{ width:6,height:6,borderRadius:'50%',background:'var(--blue)',display:'inline-block' }}/>
              <span style={{ fontSize:11,fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--blue)' }}>The Founders</span>
            </motion.div>

            <div style={{ overflow:'hidden',marginBottom:20 }}>
              <motion.h2
                initial={{ y:60,opacity:0 }} animate={inView?{ y:0,opacity:1 }:{}} transition={{ duration:.9,delay:.08,ease:[.16,1,.3,1] }}
                style={{ fontSize:'clamp(2rem,5vw,4.2rem)',fontWeight:900,lineHeight:.95,letterSpacing:'-0.04em',color:'var(--ink)',margin:0 }}
              >
                Three founders,<br/><span className="grad-text">one mission.</span>
              </motion.h2>
            </div>

            <motion.p initial={{ opacity:0,y:12 }} animate={inView?{ opacity:1,y:0 }:{}} transition={{ delay:.26,duration:.6 }}
              style={{ fontSize:'clamp(14px,1.6vw,16px)',color:'var(--muted)',lineHeight:1.82,margin:'0 0 28px',maxWidth:400 }}>
              No bloated agency layers — just a focused trio that owns every pixel, every line of code and every deadline.
            </motion.p>

            {['Direct founder access on every project','11 disciplines — zero hand-offs','UK & Global — async-first delivery'].map((b,i)=>(
              <motion.div key={b} initial={{ opacity:0,x:-18 }} animate={inView?{ opacity:1,x:0 }:{}} transition={{ delay:.36+i*.09 }}
                style={{ display:'flex',alignItems:'center',gap:12,marginBottom:12 }}>
                <div style={{ width:22,height:22,borderRadius:'50%',flexShrink:0,background:'rgba(0,87,255,.08)',border:'1.5px solid rgba(0,87,255,.22)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <div style={{ width:6,height:6,borderRadius:'50%',background:'var(--blue)' }}/>
                </div>
                <span style={{ fontSize:14,fontWeight:500,color:'var(--ink)' }}>{b}</span>
              </motion.div>
            ))}
          </div>

          {/* Carousel */}
          <motion.div initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ delay:.28,duration:.8 }}>
            <Carousel/>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════ VALUES ════════════════════════════════════════ */
const VALUES=[
  { n:'Obsessive Quality',        d:'We don\'t ship "good enough." Every deliverable is refined until it\'s undeniable.', accent:'#0057FF', bg:'rgba(0,87,255,.06)',    border:'rgba(0,87,255,.14)' },
  { n:'Full Ownership',           d:'Your project is ours. Proactive comms, zero excuses, complete accountability.',       accent:'#7c3aed', bg:'rgba(124,58,237,.06)', border:'rgba(124,58,237,.14)' },
  { n:'Speed Without Compromise', d:'Rapid iteration cycles that deliver fast — without ever sacrificing craft.',           accent:'#0891b2', bg:'rgba(8,145,178,.06)',  border:'rgba(8,145,178,.14)' },
];

const Values=()=>{
  const ref=useRef<HTMLElement>(null);
  const inView=useInView(ref,{ once:true,margin:'-80px' });

  return (
    <section ref={ref} style={{ background:'#fff',borderTop:'1px solid var(--faint)',padding:'clamp(72px,9vw,120px) clamp(20px,5vw,60px)' }}>
      <div style={{ maxWidth:1200,margin:'0 auto' }}>
        <div style={{ textAlign:'center',marginBottom:'clamp(44px,6vw,68px)' }}>
          <motion.div initial={{ opacity:0,y:16 }} animate={inView?{ opacity:1,y:0 }:{}} transition={{ duration:.5 }}
            style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginBottom:16 }}>
            <span className="blink" style={{ width:6,height:6,borderRadius:'50%',background:'var(--blue)',display:'inline-block' }}/>
            <span style={{ fontSize:11,fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--blue)' }}>Our Ethos</span>
          </motion.div>
          <div style={{ overflow:'hidden' }}>
            <motion.h2
              initial={{ y:56,opacity:0 }} animate={inView?{ y:0,opacity:1 }:{}} transition={{ duration:.9,delay:.08,ease:[.16,1,.3,1] }}
              style={{ fontSize:'clamp(2rem,5.5vw,4.5rem)',fontWeight:900,lineHeight:.95,letterSpacing:'-0.04em',color:'var(--ink)',margin:0 }}
            >
              Built on three<br/><span className="grad-text">non-negotiables.</span>
            </motion.h2>
          </div>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(min(100%,280px),1fr))',gap:'clamp(14px,2vw,22px)' }}>
          {VALUES.map((v,i)=>(
            <motion.div key={v.n} className="vc grain"
              custom={i} variants={fadeUp} initial="hidden" animate={inView?'show':'hidden'}
              style={{ padding:'clamp(24px,3vw,36px)',textAlign:'left',position:'relative' }}
            >
              {/* Big faint number */}
              <div style={{ fontSize:'clamp(3.5rem,7vw,6rem)',fontWeight:900,color:v.accent,lineHeight:1,opacity:.1,marginBottom:10,letterSpacing:'-0.06em' }}>
                {String(i+1).padStart(2,'0')}
              </div>
              {/* Icon */}
              <div style={{ width:48,height:48,borderRadius:13,background:v.bg,border:`1px solid ${v.border}`,display:'flex',alignItems:'center',justifyContent:'center',color:v.accent,marginBottom:18 }}>
                <Sparkles size={20} strokeWidth={1.8}/>
              </div>
              <h3 style={{ fontSize:'clamp(16px,1.8vw,19px)',fontWeight:700,color:'var(--ink)',margin:'0 0 10px',letterSpacing:'-0.02em' }}>{v.n}</h3>
              <p   style={{ fontSize:14,color:'var(--muted)',lineHeight:1.75,margin:0 }}>{v.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════ CTA ═══════════════════════════════════════════ */
const CTA=()=>{
  const ref=useRef<HTMLElement>(null);
  const inView=useInView(ref,{ once:true,margin:'-80px' });

  return (
    <section ref={ref} style={{ background:'var(--surf)',borderTop:'1px solid var(--faint)',padding:'clamp(72px,9vw,120px) clamp(20px,5vw,60px)' }}>
      <div style={{ maxWidth:800,margin:'0 auto' }}>
        <motion.div
          initial={{ opacity:0,scale:.97,y:24 }} animate={inView?{ opacity:1,scale:1,y:0 }:{}} transition={{ duration:.75,ease:[.16,1,.3,1] }}
          className="grain"
          style={{ position:'relative',overflow:'hidden',background:'var(--ink)',borderRadius:32,padding:'clamp(44px,7vw,72px) clamp(28px,5vw,60px)',textAlign:'center',boxShadow:'0 32px 80px rgba(0,0,0,.22)' }}
        >
          {/* Glows */}
          <div aria-hidden="true" style={{ position:'absolute',top:'-30%',left:'50%',transform:'translateX(-50%)',width:'80%',height:'80%',background:'radial-gradient(ellipse, rgba(0,87,255,.35) 0%, transparent 65%)',filter:'blur(40px)',pointerEvents:'none' }}/>
          <div aria-hidden="true" style={{ position:'absolute',bottom:'-20%',right:'-5%',width:'40%',height:'60%',background:'radial-gradient(ellipse, rgba(99,102,241,.25) 0%, transparent 70%)',filter:'blur(32px)',pointerEvents:'none' }}/>

          <div style={{ position:'relative',zIndex:1 }}>
            <motion.div initial={{ opacity:0,y:16 }} animate={inView?{ opacity:1,y:0 }:{}} transition={{ delay:.15 }}
              style={{ display:'inline-flex',alignItems:'center',gap:8,marginBottom:24,padding:'7px 18px',borderRadius:99,background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.15)' }}>
              <span className="blink" style={{ width:6,height:6,borderRadius:'50%',background:'#4ade80',display:'inline-block' }}/>
              <span style={{ fontSize:10,fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(255,255,255,.65)' }}>Available for New Projects</span>
            </motion.div>

            <div style={{ overflow:'hidden',marginBottom:10 }}>
              <motion.h2
                initial={{ y:50,opacity:0 }} animate={inView?{ y:0,opacity:1 }:{}} transition={{ duration:.8,delay:.2,ease:[.16,1,.3,1] }}
                style={{ fontSize:'clamp(2rem,5.5vw,4.5rem)',fontWeight:900,lineHeight:.95,letterSpacing:'-0.04em',color:'#fff',margin:0 }}
              >Let&apos;s build something</motion.h2>
            </div>
            <div style={{ overflow:'hidden',marginBottom:28 }}>
              <motion.h2
                className="grad-text"
                initial={{ y:50,opacity:0 }} animate={inView?{ y:0,opacity:1 }:{}} transition={{ duration:.8,delay:.26,ease:[.16,1,.3,1] }}
                style={{ fontSize:'clamp(2rem,5.5vw,4.5rem)',fontWeight:900,lineHeight:.95,letterSpacing:'-0.04em',margin:0,paddingBottom:'.08em' }}
              >extraordinary.</motion.h2>
            </div>

            <motion.p initial={{ opacity:0,y:12 }} animate={inView?{ opacity:1,y:0 }:{}} transition={{ delay:.34,duration:.6 }}
              style={{ fontSize:'clamp(14px,1.7vw,16px)',color:'rgba(255,255,255,.5)',lineHeight:1.8,maxWidth:400,margin:'0 auto 36px' }}>
              Drop us a message — we reply within 24 hours with a clear, no-nonsense plan.
            </motion.p>

            <motion.div initial={{ opacity:0,y:12 }} animate={inView?{ opacity:1,y:0 }:{}} transition={{ delay:.42 }}
              style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',gap:12 }}>
              <button type="button" style={{
                display:'inline-flex',alignItems:'center',gap:8,
                padding:'14px 32px',borderRadius:99,background:'#fff',color:'var(--ink)',
                fontSize:14,fontWeight:700,border:'none',cursor:'pointer',
                boxShadow:'0 4px 24px rgba(0,0,0,.3)',transition:'transform .25s ease, box-shadow .25s ease',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,.38)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,.3)'; }}
              >Get in Touch <ArrowUpRight size={16}/></button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════ ROOT ══════════════════════════════════════════ */
export default function AboutPage(){
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html:CSS }}/>
      <main className="ap">
        <Hero/>
        <Marquee/>
        <Services/>
        <Team/>
        <Values/>
        <CTA/>
      </main>
    </>
  );
}