"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Instagram,
  Facebook,
  MessageCircle,
  Mail,
  Phone,
  UserRound,
  Info,
  Briefcase,
  Music2,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SocialItem {
  label: string;
  handle: string;
  href: string;
  Icon: LucideIcon;
}

interface ContactItem {
  tag: string;
  value: string;
  hint: string;
  href: string;
  Icon: LucideIcon;
}

interface PageItem {
  label: string;
  sub: string;
  href: string;
  Icon: LucideIcon;
}

// ─── Static data (defined outside component – no re-creation on render) ───────

const SOCIALS: SocialItem[] = [
  { label: "Instagram", handle: "@neuromotiontech", href: "#", Icon: Instagram     },
  { label: "TikTok",    handle: "@neuromotiontech", href: "#", Icon: Music2        },
  { label: "Facebook",  handle: "NeuromotionTech",  href: "#", Icon: Facebook      },
  { label: "WhatsApp",  handle: "+1 934-799-1588",  href: "#", Icon: MessageCircle },
];

const CONTACTS: ContactItem[] = [
  { tag: "Email", value: "hello@neuromotiontech.com", hint: "Response within 24h",  href: "mailto:hello@neuromotiontech.com", Icon: Mail  },
  { tag: "Phone", value: "+1 934-799-1588",            hint: "Mon–Fri, 9am–6pm EST", href: "tel:+19347991588",                Icon: Phone },
];

const PAGES: PageItem[] = [
  { label: "Contact", sub: "Get in touch",        href: "/info/contact", Icon: UserRound },
  { label: "About",   sub: "Our story & mission",  href: "/info/about",   Icon: Info      },
  { label: "Careers", sub: "Join our team",        href: "/info/careers", Icon: Briefcase },
];

const YEAR = new Date().getFullYear();

// ─── Animation variants ───────────────────────────────────────────────────────

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.23, 1, 0.32, 1] } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function IconChip({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="chip">
      <Icon size={13} strokeWidth={2.2} />
    </span>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="section-heading">
      <span className="divider" />
      <span className="heading-label">{title}</span>
      <span className="divider" />
    </div>
  );
}

// Unified responsive row — renders card on mobile, list-row on desktop
function NavRow({
  href,
  Icon,
  primary,
  secondary,
  tag,
  external = false,
}: {
  href: string;
  Icon: LucideIcon;
  primary: string;
  secondary: string;
  tag?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="nav-row"
    >
      <IconChip Icon={Icon} />
      <div className="nav-row__text">
        {tag && <span className="nav-row__tag">{tag}</span>}
        <span className="nav-row__primary">{primary}</span>
        <span className="nav-row__secondary">{secondary}</span>
      </div>
    </Link>
  );
}

// ─── Styles injected once ─────────────────────────────────────────────────────

