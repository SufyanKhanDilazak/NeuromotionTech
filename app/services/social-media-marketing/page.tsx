'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion, useInView, useScroll, useSpring,
  AnimatePresence, animate,
} from 'framer-motion';
import Link from 'next/link';
import {
  FaInstagram, FaFacebook, FaYoutube, FaWhatsapp,
  FaTwitter, FaTiktok, FaLinkedin, FaSnapchat,
  FaPinterest, FaReddit, FaTwitch, FaTelegram,
  FaHeart, FaComment, FaShare, FaBookmark,
  FaThumbsUp, FaFire, FaRocket, FaBolt,
  FaRetweet, FaEye, FaBell, FaRegBell,
  FaAt, FaHashtag, FaPaperPlane,
} from 'react-icons/fa6';
import {
  BsFillCameraVideoFill, BsFillImageFill,
  BsMicFill, BsCameraReelsFill, BsFillPeopleFill,
  BsStarFill, BsLightningChargeFill, BsGraphUpArrow,
  BsChatDotsFill, BsBroadcastPin,
} from 'react-icons/bs';
import {
  Heart, TrendingUp, Users, BarChart3, MessageCircle,
  Share2, Zap, ArrowRight, Sparkles, Star,
  Play, Bell, Eye, CheckCircle2, Crown,
  Megaphone, Target, Layers, Activity,
  ThumbsUp, Repeat2, Bookmark, MoreHorizontal,
  Globe, Send, Search, Hash,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

/* ─── CSS ─────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700;800;900;1000&display=swap');

  .sm { font-family: 'Nunito', system-ui, sans-serif; background: #fff; overflow-x: hidden; }
  .sm *, .sm *::before, .sm *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .sm a { text-decoration: none; color: inherit; }
  .sm button { cursor: pointer; border: none; background: none; font: inherit; }
  .bb { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }

  @keyframes sm-float-a { 0%,100%{transform:translateY(0) rotate(0deg) scale(1)} 33%{transform:translateY(-18px) rotate(5deg) scale(1.05)} 66%{transform:translateY(-8px) rotate(-4deg) scale(0.97)} }
  @keyframes sm-float-b { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(-6deg)} }
  @keyframes sm-spin-slow { to{transform:rotate(360deg)} }
  @keyframes sm-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes sm-marquee-r { from{transform:translateX(-50%)} to{transform:translateX(0)} }
  @keyframes sm-gradient { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes sm-glow { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
  @keyframes sm-ping-dot { 0%{transform:scale(1);opacity:1} 70%,100%{transform:scale(2.2);opacity:0} }
  @keyframes sm-wave { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)} }
  @keyframes sm-orbit { from{transform:rotate(0deg) translateX(110px) rotate(0deg)} to{transform:rotate(360deg) translateX(110px) rotate(-360deg)} }
  @keyframes sm-notification-shake { 0%,100%{transform:rotate(0deg)} 20%{transform:rotate(-12deg)} 40%{transform:rotate(12deg)} 60%{transform:rotate(-8deg)} 80%{transform:rotate(8deg)} }

  .sm-shimmer {
    background: linear-gradient(90deg,#E1306C,#F77737,#FCAF45,#833AB4,#1877F2,#E1306C);
    background-size: 300% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: sm-gradient 4s ease infinite;
  }

  .sm-marquee-wrap { overflow: hidden; }
  .sm-marquee { display:flex; animation: sm-marquee 22s linear infinite; white-space:nowrap; }
  .sm-marquee:hover { animation-play-state: paused; }
  .sm-marquee-r { display:flex; animation: sm-marquee-r 26s linear infinite; white-space:nowrap; }

  .sm-card {
    background: #fff;
    border-radius: 24px;
    border: 2px solid rgba(0,0,0,0.055);
    box-shadow: 0 2px 16px rgba(0,0,0,0.05);
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    overflow: hidden; position: relative;
  }
  .sm-card:hover { box-shadow: 0 18px 56px rgba(0,0,0,0.11); }

  .sm-dot-bg {
    background-image: radial-gradient(circle, rgba(99,102,241,0.1) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  .sm-float-icon {
    position: absolute; z-index: 3;
    border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    color: white;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    transition: transform 0.3s;
  }
  .sm-float-icon:hover { transform: scale(1.2) rotate(-6deg) !important; }

  .notif-dot {
    position: absolute; top: -5px; right: -5px;
    width: 18px; height: 18px; border-radius: 50%;
    background: #EF4444; color: white;
    font-size: 9px; font-weight: 900;
    display: flex; align-items: center; justify-content: center;
    border: 2px solid white;
  }
  .notif-dot::after {
    content: '';
    position: absolute; inset: -2px; border-radius: 50%;
    background: #EF4444; opacity: 0.5;
    animation: sm-ping-dot 1.6s ease-out infinite;
  }

  /* Story ring */
  .story-ring {
    padding: 3px;
    border-radius: 50%;
    background: linear-gradient(135deg,#E1306C,#F77737,#FCAF45);
  }

  /* Notification panel item */
  .notif-item {
    display: flex; align-items: center; gap: 10;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(0,0,0,0.04);
    transition: background 0.2s;
  }
  .notif-item:hover { background: rgba(0,0,0,0.02); }

  .wave-bar { border-radius: 4px; animation: sm-wave 1s ease-in-out infinite; }
`;

/* ─── helpers ─────────────────────────────────────────────────── */
function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: v => setVal(Math.floor(v)) });
    return ctrl.stop;
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

function Reveal({ children, delay = 0, dir = 'up', style }: {
  children: React.ReactNode; delay?: number; dir?: 'up'|'left'|'right'|'scale'; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y: dir==='up'?32:0, x: dir==='left'?-32:dir==='right'?32:0, scale: dir==='scale'?.88:1 }}
      animate={inView ? { opacity:1, y:0, x:0, scale:1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22,1,0.36,1] }}>
      {children}
    </motion.div>
  );
}

function PulseDot({ color }: { color: string }) {
  return (
    <span style={{ position:'relative', display:'inline-flex', width:9, height:9, flexShrink:0 }}>
      <motion.span style={{ position:'absolute', inset:0, borderRadius:'50%', background:color }}
        animate={{ scale:[1,2.4], opacity:[0.5,0] }} transition={{ duration:1.4, repeat:Infinity }} />
      <span style={{ position:'relative', width:9, height:9, borderRadius:'50%', background:color }} />
    </span>
  );
}

function LikeBtn({ count, color }: { count: string; color: string }) {
  const [liked, setLiked] = useState(false);
  return (
    <motion.button whileTap={{ scale: 0.7 }} onClick={() => setLiked(!liked)}
      style={{ display:'flex', alignItems:'center', gap:5, fontSize:12,
        fontWeight:800, color: liked ? color : '#9ca3af' }}>
      <motion.span animate={liked ? { scale:[1,1.7,1], rotate:[0,-20,0] } : { scale:1 }}
        transition={{ duration:0.4 }}>
        <FaHeart style={{ fill: liked ? color : 'currentColor' }} />
      </motion.span>
      {count}
    </motion.button>
  );
}

/* ─── Data ────────────────────────────────────────────────────── */
const PLATFORMS = [
  { name:'Instagram', icon:<FaInstagram/>, color:'#E1306C', bg:'linear-gradient(135deg,#833AB4,#E1306C,#F77737)', stat:'2.4B', tag:'Reels & Stories', pct:88 },
  { name:'Facebook', icon:<FaFacebook/>, color:'#1877F2', bg:'linear-gradient(135deg,#1877F2,#0a52d4)', stat:'3.0B', tag:'Ads & Groups', pct:94 },
  { name:'YouTube', icon:<FaYoutube/>, color:'#FF0000', bg:'linear-gradient(135deg,#FF0000,#cc0000)', stat:'2.7B', tag:'Shorts & Long-form', pct:91 },
  { name:'WhatsApp', icon:<FaWhatsapp/>, color:'#25D366', bg:'linear-gradient(135deg,#25D366,#128C7E)', stat:'2.0B', tag:'Broadcast & DMs', pct:86 },
  { name:'TikTok', icon:<FaTiktok/>, color:'#69C9D0', bg:'linear-gradient(135deg,#010101,#69C9D0)', stat:'1.7B', tag:'Viral Content', pct:97 },
  { name:'LinkedIn', icon:<FaLinkedin/>, color:'#0A66C2', bg:'linear-gradient(135deg,#0A66C2,#004182)', stat:'930M', tag:'B2B & Thought Lead', pct:79 },
  { name:'Twitter / X', icon:<FaTwitter/>, color:'#1DA1F2', bg:'linear-gradient(135deg,#1DA1F2,#0c7abf)', stat:'556M', tag:'Trending & RT', pct:82 },
  { name:'Pinterest', icon:<FaPinterest/>, color:'#E60023', bg:'linear-gradient(135deg,#E60023,#ad081b)', stat:'465M', tag:'Visual Discovery', pct:74 },
  { name:'Snapchat', icon:<FaSnapchat/>, color:'#FFFC00', bg:'linear-gradient(135deg,#FFFC00,#f0e800)', stat:'750M', tag:'Stories & Lenses', pct:78 },
  { name:'Reddit', icon:<FaReddit/>, color:'#FF4500', bg:'linear-gradient(135deg,#FF4500,#cc3700)', stat:'430M', tag:'Community Power', pct:71 },
  { name:'Telegram', icon:<FaTelegram/>, color:'#26A5E4', bg:'linear-gradient(135deg,#26A5E4,#1a80b5)', stat:'800M', tag:'Channels & Bots', pct:76 },
  { name:'Twitch', icon:<FaTwitch/>, color:'#9146FF', bg:'linear-gradient(135deg,#9146FF,#6c2bd9)', stat:'140M', tag:'Live & Gaming', pct:69 },
];

const SERVICES = [
  { icon:<BsCameraReelsFill size={20}/>, label:'Reels & Short Video', color:'#E1306C', bg:'#fdf2f8' },
  { icon:<BsFillImageFill size={20}/>, label:'Visual Content Design', color:'#833AB4', bg:'#faf5ff' },
  { icon:<BsFillPeopleFill size={20}/>, label:'Community Management', color:'#1877F2', bg:'#eff6ff' },
  { icon:<BsGraphUpArrow size={20}/>, label:'Paid Ad Campaigns', color:'#25D366', bg:'#f0fdf4' },
  { icon:<BsStarFill size={20}/>, label:'Influencer Outreach', color:'#F77737', bg:'#fff7ed' },
  { icon:<Target size={20}/>, label:'Audience Targeting', color:'#FF0000', bg:'#fef2f2' },
  { icon:<BsChatDotsFill size={20}/>, label:'DM & Chat Automation', color:'#25D366', bg:'#f0fdf4' },
  { icon:<BsBroadcastPin size={20}/>, label:'Live Streaming Strategy', color:'#9146FF', bg:'#f5f3ff' },
  { icon:<Megaphone size={20}/>, label:'Brand Voice & Tone', color:'#0A66C2', bg:'#eff6ff' },
  { icon:<BsLightningChargeFill size={20}/>, label:'Viral Hook Writing', color:'#FCAF45', bg:'#fffbeb' },
  { icon:<Globe size={20}/>, label:'Cross-Platform Sync', color:'#69C9D0', bg:'#ecfeff' },
  { icon:<BarChart3 size={20}/>, label:'Analytics & Reports', color:'#FF4500', bg:'#fff7f5' },
];

const STORIES_DATA = [
  { name:'Reels', icon:<FaInstagram/>, color:'#E1306C', active:true },
  { name:'YouTube', icon:<FaYoutube/>, color:'#FF0000', active:true },
  { name:'TikTok', icon:<FaTiktok/>, color:'#69C9D0', active:true },
  { name:'Stories', icon:<BsCameraReelsFill/>, color:'#833AB4', active:false },
  { name:'Snaps', icon:<FaSnapchat/>, color:'#FCAF45', active:false },
  { name:'Reels+', icon:<FaFacebook/>, color:'#1877F2', active:true },
  { name:'Shorts', icon:<BsCameraReelsFill/>, color:'#FF0000', active:false },
];

const NOTIFS = [
  { icon:<FaHeart/>, color:'#E1306C', text:'@brandco liked your Reel', time:'2s' },
  { icon:<FaComment/>, color:'#1877F2', text:'New comment on Facebook ad', time:'14s' },
  { icon:<FaRetweet/>, color:'#1DA1F2', text:'Your post was retweeted 847x', time:'1m' },
  { icon:<BsStarFill/>, color:'#FCAF45', text:'Influencer accepted collab', time:'3m' },
  { icon:<FaShare/>, color:'#25D366', text:'Campaign shared on WhatsApp', time:'5m' },
];

const MARQUEE_TOP = ['🔥 Instagram Reels','💙 Facebook Ads','🎬 YouTube Shorts','💚 WhatsApp Broadcast','⚡ TikTok Viral','💼 LinkedIn B2B','📌 Pinterest Pins','💜 Twitch Live','🤖 Telegram Bots','🎯 Paid Campaigns'];


/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function SocialMediaPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const [liveCount, setLiveCount] = useState(2847);
  const [showNotif, setShowNotif] = useState(false);
  const [notifIdx, setNotifIdx] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setLiveCount(n => n + Math.floor(Math.random() * 7)), 2200);
    const t2 = setInterval(() => setNotifIdx(i => (i + 1) % NOTIFS.length), 3500);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <div className="sm">
      <style>{CSS}</style>

      {/* Progress */}
      <motion.div className="fixed top-0 left-0 right-0 z-50 origin-left"
        style={{ scaleX, height: 3, background:'linear-gradient(90deg,#E1306C,#F77737,#FCAF45,#833AB4,#1877F2,#25D366,#FF0000,#69C9D0)' }} />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section style={{ position:'relative', overflow:'hidden', background:'#fff',
        padding:'100px 24px 72px', textAlign:'center' }}>

        <div className="sm-dot-bg" style={{ position:'absolute', inset:0, pointerEvents:'none' }} />

        {/* Color blobs */}
        {[
          { c:'rgba(225,48,108,0.09)', t:-100, l:-80, s:500 },
          { c:'rgba(131,58,180,0.08)', t:-60, r:-100, s:420 },
          { c:'rgba(37,211,102,0.07)', b:-60, l:'25%', s:380 },
          { c:'rgba(24,119,242,0.07)', t:'30%', r:'15%', s:320 },
          { c:'rgba(255,0,0,0.05)', b:'10%', l:'10%', s:280 },
        ].map((b, i) => (
          <div key={i} style={{ position:'absolute', borderRadius:'50%', filter:'blur(72px)',
            background:b.c, width:b.s, height:b.s,
            top:b.t, left:b.l, right:(b as any).r, bottom:(b as any).b, pointerEvents:'none' }} />
        ))}

        {/* ── FLOATING ICONS LAYER ── */}
        {/* Row 1 — large icons */}
        {[
          { icon:<FaInstagram/>, c:'#E1306C', bg:'linear-gradient(135deg,#833AB4,#E1306C,#F77737)', s:60, t:'12%', l:'4%', anim:'sm-float-a', delay:'0s', notif:'9+' },
          { icon:<FaFacebook/>, c:'#1877F2', bg:'#1877F2', s:60, t:'18%', r:'5%', anim:'sm-float-b', delay:'1s', notif:'3' },
          { icon:<FaYoutube/>, c:'#FF0000', bg:'#FF0000', s:56, t:'60%', l:'6%', anim:'sm-float-a', delay:'0.6s' },
          { icon:<FaWhatsapp/>, c:'#25D366', bg:'linear-gradient(135deg,#25D366,#128C7E)', s:56, b:'18%', r:'4%', anim:'sm-float-b', delay:'1.8s', notif:'12' },
          { icon:<FaTiktok/>, c:'#69C9D0', bg:'linear-gradient(135deg,#010101,#69C9D0)', s:52, t:'8%', l:'40%', anim:'sm-float-a', delay:'0.3s' },
          { icon:<FaLinkedin/>, c:'#0A66C2', bg:'#0A66C2', s:52, t:'48%', r:'3%', anim:'sm-float-b', delay:'0.9s' },
          { icon:<FaSnapchat/>, c:'#FCAF45', bg:'linear-gradient(135deg,#FFFC00,#f0a500)', s:48, b:'30%', l:'3%', anim:'sm-float-a', delay:'1.4s', notif:'5' },
          { icon:<FaTwitter/>, c:'#1DA1F2', bg:'#1DA1F2', s:48, t:'36%', l:'9%', anim:'sm-float-b', delay:'2s' },
          { icon:<FaPinterest/>, c:'#E60023', bg:'#E60023', s:44, t:'32%', r:'9%', anim:'sm-float-a', delay:'1.1s' },
          { icon:<FaTelegram/>, c:'#26A5E4', bg:'#26A5E4', s:44, b:'22%', l:'14%', anim:'sm-float-b', delay:'0.5s' },
          { icon:<FaTwitch/>, c:'#9146FF', bg:'#9146FF', s:44, b:'12%', l:'44%', anim:'sm-float-a', delay:'1.7s', notif:'!' },
          { icon:<FaReddit/>, c:'#FF4500', bg:'#FF4500', s:42, t:'70%', r:'12%', anim:'sm-float-b', delay:'2.4s' },
        ].map((f, i) => (
          <motion.div key={i}
            className="sm-float-icon"
            style={{
              width:f.s, height:f.s, background:f.bg,
              top:(f as any).t, left:(f as any).l, right:(f as any).r, bottom:(f as any).b,
              fontSize: f.s * 0.44,
              animation:`${f.anim} ${3.8 + i * 0.3}s ease-in-out infinite`,
              animationDelay: f.delay,
            }}
            whileHover={{ scale:1.25, rotate:-8, zIndex:10 }}>
            {f.icon}
            {(f as any).notif && (
              <div className="notif-dot">{(f as any).notif}</div>
            )}
          </motion.div>
        ))}

        {/* ── ORBITING RING (desktop) ── */}
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          width:220, height:220, pointerEvents:'none', display:'none' }} className="sm-orbit-ring" />

        {/* Content */}
        <div style={{ position:'relative', zIndex:4, maxWidth:820, margin:'0 auto' }}>

          {/* Live pulse badge */}
          <motion.div initial={{ opacity:0, y:-28, scale:.9 }} animate={{ opacity:1, y:0, scale:1 }}
            transition={{ delay:.1, type:'spring', bounce:.5 }}
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 20px',
              borderRadius:99, background:'rgba(225,48,108,0.07)', border:'2px solid rgba(225,48,108,0.18)',
              fontSize:12, fontWeight:800, color:'#E1306C', marginBottom:24, cursor:'pointer' }}
            onClick={() => setShowNotif(!showNotif)}>
            <PulseDot color="#E1306C" />
            {liveCount.toLocaleString()} engagements happening now
            <FaBolt style={{ color:'#F77737' }} />
            <Bell size={13} />
          </motion.div>

          {/* Notification popup */}
          <AnimatePresence>
            {showNotif && (
              <motion.div initial={{ opacity:0, y:-10, scale:.95 }} animate={{ opacity:1, y:0, scale:1 }}
                exit={{ opacity:0, y:-10, scale:.95 }}
                style={{ position:'absolute', top:52, left:'50%', transform:'translateX(-50%)',
                  width:300, background:'#fff', borderRadius:20, border:'2px solid rgba(0,0,0,0.07)',
                  boxShadow:'0 20px 60px rgba(0,0,0,0.14)', zIndex:20, overflow:'hidden' }}>
                <div style={{ padding:'12px 16px', borderBottom:'1px solid rgba(0,0,0,0.06)',
                  display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontWeight:800, fontSize:13, color:'#0f0f1a' }}>🔔 Live Notifications</span>
                  <button onClick={() => setShowNotif(false)} style={{ fontSize:11, color:'#94a3b8', fontWeight:700 }}>Close</button>
                </div>
                {NOTIFS.map((n, i) => (
                  <motion.div key={i} className="notif-item"
                    initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px',
                      borderBottom:'1px solid rgba(0,0,0,0.04)' }}>
                    <div style={{ width:32, height:32, borderRadius:10, background:n.color+'18',
                      color:n.color, display:'flex', alignItems:'center', justifyContent:'center',
                      flexShrink:0, fontSize:14 }}>
                      {n.icon}
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:11.5, fontWeight:700, color:'#374151', lineHeight:1.4 }}>{n.text}</p>
                      <p style={{ fontSize:10, color:'#94a3b8' }}>{n.time} ago</p>
                    </div>
                    <PulseDot color={n.color} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Headline */}
          <motion.h1 className="bb"
            style={{ fontSize:'clamp(4rem,10vw,10rem)', lineHeight:.88, color:'#0f0f1a', marginBottom:4 }}
            initial={{ opacity:0, y:44 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:.2, duration:.7, ease:[0.22,1,0.36,1] }}>
            SOCIAL MEDIA
          </motion.h1>
          <motion.h1 className="bb sm-shimmer"
            style={{ fontSize:'clamp(4rem,10vw,10rem)', lineHeight:.88, marginBottom:28 }}
            initial={{ opacity:0, y:44 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:.3, duration:.7, ease:[0.22,1,0.36,1] }}>
            THAT HITS DIFFERENT
          </motion.h1>

          {/* Sub */}
          <motion.p style={{ fontSize:'clamp(1rem,1.9vw,1.22rem)', color:'#64748b',
              maxWidth:520, margin:'0 auto 40px', lineHeight:1.78, fontWeight:700 }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.5 }}>
            Go viral. Build cult-like communities. Dominate every feed.
            <br />We run your socials — you run your business. 🔥
          </motion.p>

          {/* CTA */}
          <motion.div style={{ display:'flex', flexWrap:'wrap', gap:14, justifyContent:'center', marginBottom:52 }}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.6 }}>
            <Link href="/info/contact">
              <motion.button
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'15px 34px',
                  borderRadius:16, fontWeight:900, fontSize:15, color:'white',
                  background:'linear-gradient(135deg,#E1306C,#833AB4)',
                  boxShadow:'0 10px 40px rgba(225,48,108,0.42)' }}
                whileHover={{ scale:1.05, y:-3, boxShadow:'0 20px 60px rgba(225,48,108,0.55)' }}
                whileTap={{ scale:.96 }}>
                <FaRocket /> Start Growing Today
                <motion.span animate={{ x:[0,5,0] }} transition={{ duration:1.2, repeat:Infinity }}>
                  <ArrowRight size={17} />
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Platform pills row */}
          <motion.div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8 }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.75 }}>
            {PLATFORMS.slice(0,8).map((p,i) => (
              <motion.div key={p.name}
                style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 14px',
                  borderRadius:99, background:'#f8fafc', border:'1.5px solid rgba(0,0,0,0.07)',
                  fontSize:12, fontWeight:800, color:p.color }}
                initial={{ opacity:0, scale:.82 }} animate={{ opacity:1, scale:1 }}
                transition={{ delay:.82+i*.06, type:'spring', bounce:.4 }}
                whileHover={{ scale:1.1, background:`${p.color}12`, borderColor:p.color }}>
                <span style={{ fontSize:15 }}>{p.icon}</span> {p.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          DUAL MARQUEE
      ══════════════════════════════ */}
      <div style={{ background:'#0f0f1a', borderTop:'3px solid #E1306C', borderBottom:'3px solid #833AB4', padding:'0' }}>
        <div className="sm-marquee-wrap" style={{ padding:'11px 0', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
          <div className="sm-marquee">
            {[...MARQUEE_TOP,...MARQUEE_TOP].map((item,i)=>(
              <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:12,
                padding:'0 28px', fontSize:12, fontWeight:800, color:'rgba(255,255,255,0.8)',
                letterSpacing:'0.07em', textTransform:'uppercase', flexShrink:0 }}>
                {item} <span style={{ width:3, height:3, borderRadius:'50%', background:'#E1306C' }} />
              </span>
            ))}
          </div>
        </div>
       
         
        
      
      </div>

      {/* ══════════════════════════════
          STORIES ROW + LIVE WAVE
      ══════════════════════════════ */}
      <section style={{ background:'#fafafe', padding:'40px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ background:'#fff', borderRadius:24, border:'2px solid rgba(0,0,0,0.055)',
            boxShadow:'0 4px 20px rgba(0,0,0,0.05)', padding:'20px 24px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <BsBroadcastPin size={18} style={{ color:'#E1306C' }} />
                <span style={{ fontWeight:900, fontSize:14, color:'#0f0f1a' }}>Active Channels</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6,
                fontSize:10, fontWeight:800, color:'#E1306C',
                padding:'5px 12px', borderRadius:99,
                background:'rgba(225,48,108,0.08)', border:'1px solid rgba(225,48,108,0.2)' }}>
                <PulseDot color="#E1306C" /> LIVE NOW
              </div>
            </div>
            <div style={{ display:'flex', gap:18, overflowX:'auto', paddingBottom:4 }}>
              {STORIES_DATA.map((s,i)=>(
                <motion.div key={s.name} initial={{ opacity:0, scale:.8 }} animate={{ opacity:1, scale:1 }}
                  transition={{ delay:i*.07 }} whileHover={{ scale:1.1, y:-3 }}
                  style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8,
                    cursor:'pointer', flexShrink:0, width:64 }}>
                  <div style={{ padding: s.active ? 2 : 0, borderRadius:'50%',
                    background: s.active ? `linear-gradient(135deg,${s.color},${s.color}88)` : 'transparent',
                    border: s.active ? 'none' : '2px solid #e5e7eb' }}>
                    <div style={{ width:52, height:52, borderRadius:'50%', background:s.active?s.color+'22':'#f1f5f9',
                      border:`2px solid ${s.active?'white':'#e5e7eb'}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:s.color, fontSize:22 }}>
                      {s.icon}
                    </div>
                  </div>
                  <span style={{ fontSize:10, fontWeight:700, color:'#64748b', textAlign:'center', lineHeight:1.2 }}>{s.name}</span>
                </motion.div>
              ))}
              {/* Wave bars */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                gap:8, flexShrink:0, marginLeft:12 }}>
                <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:44 }}>
                  {[0.4,0.7,1,0.8,0.6,0.9,0.5,0.75,1,0.6].map((h,i)=>(
                    <motion.div key={i} className="wave-bar"
                      style={{ width:5, background:'linear-gradient(to top,#E1306C,#833AB4)',
                        animationDelay:`${i*0.12}s` }}
                      animate={{ height:[`${h*20}px`,`${h*44}px`,`${h*20}px`] }}
                      transition={{ duration:0.9+i*0.08, repeat:Infinity, ease:'easeInOut', delay:i*0.1 }} />
                  ))}
                </div>
                <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8' }}>Live Feed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          STATS
      ══════════════════════════════ */}
      <section style={{ background:'#fff', padding:'60px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto',
          display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
          {[
            { n:847, suffix:'K+', label:'Followers Gained', color:'#E1306C', icon:<Users size={20}/>, extra:'Across all platforms' },
            { n:340, suffix:'%', label:'Avg Engagement Lift', color:'#1877F2', icon:<TrendingUp size={20}/>, extra:'vs industry avg' },
            { n:280, suffix:'+', label:'Brands Managed', color:'#25D366', icon:<Crown size={20}/>, extra:'Globally' },
            { n:99, suffix:'%', label:'Client Retention', color:'#833AB4', icon:<BsStarFill size={18}/>, extra:'12-month average' },
          ].map((s,i)=>(
            <Reveal key={s.label} delay={i*.08} dir="scale">
              <motion.div className="sm-card" style={{ padding:'26px 22px', textAlign:'center' }}
                whileHover={{ borderColor:s.color+'55', y:-5 }}>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3,
                  background:`linear-gradient(90deg,transparent,${s.color},transparent)` }} />
                <div style={{ position:'absolute', top:0, left:0, right:0, height:60,
                  background:`linear-gradient(to bottom,${s.color}08,transparent)`, pointerEvents:'none' }} />
                <div style={{ width:46, height:46, borderRadius:14, background:s.color+'16',
                  color:s.color, display:'flex', alignItems:'center', justifyContent:'center',
                  margin:'0 auto 12px' }}>
                  {s.icon}
                </div>
                <div className="bb" style={{ fontSize:'clamp(2.2rem,4.5vw,3rem)', color:s.color,
                  lineHeight:1, marginBottom:5 }}>
                  <Counter to={s.n} suffix={s.suffix} />
                </div>
                <div style={{ fontSize:14, fontWeight:800, color:'#0f0f1a', marginBottom:4 }}>{s.label}</div>
                <div style={{ fontSize:11, fontWeight:600, color:'#94a3b8' }}>{s.extra}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          PLATFORM CARDS (all 12)
      ══════════════════════════════ */}
      <section style={{ padding:'64px 24px', background:'#fafafe' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Reveal style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'5px 16px',
              borderRadius:99, background:'#fdf2f8', border:'1.5px solid rgba(225,48,108,0.2)',
              fontSize:11, fontWeight:800, color:'#E1306C', letterSpacing:'0.08em',
              textTransform:'uppercase', marginBottom:14 }}>
              <FaBolt /> 12 Platforms. One Agency.
            </div>
            <h2 className="bb" style={{ fontSize:'clamp(2.4rem,5.5vw,5.5rem)', color:'#0f0f1a', lineHeight:.95 }}>
              WHERE YOUR{' '}
              <span style={{ background:'linear-gradient(135deg,#E1306C,#833AB4)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                AUDIENCE LIVES
              </span>
            </h2>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
            {PLATFORMS.map((p,i)=>(
              <Reveal key={p.name} delay={i*.05} dir="scale">
                <motion.div className="sm-card" style={{ padding:'24px' }}
                  whileHover={{ y:-7 }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:p.bg }} />
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                    <motion.div style={{ width:52, height:52, borderRadius:16, background:p.bg,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'white', fontSize:24, boxShadow:`0 6px 22px ${p.color}40` }}
                      whileHover={{ rotate:10, scale:1.12 }} transition={{ type:'spring', bounce:.5 }}>
                      {p.icon}
                    </motion.div>
                    <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 11px',
                      borderRadius:99, background:p.color+'12', color:p.color,
                      fontSize:9, fontWeight:800, letterSpacing:'0.05em', textTransform:'uppercase' }}>
                      {p.tag}
                    </div>
                  </div>
                  <h3 style={{ fontSize:17, fontWeight:900, color:'#0f0f1a', marginBottom:10 }}>{p.name}</h3>
                  {/* Engagement row */}
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                    <LikeBtn count="4.2K" color={p.color} />
                    <button style={{ display:'flex', alignItems:'center', gap:4, fontSize:12,
                      fontWeight:700, color:'#9ca3af' }}>
                      <FaComment /> 892
                    </button>
                    <button style={{ display:'flex', alignItems:'center', gap:4, fontSize:12,
                      fontWeight:700, color:'#9ca3af' }}>
                      <FaShare /> 1.1K
                    </button>
                    <button style={{ marginLeft:'auto', color:'#d1d5db' }}><FaBookmark /></button>
                  </div>
                  {/* Stat bar */}
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ fontSize:10, color:'#94a3b8', fontWeight:600 }}>Monthly Active</span>
                    <span className="bb" style={{ fontSize:15, color:p.color }}>{p.stat}</span>
                  </div>
                  <div style={{ height:5, borderRadius:99, background:'#f1f5f9', overflow:'hidden' }}>
                    <motion.div style={{ height:'100%', borderRadius:99, background:p.bg }}
                      initial={{ width:0 }} whileInView={{ width:`${p.pct}%` }}
                      viewport={{ once:true }}
                      transition={{ duration:1.2, ease:[0.22,1,0.36,1], delay:i*.05+.2 }} />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          SERVICES
      ══════════════════════════════ */}
      <section style={{ padding:'64px 24px', background:'#fff' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Reveal style={{ textAlign:'center', marginBottom:48 }}>
            <h2 className="bb" style={{ fontSize:'clamp(2.4rem,5.5vw,5.5rem)', color:'#0f0f1a', lineHeight:.95 }}>
              EVERYTHING YOUR{' '}
              <span style={{ background:'linear-gradient(135deg,#1877F2,#25D366)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                BRAND NEEDS
              </span>
            </h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
            {SERVICES.map((s,i)=>(
              <Reveal key={s.label} delay={i*.05} dir="scale">
                <motion.div className="sm-card" style={{ padding:'18px 16px',
                    display:'flex', alignItems:'center', gap:12 }}
                  whileHover={{ borderColor:s.color+'50', y:-4, background:`${s.color}04` }}>
                  <motion.div style={{ width:42, height:42, borderRadius:12, background:s.bg,
                    color:s.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}
                    whileHover={{ rotate:10, scale:1.12 }} transition={{ type:'spring', bounce:.5 }}>
                    {s.icon}
                  </motion.div>
                  <span style={{ fontSize:13, fontWeight:800, color:'#374151' }}>{s.label}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          MOCK SOCIAL POSTS
      ══════════════════════════════ */}
      <section style={{ padding:'64px 24px', background:'#fafafe' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Reveal style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'5px 16px',
              borderRadius:99, background:'#eff6ff', border:'1.5px solid rgba(24,119,242,0.2)',
              fontSize:11, fontWeight:800, color:'#1877F2', textTransform:'uppercase',
              letterSpacing:'0.07em', marginBottom:14 }}>
              <BsBroadcastPin size={12} /> Real Campaigns. Real Results.
            </div>
            <h2 className="bb" style={{ fontSize:'clamp(2.4rem,5.5vw,5.5rem)', color:'#0f0f1a', lineHeight:.95 }}>
              CAMPAIGNS THAT{' '}
              <span style={{ background:'linear-gradient(135deg,#FF0000,#F77737)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                GO VIRAL
              </span>
            </h2>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:18 }}>
            {[
              { platform:'Instagram', icon:<FaInstagram/>, color:'#E1306C',
                bg:'linear-gradient(135deg,#833AB4,#E1306C,#F77737)',
                handle:'@brandnova_co', time:'2h ago',
                content:'Our Reels strategy took this brand from 2K → 140K followers in 60 days. Zero paid ads. 🔥 The algorithm is your best friend when you know how to speak its language.',
                likes:'18.4K', comments:'923', shares:'4.2K', views:'2.1M',
                hashtags:['#Reels','#GrowthHack','#InstagramGrowth'] },
              { platform:'TikTok', icon:<FaTiktok/>, color:'#69C9D0',
                bg:'linear-gradient(135deg,#010101,#69C9D0)',
                handle:'@growthclubb', time:'5h ago',
                content:'Posted 3 videos using our viral hook formula → 2.1M views, 89K new followers, $240K in sales. The secret? First 0.5 seconds everything. 📈',
                likes:'94.2K', comments:'3.1K', shares:'21K', views:'4.8M',
                hashtags:['#TikTokTips','#Viral','#ContentCreator'] },
              { platform:'YouTube', icon:<FaYoutube/>, color:'#FF0000',
                bg:'linear-gradient(135deg,#FF0000,#FF6B35)',
                handle:'@channelblast', time:'1d ago',
                content:'Optimized titles, thumbnails & posting schedule. Result: 180% jump in CTR, 340% more watch time, 2.4× subscriber velocity. YouTube loves consistency. 🎬',
                likes:'12.7K', comments:'1.8K', shares:'5.6K', views:'890K',
                hashtags:['#YouTube','#SEO','#VideoMarketing'] },
            ].map((post,i)=>(
              <Reveal key={post.platform} delay={i*.1} dir="scale">
                <motion.div className="sm-card" whileHover={{ y:-7 }}>
                  <div style={{ height:4, background:post.bg }} />
                  <div style={{ padding:'20px 20px 0' }}>
                    {/* Header */}
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                      <div style={{ width:46, height:46, borderRadius:14, background:post.bg,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        color:'white', fontSize:22, flexShrink:0 }}>
                        {post.icon}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                          <span style={{ fontWeight:900, fontSize:13, color:'#0f0f1a' }}>{post.handle}</span>
                          <CheckCircle2 size={13} style={{ color:post.color }} />
                        </div>
                        <span style={{ fontSize:10, color:'#94a3b8', fontWeight:600 }}>{post.time}</span>
                      </div>
                      <Badge style={{ background:post.color+'15', color:post.color,
                        border:`1px solid ${post.color}30`, fontSize:9, fontWeight:800 }}>
                        {post.platform}
                      </Badge>
                    </div>
                    {/* Content */}
                    <p style={{ fontSize:13, color:'#374151', lineHeight:1.75, marginBottom:12 }}>{post.content}</p>
                    {/* Hashtags */}
                    <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:12 }}>
                      {post.hashtags.map((h,j)=>(
                        <span key={j} style={{ fontSize:11, fontWeight:700, color:post.color, cursor:'pointer' }}>{h}</span>
                      ))}
                    </div>
                    {/* Views stat */}
                    <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:11,
                      fontWeight:700, color:'#94a3b8', marginBottom:12 }}>
                      <Eye size={12} /> {post.views} views
                      <span style={{ marginLeft:8 }}>·</span>
                      <Activity size={12} style={{ marginLeft:4 }} /> Trending
                    </div>
                  </div>
                  {/* Engagement */}
                  <div style={{ borderTop:'1px solid #f1f5f9', padding:'12px 20px',
                    display:'flex', alignItems:'center', gap:16 }}>
                    <LikeBtn count={post.likes} color={post.color} />
                    <button style={{ display:'flex', alignItems:'center', gap:4, fontSize:12,
                      fontWeight:700, color:'#9ca3af' }}><FaComment />{post.comments}</button>
                    <button style={{ display:'flex', alignItems:'center', gap:4, fontSize:12,
                      fontWeight:700, color:'#9ca3af' }}><FaRetweet />{post.shares}</button>
                    <button style={{ display:'flex', alignItems:'center', gap:4, fontSize:12,
                      fontWeight:700, color:'#9ca3af' }}><FaShare />Send</button>
                    <button style={{ marginLeft:'auto', color:'#d1d5db' }}><FaBookmark /></button>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          DARK CTA
      ══════════════════════════════ */}
      <section style={{ padding:'80px 24px', position:'relative', overflow:'hidden', background:'#0f0f1a' }}>

        {/* More floating icons in dark */}
        {[
          { icon:<FaInstagram/>, bg:'#E1306C', t:'15%', l:'3%', s:52, d:0 },
          { icon:<FaFacebook/>, bg:'#1877F2', b:'18%', l:'5%', s:48, d:1.3 },
          { icon:<FaYoutube/>, bg:'#FF0000', t:'12%', r:'4%', s:52, d:.7 },
          { icon:<FaWhatsapp/>, bg:'#25D366', b:'15%', r:'3%', s:48, d:2 },
          { icon:<FaSnapchat/>, bg:'#FCAF45', t:'48%', r:'2%', s:44, d:.4 },
          { icon:<FaLinkedin/>, bg:'#0A66C2', b:'40%', l:'8%', s:42, d:2.3 },
          { icon:<FaTwitter/>, bg:'#1DA1F2', t:'70%', r:'8%', s:42, d:1.1 },
        ].map((f,i)=>(
          <motion.div key={i} style={{ position:'absolute', width:f.s, height:f.s,
            top:(f as any).t, left:(f as any).l, right:(f as any).r, bottom:(f as any).b,
            borderRadius:16, background:(f as any).bg,
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'white', fontSize:f.s*.44, zIndex:1,
            boxShadow:`0 6px 24px rgba(0,0,0,0.35)` }}
            animate={{ y:[0,-16,0], rotate:[0,5,-4,0] }}
            transition={{ duration:4+i*.4, repeat:Infinity, ease:'easeInOut', delay:f.d }}>
            {f.icon}
          </motion.div>
        ))}

        {/* Glow orbs */}
        <div style={{ position:'absolute', top:'40%', left:'50%', transform:'translate(-50%,-50%)',
          width:700, height:400, borderRadius:'50%',
          background:'radial-gradient(ellipse,rgba(225,48,108,0.14) 0%,transparent 70%)',
          pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:0, left:'30%',
          width:400, height:300, borderRadius:'50%',
          background:'radial-gradient(ellipse,rgba(131,58,180,0.12) 0%,transparent 70%)',
          pointerEvents:'none' }} />

        {/* Grid */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.035) 1px,transparent 1px)',
          backgroundSize:'28px 28px' }} />

        <Reveal style={{ maxWidth:700, margin:'0 auto', textAlign:'center', position:'relative', zIndex:2 }}>
          {/* Spinning social ring */}
          <div style={{ position:'relative', width:120, height:120, margin:'0 auto 28px' }}>
            <motion.div style={{ position:'absolute', inset:0, borderRadius:'50%',
              border:'2px dashed rgba(225,48,108,0.3)' }}
              animate={{ rotate:360 }} transition={{ duration:12, repeat:Infinity, ease:'linear' }} />
            <motion.div style={{ position:'absolute', inset:8, borderRadius:'50%',
              border:'2px solid rgba(131,58,180,0.2)' }}
              animate={{ rotate:-360 }} transition={{ duration:8, repeat:Infinity, ease:'linear' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
              justifyContent:'center', fontSize:40 }}>
              <motion.div animate={{ scale:[1,1.15,1] }} transition={{ duration:2.5, repeat:Infinity }}>
                🚀
              </motion.div>
            </div>
          </div>

          <motion.div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'7px 18px',
            borderRadius:99, background:'rgba(255,255,255,0.08)', border:'1.5px solid rgba(255,255,255,0.14)',
            fontSize:12, fontWeight:800, color:'rgba(255,255,255,0.7)', marginBottom:22 }}
            animate={{ scale:[1,1.04,1] }} transition={{ duration:2.5, repeat:Infinity }}>
            <Sparkles size={13} style={{ color:'#FCAF45' }} /> Ready to go viral?
          </motion.div>

          <h2 className="bb" style={{ fontSize:'clamp(3.2rem,8vw,7.5rem)', color:'#fff',
            lineHeight:.88, marginBottom:18 }}>
            YOUR BRAND
            <br />
            <span style={{ background:'linear-gradient(135deg,#E1306C,#F77737,#FCAF45,#25D366,#833AB4)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              DESERVES MORE
            </span>
          </h2>

          <p style={{ fontSize:16, color:'rgba(255,255,255,0.48)', marginBottom:36,
            lineHeight:1.78, fontWeight:700 }}>
            Let's build your following, blow up your engagement,
            and turn every platform into a revenue machine. 🔥
          </p>

          {/* Platform icon row */}
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:10, marginBottom:36 }}>
            {[
              { icon:<FaInstagram/>, c:'#E1306C', bg:'linear-gradient(135deg,#833AB4,#E1306C,#F77737)' },
              { icon:<FaFacebook/>, c:'#1877F2', bg:'#1877F2' },
              { icon:<FaYoutube/>, c:'#FF0000', bg:'#FF0000' },
              { icon:<FaWhatsapp/>, c:'#25D366', bg:'linear-gradient(135deg,#25D366,#128C7E)' },
              { icon:<FaTiktok/>, c:'#69C9D0', bg:'linear-gradient(135deg,#010101,#69C9D0)' },
              { icon:<FaLinkedin/>, c:'#0A66C2', bg:'#0A66C2' },
              { icon:<FaTwitter/>, c:'#1DA1F2', bg:'#1DA1F2' },
              { icon:<FaSnapchat/>, c:'#FCAF45', bg:'#FCAF45' },
            ].map((p,i)=>(
              <motion.div key={i}
                style={{ width:46, height:46, borderRadius:14, background:p.bg,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'white', fontSize:20, boxShadow:`0 4px 18px ${p.c}50` }}
                whileHover={{ scale:1.25, rotate:-8 }}
                animate={{ y:[0,-8,0] }}
                transition={{ duration:3+i*.3, repeat:Infinity, ease:'easeInOut', delay:i*.2 }}>
                {p.icon}
              </motion.div>
            ))}
          </div>

          <Link href="/info/contact">
            <motion.button
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'18px 44px',
                borderRadius:18, fontWeight:900, fontSize:16, color:'white', cursor:'pointer',
                background:'linear-gradient(135deg,#E1306C,#833AB4,#F77737)',
                boxShadow:'0 18px 60px rgba(225,48,108,0.5)', border:'none', marginBottom:28 }}
              whileHover={{ scale:1.06, y:-5, boxShadow:'0 28px 80px rgba(225,48,108,0.65)' }}
              whileTap={{ scale:.96 }}>
              <FaRocket /> Book a Free Strategy Call
              <ArrowRight size={18} />
            </motion.button>
          </Link>

          <div style={{ display:'flex', flexWrap:'wrap', gap:24, justifyContent:'center' }}>
            {[
              { icon:<CheckCircle2 size={14}/>, text:'No long-term contracts', c:'#25D366' },
              { icon:<FaFire/>, text:'Results in 30 days', c:'#F77737' },
              { icon:<BsStarFill size={12}/>, text:'4.9★ on Google', c:'#FCAF45' },
              { icon:<FaBolt/>, text:'Same-day onboarding', c:'#E1306C' },
            ].map((b,i)=>(
              <motion.div key={b.text}
                style={{ display:'flex', alignItems:'center', gap:7,
                  fontSize:13, color:'rgba(255,255,255,0.45)', fontWeight:700 }}
                initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*.1 }}>
                <span style={{ color:b.c }}>{b.icon}</span>{b.text}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}