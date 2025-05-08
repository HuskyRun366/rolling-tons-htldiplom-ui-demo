"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Button,
  Input,
  Title3,
  makeStyles,
  tokens,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Card,
  CardHeader,
  Badge,
  Avatar
} from "@fluentui/react-components";
import {
  PersonAdd24Regular,
  Search24Regular,
  Filter24Regular,
  ArrowDownload24Regular,
  Edit24Regular,
  Delete24Regular,
  Mail24Regular,
  Phone24Regular,
  Building24Regular,
  Location24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  searchInput: {
    maxWidth: "400px",
    flexGrow: 1,
  },
  searchFilters: {
    display: "flex",
    gap: "8px",
  },
  cardContainer: {
    marginBottom: "24px",
  },
  tableActions: {
    display: "flex",
    gap: "8px",
  },
  customerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  customerDetails: {
    display: "flex",
    flexDirection: "column",
  },
  contactInfo: {
    display: "flex", 
    alignItems: "center", 
    gap: "4px", 
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  customerCard: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    marginBottom: "16px",
    gap: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  badgeContainer: {
    display: "flex",
    gap: "4px",
    marginTop: "4px",
  },
  inlineContainer: {
    display: "inline-block",
  }
});

export default function CustomersPage() {
  const styles = useStyles();

  // Mock-Daten für Kunden
  const customers = [
    { 
      id: "C001", 
      name: "Metallwerk GmbH", 
      contactPerson: "Thomas Schmidt", 
      email: "t.schmidt@metallwerk.at", 
      phone: "+43 1 234567", 
      address: "Industriestraße 45, 1200 Wien, Österreich",
      type: "Industrie",
      offers: 6,
      status: "Aktiv"
    },
    { 
      id: "C002", 
      name: "CargoFast AG", 
      contactPerson: "Sabine Müller", 
      email: "sabine.mueller@cargofast.ch", 
      phone: "+41 44 567890", 
      address: "Bahnhofplatz 3, 8000 Zürich, Schweiz",
      type: "Logistik",
      offers: 4,
      status: "Aktiv"
    },
    { 
      id: "C003", 
      name: "Express Logistics", 
      contactPerson: "Michael Weber", 
      email: "m.weber@expresslogistics.de", 
      phone: "+49 30 1234567", 
      address: "Frachtstraße 28, 10115 Berlin, Deutschland",
      type: "Logistik",
      offers: 8,
      status: "Aktiv"
    },
    { 
      id: "C004", 
      name: "Transalpine GmbH", 
      contactPerson: "Julia Berger", 
      email: "j.berger@transalpine.com", 
      phone: "+43 662 234567", 
      address: "Alpenstraße 76, 5020 Salzburg, Österreich",
      type: "Transport",
      offers: 3,
      status: "Aktiv"
    },
    { 
      id: "C005", 
      name: "BSW Transport", 
      contactPerson: "Andreas Huber", 
      email: "a.huber@bsw-transport.at", 
      phone: "+43 316 987654", 
      address: "Hauptplatz 12, 8010 Graz, Österreich",
      type: "Transport",
      offers: 5,
      status: "Aktiv"
    },
    { 
      id: "C006", 
      name: "CargoXpress", 
      contactPerson: "Nicole Bauer", 
      email: "nbauer@cargo-xpress.de", 
      phone: "+49 89 4567890", 
      address: "Zeppelinstraße 8, 85356 München, Deutschland",
      type: "Logistik",
      offers: 7,
      status: "Aktiv"
    },
    { 
      id: "C007", 
      name: "Logistik Union", 
      contactPerson: "Stefan Mayer", 
      email: "s.mayer@logistikunion.de", 
      phone: "+49 69 7654321", 
      address: "Industriepark 54, 60528 Frankfurt, Deutschland",
      type: "Logistik",
      offers: 6,
      status: "Aktiv"
    },
    { 
      id: "C008", 
      name: "BahnCargo AG", 
      contactPerson: "Lisa Wagner", 
      email: "l.wagner@bahncargo.de", 
      phone: "+49 40 1234567", 
      address: "Hafenstraße 102, 20457 Hamburg, Deutschland",
      type: "Transport",
      offers: 9,
      status: "Aktiv"
    },
    { 
      id: "C009", 
      name: "TransEurope SA", 
      contactPerson: "Jean Dupont", 
      email: "j.dupont@transeurope.fr", 
      phone: "+33 1 9876543", 
      address: "Avenue des Transports 23, 75008 Paris, Frankreich",
      type: "Logistik",
      offers: 4,
      status: "Inaktiv"
    },
  ];

  // Generiere Initialen für den Avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Generiere eine zufällige Farbe für den Avatar basierend auf der Kunden-ID
  const getAvatarColor = (id: string) => {
    const colors = [
      tokens.colorPaletteRedBackground2,
      tokens.colorPaletteGreenBackground2,
      tokens.colorPaletteBlueBackground2,
      tokens.colorPaletteDarkOrangeBackground2,
      tokens.colorPaletteTealBackground2,
      tokens.colorPaletteBerryBackground2,
    ];
    const index = parseInt(id.replace('C', '')) % colors.length;
    return colors[index];
  };

  return (
    <MainLayout>
      <span className={styles.header}>
        <Title3>Kundenverwaltung</Title3>
        <Button 
          icon={<PersonAdd24Regular />} 
          appearance="primary"
          as="a"
          href="/customers/new"
        >
          Neuen Kunden anlegen
        </Button>
      </span>

      <Card className={styles.cardContainer}>
        <CardHeader>
          <span className={styles.searchContainer}>
            <Input 
              className={styles.searchInput}
              placeholder="Kunden durchsuchen (Name, Ansprechpartner, Adresse...)" 
              contentBefore={<Search24Regular />}
            />
            <span className={styles.searchFilters}>
              <Button icon={<Filter24Regular />} appearance="subtle">
                Filter
              </Button>
              <Button icon={<ArrowDownload24Regular />} appearance="subtle">
                Exportieren
              </Button>
            </span>
          </span>
        </CardHeader>

        <Table aria-label="Kundenliste">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Kunde</TableHeaderCell>
              <TableHeaderCell>Kontaktperson</TableHeaderCell>
              <TableHeaderCell>Kontaktdaten</TableHeaderCell>
              <TableHeaderCell>Kategorie</TableHeaderCell>
              <TableHeaderCell>Angebote</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Aktionen</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <span className={styles.customerInfo}>
                    <Avatar 
                      name={customer.name} 
                      initials={getInitials(customer.name)} 
                      color="colorful"
                      style={{ backgroundColor: getAvatarColor(customer.id) }}
                    />
                    <span className={styles.customerDetails}>
                      <Text weight="semibold">{customer.name}</Text>
                      <Text size={200} className={styles.contactInfo}>
                        <Location24Regular fontSize={12} /> {customer.address.split(',')[0]}
                      </Text>
                    </span>
                  </span>
                </TableCell>
                <TableCell>{customer.contactPerson}</TableCell>
                <TableCell>
                  <span className={styles.customerDetails}>
                    <span className={styles.contactInfo}>
                      <Mail24Regular fontSize={12} /> {customer.email}
                    </span>
                    <span className={styles.contactInfo}>
                      <Phone24Regular fontSize={12} /> {customer.phone}
                    </span>
                  </span>
                </TableCell>
                <TableCell>
                  <span className={styles.inlineContainer}>
                    <Badge appearance="tint" color={customer.type === "Logistik" ? "brand" : customer.type === "Transport" ? "informative" : "success"}>
                      {customer.type}
                    </Badge>
                  </span>
                </TableCell>
                <TableCell>{customer.offers}</TableCell>
                <TableCell>
                  <span className={styles.inlineContainer}>
                    <Badge appearance="filled" color={customer.status === "Aktiv" ? "success" : "danger"}>
                      {customer.status}
                    </Badge>
                  </span>
                </TableCell>
                <TableCell>
                  <span className={styles.tableActions}>
                    <Button icon={<Edit24Regular />} appearance="subtle" title="Bearbeiten" />
                    <Button icon={<Delete24Regular />} appearance="subtle" title="Löschen" />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </MainLayout>
  );
} 