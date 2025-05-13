import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from 'next/dynamic';
import "./globals.css";
import { ReactNode } from "react";

// Typdefinition für die Props des ClientLayoutWrappers
interface ClientLayoutWrapperProps {
  children: ReactNode;
}

// Dynamischer Import für den Client-Layout-Wrapper mit deaktiviertem SSR
const ClientLayoutWrapper = dynamic<ClientLayoutWrapperProps>(
  () => import('@/components/ClientLayoutWrapper'),
  { ssr: false }
);

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
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
