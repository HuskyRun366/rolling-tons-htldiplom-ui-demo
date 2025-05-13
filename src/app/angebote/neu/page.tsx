"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Button, 
  Title2, 
  Card,
  Input,
  Textarea,
  Checkbox,
  SpinButton,
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
import { useWizard } from "@/contexts/WizardContext";

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
const SimpleDateInput = ({ 
  placeholder, 
  value, 
  onChange 
}: { 
  placeholder: string, 
  value: string, 
  onChange: (value: string) => void 
}) => (
  <Input 
    type="date" 
    placeholder={placeholder} 
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default function NeuesAngebot() {
  const router = useRouter();
  const { wizard, updateGrunddaten } = useWizard();
  
  // Lokaler Zustand für Formularelemente
  const [selectedCustomer, setSelectedCustomer] = useState(wizard.grunddaten.kunde);
  const [selectedContact, setSelectedContact] = useState(wizard.grunddaten.ansprechpartner);
  const [transportgut, setTransportgut] = useState(wizard.grunddaten.transportgut);
  const [menge, setMenge] = useState(wizard.grunddaten.menge);
  const [selectedUnit, setSelectedUnit] = useState(wizard.grunddaten.einheit);
  const [gueltigBis, setGueltigBis] = useState(wizard.grunddaten.gueltigBis);
  const [projekt, setProjekt] = useState(wizard.grunddaten.projekt);
  const [vertragsart, setVertragsart] = useState(wizard.grunddaten.vertragsart);
  const [bemerkungen, setBemerkungen] = useState(wizard.grunddaten.bemerkungen);
  const [leerfahrt, setLeerfahrt] = useState(wizard.grunddaten.leerfahrt);
  const [rueckfahrt, setRueckfahrt] = useState(wizard.grunddaten.rueckfahrt);
  const [express, setExpress] = useState(wizard.grunddaten.express);
  
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
  
  // Kontext aktualisieren
  const updateContext = useCallback(() => {
    updateGrunddaten({
      kunde: selectedCustomer ? customerOptions.find(opt => opt.value === selectedCustomer)?.label || "" : "",
      ansprechpartner: selectedContact ? contactOptions.find(opt => opt.value === selectedContact)?.label || "" : "",
      transportgut,
      menge,
      einheit: selectedUnit,
      gueltigBis,
      projekt,
      vertragsart,
      bemerkungen,
      leerfahrt,
      rueckfahrt,
      express
    });
  }, [
    selectedCustomer, selectedContact, transportgut, menge, selectedUnit,
    gueltigBis, projekt, vertragsart, bemerkungen,
    leerfahrt, rueckfahrt, express, updateGrunddaten, customerOptions, contactOptions
  ]);
  
  // Speichere Änderungen im Context, wenn sich Formularfelder ändern
  /*
  useEffect(() => {
    updateContext();
  }, [updateContext]);
  */
  
  // Weiterleitung zum nächsten Schritt
  const goToNextStep = () => {
    // Kontext explizit aktualisieren, um sicherzustellen, dass die neuesten Daten gespeichert sind
    updateContext();
    // Sanfte Navigation mit Next.js Router
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
                <select
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                  <option value="">Kunden suchen...</option>
                  {customerOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              
              <Field label="Ansprechpartner" className="mt-4">
                <select
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  value={selectedContact}
                  onChange={(e) => setSelectedContact(e.target.value)}
                >
                  <option value="">Ansprechpartner auswählen</option>
                  {contactOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              
              <Field label="Angebotsnr." className="mt-4">
                <Input readOnly value={wizard.angebotsnummer} disabled />
              </Field>
              
              <Field label="Gültigkeitsdauer" className="mt-4">
                <div className="flex space-x-4">
                  <div className="w-1/2 pr-4">
                    <Label className="mb-2">Von</Label>
                    <div className="mt-1">
                      <Input type="date" disabled value={new Date().toISOString().split('T')[0]} />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <Label className="mb-2">Bis</Label>
                    <div className="mt-1">
                      <SimpleDateInput 
                        placeholder="Datum wählen" 
                        value={gueltigBis} 
                        onChange={setGueltigBis}
                      />
                    </div>
                  </div>
                </div>
              </Field>
              
              <Field label="Projektbezeichnung / Referenz" className="mt-4">
                <Input placeholder="Optional" value={projekt} onChange={(e) => setProjekt(e.target.value)} />
              </Field>
              
              <Field label="Vertragsart" className="mt-4">
                <RadioGroup value={vertragsart} onChange={(_,data) => setVertragsart(data.value)} layout="horizontal">
                  <Radio value="Einzelvertrag" label="Einzelvertrag" />
                  <Radio value="Rahmenvertrag" label="Rahmenvertrag" />
                  <Radio value="Sondervereinbarung" label="Sondervereinbarung" />
                </RadioGroup>
              </Field>
            </div>
            
            <div>
              <Field label="Transportgut" required>
                <Input 
                  placeholder="Beschreibung des Transportgutes" 
                  value={transportgut}
                  onChange={(e) => setTransportgut(e.target.value)}
                />
              </Field>
              
              <Field label="Gewicht/Menge" required className="mt-4">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Input
                      type="number"
                      value={menge}
                      onChange={(e) => setMenge(e.target.value)}
                      min={0}
                      step={0.5}
                    />
                  </div>
                  <div className="w-1/2">
                    <div className="mb-1">
                      <Label>Einheit</Label>
                    </div>
                    <select
                      className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                    >
                      <option value="">Einheit wählen</option>
                      {unitOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </Field>
              
              <Field label="Bemerkungen/Hinweise" className="mt-4">
                <Textarea 
                  placeholder="Interne Bemerkungen zum Angebot" 
                  value={bemerkungen}
                  onChange={(e) => setBemerkungen(e.target.value)}
                />
              </Field>
              
              <div className="mt-4">
                <Field>
                  <Checkbox 
                    label="Leerfahrt in Kalkulation berücksichtigen" 
                    checked={leerfahrt}
                    onChange={(e, data) => setLeerfahrt(!!data.checked)}
                  />
                </Field>
                <Field>
                  <Checkbox 
                    label="Rückfahrt anbieten" 
                    checked={rueckfahrt}
                    onChange={(e, data) => setRueckfahrt(!!data.checked)}
                  />
                </Field>
                <Field>
                  <Checkbox 
                    label="Expresszuschlag" 
                    checked={express}
                    onChange={(e, data) => setExpress(!!data.checked)}
                  />
                </Field>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <Link href="/angebote" passHref>
              <Button icon={<ArrowLeftRegular />}>Zurück zur Übersicht</Button>
            </Link>
            <Button appearance="primary" onClick={goToNextStep}>
              Weiter zur Route
              <ArrowRightRegular className="ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 