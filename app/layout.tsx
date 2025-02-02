import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "AI Search",
  description: "AI Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col bg-background h-[100vh] ${inter.variable}  antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );

}
