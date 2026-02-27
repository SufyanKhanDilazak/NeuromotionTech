'use client';

/**
 * AboutUs.tsx — Ice blue aurora background, perfect contrast
 *
 * Background: deep navy → #257ca3 aurora blobs (same as NeuromotionTechHero)
 * Text: pure #ffffff for headings, rgba(255,255,255,0.80) for body — crisp on dark navy
 *
 * PHOTOS — drop into /public/team/:
 *   daniyal.jpg  →  Daniyal Khurram   (Founder & Director)
 *   sufyan.jpg   →  Sufyan Khan        (Co-Founder & Chief AI Engineer)
 *   huzaifa.jpg  →  Huzaifa            (CEO · Chief Executive Officer)
 */

import React, {
  useState, useCallback, useEffect, useRef, memo,
} from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Global CSS ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @keyframes au-blink {
    0%,100%{ opacity:1 } 50%{ opacity:.15 }
  }
  /* Three aurora blobs — same keyframe structure as NeuromotionTechHero */
  @keyframes au-aurora-1 {
    0%,100%{ transform: translate(0%,   0%)   scale(1);   }
    33%    { transform: translate(8%,  -12%)  scale(1.12); }
    66%    { transform: translate(-6%, 8%)    scale(0.94); }
  }
  @keyframes au-aurora-2 {
    0%,100%{ transform: translate(0%,   0%)   scale(1);   }
    33%    { transform: translate(-10%, 6%)   scale(1.08); }
    66%    { transform: translate(6%,  -10%)  scale(1.15); }
  }
  @keyframes au-aurora-3 {
    0%,100%{ transform: translate(0%,  0%)    scale(1);   }
    50%    { transform: translate(5%,  10%)   scale(1.10); }
  }

  .au-blink    { animation: au-blink    2s    ease-in-out infinite; }
  .au-aurora-1 { animation: au-aurora-1 18s   ease-in-out infinite; }
  .au-aurora-2 { animation: au-aurora-2 22s   ease-in-out infinite; }
  .au-aurora-3 { animation: au-aurora-3 14s   ease-in-out infinite; }
