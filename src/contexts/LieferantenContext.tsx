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
    name: "DB Netz AG",
    typ: "Lieferant",
    kontaktperson: "Max Mustermann",
    telefon: "+49 69 123456789",
    email: "max.mustermann@dbnetze.de",
    adresse: "Theodor-Heuss-Allee 7",
    plz: "60486",
    ort: "Frankfurt am Main",
    land: "Deutschland",
    umsatzsteuerID: "DE123456789",
    bemerkung: "Hauptlieferant für Trassennutzung in Deutschland",
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "ÖBB Infrastruktur AG",
    typ: "Lieferant",
    kontaktperson: "Anna Beispiel",
    telefon: "+43 1 987654321",
    email: "anna.beispiel@oebb.at",
    adresse: "Praterstern 3",
    plz: "1020",
    ort: "Wien",
    land: "Österreich",
    umsatzsteuerID: "ATU12345678",
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Expert Rail Services GmbH",
    typ: "Partner",
    kontaktperson: "Thomas Berater",
    telefon: "+49 30 123456789",
    email: "t.berater@expertrs.de",
    adresse: "Bahnhofsplatz 5",
    plz: "10557",
    ort: "Berlin",
    land: "Deutschland",
    umsatzsteuerID: "DE987654321",
    bemerkung: "Beratungspartner für Trassenplanung",
    status: "aktiv",
    erstelltAm: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Alpenlogistik AG",
    typ: "Partner",
    kontaktperson: "Michael Berg",
    telefon: "+41 44 12345678",
    email: "m.berg@alpenlogistik.ch",
    adresse: "Bahnhofstrasse 42",
    plz: "8001",
    ort: "Zürich",
    land: "Schweiz",
    umsatzsteuerID: "CH123456789",
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