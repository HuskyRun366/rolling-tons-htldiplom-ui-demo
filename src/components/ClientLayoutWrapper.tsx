"use client";

import { ReactNode, useEffect } from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { AngebotProvider } from "@/contexts/AngebotContext";
import { KundenProvider } from "@/contexts/KundenContext";
import { WizardProvider } from "@/contexts/WizardContext";
import { BahnhofProvider } from "@/contexts/BahnhofContext";
import { KostenkomponenteProvider } from "@/contexts/KostenkomponenteContext";
import { LieferantenProvider } from "@/contexts/LieferantenContext";
import { KonditionenProvider } from "@/contexts/KonditionenContext";
import Navbar from "./Navbar";
import Header from "./Header";

interface ClientLayoutWrapperProps {
  children: ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  // Force clear localStorage on component mount to ensure test data is used
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if we need to reload with fresh data
      const needsReload = sessionStorage.getItem('dataInitialized') !== 'true';
      
      if (needsReload) {
        console.log('Clearing localStorage to use test data');
        localStorage.clear();
        // Mark that we've initialized data
        sessionStorage.setItem('dataInitialized', 'true');
        // Set flag to force test data
        sessionStorage.setItem('forceTestData', 'true');
        // Force reload the page once to ensure all contexts reinitialize
        window.location.reload();
      }
    }
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      <AngebotProvider>
        <KundenProvider>
          <WizardProvider>
            <BahnhofProvider>
              <KostenkomponenteProvider>
                <LieferantenProvider>
                  <KonditionenProvider>
                    <div className="flex h-screen bg-gray-100">
                      <Navbar />
                      <div className="flex-1 flex flex-col overflow-hidden">
                        <Header />
                        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                          {children}
                        </main>
                      </div>
                    </div>
                  </KonditionenProvider>
                </LieferantenProvider>
              </KostenkomponenteProvider>
            </BahnhofProvider>
          </WizardProvider>
        </KundenProvider>
      </AngebotProvider>
    </FluentProvider>
  );
} 