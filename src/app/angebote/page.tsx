"use client";

import Link from "next/link";
import { 
  Button, 
  Title2, 
  Card, 
  Input, 
  Dropdown, 
  Option,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  Checkbox,
  Label,
  Text as FluentText
} from "@fluentui/react-components";
import { 
  DocumentAdd24Regular, 
  DocumentPdf20Regular, 
  DocumentSearch24Regular, 
  Search24Regular,
  FilterRegular,
  ArrowDownRegular,
  DeleteRegular,
  EditRegular
} from "@fluentui/react-icons";

export default function Angebote() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/">Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>Angebote</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Title2>Angebote</Title2>
        <Link href="/angebote/neu">
          <Button appearance="primary" icon={<DocumentAdd24Regular />}>Neues Angebot</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="search">Suche</Label>
              <Input
                id="search"
                placeholder="Nach Angebotsnr., Kunde, Route..."
                contentBefore={<Search24Regular />}
              />
            </div>
            
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Dropdown id="status-filter" placeholder="Alle Status">
                <Option value="all">Alle Status</Option>
                <Option value="open">Offen</Option>
                <Option value="accepted">Angenommen</Option>
                <Option value="rejected">Abgelehnt</Option>
                <Option value="cancelled">Storniert</Option>
              </Dropdown>
            </div>
            
            <div>
              <Label htmlFor="date-filter">Datum</Label>
              <Dropdown id="date-filter" placeholder="Alle Zeiträume">
                <Option value="all">Alle Zeiträume</Option>
                <Option value="today">Heute</Option>
                <Option value="week">Diese Woche</Option>
                <Option value="month">Dieser Monat</Option>
                <Option value="custom">Benutzerdefiniert</Option>
              </Dropdown>
            </div>
            
            <div>
              <Label htmlFor="sorting">Sortierung</Label>
              <Dropdown id="sorting" placeholder="Sortieren nach">
                <Option value="newest">Neueste zuerst</Option>
                <Option value="oldest">Älteste zuerst</Option>
                <Option value="amount-high">Betrag (hoch-niedrig)</Option>
                <Option value="amount-low">Betrag (niedrig-hoch)</Option>
              </Dropdown>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button icon={<FilterRegular />}>Filter zurücksetzen</Button>
            <Button icon={<ArrowDownRegular />}>Exportieren</Button>
            <Divider vertical />
            <Checkbox label="Meine Angebote" />
          </div>
        </div>
      </Card>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Angebotsnr.</TableHeaderCell>
              <TableHeaderCell>Kunde</TableHeaderCell>
              <TableHeaderCell>Route</TableHeaderCell>
              <TableHeaderCell>Erstelldatum</TableHeaderCell>
              <TableHeaderCell>Summe</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Aktionen</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>ANG-2025-042</TableCell>
              <TableCell>R.A.T.H. Logistik GmbH</TableCell>
              <TableCell>Wien - Hamburg</TableCell>
              <TableCell>04.05.2025</TableCell>
              <TableCell>€12.450</TableCell>
              <TableCell><Badge color="warning">Offen</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/angebote/ang-2025-042">
                  <Button icon={<DocumentSearch24Regular />} size="small">Details</Button>
                </Link>
                <Button icon={<DocumentPdf20Regular />} size="small">PDF</Button>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANG-2025-041</TableCell>
              <TableCell>Wiener Transport AG</TableCell>
              <TableCell>München - Wien</TableCell>
              <TableCell>02.05.2025</TableCell>
              <TableCell>€9.870</TableCell>
              <TableCell><Badge color="success">Angenommen</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/angebote/ang-2025-041">
                  <Button icon={<DocumentSearch24Regular />} size="small">Details</Button>
                </Link>
                <Button icon={<DocumentPdf20Regular />} size="small">PDF</Button>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANG-2025-040</TableCell>
              <TableCell>Alpen Cargo</TableCell>
              <TableCell>Salzburg - München</TableCell>
              <TableCell>30.04.2025</TableCell>
              <TableCell>€7.230</TableCell>
              <TableCell><Badge color="warning">Offen</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/angebote/ang-2025-040">
                  <Button icon={<DocumentSearch24Regular />} size="small">Details</Button>
                </Link>
                <Button icon={<DocumentPdf20Regular />} size="small">PDF</Button>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANG-2025-039</TableCell>
              <TableCell>ÖBB Rail Cargo</TableCell>
              <TableCell>Wien - Budapest</TableCell>
              <TableCell>28.04.2025</TableCell>
              <TableCell>€5.600</TableCell>
              <TableCell><Badge color="danger">Abgelehnt</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/angebote/ang-2025-039">
                  <Button icon={<DocumentSearch24Regular />} size="small">Details</Button>
                </Link>
                <Button icon={<DocumentPdf20Regular />} size="small">PDF</Button>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANG-2025-038</TableCell>
              <TableCell>Swiss Rail Solutions</TableCell>
              <TableCell>Zürich - Wien</TableCell>
              <TableCell>25.04.2025</TableCell>
              <TableCell>€18.320</TableCell>
              <TableCell><Badge color="success">Angenommen</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/angebote/ang-2025-038">
                  <Button icon={<DocumentSearch24Regular />} size="small">Details</Button>
                </Link>
                <Button icon={<DocumentPdf20Regular />} size="small">PDF</Button>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANG-2025-037</TableCell>
              <TableCell>Deutsche Bahn Cargo</TableCell>
              <TableCell>Berlin - Wien</TableCell>
              <TableCell>22.04.2025</TableCell>
              <TableCell>€14.990</TableCell>
              <TableCell><Badge color="success">Angenommen</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/angebote/ang-2025-037">
                  <Button icon={<DocumentSearch24Regular />} size="small">Details</Button>
                </Link>
                <Button icon={<DocumentPdf20Regular />} size="small">PDF</Button>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANG-2025-036</TableCell>
              <TableCell>Vienna Rail GmbH</TableCell>
              <TableCell>Wien - Budapest</TableCell>
              <TableCell>20.04.2025</TableCell>
              <TableCell>€6.840</TableCell>
              <TableCell><Badge color="warning">Offen</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/angebote/ang-2025-036">
                  <Button icon={<DocumentSearch24Regular />} size="small">Details</Button>
                </Link>
                <Button icon={<DocumentPdf20Regular />} size="small">PDF</Button>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="p-4 flex justify-between items-center">
          <FluentText>Zeige 1-7 von 42 Angeboten</FluentText>
          <div className="flex space-x-2">
            <Button appearance="subtle" disabled>Zurück</Button>
            <Button appearance="subtle">1</Button>
            <Button appearance="subtle">2</Button>
            <Button appearance="subtle">3</Button>
            <Button appearance="subtle">4</Button>
            <Button appearance="subtle">Weiter</Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 