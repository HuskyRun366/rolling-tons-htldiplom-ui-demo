"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Button,
  Title2,
  Card,
  Field,
  Input,
  SpinButton,
  Label,
} from "@fluentui/react-components";
import { 
  ArrowLeftRegular, 
  ArrowRightRegular,
  SaveRegular,
  DocumentSaveRegular
} from "@fluentui/react-icons";

// Einfache Dropdown-Komponente für Bahnhöfe
function SimpleDropdown({ 
  options, 
  placeholder, 
  value, 
  onChange 
}: { 
  options: {value: string, label: string}[], 
  placeholder: string, 
  value: string, 
  onChange: (value: string) => void 
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative w-full">
      <div 
        className="border rounded p-2 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value ? options.find(opt => opt.value === value)?.label : placeholder}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="absolute left-0 top-full w-full border rounded mt-1 bg-white z-10 max-h-60 overflow-y-auto">
          {options.map(option => (
            <div 
              key={option.value}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RouteAngebot() {
  const router = useRouter();
  const [startBahnhof, setStartBahnhof] = useState("");
  const [zielBahnhof, setZielBahnhof] = useState("");
  
  // Bahnhöfe-Optionen
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
  
  // Navigation zum vorherigen Schritt
  const goToPreviousStep = () => {
    router.push("/angebote/neu");
  };
  
  // Navigation zum nächsten Schritt
  const goToNextStep = () => {
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
              <Field label="Startbahnhof" required>
                <SimpleDropdown 
                  options={bahnhofOptions} 
                  placeholder="Startbahnhof auswählen..." 
                  value={startBahnhof} 
                  onChange={setStartBahnhof}
                />
              </Field>
              
              <Field label="Zielbahnhof" className="mt-4" required>
                <SimpleDropdown 
                  options={bahnhofOptions} 
                  placeholder="Zielbahnhof auswählen..." 
                  value={zielBahnhof} 
                  onChange={setZielBahnhof}
                />
              </Field>
              
              <Field label="Entfernung (km)" className="mt-4">
                <Input readOnly value={startBahnhof && zielBahnhof ? "450" : ""} disabled />
              </Field>
            </div>
            
            <div>
              <Field label="Abfahrtsdatum" required>
                <Input type="date" />
              </Field>
              
              <Field label="Abfahrtszeit" className="mt-4">
                <Input type="time" />
              </Field>
              
              <Field label="Fahrzeit (Stunden)" className="mt-4">
                <SpinButton defaultValue={8} min={1} max={72} step={0.5} />
              </Field>
              
              <Field label="Ankunftsdatum" className="mt-4">
                <Input type="date" />
              </Field>
              
              <Field label="Ankunftszeit" className="mt-4">
                <Input type="time" />
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