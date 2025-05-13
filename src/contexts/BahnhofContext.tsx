"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the railway station type
export interface Bahnhof {
  id: string;
  name: string;
  bahnhofId: string;
  land: string;
  region: string;
  status: 'aktiv' | 'inaktiv';
}

// Context interface
interface BahnhofContextType {
  bahnhoefe: Bahnhof[];
  getBahnhofById: (id: string) => Bahnhof | undefined;
  addBahnhof: (bahnhof: Omit<Bahnhof, 'id'>) => Bahnhof;
  updateBahnhof: (id: string, updates: Partial<Bahnhof>) => boolean;
  deleteBahnhof: (id: string) => boolean;
}

// Create the context
const BahnhofContext = createContext<BahnhofContextType | undefined>(undefined);

// Sample data for railway stations
const initialBahnhoefe: Bahnhof[] = [
  {
    id: '1',
    name: 'Wien Hauptbahnhof',
    bahnhofId: 'ATWI001',
    land: 'Österreich',
    region: 'Wien',
    status: 'aktiv'
  },
  {
    id: '2',
    name: 'München Hauptbahnhof',
    bahnhofId: 'DEMH001',
    land: 'Deutschland',
    region: 'Bayern',
    status: 'aktiv'
  },
  {
    id: '3',
    name: 'Berlin Hauptbahnhof',
    bahnhofId: 'DEBE001',
    land: 'Deutschland',
    region: 'Berlin',
    status: 'aktiv'
  },
  {
    id: '4',
    name: 'Zürich Hauptbahnhof',
    bahnhofId: 'CHZH001',
    land: 'Schweiz',
    region: 'Zürich',
    status: 'aktiv'
  },
  {
    id: '5',
    name: 'Budapest Keleti',
    bahnhofId: 'HUBK001',
    land: 'Ungarn',
    region: 'Budapest',
    status: 'aktiv'
  },
  {
    id: '6',
    name: 'Salzburg Hauptbahnhof',
    bahnhofId: 'ATSZ001',
    land: 'Österreich',
    region: 'Salzburg',
    status: 'aktiv'
  },
  {
    id: '7',
    name: 'Hamburg Hauptbahnhof',
    bahnhofId: 'DEHH001',
    land: 'Deutschland',
    region: 'Hamburg',
    status: 'aktiv'
  }
];

// Provider component
export const BahnhofProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Initialize state with sample data
  const [bahnhoefe, setBahnhoefe] = useState<Bahnhof[]>(initialBahnhoefe);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedBahnhoefe = localStorage.getItem('bahnhoefe');
    if (storedBahnhoefe) {
      setBahnhoefe(JSON.parse(storedBahnhoefe));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('bahnhoefe', JSON.stringify(bahnhoefe));
  }, [bahnhoefe]);

  // Get a railway station by ID
  const getBahnhofById = (id: string): Bahnhof | undefined => {
    return bahnhoefe.find(bahnhof => bahnhof.id === id);
  };

  // Add a new railway station
  const addBahnhof = (bahnhof: Omit<Bahnhof, 'id'>): Bahnhof => {
    const newBahnhof = {
      ...bahnhof,
      id: Date.now().toString(), // Generate a simple ID
    };
    
    setBahnhoefe(prev => [...prev, newBahnhof]);
    return newBahnhof;
  };

  // Update a railway station
  const updateBahnhof = (id: string, updates: Partial<Bahnhof>): boolean => {
    const index = bahnhoefe.findIndex(b => b.id === id);
    
    if (index === -1) return false;
    
    const updatedBahnhoefe = [...bahnhoefe];
    updatedBahnhoefe[index] = { ...updatedBahnhoefe[index], ...updates };
    
    setBahnhoefe(updatedBahnhoefe);
    return true;
  };

  // Delete a railway station
  const deleteBahnhof = (id: string): boolean => {
    const index = bahnhoefe.findIndex(b => b.id === id);
    
    if (index === -1) return false;
    
    setBahnhoefe(prev => prev.filter(bahnhof => bahnhof.id !== id));
    return true;
  };

  // Context value
  const value = {
    bahnhoefe,
    getBahnhofById,
    addBahnhof,
    updateBahnhof,
    deleteBahnhof
  };

  return (
    <BahnhofContext.Provider value={value}>
      {children}
    </BahnhofContext.Provider>
  );
};

// Custom hook to use the context
export const useBahnhoefe = (): BahnhofContextType => {
  const context = useContext(BahnhofContext);
  
  if (context === undefined) {
    throw new Error('useBahnhoefe must be used within a BahnhofProvider');
  }
  
  return context;
}; 