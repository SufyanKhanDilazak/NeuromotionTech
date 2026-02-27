"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import Shuffle from "../../components/Shuffle";
import Orb from "@/components/Orb";
import {
  ArrowRight,
  Code2,
  Palette,
  Brain,
  Rocket,
  Star,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  accent: string;
}

const services: Service[] = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Lightning-fast applications",
    color: "from-cyan-400 to-blue-500",
    accent: "#06b6d4",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Smart automation",
    color: "from-orange-400 to-red-500",
    accent: "#f97316",
  },
  {
    icon: Rocket,
    title: "Digital Marketing",
    description: "Data-driven growth",
    color: "from-green-400 to-emerald-500",
    accent: "#34d399",
  },
];

// ── Mobile horizontal strip ──
const MobileServiceCard = React.memo(({ service, index }: {
  service: Service;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: 0.5 + index * 0.07 }}
    className="group flex items-center gap-3.5 rounded-2xl border border-gray-200 bg-white/90 px-4 py-3.5 shadow-md transition-all duration-200 hover:shadow-lg"
    style={{ boxShadow: `0 2px 14px ${service.accent}1a` }}
  >
    {/* Icon */}
    <div
      className={`flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} shadow-md`}
    >
      {React.createElement(service.icon, { className: "h-5 w-5 text-white" })}
    </div>

    {/* Text */}
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-bold text-gray-900 leading-tight">{service.title}</h4>
      <p className="text-xs text-gray-500 mt-0.5">{service.description}</p>
    </div>

    {/* Arrow */}
    <div
      className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full"
      style={{ background: `${service.accent}18` }}
    >
      <ChevronRight className="w-3.5 h-3.5" style={{ color: service.accent }} />
    </div>

    {/* Hover wash */}
    <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.03]`} />
  </motion.div>
));
MobileServiceCard.displayName = "MobileServiceCard";

// ── Desktop centered vertical card (original layout, tightened sizing) ──
const DesktopServiceCard = React.memo(({ service, index, prefersReducedMotion }: {
  service: Service;
  index: number;
  prefersReducedMotion: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
    className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-lg transition-all duration-300 hover:border-gray-300 hover:bg-white/90 hover:shadow-xl lg:col-span-4 lg:p-8"
  >
    <div className="relative z-10 flex flex-col items-center text-center">
      <motion.div
        className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} shadow-lg lg:h-16 lg:w-16`}
        whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
        transition={{ duration: 0.2 }}
      >
        {React.createElement(service.icon, {
          className: "h-7 w-7 text-white lg:h-8 lg:w-8",
        })}
      </motion.div>

      <h4 className="mb-1.5 text-base font-bold text-gray-900 lg:text-lg">
        {service.title}
      </h4>
      <p className="text-sm text-gray-600">{service.description}</p>
    </div>

    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
  </motion.div>
));
DesktopServiceCard.displayName = "DesktopServiceCard";

