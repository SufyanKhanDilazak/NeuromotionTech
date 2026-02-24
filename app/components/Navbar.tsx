"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const services = [
  {
    title: "Web Development",
    href: "/services/web-development",
    description: "Custom web applications built with modern technologies",
  },
  {
    title: "Web Designing",
    href: "/services/web-designing",
    description: "Beautiful, user-centric designs that convert",
  },
  {
    title: "CRM & Portals",
    href: "/services/crm-portals",
    description: "Tailored customer relationship management solutions",
  },
  {
    title: "Application Development",
    href: "/services/application-development",
    description: "Native and cross-platform mobile applications",
  },
  {
    title: "Social Media Marketing",
    href: "/services/social-media-marketing",
    description: "Strategic campaigns that grow your brand",
  },
  {
    title: "3D Animation",
    href: "/services/3d-animation",
    description: "Stunning animations that bring ideas to life",
  },
  {
    title: "CGI Ads",
    href: "/services/cgi-ads",
    description: "Photorealistic computer-generated advertising",
  },
  {
    title: "Product Photoshoot",
    href: "/services/product-photoshoot",
    description: "Professional product photography and styling",
  },
  {
    title: "SEO",
    href: "/services/seo",
    description: "Search engine optimization for better visibility",
  },
  {
    title: "AI Agents",
    href: "/services/ai-agents",
    description: "Intelligent automation agents for your business",
  },
  {
    title: "AI Automation",
    href: "/services/ai-automation",
    description: "Streamline operations with AI-powered workflows",
  },
  {
    title: "Business Consultation",
    href: "/services/business-consultation",
    description: "Strategic guidance for digital transformation",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b-2 border-[#257ca3]/30 bg-black shadow-2xl shadow-[#257ca3]/10"
    >
      <nav className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Left Section - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden items-center gap-10 lg:flex"
        >
          <Link
            href="/"
            className="group relative text-[15px] font-bold tracking-wide text-white transition-all duration-300 hover:text-[#257ca3]"
          >
            Home
            <span className="absolute -bottom-1.5 left-0 h-[3px] w-0 bg-gradient-to-r from-[#257ca3] via-[#2d8db8] to-[#257ca3] transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Desktop Dropdown - Click to Open */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="group relative flex items-center gap-2 text-[15px] font-bold tracking-wide text-white transition-all duration-300 hover:text-[#257ca3] focus:outline-none">
                Services
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                <span className="absolute -bottom-1.5 left-0 h-[3px] w-0 bg-gradient-to-r from-[#257ca3] via-[#2d8db8] to-[#257ca3] transition-all duration-300 group-hover:w-full" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="mt-2 w-[680px] border-2 border-[#257ca3]/40 bg-black p-4 shadow-2xl shadow-[#257ca3]/20"
            >
              <div className="grid grid-cols-2 gap-2">
                {services.map((service, index) => (
                  <DropdownMenuItem key={service.title} asChild>
                    <Link
                      href={service.href}
                      className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-transparent bg-transparent p-4 transition-all duration-300 hover:border-[#257ca3]/60 hover:bg-[#257ca3]/10 hover:shadow-lg hover:shadow-[#257ca3]/20 focus:border-[#257ca3]/60 focus:bg-[#257ca3]/10"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#257ca3] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="text-[15px] font-bold leading-tight text-white">
                            {service.title}
                          </div>
                        </div>
                        <p className="pl-3.5 text-xs leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                          {service.description}
                        </p>
                      </div>
                      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#257ca3]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Center - Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 -translate-x-1/2 transform lg:static lg:translate-x-0"
        >
          <Link href="/" className="group flex items-center">
            <span className="bg-gradient-to-br from-white via-zinc-200 to-zinc-300 bg-clip-text text-2xl font-black tracking-tight text-transparent transition-all duration-500 group-hover:from-zinc-50 group-hover:via-white group-hover:to-zinc-100">
              Neuromotion
              <span className="bg-gradient-to-r from-[#257ca3] via-[#2d8db8] to-[#257ca3] bg-clip-text bg-[length:200%_100%] text-transparent transition-all duration-700 group-hover:bg-[position:100%_0]">
                Tech
              </span>
            </span>
          </Link>
        </motion.div>

        {/* Right Section - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden items-center gap-10 lg:flex"
        >
          <Link
            href="/about"
            className="group relative text-[15px] font-bold tracking-wide text-white transition-all duration-300 hover:text-[#257ca3]"
          >
            About
            <span className="absolute -bottom-1.5 left-0 h-[3px] w-0 bg-gradient-to-r from-[#257ca3] via-[#2d8db8] to-[#257ca3] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-xl border-2 border-[#257ca3] bg-transparent px-8 py-3 text-[15px] font-black tracking-wide text-[#257ca3] shadow-xl shadow-[#257ca3]/25 transition-all duration-500 hover:scale-105 hover:border-[#2d8db8] hover:shadow-2xl hover:shadow-[#257ca3]/50"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#257ca3] via-[#2d8db8] to-[#257ca3] bg-[length:200%_100%] opacity-0 transition-all duration-500 group-hover:bg-[position:100%_0] group-hover:opacity-100" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              Contact
            </span>
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-xl border-2 border-[#257ca3]/50 bg-transparent transition-all duration-300 hover:border-[#257ca3] hover:bg-[#257ca3]/10 hover:shadow-lg hover:shadow-[#257ca3]/30"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-[#257ca3]" />
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[340px] border-r-2 border-[#257ca3]/40 bg-black p-0 sm:w-[400px] [&>button]:hidden"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between border-b-2 border-[#257ca3]/40 p-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center"
              >
                <span className="bg-gradient-to-br from-white to-zinc-300 bg-clip-text text-xl font-black tracking-tight text-transparent">
                  Neuromotion
                  <span className="bg-gradient-to-r from-[#257ca3] to-[#2d8db8] bg-clip-text text-transparent">
                    Tech
                  </span>
                </span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#257ca3]/50 bg-transparent text-[#257ca3] transition-all duration-300 hover:border-[#257ca3] hover:bg-[#257ca3]/10 hover:shadow-lg hover:shadow-[#257ca3]/30"
                aria-label="Close menu"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors duration-300"
                >
                  <path
                    d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex h-[calc(100vh-104px)] flex-col gap-2 overflow-y-auto p-6">
              {/* Home Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link
                  href="/"
                  className="group block rounded-xl border-2 border-transparent px-5 py-4 text-[15px] font-bold text-white transition-all duration-300 hover:border-[#257ca3]/50 hover:bg-[#257ca3]/10 hover:text-[#257ca3] hover:shadow-lg hover:shadow-[#257ca3]/20"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </motion.div>

              {/* Services Accordion */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-2"
              >
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="group flex w-full items-center justify-between rounded-xl border-2 border-transparent px-5 py-4 text-left text-[15px] font-bold text-white transition-all duration-300 hover:border-[#257ca3]/50 hover:bg-[#257ca3]/10 hover:text-[#257ca3] hover:shadow-lg hover:shadow-[#257ca3]/20"
                >
                  Services
                  <motion.div
                    animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1.5 pt-2">
                        {services.map((service, index) => (
                          <motion.div
                            key={service.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                          >
                            <Link
                              href={service.href}
                              className="group block rounded-xl border-2 border-transparent bg-[#257ca3]/5 px-5 py-3.5 pl-10 transition-all duration-300 hover:border-[#257ca3]/40 hover:bg-[#257ca3]/15 hover:shadow-lg hover:shadow-[#257ca3]/20"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#257ca3] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="text-[14px] font-bold text-white transition-colors duration-300 group-hover:text-[#257ca3]">
                                  {service.title}
                                </div>
                              </div>
                              <div className="mt-1.5 pl-3.5 text-xs leading-relaxed text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400">
                                {service.description}
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* About Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Link
                  href="/about"
                  className="group block rounded-xl border-2 border-transparent px-5 py-4 text-[15px] font-bold text-white transition-all duration-300 hover:border-[#257ca3]/50 hover:bg-[#257ca3]/10 hover:text-[#257ca3] hover:shadow-lg hover:shadow-[#257ca3]/20"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </motion.div>

              {/* Contact Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pt-4"
              >
                <Link
                  href="/contact"
                  className="group relative block overflow-hidden rounded-xl border-2 border-[#257ca3] bg-transparent px-5 py-4 text-center text-[15px] font-black text-[#257ca3] shadow-xl shadow-[#257ca3]/25 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#257ca3]/50"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#257ca3] via-[#2d8db8] to-[#257ca3] bg-[length:200%_100%] opacity-0 transition-all duration-500 group-hover:bg-[position:100%_0] group-hover:opacity-100" />
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                    Contact Us
                  </span>
                </Link>
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}