"use client";

import Link from "next/link";
import { 
  Button, 
  Title2, 
  Title3,
  Card, 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  Text,
  Divider,
  Badge,
  Dropdown,
  Option,
  TabList,
  Tab,
  makeStyles,
  tokens,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell
} from "@fluentui/react-components";
import { 
  ArrowLeftRegular,
  DocumentPdf24Regular,
  DocumentEdit24Regular,
  MailRegular,
  DocumentCopy24Regular,
  HistoryRegular,
  CopyRegular,
  ChatRegular,
  NoteRegular,
  DocumentRegular,
  MoneyRegular,
  CalculatorRegular,
  LocationRegular
} from "@fluentui/react-icons";
import { useState } from "react";

const useStyles = makeStyles({
  detailCard: {
    padding: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalS,
  },
  detailBody: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: tokens.spacingHorizontalM,
  },
  detailRow: {
    display: 'flex',
    marginBottom: tokens.spacingVerticalXS,
  },
  detailLabel: {
    width: '40%',
    color: tokens.colorNeutralForeground2,
  },
  detailValue: {
    width: '60%',
    fontWeight: tokens.fontWeightSemibold,
  },
  costBreakdown: {
    marginTop: tokens.spacingVerticalL,
  },
  routeCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: tokens.spacingVerticalM,
  },
  routeArrow: {
    textAlign: 'center',
    margin: tokens.spacingVerticalS + ' 0',
  },
  statusCards: {
    display: 'flex',
    marginBottom: tokens.spacingVerticalL,
    gap: tokens.spacingHorizontalM,
  },
  statusCard: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: tokens.spacingVerticalL,
  }
});

// Funktion zum Formatieren des Datums für die Anzeige "noch X Tage"
function calculateDaysRemaining(dateString: string): number | null {
  if (!dateString) return null;
  
  const dateParts = dateString.split('.');
  if (dateParts.length !== 3) return null;
  
  const dueDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
  const today = new Date();
  
  // Unterschied in Millisekunden
  const diffTime = dueDate.getTime() - today.getTime();
  // Unterschied in Tagen
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
}

