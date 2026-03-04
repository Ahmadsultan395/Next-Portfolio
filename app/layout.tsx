import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/pages/Header";
import { ThemeProvider } from "@/Components/pages/ThemeProvider";
import { ThemeGate } from "@/Components/pages/ThemeGate";
import BackgroundParticles from "@/Components/pages/BackgroundParticles";
import Footer from "@/Components/pages/Footer";
import ScrollToTop from "@/Components/pages/ScrollToTop";
import { Toaster } from "sonner";
import { AppProviders } from "@/context/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmad Sultan - Full Stack Developer",
  description:
    "Portfolio of Ahmad Sultan - Full Stack Developer specializing in React, Next.js, and Modern Web Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ThemeProvider>
          <ThemeGate>
            <BackgroundParticles />

            {/* Main Content */}
            <ScrollToTop />
            <div className="relative z-10">
              <AppProviders>
                <Header />
                <Toaster position="top-right" richColors />
                <main>{children}</main>
                <Footer />
              </AppProviders>
            </div>
          </ThemeGate>
        </ThemeProvider>
      </body>
    </html>
  );
}
