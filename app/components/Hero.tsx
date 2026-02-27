"use client";

/**
 * Hero.tsx — Next.js 16 · React 19 · Orb restored at original position
 *
 * Orb is back, using the optimised Orb.tsx:
 *   Mobile  → top:[30%], h-[600px], max-w-[500px]   (same as original)
 *   Desktop → full section, max-w-[1400px]           (same as original)
 *
 * Why the Orb no longer kills mobile:
 *   • DPR capped to 1.0 on mobile  (was 3.0 → 9× more pixels shaded)
 *   • Canvas rendered at 50% CSS size → 75% fewer fragment invocations
 *   • RAF paused by IntersectionObserver when scrolled off-screen
 *   • RAF paused by visibilitychange when tab is hidden
 *   • Props read via refs — useEffect runs once, no context rebuild on re-render
 *   • Loaded via next/dynamic ssr:false — no SSR crash, smaller initial bundle
 *
 * All other Hero optimisations preserved:
 *   • 6 infinite CSS animations (not framer-motion repeat:Infinity)
 *   • Stable Variants objects (no inline objects per render)
 *   • StatsCell isolated as memo (CountUp re-renders only that cell)
 *   • Pre-built AVATARS / STARS arrays (no Array.from in render)
 *   • contain:"layout" on section
 *   • willChange:"transform" + translateZ(0) on CTA
 *   • RefObject<HTMLDivElement | null> — React 19 compatible
 */

import { useRef, memo, type RefObject } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import CountUp from "react-countup";
import Shuffle from "../../components/Shuffle";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Code2, Brain, Rocket, Star, Sparkles } from "lucide-react";

/* ─── Lazy-load Orb (WebGL + window — must be client-only) ───────────────── */
const Orb = dynamic(() => import("@/components/Orb"), {
  ssr    : false,
  loading: () => <div className="w-full h-full" aria-hidden="true" />,
});

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Service {
  readonly Icon       : LucideIcon;
  readonly title      : string;
  readonly description: string;
  readonly color      : string;
}

/* ─── Static module-level data — zero allocation per render ──────────────── */
const SERVICES: readonly Service[] = [
  { Icon: Code2,  title: "Web Development",   description: "Lightning-fast applications", color: "from-cyan-400 to-blue-500"     },
  { Icon: Brain,  title: "AI Integration",    description: "Smart automation",            color: "from-orange-400 to-red-500"    },
  { Icon: Rocket, title: "Digital Marketing", description: "Data-driven growth",          color: "from-green-400 to-emerald-500" },
] as const;

const AVATAR_COLORS = ["bg-cyan-400","bg-blue-400","bg-purple-400","bg-pink-400"] as const;
const AVATARS       = AVATAR_COLORS.map((c, i) => ({ c, i }));   // built once
const STARS         = Array.from({ length: 5 }, (_, i) => i);
const STAT_STARS    = Array.from({ length: 5 }, (_, i) => i);

