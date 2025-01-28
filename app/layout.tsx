import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header/component";
import { Sidebar } from "@/components/sidebar/component";
import { use } from "react";
import { getSession } from "@/lib/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Search",
  description: "AI Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = use(getSession())
  if (userData) {
    return (
      <html lang="en">
        <body
          className={`flex flex-col bg-background h-[100vh] ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex w-full p-[4px]">
            <Sidebar />
            <div className="border rounded-[3px] flex flex-col w-full h-[calc(100vh-8px)] overflow-y-scroll">
              {children}
            </div>
          </div>
          <Toaster />
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body
          className={`flex flex-col bg-background min-h-[100vh] ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    );
  }
}
