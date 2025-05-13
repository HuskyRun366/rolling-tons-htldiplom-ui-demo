"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

export interface Kondition {
  id: string;
  name: string;
  beschreibung?: string;
  typ: 'Rabatt' | 'Aufschlag' | 'Sonderkonditionen' | 'Zahlungsbedingungen';
  wert: number; // z.B. 10 für 10% oder absolute Beträge
  istProzent: boolean; // true für Prozentsatz, false für absoluten Betrag
  kundeId?: string; // Optional: wenn für bestimmten Kunden
  gueltigVon: string; // ISO date string
  gueltigBis?: string; // ISO date string, optional
  status: 'aktiv' | 'inaktiv';
  erstelltAm?: string; // ISO date string
  geaendertAm?: string; // ISO date string
}

interface KonditionenContextType {
  konditionen: Kondition[];
  addKondition: (kondition: Omit<Kondition, 'id' | 'erstelltAm' | 'geaendertAm'>) => void;
  getKonditionById: (id: string) => Kondition | undefined;
  updateKondition: (id: string, updates: Partial<Omit<Kondition, 'id' | 'erstelltAm'>>) => void;
  deleteKondition: (id: string) => void;
}

const KonditionenContext = createContext<KonditionenContextType | undefined>(undefined);

const initialKonditionen: Kondition[] = [
  {
    id: uuidv4(),
    name: "Kondition 1",
    beschreibung: "Beschreibung für Kondition 1",
    typ: "Rabatt",
    wert: 5,
    istProzent: true,
    gueltigVon: "2025-01-01",
    gueltigBis: "2025-12-31",
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Kondition 2",
    beschreibung: "Beschreibung für Kondition 2",
    typ: "Rabatt",
    wert: 10,
    istProzent: true,
    gueltigVon: "2025-01-01",
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Kondition 3",
    beschreibung: "Beschreibung für Kondition 3",
    typ: "Aufschlag",
    wert: 8,
    istProzent: true,
    gueltigVon: "2025-01-01",
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Kondition 4",
    beschreibung: "Beschreibung für Kondition 4",
    typ: "Zahlungsbedingungen",
    wert: 30,
    istProzent: false,
    gueltigVon: "2025-01-01",
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  }
];

export const KonditionenProvider = ({ children }: { children: ReactNode }) => {
  const [konditionen, setKonditionen] = useState<Kondition[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('konditionen');
      return stored ? JSON.parse(stored) : initialKonditionen;
    }
    return initialKonditionen;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('konditionen', JSON.stringify(konditionen));
    }
  }, [konditionen]);

  const addKondition = (neu: Omit<Kondition, 'id' | 'erstelltAm' | 'geaendertAm'>) => {
    const neueKondition: Kondition = {
      ...neu,
      id: uuidv4(),
      erstelltAm: new Date().toISOString(),
      geaendertAm: new Date().toISOString(),
    };
    setKonditionen(prev => [...prev, neueKondition]);
  };

  const getKonditionById = (id: string) => {
    return konditionen.find(k => k.id === id);
  };

  const updateKondition = (id: string, updates: Partial<Omit<Kondition, 'id' | 'erstelltAm'>>) => {
    setKonditionen(prev =>
      prev.map(k =>
        k.id === id
          ? { ...k, ...updates, geaendertAm: new Date().toISOString() }
          : k
      )
    );
  };

  const deleteKondition = (id: string) => {
    setKonditionen(prev => prev.filter(k => k.id !== id));
  };

  return (
    <KonditionenContext.Provider value={{ konditionen, addKondition, getKonditionById, updateKondition, deleteKondition }}>
      {children}
    </KonditionenContext.Provider>
  );
};

export const useKonditionen = () => {
  const context = useContext(KonditionenContext);
  if (context === undefined) {
    throw new Error('useKonditionen must be used within a KonditionenProvider');
  }
  return context;
}; 