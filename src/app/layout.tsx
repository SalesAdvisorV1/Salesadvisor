import type { Metadata, Viewport } from "next";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sales Advisor — Prospection B2B intelligente",
  description: "Sales Advisor combine recherche B2B et IA pour identifier, qualifier et approcher vos prospects en quelques secondes.",
  openGraph: {
    title: "Sales Advisor — Prospection B2B intelligente",
    description: "Sales Advisor combine recherche B2B et IA pour identifier, qualifier et approcher vos prospects en quelques secondes.",
    url: "http://72.62.185.69:3000",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Advisor — Prospection B2B intelligente",
    description: "Sales Advisor combine recherche B2B et IA pour identifier, qualifier et approcher vos prospects en quelques secondes.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {/* Animated mesh gradient background — fixed behind all content */}
        <div className="sa-mesh-bg" aria-hidden="true">
          <span className="sa-mesh-bg__blob sa-mesh-bg__blob--1" />
          <span className="sa-mesh-bg__blob sa-mesh-bg__blob--2" />
          <span className="sa-mesh-bg__blob sa-mesh-bg__blob--3" />
          <span className="sa-mesh-bg__blob sa-mesh-bg__blob--4" />
          <span className="sa-mesh-bg__blob sa-mesh-bg__blob--5" />
        </div>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
