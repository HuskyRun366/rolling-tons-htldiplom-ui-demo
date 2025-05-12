"use client";

import Link from "next/link";
import { 
  Card, 
  Text, 
  Title3,
  Button,
  TabList,
  Tab,
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

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title3>Rolling-Tons Angebotssoftware</Title3>
            <Text size={300} className="ml-4">Willkommen zurück, Bill Meixner</Text>
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
            <Text weight="semibold">Offene Angebote</Text>
          </div>
          <Title3>24</Title3>
          <Text size={200}>Gesamtwert: €245.600</Text>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center mb-2">
            <ShoppingBag24Regular className="mr-2 text-green-600" />
            <Text weight="semibold">Angenommene Angebote</Text>
          </div>
          <Title3>18</Title3>
          <Text size={200}>Erfolgsquote: 62%</Text>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center mb-2">
            <People24Regular className="mr-2 text-purple-600" />
            <Text weight="semibold">Aktive Kunden</Text>
          </div>
          <Title3>42</Title3>
          <Text size={200}>Neukunden im Monat: 3</Text>
        </Card>
      </div>
      
      <Card className="mb-6">
        <div className="px-4 pt-4">
          <Title3>Aktuelle Angebote</Title3>
          <TabList defaultSelectedValue="offen">
            <Tab value="alle">Alle</Tab>
            <Tab value="offen">Offen</Tab>
            <Tab value="angenommen">Angenommen</Tab>
            <Tab value="abgelehnt">Abgelehnt</Tab>
          </TabList>
        </div>
        
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
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
              <TableRow>
                <TableCell>TransEuropa Logistics</TableCell>
                <TableCell>Maria Berger</TableCell>
                <TableCell>25.04.2025</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vienna Rail GmbH</TableCell>
                <TableCell>Thomas Huber</TableCell>
                <TableCell>20.04.2025</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
        
        <Card className="p-4">
          <Title3>Erfolgsquote nach Region</Title3>
          <div className="h-40 flex items-center justify-center">
            <Text>Hier würde ein Chart zur Erfolgsquote angezeigt werden</Text>
          </div>
        </Card>
      </div>
    </main>
  );
}
