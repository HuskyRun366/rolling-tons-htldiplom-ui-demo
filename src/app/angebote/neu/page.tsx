"use client";

import Link from "next/link";
import { 
  Button, 
  Title2, 
  Card, 
  Input, 
  Dropdown, 
  Option,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  Text,
  Label,
  Field,
  Textarea,
  Checkbox,
  SpinButton,
  Slider,
  Radio,
  RadioGroup
} from "@fluentui/react-components";
import { 
  ArrowLeftRegular,
  ArrowRightRegular,
  SearchRegular,
  DocumentSaveRegular,
  CalendarRegular,
  SaveRegular
} from "@fluentui/react-icons";

// Temporärer Ersatz für DatePicker
const SimpleDateInput = ({ placeholder }: { placeholder: string }) => (
  <Input type="date" placeholder={placeholder} />
)

export default function NeuesAngebot() {
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
          <BreadcrumbItem>Neues Angebot</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Title2>Neues Angebot erstellen</Title2>
      </div>

      <Card className="mb-6">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">1</div>
              <div className="border-t-2 border-blue-600 w-16 mt-4"></div>
              <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">2</div>
              <div className="border-t-2 border-gray-200 w-16 mt-4"></div>
              <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">3</div>
              <div className="border-t-2 border-gray-200 w-16 mt-4"></div>
              <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">4</div>
            </div>
            <div className="flex space-x-4">
              <Button icon={<SaveRegular />}>Zwischenspeichern</Button>
              <Button appearance="primary" icon={<DocumentSaveRegular />}>Angebot erstellen</Button>
            </div>
          </div>
          <div className="flex justify-start mt-2">
            <Text style={{ marginLeft: "0px" }}>Grunddaten</Text>
            <Text style={{ marginLeft: "100px" }}>Route</Text>
            <Text style={{ marginLeft: "105px" }}>Kalkulation</Text>
            <Text style={{ marginLeft: "95px" }}>Abschluss</Text>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Field label="Kunde auswählen" required>
                <div className="flex items-center">
                  <SearchRegular className="absolute ml-2 text-gray-500" />
                  <Dropdown className="w-full pl-8" placeholder="Kunden suchen...">
                    <Option value="rath">R.A.T.H. Logistik GmbH</Option>
                    <Option value="wiener">Wiener Transport AG</Option>
                    <Option value="alpen">Alpen Cargo</Option>
                    <Option value="oebb">ÖBB Rail Cargo</Option>
                    <Option value="swiss">Swiss Rail Solutions</Option>
                    <Option value="db">Deutsche Bahn Cargo</Option>
                  </Dropdown>
                </div>
              </Field>
              
              <Field label="Ansprechpartner">
                <Dropdown placeholder="Ansprechpartner auswählen">
                  <Option value="wagner">Dr. Hans Wagner</Option>
                  <Option value="schmid">DI Peter Schmid</Option>
                </Dropdown>
              </Field>
              
              <Field label="Angebotsnr.">
                <Input readOnly value="ANG-2025-043" disabled />
              </Field>
              
              <Field label="Gültigkeitsdauer">
                <div className="flex space-x-4">
                  <Field label="Von" style={{ width: '50%' }}>
                    <div className="flex items-center">
                      <CalendarRegular className="absolute ml-2 text-gray-500" />
                      <SimpleDateInput placeholder="Datum wählen" />
                    </div>
                  </Field>
                  <Field label="Bis" style={{ width: '50%' }}>
                    <div className="flex items-center">
                      <CalendarRegular className="absolute ml-2 text-gray-500" />
                      <SimpleDateInput placeholder="Datum wählen" />
                    </div>
                  </Field>
                </div>
              </Field>
              
              <Field label="Projekt/Referenz">
                <Input placeholder="z.B. Jahresprojekt 2025" />
              </Field>
              
              <Field label="Vertragsart">
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
              
              <Field label="Gewicht/Menge" required>
                <div className="flex space-x-4">
                  <SpinButton defaultValue={0} min={0} max={1000} step={0.5} style={{ width: '50%' }} />
                  <Dropdown style={{ width: '50%' }}>
                    <Option value="t">Tonnen</Option>
                    <Option value="kg">Kilogramm</Option>
                    <Option value="containers">Container</Option>
                    <Option value="wagons">Waggons</Option>
                  </Dropdown>
                </div>
              </Field>
              
              <Field label="Priorität">
                <Slider 
                  min={1} 
                  max={5} 
                  step={1} 
                  defaultValue={3}
                />
              </Field>
              
              <Field label="Bemerkungen/Hinweise">
                <Textarea placeholder="Interne Bemerkungen zum Angebot" />
              </Field>
              
              <div className="mt-2">
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
              <Button appearance="primary">
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