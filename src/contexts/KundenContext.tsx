"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Kunden Typen
export interface Kunde {
  id: string;
  name: string;
  ansprechpartner: string[]; // Liste von Ansprechpartner-Namen
  // Weitere Kundeninformationen hier (Adresse, Kontaktdaten etc.)
}

// Beispiel-Kunden für Demo-Zwecke
const initialKunden: Kunde[] = [
  {
    id: 'kunde-001',
    name: 'Kunde 1 GmbH',
    ansprechpartner: ['Max Mustermann', 'Anna Schmidt']
  },
  {
    id: 'kunde-002',
    name: 'Kunde 2 AG',
    ansprechpartner: ['Erika Musterfrau', 'Thomas Beispiel']
  },
  {
    id: 'kunde-003',
    name: 'Kunde 3 KG',
    ansprechpartner: ['Peter Test']
  },
  {
    id: 'kunde-004',
    name: 'Kunde 4 GmbH & Co. KG',
    ansprechpartner: ['Klaus Modell', 'Sarah Beispiel']
  },
  {
    id: 'kunde-005',
    name: 'Kunde 5 AG',
    ansprechpartner: ['Lisa Demo']
  },
  {
    id: 'kunde-006',
    name: 'Kunde 6 Handel',
    ansprechpartner: ['Michael Probe']
  }
];

// Context Interface
interface KundenContextType {
  kunden: Kunde[];
  getKundeById: (id: string) => Kunde | undefined;
  addKunde: (kunde: Omit<Kunde, 'id'>) => Kunde;
  updateKunde: (id: string, kundeData: Partial<Omit<Kunde, 'id'>>) => Kunde | undefined;
  deleteKunde: (id: string) => void;
}

// Erstellen des Context
const KundenContext = createContext<KundenContextType | undefined>(undefined);

// Provider Komponente
export function KundenProvider({ children }: { children: ReactNode }) {
  const [kunden, setKunden] = useState<Kunde[]>(() => {
    if (typeof window !== 'undefined') {
      const savedKunden = localStorage.getItem('kunden');
      return savedKunden ? JSON.parse(savedKunden) : initialKunden;
    }
    return initialKunden;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kunden', JSON.stringify(kunden));
    }
  }, [kunden]);

  const getKundeById = (id: string) => {
    return kunden.find(kunde => kunde.id === id);
  };

  const addKunde = (kundeData: Omit<Kunde, 'id'>) => {
    const nextId = `kunde-${String(kunden.length + 1).padStart(3, '0')}`;
    const newKunde: Kunde = {
      id: nextId,
      ...kundeData
    };
    setKunden(prevKunden => [...prevKunden, newKunde]);
    return newKunde;
  };

  const updateKunde = (id: string, kundeData: Partial<Omit<Kunde, 'id'>>) => {
    let updatedKunde: Kunde | undefined = undefined;
    setKunden(prevKunden =>
      prevKunden.map(kunde => {
        if (kunde.id === id) {
          updatedKunde = { ...kunde, ...kundeData };
          return updatedKunde;
        }
        return kunde;
      })
    );
    return updatedKunde;
  };

  const deleteKunde = (id: string) => {
    setKunden(prevKunden => prevKunden.filter(kunde => kunde.id !== id));
  };

  return (
    <KundenContext.Provider
      value={{
        kunden,
        getKundeById,
        addKunde,
        updateKunde,
        deleteKunde
      }}
    >
      {children}
    </KundenContext.Provider>
  );
}

// Custom Hook für einfachen Zugriff
export function useKunden() {
  const context = useContext(KundenContext);
  if (context === undefined) {
    throw new Error('useKunden must be used within a KundenProvider');
  }
  return context;
} 