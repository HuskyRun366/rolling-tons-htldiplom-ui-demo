"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

export interface Kostenkomponente {
  id: string;
  name: string; // e.g., "Trassenpreis DB Netz", "Lokmiete BR 185"
  beschreibung?: string;
  typ: 'Trassenpreis' | 'Lokomotivkosten' | 'Personalkosten' | 'Energiekosten' | 'Waggonkosten' | 'Sonstiges';
  betrag: number; // The monetary value
  einheit: string; // e.g., "km", "Stunde", "kWh", "Tag"
  waehrung: string; // e.g., "EUR"
  gueltigVon: string; // ISO date string, e.g., "2023-01-01"
  gueltigBis?: string; // ISO date string, optional
  version: number;
  status: 'aktiv' | 'inaktiv';
  erstelltAm?: string; // ISO date string
  geaendertAm?: string; // ISO date string
  // Potentially: bezugsgroesse (e.g., Land, Netz, Loktyp, Personal-Skill)
  // Potentially: lieferantId (if cost component is tied to a specific supplier)
}

interface KostenkomponenteContextType {
  kostenkomponenten: Kostenkomponente[];
  addKostenkomponente: (kostenkomponente: Omit<Kostenkomponente, 'id' | 'version' | 'erstelltAm' | 'geaendertAm'>) => void;
  getKostenkomponenteById: (id: string) => Kostenkomponente | undefined;
  updateKostenkomponente: (id: string, updates: Partial<Omit<Kostenkomponente, 'id' | 'version' | 'erstelltAm'>>) => void;
  deleteKostenkomponente: (id: string) => void;
  // getKostenkomponentenByType: (typ: Kostenkomponente['typ']) => Kostenkomponente[]; // Example for future expansion
}

const KostenkomponenteContext = createContext<KostenkomponenteContextType | undefined>(undefined);

const initialKostenkomponenten: Kostenkomponente[] = [
  {
    id: uuidv4(),
    name: "Kostenkomponente 1",
    typ: "Trassenpreis",
    betrag: 5.00,
    einheit: "km",
    waehrung: "EUR",
    gueltigVon: "2025-01-01",
    version: 1,
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Kostenkomponente 2",
    typ: "Lokomotivkosten",
    betrag: 100.00,
    einheit: "Stunde",
    waehrung: "EUR",
    gueltigVon: "2025-01-01",
    gueltigBis: "2025-12-31",
    version: 1,
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Kostenkomponente 3",
    typ: "Personalkosten",
    betrag: 80.00,
    einheit: "Stunde",
    waehrung: "EUR",
    gueltigVon: "2025-01-01",
    version: 1,
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Kostenkomponente 4",
    typ: "Energiekosten",
    betrag: 0.20,
    einheit: "kWh",
    waehrung: "EUR",
    gueltigVon: "2025-01-01",
    version: 1,
    status: "aktiv", 
    erstelltAm: new Date().toISOString(),
  }
];

export const KostenkomponenteProvider = ({ children }: { children: ReactNode }) => {
  const [kostenkomponenten, setKostenkomponenten] = useState<Kostenkomponente[]>(() => {
    if (typeof window !== 'undefined') {
      // Check if we need to force test data
      const forceTestData = sessionStorage.getItem('forceTestData') === 'true';
      if (forceTestData) {
        localStorage.setItem('kostenkomponenten', JSON.stringify(initialKostenkomponenten));
        return initialKostenkomponenten;
      }
      
      const stored = localStorage.getItem('kostenkomponenten');
      return stored ? JSON.parse(stored) : initialKostenkomponenten;
    }
    return initialKostenkomponenten;
  });

  // First time initialization - save test data if nothing exists
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('kostenkomponenten')) {
      localStorage.setItem('kostenkomponenten', JSON.stringify(initialKostenkomponenten));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kostenkomponenten', JSON.stringify(kostenkomponenten));
    }
  }, [kostenkomponenten]);

  const addKostenkomponente = (neu: Omit<Kostenkomponente, 'id' | 'version' | 'erstelltAm' | 'geaendertAm'>) => {
    const neueKomponente: Kostenkomponente = {
      ...neu,
      id: uuidv4(),
      version: 1,
      erstelltAm: new Date().toISOString(),
      geaendertAm: new Date().toISOString(),
    };
    setKostenkomponenten(prev => [...prev, neueKomponente]);
  };

  const getKostenkomponenteById = (id: string) => {
    return kostenkomponenten.find(k => k.id === id);
  };

  const updateKostenkomponente = (id: string, updates: Partial<Omit<Kostenkomponente, 'id' | 'version' | 'erstelltAm'>>) => {
    setKostenkomponenten(prev =>
      prev.map(k =>
        k.id === id
          ? { ...k, ...updates, version: k.version + 1, geaendertAm: new Date().toISOString() }
          : k
      )
    );
  };

  const deleteKostenkomponente = (id: string) => {
    setKostenkomponenten(prev => prev.filter(k => k.id !== id));
  };

  return (
    <KostenkomponenteContext.Provider value={{ kostenkomponenten, addKostenkomponente, getKostenkomponenteById, updateKostenkomponente, deleteKostenkomponente }}>
      {children}
    </KostenkomponenteContext.Provider>
  );
};

export const useKostenkomponenten = () => {
  const context = useContext(KostenkomponenteContext);
  if (context === undefined) {
    throw new Error('useKostenkomponenten must be used within a KostenkomponenteProvider');
  }
  return context;
}; 