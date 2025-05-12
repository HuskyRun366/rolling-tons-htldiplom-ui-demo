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
  kunde: "",
  ansprechpartner: "",
  transportgut: "",
  menge: "0",
  einheit: "t",
  gueltigBis: "",
  projekt: "",
  vertragsart: "single",
  prioritaet: 3,
  bemerkungen: "",
  leerfahrt: false,
  rueckfahrt: false,
  express: false
};

const defaultRoute: RouteState = {
  startbahnhof: "",
  zielbahnhof: "",
  abfahrt: "",
  ankunft: ""
};

const defaultKalkulation: KalkulationState = {
  kostenkomponenten: [
    { bezeichnung: "Bahnnutzung", preis: 0, menge: 1, gesamt: 0 }
  ],
  rabatt: 0,
  marge: 15,
  expresszuschlag: 0,
  bearbeitungsgebuehr: 0,
  gesamtkosten: 0,
  nettopreis: 0,
  bruttosumme: 0
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
    angebotsnummer: "ANG-2025-043", // In einer echten App würde dies dynamisch generiert
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
      angebotsnummer: `ANG-2025-${Math.floor(Math.random() * 900) + 100}`,
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