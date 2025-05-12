"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Angebot Typen
export interface Angebot {
  id: string;
  nummer: string;
  kunde: string;
  ansprechpartner: string;
  route: string;
  erstelldatum: string;
  summe: string;
  status: 'offen' | 'angenommen' | 'abgelehnt' | 'storniert';
  transportgut?: string;
  menge?: string;
  abfahrt?: string;
  ankunft?: string;
  gueltigBis?: string;
}

// Beispiel-Angebote für Demo-Zwecke
const initialAngebote: Angebot[] = [
  {
    id: 'ang-2025-042',
    nummer: 'ANG-2025-042',
    kunde: 'R.A.T.H. Logistik GmbH',
    ansprechpartner: 'Dr. Hans Wagner',
    route: 'Wien - Hamburg',
    erstelldatum: '04.05.2025',
    summe: '€12.450',
    status: 'offen',
    transportgut: 'Stahl-Coils',
    menge: '24 Tonnen',
    abfahrt: '15.05.2025, 08:30',
    ankunft: '16.05.2025, 14:30',
    gueltigBis: '04.06.2025'
  },
  {
    id: 'ang-2025-041',
    nummer: 'ANG-2025-041',
    kunde: 'Wiener Transport AG',
    ansprechpartner: 'DI Maria Schmid',
    route: 'München - Wien',
    erstelldatum: '02.05.2025',
    summe: '€9.870',
    status: 'angenommen',
    transportgut: 'Maschinenteile',
    menge: '18 Tonnen',
    abfahrt: '12.05.2025, 10:00',
    ankunft: '12.05.2025, 22:15',
    gueltigBis: '02.06.2025'
  },
  {
    id: 'ang-2025-040',
    nummer: 'ANG-2025-040',
    kunde: 'Alpen Cargo',
    ansprechpartner: 'Josef Müller',
    route: 'Salzburg - München',
    erstelldatum: '30.04.2025',
    summe: '€7.230',
    status: 'offen',
    transportgut: 'Papierrollen',
    menge: '15 Tonnen',
    abfahrt: '10.05.2025, 07:45',
    ankunft: '10.05.2025, 14:30',
    gueltigBis: '30.05.2025'
  },
  {
    id: 'ang-2025-039',
    nummer: 'ANG-2025-039',
    kunde: 'ÖBB Rail Cargo',
    ansprechpartner: 'Thomas Bauer',
    route: 'Wien - Budapest',
    erstelldatum: '28.04.2025',
    summe: '€5.600',
    status: 'abgelehnt',
    transportgut: 'Elektronikartikel',
    menge: '8 Tonnen',
    abfahrt: '05.05.2025, 09:00',
    ankunft: '05.05.2025, 17:30',
    gueltigBis: '28.05.2025' 
  },
  {
    id: 'ang-2025-038',
    nummer: 'ANG-2025-038',
    kunde: 'Swiss Rail Solutions',
    ansprechpartner: 'Martina Weber',
    route: 'Zürich - Wien',
    erstelldatum: '25.04.2025',
    summe: '€18.320',
    status: 'angenommen',
    transportgut: 'Automobilteile',
    menge: '32 Tonnen',
    abfahrt: '08.05.2025, 06:00',
    ankunft: '09.05.2025, 12:45',
    gueltigBis: '25.05.2025'
  }
];

// Context Interface
interface AngebotContextType {
  angebote: Angebot[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  addAngebot: (angebot: Omit<Angebot, 'id' | 'nummer'>) => void;
  updateAngebot: (id: string, angebot: Partial<Angebot>) => void;
  deleteAngebot: (id: string) => void;
  getAngebotById: (id: string) => Angebot | undefined;
  setPage: (page: number) => void;
}

// Erstellen des Context
const AngebotContext = createContext<AngebotContextType | undefined>(undefined);

// Provider Komponente
export function AngebotProvider({ children }: { children: ReactNode }) {
  // Angebote aus localStorage laden, falls vorhanden
  const [angebote, setAngebote] = useState<Angebot[]>(() => {
    if (typeof window !== 'undefined') {
      const savedAngebote = localStorage.getItem('angebote');
      return savedAngebote ? JSON.parse(savedAngebote) : initialAngebote;
    }
    return initialAngebote;
  });
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Änderungen in localStorage speichern
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('angebote', JSON.stringify(angebote));
    }
  }, [angebote]);
  
  // Neues Angebot hinzufügen
  const addAngebot = (angebotData: Omit<Angebot, 'id' | 'nummer'>) => {
    const nextNumber = angebote.length > 0 
      ? `ANG-2025-${String(parseInt(angebote[0].nummer.split('-')[2]) + 1).padStart(3, '0')}`
      : 'ANG-2025-001';
    
    const id = nextNumber.toLowerCase().replace(/\s+/g, '-');
    
    const newAngebot: Angebot = {
      id,
      nummer: nextNumber,
      ...angebotData
    };
    
    setAngebote([newAngebot, ...angebote]);
    return newAngebot;
  };
  
  // Angebot aktualisieren
  const updateAngebot = (id: string, angebotData: Partial<Angebot>) => {
    setAngebote(
      angebote.map(angebot => 
        angebot.id === id ? { ...angebot, ...angebotData } : angebot
      )
    );
  };
  
  // Angebot löschen
  const deleteAngebot = (id: string) => {
    setAngebote(angebote.filter(angebot => angebot.id !== id));
  };
  
  // Angebot nach ID suchen
  const getAngebotById = (id: string) => {
    return angebote.find(angebot => angebot.id === id);
  };
  
  // Seite wechseln
  const setPage = (page: number) => {
    if (page > 0 && page <= Math.ceil(angebote.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };
  
  return (
    <AngebotContext.Provider
      value={{
        angebote,
        currentPage,
        itemsPerPage,
        totalPages: Math.ceil(angebote.length / itemsPerPage),
        addAngebot,
        updateAngebot,
        deleteAngebot,
        getAngebotById,
        setPage
      }}
    >
      {children}
    </AngebotContext.Provider>
  );
}

// Custom Hook für einfachen Zugriff
export function useAngebote() {
  const context = useContext(AngebotContext);
  if (context === undefined) {
    throw new Error('useAngebote must be used within an AngebotProvider');
  }
  return context;
} 