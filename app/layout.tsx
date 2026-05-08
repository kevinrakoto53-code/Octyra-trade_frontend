import type { Metadata } from "next";
import "./globals.css";
import { Geist, Lora, Roboto, Orbitron, Rajdhani } from "next/font/google";
import { cn } from "@/lib/utils";
import Loader from './components/Loader'
import PageLoader from './components/PageLoader'

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const lora     = Lora({     subsets: ["latin"], variable: "--font-lora"     });
const roboto   = Roboto({   subsets: ["latin"], variable: "--font-roboto",weight: ["400", "500", "700"]   });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", weight: ["400","600","700","900"] });
const rajdhani = Rajdhani({ subsets: ["latin"], variable: "--font-rajdhani", weight: ["300","400","500","600","700"] });

export const metadata: Metadata = {
  title: "OCTYRA — Intelligent Trading Evolved",
  description: "Empower your trading with advanced AI and real-time analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={cn(
            lora.variable,
            roboto.variable,
            orbitron.variable,
            rajdhani.variable
          , "font-sans", geist.variable)}>
      <body className="min-h-screen bg-black">
        <Loader />
        <PageLoader />
        {children}
      </body>
    </html>
  );
}