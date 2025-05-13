"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
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
  TableCell,
  SelectionEvents, 
  OptionOnSelectData
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
import { useAngebote } from "@/contexts/AngebotContext";
import { useEffect, useState } from "react";

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
function calculateDaysRemaining(dateString: string) {
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

// Helper function to format currency robustly
const formatCurrencySmart = (value: any): string => {
  if (value === null || typeof value === 'undefined' || String(value).trim() === '') {
    return 'N/A';
  }
  
  let strValue = String(value);
  
  // Attempt 1: If it's already a number, format it.
  if (typeof value === 'number' && !isNaN(value)) {
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, '');
  }
  
  // Attempt 2: Try to parse it after cleaning typical currency/locale specific things for German numbers
  let numericStr = strValue.replace(/[€\s]/g, ''); // Remove € and spaces
  numericStr = numericStr.replace(/\./g, '');       // Remove thousand dots (e.g., 1.234 -> 1234)
  numericStr = numericStr.replace(/,/g, '.');       // Convert decimal comma to dot (e.g., 1234,56 -> 1234.56)
  
  let num = parseFloat(numericStr);
  
  if (!isNaN(num)) {
    return num.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, '');
  }
  
  // Attempt 3: Maybe it's a simple number string already (e.g. "1234.56" or "1234")
  // This will also catch cases where original was "123,45" and became "123.45" in numericStr
  num = parseFloat(strValue.replace(/,/g, '.')); // Only replace comma for this attempt, keep original dots
   if (!isNaN(num)) {
    return num.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, '');
  }

  return strValue; // If all parsing fails, return the original string value as a last resort instead of 'N/A' for already formatted strings.
};

export default function AngebotDetails() {
  const styles = useStyles();
  const params = useParams();
  const { getAngebotById, updateAngebot } = useAngebote();
  const [angebot, setAngebot] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (params.id) {
      const gefundenesAngebot = getAngebotById(params.id as string);
      setAngebot(gefundenesAngebot);
      setLoading(false);
    }
  }, [params.id, getAngebotById]);
  
  // Status-Badge-Farbe bestimmen
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'offen': return 'warning';
      case 'angenommen': return 'success';
      case 'abgelehnt': return 'danger';
      case 'storniert': return 'informative';
      default: return 'subtle';
    }
  };
  
  // Status ändern
  const handleStatusChange = (event: SelectionEvents, data: OptionOnSelectData) => {
    if (data.optionValue && angebot) {
      // Cast to status type as we know these are valid status values
      const newStatus = data.optionValue as 'offen' | 'angenommen' | 'abgelehnt' | 'storniert';
      console.log(`Changing status from ${angebot.status} to ${newStatus}`);
      
      // Update in context and refresh local state
      updateAngebot(angebot.id, { status: newStatus });
      setAngebot({ ...angebot, status: newStatus });
    }
  };
  
  if (loading) {
    return <div className="p-6">Angebot wird geladen...</div>;
  }
  
  if (!angebot) {
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
          </Breadcrumb>
        </div>
        <Title2>Angebot nicht gefunden</Title2>
        <div className="mt-4">
          <Button icon={<ArrowLeftRegular />}>
            <Link href="/angebote">Zurück zur Angebotsliste</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const daysRemaining = angebot.gueltigBis ? calculateDaysRemaining(angebot.gueltigBis) : null;
  
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
            <Badge color={getStatusBadgeColor(angebot.status) as any} size="large">
              {angebot.status.charAt(0).toUpperCase() + angebot.status.slice(1)}
            </Badge>
          </div>
          <Text weight="bold" className="mb-1">Status</Text>
          <select 
            value={angebot.status} 
            onChange={(e) => {
              const newStatus = e.target.value as 'offen' | 'angenommen' | 'abgelehnt' | 'storniert';
              console.log(`Changing status from ${angebot.status} to ${newStatus}`);
              updateAngebot(angebot.id, { status: newStatus });
              setAngebot({ ...angebot, status: newStatus });
            }}
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
            {formatCurrencySmart(angebot.summe)}
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
                  <Text className={styles.detailValue}>
                    {angebot.kontakt || 'h.wagner@rath-logistik.de'}
                  </Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Telefon:</Text>
                  <Text className={styles.detailValue}>
                    {angebot.telefon || '+43 1 234567-89'}
                  </Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Kundenreferenz:</Text>
                  <Text className={styles.detailValue}>
                    {angebot.kundenreferenz || 'LOG-2025-118'}
                  </Text>
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
                  <Text className={styles.detailValue}>{angebot.gueltigBis || 'Keine Angabe'}</Text>
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
                    <Text className={styles.detailValue}>{angebot.transportgut || 'Stahlbehälter (Industriegüter)'}</Text>
                  </div>
                  <div className={styles.detailRow}>
                    <Text className={styles.detailLabel}>Menge:</Text>
                    <Text className={styles.detailValue}>{angebot.menge || '24 Tonnen'}</Text>
                  </div>
                  <div className={styles.detailRow}>
                    <Text className={styles.detailLabel}>Transportperiode:</Text>
                    <Text className={styles.detailValue}>
                      {angebot.abfahrt && angebot.ankunft 
                        ? `${angebot.abfahrt.split(',')[0]} - ${angebot.ankunft.split(',')[0]}`
                        : '15.05.2025 - 20.05.2025'
                      }
                    </Text>
                  </div>
                </div>
                <div>
                  <div className={styles.routeCard}>
                    <Text weight="semibold" align="center">{angebot.route || 'Wien - Hamburg'}</Text>
                    <div className={styles.routeArrow}>↓</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Text weight="semibold">Abfahrt:</Text>
                        <Text>{angebot.abfahrt || '15.05.2025, 08:30'}</Text>
                      </div>
                      <div>
                        <Text weight="semibold">Ankunft:</Text>
                        <Text>{angebot.ankunft || '16.05.2025, 14:30'}</Text>
                      </div>
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
                    <TableCell>Transport {angebot.transportgut || 'Stahlbehälter'} {angebot.route || 'Wien - Hamburg'}</TableCell>
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
                  <Text weight="semibold" size={400}>{angebot.summe || '€ 12.423,25'}</Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
} 