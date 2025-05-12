"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Button,
  Title2,
  Card,
  Field,
  Input,
  SpinButton,
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
  Label
} from "@fluentui/react-components";
import { 
  ArrowLeftRegular, 
  ArrowRightRegular,
  SaveRegular,
  DocumentSaveRegular,
  AddRegular,
  DeleteRegular
} from "@fluentui/react-icons";

// Kostenkomponente Typ
interface CostComponent {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function KalkulationAngebot() {
  const router = useRouter();
  
  // Zustand für Kostenkomponenten
  const [costComponents, setCostComponents] = useState<CostComponent[]>([
    { id: '1', name: 'Bahnnutzung', price: 1200, quantity: 1 },
    { id: '2', name: 'Zugpersonal', price: 800, quantity: 1 },
    { id: '3', name: 'Energiekosten', price: 650, quantity: 1 }
  ]);
  
  // Rabatt und Zuschläge
  const [discount, setDiscount] = useState(0);
  const [expressSurcharge, setExpressSurcharge] = useState(0);
  const [handlingFee, setHandlingFee] = useState(200);
  
  // Margen
  const [margin, setMargin] = useState(15);
  
  // Neue Kostenkomponente hinzufügen
  const addCostComponent = () => {
    const newId = String(costComponents.length + 1);
    setCostComponents([...costComponents, { id: newId, name: '', price: 0, quantity: 1 }]);
  };
  
  // Kostenkomponente löschen
  const removeCostComponent = (id: string) => {
    setCostComponents(costComponents.filter(comp => comp.id !== id));
  };
  
  // Kostenkomponente aktualisieren
  const updateCostComponent = (id: string, field: keyof CostComponent, value: string | number) => {
    setCostComponents(costComponents.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };
  
  // Berechnung der Gesamtkosten
  const calculateTotalCosts = () => {
    return costComponents.reduce((sum, comp) => sum + (comp.price * comp.quantity), 0);
  };
  
  // Berechnung des Nettopreises (Kosten - Rabatt + Zuschläge + Bearbeitungsgebühr)
  const calculateNetPrice = () => {
    const totalCosts = calculateTotalCosts();
    const discountAmount = totalCosts * (discount / 100);
    const surchargeAmount = totalCosts * (expressSurcharge / 100);
    return totalCosts - discountAmount + surchargeAmount + handlingFee;
  };
  
  // Berechnung des Bruttopreises mit Marge
  const calculateGrossPrice = () => {
    const netPrice = calculateNetPrice();
    return netPrice * (1 + margin / 100);
  };
  
  // Navigation zum vorherigen Schritt
  const goToPreviousStep = () => {
    router.push("/angebote/neu/route");
  };
  
  // Navigation zum nächsten Schritt
  const goToNextStep = () => {
    router.push("/angebote/neu/abschluss");
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          <span>Dashboard</span> &gt; <span>Angebote</span> &gt; <span>Neues Angebot</span> &gt; <span>Kalkulation</span>
        </div>
        <Title2>Angebotskalkulation</Title2>
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
              <div className="border-t-2 border-blue-600 w-16 mt-4"></div>
              <div className="flex flex-col items-center w-24">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">3</div>
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
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Kostenkomponenten</h3>
              <Button icon={<AddRegular />} onClick={addCostComponent}>Komponente hinzufügen</Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Bezeichnung</TableHeaderCell>
                  <TableHeaderCell>Preis (€)</TableHeaderCell>
                  <TableHeaderCell>Menge</TableHeaderCell>
                  <TableHeaderCell>Gesamt (€)</TableHeaderCell>
                  <TableHeaderCell>Aktionen</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costComponents.map(comp => (
                  <TableRow key={comp.id}>
                    <TableCell>
                      <Input 
                        value={comp.name} 
                        onChange={(e) => updateCostComponent(comp.id, 'name', e.target.value)}
                        placeholder="Bezeichnung eingeben"
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        value={comp.price.toString()} 
                        onChange={(e) => updateCostComponent(comp.id, 'price', parseFloat(e.target.value) || 0)}
                      />
                    </TableCell>
                    <TableCell>
                      <SpinButton 
                        value={comp.quantity} 
                        min={1} 
                        max={100} 
                        step={1}
                        onChange={(e, data) => updateCostComponent(comp.id, 'quantity', data?.value || 1)}
                      />
                    </TableCell>
                    <TableCell>
                      {(comp.price * comp.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        icon={<DeleteRegular />} 
                        onClick={() => removeCostComponent(comp.id)}
                        appearance="subtle"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Rabatte und Zuschläge</h3>
              
              <Field label="Rabatt (%)" className="mb-4">
                <SpinButton 
                  value={discount} 
                  min={0} 
                  max={50} 
                  step={0.5}
                  onChange={(e, data) => setDiscount(data?.value || 0)}
                />
              </Field>
              
              <Field label="Express-Zuschlag (%)" className="mb-4">
                <SpinButton 
                  value={expressSurcharge} 
                  min={0} 
                  max={50} 
                  step={0.5}
                  onChange={(e, data) => setExpressSurcharge(data?.value || 0)}
                />
              </Field>
              
              <Field label="Bearbeitungsgebühr (€)" className="mb-4">
                <SpinButton 
                  value={handlingFee} 
                  min={0} 
                  max={1000} 
                  step={10}
                  onChange={(e, data) => setHandlingFee(data?.value || 0)}
                />
              </Field>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Kalkulation</h3>
              
              <Field label="Marge (%)" className="mb-4">
                <SpinButton 
                  value={margin} 
                  min={0} 
                  max={50} 
                  step={0.5}
                  onChange={(e, data) => setMargin(data?.value || 0)}
                />
              </Field>
              
              <div className="p-4 border rounded-md bg-gray-50 mt-6">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Gesamtkosten:</span>
                  <span>{calculateTotalCosts().toFixed(2)} €</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Nettopreis:</span>
                  <span>{calculateNetPrice().toFixed(2)} €</span>
                </div>
                <div className="flex justify-between py-2 text-lg text-blue-700 font-bold">
                  <span>Angebotssumme (Brutto):</span>
                  <span>{calculateGrossPrice().toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <Button icon={<ArrowLeftRegular />} onClick={goToPreviousStep}>
              Zurück zur Route
            </Button>
            <Button appearance="primary" onClick={goToNextStep}>
              Weiter zum Abschluss
              <ArrowRightRegular className="ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 