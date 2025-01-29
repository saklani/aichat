import type { Metadata } from "next";
import { Source_Code_Pro, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header/component";
import { Sidebar } from "@/components/sidebar/component";
import { use } from "react";
import { getSession } from "@/lib/session";
import { Layout } from "@/components/layout";

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
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
  return (
    <html lang="en">
      <body
        className={`flex flex-col bg-background h-[100vh] ${sourceCodePro.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>
          {children}
        </Layout>
        <Toaster />
      </body>
    </html>
  );

}
