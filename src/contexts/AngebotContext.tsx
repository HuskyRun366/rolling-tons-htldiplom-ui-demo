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
    id: 'ang-2025-001',
    nummer: 'ANG-2025-001',
    kunde: 'Kunde 1 GmbH',
    ansprechpartner: 'Max Mustermann',
    route: 'Bahnhof A - Bahnhof B',
    erstelldatum: '01.06.2025',
    summe: '€10.000',
    status: 'offen',
    transportgut: 'Testware 1',
    menge: '20 Tonnen',
    abfahrt: '10.06.2025, 08:00',
    ankunft: '11.06.2025, 16:00',
    gueltigBis: '01.07.2025'
  },
  {
    id: 'ang-2025-002',
    nummer: 'ANG-2025-002',
    kunde: 'Kunde 2 AG',
    ansprechpartner: 'Erika Musterfrau',
    route: 'Bahnhof C - Bahnhof D',
    erstelldatum: '02.06.2025',
    summe: '€8.500',
    status: 'angenommen',
    transportgut: 'Testware 2',
    menge: '15 Tonnen',
    abfahrt: '15.06.2025, 10:00',
    ankunft: '15.06.2025, 18:00',
    gueltigBis: '02.07.2025'
  },
  {
    id: 'ang-2025-003',
    nummer: 'ANG-2025-003',
    kunde: 'Kunde 3 KG',
    ansprechpartner: 'Peter Test',
    route: 'Bahnhof E - Bahnhof F',
    erstelldatum: '03.06.2025',
    summe: '€7.500',
    status: 'offen',
    transportgut: 'Testware 3',
    menge: '12 Tonnen',
    abfahrt: '20.06.2025, 07:00',
    ankunft: '20.06.2025, 15:00',
    gueltigBis: '03.07.2025'
  },
  {
    id: 'ang-2025-004',
    nummer: 'ANG-2025-004',
    kunde: 'Kunde 4 GmbH & Co. KG',
    ansprechpartner: 'Klaus Modell',
    route: 'Bahnhof G - Bahnhof H',
    erstelldatum: '04.06.2025',
    summe: '€6.000',
    status: 'abgelehnt',
    transportgut: 'Testware 4',
    menge: '10 Tonnen',
    abfahrt: '25.06.2025, 09:00',
    ankunft: '25.06.2025, 17:00',
    gueltigBis: '04.07.2025' 
  },
  {
    id: 'ang-2025-005',
    nummer: 'ANG-2025-005',
    kunde: 'Kunde 5 AG',
    ansprechpartner: 'Lisa Demo',
    route: 'Bahnhof I - Bahnhof J',
    erstelldatum: '05.06.2025',
    summe: '€15.000',
    status: 'angenommen',
    transportgut: 'Testware 5',
    menge: '30 Tonnen',
    abfahrt: '30.06.2025, 06:00',
    ankunft: '01.07.2025, 14:00',
    gueltigBis: '05.07.2025'
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
    console.log("[AngebotContext] Attempting to delete Angebot with ID:", id);
    const initialCount = angebote.length;
    
    // Get the angebot to delete first
    const angebotToDelete = angebote.find(a => {
      const idMatches = a.id.toLowerCase() === id.toLowerCase();
      console.log(`Comparing ${a.id} with ${id}: ${idMatches ? "match" : "no match"}`);
      return idMatches;
    });
    
    if (!angebotToDelete) {
      console.error("[AngebotContext] No angebot found with ID:", id);
      console.log("Available angebote IDs:", angebote.map(a => `${a.id} (${a.nummer})`));
      return; // Exit early if angebot not found
    }
    
    console.log("[AngebotContext] Found angebot to delete:", angebotToDelete.nummer);
    
    // Now filter out the angebot using both ID and nummer for extra certainty
    const newAngebote = angebote.filter(angebot => {
      return angebot.id.toLowerCase() !== id.toLowerCase() && 
             angebot.nummer !== angebotToDelete.nummer;
    });
    
    console.log("[AngebotContext] Angebote count before delete:", initialCount, "After filter:", newAngebote.length);
    
    if (initialCount === newAngebote.length) {
      console.warn("[AngebotContext] Delete failed: Filter produced same length array");
      return; // Exit if filter didn't remove anything
    }
    
    // Set the new state and log the result
    console.log("[AngebotContext] Setting new angebote array after deletion");
    setAngebote(newAngebote);
    
    // Force update localStorage immediately to ensure persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('angebote', JSON.stringify(newAngebote));
      console.log("[AngebotContext] Updated localStorage after deletion");
    }
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