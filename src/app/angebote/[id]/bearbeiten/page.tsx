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
    menge: "",
    abfahrt: "",
    ankunft: "",
    gueltigBis: "",
    status: "offen" as "offen" | "angenommen" | "abgelehnt" | "storniert",
    summe: ""
  });
  
  // Extrahiere Start- und Zielbahhnhof aus der Route
  const [startbahnhof, setStartbahnhof] = useState("");
  const [zielbahnhof, setZielbahnhof] = useState("");
  
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
          // Formular mit existierenden Daten füllen
          setFormData({
            kunde: angebot.kunde || "",
            ansprechpartner: angebot.ansprechpartner || "",
            route: angebot.route || "",
            transportgut: angebot.transportgut || "",
            menge: angebot.menge || "",
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
    
    // Angebot aktualisieren
    if (params.id) {
      updateAngebot(params.id as string, formData);
      
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
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transportgut
                </label>
                <input 
                  type="text"
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  name="transportgut" 
                  value={formData.transportgut || ""} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menge
                </label>
                <input 
                  type="text"
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  name="menge" 
                  value={formData.menge || ""} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gültig bis
                </label>
                <input 
                  type="text"
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  name="gueltigBis" 
                  value={formData.gueltigBis || ""} 
                  onChange={handleInputChange}
                  placeholder="TT.MM.JJJJ"
                />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Abfahrt
                </label>
                <input 
                  type="text"
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  name="abfahrt" 
                  value={formData.abfahrt || ""} 
                  onChange={handleInputChange}
                  placeholder="TT.MM.JJJJ, HH:MM"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ankunft
                </label>
                <input 
                  type="text"
                  className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                  name="ankunft" 
                  value={formData.ankunft || ""} 
                  onChange={handleInputChange}
                  placeholder="TT.MM.JJJJ, HH:MM"
                />
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="mb-6">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Finanzen</h3>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gesamtsumme <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                className="w-full border rounded p-2 focus:outline-none focus:border-blue-500"
                name="summe" 
                value={formData.summe} 
                onChange={handleInputChange}
                placeholder="€0,00"
                required
              />
            </div>
            
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