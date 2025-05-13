"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Typen für die Wizard-Schritte
export interface GrunddatenState {
  kunde: string;
  ansprechpartner: string;
  transportgut: string;
  menge: string;
  einheit: string;
  gueltigBis: string;
  projekt: string;
  vertragsart: string;
  prioritaet: number;
  bemerkungen: string;
  leerfahrt: boolean;
  rueckfahrt: boolean;
  express: boolean;
}

export interface RouteState {
  startbahnhof: string;
  zielbahnhof: string;
  abfahrt: string;
  ankunft: string;
}

export interface KalkulationState {
  kostenkomponenten: Array<{
    bezeichnung: string;
    preis: number;
    menge: number;
    gesamt: number;
  }>;
  rabatt: number;
  marge: number;
  expresszuschlag: number;
  bearbeitungsgebuehr: number;
  gesamtkosten: number;
  nettopreis: number;
  bruttosumme: number;
}

export interface WizardState {
  angebotsnummer: string;
  grunddaten: GrunddatenState;
  route: RouteState;
  kalkulation: KalkulationState;
}

// Standardwerte
const defaultGrunddaten: GrunddatenState = {
  kunde: "Kunde 1 GmbH",
  ansprechpartner: "Max Mustermann",
  transportgut: "Testware 1",
  menge: "20",
  einheit: "t",
  gueltigBis: "01.07.2025",
  projekt: "Testprojekt 1",
  vertragsart: "single",
  prioritaet: 3,
  bemerkungen: "Dies ist ein Test für Mockups",
  leerfahrt: false,
  rueckfahrt: false,
  express: false
};

const defaultRoute: RouteState = {
  startbahnhof: "Bahnhof A",
  zielbahnhof: "Bahnhof B",
  abfahrt: "10.06.2025, 08:00",
  ankunft: "11.06.2025, 16:00"
};

const defaultKalkulation: KalkulationState = {
  kostenkomponenten: [
    { bezeichnung: "Kostenkomponente 1", preis: 5000, menge: 1, gesamt: 5000 },
    { bezeichnung: "Kostenkomponente 2", preis: 2000, menge: 1, gesamt: 2000 },
    { bezeichnung: "Kostenkomponente 3", preis: 1000, menge: 2, gesamt: 2000 }
  ],
  rabatt: 5,
  marge: 15,
  expresszuschlag: 0,
  bearbeitungsgebuehr: 100,
  gesamtkosten: 9000,
  nettopreis: 8600,
  bruttosumme: 10000
};

// Interface für den Context
interface WizardContextType {
  wizard: WizardState;
  updateGrunddaten: (data: Partial<GrunddatenState>) => void;
  updateRoute: (data: Partial<RouteState>) => void;
  updateKalkulation: (data: Partial<KalkulationState>) => void;
  resetWizard: () => void;
}

// Context erstellen
const WizardContext = createContext<WizardContextType | undefined>(undefined);

// Provider Komponente
export function WizardProvider({ children }: { children: ReactNode }) {
  const [wizard, setWizard] = useState<WizardState>({
    angebotsnummer: "ANG-2025-001", // In einer echten App würde dies dynamisch generiert
    grunddaten: defaultGrunddaten,
    route: defaultRoute,
    kalkulation: defaultKalkulation
  });

  // Grunddaten aktualisieren
  const updateGrunddaten = (data: Partial<GrunddatenState>) => {
    setWizard(prev => ({
      ...prev,
      grunddaten: {
        ...prev.grunddaten,
        ...data
      }
    }));
  };

  // Route aktualisieren
  const updateRoute = (data: Partial<RouteState>) => {
    setWizard(prev => ({
      ...prev,
      route: {
        ...prev.route,
        ...data
      }
    }));
  };

  // Kalkulation aktualisieren
  const updateKalkulation = (data: Partial<KalkulationState>) => {
    setWizard(prev => ({
      ...prev,
      kalkulation: {
        ...prev.kalkulation,
        ...data
      }
    }));
  };

  // Wizard zurücksetzen
  const resetWizard = () => {
    setWizard({
      angebotsnummer: `ANG-2025-00${Math.floor(Math.random() * 9) + 1}`,
      grunddaten: defaultGrunddaten,
      route: defaultRoute,
      kalkulation: defaultKalkulation
    });
  };

  return (
    <WizardContext.Provider
      value={{
        wizard,
        updateGrunddaten,
        updateRoute,
        updateKalkulation,
        resetWizard
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

// Custom Hook für einfachen Zugriff
export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
} 