export function Hero() {
  const statsRef = React.useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">

      {/* Orb Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Mobile Orb */}
        <div className="absolute left-0 right-0 top-[30%] flex h-[600px] items-start justify-center pt-8 lg:hidden">
          <div className="relative h-full w-full max-w-[500px]">
            <Orb hoverIntensity={1.5} rotateOnHover={false} hue={190} forceHoverState={false} backgroundColor="#ffffff" />
          </div>
        </div>
        {/* Desktop Orb */}
        <div className="hidden lg:flex lg:h-full lg:w-full lg:items-center lg:justify-center">
          <div className="relative h-full w-full max-w-[1400px]">
            <Orb hoverIntensity={2} rotateOnHover hue={190} forceHoverState={false} backgroundColor="#ffffff" />
          </div>
        </div>
      </div>

      {/* Gradient Orbs */}
      <div className="pointer-events-none absolute left-[10%] top-[15%] z-0 h-[400px] w-[400px] rounded-full bg-cyan-500/8 opacity-70" />
      <div className="pointer-events-none absolute right-[10%] bottom-[15%] z-0 h-[350px] w-[350px] rounded-full bg-purple-500/6 opacity-70" />
      <div className="pointer-events-none absolute left-[50%] top-[35%] z-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-500/6 opacity-70" />

      {/* Main Content */}
      <div className="relative z-10 w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1400px]">

          {/* Bento Grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-6">

            {/* ── Hero Banner ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 p-6 shadow-2xl lg:col-span-8 lg:row-span-2 lg:p-10"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.99) 0%, rgba(240,249,255,0.95) 50%, rgba(245,243,255,0.97) 100%)',
                boxShadow: '0 0 0 1px rgba(6,182,212,0.08), 0 24px 64px rgba(6,182,212,0.1), 0 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              {/* Shimmer top border */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden rounded-t-3xl">
                <motion.div
                  className="h-full w-1/3"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.8), transparent)' }}
                  animate={{ x: ['-100%', '400%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.5 }}
                />
              </div>

              {/* Subtle dot grid */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden opacity-[0.025]">
                <svg className="w-full h-full">
                  <defs>
                    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="#0e7490" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>

              {/* Floating particles */}
              {[
                { top: '12%',  left: '6%',   color: 'rgba(6,182,212,0.65)',  size: 5 },
                { top: '72%',  left: '10%',  color: 'rgba(168,85,247,0.55)', size: 3.5 },
                { top: '18%',  right: '8%',  color: 'rgba(59,130,246,0.6)',  size: 4.5 },
                { bottom: '20%', right: '12%', color: 'rgba(6,182,212,0.45)', size: 3 },
              ].map((p, i) => (
                <motion.div key={i} aria-hidden
                  className="absolute rounded-full pointer-events-none"
                  style={{ width: p.size, height: p.size, background: p.color, ...p } as React.CSSProperties}
                  animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
                />
              ))}

              <div className="relative z-10">

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mb-5 flex justify-center lg:mb-7"
                >
                  <div className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-300/50 bg-gradient-to-r from-cyan-50 to-blue-50 px-4 py-1.5"
                    style={{ boxShadow: '0 2px 12px rgba(6,182,212,0.15), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}>
                      <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                    </motion.div>
                    <span className="text-xs font-black tracking-wider text-cyan-700">
                      #1 Digital Innovation Lab
                    </span>
                    {/* Badge shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3.5 }}
                    />
                  </div>
                </motion.div>

                {/* Brand Name */}
                <div className="mb-5 text-center lg:mb-7">
                  <div className="mb-3 flex flex-col items-center justify-center gap-1 lg:flex-row lg:gap-3">
                    {/* NEUROMOTION — slightly smaller on desktop */}
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
                    {/* TECH */}
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

                  {/* Animated Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="mx-auto mb-3 h-1 w-28 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 lg:w-40"
                  />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-sm font-semibold text-gray-700 sm:text-base lg:text-lg"
                  >
                    Transforming Ideas into Digital Excellence
                  </motion.p>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mb-7 text-center text-sm leading-relaxed text-gray-600 sm:text-base lg:mb-8 lg:text-base"
                >
                  We craft cutting-edge digital experiences that push boundaries and redefine what's possible in the modern web.
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                  <Link
                    href="/info/contact"
                    className="group/btn relative w-full max-w-xs overflow-hidden rounded-xl p-[1.5px] shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] sm:w-auto"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)', boxShadow: '0 8px 28px rgba(6,182,212,0.35)' }}
                  >
                    <div className="relative rounded-[10px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-7 py-3.5 overflow-hidden">
                      {/* Button shimmer */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                      />
                      <span className="relative flex items-center justify-center gap-2 text-sm font-black text-white lg:text-base">
                        Start Your Project
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </span>
                    </div>
                  </Link>
                </motion.div>

                {/* Social proof */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-5 flex items-center justify-center gap-3"
                >
                  <div className="flex -space-x-2">
                    {['bg-cyan-400','bg-blue-400','bg-purple-400','bg-pink-400'].map((c, i) => (
                      <div key={i} className={`h-6 w-6 rounded-full border-2 border-white ${c} shadow-sm`} />
                    ))}
                  </div>
                  <div className="h-3 w-px bg-gray-200" />
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-400">500+ happy clients</span>
                </motion.div>
              </div>

              {/* Corner glows */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-cyan-400/16 to-transparent blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-gradient-to-tr from-purple-400/12 to-transparent blur-3xl" />
            </motion.div>

            {/* ── Stats Card ── */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-xl lg:col-span-4 lg:row-span-1"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(255,255,255,0.9) 100%)',
              }}
            >
              <div className="relative z-10">
                <h3 className="mb-5 text-center text-base font-bold text-gray-900 lg:text-lg">
                  Impact Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="mb-1 text-2xl font-black lg:text-3xl">
                      {isStatsInView ? (
                        <CountUp start={0} end={500} duration={2} suffix="+" enableScrollSpy={false}
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent" />
                      ) : (
                        <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">0+</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-gray-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-2xl font-black lg:text-3xl">
                      {isStatsInView ? (
                        <CountUp start={0} end={98} duration={2} suffix="%" enableScrollSpy={false}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" />
                      ) : (
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">0%</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-gray-600">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-2xl font-black lg:text-3xl">
                      {isStatsInView ? (
                        <CountUp start={0} end={50} duration={2} suffix="+" enableScrollSpy={false}
                          className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent" />
                      ) : (
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">0+</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-gray-600">Experts</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-2xl font-black text-gray-900 lg:text-3xl">24/7</div>
                    <div className="text-xs font-semibold text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Trust Badge ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-xl lg:col-span-4 lg:row-span-1"
              style={{
                background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(255,255,255,0.9) 100%)',
              }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-3 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="mb-1.5 text-2xl font-black text-gray-900 lg:text-3xl">500+ Companies</div>
                <div className="text-xs font-semibold text-gray-500">Trust Our Solutions</div>
              </div>
            </motion.div>

            {/* ── Services ──
                mobile: vertical flex column of horizontal strips (via wrapper)
                desktop: bento col-span-4 each, original centered layout        */}

            {/* Mobile — 3 icons in one horizontal row, no text */}
            <div className="flex items-center justify-center gap-4 lg:hidden">
              {services.map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.5 + idx * 0.07 }}
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} shadow-lg`}
                >
                  {React.createElement(service.icon, { className: "h-7 w-7 text-white" })}
                </motion.div>
              ))}
            </div>

            {/* Desktop cards — hidden on mobile, grid children on lg+ */}
            <div className="hidden lg:contents">
              {services.map((service, idx) => (
                <DesktopServiceCard
                  key={service.title}
                  service={service}
                  index={idx}
                  prefersReducedMotion={!!prefersReducedMotion}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}