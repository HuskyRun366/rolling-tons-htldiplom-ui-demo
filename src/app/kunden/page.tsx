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
  Text,
  Label
} from "@fluentui/react-components";
import { 
  PersonAdd24Regular,
  Search24Regular,
  FilterRegular,
  ArrowDownRegular,
  EditRegular,
  DeleteRegular
} from "@fluentui/react-icons";

export default function Kunden() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/">Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>Kunden</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Title2>Kunden</Title2>
        <Link href="/kunden/neu">
          <Button appearance="primary" icon={<PersonAdd24Regular />}>Neuer Kunde</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="search">Suche</Label>
              <Input
                id="search"
                placeholder="Nach Kundenname, UID, Ort..."
                contentBefore={<Search24Regular />}
              />
            </div>
            
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Dropdown id="status-filter" placeholder="Alle Status">
                <Option value="all">Alle Status</Option>
                <Option value="active">Aktiv</Option>
                <Option value="inactive">Inaktiv</Option>
                <Option value="prospect">Interessent</Option>
              </Dropdown>
            </div>
            
            <div>
              <Label htmlFor="sorting">Sortierung</Label>
              <Dropdown id="sorting" placeholder="Sortieren nach">
                <Option value="name-asc">Name (A-Z)</Option>
                <Option value="name-desc">Name (Z-A)</Option>
                <Option value="newest">Neueste zuerst</Option>
                <Option value="oldest">Älteste zuerst</Option>
              </Dropdown>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button icon={<FilterRegular />}>Filter zurücksetzen</Button>
            <Button icon={<ArrowDownRegular />}>Exportieren</Button>
          </div>
        </div>
      </Card>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Kundenname</TableHeaderCell>
              <TableHeaderCell>UID-Nummer</TableHeaderCell>
              <TableHeaderCell>Anschrift</TableHeaderCell>
              <TableHeaderCell>Ansprechpartner</TableHeaderCell>
              <TableHeaderCell>Kontakt</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Aktionen</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>R.A.T.H. Logistik GmbH</TableCell>
              <TableCell>ATU12345678</TableCell>
              <TableCell>Hauptplatz 1, 1010 Wien</TableCell>
              <TableCell>Dr. Hans Wagner</TableCell>
              <TableCell>h.wagner@rath-logistik.de</TableCell>
              <TableCell><Badge color="success">Aktiv</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/kunden/1">
                  <Button size="small">Details</Button>
                </Link>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Wiener Transport AG</TableCell>
              <TableCell>ATU87654321</TableCell>
              <TableCell>Industrieweg 14, 1220 Wien</TableCell>
              <TableCell>Mag. Maria Huber</TableCell>
              <TableCell>m.huber@wienertransport.at</TableCell>
              <TableCell><Badge color="success">Aktiv</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/kunden/2">
                  <Button size="small">Details</Button>
                </Link>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Alpen Cargo</TableCell>
              <TableCell>ATU36925814</TableCell>
              <TableCell>Salzburger Str. 33, 5020 Salzburg</TableCell>
              <TableCell>Karl Meyer</TableCell>
              <TableCell>meyer@alpencargo.at</TableCell>
              <TableCell><Badge color="success">Aktiv</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/kunden/3">
                  <Button size="small">Details</Button>
                </Link>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ÖBB Rail Cargo</TableCell>
              <TableCell>ATU77889944</TableCell>
              <TableCell>Nordbahnstraße 50, 1020 Wien</TableCell>
              <TableCell>Lisa Bauer</TableCell>
              <TableCell>l.bauer@railcargo.at</TableCell>
              <TableCell><Badge color="success">Aktiv</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/kunden/4">
                  <Button size="small">Details</Button>
                </Link>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Swiss Rail Solutions</TableCell>
              <TableCell>CHE123456789</TableCell>
              <TableCell>Bahnhofstrasse 10, 8000 Zürich, Schweiz</TableCell>
              <TableCell>Thomas Schneider</TableCell>
              <TableCell>t.schneider@srs.ch</TableCell>
              <TableCell><Badge color="success">Aktiv</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/kunden/5">
                  <Button size="small">Details</Button>
                </Link>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Deutsche Bahn Cargo</TableCell>
              <TableCell>DE987654321</TableCell>
              <TableCell>Potsdamer Platz 2, 10785 Berlin, Deutschland</TableCell>
              <TableCell>Martin Fischer</TableCell>
              <TableCell>m.fischer@db-cargo.de</TableCell>
              <TableCell><Badge color="success">Aktiv</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/kunden/6">
                  <Button size="small">Details</Button>
                </Link>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vienna Rail GmbH</TableCell>
              <TableCell>ATU11223344</TableCell>
              <TableCell>Westbahnstraße 28, 1070 Wien</TableCell>
              <TableCell>Thomas Huber</TableCell>
              <TableCell>t.huber@viennarail.at</TableCell>
              <TableCell><Badge color="warning">Inaktiv</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/kunden/7">
                  <Button size="small">Details</Button>
                </Link>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TransEuropa Logistics</TableCell>
              <TableCell>ATU55667788</TableCell>
              <TableCell>Hafenstraße 12, 4020 Linz</TableCell>
              <TableCell>Maria Berger</TableCell>
              <TableCell>m.berger@transeuropa.eu</TableCell>
              <TableCell><Badge color="informative">Interessent</Badge></TableCell>
              <TableCell className="flex space-x-2">
                <Link href="/kunden/8">
                  <Button size="small">Details</Button>
                </Link>
                <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="p-4 flex justify-between items-center">
          <Text>Zeige 1-8 von 24 Kunden</Text>
          <div className="flex space-x-2">
            <Button appearance="subtle" disabled>Zurück</Button>
            <Button appearance="subtle">1</Button>
            <Button appearance="subtle">2</Button>
            <Button appearance="subtle">3</Button>
            <Button appearance="subtle">Weiter</Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 