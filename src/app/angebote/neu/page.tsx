"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Button, 
  Title2, 
  Card,
  Input,
  Textarea,
  Checkbox,
  SpinButton,
  Slider,
  Radio,
  RadioGroup,
  Label,
  Field
} from "@fluentui/react-components";
import { 
  ArrowLeftRegular,
  ArrowRightRegular,
  SaveRegular,
  DocumentSaveRegular
} from "@fluentui/react-icons";

// Stark vereinfachte Dropdown-Komponente für bessere Kompatibilität
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

// Vereinfachter DatePicker
const SimpleDateInput = ({ placeholder }: { placeholder: string }) => (
  <Input type="date" placeholder={placeholder} />
);

export default function NeuesAngebot() {
  const router = useRouter();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedContact, setSelectedContact] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  
  // Kunden-Optionen
  const customerOptions = [
    { value: "rath", label: "R.A.T.H. Logistik GmbH" },
    { value: "wiener", label: "Wiener Transport AG" },
    { value: "alpen", label: "Alpen Cargo" },
    { value: "oebb", label: "ÖBB Rail Cargo" },
    { value: "swiss", label: "Swiss Rail Solutions" },
    { value: "db", label: "Deutsche Bahn Cargo" }
  ];
  
  // Ansprechpartner-Optionen
  const contactOptions = [
    { value: "wagner", label: "Dr. Hans Wagner" },
    { value: "schmid", label: "DI Peter Schmid" }
  ];
  
  // Einheiten-Optionen
  const unitOptions = [
    { value: "t", label: "Tonnen" },
    { value: "kg", label: "Kilogramm" },
    { value: "containers", label: "Container" },
    { value: "wagons", label: "Waggons" }
  ];
  
  // Weiterleitung zum nächsten Schritt
  const goToNextStep = () => {
    // Hier könnten Validierungen stattfinden
    
    // Weiterleitung zur Route-Seite (die wir noch erstellen werden)
    // In einer richtigen Anwendung würden wir die Daten über einen Context oder Redux speichern
    router.push("/angebote/neu/route");
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          <span>Dashboard</span> &gt; <span>Angebote</span> &gt; <span>Neues Angebot</span>
        </div>
        <Title2>Neues Angebot erstellen</Title2>
      </div>

      <Card className="mb-6">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="flex flex-col items-center w-24">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">1</div>
                <span className="mt-2 text-sm">Grunddaten</span>
              </div>
              <div className="border-t-2 border-blue-600 w-16 mt-4"></div>
              <div className="flex flex-col items-center w-24">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">2</div>
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
              <Field label="Kunde auswählen" required>
                <SimpleDropdown 
                  options={customerOptions} 
                  placeholder="Kunden suchen..." 
                  value={selectedCustomer} 
                  onChange={setSelectedCustomer}
                />
              </Field>
              
              <Field label="Ansprechpartner" className="mt-4">
                <SimpleDropdown 
                  options={contactOptions} 
                  placeholder="Ansprechpartner auswählen" 
                  value={selectedContact} 
                  onChange={setSelectedContact}
                />
              </Field>
              
              <Field label="Angebotsnr." className="mt-4">
                <Input readOnly value="ANG-2025-043" disabled />
              </Field>
              
              <Field label="Gültigkeitsdauer" className="mt-4">
                <div className="flex space-x-4">
                  <div className="w-1/2 pr-4">
                    <Label>Von</Label>
                    <SimpleDateInput placeholder="Datum wählen" />
                  </div>
                  <div className="w-1/2">
                    <Label>Bis</Label>
                    <SimpleDateInput placeholder="Datum wählen" />
                  </div>
                </div>
              </Field>
              
              <Field label="Projekt/Referenz" className="mt-4">
                <Input placeholder="z.B. Jahresprojekt 2025" />
              </Field>
              
              <Field label="Vertragsart" className="mt-4">
                <RadioGroup>
                  <Radio value="single" label="Einzelangebot" />
                  <Radio value="framework" label="Rahmenvertrag" />
                  <Radio value="expansion" label="Ergänzung zu bestehendem Vertrag" />
                </RadioGroup>
              </Field>
            </div>
            
            <div>
              <Field label="Transportgut" required>
                <Input placeholder="Beschreibung des Transportgutes" />
              </Field>
              
              <Field label="Gewicht/Menge" required className="mt-4">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <SpinButton defaultValue={0} min={0} max={1000} step={0.5} />
                  </div>
                  <div className="w-1/2">
                    <SimpleDropdown 
                      options={unitOptions} 
                      placeholder="Einheit wählen" 
                      value={selectedUnit} 
                      onChange={setSelectedUnit}
                    />
                  </div>
                </div>
              </Field>
              
              <Field label="Priorität" className="mt-4">
                <Slider 
                  min={1} 
                  max={5} 
                  step={1} 
                  defaultValue={3}
                />
              </Field>
              
              <Field label="Bemerkungen/Hinweise" className="mt-4">
                <Textarea placeholder="Interne Bemerkungen zum Angebot" />
              </Field>
              
              <div className="mt-4">
                <Field>
                  <Checkbox label="Leerfahrt in Kalkulation berücksichtigen" />
                </Field>
                <Field>
                  <Checkbox label="Rückfahrt anbieten" />
                </Field>
                <Field>
                  <Checkbox label="Expresszuschlag" />
                </Field>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <Link href="/angebote">
              <Button icon={<ArrowLeftRegular />}>Zurück zur Übersicht</Button>
            </Link>
            <div className="flex items-center">
              <Button appearance="primary" onClick={goToNextStep}>
                Weiter zur Route
                <ArrowRightRegular className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 