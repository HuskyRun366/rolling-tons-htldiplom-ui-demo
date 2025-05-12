import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FluentProviderWrapper from "@/components/FluentProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rolling-Tons Angebotssoftware",
  description: "Angebotssoftware für Rolling-Tons GmbH - HTL Diplomarbeit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <FluentProviderWrapper>
          <div className="flex h-screen">
            <Navbar />
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </div>
        </FluentProviderWrapper>
      </body>
    </html>
  );
}