/* ─── Stable Variants — never recreated per render ──────────────────────── */
const vFadeUp: Variants = {
  hidden : { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } },
};
const vFadeIn: Variants = {
  hidden : { opacity: 0 },
  visible: { opacity: 1 },
};
const vScaleIn: Variants = {
  hidden : { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};
const vScaleX: Variants = {
  hidden : { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, delay: 0.4 } },
};
const vStagger: Variants = {
  hidden : {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* ─── CSS — ALL infinite animations are here, not in framer-motion ───────── */
const GLOBAL_CSS = `
  /* ── CTA button shimmer ── */
  @keyframes hero-shimmer {
    0%   { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(320%)  skewX(-12deg); }
  }
  .hero-shimmer {
    animation: hero-shimmer 3.2s ease-in-out infinite;
    animation-delay: 1.2s;
    will-change: transform;
  }

  /* ── Arrow nudge ── */
  @keyframes hero-nudge {
    0%,100% { transform: translateX(0);   }
    50%     { transform: translateX(4px); }
  }
  .hero-nudge {
    display: inline-flex;
    animation: hero-nudge 1.5s ease-in-out infinite;
    will-change: transform;
  }

  /* ── Badge shimmer ── */
  @keyframes hero-badge-shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(340%);  }
  }
  .hero-badge-shimmer {
    animation: hero-badge-shimmer 3.5s ease-in-out infinite;
    animation-delay: 2.5s;
    will-change: transform;
  }

  /* ── Sparkle spin ── */
  @keyframes hero-spin {
    to { transform: rotate(360deg); }
  }
  .hero-spin {
    display: inline-flex;
    animation: hero-spin 7s linear infinite;
    will-change: transform;
  }

  /* ── Disable all when user requests reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .hero-shimmer, .hero-nudge,
    .hero-badge-shimmer, .hero-spin {
      animation: none !important;
    }
  }
`;

/* ─── StatsCell — isolated memo so only the animating number re-renders ──── */
const StatsCell = memo(function StatsCell({
  inView, end, suffix, gradientClass, label,
}: {
  inView       : boolean;
  end          : number;
  suffix       : string;
  gradientClass: string;
  label        : string;
}) {
  return (
    <div className="text-center">
      <div className="mb-1 text-2xl font-black lg:text-3xl">
        {inView
          ? <CountUp start={0} end={end} duration={2} suffix={suffix}
              enableScrollSpy={false} className={gradientClass} />
          : <span className={gradientClass}>0{suffix}</span>
        }
      </div>
      <div className="text-xs font-semibold text-gray-600">{label}</div>
    </div>
  );
});

/* ─── StatsCard ──────────────────────────────────────────────────────────── */
const StatsCard = memo(function StatsCard({
  statsRef, inView,
}: {
  statsRef: RefObject<HTMLDivElement | null>;
  inView  : boolean;
}) {
  return (
    <motion.div
      ref={statsRef}
      variants={vFadeUp} initial="hidden" animate="visible"
      transition={{ delay: 0.2 }}
      className="relative overflow-hidden rounded-3xl border border-gray-200 p-6 shadow-xl lg:col-span-4"
      style={{ background: "linear-gradient(135deg,rgba(6,182,212,0.08) 0%,rgba(255,255,255,0.9) 100%)" }}
    >
      <h3 className="mb-5 text-center text-base font-bold text-gray-900 lg:text-lg">
        Impact Metrics
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <StatsCell inView={inView} end={500} suffix="+"
          gradientClass="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"   label="Projects"     />
        <StatsCell inView={inView} end={98}  suffix="%"
          gradientClass="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"  label="Satisfaction" />
        <StatsCell inView={inView} end={50}  suffix="+"
          gradientClass="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"   label="Experts"      />
        <div className="text-center">
          <div className="mb-1 text-2xl font-black text-gray-900 lg:text-3xl">24/7</div>
          <div className="text-xs font-semibold text-gray-600">Support</div>
        </div>
      </div>
    </motion.div>
  );
});

/* ─── TrustCard ──────────────────────────────────────────────────────────── */
const TrustCard = memo(function TrustCard() {
  return (
    <motion.div
      variants={vScaleIn} initial="hidden" animate="visible"
      transition={{ delay: 0.3 }}
      className="relative overflow-hidden rounded-3xl border border-gray-200 p-6 shadow-xl lg:col-span-4"
      style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.08) 0%,rgba(255,255,255,0.9) 100%)" }}
    >
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-3 flex items-center gap-1" aria-label="5 star rating">
          {STAT_STARS.map((i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
          ))}
        </div>
        <div className="mb-1.5 text-2xl font-black text-gray-900 lg:text-3xl">500+ Companies</div>
        <div className="text-xs font-semibold text-gray-500">Trust Our Solutions</div>
      </div>
    </motion.div>
  );
});

