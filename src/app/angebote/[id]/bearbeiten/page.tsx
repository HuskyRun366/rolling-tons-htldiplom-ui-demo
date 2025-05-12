"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Button, 
  Title2, 
  Card, 
  Input,
  Textarea,
  Dropdown,
  Option,
  Field,
  Label,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider
} from "@fluentui/react-components";
import { 
  ArrowLeftRegular,
  SaveRegular,
  DeleteRegular,
  DismissRegular,
  DocumentSearch24Regular
} from "@fluentui/react-icons";
import { useAngebote } from "@/contexts/AngebotContext";
import { useKunden } from '@/contexts/KundenContext';

export default function AngebotBearbeiten() {
  const router = useRouter();
  const params = useParams();
  const { getAngebotById, updateAngebot } = useAngebote();
  const { kunden } = useKunden();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    kunde: "",
    ansprechpartner: "",
    route: "",
    transportgut: "",
    abfahrt: "",
    ankunft: "",
    gueltigBis: "",
    status: "offen" as "offen" | "angenommen" | "abgelehnt" | "storniert",
    summe: ""
  });
  
  // Extrahiere Start- und Zielbahhnhof aus der Route
  const [startbahnhof, setStartbahnhof] = useState("");
  const [zielbahnhof, setZielbahnhof] = useState("");
  
  // State für getrennte Menge und Einheit
  const [mengeWert, setMengeWert] = useState("");
  const [mengeEinheit, setMengeEinheit] = useState("Tonnen"); // Standardeinheit
  
  // Finde den aktuell ausgewählten Kunden, um die Ansprechpartner zu bestimmen
  const selectedKundeObject = kunden.find(k => k.name === formData.kunde);
  
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
  
  // Angebotsdaten laden
  useEffect(() => {
    let initialStart = "";
    let initialZiel = "";
    if (params.id) {
      try {
        console.log("Versuche Angebot zu laden mit ID:", params.id);
        const angebot = getAngebotById(params.id as string);
        console.log("Geladenes Angebot:", angebot);
        
        if (angebot) {
          // Debug: Wert von transportgut prüfen
          console.log("angebot.transportgut vor setFormData:", angebot.transportgut);
          
          // Formular mit existierenden Daten füllen
          setFormData({
            kunde: angebot.kunde || "",
            ansprechpartner: angebot.ansprechpartner || "",
            route: angebot.route || "",
            transportgut: (angebot.transportgut === "Nicht angegeben" || !angebot.transportgut) ? "" : angebot.transportgut,
            abfahrt: angebot.abfahrt || "",
            ankunft: angebot.ankunft || "",
            gueltigBis: angebot.gueltigBis || "",
            status: angebot.status,
            summe: angebot.summe || ""
          });
          
          // Route in Start- und Zielbahnhof aufteilen und direkt setzen
          if (angebot.route) {
            const routeParts = angebot.route.split(" - ");
            if (routeParts.length === 2) {
              initialStart = routeParts[0];
              initialZiel = routeParts[1];
              console.log("Bahnhöfe initialisiert:", initialStart, initialZiel);
            }
          }
          
          // Menge parsen und setzen
          if (angebot.menge) {
            const mengeParts = angebot.menge.trim().split(/\s+/);
            if (mengeParts.length > 0) {
              setMengeWert(mengeParts[0]);
              if (mengeParts.length > 1) {
                setMengeEinheit(mengeParts.slice(1).join(' ')); // Rest als Einheit
              }
            }
             console.log("Menge initialisiert:", mengeParts[0], mengeParts.slice(1).join(' '));
          } else {
             console.log("Keine Menge im Angebot gefunden, Standard wird verwendet.");
             setMengeWert("");
             setMengeEinheit("Tonnen"); // Standard bei fehlendem Wert
          }
        } else {
          console.error("Angebot mit ID", params.id, "nicht gefunden");
        }
      } catch (error) {
        console.error("Fehler beim Laden des Angebots:", error);
      }
      // Setze Bahnhöfe NACHDEM formData gesetzt wurde
      setStartbahnhof(initialStart);
      setZielbahnhof(initialZiel);
      setLoading(false);
    }
  }, [params.id, getAngebotById]);
  
  // Änderungen im Formular verfolgen
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Input geändert: ${name} = ${value}`);
    setFormData(prev => {
      const newState = { ...prev, [name]: value };
      console.log("Neuer formData State (vor set):", newState);
      return newState;
    });
  };
  
  // Dropdown-Änderungen verarbeiten
  const handleDropdownChange = (name: string, value: string) => {
    console.log(`Dropdown geändert: ${name} = ${value}`);
    // Spezieller Handler für Menge Einheit
    if (name === 'mengeEinheit') {
       setMengeEinheit(value);
       console.log("Neuer mengeEinheit State:", value);
    } else {
       setFormData(prev => {
         const newState = { ...prev, [name]: value };
         // Wenn Kunde geändert wird, Ansprechpartner zurücksetzen
         if (name === 'kunde') {
           newState.ansprechpartner = ''; 
           console.log("Kunde geändert, Ansprechpartner zurückgesetzt.");
           
           // Finde den neuen Kunden und wähle den ersten Ansprechpartner standardmäßig aus (optional)
           const newSelectedKunde = kunden.find(k => k.name === value);
           if (newSelectedKunde && newSelectedKunde.ansprechpartner.length > 0) {
              // newState.ansprechpartner = newSelectedKunde.ansprechpartner[0]; // Optional: Ersten Ansprechpartner auswählen
              // console.log(`Erster Ansprechpartner für ${value} gesetzt: ${newState.ansprechpartner}`);
           }
         }
         console.log("Neuer formData State (nach Dropdown-Änderung):", newState);
         return newState;
       });
    }
  };
  
  // Route aktualisieren, wenn Start- oder Zielbahnhof geändert wird
  useEffect(() => {
    // Nur aktualisieren, wenn beide Bahnhöfe ausgewählt und nicht leer sind
    if (startbahnhof && zielbahnhof && startbahnhof !== "" && zielbahnhof !== "") {
      console.log(`Route wird aktualisiert: ${startbahnhof} - ${zielbahnhof}`); 
      setFormData(prev => ({ ...prev, route: `${startbahnhof} - ${zielbahnhof}` }));
    }
  }, [startbahnhof, zielbahnhof]);
  
  // Formular absenden
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Menge kombinieren
    const kombinierteMenge = `${mengeWert} ${mengeEinheit}`.trim();
    console.log("Kombinierte Menge für Speichern:", kombinierteMenge);

    // Zu speichernde Daten vorbereiten
    const dataToSave = {
      ...formData,
      menge: kombinierteMenge // Kombinierte Menge hinzufügen/überschreiben
    };

    // Angebot aktualisieren
    if (params.id) {
      console.log("Speichere Daten:", dataToSave);
      updateAngebot(params.id as string, dataToSave);
      
      // Kurze Verzögerung, dann zur Detailseite navigieren
      setTimeout(() => {
        setSaving(false);
        router.push(`/angebote/${params.id}`);
      }, 500);
    }
  };
  
  // Abbrechen und zurück zur Detailseite
  const handleCancel = () => {
    router.push(`/angebote/${params.id}`);
  };
  
  if (loading) {
    return <div className="p-6">Angebot wird geladen...</div>;
  }
  
  return (
    <div className="p-6">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/">Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link href="/angebote">Angebote</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link href={`/angebote/${params.id}`}>{formData.kunde}</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>Bearbeiten</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Title2>Angebot bearbeiten</Title2>
        <div className="flex space-x-3">
          <Button 
            icon={<DismissRegular />} 
            appearance="subtle"
            onClick={handleCancel}
          >
            Abbrechen
          </Button>
          <Button 
            icon={<DocumentSearch24Regular />}
            onClick={() => router.push(`/angebote/${params.id}`)}
          >
            Zur Detailansicht
          </Button>
          <Button 
            icon={<SaveRegular />}
            appearance="primary"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Wird gespeichert..." : "Speichern"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Grunddaten</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kunde <span className="text-red-500">*</span>
                </label>
                <select 
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  name="kunde" 
                  value={formData.kunde} 
                  onChange={(e) => handleDropdownChange("kunde", e.target.value)}
                  required
                >
                  <option value="">Kunde auswählen...</option>
                  {kunden.map(kunde => (
                    <option key={kunde.id} value={kunde.name}>
                      {kunde.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ansprechpartner <span className="text-red-500">*</span>
                </label>
                <select 
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  name="ansprechpartner" 
                  value={formData.ansprechpartner} 
                  onChange={(e) => handleDropdownChange("ansprechpartner", e.target.value)}
                  required
                  disabled={!selectedKundeObject}
                >
                   <option value="">Ansprechpartner auswählen...</option>
                   {selectedKundeObject?.ansprechpartner.map(partner => (
                    <option key={partner} value={partner}>
                      {partner}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2 flex flex-col md:flex-row md:items-end md:space-x-4 mb-4">
                <Field label="Transportgut" className="mb-4 md:mb-0 flex-1">
                  <Input
                    name="transportgut"
                    placeholder="Beschreibung des Transportgutes"
                    value={formData.transportgut || ""}
                    onChange={(e, data) => handleInputChange({ target: { name: "transportgut", value: data?.value || "" } } as React.ChangeEvent<HTMLInputElement>)}
                  />
                </Field>

                <Field label="Gewicht/Menge" className="mb-4 md:mb-0 w-full md:w-1/5">
                  <Input
                    name="mengeWert" 
                    type="number"
                    value={mengeWert}
                    onChange={(e, data) => setMengeWert(data?.value || "")}
                  />
                </Field>
                
                <div className="w-full md:w-1/5 flex flex-col">
                  <label htmlFor="mengeEinheit" className="mb-1 text-sm font-medium text-gray-700">Einheit</label>
                  <select
                     id="mengeEinheit" 
                     name="mengeEinheit"
                     value={mengeEinheit}
                     onChange={(e) => handleDropdownChange("mengeEinheit", e.target.value)}
                     className="w-full border rounded px-3 py-1.5 h-9 focus:outline-none focus:border-blue-500 bg-white"
                  >
                     <option>Tonnen</option>
                     <option>kg</option>
                     <option>Stück</option>
                     <option>Paletten</option>
                     <option>Container</option>
                     <option>m³</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <Field label="Gültig bis" className="mb-4">
                  <Input
                    name="gueltigBis"
                    type="date"
                    value={formData.gueltigBis || ""}
                    onChange={(e, data) => handleInputChange({ target: { name: "gueltigBis", value: data?.value || "" } } as React.ChangeEvent<HTMLInputElement>)}
                  />
                </Field>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  value={formData.status}
                  onChange={(e) => handleDropdownChange("status", e.target.value as any)}
                >
                  <option value="offen">Offen</option>
                  <option value="angenommen">Angenommen</option>
                  <option value="abgelehnt">Abgelehnt</option>
                  <option value="storniert">Storniert</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="mb-6">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Route</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Startbahnhof <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  value={startbahnhof}
                  onChange={(e) => { 
                    console.log("Startbahnhof geändert auf:", e.target.value);
                    setStartbahnhof(e.target.value);
                  }}
                  required
                >
                  <option value="">Startbahnhof auswählen...</option>
                  {bahnhofOptions.map((option, index) => {
                    return (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zielbahnhof <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  value={zielbahnhof}
                  onChange={(e) => {
                    console.log("Zielbahnhof geändert auf:", e.target.value);
                    setZielbahnhof(e.target.value);
                  }}
                  required
                >
                  <option value="">Zielbahnhof auswählen...</option>
                  {bahnhofOptions.map((option, index) => {
                    return (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              
              <div className="mb-4">
                <Field label="Abfahrt" hint="TT.MM.JJJJ, HH:MM" className="mb-4">
                  <Input 
                    name="abfahrt" 
                    value={formData.abfahrt || ""} 
                    placeholder="TT.MM.JJJJ, HH:MM"
                    onChange={(e, data) => handleInputChange({ target: { name: "abfahrt", value: data?.value || "" } } as React.ChangeEvent<HTMLInputElement>)}
                  />
                </Field>
              </div>
              
              <div className="mb-4">
                <Field label="Ankunft" hint="TT.MM.JJJJ, HH:MM" className="mb-4">
                  <Input 
                    name="ankunft" 
                    value={formData.ankunft || ""} 
                    placeholder="TT.MM.JJJJ, HH:MM"
                    onChange={(e, data) => handleInputChange({ target: { name: "ankunft", value: data?.value || "" } } as React.ChangeEvent<HTMLInputElement>)}
                  />
                </Field>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="mb-6">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Finanzen</h3>
          </div>
          <div className="p-6">
            <Field label="Gesamtsumme" required hint="€0,00" className="mb-4">
              <Input 
                name="summe" 
                value={formData.summe}
                placeholder="€0,00"
                onChange={(e, data) => handleInputChange({ target: { name: "summe", value: data?.value || "" } } as React.ChangeEvent<HTMLInputElement>)}
                required
              />
            </Field>
            
            <div className="text-sm text-gray-500 mt-2">
              Hinweis: Für eine detaillierte Kalkulation verwenden Sie bitte den Kalkulations-Tab auf der Detailseite.
            </div>
          </div>
        </Card>
        
        <div className="flex justify-between mt-6">
          <Button 
            icon={<ArrowLeftRegular />} 
            onClick={handleCancel}
          >
            Zurück zur Detailseite
          </Button>
          <Button 
            appearance="primary" 
            icon={<SaveRegular />}
            type="submit"
            disabled={saving}
          >
            {saving ? "Wird gespeichert..." : "Änderungen speichern"}
          </Button>
        </div>
      </form>
    </div>
  );
} 