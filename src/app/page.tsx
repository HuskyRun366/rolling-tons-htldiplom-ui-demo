"use client";

import Link from "next/link";
import { 
  Card, 
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
            <span className="ml-4 text-sm">Willkommen zurück, Bill Meixner</span>
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
          <Title3>24</Title3>
          <span className="text-xs">Gesamtwert: €245.600</span>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center mb-2">
            <ShoppingBag24Regular className="mr-2 text-green-600" />
            <span className="font-semibold">Angenommene Angebote</span>
          </div>
          <Title3>18</Title3>
          <span className="text-xs">Erfolgsquote: 62%</span>
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
          <TabList defaultSelectedValue="offen">
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
              <TableRow>
                <TableCell>ANG-2025-042</TableCell>
                <TableCell>R.A.T.H. Logistik GmbH</TableCell>
                <TableCell>Wien - Hamburg</TableCell>
                <TableCell>04.05.2025</TableCell>
                <TableCell style={{ minWidth: '150px' }}><Badge color="warning">Offen</Badge></TableCell>
                <TableCell>€12.450</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center space-x-2 mr-1">
                    <Button icon={<DocumentSearch24Regular />} size="medium">Details</Button>
                    <Button icon={<DocumentPdf20Regular />} size="medium">PDF</Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ANG-2025-041</TableCell>
                <TableCell>Wiener Transport AG</TableCell>
                <TableCell>München - Wien</TableCell>
                <TableCell>02.05.2025</TableCell>
                <TableCell style={{ minWidth: '150px' }}><Badge color="success">Angenommen</Badge></TableCell>
                <TableCell>€9.870</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center space-x-2 mr-1">
                    <Button icon={<DocumentSearch24Regular />} size="medium">Details</Button>
                    <Button icon={<DocumentPdf20Regular />} size="medium">PDF</Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ANG-2025-040</TableCell>
                <TableCell>Alpen Cargo</TableCell>
                <TableCell>Salzburg - München</TableCell>
                <TableCell>30.04.2025</TableCell>
                <TableCell style={{ minWidth: '150px' }}><Badge color="warning">Offen</Badge></TableCell>
                <TableCell>€7.230</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center space-x-2 mr-1">
                    <Button icon={<DocumentSearch24Regular />} size="medium">Details</Button>
                    <Button icon={<DocumentPdf20Regular />} size="medium">PDF</Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ANG-2025-039</TableCell>
                <TableCell>ÖBB Rail Cargo</TableCell>
                <TableCell>Wien - Budapest</TableCell>
                <TableCell>28.04.2025</TableCell>
                <TableCell style={{ minWidth: '150px' }}><Badge color="danger">Abgelehnt</Badge></TableCell>
                <TableCell>€5.600</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center space-x-2 mr-1">
                    <Button icon={<DocumentSearch24Regular />} size="medium">Details</Button>
                    <Button icon={<DocumentPdf20Regular />} size="medium">PDF</Button>
                  </div>
                </TableCell>
              </TableRow>
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
            <span>Hier würde ein Chart zur Erfolgsquote angezeigt werden</span>
          </div>
        </Card>
      </div>
    </main>
  );
}
