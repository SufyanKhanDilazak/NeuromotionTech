"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Mail,
  Phone,
  Instagram,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Clock,
  Zap,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ══════════════════════════════════════
   TYPES
══════════════════════════════════════ */
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/* ══════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════ */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
};
const slideLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};
const slideRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
};

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const infoCards = [
  {
    Icon: Mail,
    label: "Email Us",
    value: "neuromtiontech.com",
    hint: "Response within 24 hours",
    href: "mailto:neuromtiontech.com",
  },
  {
    Icon: Phone,
    label: "Call Us",
    value: "+1 934-799-1588",
    hint: "Mon–Fri, 9am–6pm EST",
    href: "tel:+19347991588",
  },
  {
    Icon: Instagram,
    label: "Instagram DM",
    value: "@neuromotiontech",
    hint: "Quickest response",
    href: "https://instagram.com/neuromotiontech",
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "Remote · Worldwide",
    hint: "Serving clients globally",
    href: "#",
  },
];

const stats = [
  { Icon: Clock, label: "Avg. Response", value: "< 24h" },
  { Icon: MessageSquare, label: "Projects Done", value: "120+" },
  { Icon: Zap, label: "Client Rating", value: "4.9★" },
];

const SERVICES = [
  "Web Development",
  "AI Integration",
  "Motion Design",
  "Branding",
  "Other",
];

/* ══════════════════════════════════════
   FLOATING LABEL INPUT
══════════════════════════════════════ */
function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <Label
        htmlFor={id}
        className="pointer-events-none absolute left-3 z-10 font-medium transition-all duration-200"
        style={{
          top: active ? "6px" : "50%",
          transform: active ? "translateY(0) scale(0.75)" : "translateY(-50%) scale(1)",
          transformOrigin: "left",
          fontSize: "13px",
          color: focused ? "#257ca3" : "#94a3b8",
        }}
      >
        {label}
        {required && " *"}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        required={required}
        className="h-14 rounded-none border-0 border-b-2 bg-slate-50/60 px-3 pb-2 pt-6 text-[13.5px] text-slate-900 focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{
          borderBottom: `2px solid ${focused ? "#257ca3" : "#e2e8f0"}`,
          outline: "none",
          transition: "border-color 0.2s",
        }}
      />
    </div>
  );
}

