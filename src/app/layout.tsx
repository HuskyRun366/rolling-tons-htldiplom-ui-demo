import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FluentProvider from "@/components/layout/FluentProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rolling-Tons Angebots-Software",
  description: "Angebots-Software für die Rolling-Tons GmbH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <FluentProvider>
          {children}
        </FluentProvider>
      </body>
    </html>
  );
}
