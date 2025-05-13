"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Card, 
  Title3,
  Button,
  TabList,
  Tab,
  TabValue,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge
} from "@fluentui/react-components";
import { 
  DocumentAdd24Regular, 
  DocumentPdf20Regular, 
  DocumentSearch24Regular, 
  DocumentText24Regular, 
  People24Regular, 
  ShoppingBag24Regular 
} from "@fluentui/react-icons";
import { useAngebote, Angebot } from "@/contexts/AngebotContext";

const getStatusBadgeColor = (status: Angebot['status']) => {
  switch (status) {
    case 'offen': return 'warning';
    case 'angenommen': return 'success';
    case 'abgelehnt': return 'danger';
    case 'storniert': return 'informative';
    default: return 'subtle';
  }
};

export default function Dashboard() {
  const { angebote } = useAngebote();
  const [selectedTab, setSelectedTab] = useState<TabValue>("offen");

  const filteredAngebote = useMemo(() => {
    if (selectedTab === "alle") {
      return angebote;
    }
    return angebote.filter(angebot => angebot.status === selectedTab);
  }, [angebote, selectedTab]);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title3>Rolling-Tons Angebotssoftware</Title3>
            <span className="ml-4 text-sm">Willkommen zurück, Max Mustermann</span>
          </div>
          <Link href="/angebote/neu">
            <Button appearance="primary" icon={<DocumentAdd24Regular />}>Neues Angebot</Button>
          </Link>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center mb-2">
            <DocumentText24Regular className="mr-2 text-blue-600" />
            <span className="font-semibold">Offene Angebote</span>
          </div>
          <Title3>{angebote.filter(a => a.status === 'offen').length}</Title3>
          <span className="text-xs">Gesamtwert: €{angebote.filter(a => a.status === 'offen').reduce((sum, a) => sum + parseFloat(a.summe.replace('€', '').replace('.', '').replace(',', '.')), 0).toLocaleString('de-DE')}</span>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center mb-2">
            <ShoppingBag24Regular className="mr-2 text-green-600" />
            <span className="font-semibold">Angenommene Angebote</span>
          </div>
          <Title3>{angebote.filter(a => a.status === 'angenommen').length}</Title3>
          <span className="text-xs">Erfolgsquote: {angebote.length > 0 ? ((angebote.filter(a => a.status === 'angenommen').length / angebote.length) * 100).toFixed(0) : 0}%</span>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center mb-2">
            <People24Regular className="mr-2 text-purple-600" />
            <span className="font-semibold">Aktive Kunden</span>
          </div>
          <Title3>42</Title3>
          <span className="text-xs">Neukunden im Monat: 3</span>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="px-4 pt-4">
          <Title3>Aktuelle Angebote</Title3>
          <TabList 
            selectedValue={selectedTab} 
            onTabSelect={(_, data) => setSelectedTab(data.value)}
          >
            <Tab value="alle">Alle</Tab>
            <Tab value="offen">Offen</Tab>
            <Tab value="angenommen">Angenommen</Tab>
            <Tab value="abgelehnt">Abgelehnt</Tab>
          </TabList>

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Angebotsnr.</TableHeaderCell>
                <TableHeaderCell>Kunde</TableHeaderCell>
                <TableHeaderCell>Route</TableHeaderCell>
                <TableHeaderCell>Erstelldatum</TableHeaderCell>
                <TableHeaderCell style={{ minWidth: '150px' }}>Status</TableHeaderCell>
                <TableHeaderCell>Summe</TableHeaderCell>
                <TableHeaderCell>Aktionen</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAngebote.length > 0 ? (
                filteredAngebote.map((angebot) => (
                  <TableRow key={angebot.id}>
                    <TableCell>{angebot.nummer}</TableCell>
                    <TableCell>{angebot.kunde}</TableCell>
                    <TableCell>{angebot.route}</TableCell>
                    <TableCell>{angebot.erstelldatum}</TableCell>
                    <TableCell style={{ minWidth: '150px' }}>
                      <Badge color={getStatusBadgeColor(angebot.status) as any}>{angebot.status.charAt(0).toUpperCase() + angebot.status.slice(1)}</Badge>
                    </TableCell>
                    <TableCell>{angebot.summe}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center space-x-2 mr-1">
                        <Link href={`/angebote/${angebot.id}`} passHref>
                           <Button icon={<DocumentSearch24Regular />} size="medium">Details</Button>
                        </Link>
                        <Button icon={<DocumentPdf20Regular />} size="medium">PDF</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                    Keine Angebote für den gewählten Status gefunden.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <Title3>Neueste Kunden</Title3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Kontakt</TableHeaderCell>
                <TableHeaderCell>Erstelldatum</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alpen Cargo</TableCell>
                <TableCell>Karl Meyer</TableCell>
                <TableCell>29.04.2025</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
        
        <Card className="p-4">
          <Title3>Erfolgsquote nach Region</Title3>
          <div className="h-40 flex items-center justify-center">
            <span>Hier würde ein Chart zur Erfolgsquote angezeigt werden</span>
          </div>
        </Card>
      </div>
    </main>
  );
}
