'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  Star, Quote, BadgeCheck, ChevronLeft, ChevronRight,
  X, ThumbsUp, Sparkles, TrendingUp, Award, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  year: number;
  verified: boolean;
  initials: string;
  color: string;
  helpful: number;
}

const COLORS = [
  'from-rose-500 to-pink-600',
  'from-violet-600 to-indigo-600',
  'from-blue-600 to-cyan-500',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-500',
  'from-fuchsia-600 to-purple-600',
  'from-sky-500 to-blue-600',
  'from-teal-500 to-emerald-600',
  'from-orange-500 to-red-500',
  'from-indigo-600 to-blue-500',
  'from-lime-500 to-green-600',
  'from-pink-500 to-rose-600',
];

const SERVICES = [
  'Web Development','App Development','AI Automation','SEO Services',
  'Social Media Marketing','UI/UX Design','Product Photography',
  'Web Design','Branding','E-Commerce',
];

const SERVICE_ICONS: Record<string,string> = {
  'Web Development':'💻','App Development':'📱','AI Automation':'🤖',
  'SEO Services':'🔍','Social Media Marketing':'📣','UI/UX Design':'🎨',
  'Product Photography':'📸','Web Design':'🖥️','Branding':'✨','E-Commerce':'🛒',
};

const NAMES_LOCS: [string,string][] = [
  ['James Anderson','New York, USA'],['Emma Williams','Los Angeles, USA'],
  ['Michael Johnson','Chicago, USA'],['Sophia Brown','Houston, USA'],
  ['Lachlan Smith','Sydney, Australia'],['Matilda Jones','Melbourne, Australia'],
  ['Omar Al-Rashid','Dubai, UAE'],['Fatima Al-Hassan','Abu Dhabi, UAE'],
  ['Liam Davis','Phoenix, USA'],['Olivia Wilson','Philadelphia, USA'],
  ['Angus Taylor','Brisbane, Australia'],['Zoe Brown','Perth, Australia'],
  ['Ahmed Khalid','Riyadh, Saudi Arabia'],['Layla Mahmoud','Jeddah, Saudi Arabia'],
  ['Noah Martinez','San Antonio, USA'],['Ava Taylor','San Diego, USA'],
  ['Hamish Wilson','Adelaide, Australia'],['Ellie Thompson','Gold Coast, Australia'],
  ['Khalid Al-Farsi','Doha, Qatar'],['Nour Ibrahim','Kuwait City, Kuwait'],
  ['William Thomas','Dallas, USA'],['Isabella Jackson','Austin, USA'],
  ['Callum White','Canberra, Australia'],['Chloe Martin','Newcastle, Australia'],
  ['Yusuf Al-Qasim','Muscat, Oman'],['Amira Salem','Manama, Bahrain'],
  ['Benjamin White','San Francisco, USA'],['Mia Harris','Seattle, USA'],
  ['Archer Anderson','Geelong, Australia'],['Isla Harris','Hobart, Australia'],
  ['Hassan Al-Amin','Beirut, Lebanon'],['Mariam Al-Zahrawi','Amman, Jordan'],
  ['Elijah Thompson','Denver, USA'],['Charlotte Garcia','Boston, USA'],
  ['Finn Robinson','Sydney, Australia'],['Ruby Walker','Melbourne, Australia'],
  ['Ibrahim Nassar','Cairo, Egypt'],['Zainab Al-Sayed','Istanbul, Turkey'],
  ['Lucas Martinez','Miami, USA'],['Amelia Robinson','Portland, USA'],
  ['Darcy Scott','Brisbane, Australia'],['Ruby King','Adelaide, Australia'],
  ['Ali Al-Mousa','Dubai, UAE'],['Hana Barakat','Riyadh, Saudi Arabia'],
  ['Mason Clark','Nashville, USA'],['Harper Rodriguez','Las Vegas, USA'],
  ['Flynn Mitchell','Perth, Australia'],['Mia Clarke','Hobart, Australia'],
  ['Tariq Mansour','Doha, Qatar'],['Rania Al-Khatib','Kuwait City, Kuwait'],
  ['Logan Lewis','Minneapolis, USA'],['Evelyn Lee','Atlanta, USA'],
  ['Beau Cooper','Melbourne, Australia'],['Sienna Turner','Sydney, Australia'],
  ['Samir Haddad','Beirut, Lebanon'],['Dina Yousef','Cairo, Egypt'],
  ['Ethan Walker','Charlotte, USA'],['Abigail Hall','Columbus, USA'],
  ['Hugo Campbell','Brisbane, Australia'],['Willow Collins','Adelaide, Australia'],
  ['Kareem Al-Nasser','Muscat, Oman'],['Sara Khalil','Manama, Bahrain'],
  ['Aiden Allen','Indianapolis, USA'],['Emily Young','San Jose, USA'],
  ['Oscar Evans','Perth, Australia'],['Piper Edwards','Canberra, Australia'],
  ['Faisal Al-Ghamdi','Jeddah, Saudi Arabia'],['Mona Saleh','Abu Dhabi, UAE'],
  ['Carter Hernandez','Jacksonville, USA'],['Elizabeth King','Memphis, USA'],
  ['Billy Stewart','Newcastle, Australia'],['Scarlett Hall','Gold Coast, Australia'],
  ['Nasser Al-Otaibi','Riyadh, Saudi Arabia'],['Yasmin Farouk','Doha, Qatar'],
  ['Owen Wright','Louisville, USA'],['Sofia Lopez','Baltimore, USA'],
  ['Riley Hughes','Sydney, Australia'],['Evie Lewis','Melbourne, Australia'],
  ['Ziad Hamdan','Beirut, Lebanon'],['Lina Abu-Ali','Amman, Jordan'],
  ['Dylan Hill','Milwaukee, USA'],['Victoria Scott','Albuquerque, USA'],
  ['Jasper Moore','Brisbane, Australia'],['Freya Clarke','Perth, Australia'],
  ['Rami Al-Haddad','Dubai, UAE'],['Nadia Kassem','Kuwait City, Kuwait'],
  ['Ryan Green','Tucson, USA'],['Grace Adams','Fresno, USA'],
  ['Cooper Ward','Melbourne, Australia'],['Paige Murray','Adelaide, Australia'],
  ['Walid Chaaban','Beirut, Lebanon'],['Rana Al-Masri','Cairo, Egypt'],
  ['Jackson Baker','Sacramento, USA'],['Chloe Nelson','Mesa, USA'],
  ['Brodie Price','Sydney, Australia'],['Abbey Bell','Brisbane, Australia'],
  ['Sami Jaber','Amman, Jordan'],['Maya Srour','Doha, Qatar'],
  ['Sebastian Carter','Kansas City, USA'],['Riley Mitchell','Omaha, USA'],
  ['Ryder Foster','Perth, Australia'],['Taylah Cole','Gold Coast, Australia'],
  ['Adel Makhoul','Beirut, Lebanon'],['Hiba Khoury','Muscat, Oman'],
  ['Jack Thompson','Denver, USA'],['Luna Ramirez','Miami, USA'],
  ['Declan Murray','Melbourne, Australia'],['Poppy Harrison','Sydney, Australia'],
  ['Yousef Al-Ahmad','Riyadh, Saudi Arabia'],['Dana Al-Rasheed','Dubai, UAE'],
  ['Tyler Morgan','Seattle, USA'],['Zara Collins','Austin, USA'],
  ['Kieran Walsh','Chicago, USA'],['Stella Bennett','Boston, USA'],
  ['Hamza Al-Turki','Jeddah, Saudi Arabia'],['Reem Al-Otaibi','Kuwait City, Kuwait'],
  ['Connor Hughes','San Francisco, USA'],['Isla Cameron','Edinburgh, UK'],
  ['Tariq Salim','Muscat, Oman'],['Nadia Barakat','Beirut, Lebanon'],
];