function TextareaField({
  id,
  label,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <Label
        htmlFor={id}
        className="pointer-events-none absolute left-3 z-10 font-medium transition-all duration-200"
        style={{
          top: active ? "8px" : "18px",
          transform: active ? "scale(0.75)" : "scale(1)",
          transformOrigin: "left",
          fontSize: "13px",
          color: focused ? "#257ca3" : "#94a3b8",
        }}
      >
        {label}
        {required && " *"}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={5}
        required={required}
        className="resize-none rounded-none border-0 border-b-2 bg-slate-50/60 px-3 pb-3 pt-8 text-[13.5px] text-slate-900 focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{
          borderBottom: `2px solid ${focused ? "#257ca3" : "#e2e8f0"}`,
          outline: "none",
          transition: "border-color 0.2s",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { success: boolean; error?: string };

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSent(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setSent(false);
    setError(null);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0d2d45 0%, #0f3d5a 40%, #257ca3 100%)",
          paddingTop: "clamp(60px, 10vw, 110px)",
          paddingBottom: "clamp(56px, 8vw, 96px)",
        }}
      >
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(125,211,240,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full"
          style={{
            background: "rgba(37,124,163,0.25)",
            filter: "blur(72px)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 rounded-full"
          style={{
            background: "rgba(13,45,69,0.6)",
            filter: "blur(56px)",
          }}
        />
        {/* Top shimmer */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(125,211,240,0.7) 50%, transparent)",
          }}
        />

        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "show" : "hidden"}
          variants={container}
          className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-10"
        >
          {/* Badge */}
          <motion.div variants={slideUp} className="mb-6 flex justify-center">
            <Badge
              className="gap-1.5 rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.28em]"
              style={{
                background: "rgba(0,13,26,0.65)",
                border: "1px solid rgba(125,211,240,0.30)",
                color: "rgba(255,255,255,0.80)",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{
                  background: "#7dd3f0",
                  boxShadow: "0 0 6px rgba(125,211,240,0.8)",
                }}
              />
              Let&apos;s Work Together
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={slideUp}
            className="mb-4 font-black uppercase leading-none"
            style={{
              fontFamily: "'Rajdhani','Oswald',sans-serif",
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              letterSpacing: "-0.02em",
              color: "#ffffff",
              textShadow: "0 4px 32px rgba(0,0,0,0.4)",
            }}
          >
            Get In{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,#7dd3f0 0%,#ffffff 60%,rgba(37,124,163,0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Touch
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={slideUp}
            className="mx-auto max-w-md"
            style={{
              fontSize: "clamp(14px, 1.6vw, 16px)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.75,
            }}
          >
            Have a project in mind? Send us a message and we&apos;ll get back
            to you within 24 hours.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={slideUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {stats.map(({ Icon, label, value }, i) => (
              <React.Fragment key={label}>
                {i > 0 && (
                  <Separator
                    orientation="vertical"
                    className="hidden h-8 sm:block"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                  />
                )}
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{
                      background: "rgba(37,124,163,0.30)",
                      border: "1px solid rgba(125,211,240,0.20)",
                    }}
                  >
                    <Icon
                      size={14}
                      strokeWidth={2}
                      style={{ color: "#7dd3f0" }}
                    />
                  </span>
                  <div className="text-left">
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: 800,
                        color: "#ffffff",
                        lineHeight: 1,
                      }}
                    >
                      {value}
                    </p>
                    <p
                      style={{
                        fontSize: "9.5px",
                        color: "rgba(255,255,255,0.45)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════
          BODY
      ════════════════════════════ */}
      <section
        ref={bodyRef}
        className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">

          {/* ── LEFT: Contact info ── */}
          <motion.div
            initial="hidden"
            animate={bodyInView ? "show" : "hidden"}
            variants={container}
            className="flex flex-col items-center text-center gap-5 lg:items-start lg:text-left"
          >
            {/* Label */}
            <motion.div
              variants={slideLeft}
              className="flex items-center justify-center gap-2.5 lg:justify-start"
            >
              <div
                className="h-px w-8 rounded-full"
                style={{ background: "#257ca3" }}
              />
              <span
                className="text-[9px] font-black uppercase tracking-[0.26em]"
                style={{ color: "#257ca3" }}
              >
                Contact Information
              </span>
            </motion.div>

            <motion.h2
              variants={slideLeft}
              className="font-black leading-tight"
              style={{
                fontFamily: "'Rajdhani','Oswald',sans-serif",
                fontSize: "clamp(1.8rem,4vw,2.6rem)",
                letterSpacing: "-0.02em",
                color: "#0d2d45",
              }}
            >
              We&apos;re here
              <br />
              <span style={{ color: "#257ca3" }}>to help you.</span>
            </motion.h2>

            <motion.p
              variants={slideLeft}
              className="max-w-sm text-[14px] leading-relaxed"
              style={{ color: "#64748b" }}
            >
              Whether you have a question, want to start a project, or just want
              to say hello — our team is ready.
            </motion.p>

            {/* Info cards */}
            <div className="w-full mt-1 flex flex-col gap-3">
              {infoCards.map(({ Icon, label, value, hint, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  variants={slideLeft}
                  custom={i}
                  className="group flex items-center gap-4 rounded-2xl p-4 transition-all duration-200"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    textDecoration: "none",
                  }}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 8px 24px rgba(37,124,163,0.12)",
                    borderColor: "rgba(37,124,163,0.35)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: "rgba(37,124,163,0.10)",
                      border: "1px solid rgba(37,124,163,0.20)",
                    }}
                  >
                    <Icon size={17} strokeWidth={2} style={{ color: "#257ca3" }} />
                  </span>
                  <div className="min-w-0 flex-1 text-left">
                    <p
                      className="text-[9.5px] font-black uppercase tracking-[0.18em]"
                      style={{ color: "#94a3b8" }}
                    >
                      {label}
                    </p>
                    <p
                      className="truncate text-[13.5px] font-bold"
                      style={{ color: "#0d2d45" }}
                    >
                      {value}
                    </p>
                    <p className="text-[11px]" style={{ color: "#94a3b8" }}>
                      {hint}
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: "#cbd5e1" }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Fast turnaround strip */}
            <motion.div
              variants={slideLeft}
              className="w-full mt-1 flex items-center gap-3 rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg,#0d2d45 0%,#257ca3 100%)",
              }}
            >
              <Zap
                size={16}
                strokeWidth={2}
                style={{ color: "#7dd3f0", flexShrink: 0 }}
              />
              <p
                className="text-[12px] font-medium leading-relaxed"
                style={{ color: "rgba(255,255,255,0.80)" }}
              >
                <span className="font-bold text-white">Fast turnaround.</span>{" "}
                Most inquiries get a reply the same business day.
              </p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            initial="hidden"
            animate={bodyInView ? "show" : "hidden"}
            variants={slideRight}
          >
            <div
              className="rounded-3xl p-6 sm:p-8 lg:p-10"
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 4px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              {/* Form header */}
              <div className="mb-8 text-center lg:text-left">
                <p
                  className="mb-1 text-[9px] font-black uppercase tracking-[0.26em]"
                  style={{ color: "#257ca3" }}
                >
                  Send a Message
                </p>
                <h3
                  className="font-black"
                  style={{
                    fontFamily: "'Rajdhani','Oswald',sans-serif",
                    fontSize: "clamp(1.4rem,3vw,1.9rem)",
                    letterSpacing: "-0.02em",
                    color: "#0d2d45",
                  }}
                >
                  Tell us about your project
                </h3>
                <Separator className="mt-4" style={{ background: "#f1f5f9" }} />
              </div>

              {/* ── SUCCESS ── */}
              {sent ? (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={scaleIn}
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1,
                    }}
                  >
                    <CheckCircle2
                      size={56}
                      strokeWidth={1.5}
                      style={{ color: "#257ca3" }}
                    />
                  </motion.div>
                  <h4
                    className="text-[22px] font-black"
                    style={{
                      fontFamily: "'Rajdhani','Oswald',sans-serif",
                      color: "#0d2d45",
                    }}
                  >
                    Message Sent!
                  </h4>
                  <p
                    className="max-w-xs text-[13.5px] leading-relaxed"
                    style={{ color: "#64748b" }}
                  >
                    Thanks for reaching out. We&apos;ll reply to{" "}
                    <span className="font-semibold text-[#0d2d45]">
                      {form.email}
                    </span>{" "}
                    within 24 hours.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-2 rounded-full px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-80"
                    style={{ background: "#257ca3" }}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                /* ── FORM ── */
                <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <motion.div variants={slideUp}>
                      <Field
                        id="name"
                        label="Your Name"
                        value={form.name}
                        onChange={set("name")}
                        required
                        placeholder="John Doe"
                      />
                    </motion.div>
                    <motion.div variants={slideUp}>
                      <Field
                        id="email"
                        label="Email Address"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        required
                        placeholder="john@company.com"
                      />
                    </motion.div>
                  </div>

                  {/* Subject */}
                  <motion.div variants={slideUp}>
                    <Field
                      id="subject"
                      label="Subject"
                      value={form.subject}
                      onChange={set("subject")}
                      required
                      placeholder="What's this about?"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={slideUp}>
                    <TextareaField
                      id="message"
                      label="Your Message"
                      value={form.message}
                      onChange={set("message")}
                      required
                    />
                  </motion.div>

                  {/* Service tags */}
                  <motion.div variants={slideUp}>
                    <p
                      className="mb-2.5 text-[9.5px] font-black uppercase tracking-[0.2em]"
                      style={{ color: "#94a3b8" }}
                    >
                      I&apos;m interested in
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => set("subject")(tag)}
                          className="rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-200"
                          style={{
                            background:
                              form.subject === tag
                                ? "rgba(37,124,163,0.12)"
                                : "#f1f5f9",
                            border: `1px solid ${
                              form.subject === tag
                                ? "rgba(37,124,163,0.40)"
                                : "#e2e8f0"
                            }`,
                            color:
                              form.subject === tag ? "#257ca3" : "#64748b",
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  <Separator style={{ background: "#f1f5f9" }} />

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2.5 rounded-xl px-4 py-3"
                      style={{
                        background: "rgba(239,68,68,0.06)",
                        border: "1px solid rgba(239,68,68,0.20)",
                      }}
                    >
                      <AlertCircle size={15} strokeWidth={2} style={{ color: "#ef4444", flexShrink: 0 }} />
                      <p className="text-[12.5px]" style={{ color: "#ef4444" }}>
                        {error}
                      </p>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.div variants={slideUp}>
                    <motion.button
                      type="submit"
                      disabled={
                        sending ||
                        !form.name.trim() ||
                        !form.email.trim() ||
                        !form.message.trim()
                      }
                      className="relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl py-4 text-[13px] font-black uppercase tracking-[0.14em] text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                      style={{
                        background:
                          "linear-gradient(135deg,#0d2d45 0%,#257ca3 100%)",
                      }}
                      whileHover={{
                        scale: 1.01,
                        boxShadow: "0 8px 28px rgba(37,124,163,0.35)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {sending ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.85,
                              ease: "linear",
                            }}
                            className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={15} strokeWidth={2} />
                          Send Message
                          <ArrowRight size={14} strokeWidth={2.5} />
                        </>
                      )}
                    </motion.button>

                    <p
                      className="mt-3 text-center text-[11px]"
                      style={{ color: "#94a3b8" }}
                    >
                      We respect your privacy. No spam, ever.
                    </p>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}