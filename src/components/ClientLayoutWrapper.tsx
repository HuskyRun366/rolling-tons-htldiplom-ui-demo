"use client";

import { ReactNode } from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import Navbar from "./Navbar";

interface ClientLayoutWrapperProps {
  children: ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="flex min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-100 py-4">
            <div className="container mx-auto px-4">
              <p className="text-center text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} Rolling-Tons GmbH - HTL Diplomarbeit
              </p>
            </div>
          </footer>
        </div>
      </div>
    </FluentProvider>
  );
} 