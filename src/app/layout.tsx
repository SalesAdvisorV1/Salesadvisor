import type { Metadata } from "next";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sales Advisor",
  description: "Smart Prospect Finder pour commerciaux B2B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}