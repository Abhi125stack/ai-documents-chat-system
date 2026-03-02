import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Document Chat System",
  description: "Chat with your documents using AI",
  icons: {
    icon: "/icon.svg",
  },
};

import { LayoutProps } from "@/types";

export default function RootLayout({
  children,
}: LayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
