import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ProductOS - Ship Products 10x Faster with AI",
  description: "World's first AI-native product platform. Ship products in 3-12 days with AI agents that preserve context from ideation to deployment.",
  keywords: ["AI", "product development", "startup", "MVP", "code generation"],
  openGraph: {
    title: "ProductOS - Ship Products 10x Faster with AI",
    description: "World's first AI-native product platform.",
    url: "https://productos.dev",
    siteName: "ProductOS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
