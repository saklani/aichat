import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";
import Providers from './providers';
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: "Sable",
  description: "AI chats in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col bg-gradient-to-b from-gray-25 to-gray-50 h-[100vh] ${lato.variable} subpixel-antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );

}
