// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { PopupProvider } from "@/providers/popup-provider";
import { LoadingProvider } from "@/providers/loading-provider";
import PopupContainer from '@/components/ui/popup/popup-container';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "FieldFair - Farm to Table Marketplace",
  description: "Connecting farmers and consumers with fresh, traceable produce and AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased font-inter`}
      >
        <LoadingProvider>
          <PopupProvider>
            {children}
            <PopupContainer />
          </PopupProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}