const CSS = `
  /* Chip */
  .chip {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    height: 28px;
    width: 28px;
    border-radius: 8px;
    color: #fff;
    background: rgba(37,124,163,0.18);
    border: 1px solid rgba(37,124,163,0.40);
    transition: background 0.2s, border-color 0.2s;
  }

  /* Section heading */
  .section-heading {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .divider {
    flex: 1;
    height: 1px;
    background: rgba(37,124,163,0.22);
  }
  .heading-label {
    font-size: 8px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.28em;
    color: rgba(125,211,240,0.55);
    white-space: nowrap;
    padding: 0 4px;
  }

  /* Nav row — mobile: card, desktop: inline row */
  .nav-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px;
    border-radius: 12px;
    border: 1px solid rgba(37,124,163,0.20);
    background: rgba(255,255,255,0.03);
    transition: background 0.2s, border-color 0.2s;
    text-decoration: none;
  }
  .nav-row:hover {
    background: rgba(37,124,163,0.09);
    border-color: rgba(37,124,163,0.30);
  }
  .nav-row__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    min-width: 0;
  }
  .nav-row__tag {
    font-size: 7.5px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: rgba(125,211,240,0.65);
    line-height: 1;
  }
  .nav-row__primary {
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    line-height: 1.2;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .nav-row__secondary {
    font-size: 9px;
    color: rgba(255,255,255,0.55);
    text-align: center;
    line-height: 1.2;
  }

  @media (min-width: 640px) {
    .nav-row {
      flex-direction: row;
      align-items: center;
      gap: 8px;
      padding: 4px 6px;
      border-radius: 8px;
      border-color: transparent;
      background: transparent;
    }
    .nav-row__text {
      align-items: flex-start;
    }
    .nav-row__primary {
      font-size: 12px;
      text-align: left;
    }
    .nav-row__secondary {
      text-align: left;
    }
  }
`;

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const animate = inView ? "show" : "hidden";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <footer
        ref={ref}
        className="relative w-full overflow-hidden bg-black"
      >
        {/* Top accent line */}
        <div
          aria-hidden="true"
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg,transparent 0%,rgba(37,124,163,.5) 40%,rgba(125,211,240,.8) 50%,rgba(37,124,163,.5) 60%,transparent 100%)",
          }}
        />

        <div className="mx-auto max-w-5xl px-5 pt-4 sm:px-8">

          {/* ── Brand ── */}
          <motion.div
            initial="hidden"
            animate={animate}
            variants={fadeUp}
            className="mb-3 flex flex-col items-center gap-1 text-center"
          >
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(37,124,163,0.30)",
              }}
            >
              <Zap size={8} strokeWidth={2.6} className="text-[#7dd3f0]" />
              <span
                className="text-[7.5px] font-extrabold uppercase tracking-[0.32em] text-white/75"
              >
                Neural · Motion · Innovation
              </span>
            </div>

            <h2
              className="font-black uppercase leading-none"
              style={{
                fontFamily: "'Rajdhani','Oswald',sans-serif",
                fontSize: "clamp(18px,3.8vw,24px)",
                letterSpacing: "0.09em",
              }}
            >
              <span className="text-white">Neuromotion</span>
              <span
                style={{
                  background:
                    "linear-gradient(135deg,#7dd3f0 0%,rgba(37,124,163,0.85) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Tech
              </span>
            </h2>

            <div
              className="h-[3px] w-24 rounded-full"
              style={{
                background: "linear-gradient(90deg,#257ca3,#7dd3f0,#257ca3)",
              }}
            />
          </motion.div>

          {/* ── 3-column grid ── */}
          <div
            className="grid grid-cols-1 pt-3 sm:grid-cols-3"
            style={{ borderTop: "1px solid rgba(37,124,163,0.14)" }}
          >

            {/* Social Media */}
            <motion.section
              aria-label="Social Media"
              className="pb-4 sm:pb-0 sm:pr-6"
              style={{ borderBottom: "1px solid rgba(37,124,163,0.10)" }}
              initial="hidden"
              animate={animate}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <SectionHeading title="Social Media" />
              </motion.div>

              <ul className="grid grid-cols-2 gap-1.5 sm:block sm:space-y-0">
                {SOCIALS.map(({ label, handle, href, Icon }) => (
                  <motion.li key={label} variants={fadeUp}>
                    <NavRow
                      href={href}
                      Icon={Icon}
                      primary={label}
                      secondary={handle}
                      external
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            {/* Contact Us */}
            <motion.section
              aria-label="Contact Us"
              className="py-4 sm:py-0 sm:px-6"
              style={{
                borderBottom: "1px solid rgba(37,124,163,0.10)",
                borderLeft:   "1px solid rgba(37,124,163,0.10)",
                borderRight:  "1px solid rgba(37,124,163,0.10)",
              }}
              initial="hidden"
              animate={animate}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <SectionHeading title="Contact Us" />
              </motion.div>

              <address className="not-italic">
                <ul className="space-y-1.5 sm:space-y-0">
                  {CONTACTS.map(({ tag, value, hint, href, Icon }) => (
                    <motion.li key={tag} variants={fadeUp}>
                      <NavRow
                        href={href}
                        Icon={Icon}
                        tag={tag}
                        primary={value}
                        secondary={hint}
                      />
                    </motion.li>
                  ))}
                </ul>
              </address>
            </motion.section>

            {/* About Us */}
            <motion.section
              aria-label="About Us"
              className="pt-4 sm:pt-0 sm:pl-6"
              style={{ borderBottom: "1px solid rgba(37,124,163,0.10)" }}
              initial="hidden"
              animate={animate}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <SectionHeading title="About Us" />
              </motion.div>

              <nav aria-label="Footer navigation">
                <ul className="grid grid-cols-3 gap-1.5 sm:block sm:space-y-0">
                  {PAGES.map(({ label, sub, href, Icon }) => (
                    <motion.li key={label} variants={fadeUp}>
                      <NavRow href={href} Icon={Icon} primary={label} secondary={sub} />
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.section>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-3 flex flex-col items-center gap-0.5 py-2 text-center"
          style={{ borderTop: "1px solid rgba(37,124,163,0.14)" }}
        >
          <p className="text-[10px] text-white/50">
            © {YEAR}{" "}
            <strong className="font-bold text-white">NeuromotionTech</strong>
            . All rights reserved.
          </p>
          <p className="text-[9px] italic text-white/28">
            Designed &amp; Built by NeuromotionTech
          </p>
        </div>
      </footer>
    </>
  );
}