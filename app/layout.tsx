import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MorphingNavigation } from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neuromotiontech.com"),
  title: {
    default: "Neuromotion Tech — AI Automation, SaaS & Digital Solutions",
    template: "%s | Neuromotion Tech",
  },
  description:
    "Neuromotion Tech provides AI automation, SaaS development, web design, 3D animation, SEO, CRM portals, and business automation solutions for modern businesses worldwide.",
  applicationName: "Neuromotion Tech",
  keywords: [
    "AI automation services",
    "SaaS development company",
    "Web development agency",
    "3D animation services",
    "SEO services",
    "CRM portals",
    "Business automation",
    "Digital transformation",
    "Software house",
    "Tech startup solutions",
  ],
  authors: [{ name: "Neuromotion Tech", url: "https://neuromotiontech.com" }],
  creator: "Neuromotion Tech",
  publisher: "Neuromotion Tech",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neuromotiontech.com",
    siteName: "Neuromotion Tech",
    title: "Neuromotion Tech — AI Automation, SaaS & Digital Solutions",
    description:
      "Powering modern businesses with AI automation, SaaS development, web solutions, 3D animation, SEO, and CRM portals.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Neuromotion Tech — AI & SaaS Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neuromotion Tech — AI Automation, SaaS & Digital Solutions",
    description:
      "AI-powered SaaS, web development, 3D animation, SEO & business automation services.",
    images: ["/og-image.jpg"],
    creator: "@neuromotiontech",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black text-white`}
      >
        <div className="relative min-h-screen flex flex-col">
          <MorphingNavigation
            compactTop={20}
            links={[
              { id: "home",     label: "Home",     href: "/"             },
              { id: "services", label: "Services", href: "/services"     },
              { id: "about",    label: "About",    href: "/info/about"   },
              { id: "contact",  label: "Contact",  href: "/info/contact" },
            ]}
            serviceLinks={[
              { id: "3d-animation",            label: "3D Animation",            href: "/services/3d-animation"            },
              { id: "ai-agents",               label: "AI Agents",               href: "/services/ai-agents"               },
              { id: "ai-automation",           label: "AI Automation",           href: "/services/ai-automation"           },
              { id: "application-development", label: "Application Development", href: "/services/application-development" },
              { id: "business-consultation",   label: "Business Consultation",   href: "/services/business-consultation"   },
              { id: "cgi-ads",                 label: "CGI Ads",                 href: "/services/cgi-ads"                 },
              { id: "crm-portals",             label: "CRM & Portals",           href: "/services/crm-portals"             },
              { id: "product-photoshoot",      label: "Product Photoshoot",      href: "/services/product-photoshoot"      },
              { id: "seo",                     label: "SEO",                     href: "/services/seo"                     },
              { id: "social-media-marketing",  label: "Social Media Marketing",  href: "/services/social-media-marketing"  },
              { id: "web-designing",           label: "Web Designing",           href: "/services/web-designing"           },
              { id: "web-development",         label: "Web Development",         href: "/services/web-development"         },
            ]}
          />
          <main className="flex-grow pt-24 sm:pt-28">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}