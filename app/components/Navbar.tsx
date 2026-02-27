"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Menu } from "lucide-react";
import { cn } from "../../lib/utils";

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface MorphingNavigationProps {
  links: NavLink[];
  serviceLinks?: NavLink[];
  scrollThreshold?: number;
  enablePageBlur?: boolean;
  compactTop?: number;
  animationDuration?: number;
  className?: string;
  onMenuToggle?: (open: boolean) => void;
}

export const MorphingNavigation: React.FC<MorphingNavigationProps> = ({
  links,
  serviceLinks = [],
  scrollThreshold = 100,
  enablePageBlur = true,
  compactTop = 20,
  animationDuration = 0.55,
  className,
  onMenuToggle,
}) => {
  const pathname = usePathname();

  const [isSticky,    setIsSticky]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);
  const [dropOpen,    setDropOpen]    = useState(false);
  const [mobServices, setMobServices] = useState(false);

  const navRef      = useRef<HTMLElement>(null);
  const hasServices = serviceLinks.length > 0;
  const collapsed   = isMobile || isSticky;

  /* ── resize ── */
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  /* ── scroll morph ── */
  useEffect(() => {
    const fn = () => {
      if (isMobile) {
        setIsSticky(true);
        setMenuOpen(false);
        setDropOpen(false);
      } else {
        const scrolled = window.scrollY >= scrollThreshold;
        setIsSticky(scrolled);
        if (scrolled) { setMenuOpen(false); setDropOpen(false); }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [scrollThreshold, isMobile]);

  /* ── outside click closes dropdown only ── */
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setDropOpen(false);
    setMobServices(false);
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    if (!next) { setDropOpen(false); setMobServices(false); }
    onMenuToggle?.(next);
  };

  /* ─────────────────── render ─────────────────── */
  return (
    <>
      {/* ── Backdrop ── */}
      <AnimatePresence>
        {enablePageBlur && menuOpen && (
          <motion.div
            className="fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAll}
          />
        )}
      </AnimatePresence>

      {/* ── Header shell ── */}
      <motion.header
        className={cn("fixed w-full z-[50]", className)}
        animate={{ top: isMobile ? compactTop : isSticky ? 8 : 16 }}
        transition={{ duration: animationDuration, ease: "easeInOut" }}
      >
        <motion.nav
          ref={navRef}
         className={cn(
  "mx-auto flex items-center justify-center",
  "backdrop-blur-xl bg-[#257ca3]/80 border border-[#257ca3]",

  "text-white"
)}
          animate={{
            height:       collapsed ? 66  : 58,
            width:        collapsed ? 66  : 500,
            borderRadius: 9999,
          }}
          transition={{ duration: animationDuration, ease: "easeInOut" }}
        
        >

          {/* ══════════ DESKTOP PILL ══════════ */}
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                className="flex items-center justify-center gap-0.5 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {links.map((link, i) => {
                  const isSvc    = (link.id === "services" || link.href === "/services") && hasServices;
                  const isActive = pathname === link.href;

                  return (
                    <div key={link.id} className="relative">
                      {isSvc ? (
                        /* ── Services button ── */
                        <button
                          onClick={() => setDropOpen((p) => !p)}
                          className={cn(
                            "relative flex items-center justify-center px-4 py-1.5 rounded-full",
                            "text-sm font-semibold tracking-wide transition-all duration-200",
                            dropOpen
                              ? "text-[#257ca3] bg-[#257ca3]/10"
                              : "text-white/75 hover:text-white hover:bg-white/8"
                          )}
                        >
                          {/* Center the label — chevron is absolute so it doesn't push text */}
                          <span>{link.label}</span>
                          <motion.span
                            className="ml-1"
                            animate={{ rotate: dropOpen ? 180 : 0 }}
                            transition={{ duration: 0.22 }}
                          >
                            <ChevronDown className="h-3.5 w-3.5" />
                          </motion.span>
                        </button>
                      ) : (
                        /* ── Regular link ── */
                        <Link
                          href={link.href}
                          onClick={closeAll}
                          className={cn(
                            "block px-4 py-1.5 rounded-full",
                            "text-sm font-semibold tracking-wide transition-all duration-200",
                          isActive
  ? "text-black bg-white/90"
                              : "text-white/75 hover:text-white hover:bg-white/8"
                          )}
                        >
                          {link.label}
                        </Link>
                      )}

                      {/* ── Desktop dropdown ── */}
                      <AnimatePresence>
                        {isSvc && dropOpen && (
                          <motion.div
                            className={cn(
                              "absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2",
                              "w-56 rounded-2xl overflow-hidden",
                              "bg-[#080e14] border border-[#257ca3]/25",
                              "shadow-[0_8px_48px_rgba(0,0,0,0.7),0_0_0_1px_rgba(37,124,163,0.08)]",
                              "z-[60]"
                            )}
                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0,  scale: 1    }}
                            exit={{    opacity: 0, y: -8, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                          >
                            {/* top accent line */}
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#257ca3]/60 to-transparent" />
                            <div className="py-2 max-h-[62vh] overflow-y-auto">
                              {serviceLinks.map((s) => {
                                const active = pathname === s.href;
                                return (
                                  <Link
                                    key={s.id}
                                    href={s.href}
                                    onClick={closeAll}
                                    className={cn(
                                      "block px-4 py-2.5 text-[13px] font-medium text-center",
                                      "transition-colors duration-150",
                                      active
                                        ? "text-black bg-white/90 font-semibold"
                                        : "text-white/65 hover:text-white hover:bg-[#257ca3]/8"
                                    )}
                                  >
                                    {s.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ══════════ HAMBURGER ══════════ */}
          {collapsed && (
            <button
              onClick={toggleMenu}
              aria-label="Toggle navigation"
              className={cn(
                "w-[52px] h-[52px] rounded-full flex items-center justify-center",
                "border transition-colors duration-200",
                menuOpen
                  ? "border-[#257ca3]/60 bg-[#257ca3]/10"
                 : "border-[#257ca3]/60 bg-[#257ca3]/80 hover:bg-[#257ca3]"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.div
                    key="x"
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                    exit={{    opacity: 0, rotate:  90, scale: 0.6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="h-[18px] w-[18px] text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90,  scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                    exit={{    opacity: 0, rotate: -90, scale: 0.6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="h-[18px] w-[18px] text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          )}
        </motion.nav>
      </motion.header>

      {/* ══════════ MOBILE / STICKY MENU ══════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[46] flex items-center justify-center px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={cn(
                "w-full max-w-[300px] rounded-3xl overflow-hidden",
                "bg-[#080e14] border border-white/10",
                "shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(37,124,163,0.12)]"
              )}
              initial={{ scale: 0.93, opacity: 0, y: 12 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.93, opacity: 0, y: 12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* top accent */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#257ca3]/60 to-transparent" />

              <div className="flex flex-col py-3">
                {links.map((link, idx) => {
                  const isSvc    = link.id === "services" && hasServices;
                  const isActive = pathname === link.href;
                  const showDiv  = idx < links.length - 1;

                  return (
                    <div key={link.id}>
                      {isSvc ? (
                        <>
                          {/* ── Services accordion trigger ── */}
                          <button
                            onClick={() => setMobServices((p) => !p)}
                            className={cn(
                              "relative flex items-center justify-center w-full px-6 py-3.5",
                              "text-[15px] font-bold transition-colors duration-150",
                              mobServices
                                ? "text-[#257ca3]"
                                : "text-white hover:text-white/80"
                            )}
                          >
                            {/* label is absolutely centered; chevron floats right */}
                            <span className="absolute left-1/2 -translate-x-1/2">
                              {link.label}
                            </span>
                            <motion.span
                              className="ml-auto"
                              animate={{ rotate: mobServices ? 180 : 0 }}
                              transition={{ duration: 0.22 }}
                            >
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4",
                                  mobServices ? "text-[#257ca3]" : "text-white/40"
                                )}
                              />
                            </motion.span>
                          </button>

                          {/* ── Services list ── */}
                          <AnimatePresence>
                            {mobServices && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{    height: 0,    opacity: 0 }}
                                transition={{ duration: 0.26, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="border-t border-white/8 mx-4 max-h-[42vh] overflow-y-auto py-1">
                                  {serviceLinks.map((s) => {
                                    const active = pathname === s.href;
                                    return (
                                      <Link
                                        key={s.id}
                                        href={s.href}
                                        onClick={closeAll}
                                        className={cn(
                                          "block py-2.5 px-3 text-[13px] font-medium text-center",
                                          "rounded-xl mx-1 my-0.5 transition-colors duration-150",
                                          active
                                            ? "text-[#257ca3] bg-[#257ca3]/10 font-semibold"
                                            : "text-white/50 hover:text-white hover:bg-white/6"
                                        )}
                                      >
                                        {s.label}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={closeAll}
                          className={cn(
                            "block w-full py-3.5 text-[15px] font-bold text-center",
                            "transition-colors duration-150",
                            isActive
                              ? "text-[#257ca3]"
                              : "text-white hover:text-white/75"
                          )}
                        >
                          {link.label}
                        </Link>
                      )}

                      {/* subtle separator */}
                      {showDiv && (
                        <div className="h-px bg-white/5 mx-5" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* bottom accent */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#257ca3]/30 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MorphingNavigation;