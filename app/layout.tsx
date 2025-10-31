import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";
import { Providers } from "@/components/providers";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Stack-Station",
    default: "Stack-Station - Workspace Management & Revenue Platform",
  },
  description:
    "Manage time-based desk and room rentals with Stack-Station. Accept Paystack payments, track timed sessions, and reconcile daily sales for Nigerian co-working spaces.",
  keywords: [
    "workspace management",
    "co-working space software",
    "desk rental system",
    "Paystack integration",
    "DVA payments Nigeria",
    "time-based pricing",
    "session management",
    "workspace booking",
    "Nigeria fintech",
    "SaaS platform",
  ],
  authors: [{ name: "AppBakery LTD" }],
  creator: "AppBakery LTD",
  publisher: "AppBakery LTD",
  metadataBase: new URL("https://stack-station.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stack-station.com",
    title: "Stack-Station - Workspace Management & Revenue Platform",
    description:
      "Manage time-based desk and room rentals with Stack-Station. Accept Paystack payments, track timed sessions, and reconcile daily sales for Nigerian co-working spaces.",
    siteName: "Stack-Station",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stack-Station - Workspace Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stack-Station - Workspace Management & Revenue Platform",
    description:
      "Manage time-based desk and room rentals with Stack-Station. Accept Paystack payments, track timed sessions, and reconcile daily sales.",
    images: ["/og-image.png"],
    creator: "@stackstation",
  },
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
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1a3e3c" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Stack-Station" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//api.paystack.co" />
        <link rel="dns-prefetch" href="//js.paystack.co" />
      </head>
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
