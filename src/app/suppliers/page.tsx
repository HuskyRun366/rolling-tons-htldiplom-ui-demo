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
  Building24Regular,
  Search24Regular,
  Filter24Regular,
  ArrowDownload24Regular,
  Edit24Regular,
  Delete24Regular,
  Mail24Regular,
  Phone24Regular,
  Location24Regular
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
  supplierInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  supplierDetails: {
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
  inlineContainer: {
    display: "inline-block",
  }
});

export default function SuppliersPage() {
  const styles = useStyles();

  // Mock-Daten für Lieferanten
  const suppliers = [
    { 
      id: "S001", 
      name: "Rail Transport Solutions GmbH", 
      contactPerson: "Andreas Weber", 
      email: "a.weber@rts-gmbh.at", 
      phone: "+43 1 987654", 
      address: "Transportweg 12, 1030 Wien, Österreich",
      type: "Lokomotiven",
      status: "Aktiv"
    },
    { 
      id: "S002", 
      name: "European Rail Services", 
      contactPerson: "Katharina Müller", 
      email: "k.mueller@ers.eu", 
      phone: "+49 30 456789", 
      address: "Bahnstraße 45, 10557 Berlin, Deutschland",
      type: "Waggons",
      status: "Aktiv"
    },
    { 
      id: "S003", 
      name: "Öster-Rail AG", 
      contactPerson: "Thomas Huber", 
      email: "t.huber@oester-rail.at", 
      phone: "+43 662 123456", 
      address: "Salzburger Straße 78, 5020 Salzburg, Österreich",
      type: "Schienendienstleistungen",
      status: "Aktiv"
    },
    { 
      id: "S004", 
      name: "Cargo Components Europe", 
      contactPerson: "Elisabeth Fischer", 
      email: "e.fischer@cargocomp.eu", 
      phone: "+43 316 654321", 
      address: "Industriestraße 34, 8010 Graz, Österreich",
      type: "Ersatzteile",
      status: "Aktiv"
    },
    { 
      id: "S005", 
      name: "FreightTech Solutions", 
      contactPerson: "Michael Bauer", 
      email: "m.bauer@freighttech.com", 
      phone: "+49 89 756489", 
      address: "Münchner Platz 3, 80331 München, Deutschland",
      type: "Software",
      status: "Inaktiv"
    },
    { 
      id: "S006", 
      name: "AlpenRail Services", 
      contactPerson: "Sabine Gruber", 
      email: "s.gruber@alpenrail.at", 
      phone: "+43 512 345678", 
      address: "Bahnhofstraße 22, 6020 Innsbruck, Österreich",
      type: "Schienendienstleistungen",
      status: "Aktiv"
    },
    { 
      id: "S007", 
      name: "Traction Systems GmbH", 
      contactPerson: "Robert Wagner", 
      email: "r.wagner@traction-systems.de", 
      phone: "+49 69 987612", 
      address: "Lokomotivenweg 1, 60329 Frankfurt, Deutschland",
      type: "Lokomotiven",
      status: "Aktiv"
    }
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

  // Generiere eine zufällige Farbe für den Avatar basierend auf der Lieferanten-ID
  const getAvatarColor = (id: string) => {
    const colors = [
      tokens.colorPaletteMarigoldBackground2,
      tokens.colorPaletteBerryBackground2,
      tokens.colorPaletteLightTealBackground2,
      tokens.colorPaletteSeafoamBackground2,
      tokens.colorPaletteBrassBackground2,
      tokens.colorPaletteDarkOrangeBackground2,
    ];
    const index = parseInt(id.replace('S', '')) % colors.length;
    return colors[index];
  };

  return (
    <MainLayout>
      <span className={styles.header}>
        <Title3>Lieferantenverwaltung</Title3>
        <Button 
          icon={<Building24Regular />} 
          appearance="primary"
          as="a"
          href="/suppliers/new"
        >
          Neuen Lieferanten anlegen
        </Button>
      </span>

      <Card className={styles.cardContainer}>
        <CardHeader>
          <span className={styles.searchContainer}>
            <Input 
              className={styles.searchInput}
              placeholder="Lieferanten durchsuchen (Name, Ansprechpartner, Adresse...)" 
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

        <Table aria-label="Lieferantenliste">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Lieferant</TableHeaderCell>
              <TableHeaderCell>Kontaktperson</TableHeaderCell>
              <TableHeaderCell>Kontaktdaten</TableHeaderCell>
              <TableHeaderCell>Kategorie</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Aktionen</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>
                  <span className={styles.supplierInfo}>
                    <Avatar 
                      name={supplier.name} 
                      initials={getInitials(supplier.name)} 
                      color="colorful"
                      style={{ backgroundColor: getAvatarColor(supplier.id) }}
                    />
                    <span className={styles.supplierDetails}>
                      <Text weight="semibold">{supplier.name}</Text>
                      <Text size={200} className={styles.contactInfo}>
                        <Location24Regular fontSize={12} /> {supplier.address.split(',')[0]}
                      </Text>
                    </span>
                  </span>
                </TableCell>
                <TableCell>{supplier.contactPerson}</TableCell>
                <TableCell>
                  <span className={styles.supplierDetails}>
                    <span className={styles.contactInfo}>
                      <Mail24Regular fontSize={12} /> {supplier.email}
                    </span>
                    <span className={styles.contactInfo}>
                      <Phone24Regular fontSize={12} /> {supplier.phone}
                    </span>
                  </span>
                </TableCell>
                <TableCell>
                  <span className={styles.inlineContainer}>
                    <Badge appearance="tint" color={
                      supplier.type === "Lokomotiven" ? "brand" : 
                      supplier.type === "Waggons" ? "warning" :
                      supplier.type === "Schienendienstleistungen" ? "informative" :
                      supplier.type === "Ersatzteile" ? "warning" : "subtle"
                    }>
                      {supplier.type}
                    </Badge>
                  </span>
                </TableCell>
                <TableCell>
                  <span className={styles.inlineContainer}>
                    <Badge appearance="filled" color={supplier.status === "Aktiv" ? "success" : "danger"}>
                      {supplier.status}
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