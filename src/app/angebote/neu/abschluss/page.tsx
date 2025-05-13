"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Button,
  Title2,
  Card,
  Field,
  Textarea,
  Checkbox,
  Text
} from "@fluentui/react-components";
import { 
  ArrowLeftRegular, 
  SaveRegular,
  DocumentSaveRegular,
  DocumentPdfRegular,
  MailRegular,
  CheckmarkRegular
} from "@fluentui/react-icons";
import { useAngebote } from "@/contexts/AngebotContext";
import { useWizard } from "@/contexts/WizardContext";

export default function AbschlussAngebot() {
  const router = useRouter();
  const { addAngebot } = useAngebote();
  const { wizard } = useWizard();
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [archivePdf, setArchivePdf] = useState(true);
  const [isUrgent, setIsUrgent] = useState(false);
  
  // Daten aus dem Wizard-Prozess formatieren
  const angebotsDaten = {
    nummer: wizard.angebotsnummer,
    kunde: wizard.grunddaten.kunde || "Nicht ausgewählt",
    ansprechpartner: wizard.grunddaten.ansprechpartner || "Nicht ausgewählt",
    transportgut: wizard.grunddaten.transportgut || "Nicht angegeben",
    route: `${wizard.route.startbahnhof || "Startbahnhof"} → ${wizard.route.zielbahnhof || "Zielbahnhof"}`,
    abfahrt: wizard.route.abfahrt || "Nicht festgelegt",
    ankunft: wizard.route.ankunft || "Nicht festgelegt",
    menge: `${wizard.grunddaten.menge || "0"} ${wizard.grunddaten.einheit || "t"}`,
    summe: `€${wizard.kalkulation.bruttosumme.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
    gültigBis: wizard.grunddaten.gueltigBis || "Nicht festgelegt"
  };
  
  // Aktuelles Datum für die Vorschau des "Erstellt am" Datums
  const currentDate = new Date();
  const erstelldatumForPreview = currentDate.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  // Navigation zum vorherigen Schritt
  const goToPreviousStep = () => {
    // Sanfte Navigation mit Next.js Router
    router.push("/angebote/neu/kalkulation");
  };
  
  // Direktes Speichern ohne Dialog
  const saveAndNavigate = () => {
    console.log("saveAndNavigate wurde aufgerufen");
    setLoading(true);
    
    // Aktuelles Datum für das Erstelldatum
    const currentDate = new Date();
    const erstelldatum = currentDate.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    try {
      // Angebot zum Context hinzufügen
      addAngebot({
        kunde: angebotsDaten.kunde,
        ansprechpartner: angebotsDaten.ansprechpartner,
        route: angebotsDaten.route.replace(' → ', ' - '),
        erstelldatum: erstelldatum,
        summe: angebotsDaten.summe,
        status: 'offen' as 'offen',
        transportgut: angebotsDaten.transportgut,
        menge: angebotsDaten.menge,
        abfahrt: angebotsDaten.abfahrt,
        ankunft: angebotsDaten.ankunft,
        gueltigBis: angebotsDaten.gültigBis
      });
      
      console.log("Angebot wurde gespeichert");
      
      // Keine sofortige Navigation - erst nach einiger Zeit
      setTimeout(() => {
        console.log("Navigiere zum neuen Angebot");
        // Get the latest ID from the context to navigate directly to the newly created offer
        const newAngebotId = angebotsDaten.nummer.toLowerCase().replace(/\s/g, '-');
        window.location.href = `/angebote/${newAngebotId}`; // Navigate directly to the offer detail page
      }, 300);
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          <span>Dashboard</span> &gt; <span>Angebote</span> &gt; <span>Neues Angebot</span> &gt; <span>Abschluss</span>
        </div>
        <div className="flex flex-col">
          <Title2>Angebot {angebotsDaten.nummer}</Title2>
          <Text className="ml-1">
            Erstellt am {erstelldatumForPreview} durch Bill Meixner
          </Text>
        </div>
      </div>

      <Card className="mb-6">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="flex flex-col items-center w-24">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">1</div>
                <span className="mt-2 text-sm">Grunddaten</span>
              </div>
              <div className="border-t-2 border-gray-200 w-16 mt-4"></div>
              <div className="flex flex-col items-center w-24">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">2</div>
                <span className="mt-2 text-sm">Route</span>
              </div>
              <div className="border-t-2 border-gray-200 w-16 mt-4"></div>
              <div className="flex flex-col items-center w-24">
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">3</div>
                <span className="mt-2 text-sm">Kalkulation</span>
              </div>
              <div className="border-t-2 border-blue-600 w-16 mt-4"></div>
              <div className="flex flex-col items-center w-24">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">4</div>
                <span className="mt-2 text-sm">Abschluss</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button icon={<SaveRegular />}>Zwischenspeichern</Button>
              <Button 
                appearance="primary" 
                icon={<DocumentSaveRegular />}
                onClick={() => setShowConfirm(true)}
              >
                Angebot erstellen
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Angebotsvorschau</h3>
              
              <Card className="p-4 border bg-gray-50">
                <div className="text-right mb-4">
                  <div className="text-gray-600">Gültig bis: {angebotsDaten.gültigBis}</div>
                </div>
                
                <h4 className="font-bold mb-2">Kundeninformationen:</h4>
                <div className="mb-4">
                  <div>{angebotsDaten.kunde}</div>
                  <div>Ansprechpartner: {angebotsDaten.ansprechpartner}</div>
                </div>
                
                <h4 className="font-bold mb-2">Transportdetails:</h4>
                <div className="mb-4">
                  <div><span className="font-medium">Transportgut:</span> {angebotsDaten.transportgut}</div>
                  <div><span className="font-medium">Menge:</span> {angebotsDaten.menge}</div>
                  <div><span className="font-medium">Route:</span> {angebotsDaten.route}</div>
                  <div><span className="font-medium">Abfahrt:</span> {angebotsDaten.abfahrt}</div>
                  <div><span className="font-medium">Ankunft:</span> {angebotsDaten.ankunft}</div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold text-blue-700">
                    <span>Angebotssumme (Brutto):</span>
                    <span>{angebotsDaten.summe}</span>
                  </div>
                </div>
              </Card>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Kommentare für den Kunden</h3>
                <Textarea 
                  placeholder="Wichtige Hinweise oder Zusatzinformationen für den Kunden eingeben..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full"
                  rows={4}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Abschlussoptionen</h3>
              
              <div className="space-y-4">
                <Field>
                  <Checkbox 
                    label="E-Mail mit PDF an Kunden senden" 
                    checked={sendEmail}
                    onChange={(_, data) => setSendEmail(!!data.checked)}
                  />
                </Field>
                
                <Field>
                  <Checkbox 
                    label="PDF intern archivieren" 
                    checked={archivePdf}
                    onChange={(_, data) => setArchivePdf(!!data.checked)}
                  />
                </Field>
                
                <Field>
                  <Checkbox 
                    label="Angebot als dringend markieren" 
                    checked={isUrgent}
                    onChange={(_, data) => setIsUrgent(!!data.checked)}
                  />
                </Field>
              </div>
              
              <div className="border rounded p-4 mt-6 bg-blue-50">
                <h4 className="font-semibold mb-4">Angebot finalisieren</h4>
                <p className="text-gray-700 mb-4">
                  Nach dem Erstellen des Angebots wird dieses in der Datenbank gespeichert und steht für weitere Bearbeitungen zur Verfügung.
                </p>
                <div className="flex space-x-4">
                  <Button 
                    icon={<DocumentPdfRegular />}
                    appearance="subtle"
                  >
                    Vorschau PDF
                  </Button>
                  <Button 
                    icon={<MailRegular />}
                    appearance="subtle"
                  >
                    E-Mail Vorschau
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <Button icon={<ArrowLeftRegular />} onClick={goToPreviousStep}>
              Zurück zur Kalkulation
            </Button>
            
            <Button 
              appearance="primary" 
              icon={<CheckmarkRegular />}
              onClick={() => setShowConfirm(true)}
            >
              Angebot abschließen
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Simples Confirm Modal statt Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Angebot erstellen?</h3>
            <p className="mb-6">
              Möchten Sie das Angebot {angebotsDaten.nummer} für {angebotsDaten.kunde} mit einer Summe von {angebotsDaten.summe} erstellen?
            </p>
            <div className="flex justify-end space-x-4">
              <Button 
                appearance="secondary" 
                onClick={() => setShowConfirm(false)}
                disabled={loading}
              >
                Abbrechen
              </Button>
              <Button 
                appearance="primary" 
                onClick={saveAndNavigate}
                disabled={loading}
              >
                {loading ? "Wird erstellt..." : "Angebot erstellen"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 