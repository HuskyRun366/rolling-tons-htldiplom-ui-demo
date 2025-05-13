"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Button,
  Title2,
  Card,
  Field,
  Input,
  SpinButton,
  Label,
  Dropdown,
  Option,
} from "@fluentui/react-components";
import { 
  ArrowLeftRegular, 
  ArrowRightRegular,
  SaveRegular,
  DocumentSaveRegular
} from "@fluentui/react-icons";
import { useWizard } from "@/contexts/WizardContext";

export default function RouteAngebot() {
  const router = useRouter();
  const { wizard, updateRoute } = useWizard();
  
  // Bahnhöfe-Optionen - VOR useState verschoben
  const bahnhofOptions = [
    { value: "wien", label: "Wien Hauptbahnhof" },
    { value: "graz", label: "Graz Hauptbahnhof" },
    { value: "linz", label: "Linz Hauptbahnhof" },
    { value: "salzburg", label: "Salzburg Hauptbahnhof" },
    { value: "innsbruck", label: "Innsbruck Hauptbahnhof" },
    { value: "hamburg", label: "Hamburg Hbf" },
    { value: "berlin", label: "Berlin Hbf" },
    { value: "muenchen", label: "München Hbf" }
  ];
  
  // Lokale Zustandsvariablen für Formulardaten
  const [startBahnhofValue, setStartBahnhofValue] = useState(() => {
    // Suchen des Bahnhofs in den Optionen basierend auf dem gespeicherten Wert
    const savedBahnhof = wizard.route.startbahnhof;
    if (!savedBahnhof) return "";
    
    const option = bahnhofOptions.find(opt => opt.label === savedBahnhof);
    return option ? option.value : "";
  });
  
  const [zielBahnhofValue, setZielBahnhofValue] = useState(() => {
    const savedBahnhof = wizard.route.zielbahnhof;
    if (!savedBahnhof) return "";
    
    const option = bahnhofOptions.find(opt => opt.label === savedBahnhof);
    return option ? option.value : "";
  });
  
  const [abfahrtsdatum, setAbfahrtsdatum] = useState(() => {
    // Extrahiere das Datum aus dem savedAbfahrt-String, falls vorhanden
    if (wizard.route.abfahrt) {
      const parts = wizard.route.abfahrt.split(', ');
      if (parts.length > 0) {
        const dateParts = parts[0].split('.');
        if (dateParts.length === 3) {
          return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        }
      }
    }
    return "";
  });
  
  const [abfahrtszeit, setAbfahrtszeit] = useState(() => {
    // Extrahiere die Zeit aus dem savedAbfahrt-String, falls vorhanden
    if (wizard.route.abfahrt) {
      const parts = wizard.route.abfahrt.split(', ');
      if (parts.length > 1) {
        return parts[1];
      }
    }
    return "";
  });
  
  const [ankunftsdatum, setAnkunftsdatum] = useState(() => {
    if (wizard.route.ankunft) {
      const parts = wizard.route.ankunft.split(', ');
      if (parts.length > 0) {
        const dateParts = parts[0].split('.');
        if (dateParts.length === 3) {
          return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        }
      }
    }
    return "";
  });
  
  const [ankunftszeit, setAnkunftszeit] = useState(() => {
    if (wizard.route.ankunft) {
      const parts = wizard.route.ankunft.split(', ');
      if (parts.length > 1) {
        return parts[1];
      }
    }
    return "";
  });
  
  const [fahrzeit, setFahrzeit] = useState(8);
  
  // Aktualisiere den WizardContext mit aktuellen Daten (separiert für besseres Callback-Handling)
  const updateContext = useCallback(() => {
    const startbahnhof = startBahnhofValue ? 
      bahnhofOptions.find(opt => opt.value === startBahnhofValue)?.label || "" : "";
    
    const zielbahnhof = zielBahnhofValue ? 
      bahnhofOptions.find(opt => opt.value === zielBahnhofValue)?.label || "" : "";
    
    // Formatiere Abfahrt und Ankunft im Format "DD.MM.YYYY, HH:MM"
    let abfahrt = "";
    if (abfahrtsdatum) {
      const dateParts = abfahrtsdatum.split('-');
      const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
      abfahrt = abfahrtszeit ? `${formattedDate}, ${abfahrtszeit}` : formattedDate;
    }
    
    let ankunft = "";
    if (ankunftsdatum) {
      const dateParts = ankunftsdatum.split('-');
      const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
      ankunft = ankunftszeit ? `${formattedDate}, ${ankunftszeit}` : formattedDate;
    }
    
    updateRoute({
      startbahnhof,
      zielbahnhof,
      abfahrt,
      ankunft
    });
  }, [startBahnhofValue, zielBahnhofValue, abfahrtsdatum, abfahrtszeit, ankunftsdatum, ankunftszeit, updateRoute, bahnhofOptions]);
  
  // Aktualisiere den WizardContext, wenn sich die Routendaten ändern
  useEffect(() => {
    updateContext();
  }, [updateContext]);
  
  // Berechne Ankunftszeit, wenn Abfahrtszeit und Fahrzeit eingegeben wurden
  useEffect(() => {
    if (abfahrtsdatum && abfahrtszeit && fahrzeit) {
      const abfahrtDateTime = new Date(`${abfahrtsdatum}T${abfahrtszeit}`);
      const ankunftDateTime = new Date(abfahrtDateTime.getTime() + fahrzeit * 60 * 60 * 1000);
      
      // Formatiere Datum und Zeit für die Ankunft
      const ankunftDate = ankunftDateTime.toISOString().split('T')[0];
      const hours = ankunftDateTime.getHours().toString().padStart(2, '0');
      const minutes = ankunftDateTime.getMinutes().toString().padStart(2, '0');
      const ankunftTime = `${hours}:${minutes}`;
      
      setAnkunftsdatum(ankunftDate);
      setAnkunftszeit(ankunftTime);
    }
  }, [abfahrtsdatum, abfahrtszeit, fahrzeit]);
  
  // Navigation zum vorherigen Schritt
  const goToPreviousStep = () => {
    // Sicherstellen, dass der Kontext gespeichert ist
    updateContext();
    // Sanfte Navigation mit Next.js Router
    router.push("/angebote/neu");
  };
  
  // Navigation zum nächsten Schritt
  const goToNextStep = () => {
    // Sicherstellen, dass der Kontext gespeichert ist
    updateContext();
    // Sanfte Navigation mit Next.js Router
    router.push("/angebote/neu/kalkulation");
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          <span>Dashboard</span> &gt; <span>Angebote</span> &gt; <span>Neues Angebot</span> &gt; <span>Route</span>
        </div>
        <Title2>Route festlegen</Title2>
      </div>

      <Card className="mb-6">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="flex flex-col items-center w-24">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">1</div>
                <span className="mt-2 text-sm">Grunddaten</span>
              </div>
              <div className="border-t-2 border-blue-600 w-16 mt-4"></div>
              <div className="flex flex-col items-center w-24">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">2</div>
                <span className="mt-2 text-sm">Route</span>
              </div>
              <div className="border-t-2 border-gray-200 w-16 mt-4"></div>
              <div className="flex flex-col items-center w-24">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">3</div>
                <span className="mt-2 text-sm">Kalkulation</span>
              </div>
              <div className="border-t-2 border-gray-200 w-16 mt-4"></div>
              <div className="flex flex-col items-center w-24">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">4</div>
                <span className="mt-2 text-sm">Abschluss</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button icon={<SaveRegular />}>Zwischenspeichern</Button>
              <Button appearance="primary" icon={<DocumentSaveRegular />}>Angebot erstellen</Button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Field label="Startbahnhof *" className="mb-4">
                <select
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  value={startBahnhofValue}
                  onChange={(e) => setStartBahnhofValue(e.target.value)}
                >
                  <option value="">Startbahnhof auswählen...</option>
                  {bahnhofOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              
              <Field label="Zielbahnhof *" className="mb-4">
                <select
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  value={zielBahnhofValue}
                  onChange={(e) => setZielBahnhofValue(e.target.value)}
                >
                  <option value="">Zielbahnhof auswählen...</option>
                  {bahnhofOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              
              <Field label="Entfernung (km)" className="mb-4">
                <Input type="number" placeholder="Wird automatisch berechnet" disabled />
              </Field>
            </div>
            
            <div>
              <Field label="Abfahrtsdatum *" className="mb-4">
                <Input 
                  type="date" 
                  value={abfahrtsdatum} 
                  onChange={(e) => setAbfahrtsdatum(e.target.value)} 
                />
              </Field>
              
              <Field label="Abfahrtszeit" className="mb-4">
                <Input 
                  type="time" 
                  value={abfahrtszeit} 
                  onChange={(e) => setAbfahrtszeit(e.target.value)} 
                />
              </Field>
              
              <Field label="Fahrzeit (Stunden)" className="mb-4">
                <SpinButton 
                  value={fahrzeit}
                  onChange={(_, data) => setFahrzeit(data.value || 0)}
                  min={0}
                  step={1}
                />
              </Field>

              <Field label="Ankunftsdatum" className="mb-4">
                <Input type="date" value={ankunftsdatum} disabled />
              </Field>

              <Field label="Ankunftszeit" className="mb-4">
                <Input type="time" value={ankunftszeit} disabled />
              </Field>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <Button icon={<ArrowLeftRegular />} onClick={goToPreviousStep}>
              Zurück zu Grunddaten
            </Button>
            <Button appearance="primary" onClick={goToNextStep}>
              Weiter zur Kalkulation
              <ArrowRightRegular className="ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 