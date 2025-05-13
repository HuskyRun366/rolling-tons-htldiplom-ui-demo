"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

export interface Lieferant {
  id: string;
  name: string;
  typ: 'Lieferant' | 'Partner';
  kontaktperson: string;
  telefon: string;
  email: string;
  adresse: string;
  plz: string;
  ort: string;
  land: string;
  umsatzsteuerID: string;
  bemerkung?: string;
  status: 'aktiv' | 'inaktiv';
  erstelltAm?: string;
  geaendertAm?: string;
}

interface LieferantenContextType {
  lieferanten: Lieferant[];
  addLieferant: (lieferant: Omit<Lieferant, 'id' | 'erstelltAm' | 'geaendertAm'>) => void;
  getLieferantById: (id: string) => Lieferant | undefined;
  updateLieferant: (id: string, updates: Partial<Omit<Lieferant, 'id' | 'erstelltAm'>>) => void;
  deleteLieferant: (id: string) => void;
}

const LieferantenContext = createContext<LieferantenContextType | undefined>(undefined);

const initialLieferanten: Lieferant[] = [
  {
    id: uuidv4(),
    name: "Lieferant 1 AG",
    typ: "Lieferant",
    kontaktperson: "Kontakt Person 1",
    telefon: "+49 123 456789",
    email: "kontakt1@lieferant1.com",
    adresse: "Teststraße 1",
    plz: "10000",
    ort: "Teststadt 1",
    land: "Land 1",
    umsatzsteuerID: "L1123456789",
    bemerkung: "Hauptlieferant für Testzwecke",
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Lieferant 2 AG",
    typ: "Lieferant",
    kontaktperson: "Kontakt Person 2",
    telefon: "+43 123 456789",
    email: "kontakt2@lieferant2.com",
    adresse: "Teststraße 2",
    plz: "20000",
    ort: "Teststadt 2",
    land: "Land 2",
    umsatzsteuerID: "L2123456789",
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Partner 1 GmbH",
    typ: "Partner",
    kontaktperson: "Kontakt Person 3",
    telefon: "+49 987 654321",
    email: "kontakt3@partner1.com",
    adresse: "Teststraße 3",
    plz: "30000",
    ort: "Teststadt 3",
    land: "Land 1",
    umsatzsteuerID: "P1987654321",
    bemerkung: "Partner für Testzwecke",
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Partner 2 AG",
    typ: "Partner",
    kontaktperson: "Kontakt Person 4",
    telefon: "+41 987 654321",
    email: "kontakt4@partner2.com",
    adresse: "Teststraße 4",
    plz: "40000",
    ort: "Teststadt 4",
    land: "Land 3",
    umsatzsteuerID: "P2987654321",
    status: "inaktiv",
    erstelltAm: new Date().toISOString(),
  },
];

export const LieferantenProvider = ({ children }: { children: ReactNode }) => {
  const [lieferanten, setLieferanten] = useState<Lieferant[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lieferanten');
      return stored ? JSON.parse(stored) : initialLieferanten;
    }
    return initialLieferanten;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lieferanten', JSON.stringify(lieferanten));
    }
  }, [lieferanten]);

  const addLieferant = (neu: Omit<Lieferant, 'id' | 'erstelltAm' | 'geaendertAm'>) => {
    const neuerLieferant: Lieferant = {
      ...neu,
      id: uuidv4(),
      erstelltAm: new Date().toISOString(),
      geaendertAm: new Date().toISOString(),
    };
    setLieferanten(prev => [...prev, neuerLieferant]);
  };

  const getLieferantById = (id: string) => {
    return lieferanten.find(l => l.id === id);
  };

  const updateLieferant = (id: string, updates: Partial<Omit<Lieferant, 'id' | 'erstelltAm'>>) => {
    setLieferanten(prev =>
      prev.map(l =>
        l.id === id
          ? { ...l, ...updates, geaendertAm: new Date().toISOString() }
          : l
      )
    );
  };

  const deleteLieferant = (id: string) => {
    setLieferanten(prev => prev.filter(l => l.id !== id));
  };

  return (
    <LieferantenContext.Provider value={{ lieferanten, addLieferant, getLieferantById, updateLieferant, deleteLieferant }}>
      {children}
    </LieferantenContext.Provider>
  );
};

export const useLieferanten = () => {
  const context = useContext(LieferantenContext);
  if (context === undefined) {
    throw new Error('useLieferanten must be used within a LieferantenProvider');
  }
  return context;
}; 