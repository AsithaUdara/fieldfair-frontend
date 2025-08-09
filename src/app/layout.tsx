// File Location: src/app/layout.tsx (Updated)

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { PopupProvider } from "@/providers/popup-provider";
import { LoadingProvider } from "@/providers/loading-provider";
import PopupContainer from '@/components/ui/popup/popup-container';
import { AuthProvider } from '@/providers/auth-provider'; 

// --- NEW IMPORTS FOR TOASTIFY ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <AuthProvider>
        <LoadingProvider>
          <PopupProvider>
            {/* Your main application content will be rendered here */}
            {children}
            
            {/* The popup container for modals */}
            <PopupContainer />
            
            {/* --- NEWLY ADDED TOAST CONTAINER --- */}
            {/* This component is now available to the entire application */}
            <ToastContainer
              position="top-right"      // Position of the toast notifications
              autoClose={5000}          // Toasts will close automatically after 5 seconds
              hideProgressBar={false}   // Show a progress bar for the duration
              newestOnTop={false}       // New toasts will appear below older ones
              closeOnClick              // Toasts can be closed by clicking them
              rtl={false}               // Right-to-left layout is disabled
              pauseOnFocusLoss          // Pause the timer when the window loses focus
              draggable                 // Toasts can be dragged
              pauseOnHover              // Pause the timer when hovering over a toast
              theme="light"             // Use the light theme for toasts
            />
          </PopupProvider>
        </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}