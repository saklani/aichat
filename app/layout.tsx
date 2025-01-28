import type { Metadata } from "next";
import { Source_Code_Pro, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header/component";
import { Sidebar } from "@/components/sidebar/component";
import { use } from "react";
import { getSession } from "@/lib/session";

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
  const userData = use(getSession())

  return (
    <html lang="en">
      <body
        className={`flex flex-col bg-background h-[100vh] ${sourceCodePro.variable} ${geistMono.variable} antialiased`}
      >
        {userData ? <div className="flex w-full p-[4px]">
          <Sidebar />
          <div className="border rounded-[3px] flex flex-col w-full h-[calc(100vh-8px)] overflow-y-scroll">
            {children}
          </div>
        </div> :
          <div
            className={`flex flex-col bg-background min-h-[100vh] items-center justify-center`}
          >
            {children}
          </div>
        }
        <Toaster />
      </body>
    </html>
  );

}
