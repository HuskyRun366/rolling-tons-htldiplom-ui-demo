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
  TabValue,
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
  LocationRegular,
  DeleteRegular
} from "@fluentui/react-icons";

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
  }
});

export default function AngebotDetails() {
  const styles = useStyles();
  
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
          <BreadcrumbItem>ANG-2025-042</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <Title2>Angebot ANG-2025-042</Title2>
          <Text>Erstellt am 04.05.2025 durch Bill Meixner</Text>
        </div>
        <div className="flex space-x-3">
          <Button icon={<ArrowLeftRegular />}>
            <Link href="/angebote">Zurück</Link>
          </Button>
          <Button icon={<DocumentPdf24Regular />}>PDF</Button>
          <Button icon={<DocumentEdit24Regular />}>Bearbeiten</Button>
          <Button icon={<MailRegular />}>E-Mail</Button>
          <Button icon={<DocumentCopy24Regular />}>Duplizieren</Button>
        </div>
      </div>

      <div className="flex mb-6">
        <Card className="p-3 flex-1 mr-4">
          <div className="flex items-center">
            <Badge color="warning" size="large" className="mr-2">Offen</Badge>
            <div>
              <Text weight="semibold">Status</Text>
              <Dropdown>
                <Option value="open">Offen</Option>
                <Option value="sent">Gesendet</Option>
                <Option value="accepted">Angenommen</Option>
                <Option value="rejected">Abgelehnt</Option>
                <Option value="canceled">Storniert</Option>
              </Dropdown>
            </div>
          </div>
        </Card>
        <Card className="p-3 flex-1 mr-4">
          <div className="flex items-center">
            <HistoryRegular className="mr-2 text-blue-600" />
            <div>
              <Text weight="semibold">Gültig bis</Text>
              <Text>04.06.2025 (noch 30 Tage)</Text>
            </div>
          </div>
        </Card>
        <Card className="p-3 flex-1 mr-4">
          <div className="flex items-center">
            <MoneyRegular className="mr-2 text-green-600" />
            <div>
              <Text weight="semibold">Gesamtsumme</Text>
              <Text size={500}>€12.450,00</Text>
            </div>
          </div>
        </Card>
        <Card className="p-3 flex-1">
          <div className="flex items-center">
            <CopyRegular className="mr-2 text-purple-600" />
            <div>
              <Text weight="semibold">Version</Text>
              <Text>1.0 (Original)</Text>
            </div>
          </div>
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
                  <Text className={styles.detailValue}>R.A.T.H. Logistik GmbH</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Ansprechpartner:</Text>
                  <Text className={styles.detailValue}>Dr. Hans Wagner</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Kontakt:</Text>
                  <Text className={styles.detailValue}>h.wagner@rath-logistik.de</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Telefon:</Text>
                  <Text className={styles.detailValue}>+43 1 234567-89</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Kundenreferenz:</Text>
                  <Text className={styles.detailValue}>LOG-2025-118</Text>
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
                  <Text className={styles.detailValue}>ANG-2025-042</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Erstelldatum:</Text>
                  <Text className={styles.detailValue}>04.05.2025</Text>
                </div>
                <div className={styles.detailRow}>
                  <Text className={styles.detailLabel}>Gültig bis:</Text>
                  <Text className={styles.detailValue}>04.06.2025</Text>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <div className={styles.detailRow}>
                    <Text className={styles.detailLabel}>Transportgut:</Text>
                    <Text className={styles.detailValue}>Stahlbehälter (Industriegüter)</Text>
                  </div>
                  <div className={styles.detailRow}>
                    <Text className={styles.detailLabel}>Gewicht:</Text>
                    <Text className={styles.detailValue}>42 Tonnen</Text>
                  </div>
                  <div className={styles.detailRow}>
                    <Text className={styles.detailLabel}>Anzahl Waggons:</Text>
                    <Text className={styles.detailValue}>3</Text>
                  </div>
                </div>
                <div>
                  <div className={styles.detailRow}>
                    <Text className={styles.detailLabel}>Transportperiode:</Text>
                    <Text className={styles.detailValue}>15.05.2025 - 20.05.2025</Text>
                  </div>
                  <div className={styles.detailRow}>
                    <Text className={styles.detailLabel}>Priorität:</Text>
                    <Text className={styles.detailValue}>Standard</Text>
                  </div>
                  <div className={styles.detailRow}>
                    <Text className={styles.detailLabel}>Besonderheiten:</Text>
                    <Text className={styles.detailValue}>Leerfahrt inkludiert</Text>
                  </div>
                </div>
              </div>
              
              <div className={styles.routeCard}>
                <Title3>Route</Title3>
                <div className="flex flex-col items-center mt-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">AT</div>
                      <Text weight="semibold">Wien Hauptbahnhof</Text>
                      <Text size={200}>Wien, Österreich</Text>
                    </div>
                    
                    <div className="flex-1 h-1 bg-gray-200 mx-4 relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                        <Text>920 km</Text>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">DE</div>
                      <Text weight="semibold">Hamburg Hauptbahnhof</Text>
                      <Text size={200}>Hamburg, Deutschland</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <Title3>Kalkulation</Title3>
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
                    <TableHeaderCell>Einheit</TableHeaderCell>
                    <TableHeaderCell>Einzelpreis</TableHeaderCell>
                    <TableHeaderCell>Gesamtpreis</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Trassenkosten Wien-Hamburg</TableCell>
                    <TableCell>920</TableCell>
                    <TableCell>km</TableCell>
                    <TableCell>€6,50</TableCell>
                    <TableCell>€5.980,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Lokomotivkosten</TableCell>
                    <TableCell>18</TableCell>
                    <TableCell>Stunden</TableCell>
                    <TableCell>€280,00</TableCell>
                    <TableCell>€5.040,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>Personalkosten</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>Pauschale</TableCell>
                    <TableCell>€950,00</TableCell>
                    <TableCell>€950,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>4</TableCell>
                    <TableCell>Energiekosten</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>Pauschale</TableCell>
                    <TableCell>€480,00</TableCell>
                    <TableCell>€480,00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="flex justify-end mt-6">
                <div className="w-64">
                  <div className="flex justify-between mb-2">
                    <Text>Nettosumme:</Text>
                    <Text weight="semibold">€12.450,00</Text>
                  </div>
                  <div className="flex justify-between mb-2">
                    <Text>MwSt. (20%):</Text>
                    <Text weight="semibold">€2.490,00</Text>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex justify-between">
                    <Text weight="semibold">Gesamtsumme:</Text>
                    <Text weight="semibold" size={400}>€14.940,00</Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-between mt-6">
            <Button icon={<ArrowLeftRegular />}>
              <Link href="/angebote">Zurück zur Übersicht</Link>
            </Button>
            <div className="flex space-x-3">
              <Button appearance="outline" icon={<DeleteRegular />}>Löschen</Button>
              <Button appearance="primary" icon={<DocumentPdf24Regular />}>PDF herunterladen</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 