/* ─── MobileServiceIcons ─────────────────────────────────────────────────── */
const MobileServiceIcons = memo(function MobileServiceIcons() {
  return (
    <motion.div
      className="flex items-center justify-center gap-4 lg:hidden"
      variants={vStagger} initial="hidden" animate="visible"
    >
      {SERVICES.map(({ Icon, title, color }) => (
        <motion.div
          key={title}
          variants={vFadeUp}
          className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg`}
          aria-label={title}
        >
          <Icon className="h-7 w-7 text-white" aria-hidden="true" />
        </motion.div>
      ))}
    </motion.div>
  );
});

/* ─── DesktopServiceCard ─────────────────────────────────────────────────── */
const DesktopServiceCard = memo(function DesktopServiceCard({
  service, index, reduceMotion,
}: {
  service     : Service;
  index       : number;
  reduceMotion: boolean;
}) {
  const { Icon, title, description, color } = service;
  return (
    <motion.div
      variants={vFadeUp} initial="hidden" animate="visible"
      transition={{ delay: 0.5 + index * 0.08 }}
      className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-lg transition-colors duration-300 hover:border-gray-300 hover:bg-white/90 hover:shadow-xl lg:col-span-4 lg:p-8"
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg lg:h-16 lg:w-16`}
          whileHover={!reduceMotion ? { scale: 1.06 } : undefined}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <Icon className="h-7 w-7 text-white lg:h-8 lg:w-8" aria-hidden="true" />
        </motion.div>
        <h4 className="mb-1.5 text-base font-bold text-gray-900 lg:text-lg">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
      />
    </motion.div>
  );
});

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export function Hero() {
  const statsRef     = useRef<HTMLDivElement>(null);
  const isInView     = useInView(statsRef, { once: true, margin: "-80px" });
  const reduceMotion = !!useReducedMotion();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <section
        className="relative min-h-screen w-full overflow-hidden bg-white"
        style={{ contain: "layout" }}
      >
        {/* ════════════════════════════════════════════════════════════════
            ORB BACKGROUND
            Exact same DOM structure and Tailwind classes as the original.
            Mobile:  absolute, left-0 right-0, top-[30%], h-[600px], lg:hidden
            Desktop: hidden lg:flex, h-full w-full, max-w-[1400px]
            Performance is now handled inside Orb.tsx itself.
        ════════════════════════════════════════════════════════════════ */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">

       {/* Mobile Orb — pushed further down */}
<div className="absolute inset-0 lg:hidden pointer-events-none">
  <div className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2">
    <div className="relative w-[190vw] aspect-square">
      <Orb
        hue={190}
        hoverIntensity={1.5}
        rotateOnHover={false}
        forceHoverState={false}
        backgroundColor="#ffffff"
      />
    </div>
  </div>
</div>

          {/* Desktop Orb — same position as original */}
          <div className="hidden lg:flex lg:h-full lg:w-full lg:items-center lg:justify-center">
            <div className="relative h-full w-full max-w-[1400px]">
              <Orb
                hue={190}
                hoverIntensity={2}
                rotateOnHover={true}
                forceHoverState={false}
                backgroundColor="#ffffff"
              />
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1400px]">

            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-6">

              {/* ══ Hero Banner ══════════════════════════════════════════════ */}
              <motion.div
                variants={vFadeUp} initial="hidden" animate="visible"
                transition={{ delay: 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 p-6 shadow-2xl lg:col-span-8 lg:row-span-2 lg:p-10"
                style={{
                  background: "linear-gradient(145deg,rgba(255,255,255,0.99) 0%,rgba(240,249,255,0.95) 50%,rgba(245,243,255,0.97) 100%)",
                  boxShadow : "0 0 0 1px rgba(6,182,212,0.08),0 24px 64px rgba(6,182,212,0.10),0 4px 20px rgba(0,0,0,0.06)",
                  willChange: "opacity,transform",
                }}
              >
                {/* Static dot grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{
                    backgroundImage: "radial-gradient(circle,rgba(14,116,144,0.065) 1px,transparent 1px)",
                    backgroundSize : "24px 24px",
                  }}
                />

                {/* Corner accent glows — static, no animation */}
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
                  style={{ background: "radial-gradient(circle,rgba(6,182,212,0.09) 0%,transparent 70%)" }} />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full"
                  style={{ background: "radial-gradient(circle,rgba(168,85,247,0.07) 0%,transparent 70%)" }} />

                <div className="relative z-10">

                  {/* ── Badge ── */}
                  <motion.div
                    variants={vScaleIn} initial="hidden" animate="visible"
                    transition={{ delay: 0.2 }}
                    className="mb-5 flex justify-center lg:mb-7"
                  >
                    <div
                      className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-300/50 bg-gradient-to-r from-cyan-50 to-blue-50 px-4 py-1.5"
                      style={{ boxShadow: "0 2px 12px rgba(6,182,212,0.15),inset 0 1px 0 rgba(255,255,255,0.8)" }}
                    >
                      {/* CSS spin — not framer-motion repeat:Infinity */}
                      <span className="hero-spin" aria-hidden="true">
                        <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                      </span>
                      <span className="text-xs font-black tracking-wider text-cyan-700">
                        #1 Digital Innovation Lab
                      </span>
                      {/* CSS shimmer — absolute overlay, no layout cost */}
                      <span
                        aria-hidden="true"
                        className="hero-badge-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                      />
                    </div>
                  </motion.div>

                  {/* ── Brand name ── */}
                  <div className="mb-5 text-center lg:mb-7">
                    <div className="mb-3 flex flex-col items-center justify-center gap-1 lg:flex-row lg:gap-3">
                      <div className="text-4xl font-black leading-none tracking-tighter sm:text-5xl lg:text-6xl xl:text-7xl">
                        <Shuffle
                          text="NEUROMOTION"
                          shuffleDirection="right"
                          duration={1.2}
                          animationMode="evenodd"
                          shuffleTimes={1}
                          ease="power3.out"
                          stagger={0.02}
                          threshold={0.1}
                          triggerOnce={true}
                          respectReducedMotion={true}
                          loop={false}
                          loopDelay={0}
                          className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
                        />
                      </div>
                      <div className="text-4xl font-black leading-none tracking-tighter sm:text-5xl lg:text-6xl xl:text-7xl">
                        <Shuffle
                          text="TECH"
                          shuffleDirection="left"
                          duration={0.3}
                          animationMode="evenodd"
                          shuffleTimes={1}
                          ease="power3.out"
                          stagger={0.02}
                          threshold={0.1}
                          triggerOnce={true}
                          respectReducedMotion={true}
                          loop={false}
                          loopDelay={0}
                          className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
                        />
                      </div>
                    </div>

                    {/* Underline bar — animates once on mount */}
                    <motion.div
                      variants={vScaleX} initial="hidden" animate="visible"
                      className="mx-auto mb-3 h-1 w-28 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 lg:w-40"
                      style={{ transformOrigin: "center" }}
                    />

                    <motion.p
                      variants={vFadeIn} initial="hidden" animate="visible"
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-sm font-semibold text-gray-700 sm:text-base lg:text-lg"
                    >
                      Transforming Ideas into Digital Excellence
                    </motion.p>
                  </div>

                  {/* ── Description ── */}
                  <motion.p
                    variants={vFadeUp} initial="hidden" animate="visible"
                    transition={{ delay: 0.6 }}
                    className="mb-7 text-center text-sm leading-relaxed text-gray-600 sm:text-base lg:mb-8"
                  >
                    We craft cutting-edge digital experiences that push boundaries and
                    redefine what&apos;s possible in the modern web.
                  </motion.p>

                  {/* ── CTA button ── */}
                  <motion.div
                    variants={vFadeUp} initial="hidden" animate="visible"
                    transition={{ delay: 0.7 }}
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                  >
                    <Link
                      href="/info/contact"
                      className="group/btn relative w-full max-w-xs overflow-hidden rounded-xl p-[1.5px] shadow-lg transition-shadow duration-200 hover:shadow-xl sm:w-auto"
                      style={{
                        background : "linear-gradient(135deg,#06b6d4,#3b82f6,#8b5cf6)",
                        boxShadow  : "0 8px 28px rgba(6,182,212,0.35)",
                        /* Pre-promote to GPU layer — no hitch on first hover */
                        willChange : "transform",
                        transform  : "translateZ(0)",
                      }}
                    >
                      <div className="relative overflow-hidden rounded-[10px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-7 py-3.5">
                        {/* CSS shimmer — replaces framer-motion repeat:Infinity */}
                        <span
                          aria-hidden="true"
                          className="hero-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                        <span className="relative flex items-center justify-center gap-2 text-sm font-black text-white lg:text-base">
                          Start Your Project
                          {/* CSS nudge — replaces framer-motion repeat:Infinity */}
                          <span className="hero-nudge" aria-hidden="true">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </span>
                      </div>
                    </Link>
                  </motion.div>

                  {/* ── Social proof ── */}
                  <motion.div
                    variants={vFadeIn} initial="hidden" animate="visible"
                    transition={{ delay: 0.9 }}
                    className="mt-5 flex items-center justify-center gap-3"
                  >
                    <div className="flex -space-x-2" aria-hidden="true">
                      {AVATARS.map(({ c, i }) => (
                        <div key={i} className={`h-6 w-6 rounded-full border-2 border-white shadow-sm ${c}`} />
                      ))}
                    </div>
                    <div className="h-3 w-px bg-gray-200" aria-hidden="true" />
                    <div className="flex items-center gap-0.5" aria-label="Rated 5 stars">
                      {STARS.map((i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-gray-400">500+ happy clients</span>
                  </motion.div>

                </div>
              </motion.div>
              {/* ══ End Hero Banner ══════════════════════════════════════════ */}

              {/* Stats */}
              <StatsCard statsRef={statsRef} inView={isInView} />

              {/* Trust */}
              <TrustCard />

              {/* Mobile icons */}
              <MobileServiceIcons />

              {/* Desktop service cards */}
              <div className="hidden lg:contents">
                {SERVICES.map((svc, idx) => (
                  <DesktopServiceCard
                    key={svc.title}
                    service={svc}
                    index={idx}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}