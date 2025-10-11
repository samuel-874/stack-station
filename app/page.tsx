import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Benefits } from "../components/Benefits";
import { Pricing } from "../components/Pricing";
import { Integration } from "../components/Integration";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Workspace Management Platform for Nigerian Co-working Spaces",
  description:
    "Stack-Station helps workspace owners manage time-based desk rentals, accept Paystack & DVA payments, track sessions, and reconcile daily sales. Try free for 14 days.",
  keywords: [
    "workspace management Nigeria",
    "co-working space management software",
    "desk booking system",
    "Paystack workspace integration",
    "DVA payments co-working",
    "Nigerian fintech workspace",
    "time-based desk rental",
    "workspace revenue management",
  ],
  openGraph: {
    title: "Stack-Station - Workspace Management Platform for Nigeria",
    description:
      "Manage desk rentals, accept payments, and reconcile sales for your co-working space. Integrated with Paystack and DVA for seamless transactions.",
    url: "https://stack-station.com",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Stack-Station Dashboard - Workspace Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stack-Station - Workspace Management Platform for Nigeria",
    description:
      "Manage desk rentals, accept payments, and reconcile sales for your co-working space. Try free for 14 days.",
  },
  alternates: {
    canonical: "/",
  },
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://stack-station.com/#organization",
      name: "Stack-Station",
      alternateName: "AppBakery LTD",
      url: "https://stack-station.com",
      logo: {
        "@type": "ImageObject",
        url: "https://stack-station.com/logo.png",
        width: 512,
        height: 512,
      },
      description:
        "Stack-Station provides workspace management software for Nigerian co-working spaces, enabling time-based desk rentals and payment processing.",
      foundingDate: "2024",
      founders: [
        {
          "@type": "Organization",
          name: "AppBakery LTD",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "support@stack-station.com",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://stack-station.com/#software",
      name: "Stack-Station",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser",
      description:
        "Workspace management platform for co-working spaces in Nigeria. Manage desk rentals, process payments via Paystack, and reconcile daily sales.",
      url: "https://stack-station.com",
      provider: {
        "@id": "https://stack-station.com/#organization",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Basic Plan",
          price: "8000",
          priceCurrency: "NGN",
          billingIncrement: "P1M",
          description:
            "For small workspaces. Up to 3 segments, time-based pricing, cash & card payments.",
        },
        {
          "@type": "Offer",
          name: "Standard Plan",
          price: "20000",
          priceCurrency: "NGN",
          billingIncrement: "P1M",
          description:
            "Best for growing workspaces. DVA support, automated reconciliation, shift reports.",
        },
      ],
      featureList: [
        "Time-based desk and room pricing",
        "Paystack payment integration",
        "Dedicated Virtual Account (DVA) support",
        "Session timer management",
        "Daily sales reconciliation",
        "Multi-segment workspace management",
        "Automated webhook processing",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://stack-station.com/#website",
      url: "https://stack-station.com",
      name: "Stack-Station",
      description:
        "Workspace management platform for Nigerian co-working spaces",
      publisher: {
        "@id": "https://stack-station.com/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://stack-station.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Services />
          <Benefits />
          <Pricing />
          <Integration />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