const TEXTS = [
  "Absolutely transformed our online presence. Revenue jumped 43% in the first quarter after launch. The attention to detail and strategic thinking set them apart from every agency we tried before.",
  "Incredible work from start to finish. Communication was flawless, every milestone hit on schedule, and the final product exceeded every expectation we had going into the project.",
  "The best digital partner we have ever worked with. They understood our vision from day one and executed with precision. Our competitors have been asking who built our platform.",
  "From rough concept to polished launch in record time, zero quality sacrificed. Our conversion rate climbed 38% within six weeks and has continued growing every month since.",
  "App downloads tripled in the first month. The UX is so intuitive that our customer support tickets dropped by half. Genuinely outstanding development work across the board.",
  "We jumped from page 6 to the top 3 positions for every primary keyword inside three months. The organic traffic growth has been nothing short of extraordinary.",
  "Social media campaigns generated more qualified leads in one quarter than the previous two years combined. Every piece of content felt authentic and precisely targeted.",
  "Professional, creative, and technically brilliant. They challenged our assumptions in the best way and delivered something far beyond what we originally envisioned.",
  "The product photography completely transformed our e-commerce listings. Conversion rate improved 34% overnight. The images are simply world class and tell our brand story perfectly.",
  "The AI automation saved us 25 hours of manual work every single week. The system learns and improves over time. Implementation was smooth and the ROI was immediate and measurable.",
  "Best business investment we made this year by a wide margin. The ROI continues to compound every month and our team wonders how we ever operated without their work.",
  "The UI/UX redesign elevated our brand to an entirely different tier. Enterprise clients have specifically cited our platform design as a reason for choosing us over competitors.",
  "Delivered on time, on budget, and with a quality that made our whole team proud. They are the only agency we have worked with that genuinely thinks like a business partner.",
  "Search rankings have never been stronger. Quality organic traffic keeps growing months after the initial campaign. Our cost per acquisition dropped by 60% as a result.",
  "The mobile app earned 4.9 stars on both stores within its first month. User reviews specifically call out the smooth experience. This is what great software feels like.",
  "Genuinely talented people who care deeply about client outcomes. Every suggestion improved the final product in a meaningful, measurable way. We could not be happier.",
  "Transformed our rough wireframes into a high-converting, blazing-fast website. The technical architecture is solid and scalable. A truly exceptional team to work with.",
  "Fantastic from discovery right through to delivery. Every milestone was celebrated together and the quality just kept getting better at each stage of the engagement.",
  "Social following grew 340% in six months. Engagement is through the roof. The content strategy resonates perfectly with our audience and keeps improving every month.",
  "The automation workflows have revolutionized daily operations. Tasks that took hours now happen instantly and accurately. We cannot imagine going back to the old way.",
  "The photography session produced images we are still using three years later. They have a rare ability to capture the soul of a product, not just its surface appearance.",
  "Beautiful fast website, exceptional search rankings, and consistent qualified leads flowing to the team every day. This is what true digital partnership looks like.",
  "They brought strategic ideas we would never have conceived ourselves. Creative minds who constantly push beyond the brief. Every project with them raises the bar further.",
  "Every single deliverable was pixel-perfect and strategically sound. The care and craftsmanship poured into our project was palpable from the very first discovery call.",
  "The brand identity work gave us a powerful, cohesive voice. Our audience instantly connects with it and our team has never felt more confident presenting the company.",
  "Communication throughout was exemplary. We always knew exactly where things stood, what was coming next, and why every decision was made. Refreshingly transparent.",
  "PageSpeed score of 99. Bounce rate dropped 40%. Technical SEO overhaul was comprehensive and the results were immediate. The fastest website in our entire industry.",
  "They invested real time understanding our business model before touching any tool. That strategic foundation made every subsequent decision smarter and more effective.",
  "The e-commerce platform handled record Black Friday traffic without a single hiccup. Zero downtime, perfect performance. Our operations team was genuinely astonished.",
  "Creative, deeply knowledgeable, and endlessly collaborative. Every recommendation improved the final product measurably. This is the partnership every brand deserves.",
  "The team is an absolute pleasure to work with. Results-focused, proactive, and genuinely invested in our growth. Project came in ahead of schedule and under budget.",
  "Simply outstanding across every dimension. They took our outdated digital presence and rebuilt it into a modern, high-converting platform that drives real business growth.",
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const HELPFUL = [3,7,12,18,24,31,8,15,22,29,5,11,17,27,35,9,14,21,28,6,13,19,25,32,4,10,16,23,30,2,20,26,38,42];

function makeDate(i: number): { date: string; year: number } {
  let year: number;
  if (i < 80) year = 2023;
  else if (i < 160) year = 2024;
  else if (i < 300) year = 2025;
  else year = 2026;
  const m = MONTHS[i % 12];
  const d = (i % 28) + 1;
  return { date: `${m} ${d}, ${year}`, year };
}

function generateReviews(): Review[] {
  const out: Review[] = [];
  for (let i = 0; i < 500; i++) {
    const [name, location] = NAMES_LOCS[i % NAMES_LOCS.length];
    const parts = name.split(' ');
    const initials = parts.map((p: string) => p[0]).join('').replace(/[^A-Za-z]/g,'').slice(0,2).toUpperCase();
    const { date, year } = makeDate(i);
    out.push({
      id: i + 1, name, location,
      rating: i % 11 === 0 ? 4 : 5,
      text: TEXTS[i % TEXTS.length],
      service: SERVICES[i % SERVICES.length],
      date, year,
      verified: i % 5 !== 0,
      initials: initials || name.slice(0,2).toUpperCase(),
      color: COLORS[i % COLORS.length],
      helpful: HELPFUL[i % HELPFUL.length],
    });
  }
  return out;
}

const ALL = generateReviews();
const PER_PAGE = 9;

/* ── Stars ── */
function Stars({ n, size = 3 }: { n: number; size?: number }) {
  const s = size === 3 ? 'w-3 h-3' : size === 3.5 ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`${s} ${i <= n ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
      ))}
    </div>
  );
}

/* ── Counter ── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 55, damping: 18 });
  useEffect(() => { if (inView) mv.set(to); }, [inView, mv, to]);
  useEffect(() => spring.on('change', v => {
    if (ref.current) ref.current.textContent = Math.round(v) + suffix;
  }), [spring, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ── Modal ── */
function Modal({ r, onClose }: { r: Review; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ padding: '16px' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 backdrop-blur-xl"
        style={{ background: 'rgba(0,0,0,0.55)' }}
        onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      />

      {/* Card */}
      <motion.div
        className="relative z-10 w-full"
        style={{ maxWidth: '440px' }}
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ type: 'spring', damping: 28, stiffness: 340 }}
      >
        <div className="rounded-2xl overflow-hidden"
          style={{
            background: '#ffffff',
            boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
          }}>

          {/* Colored header */}
          <div className={`relative bg-gradient-to-br ${r.color} overflow-visible`} style={{ height: '88px' }}>
            <div className="absolute inset-0 opacity-[0.18]"
              style={{ backgroundImage: 'radial-gradient(circle at 25% 50%,white 1.5px,transparent 1.5px),radial-gradient(circle at 75% 50%,white 1.5px,transparent 1.5px)', backgroundSize: '22px 22px' }} />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            />
            <button onClick={onClose}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/20 hover:bg-black/35 backdrop-blur-sm transition-all flex items-center justify-center z-20">
              <X className="w-3.5 h-3.5 text-white" style={{ display: 'block', flexShrink: 0 }} />
            </button>
            <div className="absolute left-5 z-20" style={{ bottom: '-24px' }}>
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${r.color} ring-[3px] shadow-lg`}
                style={{ '--tw-ring-color': '#ffffff' } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Body */}
          <div className="px-5 pb-5" style={{ paddingTop: '36px' }}>
            <div className="flex items-start justify-between gap-2 mb-4">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="font-bold text-gray-900 text-[15px] leading-tight">{r.name}</p>
                  {r.verified && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-blue-600 px-1.5 py-0.5 rounded-full uppercase tracking-wide"
                      style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                      <BadgeCheck className="w-2.5 h-2.5" style={{ display: 'block', flexShrink: 0 }} />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-[11px] mt-0.5 text-gray-400">{r.location}</p>
              </div>
              <div className="text-right shrink-0">
                <Stars n={r.rating} size={3.5} />
                <p className="text-[9px] mt-0.5 text-gray-400">{r.rating}.0 / 5.0</p>
              </div>
            </div>

            {/* Review text */}
            <div className="rounded-xl p-4 relative mb-4"
              style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)' }}>
              <Quote className="absolute top-3 left-3 w-4 h-4 text-gray-200" style={{ display: 'block', flexShrink: 0 }} />
              <p className="text-[13px] leading-[1.75] pl-5 text-gray-700">{r.text}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex gap-1.5 flex-wrap items-center">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-700 px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.08)' }}>
                  <span style={{ display: 'inline-block', flexShrink: 0 }}>{SERVICE_ICONS[r.service]}</span>
                  {r.service}
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full text-gray-400"
                  style={{ background: 'rgba(0,0,0,0.04)' }}>{r.date}</span>
              </div>
              <button className="flex items-center gap-1 text-[10px] text-gray-400 transition-colors">
                <ThumbsUp className="w-3 h-3" style={{ display: 'block', flexShrink: 0 }} />
                <span>{r.helpful} helpful</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Review Card ── */
function ReviewCard({ r, i }: { r: Review; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        whileHover={{ y: -6, transition: { duration: 0.18, ease: 'easeOut' } }}
        onClick={() => setOpen(true)}
        className="cursor-pointer h-full group"
      >
        <div className="h-full flex flex-col overflow-hidden rounded-2xl relative transition-all duration-250"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 1px 12px rgba(0,0,0,0.05)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.border = '1px solid rgba(0,0,0,0.16)';
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.border = '1px solid rgba(0,0,0,0.08)';
            e.currentTarget.style.boxShadow = '0 1px 12px rgba(0,0,0,0.05)';
          }}
        >
          {/* Top accent bar */}
          <div className={`h-[3px] bg-gradient-to-r ${r.color} flex-shrink-0`} />

          <div className="flex flex-col gap-3 p-4 flex-1">
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                <span className="text-white text-[10px] font-bold select-none">{r.initials}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="text-[12px] font-bold text-gray-900 truncate leading-tight">{r.name}</p>
                  {r.verified && <BadgeCheck className="w-3 h-3 text-blue-500 flex-shrink-0" style={{ display: 'block' }} />}
                </div>
                <p className="text-[10px] truncate leading-tight text-gray-400">{r.location}</p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-0.5">
                <Stars n={r.rating} />
                <span className="text-[9px] font-medium text-gray-400">{r.year}</span>
              </div>
            </div>

            {/* Service badge */}
            <div>
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full max-w-full text-gray-500"
                style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}>
                <span style={{ display: 'inline-block', flexShrink: 0 }}>{SERVICE_ICONS[r.service]}</span>
                <span className="truncate">{r.service}</span>
              </span>
            </div>

            {/* Text */}
            <p className="text-[11.5px] leading-[1.7] line-clamp-3 flex-1 text-gray-600">{r.text}</p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2.5 mt-auto"
              style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <span className="text-[9px] text-gray-400">{r.date}</span>
              <span className="text-[9px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 text-violet-500">
                Read full →
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <Modal r={r} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

