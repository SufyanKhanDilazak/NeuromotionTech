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
} from "lucide-react";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const services: Service[] = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Lightning-fast applications",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Interfaces that convert",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Smart automation",
    color: "from-orange-400 to-red-500",
  },
  {
    icon: Rocket,
    title: "Digital Marketing",
    description: "Data-driven growth",
    color: "from-green-400 to-emerald-500",
  },
];

// Optimized service card with minimal re-renders
const ServiceCard = React.memo(({ service, index, prefersReducedMotion }: { 
  service: Service; 
  index: number;
  prefersReducedMotion: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
    className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-lg transition-all duration-300 hover:border-gray-300 hover:bg-white/90 hover:shadow-xl lg:col-span-3 lg:p-8"
  >
    <div className="relative z-10 flex flex-col items-center text-center">
      <motion.div
        className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} shadow-lg lg:h-20 lg:w-20`}
        whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
        transition={{ duration: 0.2 }}
      >
        {React.createElement(service.icon, {
          className: "h-8 w-8 text-white lg:h-10 lg:w-10",
        })}
      </motion.div>

      <h4 className="mb-2 text-lg font-bold text-gray-900 lg:text-xl">
        {service.title}
      </h4>
      <p className="text-sm text-gray-600">
        {service.description}
      </p>
    </div>

    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
  </motion.div>
));

ServiceCard.displayName = "ServiceCard";

export function Hero() {
  const statsRef = React.useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Orb Background - Optimized Mobile Positioning */}
      {/* Mobile: Top center behind hero card | Desktop: Full screen center */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Mobile Orb - Top positioned */}
        <div className="absolute left-0 right-0 top-[30%] flex h-[600px] items-start justify-center pt-8 lg:hidden">
          <div className="relative h-full w-full max-w-[500px]">
            <Orb
              hoverIntensity={1.5}
              rotateOnHover={false}
              hue={190}
              forceHoverState={false}
              backgroundColor="#ffffff"
            />
          </div>
        </div>
        
        {/* Desktop Orb - Full center */}
        <div className="hidden lg:flex lg:h-full lg:w-full lg:items-center lg:justify-center">
          <div className="relative h-full w-full max-w-[1400px]">
            <Orb
              hoverIntensity={2}
              rotateOnHover
              hue={190}
              forceHoverState={false}
              backgroundColor="#ffffff"
            />
          </div>
        </div>
      </div>

      {/* Simplified Gradient Orbs - No blur for performance */}
      <div className="pointer-events-none absolute left-[10%] top-[15%] z-0 h-[400px] w-[400px] rounded-full bg-cyan-500/8 opacity-70" />
      <div className="pointer-events-none absolute right-[10%] bottom-[15%] z-0 h-[350px] w-[350px] rounded-full bg-purple-500/6 opacity-70" />
      <div className="pointer-events-none absolute left-[50%] top-[35%] z-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-500/6 opacity-70" />

      {/* Main Content */}
      <div className="relative z-10 w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1600px]">
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto] lg:gap-8">
            
            {/* Row 1: Brand Hero - Full Width Mobile, Spans columns on Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/90 p-8 shadow-xl lg:col-span-8 lg:row-span-2 lg:p-12"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              }}
            >
              <div className="relative z-10">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mb-6 flex justify-center lg:mb-8"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/15 px-4 py-2">
                    <Sparkles className="h-4 w-4 text-cyan-600" />
                    <span className="text-xs font-bold text-cyan-700 lg:text-sm">
                      #1 Digital Innovation Lab
                    </span>
                  </div>
                </motion.div>

                {/* Brand Name */}
                <div className="mb-6 text-center lg:mb-8">
                  <div className="mb-3 flex flex-col items-center justify-center gap-2 lg:flex-row lg:gap-4">
                    <div className="text-4xl font-black leading-none tracking-tighter sm:text-5xl lg:text-7xl xl:text-8xl">
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
                    <div className="text-4xl font-black leading-none tracking-tighter sm:text-5xl lg:text-7xl xl:text-8xl">
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
                    className="mx-auto mb-4 h-1 w-32 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 lg:w-48"
                  />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-base font-semibold text-gray-700 sm:text-lg lg:text-xl"
                  >
                    Transforming Ideas into Digital Excellence
                  </motion.p>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mb-8 text-center text-sm leading-relaxed text-gray-600 sm:text-base lg:mb-10 lg:text-lg"
                >
                  We craft cutting-edge digital experiences that push boundaries and redefine what's possible in the modern web.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                  <Link
                    href="/contact"
                    className="group/btn relative w-full max-w-xs overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-[2px] shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] sm:w-auto"
                  >
                    <div className="relative rounded-[10px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-8 py-4">
                      <span className="flex items-center justify-center gap-2 text-base font-black text-white">
                        Start Your Project
                        <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/portfolio"
                    className="group/btn w-full max-w-xs rounded-xl border-2 border-gray-300 bg-gray-50 px-8 py-4 text-center shadow-md transition-all duration-200 hover:scale-[1.02] hover:border-cyan-400 hover:bg-gray-100 hover:shadow-lg active:scale-[0.98] sm:w-auto"
                  >
                    <span className="flex items-center justify-center gap-2 text-base font-bold text-gray-900">
                      View Work
                      <Rocket className="h-5 w-5 text-cyan-600 transition-transform duration-200 group-hover/btn:-translate-y-0.5" />
                    </span>
                  </Link>
                </motion.div>
              </div>

              {/* Subtle gradient overlay */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent opacity-50" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent opacity-50" />
            </motion.div>

            {/* Row 1: Stats Card - Right Column */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-xl lg:col-span-4 lg:row-span-1 lg:p-8"
              style={{ 
                background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(255,255,255,0.9) 100%)',
              }}
            >
              <div className="relative z-10">
                <h3 className="mb-6 text-center text-lg font-bold text-gray-900 lg:text-xl">
                  Impact Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="mb-1 text-3xl font-black lg:text-4xl">
                      {isStatsInView ? (
                        <CountUp
                          start={0}
                          end={500}
                          duration={2}
                          suffix="+"
                          enableScrollSpy={false}
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
                        />
                      ) : (
                        <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">0+</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-gray-600 lg:text-sm">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-3xl font-black lg:text-4xl">
                      {isStatsInView ? (
                        <CountUp
                          start={0}
                          end={98}
                          duration={2}
                          suffix="%"
                          enableScrollSpy={false}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                        />
                      ) : (
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">0%</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-gray-600 lg:text-sm">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-3xl font-black lg:text-4xl">
                      {isStatsInView ? (
                        <CountUp
                          start={0}
                          end={50}
                          duration={2}
                          suffix="+"
                          enableScrollSpy={false}
                          className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                        />
                      ) : (
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">0+</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-gray-600 lg:text-sm">Experts</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-3xl font-black text-gray-900 lg:text-4xl">24/7</div>
                    <div className="text-xs font-semibold text-gray-600 lg:text-sm">Support</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Row 2: Trust Badge */}
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
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="mb-2 text-2xl font-black text-gray-900 lg:text-3xl">500+ Companies</div>
                <div className="text-sm font-semibold text-gray-600">Trust Our Solutions</div>
              </div>
            </motion.div>

            {/* Row 2-3: Services Grid */}
            {services.map((service, idx) => (
              <ServiceCard 
                key={service.title} 
                service={service} 
                index={idx}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}