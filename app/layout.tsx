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
    "Terminal-style portfolio of João Gustavo Santiago de Lima — DevOps specializing in Cloud, Kubernetes, and CI/CD.",
  icons: { icon: "/aba.png" },
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