/* ── Live Ticker ── */
function LiveTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % ALL.length), 1200);
    return () => clearInterval(t);
  }, []);
  const r = ALL[idx];
  return (
    <div className="relative rounded-2xl px-4 py-3.5 overflow-hidden flex items-center gap-3 min-h-[58px]"
      style={{ background: '#f9fafb', border: '1px solid rgba(0,0,0,0.08)' }}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.05), transparent)' }}
        animate={{ x: ['-120%', '220%'] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', repeatDelay: 1.8 }}
      />
      <div className="flex items-center gap-1.5 flex-shrink-0 z-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 hidden sm:block">Live</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={r.id}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="flex items-center gap-2.5 min-w-0 flex-1 z-10"
        >
          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center flex-shrink-0`}>
            <span className="text-white text-[9px] font-bold">{r.initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-gray-900">{r.name}</span>
              <Stars n={r.rating} />
              <span className="text-[9px] hidden sm:block truncate text-gray-400">· {r.location}</span>
            </div>
            <p className="text-[10px] truncate mt-px text-gray-500">{r.text.slice(0, 70)}…</p>
          </div>
          <span className="text-[9px] flex-shrink-0 hidden lg:block text-gray-400">{r.date}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Year Badge ── */
function YearBadge({ year, count }: { year: string; count: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full text-gray-500"
      style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}>
      <span className="font-bold text-gray-800">{year}</span>
      <span className="text-gray-300">·</span>
      <span>{count} reviews</span>
    </span>
  );
}

/* ── Stat Card ── */
function StatCard({ icon: Icon, value, suffix, label, color, delay }:
  { icon: React.ElementType; value: number; suffix: string; label: string; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.45 }}
      className="flex flex-col items-center gap-2"
    >
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
        <Icon className="w-5 h-5 text-white" style={{ display: 'block', flexShrink: 0 }} />
      </div>
      <p className="text-2xl sm:text-[2rem] font-black text-gray-900 leading-none tracking-tight tabular-nums">
        <Counter to={value} suffix={suffix} />
      </p>
      <p className="text-[10px] font-medium text-center text-gray-400">{label}</p>
    </motion.div>
  );
}

/* ── Pagination builder ── */
function buildPages(page: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i);
  const p: (number | '…')[] = [0];
  if (page > 2) p.push('…');
  for (let i = Math.max(1, page - 1); i <= Math.min(total - 2, page + 1); i++) p.push(i);
  if (page < total - 3) p.push('…');
  p.push(total - 1);
  return p;
}

/* ── Background ── */
function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* White base */}
      <div className="absolute inset-0 bg-white" />

      {/* Subtle ambient orbs */}
      <motion.div className="absolute rounded-full"
        style={{ width: 700, height: 700, left: '-15%', top: '-20%', background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 60%)' }}
        animate={{ x: [0, 35, 0], y: [0, 22, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute rounded-full"
        style={{ width: 600, height: 600, right: '-12%', bottom: '-18%', background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 60%)' }}
        animate={{ x: [0, -25, 0], y: [0, -18, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Fine dot grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(0,0,0,0.8) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />
    </div>
  );
}

/* ── Main Section ── */
export default function ReviewSection() {
  const [page, setPage] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const totalPages = Math.ceil(ALL.length / PER_PAGE);
  const pageReviews = ALL.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const yearDist = useMemo(() => {
    const m: Record<number, number> = {};
    ALL.forEach(r => { m[r.year] = (m[r.year] || 0) + 1; });
    return Object.entries(m).sort(([a], [b]) => +a - +b);
  }, []);

  const goTo = useCallback((p: number) => {
    setPage(p);
    setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }, []);

  return (
    <section ref={ref} className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Background />

      <div className="relative max-w-7xl mx-auto">

        {/* Label pill */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }} className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest text-gray-500"
            style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.09)' }}>
            <Sparkles className="w-3 h-3 text-amber-400" style={{ display: 'block', flexShrink: 0 }} />
            Client Reviews · Worldwide
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }} className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl md:text-[3.4rem] font-black text-gray-900 leading-[1.07] tracking-tight">
            Trusted by{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500">
                {ALL.length}+ Clients
              </span>
              <motion.span
                className="absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400"
                initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
            {' '}Around the World
          </h2>
          <p className="mt-4 text-sm sm:text-[15px] max-w-sm mx-auto leading-relaxed text-gray-500">
            Real stories. Measurable results. Click any card to read the full review.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-14 mb-9">
          <StatCard icon={Award}      value={500} suffix="+" label="Total Reviews"  color="from-violet-500 to-indigo-600" delay={0.14} />
          <StatCard icon={Star}       value={49}  suffix=""  label="Rating 4.9★"    color="from-amber-400 to-orange-500"  delay={0.19} />
          <StatCard icon={TrendingUp} value={98}  suffix="%" label="Satisfaction"   color="from-emerald-500 to-teal-600"  delay={0.24} />
          <StatCard icon={Zap}        value={10}  suffix="+" label="Services"       color="from-sky-500 to-blue-600"      delay={0.29} />
        </motion.div>

        {/* Year badges */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.18 }} className="flex flex-wrap justify-center gap-2 mb-6">
          {yearDist.map(([y, c]) => <YearBadge key={y} year={y} count={c} />)}
        </motion.div>

        {/* Live ticker */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.38 }} className="max-w-2xl mx-auto mb-9">
          <LiveTicker />
        </motion.div>

        {/* Review grid */}
        <AnimatePresence mode="wait">
          <motion.div key={page}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {pageReviews.map((r, i) => <ReviewCard key={r.id} r={r} i={i} />)}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1.5 mt-10">
          <button onClick={() => goTo(Math.max(0, page - 1))} disabled={page === 0}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-25 text-gray-600"
            style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)' }}>
            <ChevronLeft className="w-4 h-4" style={{ display: 'block', flexShrink: 0 }} />
          </button>

          <div className="flex items-center gap-1 mx-1">
            {buildPages(page, totalPages).map((p, i) =>
              p === '…' ? (
                <span key={`d${i}`} className="w-5 text-center text-xs select-none text-gray-400">…</span>
              ) : (
                <button key={p} onClick={() => goTo(p as number)}
                  className={`rounded-full text-[11px] font-bold transition-all duration-150 ${
                    p === page
                      ? 'w-9 h-9 bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-200'
                      : 'w-8 h-8 text-gray-500'
                  }`}
                  style={p !== page ? { background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' } : {}}>
                  {(p as number) + 1}
                </button>
              )
            )}
          </div>

          <button onClick={() => goTo(Math.min(totalPages - 1, page + 1))} disabled={page === totalPages - 1}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-25 text-gray-600"
            style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)' }}>
            <ChevronRight className="w-4 h-4" style={{ display: 'block', flexShrink: 0 }} />
          </button>
        </div>

        <p className="text-center text-[10px] mt-2 tabular-nums text-gray-400">
          Showing {page * PER_PAGE + 1}–{Math.min((page + 1) * PER_PAGE, ALL.length)} of {ALL.length} reviews
        </p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="mt-16 flex flex-col items-center gap-3">
          <div className="flex gap-0.5 items-center">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" style={{ display: 'block', flexShrink: 0 }} />)}
            <span className="ml-2 text-sm font-bold text-gray-900">4.9 average rating</span>
          </div>
          <p className="text-[13px] text-center max-w-xs text-gray-500">
            Join <span className="font-bold text-gray-900">500+ satisfied clients</span> who chose us for their digital growth.
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center" />
        </motion.div>

      </div>
    </section>
  );
}