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
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableBody,
  TableCell,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent
} from "@fluentui/react-components";
import { 
  ArrowLeftRegular, 
  SaveRegular,
  DocumentSaveRegular,
  DocumentPdfRegular,
  MailRegular,
  CheckmarkRegular
} from "@fluentui/react-icons";

export default function AbschlussAngebot() {
  const router = useRouter();
  const [comments, setComments] = useState("");
  const [confirmDialog, setConfirmDialog] = useState(false);
  
  // Beispieldaten, die normalerweise aus einem Context/Store kommen würden
  const angebotsDaten = {
    nummer: "ANG-2025-043",
    kunde: "R.A.T.H. Logistik GmbH",
    ansprechpartner: "Dr. Hans Wagner",
    transportgut: "Stahl-Coils",
    route: "Wien Hauptbahnhof → Hamburg Hbf",
    abfahrt: "15.05.2025, 08:30",
    ankunft: "16.05.2025, 14:30",
    menge: "24 Tonnen",
    summe: "€2.950,00",
    gültigBis: "30.06.2025"
  };
  
  // Navigation zum vorherigen Schritt
  const goToPreviousStep = () => {
    router.push("/angebote/neu/kalkulation");
  };
  
  // Angebot abschließen und zurück zur Übersicht
  const finishOffer = () => {
    // Hier würden die Daten gespeichert werden
    router.push("/angebote");
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          <span>Dashboard</span> &gt; <span>Angebote</span> &gt; <span>Neues Angebot</span> &gt; <span>Abschluss</span>
        </div>
        <Title2>Angebot finalisieren</Title2>
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
              <Button appearance="primary" icon={<DocumentSaveRegular />}>Angebot erstellen</Button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Angebotsvorschau</h3>
              
              <Card className="p-4 border bg-gray-50">
                <div className="text-right mb-4">
                  <div className="text-xl font-bold">{angebotsDaten.nummer}</div>
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
                  <Checkbox label="E-Mail mit PDF an Kunden senden" />
                </Field>
                
                <Field>
                  <Checkbox label="PDF intern archivieren" defaultChecked />
                </Field>
                
                <Field>
                  <Checkbox label="Angebot als dringend markieren" />
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
            
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" icon={<CheckmarkRegular />}>
                Angebot abschließen
              </Button>
            </DialogTrigger>
            
            <Dialog open={confirmDialog} onOpenChange={(_, { open }) => setConfirmDialog(open)}>
              <DialogSurface>
                <DialogBody>
                  <DialogTitle>Angebot erstellen?</DialogTitle>
                  <DialogContent>
                    Möchten Sie das Angebot {angebotsDaten.nummer} für {angebotsDaten.kunde} mit einer Summe von {angebotsDaten.summe} erstellen?
                  </DialogContent>
                  <DialogActions>
                    <Button appearance="secondary" onClick={() => setConfirmDialog(false)}>
                      Abbrechen
                    </Button>
                    <Button appearance="primary" onClick={finishOffer}>
                      Angebot erstellen
                    </Button>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
          </div>
        </div>
      </Card>
    </div>
  );
} 