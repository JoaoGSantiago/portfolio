import type { Metadata } from "next";
import { Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "João Gustavo | DevOps",
  description:
    "DevOps and Cloud specialist focused on scalable infrastructure, automation and SRE.",
  icons: { icon: "/aba.png" },
  openGraph: {
    title: "João Gustavo | DevOps & Cloud",
    description:
      "DevOps and Cloud specialist focused on scalable infrastructure, automation and SRE.",
    url: "https://joaogsantiago.vercel.app",
    siteName: "João Gustavo · Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "João Gustavo | DevOps & Cloud",
    description:
      "DevOps and Cloud specialist focused on scalable infrastructure, automation and SRE.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", geistMono.variable, "font-sans", geist.variable)}>
      <body className="h-full">{children}</body>
    </html>
  );
}