`;

/* ─── Team members ───────────────────────────────────────────────────────── */
interface TeamMember {
  id      : string;
  name    : string;
  role    : string;
  image   : string;
  initials: string;
}

const MEMBERS: TeamMember[] = [
  {
    id      : 'daniyal',
    name    : 'Daniyal Khurram',
    role    : 'Founder & Director',
    image   : '/dk.png',      /* ← /public/team/daniyal.jpg */
    initials: 'DK',
  },
  {
    id      : 'sufyan',
    name    : 'Sufyan Khan',
    role    : 'Co-Founder & Chief AI Engineer',
    image   : '/team/sufyan.jpg',       /* ← /public/team/sufyan.jpg  */
    initials: 'SK',
  },
  {
    id      : 'huzaifa',
    name    : 'Huzaifa',
    role    : 'CEO · Chief Executive Officer',
    image   : '/team/huzaifa.jpg',      /* ← /public/team/huzaifa.jpg */
    initials: 'HZ',
  },
];

const TOTAL  = MEMBERS.length;
const CARD_W = 280;
const CARD_H = 380;
const EASE: [number,number,number,number] = [0.25, 0.46, 0.45, 0.94];

/* ─── Initials fallback ──────────────────────────────────────────────────── */
const InitialsBg = memo(function InitialsBg({ member }: { member: TeamMember }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(145deg, rgba(0,13,26,0.95) 0%, rgba(13,45,69,0.95) 100%)',
      }}
    >
      <div
        style={{
          width: 80, height: 80, borderRadius: 16,
          background: 'rgba(37,124,163,0.18)',
          border: '1.5px solid rgba(37,124,163,0.40)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 12,
          boxShadow: '0 0 24px rgba(37,124,163,0.15)',
        }}
      >
        <span style={{
          fontSize: 26, fontWeight: 900,
          color: '#7dd3f0',
          letterSpacing: '-0.04em',
        }}>
          {member.initials}
        </span>
      </div>
      <span style={{
        fontSize: 8, fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase' as const,
        color: 'rgba(255,255,255,0.30)',
      }}>
        Add photo to /public/team/
      </span>
    </div>
  );
});

/* ─── Card image ─────────────────────────────────────────────────────────── */
const CardImage = memo(function CardImage({
  member, priority,
}: { member: TeamMember; priority: boolean }) {
  const [err, setErr] = useState(false);
  if (err) return <InitialsBg member={member} />;
  return (
    <>
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes={`${CARD_W * 2}px`}
        className="object-cover object-top"
        priority={priority}
        draggable={false}
        onError={() => setErr(true)}
      />
      {/* Bottom gradient — navy-tinted so name text is always readable */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '52%',
          background: 'linear-gradient(to top, rgba(0,10,22,0.94) 0%, rgba(0,10,22,0.55) 55%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      {/* Top vignette */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: '28%',
          background: 'linear-gradient(to bottom, rgba(0,10,22,0.32) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
    </>
  );
});

/* ─── TeamCarousel — exact same mechanism as your original ───────────────── */
const TeamCarousel = memo(function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction,    setDirection]    = useState(0);
  const [touchStart,   setTouchStart]   = useState(0);
  const [touchEnd,     setTouchEnd]     = useState(0);

  const paginate = useCallback((newDirection: number) => {
    if (TOTAL === 0) return;
    setDirection(newDirection);
    const nextIndex = (currentIndex + newDirection + TOTAL) % TOTAL;
    setCurrentIndex(nextIndex);
  }, [currentIndex]);

  const wrapIndex = (index: number) => (index + TOTAL) % TOTAL;

  /* exact same calculatePosition as original */
  const calculatePosition = (index: number) => {
    const diff = wrapIndex(index - currentIndex);
    if (diff === 0) return 'center';
    if (diff <= 1)  return `right-${diff}`;
    if (diff >= TOTAL - 1) return `left-${TOTAL - diff}`;
    return 'hidden';
  };

  /* exact same getVariantStyles as original */
  const getVariantStyles = (position: string) => {
    const transition = { duration: 0.8, ease: EASE };
    switch (position) {
      case 'center':
        return { zIndex:10, opacity:1, scale:1.1, x:0, filter:'grayscale(0%)', pointerEvents:'auto' as const, transition };
      case 'right-1':
        return { zIndex:5, opacity:0.8, scale:0.9, x:CARD_W*0.7, filter:'grayscale(100%)', pointerEvents:'auto' as const, transition };
      case 'right-2':
        return { zIndex:1, opacity:0.56, scale:0.81, x:CARD_W*1.4, filter:'grayscale(100%)', pointerEvents:'auto' as const, transition };
      case 'left-1':
        return { zIndex:5, opacity:0.8, scale:0.9, x:-CARD_W*0.7, filter:'grayscale(100%)', pointerEvents:'auto' as const, transition };
      case 'left-2':
        return { zIndex:1, opacity:0.56, scale:0.81, x:-CARD_W*1.4, filter:'grayscale(100%)', pointerEvents:'auto' as const, transition };
      default:
        return {
          zIndex:0, opacity:0, scale:0.8,
          x: direction > 0 ? CARD_W * 3 : -CARD_W * 3,
          filter:'grayscale(100%)', pointerEvents:'none' as const, transition,
        };
    }
  };

  /* keyboard */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [paginate]);

  /* touch */
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove  = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd   = () => {
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) paginate(diff > 0 ? 1 : -1);
  };

  const currentMember = MEMBERS[currentIndex];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative"
      style={{ background: 'transparent' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      {/* ── "OUR TEAM" big title — ice blue tinted, same position as original ── */}
      <h2
        className="font-black uppercase tracking-tight absolute pointer-events-none whitespace-nowrap"
        style={{
          fontSize  : 'clamp(3rem, 10vw, 8rem)',
          top       : 48,
          left      : '50%',
          transform : 'translateX(-50%)',
          color     : 'transparent',
          /* ice blue gradient version of original */
          background: 'linear-gradient(to bottom, rgba(37,124,163,0.22) 0%, transparent 76%)',
          WebkitBackgroundClip: 'text',
          backgroundClip      : 'text',
        }}
      >
        OUR TEAM
      </h2>

      {/* ── Carousel container — same as original ── */}
      <div
        className="w-full max-w-6xl relative mt-20"
        style={{ height: CARD_H + 100, perspective: '1000px' }}
      >

        {/* Left arrow — same as original, ice blue tint on hover */}
        <motion.button
          onClick={() => paginate(-1)}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
          style={{
            background: 'rgba(0,13,26,0.65)',
            border    : '1px solid rgba(37,124,163,0.30)',
            color     : '#ffffff',
            cursor    : 'pointer',
          }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(37,124,163,0.25)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,124,163,0.65)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(0,13,26,0.65)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,124,163,0.30)';
          }}
          type="button"
          aria-label="Previous member"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Right arrow */}
        <motion.button
          onClick={() => paginate(1)}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
          style={{
            background: 'rgba(0,13,26,0.65)',
            border    : '1px solid rgba(37,124,163,0.30)',
            color     : '#ffffff',
            cursor    : 'pointer',
          }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(37,124,163,0.25)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,124,163,0.65)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(0,13,26,0.65)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,124,163,0.30)';
          }}
          type="button"
          aria-label="Next member"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Cards track — exact same as original */}
        <div
          className="w-full h-full flex justify-center items-center relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence initial={false} custom={direction}>
            {MEMBERS.map((member, index) => {
              const position  = calculatePosition(index);
              const isCurrent = index === currentIndex;
              if (position === 'hidden' && !isCurrent) return null;

              return (
                <motion.div
                  key={member.id}
                  className="absolute overflow-hidden shadow-2xl cursor-pointer"
                  style={{
                    width       : CARD_W,
                    height      : CARD_H,
                    borderRadius: 20,
                    top         : '50%',
                    left        : '50%',
                    marginLeft  : -CARD_W / 2,
                    marginTop   : -CARD_H / 2,
                    /* ice blue ring on active card */
                    border      : isCurrent
                      ? '1px solid rgba(37,124,163,0.45)'
                      : '1px solid rgba(255,255,255,0.06)',
                    boxShadow   : isCurrent
                      ? '0 0 0 1px rgba(37,124,163,0.20), 0 32px 80px rgba(0,0,0,0.9), 0 0 60px rgba(37,124,163,0.14)'
                      : '0 12px 40px rgba(0,0,0,0.7)',
                  }}
                  initial={getVariantStyles('hidden')}
                  animate={getVariantStyles(position)}
                  exit={getVariantStyles('hidden')}
                  onClick={() => {
                    if (!isCurrent) {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }
                  }}
                >
                  <CardImage member={member} priority={isCurrent} />

                  {/* Ice blue top-line on active card */}
                  {isCurrent && (
                    <div
                      className="absolute top-0 inset-x-0 pointer-events-none"
                      style={{
                        height    : 2,
                        background: 'linear-gradient(90deg, transparent, #257ca3, #7dd3f0, #257ca3, transparent)',
                        zIndex    : 10,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Member name + role — same as original infoPosition="bottom" ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMember.id + '-info'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center mt-10"
          style={{ width: '100%', paddingLeft: 16, paddingRight: 16 }}
        >
          {/* Name — pure white, high contrast on navy bg */}
          <h2
            className="font-bold mb-3 relative inline-block"
            style={{
              fontSize    : 'clamp(1.5rem, 5vw, 2.25rem)',
              color       : '#ffffff',
              textShadow  : '0 2px 20px rgba(0,10,22,0.9)',
            }}
          >
            {currentMember.name}
            {/* Ice blue underline — replaces original white underline */}
            <span
              className="absolute left-0 w-full"
              style={{
                top       : '100%',
                marginTop : 6,
                height    : 2,
                display   : 'block',
                background: 'linear-gradient(90deg, #257ca3, #7dd3f0, #257ca3)',
                borderRadius: 99,
              }}
            />
          </h2>

          {/* Role — bright enough on navy, not washed out */}
          <p
            className="font-medium uppercase tracking-wider"
            style={{
              fontSize    : 'clamp(0.7rem, 2.2vw, 1rem)',
              color       : 'rgba(255,255,255,0.80)',
              marginTop   : 20,
              letterSpacing: '0.18em',
            }}
          >
            {currentMember.role}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* ── Dots — same as original, ice blue active ── */}
      <div className="flex justify-center gap-3 mt-12">
        {MEMBERS.map((_, index) => (
          <motion.button
            key={index}
            type="button"
            aria-label={`Go to ${MEMBERS[index].name}`}
            onClick={() => {
              if (index !== currentIndex) {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }
            }}
            className="rounded-full transition-all duration-300"
            style={{
              width     : index === currentIndex ? 24 : 10,
              height    : 10,
              background: index === currentIndex
                ? 'linear-gradient(90deg, #257ca3, #7dd3f0)'
                : 'rgba(255,255,255,0.22)',
              border     : 'none',
              cursor     : 'pointer',
              padding    : 0,
              transition : 'width 0.35s cubic-bezier(.16,1,.3,1), background 0.3s ease',
              boxShadow  : index === currentIndex ? '0 0 12px rgba(37,124,163,0.55)' : 'none',
            }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
});

/* ─── About Us Root ──────────────────────────────────────────────────────── */
export default function AboutUs() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <section
        ref={ref}
        className="relative overflow-hidden w-full"
        aria-label="About us — Meet the founders"
        style={{
          /* Base: deep navy identical to NeuromotionTechHero */
          background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #0d2d45 0%, #000d1a 55%, #000000 100%)',
        }}
      >

        {/* ══ Aurora blobs — #257ca3 — same as NeuromotionTechHero ══ */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

          {/* Blob 1 — top-left */}
          <div
            className="au-aurora-1 absolute"
            style={{
              width     : '65%',
              height    : '65%',
              top       : '-15%',
              left      : '-15%',
              background: 'radial-gradient(ellipse at center, rgba(37,124,163,0.18) 0%, transparent 70%)',
              borderRadius: '50%',
              filter    : 'blur(48px)',
            }}
          />

          {/* Blob 2 — bottom-right */}
          <div
            className="au-aurora-2 absolute"
            style={{
              width     : '70%',
              height    : '60%',
              bottom    : '-20%',
              right     : '-15%',
              background: 'radial-gradient(ellipse at center, rgba(37,124,163,0.14) 0%, transparent 70%)',
              borderRadius: '50%',
              filter    : 'blur(56px)',
            }}
          />

          {/* Blob 3 — centre accent */}
          <div
            className="au-aurora-3 absolute"
            style={{
              width     : '50%',
              height    : '50%',
              top       : '30%',
              left      : '28%',
              background: 'radial-gradient(ellipse at center, rgba(37,124,163,0.10) 0%, transparent 65%)',
              borderRadius: '50%',
              filter    : 'blur(40px)',
            }}
          />

          {/* Noise grain — same as NeuromotionTechHero */}
          <div
            style={{
              position        : 'absolute',
              inset           : 0,
              backgroundImage : 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
              backgroundSize  : '200px 200px',
              opacity         : 0.028,
              mixBlendMode    : 'overlay',
            }}
          />

          {/* Dot grid — very subtle on the navy base */}
          <div
            style={{
              position       : 'absolute',
              inset          : 0,
              backgroundImage: 'radial-gradient(circle, rgba(125,211,240,0.05) 1px, transparent 1px)',
              backgroundSize : '32px 32px',
            }}
          />

          {/* Top rim edge-light — same as NeuromotionTechHero */}
          <div
            style={{
              position  : 'absolute',
              top       : 0,
              left      : 0,
              right     : 0,
              height    : 1,
              background: 'linear-gradient(90deg, transparent 0%, rgba(37,124,163,0.50) 40%, rgba(125,211,240,0.80) 50%, rgba(37,124,163,0.50) 60%, transparent 100%)',
            }}
          />

          {/* Bottom edge line */}
          <div
            style={{
              position  : 'absolute',
              bottom    : 0,
              left      : 0,
              right     : 0,
              height    : 1,
              background: 'linear-gradient(90deg, transparent, rgba(37,124,163,0.25), transparent)',
            }}
          />
        </div>

        {/* ── Centered content wrapper ── */}
        <div
          className="relative z-10 flex flex-col items-center w-full mx-auto text-center"
          style={{
            maxWidth    : 1200,
            paddingLeft : 'clamp(16px, 5vw, 48px)',
            paddingRight: 'clamp(16px, 5vw, 48px)',
            paddingTop  : 'clamp(64px, 8vw, 100px)',
          }}
        >

          {/* ── Eyebrow badge ── */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <div
              className="flex items-center gap-2 rounded-full"
              style={{
                padding   : '7px 18px',
                /* solid semi-transparent — no backdrop-filter, iOS safe */
                background: 'rgba(0,13,26,0.72)',
                border    : '1px solid rgba(37,124,163,0.35)',
              }}
            >
              <span
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#7dd3f0',
                  display   : 'inline-block',
                  flexShrink: 0,
                  boxShadow : '0 0 8px rgba(37,124,163,0.7)',
                }}
              />
              <span style={{
                fontSize    : 9,
                fontWeight  : 800,
                letterSpacing: '0.28em',
                textTransform: 'uppercase' as const,
                color       : 'rgba(255,255,255,0.75)',
              }}>
                The People Behind It
              </span>
            </div>

            {/* Live dot */}
            <div className="flex items-center gap-2">
              <span
                className="au-blink inline-block rounded-full"
                style={{ width: 7, height: 7, background: '#4ade80', boxShadow: '0 0 10px rgba(74,222,128,.8)' }}
              />
              <span style={{
                fontSize    : 9,
                fontWeight  : 800,
                letterSpacing: '0.22em',
                textTransform: 'uppercase' as const,
                color       : '#4ade80',
              }}>
                3 Founders
              </span>
            </div>
          </motion.div>

          {/* ── Headline ── */}
          <div className="overflow-hidden w-full mb-1">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize    : 'clamp(2.8rem, 8vw, 7rem)',
                fontWeight  : 900,
                lineHeight  : 0.97,
                letterSpacing: '-0.04em',
                color       : '#ffffff',
                textShadow  : '0 4px 32px rgba(0,13,26,0.8)',
                textAlign   : 'center',
              }}
            >
              Meet the
            </motion.h2>
          </div>

          <div className="overflow-hidden w-full mb-8">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.95, delay: 0.21, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize    : 'clamp(2.8rem, 8vw, 7rem)',
                fontWeight  : 900,
                lineHeight  : 0.97,
                letterSpacing: '-0.04em',
                /* Ice blue shimmer on the fade word */
                background  : 'linear-gradient(135deg, #ffffff 0%, #7dd3f0 50%, rgba(37,124,163,0.70) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor : 'transparent',
                backgroundClip      : 'text',
                textAlign   : 'center',
              }}
            >
              Founders
            </motion.h2>
          </div>

          {/* ── Divider ── */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-7"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(37,124,163,0.55))' }}
              initial={{ width: 0 }}
              animate={inView ? { width: 80 } : {}}
              transition={{ delay: 0.55, duration: 0.7 }}
            />
            {[0, 1, 2].map((j) => (
              <div key={j} className="rounded-full" style={{
                width     : j === 1 ? 7 : 4,
                height    : j === 1 ? 7 : 4,
                background: j === 1 ? '#7dd3f0' : 'rgba(37,124,163,0.45)',
                boxShadow : j === 1 ? '0 0 8px rgba(37,124,163,0.6)' : 'none',
              }} />
            ))}
            <motion.div
              className="h-px"
              style={{ background: 'linear-gradient(90deg, rgba(37,124,163,0.55), transparent)' }}
              initial={{ width: 0 }}
              animate={inView ? { width: 80 } : {}}
              transition={{ delay: 0.55, duration: 0.7 }}
            />
          </motion.div>

          {/* ── Sub-copy — strong readable on navy ── */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.38, duration: 0.65 }}
            style={{
              fontSize  : 'clamp(14px, 1.6vw, 17px)',
              color     : 'rgba(255,255,255,0.72)',
              lineHeight: 1.82,
              maxWidth  : 490,
              fontWeight: 400,
              textAlign : 'center',
            }}
          >
            A small, obsessive team on one mission — build digital products that
            outperform, outlast and outshine every competitor in your market.
          </motion.p>
        </div>

        {/* ── Carousel — full width, centered ── */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.32, duration: 0.9 }}
        >
          <TeamCarousel />
        </motion.div>

        {/* ── Footer strip ── */}
        <div
          className="relative z-10 w-full mx-auto flex flex-col items-center"
          style={{
            maxWidth    : 1200,
            paddingLeft : 'clamp(16px, 5vw, 48px)',
            paddingRight: 'clamp(16px, 5vw, 48px)',
            paddingBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 w-full"
            style={{ borderTop: '1px solid rgba(37,124,163,0.20)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.0 }}
          >
            {['UK & Global Clients', 'AI-Powered Studio', 'Full-Service Digital'].map((t, i) => (
              <React.Fragment key={t}>
                {i > 0 && (
                  <span
                    className="hidden sm:block rounded-full"
                    style={{ width: 3, height: 3, background: 'rgba(37,124,163,0.45)' }}
                    aria-hidden="true"
                  />
                )}
                <span style={{
                  fontSize    : 9,
                  fontWeight  : 800,
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase' as const,
                  color       : 'rgba(255,255,255,0.38)',
                }}>
                  {t}
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}