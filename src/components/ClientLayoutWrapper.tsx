"use client";

import { ReactNode } from "react";
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