export default function AngebotDetails() {
  const styles = useStyles();
  const [status, setStatus] = useState('offen');
  
  // Status-Badge-Farbe bestimmen
  const getStatusBadgeColor = (status: string): string => {
    switch (status) {
      case 'offen': return 'warning';
      case 'angenommen': return 'success';
      case 'abgelehnt': return 'danger';
      case 'storniert': return 'informative';
      default: return 'subtle';
    }
  };
  
  const angebot = {
    id: "ang-2025-042",
    nummer: "ANG-2025-042",
    erstelldatum: "04.05.2025", 
    gueltigBis: "04.06.2025",
    kunde: "R.A.T.H. Logistik GmbH",
    ansprechpartner: "Dr. Hans Wagner",
    kontakt: "h.wagner@rath-logistik.de",
    telefon: "+43 1 234567-89",
    kundenreferenz: "LOG-2025-118",
    summe: "€12.450,00",
    transportgut: "Stahlbehälter (Industriegüter)",
    menge: "42 Tonnen",
    route: "Wien - Hamburg",
    abfahrt: "15.05.2025, 08:30",
    ankunft: "16.05.2025, 14:30"
  };
  
  const daysRemaining = calculateDaysRemaining(angebot.gueltigBis);
  
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
          <BreadcrumbItem>{angebot.nummer}</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <Title2>Angebot {angebot.nummer}</Title2>
          <Text className="ml-1">Erstellt am {angebot.erstelldatum} durch Bill Meixner</Text>
        </div>
        <div className="flex space-x-3">
          <Button icon={<ArrowLeftRegular />}>
            <Link href="/angebote">Zurück</Link>
          </Button>
          <Button icon={<DocumentPdf24Regular />}>PDF</Button>
          <Link href={`/angebote/${angebot.id}/bearbeiten`}>
            <Button icon={<DocumentEdit24Regular />}>Bearbeiten</Button>
          </Link>
          <Button icon={<MailRegular />}>E-Mail</Button>
          <Button icon={<DocumentCopy24Regular />}>Duplizieren</Button>
        </div>
      </div>

      <div className={styles.statusCards}>
        <Card className={styles.statusCard}>
          <div className="flex mb-4">
            <Badge color={getStatusBadgeColor(status) as any} size="large">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <Text weight="bold" className="mb-1">Status</Text>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="offen">Offen</option>
            <option value="angenommen">Angenommen</option>
            <option value="abgelehnt">Abgelehnt</option>
            <option value="storniert">Storniert</option>
          </select>
        </Card>
        
        <Card className={styles.statusCard}>
          <div className="flex mb-4">
            <HistoryRegular className="text-blue-600 text-2xl" />
          </div>
          <Text weight="bold" className="mb-2">Gültig bis</Text>
          <Text>
            {angebot.gueltigBis}{daysRemaining !== null && ` (noch ${daysRemaining} Tage)`}
          </Text>
        </Card>
        
        <Card className={styles.statusCard}>
          <div className="flex mb-4">
            <MoneyRegular className="text-green-600 text-2xl" />
          </div>
          <Text weight="bold" className="mb-2">Gesamtsumme</Text>
          <Text size={500}>
            {angebot.summe}
          </Text>
        </Card>
        
        <Card className={styles.statusCard}>
          <div className="flex mb-4">
            <CopyRegular className="text-purple-600 text-2xl" />
          </div>
          <Text weight="bold" className="mb-2">Version</Text>
          <Text>1.0 (Original)</Text>
        </Card>
      </div>
      
      <Card>
        <div className="p-4">
          <TabList defaultSelectedValue="details">
            <Tab value="details">Details</Tab>
            <Tab value="calculation">Kalkulation</Tab>
            <Tab value="history">Versionshistorie</Tab>
            <Tab value="documents">Dokumente</Tab>
            <Tab value="notes">Notizen</Tab>
          </TabList>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={styles.detailCard}>
              <div className={styles.detailHeader}>
                <Title3>Kundeninformationen</Title3>
                <ChatRegular />
              </div>
              <Divider />
              <div className="mt-4">
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Kunde:</Text>
                  <Text className={styles.detailValue}>{angebot.kunde}</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Ansprechpartner:</Text>
                  <Text className={styles.detailValue}>{angebot.ansprechpartner}</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Kontakt:</Text>
                  <Text className={styles.detailValue}>{angebot.kontakt}</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Telefon:</Text>
                  <Text className={styles.detailValue}>{angebot.telefon}</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Kundenreferenz:</Text>
                  <Text className={styles.detailValue}>{angebot.kundenreferenz}</Text>
                </div>
              </div>
            </Card>

            <Card className={styles.detailCard}>
              <div className={styles.detailHeader}>
                <Title3>Angebotsdetails</Title3>
                <DocumentRegular />
              </div>
              <Divider />
              <div className="mt-4">
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Angebotsnr.:</Text>
                  <Text className={styles.detailValue}>{angebot.nummer}</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Erstelldatum:</Text>
                  <Text className={styles.detailValue}>{angebot.erstelldatum}</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Gültig bis:</Text>
                  <Text className={styles.detailValue}>{angebot.gueltigBis}</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Erstellt von:</Text>
                  <Text className={styles.detailValue}>Bill Meixner</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Vertragsart:</Text>
                  <Text className={styles.detailValue}>Einzelangebot</Text>
                </div>
              </div>
            </Card>
          </div>
          
          <Card className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <Title3>Transportdetails</Title3>
              <LocationRegular />
            </div>
            <Divider />
            
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className={styles.detailRow}>
                    <Text className={styles.detailLabel}>Transportgut:</Text>
                    <Text className={styles.detailValue}>{angebot.transportgut}</Text>
                  </div>
                  <div className={styles.detailRow}>
                    <Text className={styles.detailLabel}>Menge:</Text>
                    <Text className={styles.detailValue}>{angebot.menge}</Text>
                  </div>
                  <div className={styles.detailRow}>
                    <Text className={styles.detailLabel}>Transportperiode:</Text>
                    <Text className={styles.detailValue}>
                      {angebot.abfahrt && angebot.ankunft 
                        ? `${angebot.abfahrt.split(',')[0]} - ${angebot.ankunft.split(',')[0]}`
                        : '15.05.2025 - 16.05.2025'
                      }
                    </Text>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Title3 className="mb-6">Route</Title3>
                <div className="flex items-center justify-between w-full px-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                      <Text size={400}>AT</Text>
                    </div>
                    <div>
                      <Text weight="semibold" as="span">Wien Hauptbahnhof</Text>
                      <Text size={200} as="span" className="ml-2">Wien, Österreich</Text>
                    </div>
                  </div>
                  
                  <div className="flex-1 mx-6">
                    <div className="h-0.5 bg-gray-200 relative w-full">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 whitespace-nowrap">
                        <Text>920 km</Text>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                      <Text size={400}>DE</Text>
                    </div>
                    <div>
                      <Text weight="semibold" as="span">Hamburg Hauptbahnhof</Text>
                      <Text size={200} as="span" className="ml-2">Hamburg, Deutschland</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <Title3>Finanzübersicht</Title3>
              <CalculatorRegular />
            </div>
            <Divider />
            
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Position</TableHeaderCell>
                    <TableHeaderCell>Beschreibung</TableHeaderCell>
                    <TableHeaderCell>Menge</TableHeaderCell>
                    <TableHeaderCell>Preis</TableHeaderCell>
                    <TableHeaderCell>Summe</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Transport {angebot.transportgut} {angebot.route}</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>€ 9.800,00</TableCell>
                    <TableCell>€ 9.800,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Versicherung für Spezialgüter</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>€ 850,00</TableCell>
                    <TableCell>€ 850,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>Be- und Entladekosten</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>€ 400,00</TableCell>
                    <TableCell>€ 800,00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className={styles.costBreakdown}>
                <div className="flex justify-between py-2">
                  <Text weight="semibold">Nettosumme:</Text>
                  <Text>€ 11.450,00</Text>
                </div>
                <div className="flex justify-between py-2">
                  <Text weight="semibold">MwSt. (8,5%):</Text>
                  <Text>€ 973,25</Text>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between py-2">
                  <Text weight="semibold" size={400}>Gesamtsumme:</Text>
                  <Text weight="semibold" size={400}>{angebot.summe}</Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
} 