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
    name: 'Bahnhof A',
    bahnhofId: 'BHA001',
    land: 'Land 1',
    region: 'Region A',
    status: 'aktiv'
  },
  {
    id: '2',
    name: 'Bahnhof B',
    bahnhofId: 'BHB001',
    land: 'Land 1',
    region: 'Region B',
    status: 'aktiv'
  },
  {
    id: '3',
    name: 'Bahnhof C',
    bahnhofId: 'BHC001',
    land: 'Land 2',
    region: 'Region C',
    status: 'aktiv'
  },
  {
    id: '4',
    name: 'Bahnhof D',
    bahnhofId: 'BHD001',
    land: 'Land 2',
    region: 'Region D',
    status: 'aktiv'
  },
  {
    id: '5',
    name: 'Bahnhof E',
    bahnhofId: 'BHE001',
    land: 'Land 3',
    region: 'Region E',
    status: 'aktiv'
  },
  {
    id: '6',
    name: 'Bahnhof F',
    bahnhofId: 'BHF001',
    land: 'Land 3',
    region: 'Region F',
    status: 'aktiv'
  },
  {
    id: '7',
    name: 'Bahnhof G',
    bahnhofId: 'BHG001',
    land: 'Land 4',
    region: 'Region G',
    status: 'aktiv'
  },
  {
    id: '8',
    name: 'Bahnhof H',
    bahnhofId: 'BHH001',
    land: 'Land 4',
    region: 'Region H',
    status: 'aktiv'
  },
  {
    id: '9',
    name: 'Bahnhof I',
    bahnhofId: 'BHI001',
    land: 'Land 5',
    region: 'Region I',
    status: 'aktiv'
  },
  {
    id: '10',
    name: 'Bahnhof J',
    bahnhofId: 'BHJ001',
    land: 'Land 5',
    region: 'Region J',
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